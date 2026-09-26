import React from 'react';
import { Sparkles, Clock, HardDrive, CheckCircle2, ArrowRight, ShieldCheck, GitCompare } from 'lucide-react';

function parseBullet(bullet) {
  if (typeof bullet === 'object' && bullet !== null) {
    return { title: bullet.title || 'Correctness Property', description: bullet.description || '' };
  }
  if (typeof bullet === 'string') {
    const parts = bullet.split(/:\s*(.+)/);
    if (parts.length >= 2) {
      return { title: parts[0].trim(), description: parts[1].trim() };
    }
    return { title: bullet, description: '' };
  }
  return { title: String(bullet), description: '' };
}

export default function RecommendationResult({ result, onExploreCategory }) {
  if (!result) return null;

  const algorithmName = result.algorithmName || result.strategy;
  const category = result.category || result.syllabus_module;
  const { confidence, timeComplexity, spaceComplexity, dualTechnique } = result;
  const explanation = result.explanation || result.reasoning;
  const bullets = result.correctness_justification || result.correctnessJustification || [];

  return (
    <div id="recommendation-result" className="mt-8 transition-all duration-500 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{dualTechnique ? "Dual Algorithmic Strategy Result" : "Recommended Strategy"}</span>
            </div>

            {/* Primary Confidence Match */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-300">Confidence Match:</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{confidence} Match</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {algorithmName}
          </h2>

          <p className="mt-2 text-indigo-200/80 text-sm font-medium">
            DAA Category Taxonomy: <span className="text-white font-semibold underline decoration-indigo-400">{category}</span>
          </p>
        </div>

        {/* Content Body: Dual vs Single Technique */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {dualTechnique ? (
            /* Dual Technique Side-by-Side Cards Layout */
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                <GitCompare className="w-4 h-4 text-indigo-600" />
                <span>DUAL PARADIGM ANALYSIS: {category} VS {dualTechnique.category || dualTechnique.syllabus_module}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Technique 1 Card */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                        APPROACH A: {category}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {confidence} Match
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{algorithmName}</h3>
                    
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 font-mono">
                      <div>
                        <strong className="text-slate-800 font-mono">Time:</strong> <span className="font-bold text-slate-900">{timeComplexity}</span>
                        {result.timeExplanation && <p className="text-slate-500 font-sans mt-0.5 leading-normal">{result.timeExplanation}</p>}
                      </div>
                      <div className="pt-1">
                        <strong className="text-slate-800 font-mono">Space:</strong> <span className="font-bold text-slate-900">{spaceComplexity}</span>
                        {result.spaceExplanation && <p className="text-slate-500 font-sans mt-0.5 leading-normal">{result.spaceExplanation}</p>}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      "{explanation.replace(/^["']|["']$/g, '')}"
                    </p>
                  </div>
                </div>

                {/* Technique 2 Card */}
                <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-200/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/80 px-2.5 py-0.5 rounded-md">
                        APPROACH B: {dualTechnique.category}
                      </span>
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {dualTechnique.confidence || confidence} Match
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">{dualTechnique.algorithmName}</h3>
                    
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 font-mono">
                      <div>
                        <strong className="text-slate-800 font-mono">Time:</strong> <span className="font-bold text-slate-900">{dualTechnique.timeComplexity}</span>
                        {dualTechnique.timeExplanation && <p className="text-slate-500 font-sans mt-0.5 leading-normal">{dualTechnique.timeExplanation}</p>}
                      </div>
                      <div className="pt-1">
                        <strong className="text-slate-800 font-mono">Space:</strong> <span className="font-bold text-slate-900">{dualTechnique.spaceComplexity}</span>
                        {dualTechnique.spaceExplanation && <p className="text-slate-500 font-sans mt-0.5 leading-normal">{dualTechnique.spaceExplanation}</p>}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      "{dualTechnique.explanation.replace(/^["']|["']$/g, '')}"
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Single Technique Standard Layout */
            <>
              {/* Complexity Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs text-slate-500 font-medium">Time Complexity:</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{timeComplexity || "O(n log n)"}</span>
                  </div>
                  {result.timeExplanation && <p className="text-xs text-slate-500 pl-6">{result.timeExplanation}</p>}
                </div>

                <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-teal-600" />
                    <span className="text-xs text-slate-500 font-medium">Space Complexity:</span>
                    <span className="text-sm font-mono font-bold text-slate-900">{spaceComplexity || "O(V)"}</span>
                  </div>
                  {result.spaceExplanation && <p className="text-xs text-slate-500 pl-6">{result.spaceExplanation}</p>}
                </div>
              </div>

              {/* Explanation Rationale */}
              <div className="bg-indigo-50/60 rounded-xl p-5 border border-indigo-100/80">
                <h3 className="text-sm font-semibold text-indigo-950 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Why this algorithm fits your problem
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  "{explanation.replace(/^["']|["']$/g, '')}"
                </p>
              </div>
            </>
          )}

          {/* Justification of Solution Correctness (WHY THESE APPROACHES WORK) */}
          {bullets && bullets.length > 0 && (
            <div className="bg-emerald-50/50 rounded-xl p-5 sm:p-6 border border-emerald-200/70 space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 tracking-wide uppercase">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{dualTechnique ? "WHY THESE APPROACHES WORK" : "WHY THIS APPROACH WORKS"}</span>
              </h3>
              <ul className="space-y-3.5">
                {bullets.map((rawBullet, idx) => {
                  const { title, description } = parseBullet(rawBullet);
                  return (
                    <li key={idx} className="space-y-1">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                        <span className="text-emerald-700 font-extrabold">{idx + 1}.</span>
                        <span>{title}</span>
                      </div>
                      {description && (
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-5">
                          "{description.replace(/^["']|["']$/g, '')}"
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Action CTAs */}
          {onExploreCategory && (
            <div className="pt-2 flex justify-end border-t border-slate-100">
              <button
                onClick={() => onExploreCategory(category)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-colors border border-indigo-200 cursor-pointer"
              >
                <span>Explore {category} Category Guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
