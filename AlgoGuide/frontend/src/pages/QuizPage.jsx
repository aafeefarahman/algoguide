import React, { useState } from 'react';
import { DAA_TOPICS, DIFFICULTIES, QUIZ_QUESTION_BANK } from '../data/quizData';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight, Award, Sparkles, BookOpen, Layers, ShieldAlert, ArrowLeft } from 'lucide-react';

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Derive questions for topic x difficulty combination
  const questionKey = selectedTopic && selectedDifficulty ? `${selectedTopic.id}_${selectedDifficulty}` : null;
  const questions = questionKey ? (QUIZ_QUESTION_BANK[questionKey] || []) : [];
  const currentQ = questions[currentQuestionIndex];

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSelectedDifficulty(null);
    resetState();
  };

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    resetState();
  };

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleSelectOption = (index) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    resetState();
  };

  const handleFullReset = () => {
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    resetState();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Step Indicator Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>DAA Practice Quiz — 3-Step Assessment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Design & Analysis of Algorithms Quiz
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Test your conceptual knowledge, scenario applications, and edge-case analytical skills across DAA syllabus topics.
          </p>
        </div>

        {/* 3-Step Progress Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-500">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${selectedTopic ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-indigo-600 text-white border-indigo-600'}`}>
            <span>Step 1: Topic</span>
            {selectedTopic && <CheckCircle2 className="w-3.5 h-3.5" />}
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${selectedDifficulty ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : selectedTopic ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
            <span>Step 2: Difficulty</span>
            {selectedDifficulty && <CheckCircle2 className="w-3.5 h-3.5" />}
          </div>
          <span className="text-slate-300">→</span>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${selectedTopic && selectedDifficulty ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 border-slate-200 opacity-60'}`}>
            <span>Step 3: MCQs</span>
          </div>
        </div>

        {/* STEP 1: TOPIC SELECTION */}
        {!selectedTopic && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Step (a): Select DAA Syllabus Topic</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DAA_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 inline-block border border-indigo-100">
                      Topic
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                    <span>Select Topic</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: DIFFICULTY SELECTION (SHOWN ONLY AFTER TOPIC SELECTION) */}
        {selectedTopic && !selectedDifficulty && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedTopic(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Topic</span>
              </button>

              <span className="text-xs font-medium text-slate-500">
                Selected Topic: <strong className="text-slate-900">{selectedTopic.name}</strong>
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>Step (b): Select Assessment Difficulty</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Easy */}
                <button
                  onClick={() => handleSelectDifficulty("Easy")}
                  className="p-6 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md inline-block mb-2">
                    Easy
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Fundamentals & Definitions</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Test core terminology, standard formulations, and general algorithm definitions.
                  </p>
                </button>

                {/* Medium */}
                <button
                  onClick={() => handleSelectDifficulty("Medium")}
                  className="p-6 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md inline-block mb-2">
                    Medium
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Scenario Applications</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apply algorithmic techniques to specific problem constraints and data inputs.
                  </p>
                </button>

                {/* Hard */}
                <button
                  onClick={() => handleSelectDifficulty("Hard")}
                  className="p-6 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/40 text-left transition-all group cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md inline-block mb-2">
                    Hard
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Edge Cases & Tradeoffs</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comparative failure modes ("why X fails where Y works"), bounds, and asymptotic proofs.
                  </p>
                </button>

              </div>
            </div>
          </div>
        )}

        {/* STEP 3: MCQ EXECUTION & FEEDBACK */}
        {selectedTopic && selectedDifficulty && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm text-xs font-semibold">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Change Difficulty</span>
                </button>
                <span className="text-slate-300">|</span>
                <span className="text-slate-700">Topic: <strong>{selectedTopic.name}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Difficulty: {selectedDifficulty}
                </span>
              </div>
            </div>

            {!quizCompleted && currentQ ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
                
                {/* Question Counter & Live Score */}
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-4 border-b border-slate-100">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-indigo-600 font-mono">
                    Score: {score} / {currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
                  </span>
                </div>

                {/* Question Text */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
                    {selectedTopic.name} • {selectedDifficulty} Level
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentQ.question}
                  </h2>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    let btnStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100";
                    
                    if (isAnswerSubmitted) {
                      if (idx === currentQ.correctAnswer) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                      } else if (idx === selectedAnswer) {
                        btnStyle = "bg-rose-50 border-rose-400 text-rose-900 font-semibold";
                      } else {
                        btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                      }
                    } else if (selectedAnswer === idx) {
                      btnStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold shadow-sm";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                        {isAnswerSubmitted && idx === selectedAnswer && idx !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 animate-fadeIn">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Explanation & Rationale:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Actions Bottom Bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restart Questions</span>
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <span>{currentQuestionIndex + 1 < questions.length ? 'Next Question' : 'View Summary'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Quiz Completion Summary Screen */
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900">
                  Assessment Completed!
                </h2>

                <p className="text-slate-600 text-sm">
                  You scored <span className="font-bold text-indigo-600 text-lg">{score}</span> out of <span className="font-bold text-slate-900 text-lg">{questions.length}</span> in <strong className="text-slate-900">{selectedTopic.name}</strong> ({selectedDifficulty} Level).
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Same Assessment</span>
                  </button>

                  <button
                    onClick={handleFullReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-300 cursor-pointer transition-all"
                  >
                    <span>Choose New Topic / Difficulty</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
