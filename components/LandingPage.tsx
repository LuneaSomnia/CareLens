import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield } from 'lucide-react';
import Background from './Background';

const LandingPage: React.FC = () => {
  return (
    <div className="h-screen overflow-y-auto w-full bg-[#050505] text-white flex flex-col relative">
      <Background />
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-cyan-500/20 bg-black/40 backdrop-blur-md relative z-10">
        <div className="flex items-center gap-2">
          <Activity className="text-cyan-400" size={32} />
          <h1 className="text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
            CareLens
          </h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link to="/app" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Web App</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden z-10">
        
        <div className="relative z-10 max-w-4xl space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Proactive Health,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#2D5BFF] to-[#FF0099]">
              Clearly in Focus.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            CareLens is your AI-driven preventive care companion. Get personalized recommendations, track your health risks, and connect seamlessly with medical professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/app" 
              className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
            >
              <Shield size={20} />
              Open Web App
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-cyan-500/20 text-gray-500 text-sm relative z-10 bg-black/40 backdrop-blur-md flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex-1">
          &copy; {new Date().getFullYear()} CareLens. All rights reserved.
        </div>
        <div className="flex-1 flex justify-end">
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
