// Animation state generator for all supported algorithms
// Returns array of step frames { state, caption, highlightedElements, extraInfo }

// 1. Quick Sort Animation Steps
export function generateQuickSortSteps() {
  const initial = [42, 17, 65, 23, 88, 54, 9, 31];
  const steps = [];
  const arr = [...initial];

  steps.push({
    array: [...arr],
    pivotIndex: -1,
    comparingIndices: [],
    sortedIndices: [],
    partitionRange: [0, arr.length - 1],
    caption: "Initial unsorted array before Quick Sort begins partitioning."
  });

  function partition(low, high) {
    const pivot = arr[high];
    steps.push({
      array: [...arr],
      pivotIndex: high,
      comparingIndices: [],
      sortedIndices: getSortedUpTo(low - 1),
      partitionRange: [low, high],
      caption: `Selecting pivot element ${pivot} at index ${high} for range [${low}..${high}].`
    });

    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        pivotIndex: high,
        comparingIndices: [j, high],
        sortedIndices: getSortedUpTo(low - 1),
        partitionRange: [low, high],
        caption: `Comparing array[${j}] (${arr[j]}) with pivot (${pivot}). ${arr[j] < pivot ? `${arr[j]} < ${pivot} → Move left of pivot.` : `${arr[j]} ≥ ${pivot} → Keep right of pivot.`}`
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          steps.push({
            array: [...arr],
            pivotIndex: high,
            comparingIndices: [i, j],
            sortedIndices: getSortedUpTo(low - 1),
            partitionRange: [low, high],
            caption: `Swapped ${arr[j]} and ${arr[i]} to place smaller element into left partition.`
          });
        }
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    steps.push({
      array: [...arr],
      pivotIndex: i + 1,
      comparingIndices: [i + 1],
      sortedIndices: [...getSortedUpTo(low - 1), i + 1],
      partitionRange: [low, high],
      caption: `Placed pivot ${arr[i + 1]} into its finalized sorted position index ${i + 1}.`
    });

    return i + 1;
  }

  const sortedList = new Set();
  function getSortedUpTo() {
    return Array.from(sortedList);
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      sortedList.add(pi);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedList.add(low);
    }
  }

  quickSortHelper(0, arr.length - 1);

  // Final sorted step
  steps.push({
    array: [...arr],
    pivotIndex: -1,
    comparingIndices: [],
    sortedIndices: arr.map((_, i) => i),
    partitionRange: [0, arr.length - 1],
    caption: "All recursive partitions resolved. Array is completely sorted in O(N log N) time!"
  });

  return steps;
}

// 2. Dijkstra's Algorithm on Weighted Graph
export function generateDijkstraSteps() {
  const nodes = [
    { id: 'A', x: 80, y: 130, label: 'A (Source)' },
    { id: 'B', x: 220, y: 60, label: 'B' },
    { id: 'C', x: 220, y: 200, label: 'C' },
    { id: 'D', x: 380, y: 60, label: 'D' },
    { id: 'E', x: 380, y: 200, label: 'E' },
    { id: 'F', x: 520, y: 130, label: 'F (Target)' }
  ];

  const edges = [
    { u: 'A', v: 'B', w: 4 },
    { u: 'A', v: 'C', w: 2 },
    { u: 'B', v: 'C', w: 1 },
    { u: 'B', v: 'D', w: 5 },
    { u: 'C', v: 'E', w: 8 },
    { u: 'C', v: 'D', w: 8 },
    { u: 'C', v: 'B', w: 1 },
    { u: 'D', v: 'E', w: 2 },
    { u: 'D', v: 'F', w: 6 },
    { u: 'E', v: 'F', w: 3 }
  ];

  const steps = [
    {
      currentNode: null,
      activeEdge: null,
      visited: [],
      distances: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' },
      shortestTreeEdges: [],
      caption: "Initialize distances: Source vertex A = 0, all other vertices initialized to ∞."
    },
    {
      currentNode: 'A',
      activeEdge: { u: 'A', v: 'C', w: 2 },
      visited: ['A'],
      distances: { A: 0, B: 4, C: 2, D: '∞', E: '∞', F: '∞' },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'A', v: 'B' }],
      caption: "Extract min node A (dist=0). Relax edges to B (0+4=4) and C (0+2=2). Update tentative distances."
    },
    {
      currentNode: 'C',
      activeEdge: { u: 'C', v: 'B', w: 1 },
      visited: ['A', 'C'],
      distances: { A: 0, B: 3, C: 2, D: 10, E: 10, F: '∞' },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'C', v: 'B' }],
      caption: "Extract min node C (dist=2). Relax edge C→B: 2+1=3 < 4 (shorter route found to B via C!)."
    },
    {
      currentNode: 'B',
      activeEdge: { u: 'B', v: 'D', w: 5 },
      visited: ['A', 'C', 'B'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: '∞' },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'C', v: 'B' }, { u: 'B', v: 'D' }],
      caption: "Extract min node B (dist=3). Relax edge B→D: 3+5=8 < 10. Update dist[D] = 8."
    },
    {
      currentNode: 'D',
      activeEdge: { u: 'D', v: 'E', w: 2 },
      visited: ['A', 'C', 'B', 'D'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 14 },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'C', v: 'B' }, { u: 'B', v: 'D' }, { u: 'D', v: 'E' }],
      caption: "Extract min node D (dist=8). Relax edge D→E (8+2=10) and D→F (8+6=14)."
    },
    {
      currentNode: 'E',
      activeEdge: { u: 'E', v: 'F', w: 3 },
      visited: ['A', 'C', 'B', 'D', 'E'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'C', v: 'B' }, { u: 'B', v: 'D' }, { u: 'D', v: 'E' }, { u: 'E', v: 'F' }],
      caption: "Extract min node E (dist=10). Relax edge E→F: 10+3=13 < 14 (shorter route found to F!)."
    },
    {
      currentNode: 'F',
      activeEdge: null,
      visited: ['A', 'C', 'B', 'D', 'E', 'F'],
      distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 13 },
      shortestTreeEdges: [{ u: 'A', v: 'C' }, { u: 'C', v: 'B' }, { u: 'B', v: 'D' }, { u: 'D', v: 'E' }, { u: 'E', v: 'F' }],
      caption: "Target node F reached! Shortest path: A → C → B → D → E → F with optimal total cost = 13."
    }
  ];

  return { nodes, edges, steps };
}

