// Curated DAA & Algorithmic Keyword Glossary Dataset (55+ Terms)
export const GLOSSARY_TERMS = [
  {
    id: "shortest-path",
    term: "Shortest Path",
    aliases: ["shortest path", "shortest paths", "minimum distance", "least cost route", "fastest path", "shortest route"],
    meaning: "The path between two vertices in a graph such that the sum of the weights of its constituent edges is minimized.",
    whyItMatters: "Core problem behind GPS navigation, routing protocols, logistics scheduling, and network latency optimization.",
    category: "Graph Theory",
    link: "/resources#greedy-ii"
  },
  {
    id: "weighted-graph",
    term: "Weighted Graph",
    aliases: ["weighted graph", "weighted graphs", "edge weights", "weighted edges", "edge cost", "weighted network"],
    meaning: "A graph where each edge is assigned a numerical value or weight representing distance, cost, time, or capacity.",
    whyItMatters: "Models real-world scenarios where connections have varying trade-offs rather than uniform unit distances.",
    category: "Graph Theory",
    link: "/resources#greedy-ii"
  },
  {
    id: "dijkstra",
    term: "Dijkstra's Algorithm",
    aliases: ["dijkstra", "dijkstra's algorithm", "dijkstra algorithm", "single-source shortest path", "sssp"],
    meaning: "A greedy graph search algorithm that finds the shortest path from a single source vertex to all other vertices in non-negative weighted graphs.",
    whyItMatters: "Achieves optimal O((V + E) log V) performance using a min-priority queue and guarantees correctness without exhaustive search.",
    category: "Greedy II",
    link: "/resources#greedy-ii"
  },
  {
    id: "priority-queue",
    term: "Priority Queue / Min-Heap",
    aliases: ["priority queue", "priority queues", "min-heap", "min heap", "binary heap", "heap structure"],
    meaning: "An abstract data structure where each element has a priority, and the element with the highest priority (or minimum key) is served first.",
    whyItMatters: "Enables O(log N) vertex extraction in Dijkstra's, Prim's, and Huffman coding instead of inefficient O(N) linear scans.",
    category: "Data Structures",
    link: "/resources#greedy-ii"
  },
  {
    id: "knapsack",
    term: "0/1 Knapsack Problem",
    aliases: ["0/1 knapsack", "knapsack problem", "knapsack", "knapsacks", "knapsack capacity", "bag capacity"],
    meaning: "An optimization problem where given a set of items with weights and values, you must determine which items to include in a collection without exceeding maximum capacity.",
    whyItMatters: "Classic NP-complete combinatorial problem solved in pseudo-polynomial O(N·W) time using dynamic programming.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "capacity-constraint",
    term: "Capacity & Weight Limit",
    aliases: ["weight limit", "capacity constraint", "bag limit", "maximum weight", "knapsack bound"],
    meaning: "The strict upper bound condition W in the knapsack problem that restricts the total sum of weights of selected items.",
    whyItMatters: "Defines the 2nd dimension in the DP state matrix Table[i][w] and determines the pseudo-polynomial complexity bound.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "dynamic-programming",
    term: "Dynamic Programming (DP)",
    aliases: ["dynamic programming", "dp", "memoization", "tabulation", "dp table", "subproblem caching"],
    meaning: "An algorithm design paradigm that solves complex problems by breaking them down into simpler overlapping subproblems and caching intermediate solutions.",
    whyItMatters: "Eliminates redundant exponential calculations by storing results in lookup tables, transforming O(2ⁿ) into polynomial time.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "optimal-substructure",
    term: "Optimal Substructure",
    aliases: ["optimal substructure", "substructure optimality", "subproblem optimality"],
    meaning: "A problem property where an optimal solution to the overall problem contains within it optimal solutions to its subproblems.",
    whyItMatters: "The foundational prerequisite that guarantees Dynamic Programming and Greedy strategies can compute correct global optima.",
    category: "Algorithm Design",
    link: "/resources#dp-i"
  },
  {
    id: "overlapping-subproblems",
    term: "Overlapping Subproblems",
    aliases: ["overlapping subproblems", "repeated subproblems", "recurrent states", "duplicate subproblems"],
    meaning: "A property where a recursive algorithm revisits and recomputes the exact same smaller subproblems repeatedly.",
    whyItMatters: "Distinguishes problems that benefit from Dynamic Programming (memoization/tabulation) from standard Divide & Conquer.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "branch-and-bound",
    term: "Branch & Bound",
    aliases: ["branch and bound", "branch & bound", "bounding function", "state space tree", "branch-and-bound"],
    meaning: "A systematic state-space search algorithm that prunes subtrees whose estimated bound cannot beat the best known solution.",
    whyItMatters: "Solves discrete and combinatorial optimization problems (Knapsack, TSP, Job Assignment) by cutting off huge unpromising branches early.",
    category: "Branch & Bound",
    link: "/resources#branch-and-bound"
  },
  {
    id: "backtracking",
    term: "Backtracking",
    aliases: ["backtracking", "backtrack", "backtracks", "recursive exploration", "trial and error search"],
    meaning: "An algorithmic technique that incrementally builds candidates to the solutions and abandons ('backtracks' from) a candidate as soon as it determines it cannot possibly lead to a valid solution.",
    whyItMatters: "Drastically reduces the search space for constraint satisfaction problems like N-Queens, Sudoku, and Hamiltonian cycles.",
    category: "Backtracking",
    link: "/resources#backtracking"
  },
  {
    id: "n-queens",
    term: "N-Queens Problem",
    aliases: ["n-queens", "n queens", "n-queen", "queens on a chessboard", "eight queens", "8 queens"],
    meaning: "The challenge of placing N non-attacking chess queens on an N×N chessboard so that no two queens share the same row, column, or diagonal.",
    whyItMatters: "Benchmark problem for constraint satisfaction, state-space pruning, and recursive backtracking optimization.",
    category: "Backtracking",
    link: "/resources#backtracking"
  },
  {
    id: "board-placement-constraint",
    term: "Chessboard Placement Constraints",
    aliases: ["chessboard placement", "chessboard", "board placement", "non-attacking queens", "diagonal conflict", "row conflict"],
    meaning: "The geometric condition requiring all placed pieces to not share rows, columns, or diagonal lines on an N×N board.",
    whyItMatters: "Directly verified via column vectors `col[x]` and diagonal arrays `diag1[x+y]` / `diag2[x-y]` in O(1) time.",
    category: "Backtracking",
    link: "/resources#backtracking"
  },
  {
    id: "quick-sort",
    term: "Quick Sort",
    aliases: ["quick sort", "quicksort", "partitioning sort", "pivot sorting"],
    meaning: "A divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions array items into two sub-arrays according to whether they are less or greater than the pivot.",
    whyItMatters: "Industry-standard sorting with O(N log N) average execution, low constant factors, and excellent in-place memory cache locality.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "divide-and-conquer",
    term: "Divide & Conquer",
    aliases: ["divide and conquer", "divide-and-conquer", "d&c", "divide & conquer", "recursive partitioning"],
    meaning: "An algorithmic paradigm that breaks a problem into non-overlapping subproblems, solves them recursively, and combines their solutions.",
    whyItMatters: "Powers optimal algorithms for sorting (Merge/Quick Sort), matrix multiplication (Strassen's), and binary search.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "sorting",
    term: "Sorting Algorithm",
    aliases: ["sort", "sorting", "sort a large dataset", "sorted array", "sorted list", "ascending order", "descending order", "ordering"],
    meaning: "An algorithm that arranges elements of a list or array in a specific comparative order (numerical, lexicographical, or custom keys).",
    whyItMatters: "Fundamental primitive that unlocks binary search, database indexing, deduplication, and geometric processing.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "pivot",
    term: "Pivot Element",
    aliases: ["pivot", "pivot element", "pivot value", "partition pivot"],
    meaning: "The chosen reference element in Quick Sort used to partition an array into smaller and larger subsets.",
    whyItMatters: "Pivot choice (randomized, median-of-three) determines whether Quick Sort maintains O(N log N) or degrades to worst-case O(N²).",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "binary-search",
    term: "Binary Search",
    aliases: ["binary search", "logarithmic search", "half-interval search", "bsearch"],
    meaning: "A search algorithm that finds the position of a target value within a sorted array by comparing against the middle element and halving the search interval.",
    whyItMatters: "Provides ultra-fast O(log N) lookup time, scaling effortlessly to billions of items with only ~30 comparisons.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "greedy-algorithm",
    term: "Greedy Strategy",
    aliases: ["greedy", "greedy algorithm", "greedy choice", "locally optimal choice", "greedy paradigm"],
    meaning: "An algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate local benefit.",
    whyItMatters: "Provides simple, blazing-fast algorithms when the greedy choice property holds (e.g., Dijkstra, Kruskal, Huffman Coding).",
    category: "Greedy I & II",
    link: "/resources#greedy-i"
  },
  {
    id: "time-complexity",
    term: "Time Complexity (Big-O)",
    aliases: ["time complexity", "big-o", "big o", "asymptotic time", "running time", "execution time", "worst-case time", "average-case time"],
    meaning: "A theoretical measure quantifying the amount of computational time an algorithm takes to run as a function of input size (N).",
    whyItMatters: "Enables rigorous performance comparison independent of hardware, programming language, or test machine speed.",
    category: "Asymptotic Analysis",
    link: "/resources#analysis"
  },
  {
    id: "space-complexity",
    term: "Space Complexity",
    aliases: ["space complexity", "auxiliary space", "memory consumption", "memory footprint", "space bound"],
    meaning: "The total memory or storage space required by an algorithm to execute to completion, including auxiliary data structures and stack memory.",
    whyItMatters: "Prevents memory overflow (OOM) and stack overflow errors in embedded, serverless, and large-scale cloud environments.",
    category: "Asymptotic Analysis",
    link: "/resources#analysis"
  },
  {
    id: "state-space-tree",
    term: "State Space Tree",
    aliases: ["state space tree", "state-space tree", "decision tree", "search tree", "game tree"],
    meaning: "A tree representation of all possible states or decision paths evaluated by search, backtracking, or branch-and-bound algorithms.",
    whyItMatters: "Provides the geometric framework used to visualize branch exploration, node bounding, and backtracking tree depth.",
    category: "Backtracking",
    link: "/resources#backtracking"
  },
  {
    id: "pruning",
    term: "Tree Pruning",
    aliases: ["pruning", "prune", "pruning invalid choices", "bound pruning", "alpha-beta pruning"],
    meaning: "The process of terminating exploration of a branch in a search tree as soon as it is proven incapable of producing a feasible or optimal solution.",
    whyItMatters: "Dramatically reduces exponential search spaces, converting unfeasible searches into tractable computations.",
    category: "Branch & Bound",
    link: "/resources#branch-and-bound"
  },
  {
    id: "merge-sort",
    term: "Merge Sort",
    aliases: ["merge sort", "mergesort", "merge-sort"],
    meaning: "A stable divide-and-conquer sorting algorithm that divides the array in half, sorts each half recursively, and merges the two sorted halves.",
    whyItMatters: "Guarantees strictly worst-case O(N log N) runtime and stable ordering, making it the algorithm of choice for linked lists and external disk sorting.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "bellman-ford",
    term: "Bellman-Ford Algorithm",
    aliases: ["bellman-ford", "bellman ford", "negative edge weights", "negative weight cycle"],
    meaning: "A dynamic programming graph algorithm that computes single-source shortest paths and detects negative weight cycles in O(V · E) time.",
    whyItMatters: "Handles graphs with negative edge weights where greedy Dijkstra fails, and serves as the foundation for distance-vector routing (RIP).",
    category: "Dynamic Programming II",
    link: "/resources#dp-ii"
  },
  {
    id: "floyd-warshall",
    term: "Floyd-Warshall Algorithm",
    aliases: ["floyd-warshall", "floyd warshall", "all-pairs shortest path", "apsp"],
    meaning: "An all-pairs shortest path dynamic programming algorithm that finds the shortest routes between all pairs of vertices in O(V³) time.",
    whyItMatters: "Provides a concise matrix-based solution to find transitivity and all-pairs network distances across dense graphs.",
    category: "Dynamic Programming II",
    link: "/resources#dp-ii"
  },
  {
    id: "minimum-spanning-tree",
    term: "Minimum Spanning Tree (MST)",
    aliases: ["minimum spanning tree", "mst", "kruskal", "prim", "spanning tree"],
    meaning: "A subset of edges in an undirected, weighted graph that connects all vertices together without cycles and with the minimum possible total edge weight.",
    whyItMatters: "Optimizes infrastructure layouts (telecom networks, electrical grids, road design) with minimal cabling and wiring costs.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "huffman-coding",
    term: "Huffman Coding",
    aliases: ["huffman coding", "huffman tree", "lossless data compression", "variable-length prefix code", "entropy encoding"],
    meaning: "A greedy prefix-coding algorithm that assigns variable-length binary codes to characters based on their frequencies of occurrence.",
    whyItMatters: "Foundational lossless compression technique utilized in JPEG, MP3, GZIP, and PKZIP formats.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "topological-sort",
    term: "Topological Sort",
    aliases: ["topological sort", "topological sorting", "dag", "directed acyclic graph", "kahn's algorithm", "dependency resolution"],
    meaning: "A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u → v, vertex u comes before v.",
    whyItMatters: "Essential for task scheduling, build systems (Webpack, Makefiles), database migrations, and package package dependency resolution.",
    category: "Graph Algorithms",
    link: "/resources#graph"
  },
  {
    id: "job-sequencing",
    term: "Job Sequencing with Deadlines",
    aliases: ["job sequencing", "job scheduling", "deadlines", "deadline scheduling", "job sequence with deadline"],
    meaning: "A greedy scheduling problem where each job has a deadline and profit, aiming to maximize total profit by executing jobs within their allowable time slots.",
    whyItMatters: "Core model for OS CPU task scheduling, batch job dispatchers, and resource allocation under temporal constraints.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "strassen-matrix",
    term: "Strassen's Matrix Multiplication",
    aliases: ["strassen", "strassen's algorithm", "matrix multiplication", "fast matrix multiply"],
    meaning: "A divide-and-conquer algorithm that multiplies two N×N matrices using 7 recursive sub-multiplications instead of 8, achieving O(N^2.807) time.",
    whyItMatters: "Historically broke the O(N³) cubic barrier and paved the way for advanced sub-cubic linear algebra in scientific computing.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "longest-common-subsequence",
    term: "Longest Common Subsequence (LCS)",
    aliases: ["lcs", "longest common subsequence", "diff algorithm", "string alignment"],
    meaning: "A dynamic programming algorithm that finds the longest subsequence present in two sequences in the same relative order.",
    whyItMatters: "Underpins git diff tools, DNA sequence bioinformatics alignment, and spell-checking similarity calculations.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "matrix-chain-multiplication",
    term: "Matrix Chain Multiplication (MCM)",
    aliases: ["matrix chain multiplication", "mcm", "matrix parenthesization", "optimal parenthesization"],
    meaning: "A dynamic programming problem that determines the most efficient way to multiply a chain of matrices by optimal parenthesization.",
    whyItMatters: "Drastically reduces total scalar multiplications in heavy numeric computing, computer graphics pipelines, and deep neural net feedforwards.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "travelling-salesperson",
    term: "Travelling Salesperson Problem (TSP)",
    aliases: ["travelling salesperson", "tsp", "traveling salesman", "hamiltonian cycle cost"],
    meaning: "An NP-hard problem asking for the shortest possible route that visits every city exactly once and returns to the origin city.",
    whyItMatters: "Classic benchmark for exact DP with bitmasks (Held-Karp O(N²2ⁿ)), Branch & Bound, and heuristic approximation algorithms.",
    category: "Branch & Bound",
    link: "/resources#branch-and-bound"
  },
  {
    id: "np-complete",
    term: "NP-Completeness",
    aliases: ["np-complete", "np complete", "np-hard", "np hard", "polynomial time verification", "intractable"],
    meaning: "A classification of decision problems whose solutions can be verified in polynomial time, but no known polynomial-time algorithm exists to solve them.",
    whyItMatters: "Informs engineers when to stop searching for an exact polynomial-time algorithm and pivot to heuristics, approximation, or DP/Branch & Bound.",
    category: "Complexity Theory",
    link: "/resources#complexity"
  },
  {
    id: "graph-traversal",
    term: "Graph Traversal (BFS & DFS)",
    aliases: ["breadth-first search", "bfs", "depth-first search", "dfs", "graph traversal", "tree traversal"],
    meaning: "Systematic techniques for visiting every vertex and edge in a graph or tree data structure.",
    whyItMatters: "Foundational building block for cycle detection, connected components, garbage collection, and game search trees.",
    category: "Graph Theory",
    link: "/resources#graph"
  },
  {
    id: "in-place-algorithm",
    term: "In-Place Algorithm",
    aliases: ["in-place", "in place", "in-place sorting", "o(1) auxiliary space"],
    meaning: "An algorithm that transforms input data without allocating substantial auxiliary data structures, using O(1) or O(log N) extra space.",
    whyItMatters: "Crucial for systems with restricted memory budgets (embedded microcontrollers, mobile kernels, multi-gigabyte in-memory databases).",
    category: "Algorithm Design",
    link: "/resources#analysis"
  },
  {
    id: "memoization",
    term: "Memoization (Top-Down DP)",
    aliases: ["memoization", "memoized", "top-down dp", "recursive caching"],
    meaning: "An optimization technique that speeds up recursive functions by storing the results of expensive function calls in a cache.",
    whyItMatters: "Combines the natural readability of recursion with the execution efficiency of dynamic programming.",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "tabulation",
    term: "Tabulation (Bottom-Up DP)",
    aliases: ["tabulation", "bottom-up dp", "iterative dp", "table filling"],
    meaning: "An approach to dynamic programming that solves all subproblems starting from the smallest base cases and populates a table iteratively.",
    whyItMatters: "Avoids call-stack overflow overhead and enables space-optimization tricks (rolling arrays / 1D compression).",
    category: "Dynamic Programming I",
    link: "/resources#dp-i"
  },
  {
    id: "fractional-knapsack",
    term: "Fractional Knapsack",
    aliases: ["fractional knapsack", "continuous knapsack", "greedy knapsack", "value-to-weight ratio"],
    meaning: "A variation of the knapsack problem where items can be broken into fractions, solved optimally using a greedy value-to-weight ratio in O(N log N).",
    whyItMatters: "Contrasts with the discrete 0/1 knapsack, highlighting the boundary between greedy tractability and dynamic programming requirements.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "bitmask",
    term: "Bitmask Optimization",
    aliases: ["bitmask", "bitmasks", "bitwise operations", "bit manipulation", "binary state representation"],
    meaning: "Using integers as compact bit arrays to represent sets, states, or boolean visited configurations in O(1) time.",
    whyItMatters: "Accelerates state lookups in N-Queens, TSP, and dynamic programming by replacing hash tables with lightning-fast CPU bitwise operations.",
    category: "Optimization",
    link: "/resources#backtracking"
  },
  {
    id: "disjoint-set",
    term: "Disjoint Set Union (DSU / Union-Find)",
    aliases: ["disjoint set", "union find", "union-find", "dsu", "path compression"],
    meaning: "A data structure that tracks elements partitioned into disjoint subsets, supporting near-constant O(α(N)) find and union operations.",
    whyItMatters: "The backbone of Kruskal's MST algorithm, cycle detection in graphs, and connected-component clustering.",
    category: "Data Structures",
    link: "/resources#greedy-i"
  },
  {
    id: "amortized-analysis",
    term: "Amortized Analysis",
    aliases: ["amortized time", "amortized analysis", "amortized complexity", "aggregate analysis"],
    meaning: "A method of analyzing algorithms that guarantees the average performance of each operation over a worst-case sequence of operations.",
    whyItMatters: "Explains why dynamic arrays (resizing lists) and Union-Find maintain blazing practical speeds despite occasional expensive steps.",
    category: "Asymptotic Analysis",
    link: "/resources#analysis"
  },
  {
    id: "recursion",
    term: "Recursion & Call Stack",
    aliases: ["recursion", "recursive", "call stack", "recurrence relation", "base case"],
    meaning: "A computational method where a function calls itself with smaller inputs until reaching a terminal base case.",
    whyItMatters: "Natural vehicle for expressing divide-and-conquer, depth-first traversals, and mathematical induction.",
    category: "Algorithm Design",
    link: "/resources#divide-conquer"
  },
  {
    id: "master-theorem",
    term: "Master Theorem",
    aliases: ["master theorem", "recurrence relation solving", "divide-and-conquer recurrence"],
    meaning: "A mathematical formula providing closed-form Big-O bounds for recurrence relations of the form T(n) = aT(n/b) + f(n).",
    whyItMatters: "Enables instant complexity derivation for Merge Sort, Quick Sort, Binary Search, and Strassen's without expanding full recursion trees.",
    category: "Asymptotic Analysis",
    link: "/resources#analysis"
  },
  {
    id: "asymptotic-notation",
    term: "Asymptotic Notations (Big-O, Omega, Theta)",
    aliases: ["big-omega", "big-theta", "asymptotic notation", "upper bound", "tight bound", "lower bound"],
    meaning: "Mathematical notations used to describe the limiting behavior of a function when the input argument tends towards infinity.",
    whyItMatters: "Formal mathematical standard for classifying algorithm runtime upper bounds (O), lower bounds (Ω), and tight bounds (Θ).",
    category: "Asymptotic Analysis",
    link: "/resources#analysis"
  },
  {
    id: "constraint-satisfaction",
    term: "Constraint Satisfaction Problem (CSP)",
    aliases: ["constraint satisfaction", "csp", "constraints", "conflict detection", "valid board"],
    meaning: "A mathematical problem defined as a set of objects whose state must satisfy a number of constraints or limitations.",
    whyItMatters: "Forms the theoretical foundation for N-Queens, map coloring, Sudoku solvers, and automated compiler register allocation.",
    category: "Backtracking",
    link: "/resources#backtracking"
  },
  {
    id: "dataset-scale",
    term: "Large Dataset Scaling",
    aliases: ["large dataset", "large datasets", "large array", "big data", "scale", "million elements", "scalability"],
    meaning: "The challenge of processing large volumes of data where algorithm asymptotic efficiency and cache locality become critical bottlenecks.",
    whyItMatters: "Quadratic O(N²) algorithms stall completely at N=100,000, whereas O(N log N) algorithms finish in milliseconds.",
    category: "Scalability",
    link: "/resources#analysis"
  },
  {
    id: "linear-search",
    term: "Linear Search",
    aliases: ["linear search", "sequential search", "scan", "exhaustive search"],
    meaning: "A simple search algorithm that checks every element of a list sequentially until a match is found or the whole list has been searched.",
    whyItMatters: "Requires no prior sorting or preprocessing, but scales linearly O(N), becoming slow for massive collections.",
    category: "Searching",
    link: "/resources#divide-conquer"
  },
  {
    id: "heap-sort",
    term: "Heap Sort",
    aliases: ["heap sort", "heapsort", "binary heap sort"],
    meaning: "A comparison-based sorting algorithm that uses a binary heap data structure to divide its input into a sorted and an unsorted region in O(N log N).",
    whyItMatters: "Guarantees O(N log N) worst-case time with strictly O(1) auxiliary space, immune to Quick Sort's worst-case degradation.",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  },
  {
    id: "adjacency-list",
    term: "Adjacency List & Matrix",
    aliases: ["adjacency list", "adjacency matrix", "graph representation", "graph representation formats", "vertex list"],
    meaning: "Data structures used to represent graphs in computer memory by storing lists of neighbors or 2D edge connection grids.",
    whyItMatters: "Adjacency lists save memory O(V + E) for sparse graphs, while adjacency matrices enable O(1) edge lookups for dense graphs.",
    category: "Data Structures",
    link: "/resources#graph"
  },
  {
    id: "greedy-choice-property",
    term: "Greedy Choice Property",
    aliases: ["greedy choice property", "locally optimal choice leads to global optimum"],
    meaning: "The condition where a globally optimal solution can always be arrived at by selecting a locally optimal (greedy) choice at each stage.",
    whyItMatters: "The decisive criterion distinguishing problems solvable with fast greedy methods from those requiring full dynamic programming.",
    category: "Greedy I & II",
    link: "/resources#greedy-i"
  },
  {
    id: "kruskal-algorithm",
    term: "Kruskal's Algorithm",
    aliases: ["kruskal", "kruskal's algorithm", "kruskal algorithm", "edge-based mst"],
    meaning: "A greedy algorithm that finds a Minimum Spanning Tree by sorting all edges and adding them one by one if they do not create a cycle.",
    whyItMatters: "Optimal O(E log E) MST algorithm for sparse graphs when combined with Disjoint Set Union.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "prim-algorithm",
    term: "Prim's Algorithm",
    aliases: ["prim", "prim's algorithm", "prim algorithm", "vertex-growing mst"],
    meaning: "A greedy algorithm that builds a Minimum Spanning Tree by continuously growing a single tree from an arbitrary starting vertex.",
    whyItMatters: "Runs in O((V + E) log V) with a Fibonacci or binary heap, outperforming Kruskal on dense graphs.",
    category: "Greedy I",
    link: "/resources#greedy-i"
  },
  {
    id: "bfs-algorithm",
    term: "Breadth-First Search (BFS)",
    aliases: ["bfs", "breadth first search", "breadth-first search", "level order traversal", "queue traversal"],
    meaning: "A graph traversal algorithm that explores all neighbor nodes at the present depth level before moving on to nodes at the next depth level.",
    whyItMatters: "Guarantees finding the shortest path in unweighted graphs in strictly linear O(V + E) time.",
    category: "Graph Theory",
    link: "/resources#graph"
  },
  {
    id: "dfs-algorithm",
    term: "Depth-First Search (DFS)",
    aliases: ["dfs", "depth first search", "depth-first search", "deep traversal"],
    meaning: "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    whyItMatters: "Core mechanism for cycle detection, topological sorting, connected components, and maze solving.",
    category: "Graph Theory",
    link: "/resources#graph"
  },
  {
    id: "combinatorial-optimization",
    term: "Combinatorial Optimization",
    aliases: ["combinatorial optimization", "discrete optimization", "subset selection", "exhaustive combinations"],
    meaning: "A mathematical branch focusing on finding optimal objects from a finite, discrete set of possible configurations.",
    whyItMatters: "Encompasses Knapsack, TSP, Vertex Cover, and Bin Packing where brute force is exponentially intractable.",
    category: "Algorithm Design",
    link: "/resources#branch-and-bound"
  },
  {
    id: "stable-sorting",
    term: "Stable Sorting",
    aliases: ["stable sorting", "stability in sorting", "stable sort"],
    meaning: "A sorting algorithm property where equal elements retain their relative original order in the sorted output.",
    whyItMatters: "Crucial for multi-key database sorting (e.g., sorting by Date, then sorting by City without scrambling dates).",
    category: "Divide & Conquer",
    link: "/resources#divide-conquer"
  }
];

// Matching Utility: extracts matched terms sorted by longest phrase first
export function matchGlossaryKeywords(text, maxResults = 8) {
  if (!text || typeof text !== 'string') return [];
  const normalizedText = text.toLowerCase();
  
  // Sort terms by length of longest matching alias (longest phrase first)
  const sortedGlossary = [...GLOSSARY_TERMS].sort((a, b) => {
    const maxA = Math.max(a.term.length, ...a.aliases.map(x => x.length));
    const maxB = Math.max(b.term.length, ...b.aliases.map(x => x.length));
    return maxB - maxA;
  });

  const matched = [];
  const seenIds = new Set();

  for (const item of sortedGlossary) {
    // Check canonical term and all aliases
    const candidates = [item.term, ...item.aliases];
    let isMatched = false;

    for (const candidate of candidates) {
      const candNorm = candidate.toLowerCase();
      // Use word boundary regex where possible for precision
      const escaped = candNorm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');

      if (regex.test(normalizedText) || normalizedText.includes(candNorm)) {
        isMatched = true;
        break;
      }
    }

    if (isMatched && !seenIds.has(item.id)) {
      seenIds.add(item.id);
      matched.push(item);
      if (matched.length >= maxResults) break;
    }
  }

  return matched;
}
