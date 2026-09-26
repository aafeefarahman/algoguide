import React, { useState, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const DROPDOWN_OPTIONS = [
  "Divide & Conquer",
  "Backtracking",
  "Dynamic Programming I",
  "Dynamic Programming II",
  "Greedy I",
  "Greedy II",
  "Branch & Bound",
  "Hashing / Two Pointers"
];

function normalizeCategory(cat) {
  if (!cat) return null;
  const c = cat.toLowerCase().trim();

  if (c.includes('divide') || c.includes('conquer') || c.includes('sorting') || c.includes('searching')) {
    return "Divide & Conquer";
  }
  if (c.includes('backtrack') || c.includes('n-queen') || c.includes('queens')) {
    return "Backtracking";
  }
  if (c.includes('dynamic programming ii') || c.includes('dp ii') || c.includes('dp 2') || c.includes('floyd') || c.includes('matrix chain')) {
    return "Dynamic Programming II";
  }
  if (c.includes('dynamic programming') || c.includes('dp') || c.includes('knapsack') || c.includes('lcs')) {
    return "Dynamic Programming I";
  }
  if (c.includes('greedy ii') || c.includes('greedy 2') || c.includes('graph') || c.includes('dijkstra') || c.includes('kruskal') || c.includes('prim')) {
    return "Greedy II";
  }
  if (c.includes('greedy') || c.includes('activity')) {
    return "Greedy I";
  }
  if (c.includes('branch') || c.includes('bound')) {
    return "Branch & Bound";
  }
  if (c.includes('hash') || c.includes('two pointer') || c.includes('pointer') || c.includes('array target')) {
    return "Hashing / Two Pointers";
  }

  const exactMatch = DROPDOWN_OPTIONS.find(opt => opt.toLowerCase() === c);
  if (exactMatch) return exactMatch;

  const partialMatch = DROPDOWN_OPTIONS.find(opt => c.includes(opt.toLowerCase()) || opt.toLowerCase().includes(c));
  if (partialMatch) return partialMatch;

  return null;
}

const EXAMPLE_PROMPTS = [
  {
    label: "0/1 Knapsack with weight limit",
    description: "Given items with weights and values, find the maximum value subset that fits within a weight capacity limit of W.",
    category: "Dynamic Programming I"
  },
  {
    label: "Shortest path in weighted graph",
    description: "Given a weighted graph with non-negative edge weights, find the shortest path from a starting vertex to all other vertices.",
    category: "Greedy II"
  },
  {
    label: "Sort a large dataset",
    description: "Sort an array of 1,000,000 integers efficiently with O(n log n) time complexity and predictable memory usage.",
    category: "Divide & Conquer"
  },
  {
    label: "N-Queens chessboard placement",
    description: "Place N chess queens on an N×N board so that no two queens attack each other vertically, horizontally, or diagonally.",
    category: "Backtracking"
  }
];

export default function RecommenderForm({ onSubmit, isLoading, detectedCategory }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('All Categories (Auto Detect)');
  const [validationError, setValidationError] = useState('');
  const [isCategoryManuallyPicked, setIsCategoryManuallyPicked] = useState(false);

  // Sync category dropdown state with detectedCategory when a recommendation result is generated
  useEffect(() => {
    if (detectedCategory) {
      const normalized = normalizeCategory(detectedCategory);
      if (normalized) {
        setCategory(normalized);
      }
    }
  }, [detectedCategory]);

  const MAX_CHARS = 500;

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setDescription(val);
      if (!isCategoryManuallyPicked) {
        setCategory('All Categories (Auto Detect)');
      }
      if (validationError && val.trim().length >= 10) {
        setValidationError('');
      }
    }
  };

  const handleExampleClick = (example) => {
    setDescription(example.description);
    setCategory(example.category);
    setIsCategoryManuallyPicked(false);
    setValidationError('');
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategoryManuallyPicked(e.target.value !== 'All Categories (Auto Detect)');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || description.trim().length < 10) {
      setValidationError('Please enter a problem description of at least 10 characters.');
      return;
    }

    setValidationError('');
    onSubmit({
      description: description.trim(),
      category: category
    });
  };

  return (
    <section id="recommender-form-section" className="py-12 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Algorithm Recommender
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Analyze your problem statement, explore suitable algorithmic strategies, and understand why they fit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          
          {/* Example Chips */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Try an Example Prompt:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(ex)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50/70 hover:bg-indigo-100/90 text-indigo-700 text-xs font-medium border border-indigo-200/80 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  + {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="problem-desc" className="block text-sm font-medium text-slate-900">
                Problem Description <span className="text-rose-500">*</span>
              </label>
              <span className={`text-xs font-mono font-semibold ${description.length >= MAX_CHARS ? 'text-rose-500' : 'text-slate-400'}`}>
                {description.length}/{MAX_CHARS}
              </span>
            </div>

            <textarea
              id="problem-desc"
              rows={4}
              value={description}
              onChange={handleTextChange}
              placeholder="e.g. Given items with weights and values, find the maximum value subset that fits within a weight capacity limit of W..."
              className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 resize-y"
            />

            {validationError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Category Dropdown (DAA Syllabus Options) */}
          <div className="pt-2">
            <label htmlFor="category-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              Problem Type
            </label>
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              <option value="All Categories (Auto Detect)">All Categories (Auto Detect)</option>
              <option value="Divide & Conquer">Divide & Conquer</option>
              <option value="Backtracking">Backtracking</option>
              <option value="Dynamic Programming I">Dynamic Programming I</option>
              <option value="Dynamic Programming II">Dynamic Programming II</option>
              <option value="Greedy I">Greedy I</option>
              <option value="Greedy II">Greedy II</option>
              <option value="Branch & Bound">Branch & Bound</option>
              <option value="Hashing / Two Pointers">Hashing / Two Pointers</option>
            </select>
          </div>

          {/* Primary CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Problem & Classifying...</span>
                </>
              ) : (
                <>
                  <span>Get Algorithm Recommendation</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
