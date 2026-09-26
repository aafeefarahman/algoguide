import React from 'react';
import { ArrowRight, Code2, Cpu, CheckCircle2, XCircle, Play, Send } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative bg-[#0a1628] text-white pt-8 pb-28 md:pt-12 md:pb-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Product Info & CTA */}
          <div className="lg:col-span-5 space-y-7 text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-extrabold tracking-tight text-white leading-none">
              Algo<span className="text-indigo-400">Guide</span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-xl font-normal leading-relaxed">
              Enter a problem and let AlgoGuide identify the best algorithmic approach.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 border border-indigo-400/20"
              >
                <span>How It Works</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>8 Core Taxonomy Categories</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered 4-Panel Tilted Mockup */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[490px] flex items-start justify-center pt-2 lg:pt-0">
            <div className="relative w-full max-w-lg mx-auto">
              
              {/* Panel 1: "Prompt" / Problem Statement */}
              <div className="absolute top-0 left-0 w-[78%] sm:w-[75%] bg-[#0b172a] border border-slate-700/70 rounded-xl p-4 shadow-2xl backdrop-blur-md transform -rotate-6 hover:-rotate-3 transition-transform duration-300 z-10">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs font-mono text-slate-300 ml-2">Prompt / Problem Statement</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">01_prompt.md</span>
                </div>
                {/* Header title skeleton */}
                <div className="h-3.5 w-3/4 bg-slate-700/80 rounded mb-3"></div>
                {/* 5-6 Skeleton Text Bars */}
                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-800 rounded"></div>
                  <div className="h-2 w-11/12 bg-slate-800/90 rounded"></div>
                  <div className="h-2 w-4/5 bg-slate-800/80 rounded"></div>
                  <div className="h-2 w-full bg-slate-800/90 rounded"></div>
                  <div className="h-2 w-2/3 bg-slate-800/70 rounded"></div>
                </div>
              </div>

              {/* Panel 2: "Input" / Code Analysis */}
              <div className="absolute top-12 right-0 w-[75%] sm:w-[72%] bg-[#0f1f38] border border-slate-700/70 rounded-xl p-4 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300 z-20">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-mono text-slate-300">Input / Code</span>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-medium bg-blue-600/90 text-white px-2 py-0.5 rounded shadow-sm">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Run</span>
                  </button>
                </div>
                {/* Syntax-highlighted abstract colorful bars */}
                <div className="space-y-2.5 py-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-12 bg-purple-500/80 rounded"></div>
                    <div className="h-2.5 w-24 bg-blue-400/80 rounded"></div>
                    <div className="h-2.5 w-8 bg-teal-400/80 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <div className="h-2.5 w-16 bg-teal-400/70 rounded"></div>
                    <div className="h-2.5 w-32 bg-amber-400/80 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <div className="h-2.5 w-20 bg-purple-400/80 rounded"></div>
                    <div className="h-2.5 w-14 bg-indigo-400/80 rounded"></div>
                    <div className="h-2.5 w-10 bg-rose-400/70 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <div className="h-2.5 w-28 bg-emerald-400/80 rounded"></div>
                    <div className="h-2.5 w-12 bg-blue-400/80 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Panel 3: "Tests / Categories" */}
              <div className="absolute top-48 left-4 w-[76%] sm:w-[73%] bg-[#0d1c33] border border-slate-700/70 rounded-xl p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 z-30">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-mono text-slate-300">Categories / Tests</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">3 Active</span>
                </div>
                {/* 3 rows of small colored pill shapes */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-5 px-2.5 bg-indigo-500/20 border border-indigo-500/40 rounded-full flex items-center">
                      <div className="h-1.5 w-12 bg-indigo-400 rounded-full"></div>
                    </div>
                    <div className="h-5 px-2.5 bg-blue-500/20 border border-blue-500/40 rounded-full flex items-center">
                      <div className="h-1.5 w-8 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 px-2.5 bg-teal-500/20 border border-teal-500/40 rounded-full flex items-center">
                      <div className="h-1.5 w-16 bg-teal-400 rounded-full"></div>
                    </div>
                    <div className="h-5 px-2.5 bg-purple-500/20 border border-purple-500/40 rounded-full flex items-center">
                      <div className="h-1.5 w-10 bg-purple-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 px-2.5 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center">
                      <div className="h-1.5 w-14 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 4: "Output / Recommendation" */}
              <div className="absolute top-64 right-2 w-[78%] sm:w-[76%] bg-[#12233f] border border-indigo-500/40 rounded-xl p-4 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 z-40">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-white font-semibold">Output / Result</span>
                  </div>
                  <button className="flex items-center gap-1 text-[11px] font-medium bg-emerald-600 text-white px-2 py-0.5 rounded shadow-sm">
                    <Send className="w-2.5 h-2.5" />
                    <span>Submit</span>
                  </button>
                </div>
                {/* 3 Result rows with colored status icons & bars */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="h-2 w-full bg-emerald-500/70 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <div className="h-2 w-4/5 bg-emerald-500/70 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <div className="h-2 w-2/5 bg-rose-500/60 rounded-full"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Light gradient fade-in transition at the bottom of the section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}
