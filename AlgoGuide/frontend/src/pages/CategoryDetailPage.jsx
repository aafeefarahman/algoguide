import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_TAXONOMY_CATEGORIES } from '../data/categoriesData';
import { ArrowLeft, ExternalLink, Clock, HardDrive, BookOpen } from 'lucide-react';

export default function CategoryDetailPage() {
  const { categoryId } = useParams();

  // Find category matching categoryId or slug
  const normId = (categoryId || "").toLowerCase().trim();
  const categoryData = ALL_TAXONOMY_CATEGORIES.find(cat => 
    cat.id.toLowerCase() === normId || 
    cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normId
  ) || ALL_TAXONOMY_CATEGORIES[0];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Back Link */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Categories</span>
        </Link>

        {/* Category Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 shadow-xl border border-indigo-900/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Category Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {categoryData.title} Algorithms
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {categoryData.description}
          </p>
        </div>

        {/* Algorithm List Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Detailed Algorithm Catalog</span>
            <span className="text-xs font-semibold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
              {categoryData.algorithms.length} Algorithms
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryData.algorithms.map((alg, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {alg.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                      {alg.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Time: {alg.time}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono">
                        <HardDrive className="w-3.5 h-3.5 text-teal-600" />
                        <span>Space: {alg.space}</span>
                      </div>
                    </div>
                  </div>

                  {alg.resourceLink ? (
                    <a
                      href={alg.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-colors group cursor-pointer"
                    >
                      <span>Read Guide on GeeksforGeeks</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 text-xs font-medium">
                      <span>Resource Guide Coming Soon</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
