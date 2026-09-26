export const HOMEPAGE_CATEGORIES = [
  {
    id: "sorting",
    title: "Sorting",
    iconName: "ArrowUpDown",
    description: "Algorithms for arranging elements in a specific order (ascending or descending).",
    badge: "5 Algorithms",
    algorithms: [
      { name: "Bubble Sort", description: "Repeatedly swaps adjacent elements if they are in wrong order.", time: "O(n²)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/bubble-sort-algorithm/" },
      { name: "Quick Sort", description: "Divide-and-conquer algorithm picking a pivot and partitioning elements.", time: "O(n log n)", space: "O(log n)", resourceLink: "https://www.geeksforgeeks.org/quick-sort-algorithm/" },
      { name: "Merge Sort", description: "Divides array into halves, recursively sorts them, and merges back.", time: "O(n log n)", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/merge-sort/" },
      { name: "Heap Sort", description: "Uses a binary heap data structure to extract minimum/maximum elements.", time: "O(n log n)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/heap-sort/" },
      { name: "Insertion Sort", description: "Builds sorted array one item at a time by inserting in correct position.", time: "O(n²)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/insertion-sort-algorithm/" }
    ]
  },
  {
    id: "searching",
    title: "Searching",
    iconName: "Search",
    description: "Algorithms for retrieving information stored within data structures.",
    badge: "4 Algorithms",
    algorithms: [
      { name: "Binary Search", description: "Finds position of a target value within a sorted array in logarithmic time.", time: "O(log n)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/binary-search/" },
      { name: "Linear Search", description: "Checks every element in the list sequentially until match is found.", time: "O(n)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/linear-search/" },
      { name: "Ternary Search", description: "Divides search space into three parts to find maximum/minimum of unimodal function.", time: "O(log₃ n)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/dsa/ternary-search/" },
      { name: "Quick Select", description: "Selection algorithm to find the k-th smallest element in an unordered list.", time: "O(n)", space: "O(1)", resourceLink: "https://www.geeksforgeeks.org/dsa/quickselect-algorithm/" }
    ]
  },
  {
    id: "graph",
    title: "Graph",
    iconName: "Network",
    description: "Algorithms operating on network structures consisting of nodes (vertices) and connections (edges).",
    badge: "6 Algorithms",
    algorithms: [
      { name: "Dijkstra's Algorithm", description: "Finds the shortest path from a source vertex to all vertices in a weighted graph.", time: "O((V+E) log V)", space: "O(V)", resourceLink: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" },
      { name: "Breadth First Search (BFS)", description: "Traverses graph level-by-level using a queue; ideal for unweighted shortest paths.", time: "O(V + E)", space: "O(V)", resourceLink: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" },
      { name: "Depth First Search (DFS)", description: "Explores graph as deep as possible along each branch before backtracking.", time: "O(V + E)", space: "O(V)", resourceLink: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" },
      { name: "Topological Sort", description: "Linear ordering of vertices such that for every directed edge u->v, u comes before v.", time: "O(V + E)", space: "O(V)", resourceLink: "https://www.geeksforgeeks.org/topological-sorting/" },
      { name: "Bellman-Ford", description: "Computes shortest paths from a single source in graphs with negative edge weights.", time: "O(V · E)", space: "O(V)", resourceLink: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/" },
      { name: "Floyd-Warshall", description: "All-pairs shortest path algorithm operating on dense adjacency matrices.", time: "O(V³)", space: "O(V²)", resourceLink: "https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/" }
    ]
  },
  {
    id: "data-structures",
    title: "Data Structures",
    iconName: "Layers",
    description: "Foundational ways of organizing and storing data to enable efficient access and modification.",
    badge: "5 Structures",
    algorithms: [
      { name: "Trie", description: "Tree-like data structure used to efficiently store and search strings/prefixes.", time: "O(m)", space: "O(n · m)", resourceLink: "https://www.geeksforgeeks.org/trie-insert-and-search/" },
      { name: "Binary Search Tree", description: "Node-based binary tree data structure maintaining sorted ordering.", time: "O(log n)", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/" },
      { name: "Min Heap", description: "Complete binary tree where parent node is always smaller than child nodes.", time: "O(log n)", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/binary-heap/" },
      { name: "Disjoint Set (Union-Find)", description: "Tracks elements partitioned into non-overlapping subsets with near-constant ops.", time: "O(α(n))", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/introduction-to-disjoint-set-data-structure-or-union-find-algorithm/" },
      { name: "AVL Tree", description: "Self-balancing binary search tree maintaining logarithmic height bound.", time: "O(log n)", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/" }
    ]
  }
];

export const ALL_TAXONOMY_CATEGORIES = [
  ...HOMEPAGE_CATEGORIES,
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    iconName: "BrainCircuit",
    description: "Solves complex problems by breaking them down into simpler overlapping subproblems and memoizing results.",
    badge: "4 Algorithms",
    algorithms: [
      { name: "Longest Common Subsequence", description: "Finds longest subsequence present in two sequences in same relative order.", time: "O(m · n)", space: "O(m · n)", resourceLink: "" },
      { name: "0/1 Knapsack", description: "Determines item selection to maximize total value without exceeding weight capacity.", time: "O(n · W)", space: "O(n · W)", resourceLink: "" },
      { name: "Coin Change", description: "Finds minimum number of coins needed to make up a given target amount.", time: "O(n · amount)", space: "O(amount)", resourceLink: "" },
      { name: "Fibonacci (DP)", description: "Computes n-th Fibonacci number using bottom-up tabulating in linear time.", time: "O(n)", space: "O(1)", resourceLink: "" }
    ]
  },
  {
    id: "greedy",
    title: "Greedy",
    iconName: "Zap",
    description: "Makes locally optimal choices at each step with the goal of finding a global optimum.",
    badge: "4 Algorithms",
    algorithms: [
      { name: "Kruskal's Algorithm", description: "Finds minimum spanning tree by sorting edges and adding non-cyclical smallest edges.", time: "O(E log E)", space: "O(V + E)", resourceLink: "https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" },
      { name: "Prim's Algorithm", description: "Grows minimum spanning tree from an arbitrary starting vertex using priority queue.", time: "O(E log V)", space: "O(V)", resourceLink: "" },
      { name: "Fractional Knapsack", description: "Greedy choice based on value-to-weight ratio allowing item fractions.", time: "O(n log n)", space: "O(1)", resourceLink: "" },
      { name: "Huffman Coding", description: "Lossless data compression algorithm assigning variable-length codes based on frequencies.", time: "O(n log n)", space: "O(n)", resourceLink: "" }
    ]
  },
  {
    id: "divide-conquer",
    title: "Divide & Conquer",
    iconName: "GitFork",
    description: "Breaks problem into independent subproblems, solves subproblems recursively, and combines results.",
    badge: "3 Algorithms",
    algorithms: [
      { name: "Merge Sort", description: "Splits array into halves, sorts independently, and merges sorted sub-arrays.", time: "O(n log n)", space: "O(n)", resourceLink: "https://www.geeksforgeeks.org/merge-sort/" },
      { name: "Quick Sort", description: "Selects pivot element, partitions around pivot, and recurses on left/right.", time: "O(n log n)", space: "O(log n)", resourceLink: "https://www.geeksforgeeks.org/quick-sort-algorithm/" },
      { name: "Closest Pair of Points", description: "Finds pair of points with smallest distance in 2D plane in O(n log n).", time: "O(n log n)", space: "O(n)", resourceLink: "" }
    ]
  },
  {
    id: "backtracking",
    title: "Backtracking",
    iconName: "RotateCcw",
    description: "Explores all possible candidate solutions incrementally and abandons (backtracks) invalid paths early.",
    badge: "3 Algorithms",
    algorithms: [
      { name: "N-Queens", description: "Places N chess queens on N×N board so no two queens attack each other.", time: "O(N!)", space: "O(N)", resourceLink: "" },
      { name: "Sudoku Solver", description: "Fills 9×9 grid satisfying row, column, and 3×3 subgrid constraints.", time: "O(9^(n*n))", space: "O(n*n)", resourceLink: "" },
      { name: "Subset Sum", description: "Finds subset of numbers that sum up to a specified target value.", time: "O(2ⁿ)", space: "O(n)", resourceLink: "" }
    ]
  }
];
