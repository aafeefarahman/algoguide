import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#060d18] text-slate-400 border-t border-slate-800/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="AlgoGuide Logo"
              className="w-7 h-7 rounded-lg object-contain"
            />
            <span className="text-lg font-bold text-white tracking-tight">
              Algo<span className="text-indigo-400">Guide</span>
            </span>
          </div>
        </div>

        {/* Credit Line */}
        <div className="pt-2 text-xs text-slate-500 font-medium">
          <p>Made by LG07 (3017 & 3029)</p>
        </div>

      </div>
    </footer>
  );
}