// 3. 0/1 Knapsack DP Table Steps
export function generateKnapsackDPSteps() {
  const items = [
    { name: "Item 1", w: 2, v: 3 },
    { name: "Item 2", w: 3, v: 4 },
    { name: "Item 3", w: 4, v: 5 },
    { name: "Item 4", w: 5, v: 8 }
  ];
  const capacity = 5;
  const numItems = items.length;

  // Initialize empty DP table (numItems + 1 rows, capacity + 1 cols)
  const matrix = Array.from({ length: numItems + 1 }, () => Array(capacity + 1).fill(0));
  const steps = [];

  steps.push({
    table: matrix.map(row => [...row]),
    activeCell: [0, 0],
    highlightCells: [],
    selectedItems: [],
    formula: "DP[i][w] = DP Base Cases initialized to 0.",
    caption: "Row 0 and Column 0 initialized to 0 (0 items or 0 capacity yields 0 value)."
  });

  for (let i = 1; i <= numItems; i++) {
    const item = items[i - 1];
    for (let w = 1; w <= capacity; w++) {
      if (item.w <= w) {
        const includeVal = item.v + matrix[i - 1][w - item.w];
        const excludeVal = matrix[i - 1][w];
        matrix[i][w] = Math.max(excludeVal, includeVal);

        steps.push({
          table: matrix.map(row => [...row]),
          activeCell: [i, w],
          highlightCells: [[i - 1, w], [i - 1, w - item.w]],
          selectedItems: [],
          formula: `DP[${i}][${w}] = max(Exclude: DP[${i-1}][${w}] (${excludeVal}), Include: ${item.v} + DP[${i-1}][${w - item.w}] (${includeVal})) = ${matrix[i][w]}`,
          caption: `Evaluating ${item.name} (w=${item.w}, v=${item.v}) at capacity ${w}: Max value = ${matrix[i][w]}.`
        });
      } else {
        matrix[i][w] = matrix[i - 1][w];
        steps.push({
          table: matrix.map(row => [...row]),
          activeCell: [i, w],
          highlightCells: [[i - 1, w]],
          selectedItems: [],
          formula: `DP[${i}][${w}] = DP[${i-1}][${w}] (${matrix[i][w]}) because item weight ${item.w} exceeds capacity ${w}.`,
          caption: `${item.name} (w=${item.w}) cannot fit in capacity ${w}. Carry forward previous optimum ${matrix[i][w]}.`
        });
      }
    }
  }

  // Final Backtracking Step
  steps.push({
    table: matrix.map(row => [...row]),
    activeCell: [numItems, capacity],
    highlightCells: [[numItems, capacity], [2, 3], [1, 2]],
    selectedItems: [0, 1], // Item 1 (w=2, v=3) and Item 2 (w=3, v=4) => total weight 5, total value 7 or Item 4 (w=5, v=8)
    formula: `Optimal Max Value = ${matrix[numItems][capacity]} achieved within Capacity = ${capacity}.`,
    caption: `DP Table complete! Backtracking identifies optimal selection: Item 4 (weight 5, value 8) giving maximum profit 8.`
  });

  return { items, capacity, steps };
}

