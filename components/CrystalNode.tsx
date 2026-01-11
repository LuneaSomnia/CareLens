import React from 'react';

interface CrystalNodeProps {
  icon: string;
  label: string;
  colorClass: string; // Tailwind class for text color
  glowClass: string; // CSS animation class
  gradientClass: string; // Tailwind gradient bg
  onClick: () => void;
  delay?: string;
}

const CrystalNode: React.FC<CrystalNodeProps> = ({ icon, label, colorClass, glowClass, gradientClass, onClick, delay = '0s' }) => {
  return (
    <div 
      className="group relative flex flex-col items-center justify-center cursor-pointer animate-float"
      style={{ animationDelay: delay }}
      onClick={onClick}
    >
      {/* Glow Effect behind */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${colorClass.replace('text-', 'bg-')}`}></div>

      {/* The Crystal Shape */}
      <div 
        className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center crystal-shape transition-all duration-300 transform group-hover:scale-110 ${gradientClass}`}
        style={{ animation: `${glowClass} 3s infinite` }}
      >
        <div className="absolute inset-1 bg-black bg-opacity-40 crystal-shape flex items-center justify-center backdrop-blur-sm">
           <span className="text-4xl md:text-5xl filter drop-shadow-lg">{icon}</span>
        </div>
      </div>

      {/* Label (appears on hover) */}
      <div className={`mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg tracking-wider ${colorClass} bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10`}>
        {label}
      </div>
    </div>
  );
};

export default CrystalNode;
