import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BarChart3, BookOpen, Activity, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';

export default function HomePage() {
  const featureHighlights = [
    {
      icon: Sparkles,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      title: "Smart recommendations",
      description: "Describe a problem, get the best algorithm."
    },
    {
      icon: BarChart3,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      title: "Complexity graphs",
      description: "Compare how algorithms scale as input grows."
    },
    {
      icon: BookOpen,
      color: "text-teal-600 bg-teal-50 border-teal-200",
      title: "Keyword glossary",
      description: "Hover any term to see what it means."
    },
    {
      icon: Activity,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      title: "Live animations",
      description: "Watch the algorithm run step by step."
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Feature Highlights (Core Capabilities) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 -mt-10 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Core Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Learn algorithms, not just names
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Pick the right algorithm and see why it works.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featureHighlights.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-3.5 ${feature.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary CTA Banner to Recommender */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ready to analyze your algorithmic problem?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Get immediate paradigm classifications, complexity graphs, keyword definitions, and live output animations.
            </p>
          </div>

          <Link
            to="/recommender"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all shrink-0 cursor-pointer"
          >
            <span>Launch Recommender</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