// 4. N-Queens Backtracking Steps (4x4 Board Demo for clear visual animation)
export function generateNQueensSteps() {
  const n = 4;
  const steps = [];
  const board = [-1, -1, -1, -1]; // board[row] = col

  steps.push({
    board: [...board],
    currentRow: 0,
    currentCol: -1,
    isConflict: false,
    conflicts: [],
    caption: "Starting 4-Queens Backtracking on 4×4 chessboard. Board is initially empty."
  });

  function isSafe(row, col) {
    const conflicts = [];
    for (let r = 0; r < row; r++) {
      const c = board[r];
      if (c === col) {
        conflicts.push({ r1: r, c1: c, r2: row, c2: col, type: 'column' });
      }
      if (Math.abs(c - col) === Math.abs(r - row)) {
        conflicts.push({ r1: r, c1: c, r2: row, c2: col, type: 'diagonal' });
      }
    }
    return conflicts;
  }

  function solve(row) {
    if (row === n) {
      steps.push({
        board: [...board],
        currentRow: row,
        currentCol: -1,
        isConflict: false,
        conflicts: [],
        caption: "✨ Solution Found! All 4 queens placed safely without row, column, or diagonal conflicts."
      });
      return true;
    }

    for (let col = 0; col < n; col++) {
      board[row] = col;
      const conflicts = isSafe(row, col);

      if (conflicts.length === 0) {
        steps.push({
          board: [...board],
          currentRow: row,
          currentCol: col,
          isConflict: false,
          conflicts: [],
          caption: `Placed Queen at Row ${row}, Col ${col}. Safe position (no conflicts). Moving to Row ${row + 1}.`
        });

        if (solve(row + 1)) return true;

        // Backtrack
        steps.push({
          board: [...board],
          currentRow: row,
          currentCol: col,
          isConflict: true,
          conflicts: [],
          caption: `Backtracking from Row ${row + 1}: Dead end encountered. Removing queen at Row ${row}, Col ${col}.`
        });
      } else {
        steps.push({
          board: [...board],
          currentRow: row,
          currentCol: col,
          isConflict: true,
          conflicts,
          caption: `Conflict detected at Row ${row}, Col ${col}! Under attack along ${conflicts[0].type}. Rejecting placement.`
        });
      }
      board[row] = -1;
    }
    return false;
  }

  solve(0);
  return { n, steps };
}

// 5. Binary Search Animation Steps
export function generateBinarySearchSteps() {
  const array = [3, 8, 12, 17, 24, 29, 35, 42, 50, 61, 74];
  const target = 35;
  const steps = [];

  let low = 0;
  let high = array.length - 1;

  steps.push({
    array,
    target,
    low,
    high,
    mid: -1,
    found: false,
    caption: `Search target T = ${target} in sorted array of ${array.length} elements. Initial bounds: [low = 0, high = ${high}].`
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = array[mid];

    steps.push({
      array,
      target,
      low,
      high,
      mid,
      found: midVal === target,
      caption: `Checking middle element at index ${mid} (${midVal}). Target = ${target}.`
    });

    if (midVal === target) {
      steps.push({
        array,
        target,
        low,
        high,
        mid,
        found: true,
        caption: `🎯 Target ${target} found at index ${mid} in just ${steps.length} comparisons (O(log N))!`
      });
      break;
    } else if (midVal < target) {
      steps.push({
        array,
        target,
        low,
        high,
        mid,
        found: false,
        caption: `${midVal} < ${target} → Target must be in right half. Discarding left range [${low}..${mid}]. Updating low = ${mid + 1}.`
      });
      low = mid + 1;
    } else {
      steps.push({
        array,
        target,
        low,
        high,
        mid,
        found: false,
        caption: `${midVal} > ${target} → Target must be in left half. Discarding right range [${mid}..${high}]. Updating high = ${mid - 1}.`
      });
      high = mid - 1;
    }
  }

  return { array, target, steps };
}

// Helper to determine if an algorithm has an active animation available
export function getAnimationType(algorithmName, category = "", promptText = "") {
  const norm = `${algorithmName} ${category} ${promptText}`.toLowerCase();

  if (norm.includes("dijkstra") || norm.includes("shortest path")) {
    return "dijkstra";
  }
  if (norm.includes("knapsack")) {
    return "knapsack";
  }
  if (norm.includes("binary search") || norm.includes("binarysearch") || (norm.includes("search") && !norm.includes("sort"))) {
    return "binarysearch";
  }
  if (norm.includes("queen") || norm.includes("chessboard")) {
    return "nqueens";
  }
  if (norm.includes("sort") && !norm.includes("topological")) {
    return "sorting";
  }

  return null;
}
