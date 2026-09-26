import React from 'react';
import { ArrowRight, ExternalLink, ArrowUpDown, Search, Network, Layers } from 'lucide-react';
import { HOMEPAGE_CATEGORIES } from '../data/categoriesData';

// Map icon names to Lucide components
const ICON_MAP = {
  ArrowUpDown: ArrowUpDown,
  Search: Search,
  Network: Network,
  Layers: Layers
};

export default function CategoryCards({ onLearnMore }) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Learning Resources
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Browse core algorithm categories or jump directly to detailed reference guides on GeeksforGeeks.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOMEPAGE_CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.iconName] || ArrowUpDown;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <IconComponent className="w-5 h-5" />
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

                  {/* Clickable Algorithm Links List */}
                  <div className="border-t border-slate-100 pt-4 space-y-2 mb-6">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Algorithms:
                    </span>
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

                {/* Learn More Button -> Routes to Internal Category Page */}
                <button
                  onClick={() => onLearnMore(cat.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-medium text-xs border border-slate-200 hover:border-indigo-600 transition-all cursor-pointer group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
