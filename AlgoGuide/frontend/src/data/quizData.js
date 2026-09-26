export const DAA_TOPICS = [
  { id: "complexity", name: "Complexity Analysis", description: "Asymptotic notation (O, Ω, Θ), recurrence relations, and Master Theorem." },
  { id: "divide_conquer", name: "Divide & Conquer", description: "Subproblem decomposition, recursive solving, and combining results." },
  { id: "backtracking", name: "Backtracking", description: "State-space tree exploration, constraint satisfaction, and recursive pruning." },
  { id: "dp1", name: "Dynamic Programming I", description: "1D/2D memoization, optimal substructure, and tabulating overlapping subproblems." },
  { id: "dp2", name: "Dynamic Programming II", description: "Advanced DP: All-Pairs Shortest Path, Matrix Chain Multiplication, and Bitmask DP." },
  { id: "greedy1", name: "Greedy I", description: "Greedy choice property, interval scheduling, Huffman coding, and fractional knapsack." },
  { id: "greedy2", name: "Greedy II", description: "Greedy graph optimization: Minimum Spanning Trees (Kruskal, Prim) and Dijkstra's algorithm." },
  { id: "branch_bound", name: "Branch & Bound", description: "State-space tree search, upper/lower bound evaluation, and pruning non-promising subtrees." }
];

