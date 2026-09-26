import os
import re
import json
import pytest
from unittest.mock import AsyncMock, patch, MagicMock

from recommender import recommend_algorithm, parse_problem_with_gemini, classify_strategy


@pytest.mark.asyncio
async def test_01_knapsack_mocked_gemini_pipeline():
    """
    Test 1: Mocked Google Gemini API Pipeline.
    Mocks genai.GenerativeModel.generate_content_async to return realistic canned JSON.
    Asserts strategy, syllabus_module, confidence label, and dualTechnique without live network calls.
    """
    mock_parse_response = MagicMock()
    mock_parse_response.text = json.dumps({
        "objective": "Maximize total item value within weight capacity W",
        "constraints": ["Item inclusion is 0 or 1", "Total weight <= W"],
        "input_size_hint": "Medium (N <= 1000, W <= 10000)",
        "keywords": ["knapsack", "weight", "capacity", "value"]
    })

    mock_exp_response = MagicMock()
    mock_exp_response.text = json.dumps({
        "reasoning": "Dynamic Programming breaks the problem into smaller item-and-capacity problems. For every item, we decide whether to include it or leave it out.",
        "correctness_justification": [
            {"title": "Optimal Substructure", "description": "An optimal solution can be built from the best solutions of smaller versions of the same problem."},
            {"title": "Overlapping Subproblems", "description": "The same smaller item-and-capacity problems can appear more than once, so Dynamic Programming stores their answers instead of solving them repeatedly."},
            {"title": "Include or Exclude Each Item", "description": "For every item, we consider two choices: include it if it fits, or leave it out. This allows the algorithm to consider the possible combinations."},
            {"title": "Optimal Final Answer", "description": "After considering all items and capacities, the solution gives the maximum value that can be obtained without exceeding the knapsack capacity."}
        ],
        "sample_approach": "def knapsack(weights, values, W):\n    pass"
    })

    mock_model_instance = MagicMock()
    mock_model_instance.generate_content_async = AsyncMock(side_effect=[mock_parse_response, mock_exp_response])

    with patch("recommender.get_gemini_client", return_value=True), \
         patch("google.generativeai.GenerativeModel", return_value=mock_model_instance), \
         patch.dict(os.environ, {"GEMINI_API_KEY": "sk-dummy-gemini-key", "DEBUG": "true"}):

        res = await recommend_algorithm(
            description="Given items with weights and values, find the maximum value subset that fits within weight capacity W.",
            problem_type="Dynamic Programming I",
            language="python"
        )

        print("\n--- TEST 1 OUTPUT (Mocked Gemini Path with DEBUG=true) ---")
        print(json.dumps(res, indent=2))

        # Assertions on returned structure
        assert res["strategy"] == "0/1 Knapsack (DP Formulation)"
        print("[PASS] Assertion passed: strategy == '0/1 Knapsack (DP Formulation)'")
        assert res["syllabus_module"] == "Dynamic Programming I"
        print("[PASS] Assertion passed: syllabus_module == 'Dynamic Programming I'")
        assert res["category"] == "Dynamic Programming I"
        print("[PASS] Assertion passed: category == 'Dynamic Programming I'")
        assert res["confidence"] in ["High", "Medium", "Low"]
        print(f"[PASS] Assertion passed: confidence label is '{res['confidence']}' (no numeric percentage)")
        assert len(res["correctness_justification"]) == 4
        print("[PASS] Assertion passed: correctness_justification contains 4 bullet points")
        assert res["debug_info"]["debug_path_used"] == "gemini"
        print("[PASS] Assertion passed: debug_path_used == 'gemini'")
        
        # Dual Technique Assertions
        assert res["dualTechnique"] is not None
        assert res["dualTechnique"]["algorithmName"] == "0/1 Knapsack (Branch & Bound)"
        assert res["dualTechnique"]["syllabus_module"] == "Branch & Bound"
        assert res["dualTechnique"]["category"] == "Branch & Bound"
        assert "worst case" in res["dualTechnique"]["timeComplexity"]
        assert "worst case" in res["dualTechnique"]["spaceComplexity"]
        print("[PASS] Assertion passed: dualTechnique == '0/1 Knapsack (Branch & Bound)' with explicit 'worst case' complexities")

        # Regex URL Pattern Check (No live HTTP requests)
        assert re.match(r"^https://github\.com/TheAlgorithms/", res["githubUrl"])
        assert re.match(r"^https://github\.com/TheAlgorithms/", res["dualTechnique"]["githubUrl"])
        print("[PASS] Assertion passed: githubUrl matches pattern ^https://github.com/TheAlgorithms/")


