import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Activity, Gauge, Info, ChevronDown, ChevronUp, CheckCircle, AlertTriangle } from 'lucide-react';
import { 
  getAnimationType, 
  generateQuickSortSteps, 
  generateDijkstraSteps, 
  generateKnapsackDPSteps, 
  generateNQueensSteps, 
  generateBinarySearchSteps 
} from '../data/animationGenerators';

export default function LiveAnimationSection({ algorithmName, category, promptText }) {
  const animType = getAnimationType(algorithmName, category, promptText);

  // If no animation is supported for this algorithm type, cleanly return null (as required)
  if (!animType) {
    return null;
  }

  // Animation Data state
  const animData = React.useMemo(() => {
    switch (animType) {
      case 'sorting':
        return { type: 'sorting', title: 'Quick Sort Partitioning & In-Place Sorting', ...({ steps: generateQuickSortSteps() }) };
      case 'dijkstra':
        return { type: 'dijkstra', title: 'Dijkstra\'s Shortest Path on Weighted Graph', ...generateDijkstraSteps() };
      case 'knapsack':
        return { type: 'knapsack', title: '0/1 Knapsack Dynamic Programming Table Construction', ...generateKnapsackDPSteps() };
      case 'nqueens':
        return { type: 'nqueens', title: '4-Queens Backtracking & State-Space Exploration', ...generateNQueensSteps() };
      case 'binarysearch':
        return { type: 'binarysearch', title: 'Binary Search Logarithmic Interval Convergence', ...generateBinarySearchSteps() };
      default:
        return null;
    }
  }, [animType]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1); // 1x default
  const [isCollapsed, setIsCollapsed] = useState(false);

  const steps = animData?.steps || [];
  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex] || {};

  // Auto-play interval timer
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(250, Math.round(1100 / speedMultiplier));
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMultiplier, totalSteps]);

  // Controls handlers
  const handlePlayPause = () => {
    if (currentStepIndex >= totalSteps - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div id="live-animation-section" className="mt-8 bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden transition-all duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                Live Output Animation
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              {animData?.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
          >
            <span>{isCollapsed ? "Expand" : "Collapse"}</span>
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Controls Bar: Play/Pause, Step Next/Prev, Reset, Speed Slider */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Playback Button Group */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                title="Reset to Step 0"
                className="p-2.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevious}
                disabled={currentStepIndex === 0}
                title="Previous Step"
                className={`p-2.5 rounded-lg bg-white border border-slate-200 transition-all shadow-xs cursor-pointer ${
                  currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                  isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : currentStepIndex >= totalSteps - 1 ? 'Replay' : 'Play'}</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentStepIndex >= totalSteps - 1}
                title="Next Step"
                className={`p-2.5 rounded-lg bg-white border border-slate-200 transition-all shadow-xs cursor-pointer ${
                  currentStepIndex >= totalSteps - 1 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Step Counter & Progress Bar */}
            <div className="flex-1 max-w-xs mx-auto lg:mx-4 flex flex-col items-center gap-1.5 w-full">
              <div className="flex items-center justify-between w-full text-xs font-mono">
                <span className="text-slate-500 font-bold">Progress</span>
                <span className="text-indigo-600 font-extrabold">
                  Step {currentStepIndex + 1} / {totalSteps}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Speed Slider */}
            <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <Gauge className="w-4 h-4 text-indigo-600 shrink-0" />
              <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                Speed: <span className="font-mono text-indigo-600 font-bold">{speedMultiplier}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                className="w-20 sm:w-28 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Animation View Canvas Box */}
          <div className="bg-[#0b1329] rounded-xl p-5 sm:p-7 shadow-inner text-white border border-slate-800 min-h-[340px] flex flex-col justify-between">
            {/* 1. Sorting Bars View */}
            {animType === 'sorting' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-amber-400"></span> Pivot</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-rose-400"></span> Comparing</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-emerald-400"></span> Final Sorted</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-xs bg-indigo-500"></span> Active Array</span>
                  </div>
                </div>

                {/* Animated Sorting Bars */}
                <div className="h-48 flex items-end justify-center gap-3 sm:gap-5 px-4 pt-6">
                  {currentStep.array?.map((val, idx) => {
                    const isPivot = currentStep.pivotIndex === idx;
                    const isComparing = currentStep.comparingIndices?.includes(idx);
                    const isSorted = currentStep.sortedIndices?.includes(idx);
                    const maxVal = 95;
                    const heightPercent = Math.max(15, (val / maxVal) * 100);

                    let barColor = 'bg-indigo-600 border-indigo-400';
                    if (isPivot) barColor = 'bg-amber-400 border-amber-300 text-slate-900 shadow-lg shadow-amber-500/30';
                    else if (isComparing) barColor = 'bg-rose-500 border-rose-300 animate-pulse';
                    else if (isSorted) barColor = 'bg-emerald-500 border-emerald-400 shadow-sm shadow-emerald-500/20';

                    return (
                      <div key={idx} className="flex-1 max-w-[56px] flex flex-col items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-300">{val}</span>
                        <div
                          className={`w-full rounded-t-lg border-t border-x transition-all duration-300 flex items-center justify-center ${barColor}`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                        <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Dijkstra Graph View */}
            {animType === 'dijkstra' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 text-xs gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Active Node</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Visited / Settled</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Unvisited</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  {/* SVG Weighted Graph */}
                  <div className="lg:col-span-2">
                    <svg viewBox="0 0 600 260" className="w-full h-auto overflow-visible select-none">
                      {/* Edges */}
                      {animData.edges.map((e, idx) => {
                        const uNode = animData.nodes.find(n => n.id === e.u);
                        const vNode = animData.nodes.find(n => n.id === e.v);
                        const isShortestTree = currentStep.shortestTreeEdges?.some(
                          se => (se.u === e.u && se.v === e.v) || (se.u === e.v && se.v === e.u)
                        );
                        const isActiveEdge = currentStep.activeEdge && (
                          (currentStep.activeEdge.u === e.u && currentStep.activeEdge.v === e.v) ||
                          (currentStep.activeEdge.u === e.v && currentStep.activeEdge.v === e.u)
                        );

                        const midX = (uNode.x + vNode.x) / 2;
                        const midY = (uNode.y + vNode.y) / 2;

                        return (
                          <g key={idx}>
                            <line
                              x1={uNode.x}
                              y1={uNode.y}
                              x2={vNode.x}
                              y2={vNode.y}
                              stroke={isActiveEdge ? '#f59e0b' : isShortestTree ? '#10b981' : '#334155'}
                              strokeWidth={isActiveEdge ? 3.5 : isShortestTree ? 3 : 1.5}
                              className="transition-all duration-300"
                            />
                            {/* Weight badge */}
                            <circle cx={midX} cy={midY} r="9" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                            <text x={midX} y={midY + 3} fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">
                              {e.w}
                            </text>
                          </g>
                        );
                      })}

                      {/* Nodes */}
                      {animData.nodes.map((node) => {
                        const isCurrent = currentStep.currentNode === node.id;
                        const isVisited = currentStep.visited?.includes(node.id);
                        const dist = currentStep.distances?.[node.id];

                        let fill = '#1e293b';
                        let stroke = '#475569';
                        if (isCurrent) {
                          fill = '#f59e0b';
                          stroke = '#fbbf24';
                        } else if (isVisited) {
                          fill = '#059669';
                          stroke = '#34d399';
                        }

                        return (
                          <g key={node.id} className="transition-all duration-300">
                            {isCurrent && (
                              <circle cx={node.x} cy={node.y} r="22" fill="#f59e0b" opacity="0.25" className="animate-ping" />
                            )}
                            <circle cx={node.x} cy={node.y} r="16" fill={fill} stroke={stroke} strokeWidth="2" />
                            <text x={node.x} y={node.y + 4} fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                              {node.id}
                            </text>
                            {/* Distance Label */}
                            <rect x={node.x - 18} y={node.y + 20} width="36" height="15" fill="#020617" rx="3" stroke="#334155" strokeWidth="1" />
                            <text x={node.x} y={node.y + 31} fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                              d={dist}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Live Distance Table */}
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                    <h5 className="font-bold text-slate-300 mb-2 border-b border-slate-800 pb-1 flex items-center justify-between">
                      <span>Tentative Distances [dist]</span>
                      <span className="text-[10px] font-mono text-indigo-400">Min-Heap</span>
                    </h5>
                    <div className="grid grid-cols-2 gap-1.5 font-mono">
                      {Object.entries(currentStep.distances || {}).map(([v, d]) => (
                        <div
                          key={v}
                          className={`p-1.5 rounded flex items-center justify-between ${
                            currentStep.currentNode === v
                              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                              : currentStep.visited?.includes(v)
                              ? 'bg-emerald-950/40 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <span>Vertex {v}:</span>
                          <span className="font-extrabold">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Knapsack DP Table View */}
            {animType === 'knapsack' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 text-xs gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-indigo-500"></span> Active Cell [i, w]</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span> Referenced States</span>
                  </div>
                  {currentStep.formula && (
                    <span className="font-mono text-indigo-300 text-[11px] bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                      {currentStep.formula}
                    </span>
                  )}
                </div>

                {/* DP Matrix Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-2 text-left">Item \ Cap (W)</th>
                        {[0, 1, 2, 3, 4, 5].map((w) => (
                          <th key={w} className="p-2">w={w}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentStep.table?.map((row, rIdx) => {
                        const itemLabel = rIdx === 0 ? "Base (0)" : `I${rIdx} (w=${animData.items[rIdx - 1]?.w}, v=${animData.items[rIdx - 1]?.v})`;
                        return (
                          <tr key={rIdx} className="border-b border-slate-800/60">
                            <td className="p-2 text-left font-bold text-slate-300 whitespace-nowrap">{itemLabel}</td>
                            {row.map((val, cIdx) => {
                              const isActive = currentStep.activeCell?.[0] === rIdx && currentStep.activeCell?.[1] === cIdx;
                              const isRef = currentStep.highlightCells?.some(([hr, hc]) => hr === rIdx && hc === cIdx);

                              let cellBg = 'bg-slate-900/50 text-slate-300';
                              if (isActive) cellBg = 'bg-indigo-600 text-white font-extrabold shadow-md scale-105';
                              else if (isRef) cellBg = 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/50';

                              return (
                                <td key={cIdx} className={`p-2 transition-all duration-300 rounded ${cellBg}`}>
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. N-Queens Chessboard View */}
            {animType === 'nqueens' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Placed Queen 👑</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Conflict / Attacked</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
                  {/* 4x4 Chessboard */}
                  <div className="grid grid-cols-4 grid-rows-4 w-56 h-56 border-2 border-slate-700 rounded-lg overflow-hidden shadow-2xl">
                    {[0, 1, 2, 3].map((r) =>
                      [0, 1, 2, 3].map((c) => {
                        const isBlackSquare = (r + c) % 2 === 1;
                        const hasQueen = currentStep.board?.[r] === c;
                        const isCurrentSlot = currentStep.currentRow === r && currentStep.currentCol === c;
                        const hasConflict = isCurrentSlot && currentStep.isConflict;

                        let squareBg = isBlackSquare ? 'bg-slate-800' : 'bg-slate-700';
                        if (hasConflict) squareBg = 'bg-rose-900/80 animate-pulse';

                        return (
                          <div
                            key={`${r}-${c}`}
                            className={`flex items-center justify-center transition-all duration-300 relative ${squareBg}`}
                          >
                            {hasQueen && (
                              <span className="text-2xl select-none filter drop-shadow-md">
                                👑
                              </span>
                            )}
                            {hasConflict && !hasQueen && (
                              <span className="text-xl text-rose-400 font-bold select-none">
                                ✕
                              </span>
                            )}
                            <span className="absolute bottom-0.5 right-1 text-[8px] text-slate-500 font-mono">
                              {r},{c}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Board Legend & State Inspector */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs space-y-2 max-w-xs">
                    <h5 className="font-bold text-slate-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Backtracking Board State</span>
                    </h5>
                    <div className="font-mono text-slate-300 space-y-1">
                      <div>Row Target: <span className="text-indigo-400 font-bold">{currentStep.currentRow}</span></div>
                      <div>Col Target: <span className="text-indigo-400 font-bold">{currentStep.currentCol >= 0 ? currentStep.currentCol : 'None'}</span></div>
                      <div>Conflict Status: <span className={currentStep.isConflict ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{currentStep.isConflict ? 'Conflict (Pruned)' : 'Safe / Placed'}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Binary Search View */}
            {animType === 'binarysearch' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
                  <span className="text-slate-300 font-bold">
                    Target: <span className="text-emerald-400 font-mono font-extrabold">{currentStep.target}</span>
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-amber-400"></span> Mid Index</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-indigo-500"></span> Active Interval [Low..High]</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-6">
                  {currentStep.array?.map((val, idx) => {
                    const isMid = currentStep.mid === idx;
                    const isWithinRange = idx >= currentStep.low && idx <= currentStep.high;
                    const isTargetFound = currentStep.found && isMid;

                    let bg = isWithinRange ? 'bg-indigo-950 border-indigo-500 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40';
                    if (isMid) bg = 'bg-amber-500 text-slate-950 font-extrabold border-amber-300 scale-110 shadow-lg shadow-amber-500/30';
                    if (isTargetFound) bg = 'bg-emerald-500 text-slate-950 font-extrabold border-emerald-300 scale-115 shadow-lg shadow-emerald-500/50';

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${bg}`}>
                          {val}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {idx === currentStep.low && idx === currentStep.high ? 'L,H' : idx === currentStep.low ? 'Low' : idx === currentStep.high ? 'High' : `[${idx}]`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step Explanation Caption */}
            <div className="mt-4 p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-200">
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="font-sans leading-relaxed">
                <span className="font-mono text-indigo-300 font-bold mr-2">
                  [Step {currentStepIndex + 1}/{totalSteps}]
                </span>
                {currentStep.caption}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
