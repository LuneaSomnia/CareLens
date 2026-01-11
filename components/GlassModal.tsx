import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface GlassModalProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  borderColorClass: string; // e.g., border-cyan-400
}

const GlassModal: React.FC<GlassModalProps> = ({ children, onClose, title, borderColorClass }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Background Dimmer - slightly reduced to show off crystals */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose}></div>

      {/* Main Glass Panel */}
      <div className={`relative w-full max-w-6xl h-[90vh] glass-panel rounded-2xl flex flex-col overflow-hidden border shadow-[0_0_50px_rgba(0,0,0,0.5)] ${borderColorClass}`}>
        
        {/* Header - darker glass for contrast */}
        <div className={`flex items-center justify-between p-6 border-b border-white/10 bg-black/20`}>
          <h2 className={`text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-md`}>
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-transparent to-black/20">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassModal;