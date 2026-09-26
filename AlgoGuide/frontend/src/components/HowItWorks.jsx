import React from 'react';
import { FileText, ScanSearch, Lightbulb } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Describe Your Problem",
      description: "Enter your problem statement in plain English, or select from common algorithmic patterns."
    },
    {
      number: "02",
      icon: ScanSearch,
      title: "Detect Problem Type",
      description: "Our classifier analyzes your problem statement and constraints to identify the underlying problem type."
    },
    {
      number: "03",
      icon: Lightbulb,
      title: "Get Your Recommendation",
      description: "Receive the best-fit algorithmic approach for your problem, along with complexity tradeoffs and a detailed rationale for why it fits."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How AlgoGuide Works
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A 3-step system bridging problem statements to verified algorithmic implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={idx} className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-300 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
