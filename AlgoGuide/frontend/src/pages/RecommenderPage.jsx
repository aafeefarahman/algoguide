import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommenderForm from '../components/RecommenderForm';
import RecommendationResult from '../components/RecommendationResult';
import { buildApiUrl } from '../config';

// Client-side fallback recommendations for instant responsive UX
const FALLBACK_RECOMMENDATIONS = {
  knapsack: {
    algorithmName: "0/1 Knapsack (DP Formulation)",
    category: "Dynamic Programming I",
    confidence: "High",
    timeComplexity: "O(n × W)",
    spaceComplexity: "O(n × W)",
    timeExplanation: "The algorithm considers each item across the possible capacity values.",
    spaceExplanation: "The DP table stores results for different item and capacity combinations.",
    explanation: "Dynamic Programming breaks the problem into smaller item-and-capacity problems. For every item, we decide whether to include it or leave it out. The best answers are stored and reused, so the same smaller problem does not have to be solved again.",
    correctnessJustification: [
      { title: "Optimal Substructure", description: "An optimal solution can be built from the best solutions of smaller versions of the same problem." },
      { title: "Overlapping Subproblems", description: "The same smaller item-and-capacity problems can appear more than once, so Dynamic Programming stores their answers instead of solving them repeatedly." },
      { title: "Include or Exclude Each Item", description: "For every item, we consider two choices: include it if it fits, or leave it out. This allows the algorithm to consider the possible combinations." },
      { title: "Optimal Final Answer", description: "After considering all items and capacities, the solution gives the maximum value that can be obtained without exceeding the knapsack capacity." }
    ],
    githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Dynamic%20Programming/Longest%20Common%20Subsequence.md",
    dualTechnique: {
      algorithmName: "0/1 Knapsack (Branch & Bound)",
      category: "Branch & Bound",
      confidence: "High",
      timeComplexity: "O(2ⁿ) worst case",
      spaceComplexity: "O(2ⁿ) worst case",
      timeExplanation: "In the worst case, many possible item combinations may need to be explored.",
      spaceExplanation: "The algorithm may need to keep many possible states/nodes while exploring the decision tree.",
      explanation: "Branch & Bound explores different combinations of items. It calculates a bound for each possible choice and stops exploring a branch when it cannot produce a better answer.",
      githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en"
    }
  },
  graph: {
    algorithmName: "Dijkstra's Shortest Path Algorithm",
    category: "Greedy II",
    confidence: "High",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    timeExplanation: "Processing each location and road connection takes logarithmic time per step using a priority queue.",
    spaceExplanation: "The algorithm stores shortest known distances and tentative choices for each location in the graph.",
    explanation: "Dijkstra's algorithm finds the shortest path by always visiting the nearest unreached location first. Because all distances are positive, once a location is reached via the shortest route, its distance never changes.",
    correctnessJustification: [
      { title: "Greedy Path Extension", description: "At each step, choosing the unvisited location with the smallest tentative distance guarantees finding the shortest path to it." },
      { title: "Subpath Optimality", description: "The shortest path between any two locations is made up of smaller optimal shortest paths along the way." },
      { title: "Finalized Distances", description: "Once a location's shortest distance is determined, positive road lengths guarantee it will never need to be updated." },
      { title: "Guaranteed Target Route", description: "By systematically checking connected paths, the algorithm guarantees reaching the destination by the shortest route possible." }
    ],
    githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en/Data%20Structures/Graph"
  },
  sorting: {
    algorithmName: "Quick Sort",
    category: "Divide & Conquer",
    confidence: "High",
    timeComplexity: "O(n log n) average",
    spaceComplexity: "O(log n) average",
    timeExplanation: "Dividing the array around a pivot repeatedly halves the unsorted sections in average execution.",
    spaceExplanation: "Memory is only needed for the recursive call stack during array partitioning.",
    explanation: "Quick Sort selects a pivot item and splits the array into two halves: items smaller than the pivot go left, and larger items go right. Then it recursively sorts both halves.",
    correctnessJustification: [
      { title: "Pivot Partitioning", description: "Elements are split around a pivot so smaller items go to the left and larger items go to the right." },
      { title: "Independent Sub-arrays", description: "Sorting the left and right halves independently puts every element into its correct final position." },
      { title: "In-place Rearrangement", description: "Swapping items directly in memory rearranges the array without needing extra temporary arrays." },
      { title: "Complete Sorting", description: "Repeating this divide-and-conquer process until single elements remain leaves the whole array fully sorted." }
    ],
    githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Quick%20Sort.md"
  },
  backtracking: {
    algorithmName: "N-Queens Problem",
    category: "Backtracking",
    confidence: "High",
    timeComplexity: "O(N!) worst case",
    spaceComplexity: "O(N)",
    timeExplanation: "In the worst case, many possible column and diagonal queen placements are tested.",
    spaceExplanation: "The algorithm only needs space to record queen column positions for each row.",
    explanation: "Backtracking places one queen at a time. If a placement creates a conflict with an already placed queen, that choice is rejected and the algorithm tries another position.",
    correctnessJustification: [
      { title: "Safe Placement", description: "Place one queen at a time and check that it does not conflict with queens already placed." },
      { title: "Early Conflict Detection", description: "If a placement creates a conflict, stop exploring that path and try another position." },
      { title: "Pruning Invalid Choices", description: "Branch & Bound checks whether a queen placement can still lead to a valid solution. If it cannot, that branch is stopped early instead of exploring it further." },
      { title: "Valid Final Board", description: "If all N queens are placed without conflicts, the resulting board is a valid solution." }
    ],
    githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en",
    dualTechnique: {
      algorithmName: "N-Queens (Branch & Bound)",
      category: "Branch & Bound",
      confidence: "High",
      timeComplexity: "O(N!) worst case",
      spaceComplexity: "O(N)",
      timeExplanation: "In the worst case, exploring decision branches requires testing queen position permutations.",
      spaceExplanation: "The algorithm uses space to keep track of active board decision paths.",
      explanation: "Branch & Bound explores possible queen placements and stops exploring a branch as soon as it cannot lead to a valid solution. This avoids spending time on choices that cannot work. Bitmasks can be used as an implementation technique to check occupied columns and diagonals quickly.",
      githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/tree/master/en"
    }
  },
  default: {
    algorithmName: "Binary Search",
    category: "Divide & Conquer",
    confidence: "High",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    timeExplanation: "Halving the remaining search window at each step achieves logarithmic time execution.",
    spaceExplanation: "Binary search compares boundaries directly using a constant number of variables.",
    explanation: "Binary Search finds a target value in a sorted list by repeatedly checking the middle element and narrowing down the active search boundaries.",
    correctnessJustification: [
      { title: "Monotonic Order Invariant", description: "Input array sorting enables discarding half the remaining search space after every single comparison." },
      { title: "Loop Bounding Invariant", description: "Target value T is strictly contained within current [low, high] search interval." },
      { title: "Logarithmic Shrinkage", description: "Search window size is halved at each iteration, guaranteeing O(log n) step convergence." },
      { title: "Base Case Termination", description: "Returns target index upon match or fails gracefully when low > high proves non-existence." }
    ],
    githubUrl: "https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Search%20Algorithms/Binary%20Search.md"
  }
};

export default function RecommenderPage() {
  const navigate = useNavigate();
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-scroll to result card when recommendationResult updates
  useEffect(() => {
    if (recommendationResult) {
      const timer = setTimeout(() => {
        const resultElement = document.getElementById('recommendation-result');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [recommendationResult]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setSelectedLanguage(formData.language || 'python');

    const apiUrl = buildApiUrl('/api/recommend');
    console.log('[API REQUEST] POST to:', apiUrl, 'Payload:', JSON.stringify(formData));

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        data.userProblem = formData.description;
        console.log('[API SUCCESS] Received response data:', data);
        setRecommendationResult(data);
      } else {
        const errText = await response.text();
        console.error(`[API ERROR ${response.status}] Endpoint: ${apiUrl} | Response:`, errText);
        throw new Error(`API returned status ${response.status}: ${errText}`);
      }
    } catch (err) {
      console.error('[API FAILURE] Failed to fetch algorithm recommendation:', err.message || err);
      // Client-side fallback matching
      const desc = formData.description.toLowerCase();
      let match = FALLBACK_RECOMMENDATIONS.default;

      if (desc.includes('knapsack') || desc.includes('weight') || formData.category === 'Dynamic Programming I' || formData.category === 'Branch & Bound') {
        match = FALLBACK_RECOMMENDATIONS.knapsack;
      } else if (desc.includes('graph') || desc.includes('path') || desc.includes('weighted') || formData.category === 'Greedy II') {
        match = FALLBACK_RECOMMENDATIONS.graph;
      } else if (desc.includes('sort') || desc.includes('array') || desc.includes('dataset') || formData.category === 'Divide & Conquer') {
        match = FALLBACK_RECOMMENDATIONS.sorting;
      } else if (desc.includes('queen') || desc.includes('chessboard') || formData.category === 'Backtracking') {
        match = FALLBACK_RECOMMENDATIONS.backtracking;
      }

      setRecommendationResult({ ...match, userProblem: formData.description });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLearnMoreCategory = (categoryId) => {
    navigate(`/resources`);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-6 sm:pt-8 pb-12">
      {/* 1. Recommender Input Form */}
      <RecommenderForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        detectedCategory={recommendationResult?.category || recommendationResult?.paradigm}
      />

      {/* 2. Recommendation Result Screen (Complexity Graphs, Glossary, Live Animation) */}
      {recommendationResult && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <RecommendationResult
            result={recommendationResult}
            language={selectedLanguage}
            onExploreCategory={handleLearnMoreCategory}
          />
        </div>
      )}
    </main>
  );
}
