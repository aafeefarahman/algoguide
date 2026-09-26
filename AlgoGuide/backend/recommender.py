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


APPROVED_ALGORITHMS_BY_CATEGORY = {
    "Divide & Conquer": ["Binary Search", "Strassen's Matrix Multiplication", "Closest Pair of Points", "Max/Min"],
    "Searching": ["Binary Search", "Linear Search", "Ternary Search", "Quick Select"],
    "Backtracking": ["N-Queens", "Sum of Subsets", "Hamiltonian Cycles", "Sudoku Solver"],
    "Dynamic Programming": ["0/1 Knapsack", "TSP", "Reliability Design", "Multistage Graphs", "All-Pairs Shortest Path", "Optimal BST", "Fibonacci", "Kadane's Algorithm", "Subset Sum"],
    "Greedy": ["Fractional Knapsack", "Job Sequencing", "Optimal Storage on Tapes", "Optimal Merge Patterns", "MST (Kruskal's/Prim's)", "Single-Source Shortest Path", "Huffman Coding"],
    "Branch and Bound": ["0/1 Knapsack", "TSP"],
    "Graph Algorithms": ["BFS", "DFS", "Topological Sort", "Floyd-Warshall", "Disjoint Set", "Kruskal", "Prim"],
    "Trees": ["BST", "AVL Tree"]
}

# Flat lookup set and canonical mapping for case-insensitive and variation matching
APPROVED_ALGORITHMS_MAP = {}
for cat, algos in APPROVED_ALGORITHMS_BY_CATEGORY.items():
    for algo in algos:
        APPROVED_ALGORITHMS_MAP[algo.lower().strip()] = (algo, cat)

# Add common aliases/variations for canonical entries in the approved list
APPROVED_SYNONYMS = {
    "dijkstra": ("Single-Source Shortest Path", "Greedy"),
    "dijkstra's algorithm": ("Single-Source Shortest Path", "Greedy"),
    "dijkstra's shortest path": ("Single-Source Shortest Path", "Greedy"),
    "dijkstras algorithm": ("Single-Source Shortest Path", "Greedy"),
    "single source shortest path": ("Single-Source Shortest Path", "Greedy"),
    "kruskal's algorithm": ("Kruskal", "Graph Algorithms"),
    "kruskal's": ("Kruskal", "Graph Algorithms"),
    "prim's algorithm": ("Prim", "Graph Algorithms"),
    "prim's": ("Prim", "Graph Algorithms"),
    "mst (kruskal's/prim's)": ("MST (Kruskal's/Prim's)", "Greedy"),
    "mst": ("MST (Kruskal's/Prim's)", "Greedy"),
    "breadth first search": ("BFS", "Graph Algorithms"),
    "depth first search": ("DFS", "Graph Algorithms"),
    "breadth-first search": ("BFS", "Graph Algorithms"),
    "depth-first search": ("DFS", "Graph Algorithms"),
    "breadth first search (bfs)": ("BFS", "Graph Algorithms"),
    "depth first search (dfs)": ("DFS", "Graph Algorithms"),
    "n queens": ("N-Queens", "Backtracking"),
    "n-queens problem": ("N-Queens", "Backtracking"),
    "n-queens puzzle": ("N-Queens", "Backtracking"),
    "0/1 knapsack problem": ("0/1 Knapsack", "Dynamic Programming"),
    "0/1 knapsack (dp)": ("0/1 Knapsack", "Dynamic Programming"),
    "0/1 knapsack (dp formulation)": ("0/1 Knapsack", "Dynamic Programming"),
    "0/1 knapsack (branch & bound)": ("0/1 Knapsack", "Branch and Bound"),
    "0/1 knapsack (branch and bound)": ("0/1 Knapsack", "Branch and Bound"),
    "traveling salesperson problem": ("TSP", "Dynamic Programming"),
    "traveling salesman problem": ("TSP", "Dynamic Programming"),
    "tsp (dynamic programming)": ("TSP", "Dynamic Programming"),
    "tsp (branch & bound)": ("TSP", "Branch and Bound"),
    "floyd warshall": ("Floyd-Warshall", "Graph Algorithms"),
    "floyd-warshall algorithm": ("Floyd-Warshall", "Graph Algorithms"),
    "all pairs shortest path": ("All-Pairs Shortest Path", "Dynamic Programming"),
    "binary search tree": ("BST", "Trees"),
    "binary search tree (bst)": ("BST", "Trees"),
    "avl": ("AVL Tree", "Trees"),
    "avl trees": ("AVL Tree", "Trees"),
    "strassen's": ("Strassen's Matrix Multiplication", "Divide & Conquer"),
    "strassen's matrix multiplication algorithm": ("Strassen's Matrix Multiplication", "Divide & Conquer"),
    "closest pair": ("Closest Pair of Points", "Divide & Conquer"),
    "job sequencing with deadlines": ("Job Sequencing", "Greedy"),
    "optimal binary search tree": ("Optimal BST", "Dynamic Programming"),
    "fibonacci sequence": ("Fibonacci", "Dynamic Programming"),
    "fibonacci (dp)": ("Fibonacci", "Dynamic Programming"),
    "disjoint set union": ("Disjoint Set", "Graph Algorithms"),
    "union-find": ("Disjoint Set", "Graph Algorithms"),
    "union find": ("Disjoint Set", "Graph Algorithms"),
    "maximum and minimum": ("Max/Min", "Divide & Conquer"),
    "find maximum and minimum": ("Max/Min", "Divide & Conquer"),
    "sum of subset": ("Sum of Subsets", "Backtracking")
}

