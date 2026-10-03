import React, { useState, useRef } from 'react';
import { BarChart3, TrendingUp, Download, Info, Sliders } from 'lucide-react';
import { getAlgorithmComplexityProfile } from '../data/complexityData';

export default function VisualizationSection({ algorithmName, category, promptText }) {
  const [activeTab, setActiveTab] = useState('complexity'); // 'complexity' | 'growth'
  const [userN, setUserN] = useState(() => inferInitialN(promptText, algorithmName));
  const [isLogScale, setIsLogScale] = useState(false);
  const [hoveredData, setHoveredData] = useState(null);

  const chartContainerRef = useRef(null);
  const profile = getAlgorithmComplexityProfile(algorithmName, category);

  // Derive initial input size n from user description if possible
  function inferInitialN(text, algo) {
    const t = (text || "").toLowerCase();
    const a = (algo || "").toLowerCase();
    if (t.includes("1,000,000") || t.includes("1000000") || t.includes("million")) return 1000;
    if (t.includes("8 queen") || a.includes("queen")) return 8;
    if (t.includes("knapsack")) return 20;
    if (t.includes("shortest path") || t.includes("graph") || a.includes("dijkstra")) return 25;
    if (t.includes("sort") || t.includes("dataset")) return 64;
    return 32;
  }

  // Calculate values at current N
  const currentBest = Math.round(profile.bestFn(userN));
  const currentAvg = Math.round(profile.avgFn(userN));
  const currentWorst = Math.round(profile.worstFn(userN));
  const currentSpace = Math.round(profile.spaceFn(userN));

  // Compute alternative values at current N
  const alternativePoints = profile.alternatives.map((alt) => ({
    name: alt.name,
    category: alt.category,
    timeOriginal: alt.time,
    spaceOriginal: alt.space,
    timeVal: Math.round(alt.calc(userN)),
    spaceVal: Math.round(alt.spaceCalc(userN)),
    tradeoff: alt.tradeoff
  }));

  // Build Grouped Bars dataset
  const groupedBars = [
    {
      group: profile.name + " (Recommended)",
      isPrimary: true,
      best: currentBest,
      avg: currentAvg,
      worst: currentWorst,
      bestBigO: profile.bestTime,
      avgBigO: profile.averageTime,
      worstBigO: profile.worstTime
    },
    ...alternativePoints.map((alt) => ({
      group: alt.name,
      isPrimary: false,
      best: Math.round(alt.timeVal * 0.75),
      avg: alt.timeVal,
      worst: Math.round(alt.timeVal * 1.3),
      bestBigO: alt.timeOriginal,
      avgBigO: alt.timeOriginal,
      worstBigO: alt.timeOriginal
    }))
  ];

  // Helper for max scaling in Bar Chart
  const allBarValues = groupedBars.flatMap((b) => [b.best, b.avg, b.worst]);
  const maxBarValue = Math.max(...allBarValues, 1);

  // Generate Growth curve sample points for N across 4 to 128 (or scaled based on algorithm)
  const isExponential = profile.worstTime.includes("!") || profile.worstTime.includes("2ⁿ");
  const maxN = isExponential ? 12 : 100;
  const nSteps = [4, 8, 16, 24, 32, 48, 64, 80, 100].filter(n => n <= maxN || n === 4);
  if (!nSteps.includes(userN) && userN <= maxN) {
    nSteps.push(userN);
    nSteps.sort((a, b) => a - b);
  }

  const growthData = nSteps.map((n) => {
    const mainOps = Math.round(profile.avgFn(n));
    const alt1Ops = profile.alternatives[0] ? Math.round(profile.alternatives[0].calc(n)) : null;
    const alt2Ops = profile.alternatives[1] ? Math.round(profile.alternatives[1].calc(n)) : null;
    return {
      n,
      main: mainOps,
      alt1: alt1Ops,
      alt2: alt2Ops
    };
  });

  // Download chart as SVG-to-Canvas PNG
  const handleDownloadPNG = (chartTitle) => {
    if (!chartContainerRef.current) return;
    const svgElement = chartContainerRef.current.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 2; // High resolution
      canvas.width = (svgElement.clientWidth || 700) * scale;
      canvas.height = (svgElement.clientHeight || 420) * scale;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0b1329';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const pngURL = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${algorithmName.replace(/[^a-z0-9]/gi, '_')}_${chartTitle.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.png`;
      downloadLink.href = pngURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobURL);
    };
    image.src = blobURL;
  };

  return (
    <div id="visualizations-section" className="mt-8 bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden transition-all duration-300 p-5 sm:p-7 space-y-6">
      {/* Controls Bar: Tabs, N-Slider, Log-Scale toggle, Download Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            {/* Tab Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg">
              <button
                onClick={() => setActiveTab('complexity')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'complexity'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Complexity Tab</span>
              </button>

              <button
                onClick={() => setActiveTab('growth')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'growth'
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Growth Tab</span>
              </button>
            </div>

            {/* User Input Size (N) Slider & Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <Sliders className="w-4 h-4 text-indigo-600 shrink-0" />
                <label className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                  Input Size (<span className="font-mono text-indigo-600 font-bold">n = {userN}</span>):
                </label>
                <input
                  type="range"
                  min="4"
                  max={isExponential ? 12 : 128}
                  step="1"
                  value={userN}
                  onChange={(e) => setUserN(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-indigo-600 cursor-pointer"
                />
              </div>

              {activeTab === 'growth' && (
                <button
                  onClick={() => setIsLogScale(!isLogScale)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    isLogScale
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Log Scale: <span className="font-mono font-bold">{isLogScale ? "ON" : "OFF"}</span>
                </button>
              )}

              <button
                onClick={() => handleDownloadPNG(activeTab === 'complexity' ? "Complexity_Comparison" : "Growth_Curve")}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer ml-auto sm:ml-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>

          {/* Chart Rendering Container */}
          <div ref={chartContainerRef} className="relative bg-[#0b1329] rounded-xl p-5 sm:p-7 shadow-inner text-white border border-slate-800">
            {activeTab === 'complexity' ? (
              /* Grouped Bar Chart: Best / Average / Worst Time at user's N */
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>Operations Count at Current Problem Scale (n = {userN})</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Theoretical Big-O bounds calculated for <span className="text-indigo-300 font-mono">n = {userN}</span>. Hover bars to view original Big-O notation.
                    </p>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-emerald-400"></span>
                      <span className="text-slate-300">Best Case</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-indigo-400"></span>
                      <span className="text-slate-300">Average Case</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-xs bg-rose-400"></span>
                      <span className="text-slate-300">Worst Case</span>
                    </div>
                  </div>
                </div>

                {/* SVG Grouped Bar Chart */}
                <svg viewBox="0 0 700 280" className="w-full h-auto overflow-visible select-none">
                  {/* Grid Lines */}
                  {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
                    const y = 230 - ratio * 180;
                    const val = Math.round(maxBarValue * ratio);
                    return (
                      <g key={i}>
                        <line x1="160" y1={y} x2="680" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                        <text x="150" y={y + 3} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {val > 10000 ? val.toExponential(1) : val.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                  <line x1="160" y1="230" x2="680" y2="230" stroke="#334155" strokeWidth="1.5" />

                  {/* Bars per Algorithm Group */}
                  {groupedBars.map((group, gIdx) => {
                    const groupHeight = 180;
                    const totalGroups = groupedBars.length;
                    const slotHeight = groupHeight / totalGroups;
                    const groupY = 40 + gIdx * slotHeight;
                    const barHeight = Math.min(12, slotHeight / 4);

                    const calcWidth = (val) => Math.max(4, (val / maxBarValue) * 500);

                    return (
                      <g key={gIdx} className="transition-all duration-300">
                        {/* Algorithm Label */}
                        <text
                          x="150"
                          y={groupY + slotHeight / 2}
                          fill={group.isPrimary ? '#818cf8' : '#cbd5e1'}
                          fontSize={group.isPrimary ? "12" : "11"}
                          fontWeight={group.isPrimary ? "bold" : "normal"}
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {group.group.length > 20 ? group.group.slice(0, 18) + '...' : group.group}
                        </text>

                        {/* Best Case Bar */}
                        <rect
                          x="160"
                          y={groupY + 4}
                          width={calcWidth(group.best)}
                          height={barHeight}
                          fill="#34d399"
                          rx="2"
                          className="hover:opacity-80 cursor-pointer"
                          onMouseEnter={() => setHoveredData({ name: group.group, type: 'Best Case', bigO: group.bestBigO, ops: group.best })}
                          onMouseLeave={() => setHoveredData(null)}
                        />
                        <text x={165 + calcWidth(group.best)} y={groupY + 4 + barHeight - 2} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                          {group.best > 10000 ? group.best.toExponential(1) : group.best.toLocaleString()}
                        </text>

                        {/* Average Case Bar */}
                        <rect
                          x="160"
                          y={groupY + 4 + barHeight + 3}
                          width={calcWidth(group.avg)}
                          height={barHeight}
                          fill="#818cf8"
                          rx="2"
                          className="hover:opacity-80 cursor-pointer"
                          onMouseEnter={() => setHoveredData({ name: group.group, type: 'Average Case', bigO: group.avgBigO, ops: group.avg })}
                          onMouseLeave={() => setHoveredData(null)}
                        />
                        <text x={165 + calcWidth(group.avg)} y={groupY + 4 + barHeight * 2 + 1} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                          {group.avg > 10000 ? group.avg.toExponential(1) : group.avg.toLocaleString()}
                        </text>

                        {/* Worst Case Bar */}
                        <rect
                          x="160"
                          y={groupY + 4 + (barHeight + 3) * 2}
                          width={calcWidth(group.worst)}
                          height={barHeight}
                          fill="#f87171"
                          rx="2"
                          className="hover:opacity-80 cursor-pointer"
                          onMouseEnter={() => setHoveredData({ name: group.group, type: 'Worst Case', bigO: group.worstBigO, ops: group.worst })}
                          onMouseLeave={() => setHoveredData(null)}
                        />
                        <text x={165 + calcWidth(group.worst)} y={groupY + 4 + barHeight * 3 + 4} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                          {group.worst > 10000 ? group.worst.toExponential(1) : group.worst.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip Overlay */}
                {hoveredData && (
                  <div className="p-3 bg-slate-900 border border-indigo-500/50 rounded-lg text-xs flex items-center gap-3 animate-fadeIn shadow-lg">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <span className="font-bold text-white">{hoveredData.name}</span> — {hoveredData.type}:{' '}
                      <span className="font-mono text-indigo-300 font-bold bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-800">
                        {hoveredData.bigO}
                      </span>{' '}
                      (<span className="font-mono text-emerald-400">{hoveredData.ops.toLocaleString()} approx. operations</span> at n={userN})
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Growth Tab: Operations vs Input Size (N) Line Chart */
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>Scaling Behavior: Operations vs Input Size (n)</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visual comparison of growth rate as problem size expands. Dashed line marks current <span className="text-indigo-400 font-mono font-bold">n = {userN}</span>.
                    </p>
                  </div>
                  {/* Line Legend */}
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1 bg-indigo-400 rounded-full"></span>
                      <span className="text-slate-300">{profile.name} (Recommended)</span>
                    </div>
                    {profile.alternatives[0] && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-1 bg-amber-400 rounded-full"></span>
                        <span className="text-slate-300">{profile.alternatives[0].name}</span>
                      </div>
                    )}
                    {profile.alternatives[1] && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-1 bg-teal-400 rounded-full"></span>
                        <span className="text-slate-300">{profile.alternatives[1].name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SVG Growth Line Chart */}
                <svg viewBox="0 0 700 280" className="w-full h-auto overflow-visible select-none">
                  {/* Axes */}
                  <line x1="70" y1="230" x2="680" y2="230" stroke="#334155" strokeWidth="1.5" />
                  <line x1="70" y1="30" x2="70" y2="230" stroke="#334155" strokeWidth="1.5" />

                  <text x="680" y="245" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="sans-serif font-bold">
                    Input Size (n) →
                  </text>
                  <text x="35" y="25" fill="#94a3b8" fontSize="10" fontFamily="sans-serif font-bold">
                    Ops ↑
                  </text>

                  {/* Horizontal Grid & Value Labels */}
                  {[0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
                    const y = 230 - ratio * 190;
                    const maxVal = Math.max(...growthData.map(d => Math.max(d.main, d.alt1 || 0, d.alt2 || 0)), 1);
                    const dispVal = isLogScale ? Math.round(Math.pow(10, ratio * Math.log10(maxVal))) : Math.round(maxVal * ratio);
                    return (
                      <g key={i}>
                        <line x1="70" y1={y} x2="680" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                        <text x="62" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                          {dispVal > 10000 ? dispVal.toExponential(1) : dispVal.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical User N Marker */}
                  {(() => {
                    const minN = growthData[0]?.n || 4;
                    const maxNVal = growthData[growthData.length - 1]?.n || 100;
                    const markerX = 70 + ((userN - minN) / (maxNVal - minN || 1)) * 600;
                    return (
                      <g>
                        <line x1={markerX} y1="30" x2={markerX} y2="230" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 3" />
                        <rect x={markerX - 25} y="15" width="50" height="16" fill="#4338ca" rx="4" />
                        <text x={markerX} y="26" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          n = {userN}
                        </text>
                      </g>
                    );
                  })()}

                  {/* Line Plot Helpers */}
                  {(() => {
                    const minN = growthData[0]?.n || 4;
                    const maxNVal = growthData[growthData.length - 1]?.n || 100;
                    const allGrowthVals = growthData.flatMap(d => [d.main, d.alt1 || 0, d.alt2 || 0]);
                    const maxVal = Math.max(...allGrowthVals, 1);

                    const scaleX = (n) => 70 + ((n - minN) / (maxNVal - minN || 1)) * 600;
                    const scaleY = (v) => {
                      if (isLogScale) {
                        const logMin = 0;
                        const logMax = Math.log10(maxVal || 10);
                        const logV = Math.log10(Math.max(v, 1));
                        return 230 - ((logV - logMin) / (logMax - logMin || 1)) * 190;
                      }
                      return 230 - (v / maxVal) * 190;
                    };

                    const makePath = (key) =>
                      growthData
                        .map((d, idx) => `${idx === 0 ? 'M' : 'L'} ${scaleX(d.n)} ${scaleY(d[key])}`)
                        .join(' ');

                    return (
                      <g>
                        {/* Alternative 2 Line (Teal) */}
                        {profile.alternatives[1] && (
                          <>
                            <path d={makePath('alt2')} fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.8" />
                            {growthData.map((d, i) => (
                              <circle key={i} cx={scaleX(d.n)} cy={scaleY(d.alt2)} r="3" fill="#2dd4bf" />
                            ))}
                          </>
                        )}

                        {/* Alternative 1 Line (Amber) */}
                        {profile.alternatives[0] && (
                          <>
                            <path d={makePath('alt1')} fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.85" />
                            {growthData.map((d, i) => (
                              <circle key={i} cx={scaleX(d.n)} cy={scaleY(d.alt1)} r="3.5" fill="#fbbf24" />
                            ))}
                          </>
                        )}

                        {/* Primary Recommended Algorithm (Indigo / Glowing) */}
                        <path d={makePath('main')} fill="none" stroke="#818cf8" strokeWidth="3" />
                        {growthData.map((d, i) => (
                          <circle key={i} cx={scaleX(d.n)} cy={scaleY(d.main)} r="4" fill="#6366f1" stroke="#ffffff" strokeWidth="1.5" />
                        ))}
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}
          </div>

          {/* Tradeoff Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Recommended Approach</span>
                <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">{profile.averageTime}</span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm">{profile.name}</h5>
              <p className="text-xs text-slate-600 mt-1">
                Space Complexity: <span className="font-mono font-bold text-slate-800">{profile.space}</span>. Evaluates ~{currentAvg.toLocaleString()} operations at n={userN}.
              </p>
            </div>

            {profile.alternatives.slice(0, 2).map((alt, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Alternative {i + 1}</span>
                  <span className="text-[10px] font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">{alt.time}</span>
                </div>
                <h5 className="font-bold text-slate-900 text-sm">{alt.name}</h5>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {alt.tradeoff}
                </p>
              </div>
            ))}
          </div>
    </div>
  );
}
