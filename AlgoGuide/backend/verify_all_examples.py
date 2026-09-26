import urllib.request
import json

url = "http://127.0.0.1:8000/api/recommend"

prompts = [
    ("Knapsack", "0/1 Knapsack with weight limit"),
    ("Shortest Path", "Find shortest path in weighted graph"),
    ("N-Queens", "N-Queens Problem on chessboard"),
    ("Sort", "Sort large dataset of integers")
]

print("=== VERIFYING ALL 4 EXAMPLE PROMPTS ===")

for name, desc in prompts:
    payload = json.dumps({
        "description": desc,
        "problem_type": "All Categories (Auto Detect)",
        "language": "python"
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"\n--- PROMPT: '{desc}' ({name}) ---")
            print(f"Primary Strategy: {data.get('strategy')}")
            print(f"Category: {data.get('category')}")
            print(f"Confidence Label: '{data.get('confidence')}'")
            print(f"Time Complexity: {data.get('timeComplexity')}")
            print(f"Space Complexity: {data.get('spaceComplexity')}")
            
            dual = data.get("dualTechnique")
            if dual:
                print(f"Dual Header: '{data.get('category')} vs {dual.get('category')}'")
                print(f"Dual Strategy B: {dual.get('algorithmName')}")
                print(f"Dual Category B: {dual.get('category')}")
                print(f"Dual Confidence B: '{dual.get('confidence')}'")
                print(f"Dual Time Complexity B: {dual.get('timeComplexity')}")
                print(f"Dual Space Complexity B: {dual.get('spaceComplexity')}")
            else:
                print("Dual Technique: None")
    except Exception as e:
        print(f"Error testing '{name}': {e}")