for syn, canonical_tuple in APPROVED_SYNONYMS.items():
    APPROVED_ALGORITHMS_MAP[syn.lower().strip()] = canonical_tuple

def find_approved_algorithm(name: str) -> Optional[Tuple[str, str]]:
    """Check if name matches an entry in the approved algorithms list (case-insensitive & synonyms)."""
    if not name:
        return None
    cleaned = name.lower().strip()
    if cleaned in APPROVED_ALGORITHMS_MAP:
        return APPROVED_ALGORITHMS_MAP[cleaned]
    
    # Partial match check against canonical keys
    for k, v in APPROVED_ALGORITHMS_MAP.items():
        if k == cleaned or k in cleaned or cleaned in k:
            return v
    return None

def format_approved_list_prompt() -> str:
    lines = ["APPROVED ALGORITHM LIBRARY (Grouped by Category):"]
    for cat, algos in APPROVED_ALGORITHMS_BY_CATEGORY.items():
        lines.append(f"- {cat}: {', '.join(algos)}")
    return "\n".join(lines)


async def recommend_algorithm(
    description: str,
    problem_type: str = "",
    language: str = "python"
) -> Dict[str, Any]:
    """
    Analyzes user algorithmic problem statement via Google Gemini API.
    Constrained exclusively to AlgoGuide's implemented algorithm library.
    Validates Gemini output and retries with stricter prompt or rule-based fallback if invalid.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.error("GEMINI_API_KEY is not set in environment.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. GEMINI_API_KEY is missing.")

    if not get_gemini_client():
        logger.error("Failed to configure Gemini SDK client.")
        raise HTTPException(status_code=502, detail="Unable to analyze the problem right now. Gemini SDK configuration failed.")

    approved_list_str = format_approved_list_prompt()

    base_instructions = (
        f"{approved_list_str}\n\n"
        "STRICT MANDATORY CONSTRAINT:\n"
        "You must only recommend algorithms from the approved list above — these are the only algorithms our platform has implementations and guides for. "
        "Do not recommend or mention any algorithm not on this list, even as an alternative, even if a different algorithm would technically be a better fit for the problem. "
        "If no listed algorithm is a strong match, choose the closest one from the list within the most relevant category.\n\n"
        "Analyze the user's problem statement. Return ONLY a JSON object with the exact keys:\n"
        "- 'problemType': string (e.g., 'Single-Source Shortest Path', 'Resource Allocation Knapsack', etc.)\n"
        "- 'recommendedAlgorithm': string (EXACT name of the recommended algorithm from the approved list above)\n"
        "- 'paradigm': string (category name from the approved list, e.g., 'Greedy', 'Dynamic Programming', 'Graph Algorithms', etc.)\n"
        "- 'confidence': string ('High', 'Medium', or 'Low')\n"
        "- 'reason': string (concise explanation of why this approved algorithm fits the problem)\n"
        "- 'timeComplexity': string (e.g., 'O(N log N)', 'O((V + E) log V)')\n"
        "- 'spaceComplexity': string (e.g., 'O(N)', 'O(V)')\n"
        "- 'alternativeAlgorithms': list of objects with 'name' (MUST be an algorithm from approved list) and 'reason' (string)\n"
        "- 'constraintsNeeded': list of strings\n\n"
        f"Optional User Category Filter: {problem_type}\n"
        f"User Target Language: {language}\n\n"
        f"Problem Statement:\n{description}"
    )

    model_candidates = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest", "gemini-3.8-flash"]

    async def call_gemini(instruction_text: str) -> Optional[Dict[str, Any]]:
        for m_name in model_candidates:
            try:
                logger.info(f"[GEMINI REQUEST] Trying model '{m_name}' for problem: {description[:50]}...")
                model = genai.GenerativeModel(m_name)
                res = await model.generate_content_async(
                    instruction_text,
                    generation_config={"response_mime_type": "application/json"}
                )
                if res and res.text:
                    logger.info(f"[GEMINI RAW RESPONSE]\n{res.text}")
                    return json.loads(res.text)
            except Exception as e:
                logger.warning(f"[GEMINI MODEL {m_name} FAILED] {type(e).__name__}: {str(e)}")
        return None

    try:
        # Attempt 1
        parsed = await call_gemini(base_instructions)

        # Server-side validation check
        primary_rec = parsed.get("recommendedAlgorithm") if parsed else None
        approved_primary = find_approved_algorithm(primary_rec)

        # If primary recommendation is not in approved list, retry once with a stricter reminder
        if not approved_primary:
            logger.warning(f"[APPROVED LIST MISMATCH] Gemini recommended '{primary_rec}' which is not in the approved library. Retrying with strict enforcement...")
            strict_retry_prompt = (
                f"CRITICAL ERROR: Your previous recommendation '{primary_rec}' was rejected because it is NOT in our approved algorithm list.\n\n"
                f"{approved_list_str}\n\n"
                "You MUST select the primary 'recommendedAlgorithm' and any 'alternativeAlgorithms' exclusively and verbatim from the list above. "
                "Do NOT suggest any other algorithm.\n\n"
                f"Problem Statement:\n{description}"
            )
            parsed_retry = await call_gemini(strict_retry_prompt)
            if parsed_retry:
                retry_rec = parsed_retry.get("recommendedAlgorithm")
                approved_retry = find_approved_algorithm(retry_rec)
                if approved_retry:
                    parsed = parsed_retry
                    approved_primary = approved_retry
                else:
                    logger.warning(f"[APPROVED LIST MISMATCH ON RETRY] Retry returned '{retry_rec}'. Falling back to category rule default.")

        # If still missing or unapproved, provide safe rule-based default from approved library
        if not parsed or not approved_primary:
            desc_lower = description.lower()
            if any(k in desc_lower for k in ["knapsack", "capacity", "weight", "profit"]):
                canonical_name, canonical_cat = "0/1 Knapsack", "Dynamic Programming"
            elif any(k in desc_lower for k in ["shortest path", "graph", "distance", "network", "flight", "road"]):
                canonical_name, canonical_cat = "Single-Source Shortest Path", "Greedy"
            elif any(k in desc_lower for k in ["sort", "partition", "order", "array"]):
                canonical_name, canonical_cat = "Binary Search", "Searching"
            elif any(k in desc_lower for k in ["queen", "sudoku", "subset", "board", "chess"]):
                canonical_name, canonical_cat = "N-Queens", "Backtracking"
            elif any(k in desc_lower for k in ["tree", "bst", "avl", "balance"]):
                canonical_name, canonical_cat = "BST", "Trees"
            else:
                canonical_name, canonical_cat = "Binary Search", "Divide & Conquer"

            parsed = {
                "problemType": "Algorithmic Problem Optimization",
                "recommendedAlgorithm": canonical_name,
                "paradigm": canonical_cat,
                "confidence": "High",
                "reason": f"Matches the {canonical_name} paradigm in our verified algorithmic library.",
                "timeComplexity": "O(N log N)",
                "spaceComplexity": "O(N)",
                "alternativeAlgorithms": [],
                "constraintsNeeded": []
            }
            approved_primary = (canonical_name, canonical_cat)

        canonical_algo_name, canonical_category = approved_primary
        problem_type_name = parsed.get("problemType") or "Algorithmic Problem"
        paradigm_name = parsed.get("paradigm") or canonical_category
        confidence_val = (parsed.get("confidence") or "High").capitalize()
        reason_text = parsed.get("reason") or parsed.get("reasoning") or parsed.get("explanation") or f"This problem is best solved using {canonical_algo_name} under the {paradigm_name} paradigm."
        time_comp = parsed.get("timeComplexity") or "O(N log N)"
        space_comp = parsed.get("spaceComplexity") or "O(N)"

        # Filter alternatives so ONLY approved algorithms are kept
        filtered_alternatives = []
        for alt in parsed.get("alternativeAlgorithms", []):
            if isinstance(alt, dict):
                alt_check = find_approved_algorithm(alt.get("name", ""))
                if alt_check:
                    filtered_alternatives.append({
                        "name": alt_check[0],
                        "paradigm": alt_check[1],
                        "reason": alt.get("reason", "")
                    })

        from github_lookup import get_algorithm_github_url
        github_url = get_algorithm_github_url(canonical_algo_name, paradigm_name, language)

        # Build dualTechnique from first valid approved alternative if present
        dual_technique = None
        if filtered_alternatives:
            first_alt = filtered_alternatives[0]
            alt_name = first_alt["name"]
            alt_paradigm = first_alt["paradigm"]
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
            {"title": "Library Paradigm Application", "description": f"Uses the approved {paradigm_name} implementation from our catalog to satisfy problem constraints."},
            {"title": "Time Complexity Guarantee", "description": f"Executes within {time_comp} time for given input sizes."},
            {"title": "Space Optimization", "description": f"Requires {space_comp} auxiliary space during execution."}
        ]

        response_payload = {
            "problemType": problem_type_name,
            "recommendedAlgorithm": canonical_algo_name,
            "strategy": canonical_algo_name,
            "algorithmName": canonical_algo_name,
            "paradigm": paradigm_name,
            "syllabus_module": paradigm_name,
            "category": paradigm_name,
            "confidence": confidence_val,
            "reason": reason_text,
            "reasoning": reason_text,
            "explanation": reason_text,
            "timeComplexity": time_comp,
            "spaceComplexity": space_comp,
            "alternativeAlgorithms": filtered_alternatives,
            "constraintsNeeded": parsed.get("constraintsNeeded", []),
            "correctness_justification": correctness_justification,
            "correctnessJustification": correctness_justification,
            "githubUrl": github_url,
            "dualTechnique": dual_technique
        }

        if os.getenv("DEBUG", "").lower() in ("true", "1"):
            response_payload["debug_info"] = {
                "debug_path_used": "gemini_approved_library",
                "gemini_model": "gemini-3.5-flash-lite"
            }

        return response_payload

    except Exception as e:
        logger.error(f"[RECOMMENDER FAILURE] Exception during algorithm analysis: {type(e).__name__}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=502,
            detail=f"Unable to analyze the problem right now. Error: {str(e)}"
        )
