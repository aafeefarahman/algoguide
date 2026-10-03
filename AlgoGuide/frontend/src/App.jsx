import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RecommenderPage from './pages/RecommenderPage';
import ResourcesPage from './pages/ResourcesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import QuizPage from './pages/QuizPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recommender" element={<RecommenderPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:categoryId" element={<CategoryDetailPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
