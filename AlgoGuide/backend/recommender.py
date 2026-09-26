import os
import json
import logging
from typing import Dict, Any, Optional, Tuple, List
from dotenv import load_dotenv
from fastapi import HTTPException
import google.generativeai as genai

load_dotenv()
logger = logging.getLogger("algoguide.recommender")

_gemini_configured = False

def get_gemini_client() -> bool:
    """Lazy singleton initialization for Google Gemini SDK."""
    global _gemini_configured
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return False
    if not _gemini_configured:
        try:
            genai.configure(api_key=api_key)
            _gemini_configured = True
        except Exception as e:
            logger.error(f"Could not configure Google Gemini SDK: {e}")
            return False
    return True


async def recommend_algorithm(
    description: str,
    problem_type: str = "",
    language: str = "python"
) -> Dict[str, Any]:
    """
    Analyzes user algorithmic problem statement via Google Gemini API (gemini-1.5-flash).
    Gemini identifies the problem, paradigm, recommended algorithm, complexities, and constraints.
    Raises HTTPException(502) if Gemini fails or returns invalid response. NO local fallbacks.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY is not set in environment.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. GEMINI_API_KEY is missing.")

    if not get_gemini_client():
        logger.error("Failed to configure Gemini SDK client.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. Gemini SDK configuration failed.")

    try:
        category_hint = f"Optional User Category Filter Hint: {problem_type}\n" if problem_type and problem_type != "All Categories (Auto Detect)" else ""

        system_instruction = (
            "You are analyzing a user's algorithmic problem statement. "
            "Do not assume a predefined problem type. Analyze the actual problem statement provided by the user. "
            "Identify the problem, required objective, constraints if available, applicable algorithmic paradigms, "
            "and recommend the most appropriate algorithm. "
            "Never return Knapsack or Branch and Bound unless the statement describes that problem. "
            "If information is insufficient, set confidence to low and list what is missing in constraintsNeeded.\n\n"
            "Return ONLY a JSON object with the exact keys:\n"
            "- 'problemType': string (e.g., 'Array Target Pair Search', 'Weighted Single-Source Shortest Path', etc.)\n"
            "- 'recommendedAlgorithm': string (exact name of recommended algorithm, e.g., 'Hash Map / Two Pointer Technique')\n"
            "- 'paradigm': string (DAA syllabus paradigm, e.g., 'Hashing / Two Pointers', 'Greedy II', 'Dynamic Programming I', etc.)\n"
            "- 'confidence': string ('High', 'Medium', or 'Low')\n"
            "- 'reason': string (student-friendly explanation of why this algorithm fits the problem)\n"
            "- 'timeComplexity': string (e.g., 'O(N)', 'O((V + E) log V)')\n"
            "- 'spaceComplexity': string (e.g., 'O(N)', 'O(V)')\n"
            "- 'alternativeAlgorithms': list of objects, each with 'name' (string) and 'reason' (string)\n"
            "- 'constraintsNeeded': list of strings (empty if confidence is high, or list of missing information items if confidence is low)\n\n"
            f"{category_hint}"
            f"User Target Language: {language}\n\n"
            f"Problem Statement:\n{description}"
        )

        model_candidates = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest", "gemini-3.8-flash"]
        response = None
        last_error = None

        for m_name in model_candidates:
            try:
                logger.info(f"[GEMINI REQUEST] Trying model '{m_name}' for problem statement: {description[:60]}...")
                model = genai.GenerativeModel(m_name)
                response = await model.generate_content_async(
                    system_instruction,
                    generation_config={"response_mime_type": "application/json"}
                )
                if response and response.text:
                    break
            except Exception as e:
                logger.warning(f"[GEMINI MODEL {m_name} ATTEMPT FAILED] {type(e).__name__}: {str(e)}. Trying next candidate...")
                last_error = e

        if not response or not response.text:
            raise ValueError(f"All Gemini model candidates failed to return a response. Last error: {last_error}")

        if not response or not response.text:
            raise ValueError("Empty response received from Gemini API.")

        logger.info(f"[GEMINI RAW RESPONSE]\n{response.text}")
        parsed = json.loads(response.text)

        # Validate required JSON fields
        required_fields = ["problemType", "recommendedAlgorithm", "paradigm", "confidence", "reason", "timeComplexity", "spaceComplexity"]
        for field in required_fields:
            if field not in parsed or parsed[field] is None:
                raise ValueError(f"Gemini response JSON missing required field: '{field}'")

        # Standardize arrays
        if not isinstance(parsed.get("alternativeAlgorithms"), list):
            parsed["alternativeAlgorithms"] = []
        if not isinstance(parsed.get("constraintsNeeded"), list):
            parsed["constraintsNeeded"] = []

        from github_lookup import get_algorithm_github_url
        github_url = get_algorithm_github_url(parsed["recommendedAlgorithm"], parsed["paradigm"], language)

        # Build dualTechnique from alternativeAlgorithms if present
        dual_technique = None
        if parsed["alternativeAlgorithms"] and len(parsed["alternativeAlgorithms"]) > 0:
            alt = parsed["alternativeAlgorithms"][0]
            alt_name = alt.get("name", "Alternative Strategy")
            alt_reason = alt.get("reason", "")
            dual_technique = {
                "algorithmName": alt_name,
                "syllabus_module": alt.get("paradigm", parsed["paradigm"]),
                "category": alt.get("paradigm", parsed["paradigm"]),
                "confidence": parsed["confidence"].capitalize(),
                "timeComplexity": alt.get("timeComplexity", "Varies"),
                "spaceComplexity": alt.get("spaceComplexity", "Varies"),
                "explanation": alt_reason,
                "githubUrl": get_algorithm_github_url(alt_name, parsed["paradigm"], language)
            }

        # Build correctness justification bullet points from reason & algorithm logic
        correctness_justification = [
            {"title": "Target Problem Fit", "description": parsed["reason"]},
            {"title": "Paradigm Application", "description": f"Uses the {parsed['paradigm']} paradigm to satisfy problem constraints effectively."},
            {"title": "Time Complexity Guarantee", "description": f"Executes within {parsed['timeComplexity']} time for given input sizes."},
            {"title": "Space Optimization", "description": f"Requires {parsed['spaceComplexity']} auxiliary space during execution."}
        ]

        response_payload = {
            "problemType": parsed["problemType"],
            "recommendedAlgorithm": parsed["recommendedAlgorithm"],
            "strategy": parsed["recommendedAlgorithm"],
            "algorithmName": parsed["recommendedAlgorithm"],
            "paradigm": parsed["paradigm"],
            "syllabus_module": parsed["paradigm"],
            "category": parsed["paradigm"],
            "confidence": parsed["confidence"].capitalize(),
            "reason": parsed["reason"],
            "reasoning": parsed["reason"],
            "explanation": parsed["reason"],
            "timeComplexity": parsed["timeComplexity"],
            "spaceComplexity": parsed["spaceComplexity"],
            "alternativeAlgorithms": parsed["alternativeAlgorithms"],
            "constraintsNeeded": parsed["constraintsNeeded"],
            "correctness_justification": correctness_justification,
            "correctnessJustification": correctness_justification,
            "githubUrl": github_url,
            "dualTechnique": dual_technique
        }

        # Include debug_info only when DEBUG is enabled
        if os.getenv("DEBUG", "").lower() in ("true", "1"):
            response_payload["debug_info"] = {
                "debug_path_used": "gemini",
                "gemini_model": "gemini-1.5-flash"
            }

        return response_payload

    except Exception as e:
        logger.error(f"[GEMINI FAILURE] Exception during algorithm analysis: {type(e).__name__}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=502,
            detail=f"Unable to analyze the problem right now. Gemini API error: {str(e)}"
        )