export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const QUIZ_QUESTION_BANK = {
  // 1. COMPLEXITY ANALYSIS
  "complexity_Easy": [
    {
      id: "comp_e1",
      question: "What does Big-O notation (O(f(n))) represent in computational complexity analysis?",
      options: [
        "The strict lower bound of an algorithm's execution time.",
        "An asymptotic upper bound on the growth rate of running time in the worst case.",
        "The exact number of CPU instructions executed for a given input size n.",
        "The average execution time measured in milliseconds across test runs."
      ],
      correctAnswer: 1,
      explanation: "Big-O notation establishes an asymptotic upper bound, guaranteeing that running time does not grow faster than c · f(n) for large input sizes."
    },
    {
      id: "comp_e2",
      question: "According to the Master Theorem, what is the time complexity of the recurrence T(n) = 2T(n/2) + O(n)?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correctAnswer: 1,
      explanation: "For T(n) = 2T(n/2) + O(n), a=2, b=2, log_b(a) = 1. Since f(n) = Θ(n^1), it falls under Case 2 of the Master Theorem, yielding O(n log n)."
    },
    {
      id: "comp_e3",
      question: "Which of the following growth rates is asymptotically the slowest (most efficient)?",
      options: ["O(n log n)", "O(n²)", "O(log n)", "O(2ⁿ)"],
      correctAnswer: 2,
      explanation: "Logarithmic time O(log n) grows significantly slower than linear O(n), quasi-linear O(n log n), quadratic O(n²), or exponential O(2ⁿ)."
    }
  ],
  "complexity_Medium": [
    {
      id: "comp_m1",
      question: "Given a code block with two nested loops where the outer loop runs n times and the inner loop executes log(i) times for i = 1..n, what is the overall time complexity?",
      options: ["O(n)", "O(n log n)", "O(log(n!)) = O(n log n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Summing log(1) + log(2) + ... + log(n) = log(n!). By Stirling's approximation, log(n!) = Θ(n log n)."
    },
    {
      id: "comp_m2",
      question: "Which recurrence relation models the time complexity of Merge Sort?",
      options: [
        "T(n) = T(n-1) + O(1)",
        "T(n) = 2T(n/2) + O(n)",
        "T(n) = 2T(n/2) + O(1)",
        "T(n) = T(n/2) + O(n)"
      ],
      correctAnswer: 1,
      explanation: "Merge Sort splits input into 2 subproblems of size n/2 and merges them in O(n) linear time, giving T(n) = 2T(n/2) + O(n)."
    },
    {
      id: "comp_m3",
      question: "In space complexity analysis, what is auxiliary space?",
      options: [
        "The total disk space occupied by input datasets.",
        "The extra memory space allocated by an algorithm temporary variables excluding input memory.",
        "The size of stack memory reserved for global environment variables.",
        "The memory consumed by compiler optimizations."
      ],
      correctAnswer: 1,
      explanation: "Auxiliary space measures only temporary or extra space used by an algorithm, ignoring input data memory."
    }
  ],
  "complexity_Hard": [
    {
      id: "comp_h1",
      question: "Why does the Master Theorem fail to apply to the recurrence T(n) = 2T(n/2) + n / log n?",
      options: [
        "The number of subproblems a = 2 is not an integer.",
        "The subproblem size factor b = 2 is equal to a.",
        "The ratio f(n) / n^(log_b a) = (1 / log n) is asymptotically smaller than n^ε for any positive ε, so f(n) is not polynomially smaller/larger.",
        "The recurrence has a non-constant base case."
      ],
      correctAnswer: 2,
      explanation: "The Master Theorem requires polynomial gap differences n^ε between f(n) and n^(log_b a). Here the difference is logarithmic (1/log n), violating Master Theorem conditions (requiring substitution method instead)."
    },
    {
      id: "comp_h2",
      question: "If algorithm A has worst-case time complexity O(n log n) and algorithm B has worst-case Θ(n log n), which statement is strictly true?",
      options: [
        "Algorithm A is always faster than Algorithm B for all input sizes.",
        "Algorithm B provides both a tight upper and tight lower bound on worst-case execution time, whereas Algorithm A only guarantees an upper bound.",
        "Algorithm A cannot run faster than O(n) for any input.",
        "Algorithm B has an exponential average-case complexity."
      ],
      correctAnswer: 1,
      explanation: "Θ(n log n) denotes a tight bound (both O and Ω), meaning algorithm B's worst case grows at exact rate n log n. Big-O only asserts upper bound (so A could theoretically be O(n))."
    }
  ],

  // 2. DIVIDE & CONQUER
  "divide_conquer_Easy": [
    {
      id: "dc_e1",
      question: "What are the three core steps of the Divide & Conquer algorithmic paradigm?",
      options: [
        "Input, Process, Output",
        "Divide problem into subproblems, Conquer subproblems recursively, Combine subproblem solutions",
        "Greedy selection, Local optimization, Global check",
        "State representation, Subproblem memoization, Tabulation"
      ],
      correctAnswer: 1,
      explanation: "Divide & Conquer breaks a problem into smaller independent subproblems, solves them recursively, and combines subproblem solutions to solve the original instance."
    },
    {
      id: "dc_e2",
      question: "Which sorting algorithm chooses a pivot element to partition an array into two sub-arrays?",
      options: ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Quick Sort partitions array elements around a pivot such that left elements ≤ pivot and right elements ≥ pivot."
    }
  ],
  "divide_conquer_Medium": [
    {
      id: "dc_m1",
      question: "How does Binary Search achieve logarithmic O(log n) time complexity using Divide & Conquer?",
      options: [
        "It compares elements against all elements in parallel threads.",
        "It splits the search range in half and eliminates the half where the target cannot reside because the array is sorted.",
        "It memoizes previously searched target values in a hash table.",
        "It sorts the array on every lookup operation."
      ],
      correctAnswer: 1,
      explanation: "By comparing the target against the middle element of a sorted array, Binary Search discards 50% of the remaining search range per step."
    },
    {
      id: "dc_m2",
      question: "In Strassen's Matrix Multiplication algorithm, how is the number of recursive matrix multiplications reduced?",
      options: [
        "From 8 multiplications down to 7 multiplications.",
        "From 16 multiplications down to 4 multiplications.",
        "From 4 multiplications down to 1 multiplication.",
        "From n³ multiplications down to n log n."
      ],
      correctAnswer: 0,
      explanation: "Standard matrix division requires 8 multiplications of size n/2. Strassen uses algebraic formulas to reduce multiplications to 7, improving time complexity from O(n³) to O(n^2.81)."
    }
  ],
  "divide_conquer_Hard": [
    {
      id: "dc_h1",
      question: "Why does Quick Sort degrade to O(n²) worst-case time complexity, and how does randomized pivot selection fix it?",
      options: [
        "Worst case happens on unsorted data; random pivots sort array pre-execution.",
        "Worst case occurs when pivot choices consistently yield unbalanced 0 vs n-1 partitions (e.g. sorted arrays with last element pivot); picking a random pivot makes worst-case partitioning extremely improbable.",
        "Random pivots reduce memory overhead from O(log n) to O(1).",
        "Quick Sort fails when duplicates are present; random pivots deduplicate input."
      ],
      correctAnswer: 1,
      explanation: "Deterministic pivots on already sorted inputs produce max unbalanced splits (0 and n-1), resulting in n levels of recursion (O(n²)). Random pivots guarantee expected O(n log n) execution."
    },
    {
      id: "dc_h2",
      question: "In the 2D Closest Pair of Points problem, why does the combine step only need to inspect at most 6 points in the vertical strip for each point?",
      options: [
        "Because points are pre-sorted in 6 clusters.",
        "Geometrical bounds prove that at most 6 points can reside in a d × 2d rectangle without any pair being closer than current minimum distance d.",
        "Because 6 points corresponds to the max 3D coordinates projection.",
        "It is a heuristic choice used to trade precision for speed."
      ],
      correctAnswer: 1,
      explanation: "Since points on each side of the strip are at least distance d apart, a d × 2d bounding rectangle can contain at most 6 points under minimum distance constraints."
    }
  ],

  // 3. BACKTRACKING
  "backtracking_Easy": [
    {
      id: "bt_e1",
      question: "What is the primary characteristic of Backtracking algorithms?",
      options: [
        "They always make the greedy choice at each step without undoing decisions.",
        "They build candidate solutions incrementally and abandon (backtrack) a branch as soon as it violates constraints.",
        "They compute all subproblems bottom-up and store them in a 2D table.",
        "They convert graph problems into network flows."
      ],
      correctAnswer: 1,
      explanation: "Backtracking explores state-space trees depth-first and prunes non-promising branches early whenever partial solutions violate problem constraints."
    },
    {
      id: "bt_e2",
      question: "Which classic puzzle is traditionally solved using Backtracking?",
      options: ["Shortest Path in Weighted Graph", "N-Queens Problem", "Fractional Knapsack", "Minimum Spanning Tree"],
      correctAnswer: 1,
      explanation: "N-Queens requires placing N non-attacking queens on an N×N chessboard, solved by placing queens row-by-row and backtracking when collisions occur."
    }
  ],
  "backtracking_Medium": [
    {
      id: "bt_m1",
      question: "In solving a Sudoku puzzle via Backtracking, what triggers a backtrack operation?",
      options: [
        "Filling all 81 cells successfully.",
        "Encountering an empty cell where no digit from 1 to 9 satisfies row, column, and 3×3 subgrid constraints.",
        "Reaching the top-left cell of the grid.",
        "Finding a duplicate number in an input dataset."
      ],
      correctAnswer: 1,
      explanation: "When no valid digit 1-9 can be placed in an empty cell without violating Sudoku rules, the algorithm undoes the previous placement and backtracks."
    },
    {
      id: "bt_m2",
      question: "How does Backtracking differ from pure Exhaustive Brute-Force Search?",
      options: [
        "Backtracking uses random restarts while brute force uses recursion.",
        "Backtracking prunes entire subtrees of invalid partial solutions early, avoiding the evaluation of all candidate configurations.",
        "Brute force guarantees optimal solutions while backtracking does not.",
        "Backtracking runs in polynomial time."
      ],
      correctAnswer: 1,
      explanation: "Brute force generates all N! or 2ⁿ states indiscriminately. Backtracking tests bounding/bounding conditions on partial states to prune large branches."
    }
  ],
  "backtracking_Hard": [
    {
      id: "bt_h1",
      question: "Why does standard Backtracking fail to solve the Hamiltonian Path problem efficiently on dense graphs, and why is DP with Bitmask preferred?",
      options: [
        "Backtracking cannot traverse directed edges.",
        "Backtracking re-explores the same subset of visited vertices via different path permutations (O(n!)); Bitmask DP memoizes subproblem states (visited_mask, current_vertex) in O(n² · 2ⁿ) time.",
        "Bitmask DP eliminates the need for graph storage.",
        "Dense graphs contain no Hamiltonian cycles."
      ],
      correctAnswer: 1,
      explanation: "Backtracking suffers from exponential state repetition across permutations. Bitmask DP memoizes (visited_set, last_node) states, reducing O(n!) to O(n² · 2ⁿ)."
    }
  ],

  // 4. DYNAMIC PROGRAMMING I
  "dp1_Easy": [
    {
      id: "dp1_e1",
      question: "What two properties must a problem possess to be suitable for Dynamic Programming?",
      options: [
        "Greedy choice property and optimal substructure",
        "Optimal substructure and overlapping subproblems",
        "Linear time complexity and sorted input",
        "Deterministic bounds and divide-and-conquer splitting"
      ],
      correctAnswer: 1,
      explanation: "Dynamic Programming requires optimal substructure (optimal solution composed of optimal subproblem solutions) and overlapping subproblems (same subproblems computed repeatedly)."
    },
    {
      id: "dp1_e2",
      question: "What is the difference between Memoization (Top-Down) and Tabulation (Bottom-Up) in DP?",
      options: [
        "Memoization uses recursion with lookup table caching; Tabulation computes subproblems iteratively from smallest to largest.",
        "Memoization is for greedy algorithms; Tabulation is for divide & conquer.",
        "Memoization runs in exponential time; Tabulation runs in linear time.",
        "Tabulation cannot solve 2D array problems."
      ],
      correctAnswer: 0,
      explanation: "Top-Down memoization uses recursive function calls storing results in a hash/array cache; Bottom-Up tabulation fills a table iteratively starting from base cases."
    }
  ],
  "dp1_Medium": [
    {
      id: "dp1_m1",
      question: "In the 0/1 Knapsack problem with n items and weight capacity W, what does DP entry dp[i][w] represent?",
      options: [
        "The minimum weight using first i items.",
        "The maximum total value achievable considering a subset of the first i items with weight capacity w.",
        "The exact number of ways to pick items totaling weight w.",
        "The average value of items up to index i."
      ],
      correctAnswer: 1,
      explanation: "dp[i][w] stores the optimal value obtainable using items 1..i within weight limit w."
    },
    {
      id: "dp1_m2",
      question: "What is the time complexity to find the Longest Common Subsequence (LCS) of two strings of lengths m and n using DP?",
      options: ["O(m + n)", "O(m · n)", "O(2^(m+n))", "O(m log n)"],
      correctAnswer: 1,
      explanation: "LCS constructs an (m+1) × (n+1) table where each cell is computed in O(1) time, yielding O(m · n) total execution time."
    }
  ],
  "dp1_Hard": [
    {
      id: "dp1_h1",
      question: "Why is the 0/1 Knapsack DP time complexity O(n · W) classified as pseudo-polynomial rather than polynomial?",
      options: [
        "Because W is fractional.",
        "Because the input size of W is measured in bits (log₂ W); thus running time grows exponentially with respect to the length of the binary representation of W.",
        "Because it only works for small values of n.",
        "Because memoization table allocation requires disk storage."
      ],
      correctAnswer: 1,
      explanation: "The numeric value W takes log₂ W bits to represent. Since runtime O(n · W) is exponential relative to bit-length log W, it is pseudo-polynomial."
    }
  ],

  // 5. DYNAMIC PROGRAMMING II
  "dp2_Easy": [
    {
      id: "dp2_e1",
      question: "Which algorithm computes all-pairs shortest paths in a weighted graph using Dynamic Programming II?",
      options: ["Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Prim's Algorithm", "Kruskal's Algorithm"],
      correctAnswer: 1,
      explanation: "Floyd-Warshall uses a 3D state transition dp[k][i][j] (simplified to 2D) to find shortest paths between all pairs of vertices in O(V³) time."
    }
  ],
  "dp2_Medium": [
    {
      id: "dp2_m1",
      question: "In Matrix Chain Multiplication, why does the DP recurrence evaluate split positions k between i and j?",
      options: [
        "To find the pivot element for quicksort.",
        "To determine the optimal parenthesization split point that minimizes scalar multiplications for sub-chain A[i..k] × A[k+1..j].",
        "To invert dense matrices in linear time.",
        "To convert matrix multiplication into addition."
      ],
      correctAnswer: 1,
      explanation: "Matrix chain multiplication finds the optimal split k that minimizes cost: dp[i][j] = min_{i shadow k < j} (dp[i][k] + dp[k+1][j] + p_{i-1}p_k p_j)."
    }
  ],
  "dp2_Hard": [
    {
      id: "dp2_h1",
      question: "Why does the Floyd-Warshall algorithm fail when a graph contains a negative weight cycle?",
      options: [
        "Negative weight cycles cause matrix inversion errors.",
        "Paths passing through a negative cycle can be traversed infinitely many times to produce arbitrarily negative distances (-∞), rendering shortest path values undefined.",
        "Floyd-Warshall can only operate on acyclic directed graphs (DAGs).",
        "The space complexity increases from O(V²) to O(V³)."
      ],
      correctAnswer: 1,
      explanation: "A negative cycle allows decreasing path costs infinitely (-∞). Floyd-Warshall detects this if any diagonal entry dp[i][i] becomes negative."
    }
  ],

  // 6. GREEDY I
  "greedy1_Easy": [
    {
      id: "g1_e1",
      question: "What is the core principle of Greedy I algorithms?",
      options: [
        "Explore all combinations before making a decision.",
        "Make the locally optimal choice at each step without backtracking, trusting it leads to a globally optimal solution.",
        "Store subproblem solutions in a dynamic table.",
        "Randomly select choices until a valid state is found."
      ],
      correctAnswer: 1,
      explanation: "Greedy algorithms make top-down locally optimal choices at each decision point without reconsidering previous steps."
    },
    {
      id: "g1_e2",
      question: "Why can the Fractional Knapsack problem be solved using a Greedy strategy while 0/1 Knapsack cannot?",
      options: [
        "Fractional Knapsack allows taking fractions of items, so sorting by value-to-weight ratio guarantees optimal packing without empty capacity waste.",
        "0/1 Knapsack has no weight limit.",
        "Fractional Knapsack requires dynamic programming tables.",
        "Greedy choices always fail on fractional items."
      ],
      correctAnswer: 0,
      explanation: "Fractions allow filling capacity completely with high-ratio items. In 0/1 knapsack, taking a high-ratio item might leave unused capacity that could fit higher total value items."
    }
  ],
  "greedy1_Medium": [
    {
      id: "g1_m1",
      question: "In the Interval Scheduling (Activity Selection) problem, which greedy sorting criteria yields the maximum number of non-overlapping activities?",
      options: [
        "Sort activities by start time ascending.",
        "Sort activities by duration ascending.",
        "Sort activities by finish time ascending.",
        "Sort activities by value descending."
      ],
      correctAnswer: 2,
      explanation: "Selecting the activity that finishes earliest leaves the maximum remaining time for subsequent activities, proving globally optimal."
    }
  ],
  "greedy1_Hard": [
    {
      id: "g1_h1",
      question: "Why does the Greedy choice by value-to-weight ratio fail for 0/1 Knapsack (e.g. Capacity W=50, Items: (w=10, v=60), (w=20, v=100), (w=30, v=120))?",
      options: [
        "Items are unsorted.",
        "Greedy picks item 1 (ratio 6) and item 2 (ratio 5) for total weight 30 and value 160, missing optimal items 2 and 3 (weight 50, total value 220).",
        "Fractional items cannot be processed.",
        "Ratio calculations produce floating point inaccuracies."
      ],
      correctAnswer: 1,
      explanation: "Item 1 has highest ratio (6.0) but leaves 40kg capacity unused by item 3. Combining items 2 (100) and 3 (120) yields value 220, proving greedy choice suboptimal for 0/1."
    }
  ],

  // 7. GREEDY II
  "greedy2_Easy": [
    {
      id: "g2_e1",
      question: "Which two algorithms are standard Greedy II solutions for finding Minimum Spanning Trees (MST)?",
      options: [
        "Dijkstra's and Bellman-Ford",
        "Kruskal's Algorithm and Prim's Algorithm",
        "Quick Sort and Merge Sort",
        "Floyd-Warshall and BFS"
      ],
      correctAnswer: 1,
      explanation: "Kruskal's (edge-based) and Prim's (vertex-based) are greedy algorithms for computing MSTs in weighted connected graphs."
    }
  ],
  "greedy2_Medium": [
    {
      id: "g2_m1",
      question: "What data structure enables Kruskal's algorithm to detect cycles efficiently when adding edges to an MST?",
      options: ["Priority Queue", "Disjoint-Set Union (Union-Find)", "Adjacency Matrix", "Binary Search Tree"],
      correctAnswer: 1,
      explanation: "Union-Find checks if two vertices belong to the same connected component in near O(α(V)) time, preventing cycle creation."
    }
  ],
  "greedy2_Hard": [
    {
      id: "g2_h1",
      question: "Why does Dijkstra's greedy algorithm fail on graphs with negative edge weights?",
      options: [
        "Negative edges cause infinite recursion loops in priority queues.",
        "Dijkstra assumes that adding an edge to a path can only increase path distance. A negative edge can produce a shorter path to an already 'visited' vertex, breaking the greedy greedy choice invariance.",
        "Graph adjacency lists cannot store negative values.",
        "It increases space complexity to O(V²)."
      ],
      correctAnswer: 1,
      explanation: "Once Dijkstra marks a node visited, it never re-evaluates distance. A negative edge found later could yield a shorter path to that visited node, producing incorrect distances (Bellman-Ford needed instead)."
    }
  ],

  // 8. BRANCH & BOUND
  "branch_bound_Easy": [
    {
      id: "bb_e1",
      question: "What is the key mechanism used in Branch & Bound algorithms?",
      options: [
        "Randomly swapping elements until sorted.",
        "Constructing a state-space decision tree (Branching) and using upper/lower bounds to prune subtrees that cannot yield better solutions than current best (Bounding).",
        "Solving overlapping subproblems using 2D tabulation.",
        "Converting non-linear equations into linear representations."
      ],
      correctAnswer: 1,
      explanation: "Branch & Bound systematically splits problems into subproblems (branching) and calculates bounds to discard subtrees that cannot surpass the best known feasible solution."
    }
  ],
  "branch_bound_Medium": [
    {
      id: "bb_m1",
      question: "In solving 0/1 Knapsack via Branch & Bound, how is the upper bound for a decision node calculated?",
      options: [
        "By setting the bound equal to infinity.",
        "By relaxing the remaining items to Fractional Knapsack and greedy packing by value-to-weight ratio.",
        "By calculating the average weight of unselected items.",
        "By counting total leaves in the state-space tree."
      ],
      correctAnswer: 1,
      explanation: "Fractional knapsack greedy choice provides an easily computed upper bound for remaining capacity. If node's upper bound ≤ best_value found so far, the node is pruned."
    }
  ],
  "branch_bound_Hard": [
    {
      id: "bb_h1",
      question: "Compare Branch & Bound vs Backtracking for combinatorial optimization problems. Which statement is correct?",
      options: [
        "Backtracking uses upper/lower bounding functions while Branch & Bound relies strictly on depth-first search.",
        "Backtracking typically uses DFS state exploration to find all valid solutions; Branch & Bound evaluates quantitative bound estimates (FIFO/Best-First via Priority Queue) to find optimal solutions while aggressively pruning suboptimal branches.",
        "Branch & Bound runs in polynomial time for NP-hard problems.",
        "Backtracking cannot be applied to N-Queens."
      ],
      correctAnswer: 1,
      explanation: "Branch & Bound uses quantitative bounds (often with Best-First Search via Priority Queue) specifically tailored to optimization problems, pruning nodes whose bound is worse than current best solution."
    }
  ]
};
