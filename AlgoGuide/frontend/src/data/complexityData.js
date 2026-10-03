// Comprehensive algorithm benchmarks and complexity profile dataset for visualizations
export const ALGORITHM_COMPLEXITY_DATA = {
  // Graph Algorithms
  "dijkstra's algorithm": {
    name: "Dijkstra's Algorithm",
    category: "Greedy / Graph",
    bestTime: "O((V + E) log V)",
    averageTime: "O((V + E) log V)",
    worstTime: "O((V + E) log V)",
    space: "O(V)",
    bestFn: (n) => (n + n * Math.log2(n || 2)) * Math.log2(n || 2),
    avgFn: (n) => (n + (n * (n - 1)) / 4) * Math.log2(n || 2),
    worstFn: (n) => (n + (n * (n - 1)) / 2) * Math.log2(n || 2),
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "Bellman-Ford",
        category: "Dynamic Programming",
        time: "O(V · E)",
        space: "O(V)",
        tradeoff: "Handles negative edge weights but executes in O(V · E) time instead of O((V + E) log V).",
        calc: (n) => n * ((n * (n - 1)) / 4),
        spaceCalc: (n) => n
      },
      {
        name: "Breadth-First Search (BFS)",
        category: "Graph Traversal",
        time: "O(V + E)",
        space: "O(V)",
        tradeoff: "Runs in linear O(V + E) time but is strictly restricted to unweighted graphs.",
        calc: (n) => n + n * 2,
        spaceCalc: (n) => n
      },
      {
        name: "Floyd-Warshall",
        category: "Dynamic Programming",
        time: "O(V³)",
        space: "O(V²)",
        tradeoff: "Finds all-pairs shortest paths but scales cubically O(V³) with quadratic memory.",
        calc: (n) => Math.pow(n, 3),
        spaceCalc: (n) => Math.pow(n, 2)
      }
    ]
  },

  // Dynamic Programming (0/1 Knapsack)
  "0/1 knapsack (dynamic programming)": {
    name: "0/1 Knapsack (DP)",
    category: "Dynamic Programming",
    bestTime: "O(N · W)",
    averageTime: "O(N · W)",
    worstTime: "O(N · W)",
    space: "O(N · W)",
    bestFn: (n) => n * (n * 2),
    avgFn: (n) => n * (n * 5),
    worstFn: (n) => n * (n * 10),
    spaceFn: (n) => n * (n * 5),
    alternatives: [
      {
        name: "0/1 Knapsack (Branch & Bound)",
        category: "Branch & Bound",
        time: "O(2ⁿ) worst",
        space: "O(2ⁿ) worst",
        tradeoff: "Prunes large state spaces using bounding, but worst-case time remains exponential O(2ⁿ).",
        calc: (n) => Math.pow(2, Math.min(n, 20)),
        spaceCalc: (n) => Math.pow(2, Math.min(n, 16))
      },
      {
        name: "Fractional Knapsack (Greedy)",
        category: "Greedy",
        time: "O(N log N)",
        space: "O(1)",
        tradeoff: "Executes in ultra-fast O(N log N) time, but strictly requires items to be divisible.",
        calc: (n) => n * Math.log2(n || 2),
        spaceCalc: (n) => 1
      },
      {
        name: "Brute Force (Exhaustive Search)",
        category: "Brute Force",
        time: "O(2ⁿ)",
        space: "O(N)",
        tradeoff: "Tests all 2ⁿ subsets; impractical for N > 30.",
        calc: (n) => Math.pow(2, Math.min(n, 22)),
        spaceCalc: (n) => n
      }
    ]
  },

  // Divide & Conquer (Quick Sort)
  "quick sort": {
    name: "Quick Sort",
    category: "Divide & Conquer",
    bestTime: "O(N log N)",
    averageTime: "O(N log N)",
    worstTime: "O(N²)",
    space: "O(log N)",
    bestFn: (n) => n * Math.log2(n || 2),
    avgFn: (n) => 1.38 * n * Math.log2(n || 2),
    worstFn: (n) => (n * (n - 1)) / 2,
    spaceFn: (n) => Math.log2(n || 2),
    alternatives: [
      {
        name: "Merge Sort",
        category: "Divide & Conquer",
        time: "O(N log N) guaranteed",
        space: "O(N)",
        tradeoff: "Guarantees O(N log N) in all cases, but requires O(N) auxiliary space.",
        calc: (n) => n * Math.log2(n || 2),
        spaceCalc: (n) => n
      },
      {
        name: "Heap Sort",
        category: "Tree / Selection",
        time: "O(N log N)",
        space: "O(1)",
        tradeoff: "Guaranteed O(N log N) in-place with O(1) space, but typically slower cache locality than Quick Sort.",
        calc: (n) => 1.5 * n * Math.log2(n || 2),
        spaceCalc: (n) => 1
      },
      {
        name: "Bubble / Insertion Sort",
        category: "Brute Force",
        time: "O(N²)",
        space: "O(1)",
        tradeoff: "Simple implementation with O(1) memory, but scales quadratically O(N²).",
        calc: (n) => (n * n) / 2,
        spaceCalc: (n) => 1
      }
    ]
  },

  // Backtracking (N-Queens)
  "n-queens backtracking": {
    name: "N-Queens (Backtracking)",
    category: "Backtracking",
    bestTime: "O(N)",
    averageTime: "O(N!)",
    worstTime: "O(N!)",
    space: "O(N)",
    bestFn: (n) => n,
    avgFn: (n) => factorialApprox(Math.min(n, 12)) / 4,
    worstFn: (n) => factorialApprox(Math.min(n, 12)),
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "N-Queens (Branch & Bound)",
        category: "Branch & Bound",
        time: "O(N!) with bitmasks",
        space: "O(N)",
        tradeoff: "Utilizes bitwise registers for O(1) conflict validation, speeding up practical search.",
        calc: (n) => factorialApprox(Math.min(n, 12)) / 10,
        spaceCalc: (n) => n
      },
      {
        name: "Brute Force (Generate & Test)",
        category: "Exhaustive Search",
        time: "O(Nᴺ)",
        space: "O(N)",
        tradeoff: "Places queens in all Nᴺ permutations without pruning, blowing up instantly for N ≥ 8.",
        calc: (n) => Math.pow(Math.min(n, 9), Math.min(n, 9)),
        spaceCalc: (n) => n
      }
    ]
  },

  // Divide & Conquer / Searching (Binary Search)
  "binary search": {
    name: "Binary Search",
    category: "Searching / Divide & Conquer",
    bestTime: "O(1)",
    averageTime: "O(log N)",
    worstTime: "O(log N)",
    space: "O(1)",
    bestFn: (n) => 1,
    avgFn: (n) => Math.log2(n || 2),
    worstFn: (n) => Math.log2(n || 2),
    spaceFn: (n) => 1,
    alternatives: [
      {
        name: "Linear Search",
        category: "Sequential",
        time: "O(N)",
        space: "O(1)",
        tradeoff: "Works on unsorted arrays but requires O(N) comparisons.",
        calc: (n) => n / 2,
        spaceCalc: (n) => 1
      },
      {
        name: "Ternary Search",
        category: "Divide & Conquer",
        time: "O(log₃ N)",
        space: "O(1)",
        tradeoff: "Divides search range into 3 parts, best for finding extrema of unimodal functions.",
        calc: (n) => (Math.log(n || 2) / Math.log(3)) * 2,
        spaceCalc: (n) => 1
      },
      {
        name: "Hash Table Lookup",
        category: "Hashing",
        time: "O(1) average",
        space: "O(N)",
        tradeoff: "Constant O(1) average lookup, but requires O(N) memory and preprocessing time.",
        calc: (n) => 1.5,
        spaceCalc: (n) => n
      }
    ]
  },

  // Job Sequencing
  "job sequencing with deadlines": {
    name: "Job Sequencing with Deadlines",
    category: "Greedy",
    bestTime: "O(N log N)",
    averageTime: "O(N²)",
    worstTime: "O(N²)",
    space: "O(N)",
    bestFn: (n) => n * Math.log2(n || 2),
    avgFn: (n) => (n * n) / 4 + n * Math.log2(n || 2),
    worstFn: (n) => (n * n) / 2,
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "Job Sequencing with DSU (Disjoint Set)",
        category: "Greedy / DSU",
        time: "O(N log N + N · α(N))",
        space: "O(N)",
        tradeoff: "Uses Path Compression to find available slots in near O(1) time.",
        calc: (n) => n * Math.log2(n || 2) + n * 1.2,
        spaceCalc: (n) => n
      },
      {
        name: "Dynamic Programming Scheduling",
        category: "Dynamic Programming",
        time: "O(N · MaxDeadline)",
        space: "O(N · MaxDeadline)",
        tradeoff: "Generalizes to variable job processing durations, but requires quadratic memory.",
        calc: (n) => n * n,
        spaceCalc: (n) => n * n
      }
    ]
  },

  // Topological Sort
  "topological sort": {
    name: "Topological Sort (Kahn's / DFS)",
    category: "Graph Algorithms",
    bestTime: "O(V + E)",
    averageTime: "O(V + E)",
    worstTime: "O(V + E)",
    space: "O(V)",
    bestFn: (n) => n + n,
    avgFn: (n) => n + n * 1.5,
    worstFn: (n) => n + (n * (n - 1)) / 4,
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "DFS Post-Order Reversal",
        category: "Graph Traversal",
        time: "O(V + E)",
        space: "O(V)",
        tradeoff: "Recursive DFS computes order using call stack; recursion limit can be an issue on deep DAGs.",
        calc: (n) => n + n * 1.5,
        spaceCalc: (n) => n
      },
      {
        name: "Indegree Matrix Reduction",
        category: "Matrix",
        time: "O(V²)",
        space: "O(V²)",
        tradeoff: "Scans adjacency matrix directly; inefficient for sparse DAGs.",
        calc: (n) => n * n,
        spaceCalc: (n) => n * n
      }
    ]
  },

  // Huffman Coding
  "huffman coding": {
    name: "Huffman Coding",
    category: "Greedy / Trees",
    bestTime: "O(N log N)",
    averageTime: "O(N log N)",
    worstTime: "O(N log N)",
    space: "O(N)",
    bestFn: (n) => n * Math.log2(n || 2),
    avgFn: (n) => n * Math.log2(n || 2),
    worstFn: (n) => n * Math.log2(n || 2),
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "Fixed-Length ASCII/Binary Encoding",
        category: "Direct",
        time: "O(N)",
        space: "O(1)",
        tradeoff: "Trivial O(N) encoding, but achieves 0% compression efficiency.",
        calc: (n) => n,
        spaceCalc: (n) => 1
      },
      {
        name: "LZW Compression (Dictionary-based)",
        category: "Dictionary",
        time: "O(N)",
        space: "O(DictionarySize)",
        tradeoff: "Adaptive dictionary encoding; higher throughput on repetitive text streams.",
        calc: (n) => n * 1.2,
        spaceCalc: (n) => Math.min(n * 2, 4096)
      }
    ]
  },

  // Strassen's Matrix Multiplication
  "strassen's algorithm": {
    name: "Strassen's Matrix Multiplication",
    category: "Divide & Conquer",
    bestTime: "O(N^2.807)",
    averageTime: "O(N^2.807)",
    worstTime: "O(N^2.807)",
    space: "O(N²)",
    bestFn: (n) => Math.pow(n, 2.807),
    avgFn: (n) => Math.pow(n, 2.807),
    worstFn: (n) => Math.pow(n, 2.807),
    spaceFn: (n) => Math.pow(n, 2),
    alternatives: [
      {
        name: "Standard Matrix Multiplication",
        category: "Iterative",
        time: "O(N³)",
        space: "O(N²)",
        tradeoff: "Standard 3-nested loops O(N³); faster than Strassen for small N (N < 64) due to lower constant factor.",
        calc: (n) => Math.pow(n, 3),
        spaceCalc: (n) => Math.pow(n, 2)
      },
      {
        name: "Coppersmith-Winograd",
        category: "Theoretical D&C",
        time: "O(N^2.373)",
        space: "O(N²)",
        tradeoff: "Asymptotically faster, but massive constant overhead makes it purely theoretical.",
        calc: (n) => Math.pow(n, 2.373),
        spaceCalc: (n) => Math.pow(n, 2)
      }
    ]
  }
};

