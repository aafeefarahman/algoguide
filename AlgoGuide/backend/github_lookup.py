# Category-level fallback links (verified 200 OK links from TheAlgorithms/Algorithms-Explanation)
CATEGORY_GITHUB_LINKS = {
    "Sorting": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Sorting%20Algorithms",
    "Searching": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Search%20Algorithms",
    "Graph": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Data%20Structures/Graph",
    "Data Structures": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Data%20Structures",
    "Divide & Conquer": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en",
    "Backtracking": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en",
    "Dynamic Programming I": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Dynamic%20Programming",
    "Dynamic Programming II": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Dynamic%20Programming",
    "Greedy I": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Greedy%20Algorithms",
    "Greedy II": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Greedy%20Algorithms",
    "Branch & Bound": "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en"
}

# Exact Explanation Markdown File lookup table (Language independent)
ALGORITHM_EXPLANATION_LOOKUP = {
    # Sorting Algorithms
    "bubble sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Bubble%20Sort.md",
    "quick sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Quick%20Sort.md",
    "merge sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Merge%20Sort.md",
    "heap sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Heap%20Sort.md",
    "insertion sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Insertion%20Sort.md",
    "selection sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Selection%20Sort.md",
    "radix sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Radix%20Sort.md",
    "counting sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Counting%20Sort.md",
    "cycle sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Cycle%20Sort.md",
    "shell sort": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Shell%20Sort.md",
    
    # Search Algorithms
    "binary search": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Search%20Algorithms/Binary%20Search.md",
    "linear search": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Search%20Algorithms/Linear%20Search.md",
    "quick select": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Selection%20Algorithms/Quick%20Select.md",

    # Graph Algorithms
    "bellman-ford": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Data%20Structures/Graph/Bellman-Ford.md",

    # Dynamic Programming Algorithms
    "longest common subsequence": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Dynamic%20Programming/Longest%20Common%20Subsequence.md",
    "coin change": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Dynamic%20Programming/Coin%20Change.md",
    "kadane's algorithm": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Dynamic%20Programming/Kadane's%20Algorithm.md",
    "longest increasing subsequence": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Dynamic%20Programming/Longest%20Increasing%20Subsequence.md",

    # Greedy Algorithms
    "fractional knapsack": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Greedy%20Algorithms/Fractional%20Knapsack.md",

    # Data Structures
    "trie": "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Data%20Structures/Tries/trie.md"
}

def get_algorithm_github_url(algorithm_name: str, category: str, language: str = "python") -> str:
    norm_name = (algorithm_name or "").lower().strip()
    
    if norm_name in ALGORITHM_EXPLANATION_LOOKUP:
        return ALGORITHM_EXPLANATION_LOOKUP[norm_name]
        
    return CATEGORY_GITHUB_LINKS.get(
        category,
        "https://github.com/TheAlgorithms/Algorithms-Explanation"
    )
