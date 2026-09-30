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
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-8 animate-fade-in">
      {/* Background Dimmer - slightly reduced to show off crystals */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main Glass Panel */}
      <div className={`relative w-full md:max-w-6xl h-[100dvh] md:h-[90vh] max-h-[100dvh] glass-panel rounded-none md:rounded-2xl flex flex-col overflow-hidden border-0 md:border shadow-[0_0_50px_rgba(0,0,0,0.5)] ${borderColorClass}`}>
        
        {/* Header - darker glass for contrast */}
        <div className={`flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-black/20 shrink-0`}>
          <h2 className={`text-xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-md truncate pr-4`}>
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white bg-white/5 md:bg-transparent"
          >
            <X size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-transparent to-black/20 pb-32 md:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassModal;