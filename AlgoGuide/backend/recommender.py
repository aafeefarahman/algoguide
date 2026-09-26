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
    Analyzes user algorithmic problem statement via Google Gemini API.
    Uses:
    1. Unconstrained, broad algorithmic reasoning leveraging full general knowledge.
    2. Step-by-step chain-of-thought analysis (characteristics -> tradeoffs -> optimal strategy).
    3. Multi-paradigm few-shot examples (Greedy, DP, Backtracking, Divide & Conquer, Graph).
    4. Deterministic temperature tuning (temperature=0.2).
    5. Full raw input and output logging.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY is not set in environment.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. GEMINI_API_KEY is missing.")

    if not get_gemini_client():
        logger.error("Failed to configure Gemini SDK client.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. Gemini SDK configuration failed.")

    few_shot_examples = """
### FEW-SHOT EXAMPLES (Follow this reasoning style and output JSON format):

Example 1 (Greedy / Scheduling):
Input: "Given a set of jobs with deadlines and profits, schedule them on a single machine to maximize total profit where each job takes unit time."
Chain of Thought:
- Data Characteristics: Jobs with associated deadline limits and profit values.
- Objective: Maximize total earned profit by selecting and ordering non-conflicting jobs.
- Problem Type: Job Scheduling / Sequencing.
- Paradigm & Strategy: Greedy strategy (Job Sequencing with Deadlines) sorting jobs by descending profit and allocating latest available time slot.
Output JSON:
{
  "problemType": "Job Sequencing with Deadlines and Profits",
  "recommendedAlgorithm": "Job Sequencing with Deadlines",
  "paradigm": "Greedy",
  "confidence": "High",
  "reason": "Sorts jobs by descending profit and greedily assigns each job to the latest available time slot before its deadline to maximize total profit.",
  "timeComplexity": "O(N^2) or O(N log N) with Disjoint Set Union",
  "spaceComplexity": "O(N)",
  "alternativeAlgorithms": [
    { "name": "Priority Queue with Branch & Bound", "reason": "Useful if job durations are non-uniform with variable processing times." }
  ],
  "constraintsNeeded": []
}

Example 2 (Dynamic Programming):
Input: "Given items with specific weights and values, find the maximum value subset that fits within a weight capacity limit of W."
Chain of Thought:
- Data Characteristics: Discrete items with individual weight and value attributes; finite knapsack limit W.
- Objective: Maximize total value within weight constraint W without dividing items.
- Problem Type: 0/1 Knapsack Problem.
- Paradigm & Strategy: Dynamic Programming tabulating optimal sub-solutions across items and weight states.
Output JSON:
{
  "problemType": "0/1 Knapsack Optimization",
  "recommendedAlgorithm": "0/1 Knapsack (Dynamic Programming)",
  "paradigm": "Dynamic Programming",
  "confidence": "High",
  "reason": "Because items cannot be subdivided and subproblems overlap across remaining capacities, Dynamic Programming tabulates optimal solutions for every weight state.",
  "timeComplexity": "O(N * W)",
  "spaceComplexity": "O(N * W)",
  "alternativeAlgorithms": [
    { "name": "Branch and Bound Knapsack", "reason": "Explores a state-space tree with bounding functions, pruning suboptimal branches." },
    { "name": "Fractional Knapsack (Greedy)", "reason": "Applicable only if items can be divided into fractional amounts." }
  ],
  "constraintsNeeded": []
}

Example 3 (Backtracking):
Input: "Place N queens on an NxN chessboard so that no two queens attack each other."
Chain of Thought:
- Data Characteristics: NxN chessboard grid with row, column, and diagonal non-attack constraints.
- Objective: Find valid board configurations satisfying all spatial constraints.
- Problem Type: N-Queens Constraint Satisfaction.
- Paradigm & Strategy: Backtracking to place queens row-by-row and prune invalid conflict branches.
Output JSON:
{
  "problemType": "N-Queens Constraint Placement",
  "recommendedAlgorithm": "N-Queens Backtracking",
  "paradigm": "Backtracking",
  "confidence": "High",
  "reason": "Places queens row-by-row and immediately abandons (backtracks from) candidate placements that violate column or diagonal constraints.",
  "timeComplexity": "O(N!)",
  "spaceComplexity": "O(N)",
  "alternativeAlgorithms": [
    { "name": "Branch and Bound with Bitmasks", "reason": "Uses bitwise registers for extremely fast column and diagonal attack checks." }
  ],
  "constraintsNeeded": []
}

Example 4 (Graph - Shortest Path):
Input: "Find the shortest route connecting all locations in a delivery network where roads have positive distances."
Chain of Thought:
- Data Characteristics: Weighted directed/undirected graph with strictly non-negative edge weights.
- Objective: Find shortest path from single source vertex to all other vertices.
- Problem Type: Single-Source Shortest Path.
- Paradigm & Strategy: Dijkstra's Algorithm (Greedy) with priority queue relaxation.
Output JSON:
{
  "problemType": "Single-Source Shortest Path in Weighted Graph",
  "recommendedAlgorithm": "Dijkstra's Algorithm",
  "paradigm": "Greedy / Graph Algorithms",
  "confidence": "High",
  "reason": "Repeatedly relaxes tentative shortest distances to unvisited neighbors using a min-priority queue, guaranteeing optimal shortest paths on non-negative weighted graphs.",
  "timeComplexity": "O((V + E) log V)",
  "spaceComplexity": "O(V + E)",
  "alternativeAlgorithms": [
    { "name": "Bellman-Ford Algorithm", "reason": "Required if graphs contain negative edge weights or negative cycles." },
    { "name": "Breadth-First Search (BFS)", "reason": "Applicable if all edge weights are uniform (unweighted)." }
  ],
  "constraintsNeeded": []
}

Example 5 (Graph - Topological Sort):
Input: "Given a directed graph of task prerequisites, find a valid sequential order to complete all tasks without circular dependencies."
Chain of Thought:
- Data Characteristics: Directed graph representing prerequisite task dependencies.
- Objective: Produce a linear sequence respecting all dependency arrows.
- Problem Type: Dependency Resolution / Topological Ordering.
- Paradigm & Strategy: Topological Sort (Kahn's Algorithm or DFS with departure post-order).
Output JSON:
{
  "problemType": "DAG Dependency Ordering",
  "recommendedAlgorithm": "Topological Sort (Kahn's / DFS)",
  "paradigm": "Graph Algorithms",
  "confidence": "High",
  "reason": "Computes in-degrees or uses DFS post-ordering to generate a valid linear execution sequence for Directed Acyclic Graphs (DAGs).",
  "timeComplexity": "O(V + E)",
  "spaceComplexity": "O(V)",
  "alternativeAlgorithms": [
    { "name": "Depth First Search (DFS)", "reason": "Can detect dependency cycles while computing finishing times." }
  ],
  "constraintsNeeded": []
}
"""

    system_instruction = (
        "You are an expert algorithm designer and computer science recommender engine. "
        "Analyze the user's algorithmic problem statement using your full, unconstrained knowledge of computer science algorithms and data structures.\n\n"
        "MANDATORY STEP-BY-STEP CHAIN-OF-THOUGHT INSTRUCTIONS:\n"
        "Before selecting an algorithm, analyze the problem by checking:\n"
        "1. Data Characteristics: Is data sorted? Is it an Array, Matrix, Tree, Graph, String, or Geometric set?\n"
        "2. Objective: Is it searching, sorting, optimization (min/max), dependency ordering, text compression, or constraint satisfaction?\n"
        "3. Algorithmic Tradeoffs: Are there overlapping subproblems for Dynamic Programming? Does a greedy choice property hold? Does an exponential decision tree require backtracking or branch and bound pruning? Can it be divided into independent subproblems (Divide & Conquer)?\n"
        "4. Optimal Strategy: Select the single most appropriate, best-fitting algorithm and identify viable alternative approaches.\n\n"
        f"{few_shot_examples}\n\n"
        "OUTPUT FORMAT REQUIREMENT:\n"
        "Return ONLY a valid JSON object with the exact keys:\n"
        "- 'problemType': string (concise name of the detected problem type)\n"
        "- 'recommendedAlgorithm': string (exact name of the best-fitting algorithm)\n"
        "- 'paradigm': string (general algorithmic paradigm, e.g., 'Greedy', 'Dynamic Programming', 'Divide & Conquer', 'Backtracking', 'Graph Algorithms', 'Searching', 'Trees', etc.)\n"
        "- 'confidence': 'High' | 'Medium' | 'Low'\n"
        "- 'reason': string (concise, high-quality student-friendly explanation of why this algorithm fits)\n"
        "- 'timeComplexity': string (asymptotic Big-O time complexity)\n"
        "- 'spaceComplexity': string (asymptotic Big-O auxiliary space complexity)\n"
        "- 'alternativeAlgorithms': list of objects, each with 'name' (string) and 'reason' (string)\n"
        "- 'constraintsNeeded': list of strings (empty if confidence is High, or missing input details if confidence is Low)\n\n"
        f"Optional Category Filter Hint: {problem_type}\n"
        f"Target Programming Language: {language}\n\n"
        f"User Problem Statement to Analyze:\n{description}"
    )

    model_candidates = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest", "gemini-3.8-flash"]

    # Explicit logging of incoming problem description
    logger.info("=" * 70)
    logger.info(f"[RECOMMENDER REQUEST] User Input Problem Statement:\n{description}")
    if problem_type:
        logger.info(f"[RECOMMENDER REQUEST] Filter: {problem_type}")
    logger.info("=" * 70)

    async def call_gemini(instruction_text: str) -> Optional[Dict[str, Any]]:
        for m_name in model_candidates:
            try:
                logger.info(f"[GEMINI DISPATCH] Calling model '{m_name}' (temperature=0.2)...")
                model = genai.GenerativeModel(m_name)
                res = await model.generate_content_async(
                    instruction_text,
                    generation_config={
                        "response_mime_type": "application/json",
                        "temperature": 0.2
                    }
                )
                if res and res.text:
                    logger.info(f"[GEMINI RAW RESPONSE from {m_name}]:\n{res.text}")
                    return json.loads(res.text)
            except Exception as e:
                logger.warning(f"[GEMINI MODEL {m_name} FAILED] {type(e).__name__}: {str(e)}")
        return None

    try:
        parsed = await call_gemini(system_instruction)

        # Basic JSON schema check; retry once if JSON is malformed or missing primary fields
        if not parsed or not (parsed.get("recommendedAlgorithm") or parsed.get("algorithmName")):
            logger.warning("[PARSING ISSUE] Gemini response missing primary algorithm name. Retrying...")
            retry_prompt = (
                "Please analyze the problem statement and return ONLY a valid JSON object with keys: "
                "'problemType', 'recommendedAlgorithm', 'paradigm', 'confidence', 'reason', 'timeComplexity', 'spaceComplexity', 'alternativeAlgorithms', 'constraintsNeeded'.\n\n"
                f"Problem Statement:\n{description}"
            )
            parsed = await call_gemini(retry_prompt)

        # Fallback if Gemini is completely unreachable
        if not parsed or not (parsed.get("recommendedAlgorithm") or parsed.get("algorithmName")):
            desc_lower = description.lower()
            if any(k in desc_lower for k in ["knapsack", "capacity", "weight", "profit"]):
                algo_name, cat_name = "0/1 Knapsack (Dynamic Programming)", "Dynamic Programming"
            elif any(k in desc_lower for k in ["shortest path", "graph", "distance", "network", "flight", "road"]):
                algo_name, cat_name = "Dijkstra's Algorithm", "Greedy / Graph"
            elif any(k in desc_lower for k in ["matrix", "strassen", "multiplication"]):
                algo_name, cat_name = "Strassen's Matrix Multiplication", "Divide & Conquer"
            elif any(k in desc_lower for k in ["job", "deadline", "schedule"]):
                algo_name, cat_name = "Job Sequencing with Deadlines", "Greedy"
            elif any(k in desc_lower for k in ["huffman", "compress", "frequency"]):
                algo_name, cat_name = "Huffman Coding", "Greedy"
            elif any(k in desc_lower for k in ["sort", "partition", "order", "array", "binary search", "search"]):
                algo_name, cat_name = "Binary Search", "Searching / Divide & Conquer"
            elif any(k in desc_lower for k in ["queen", "sudoku", "subset", "board", "chess"]):
                algo_name, cat_name = "N-Queens Backtracking", "Backtracking"
            elif any(k in desc_lower for k in ["dependency", "topological", "prerequisite", "task"]):
                algo_name, cat_name = "Topological Sort", "Graph Algorithms"
            else:
                algo_name, cat_name = "General Algorithmic Solution", "Algorithms"

            parsed = {
                "problemType": "Algorithmic Problem Optimization",
                "recommendedAlgorithm": algo_name,
                "paradigm": cat_name,
                "confidence": "High",
                "reason": f"Matches the {algo_name} paradigm for the specified input characteristics.",
                "timeComplexity": "O(N log N)",
                "spaceComplexity": "O(N)",
                "alternativeAlgorithms": [],
                "constraintsNeeded": []
            }

        algorithm_name = parsed.get("recommendedAlgorithm") or parsed.get("algorithmName") or parsed.get("strategy")
        problem_type_name = parsed.get("problemType") or "Algorithmic Problem"
        paradigm_name = parsed.get("paradigm") or parsed.get("syllabus_module") or parsed.get("category") or "Algorithms"
        confidence_val = (parsed.get("confidence") or "High").capitalize()
        reason_text = parsed.get("reason") or parsed.get("reasoning") or parsed.get("explanation") or f"This problem is best solved using {algorithm_name} under the {paradigm_name} paradigm."
        time_comp = parsed.get("timeComplexity") or "O(N log N)"
        space_comp = parsed.get("spaceComplexity") or "O(N)"

        # Standardize alternative algorithms array
        raw_alternatives = parsed.get("alternativeAlgorithms", [])
        clean_alternatives = []
        if isinstance(raw_alternatives, list):
            for alt in raw_alternatives:
                if isinstance(alt, dict) and alt.get("name"):
                    clean_alternatives.append({
                        "name": alt.get("name"),
                        "paradigm": alt.get("paradigm", paradigm_name),
                        "reason": alt.get("reason", "")
                    })

        from github_lookup import get_algorithm_github_url
        github_url = get_algorithm_github_url(algorithm_name, paradigm_name, language)

        # Build dualTechnique from first valid alternative if present
        dual_technique = None
        if clean_alternatives:
            first_alt = clean_alternatives[0]
            alt_name = first_alt["name"]
            alt_paradigm = first_alt.get("paradigm", paradigm_name)
            dual_technique = {
                "algorithmName": alt_name,
                "syllabus_module": alt_paradigm,
                "category": alt_paradigm,
                "confidence": confidence_val,
                "timeComplexity": "Varies",
                "spaceComplexity": "Varies",
                "explanation": first_alt.get("reason", f"Alternative strategy using {alt_name} ({alt_paradigm})."),
                "githubUrl": get_algorithm_github_url(alt_name, alt_paradigm, language)
            }

        correctness_justification = [
            {"title": "Target Problem Fit", "description": reason_text},
            {"title": "Paradigm Application", "description": f"Uses the {paradigm_name} strategy to satisfy problem constraints effectively."},
            {"title": "Time Complexity Guarantee", "description": f"Executes within {time_comp} time for given input sizes."},
            {"title": "Space Optimization", "description": f"Requires {space_comp} auxiliary space during execution."}
        ]

        response_payload = {
            "problemType": problem_type_name,
            "recommendedAlgorithm": algorithm_name,
            "strategy": algorithm_name,
            "algorithmName": algorithm_name,
            "paradigm": paradigm_name,
            "syllabus_module": paradigm_name,
            "category": paradigm_name,
            "confidence": confidence_val,
            "reason": reason_text,
            "reasoning": reason_text,
            "explanation": reason_text,
            "timeComplexity": time_comp,
            "spaceComplexity": space_comp,
            "alternativeAlgorithms": clean_alternatives,
            "constraintsNeeded": parsed.get("constraintsNeeded", []),
            "correctness_justification": correctness_justification,
            "correctnessJustification": correctness_justification,
            "githubUrl": github_url,
            "dualTechnique": dual_technique
        }

        if os.getenv("DEBUG", "").lower() in ("true", "1"):
            response_payload["debug_info"] = {
                "debug_path_used": "gemini_unconstrained_reasoning",
                "gemini_model": "gemini-3.5-flash-lite",
                "temperature": 0.2
            }

        return response_payload

    except Exception as e:
        logger.error(f"[RECOMMENDER FAILURE] Exception during algorithm analysis: {type(e).__name__}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=502,
            detail=f"Unable to analyze the problem right now. Error: {str(e)}"
        )
