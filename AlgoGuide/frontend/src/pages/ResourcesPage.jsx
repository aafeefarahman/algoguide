import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_TAXONOMY_CATEGORIES } from '../data/categoriesData';
import { ArrowRight, BookOpen, ExternalLink, ArrowUpDown, Search, Network, Layers, BrainCircuit, Zap, GitFork, RotateCcw } from 'lucide-react';

const ICON_MAP = {
  ArrowUpDown, Search, Network, Layers, BrainCircuit, Zap, GitFork, RotateCcw
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Algorithm Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learning Resources & Taxonomy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore all 8 fundamental computer science algorithm taxonomy categories with direct open-source implementations.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ALL_TAXONOMY_CATEGORIES.map((cat) => {
            const IconComp = ICON_MAP[cat.iconName] || BookOpen;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed min-h-[36px]">
                    {cat.description}
                  </p>

                  {/* Algorithm Links */}
                  <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                    {cat.algorithms.map((alg, idx) => {
                      if (alg.resourceLink) {
                        return (
                          <a
                            key={idx}
                            href={alg.resourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between py-1 px-2 rounded-lg hover:bg-indigo-50/70 text-xs font-medium text-slate-800 hover:text-indigo-600 transition-colors"
                          >
                            <span className="group-hover:underline">{alg.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          </a>
                        );
                      }
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1 px-2 text-xs font-medium text-slate-500"
                        >
                          <span>{alg.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Link
                  to={`/resources/${cat.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-medium text-xs border border-slate-200 hover:border-indigo-600 transition-all group"
                >
                  <span>Explore {cat.title} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
