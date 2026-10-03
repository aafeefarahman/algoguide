import React, { useState, useMemo } from 'react';
import { BookOpen, ExternalLink, Sparkles, CheckCircle, ChevronDown, ChevronUp, Tag } from 'lucide-react';
import { matchGlossaryKeywords, GLOSSARY_TERMS } from '../data/glossaryData';

export default function KeywordGlossarySection({ userProblem = "", solutionData = {}, onNavigateResource }) {
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'problem' | 'solution'
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredTerm, setHoveredTerm] = useState(null);

  // Extract combined solution text for comprehensive matching
  const solutionText = useMemo(() => {
    const parts = [
      solutionData.algorithmName || solutionData.strategy || "",
      solutionData.category || solutionData.syllabus_module || "",
      solutionData.explanation || solutionData.reasoning || "",
      solutionData.timeExplanation || "",
      solutionData.spaceExplanation || "",
      ...(solutionData.correctness_justification || solutionData.correctnessJustification || []).map(b => 
        typeof b === 'object' ? `${b.title} ${b.description}` : String(b)
      ),
      solutionData.dualTechnique?.algorithmName || "",
      solutionData.dualTechnique?.explanation || ""
    ];
    return parts.filter(Boolean).join(" ");
  }, [solutionData]);

  // Match keywords for both groups (top 5-8 cards per group)
  const problemMatches = useMemo(() => {
    return matchGlossaryKeywords(userProblem, 8);
  }, [userProblem]);

  const solutionMatches = useMemo(() => {
    return matchGlossaryKeywords(solutionText, 8);
  }, [solutionText]);

  // Fallback if user problem text was very brief: pull relevant paradigm terms
  const displayProblemTerms = useMemo(() => {
    if (problemMatches.length > 0) return problemMatches;
    // Fallback: match based on solution category or algorithm
    return matchGlossaryKeywords(`${solutionData.algorithmName || ""} ${solutionData.category || ""}`, 6);
  }, [problemMatches, solutionData]);

  const displaySolutionTerms = useMemo(() => {
    if (solutionMatches.length > 0) return solutionMatches;
    return matchGlossaryKeywords(`${solutionData.algorithmName || ""} Dynamic Programming Greedy Divide & Conquer Backtracking`, 6);
  }, [solutionMatches, solutionData]);

  // Render annotated problem text with interactive underlined hover popovers
  const renderAnnotatedProblem = () => {
    if (!userProblem || userProblem.trim().length === 0) {
      return (
        <span className="italic text-slate-400">
          No explicit problem text provided. Keywords derived from algorithm taxonomy.
        </span>
      );
    }

    // Build regex of all matched terms in the problem
    const activeTerms = displayProblemTerms;
    if (activeTerms.length === 0) return <span>{userProblem}</span>;

    // Collect all alias regex patterns
    const aliasMap = new Map();
    const allAliases = [];

    activeTerms.forEach(t => {
      [t.term, ...t.aliases].forEach(alias => {
        allAliases.push(alias);
        aliasMap.set(alias.toLowerCase(), t);
      });
    });

    // Sort aliases longest first to match compound phrases properly
    allAliases.sort((a, b) => b.length - a.length);

    // Escape regex
    const pattern = new RegExp(`(${allAliases.map(a => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

    const parts = userProblem.split(pattern);

    return parts.map((part, index) => {
      const lower = part.toLowerCase();
      const matchedItem = aliasMap.get(lower);

      if (matchedItem) {
        return (
          <span
            key={index}
            className="relative inline-block border-b-2 border-indigo-400 font-semibold text-indigo-900 bg-indigo-50/70 px-1 py-0.5 rounded cursor-help transition-all hover:bg-indigo-100 hover:text-indigo-950"
            onMouseEnter={() => setHoveredTerm(matchedItem)}
            onMouseLeave={() => setHoveredTerm(null)}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div id="glossary-section" className="mt-8 bg-white rounded-2xl border border-indigo-100 shadow-xl overflow-hidden transition-all duration-300">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Key terms
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
          {/* Annotated Problem Box with Underline & Hover Tooltip */}
          {userProblem && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
              <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
                {renderAnnotatedProblem()}
              </div>

              {/* Floating Hover Card */}
              {hoveredTerm && (
                <div className="mt-3 p-3.5 bg-slate-900 text-white rounded-xl border border-indigo-500/40 shadow-xl animate-fadeIn">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      {hoveredTerm.term}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {hoveredTerm.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-normal">{hoveredTerm.meaning}</p>
                  <p className="text-[11px] text-indigo-200 mt-1 font-medium">
                    <strong className="text-white">Why it matters:</strong> {hoveredTerm.whyItMatters}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Group Filter Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'both' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Concepts ({displayProblemTerms.length + displaySolutionTerms.length})
            </button>
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'problem' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In Your Problem ({displayProblemTerms.length})
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'solution' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              In The Solution ({displaySolutionTerms.length})
            </button>
          </div>

          {/* Group 1: In Your Problem */}
          {(activeTab === 'both' || activeTab === 'problem') && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Keywords Identified in Your Problem
                </h4>
                <span className="text-xs text-slate-500">({displayProblemTerms.length} core concepts)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayProblemTerms.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-indigo-600" />
                          {item.term}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                        {item.meaning}
                      </p>
                      <div className="bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100/80 mb-3">
                        <p className="text-[11px] text-indigo-900 leading-normal">
                          <strong className="text-indigo-950 font-bold">Why it matters:</strong> {item.whyItMatters}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Key DAA Primitive</span>
                      <a
                        href="/resources"
                        onClick={(e) => {
                          if (onNavigateResource) {
                            e.preventDefault();
                            onNavigateResource(item.category);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                      >
                        <span>Learn in Resources</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: In The Solution */}
          {(activeTab === 'both' || activeTab === 'solution') && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Algorithmic Principles in the Recommended Solution
                </h4>
                <span className="text-xs text-slate-500">({displaySolutionTerms.length} core concepts)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displaySolutionTerms.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h5 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          {item.term}
                        </h5>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed mb-2.5">
                        {item.meaning}
                      </p>
                      <div className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100/80 mb-3">
                        <p className="text-[11px] text-emerald-900 leading-normal">
                          <strong className="text-emerald-950 font-bold">Why it matters:</strong> {item.whyItMatters}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Correctness & Optimality</span>
                      <a
                        href="/resources"
                        onClick={(e) => {
                          if (onNavigateResource) {
                            e.preventDefault();
                            onNavigateResource(item.category);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold text-xs"
                      >
                        <span>Study Module / Quiz</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
