import urllib.request
import urllib.error
import json
import time

url = "http://127.0.0.1:8000/api/recommend"
payload = json.dumps({
    "description": "0/1 Knapsack with weight limit",
    "problem_type": "All Categories (Auto Detect)",
    "language": "python"
}).encode("utf-8")

headers = {"Content-Type": "application/json"}

print("Sending 12 rapid POST requests to /api/recommend...")
results = []

for i in range(1, 13):
    req = urllib.request.Request(url, data=payload, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            status = resp.getcode()
            results.append((i, status, "SUCCESS (200 OK)"))
            print(f"Request #{i:02d}: HTTP {status} OK")
    except urllib.error.HTTPError as e:
        results.append((i, e.code, f"RATE LIMITED ({e.code} {e.reason})"))
        print(f"Request #{i:02d}: HTTP {e.code} - {e.reason}")
    except Exception as e:
        results.append((i, 500, f"ERROR ({e})"))
        print(f"Request #{i:02d}: Exception {e}")

print("\n--- SUMMARY OF ALL 12 REQUESTS ---")
for req_num, code, msg in results:
    print(f"Request #{req_num:02d} -> HTTP {code}: {msg}")
