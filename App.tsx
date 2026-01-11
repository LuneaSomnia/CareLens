import React, { useState, useEffect, useMemo } from 'react';
import CrystalNode from './components/CrystalNode';
import GlassModal from './components/GlassModal';
import UserProfileComponent from './components/UserProfile';
import PreventionDashboard from './components/PreventionDashboard';
import AnalysisRisk from './components/AnalysisRisk';
import ManagementCare from './components/ManagementCare';
import { UserProfile, ViewState } from './types';

// Initial Mock Data
const INITIAL_PROFILE: UserProfile = {
  name: "Alex Doe",
  age: "34",
  gender: "Male",
  email: "alex.doe@example.com",
  location: "New York, USA",
  conditions: "Mild Asthma, Seasonal Allergies",
  allergies: "Pollen",
  medications: "Albuterol Inhaler (as needed)",
  familyHistory: "Father: Hypertension, Mother: Diabetes Type 2",
  organDonor: true,
  diet: "Omnivore, trying to reduce sugar",
  activity: "Jogging 5km 2x/week, Sedentary job",
  sleep: "6.5 hours average",
  substanceUse: "Social drinker (2 units/week), Non-smoker"
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  // Parallax Effect for Background
  // Reduced sensitivity slightly to prevent disorientation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth - e.pageX * 2) / 100; 
      const y = (window.innerHeight - e.pageY * 2) / 100;
      setBgOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const closeModal = () => setView(ViewState.HOME);

  // Generate background crystals with sharper, vivid aesthetics and rudimentary shapes
  // Increased count to 100
  const backgroundCrystals = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const typeSeed = Math.random();
      let type = 'crystal-raw-1';
      if (typeSeed > 0.25) type = 'crystal-raw-2';
      if (typeSeed > 0.5) type = 'crystal-raw-3';
      if (typeSeed > 0.75) type = 'crystal-raw-4';
      
      // Vivid Palettes
      // 0: Sapphire Blue (#2D5BFF) to Ultraviolet (#8C52FF)
      // 1: Amethyst Purple (#9D46FF) to Magenta (#FF0099)
      // 2: Emerald Green (#00FF94) to Teal (#00BCD4)
      const palette = i % 3;
      let gradient = '';
      if (palette === 0) gradient = 'from-[#2D5BFF] via-[#5D5BFF] to-[#8C52FF]';
      else if (palette === 1) gradient = 'from-[#9D46FF] via-[#D020CC] to-[#FF0099]';
      else gradient = 'from-[#00FF94] via-[#00DDAA] to-[#00BCD4]';

      // Randomize Z-depth for 3D effect
      const zDepth = Math.random() * 400 - 200; // Wider z-range for depth

      return {
        id: i,
        left: `${Math.random() * 120 - 10}%`, // Allow spread off-screen
        top: `${Math.random() * 120 - 10}%`,
        size: `${Math.random() * 150 + 40}px`, // Varied rudimentary sizes
        rotation: Math.random() * 360,
        gradient,
        type,
        // Increased opacity for vividness (0.4 to 0.9 range)
        opacity: Math.random() * 0.5 + 0.4, 
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        z: zDepth
      };
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      
      {/* 
        Fixed Background Layers 
        Moved OUTSIDE the parallax transform div to fix the "page moving" issue.
        Only the crystals will move now.
      */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Deep, Dark Cave Background Gradient */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a0b2e_0%,_#0B1026_50%,_#000000_100%)]"></div>
         
         {/* Glowing atmospheric lights (Static) */}
         <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-[#2D5BFF] rounded-full blur-[150px] opacity-20 mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FF0099] rounded-full blur-[120px] opacity-20 mix-blend-screen animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* 3D Floating Crystal Layer (Parallax Enabled) */}
      <div 
        className="absolute inset-0 pointer-events-none perspective-3d"
        style={{ transform: `translate3d(${bgOffset.x}px, ${bgOffset.y}px, 0)` }}
      >
        {/* Floating Vivid Crystals */}
        {backgroundCrystals.map((crystal) => (
          <div
            key={crystal.id}
            className={`absolute ${crystal.type} crystal-vivid bg-gradient-to-br ${crystal.gradient} animate-float-deep`}
            style={{
              left: crystal.left,
              top: crystal.top,
              width: crystal.size,
              height: crystal.size,
              opacity: crystal.opacity,
              transform: `translateZ(${crystal.z}px) rotate(${crystal.rotation}deg)`,
              animationDuration: `${crystal.duration}s`,
              animationDelay: `${crystal.delay}s`,
              boxShadow: `0 0 20px ${crystal.gradient.includes('FF0099') ? '#FF0099' : crystal.gradient.includes('00FF94') ? '#00FF94' : '#2D5BFF'}60` 
            }}
          />
        ))}
      </div>

      {/* Main Home Content */}
      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${view !== ViewState.HOME ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}>
        
        <div className="flex flex-col items-center mb-16 md:mb-24 z-20">
           <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#2D5BFF] to-[#FF0099] drop-shadow-[0_0_25px_rgba(45,91,255,0.8)] uppercase">
            CareLens
          </h1>
          <p className="text-cyan-100/70 tracking-[0.2em] mt-4 uppercase text-sm font-semibold border-b border-cyan-500/30 pb-2">
            Your health, clearly in focus!🔍
          </p>
        </div>

        {/* Horizontal Shard Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-20 w-full max-w-7xl px-4 z-20">
          
          {/* 1. User Profile - Cyan Glow */}
          <CrystalNode 
            icon="👤" 
            label="User Profile" 
            colorClass="text-cyan-300" 
            glowClass="animate-[pulse-glow-cyan_4s_infinite]"
            gradientClass="bg-gradient-to-br from-cyan-400/40 to-blue-600/40 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            onClick={() => setView(ViewState.PROFILE)}
          />

          {/* 2. Prevention - Sapphire to UV */}
          <CrystalNode 
            icon="🛡️" 
            label="Prevention" 
            colorClass="text-indigo-200"
            glowClass="animate-[pulse-glow-blue_5s_infinite]"
            gradientClass="bg-gradient-to-br from-[#2D5BFF]/40 to-[#8C52FF]/40 border-2 border-[#2D5BFF] shadow-[0_0_30px_rgba(45,91,255,0.4)]"
            onClick={() => setView(ViewState.PREVENTION)}
            delay="0.3s"
          />
          
          {/* 3. Management - Emerald to Teal */}
          <CrystalNode 
            icon="🪴" 
            label="Management" 
            colorClass="text-teal-200"
            glowClass="animate-[pulse-glow-green_7s_infinite]"
            gradientClass="bg-gradient-to-br from-[#00FF94]/40 to-[#00BCD4]/40 border-2 border-[#00FF94] shadow-[0_0_30px_rgba(0,255,148,0.4)]"
            onClick={() => setView(ViewState.MANAGEMENT)}
            delay="0.6s"
          />

          {/* 4. Analysis - Amethyst to Magenta */}
          <CrystalNode 
            icon="💎" 
            label="Analysis" 
            colorClass="text-fuchsia-200"
            glowClass="animate-[pulse-glow-purple_6s_infinite]"
            gradientClass="bg-gradient-to-br from-[#9D46FF]/40 to-[#FF0099]/40 border-2 border-[#FF0099] shadow-[0_0_30px_rgba(255,0,153,0.4)]"
            onClick={() => setView(ViewState.ANALYSIS)}
            delay="0.9s"
          />

        </div>
      </div>

      {/* Modals for Pages */}
      {view === ViewState.PROFILE && (
        <GlassModal title="User Profile" onClose={closeModal} borderColorClass="border-cyan-400/30 shadow-cyan-500/20">
          <UserProfileComponent data={userProfile} onChange={setUserProfile} />
        </GlassModal>
      )}

      {view === ViewState.PREVENTION && (
        <GlassModal title="Prevention Dashboard" onClose={closeModal} borderColorClass="border-[#2D5BFF]/30 shadow-indigo-500/20">
          <PreventionDashboard userProfile={userProfile} />
        </GlassModal>
      )}

      {view === ViewState.ANALYSIS && (
        <GlassModal title="Analysis & Risk" onClose={closeModal} borderColorClass="border-[#9D46FF]/30 shadow-fuchsia-500/20">
          <AnalysisRisk userProfile={userProfile} />
        </GlassModal>
      )}

      {view === ViewState.MANAGEMENT && (
        <GlassModal title="Management & Care" onClose={closeModal} borderColorClass="border-[#00FF94]/30 shadow-teal-500/20">
          <ManagementCare userProfile={userProfile} />
        </GlassModal>
      )}

    </div>
  );
};

export default App;