function factorialApprox(n) {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

// Helper to find complexity profile for any recommended algorithm string
export function getAlgorithmComplexityProfile(algoName, category = "") {
  const norm = (algoName || "").toLowerCase().trim();

  for (const [key, profile] of Object.entries(ALGORITHM_COMPLEXITY_DATA)) {
    if (norm === key || norm.includes(key) || key.includes(norm)) {
      return profile;
    }
  }

  // Synonym / Keyword match
  if (norm.includes("dijkstra") || norm.includes("shortest path")) {
    return ALGORITHM_COMPLEXITY_DATA["dijkstra's algorithm"];
  }
  if (norm.includes("knapsack")) {
    return ALGORITHM_COMPLEXITY_DATA["0/1 knapsack (dynamic programming)"];
  }
  if (norm.includes("sort") && !norm.includes("topological")) {
    return ALGORITHM_COMPLEXITY_DATA["quick sort"];
  }
  if (norm.includes("queen")) {
    return ALGORITHM_COMPLEXITY_DATA["n-queens backtracking"];
  }
  if (norm.includes("binary search") || norm.includes("search")) {
    return ALGORITHM_COMPLEXITY_DATA["binary search"];
  }
  if (norm.includes("job") || norm.includes("deadline")) {
    return ALGORITHM_COMPLEXITY_DATA["job sequencing with deadlines"];
  }
  if (norm.includes("topological") || norm.includes("dependency") || norm.includes("dag")) {
    return ALGORITHM_COMPLEXITY_DATA["topological sort"];
  }
  if (norm.includes("huffman") || norm.includes("compress")) {
    return ALGORITHM_COMPLEXITY_DATA["huffman coding"];
  }
  if (norm.includes("matrix") || norm.includes("strassen")) {
    return ALGORITHM_COMPLEXITY_DATA["strassen's algorithm"];
  }

  // Generic fallback profile
  return {
    name: algoName || "Recommended Strategy",
    category: category || "General Algorithm",
    bestTime: "O(N log N)",
    averageTime: "O(N log N)",
    worstTime: "O(N²)",
    space: "O(N)",
    bestFn: (n) => n * Math.log2(n || 2),
    avgFn: (n) => n * Math.log2(n || 2),
    worstFn: (n) => (n * n) / 2,
    spaceFn: (n) => n,
    alternatives: [
      {
        name: "Linear / Brute Force Approach",
        category: "Exhaustive",
        time: "O(N²)",
        space: "O(1)",
        tradeoff: "Simpler to implement but degrades in performance for large inputs.",
        calc: (n) => n * n,
        spaceCalc: (n) => 1
      },
      {
        name: "Divide and Conquer Optimization",
        category: "Divide & Conquer",
        time: "O(N log N)",
        space: "O(N)",
        tradeoff: "Reduces execution time by partitioning problem into independent sub-instances.",
        calc: (n) => n * Math.log2(n || 2),
        spaceCalc: (n) => n
      }
    ]
  };
}