@pytest.mark.asyncio
async def test_01_knapsack_local_regex_fallback_path():
    """
    Test 2: Explicit Local Regex Fallback Path (No Gemini calls).
    Simulates missing GEMINI_API_KEY to confirm local regex keyword extraction and rule engine logic.
    """
    with patch("recommender.get_gemini_client", return_value=False), \
         patch.dict(os.environ, {"DEBUG": "true"}, clear=True):
        
        res = await recommend_algorithm(
            description="Given items with weights and values, find the maximum value subset that fits within weight capacity W.",
            problem_type="Dynamic Programming I",
            language="python"
        )

        print("\n--- TEST 2 OUTPUT (Local Regex Fallback Path with DEBUG=true) ---")
        print(json.dumps(res, indent=2))

        # Assertions on returned structure
        assert res["strategy"] == "0/1 Knapsack (DP Formulation)"
        print("[PASS] Assertion passed: fallback strategy == '0/1 Knapsack (DP Formulation)'")
        assert res["syllabus_module"] == "Dynamic Programming I"
        print("[PASS] Assertion passed: fallback syllabus_module == 'Dynamic Programming I'")
        assert res["confidence"] in ["High", "Medium", "Low"]
        print(f"[PASS] Assertion passed: fallback confidence label is '{res['confidence']}'")
        assert res["debug_info"]["debug_path_used"] == "fallback"
        print("[PASS] Assertion passed: debug_path_used == 'fallback'")
        assert "weight" in res["parsed"]["keywords"]
        assert "capacity" in res["parsed"]["keywords"]
        assert "value" in res["parsed"]["keywords"]
        print("[PASS] Assertion passed: extracted keywords contains ['weight', 'capacity', 'value']")

        # Dual Technique Assertions
        assert res["dualTechnique"] is not None
        assert res["dualTechnique"]["syllabus_module"] == "Branch & Bound"
        print("[PASS] Assertion passed: fallback dualTechnique syllabus_module == 'Branch & Bound'")

        # Regex URL Pattern Check
        assert re.match(r"^https://github\.com/TheAlgorithms/", res["githubUrl"])
        print("[PASS] Assertion passed: fallback githubUrl matches pattern ^https://github.com/TheAlgorithms/")


@pytest.mark.asyncio
async def test_debug_info_stripped_when_debug_false():
    """
    Test 3: Confirm debug_info is completely omitted when DEBUG is not set or false.
    """
    with patch("recommender.get_gemini_client", return_value=False), \
         patch.dict(os.environ, {"DEBUG": "false"}, clear=True):
        
        res = await recommend_algorithm(
            description="Given items with weights and values, find the maximum value subset that fits within weight capacity W.",
            problem_type="Dynamic Programming I",
            language="python"
        )

        print("\n--- TEST 3 OUTPUT (Production Path with DEBUG=false) ---")
        print(json.dumps(res, indent=2))

        assert "debug_info" not in res
        print("[PASS] Assertion passed: 'debug_info' is omitted when DEBUG=false")


if __name__ == "__main__":
    import asyncio
    asyncio.run(test_01_knapsack_mocked_gemini_pipeline())
    asyncio.run(test_01_knapsack_local_regex_fallback_path())
    asyncio.run(test_debug_info_stripped_when_debug_false())

