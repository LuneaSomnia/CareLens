import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, Symptom } from '../types';
import { analyzeSymptomsAndRisks } from '../services/geminiService';
import { AlertTriangle, BookOpen, BrainCircuit, Plus, Trash2 } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
}

const AnalysisRisk: React.FC<Props> = ({ userProfile }) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [newSymptom, setNewSymptom] = useState<Partial<Symptom>>({ name: '', severity: 5, duration: '' });
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const addSymptom = () => {
    if (newSymptom.name) {
      setSymptoms([...symptoms, { 
        id: Date.now().toString(), 
        name: newSymptom.name!, 
        severity: newSymptom.severity || 5, 
        duration: newSymptom.duration || '1 day',
        date: new Date().toLocaleDateString(),
        notes: ''
      } as Symptom]);
      setNewSymptom({ name: '', severity: 5, duration: '' });
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const handleAnalysis = async () => {
    if (symptoms.length === 0) return;
    setAnalyzing(true);
    const result = await analyzeSymptomsAndRisks(userProfile, symptoms);
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left: Symptom Diary */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className="bg-black/30 border border-fuchsia-500/30 rounded-xl p-5">
           <h3 className="text-xl font-bold text-fuchsia-300 mb-4 flex items-center gap-2"><BookOpen /> Symptom Diary</h3>
           
           <div className="space-y-3 mb-6">
             <input 
               type="text" 
               placeholder="Symptom Name (e.g. Headache)" 
               className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:border-fuchsia-500 outline-none"
               value={newSymptom.name}
               onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
             />
             <div className="flex gap-2">
               <div className="flex-1">
                 <label className="text-xs text-gray-400 block mb-1">Severity (1-10)</label>
                 <input 
                    type="number" 
                    min="1" max="10"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none"
                    value={newSymptom.severity}
                    onChange={(e) => setNewSymptom({...newSymptom, severity: parseInt(e.target.value)})}
                 />
               </div>
               <div className="flex-1">
                 <label className="text-xs text-gray-400 block mb-1">Duration</label>
                 <input 
                    type="text" 
                    placeholder="e.g. 2 hours"
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none"
                    value={newSymptom.duration}
                    onChange={(e) => setNewSymptom({...newSymptom, duration: e.target.value})}
                 />
               </div>
             </div>
             <button 
               onClick={addSymptom}
               className="w-full py-2 bg-fuchsia-700/50 hover:bg-fuchsia-600/50 text-white rounded-lg flex items-center justify-center gap-2 transition-colors border border-fuchsia-500/30"
             >
               <Plus size={16} /> Add Entry
             </button>
           </div>

           <div className="flex-1 overflow-y-auto max-h-64 space-y-2 pr-2">
              {symptoms.length === 0 && <p className="text-gray-500 text-center italic text-sm">No symptoms logged.</p>}
              {symptoms.map(s => (
                <div key={s.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-start group border-l-4 border-fuchsia-500">
                  <div>
                    <div className="font-bold text-white">{s.name} <span className="text-xs font-normal text-gray-400">({s.date})</span></div>
                    <div className="text-xs text-gray-300">Severity: {s.severity}/10 | Duration: {s.duration}</div>
                  </div>
                  <button onClick={() => removeSymptom(s.id)} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
           </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAnalysis}
          disabled={symptoms.length === 0 || analyzing}
          className={`py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all transform hover:scale-[1.02] ${
            symptoms.length === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
          }`}
        >
          {analyzing ? <span className="animate-pulse">Analyzing Risks...</span> : <><BrainCircuit /> Analyze & Calculate Risk</>}
        </button>
      </div>

      {/* Right: AI Output (Smart Tests & Risk Calculation) */}
      <div className="lg:col-span-7 bg-black/40 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden flex flex-col">
         {/* Decorative BG */}
         <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl"></div>
         
         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 z-10">
           <AlertTriangle className="text-pink-500" /> 
           Risk Calculation & Smart Tests
         </h3>

         <div className="flex-1 overflow-y-auto bg-black/20 rounded-lg p-5 z-10 border border-white/5">
           {!analysisResult && !analyzing && (
             <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center">
               <BrainCircuit size={48} className="mb-4 text-gray-700" />
               <p>Log your symptoms and click "Analyze" to receive<br/>Smart Test suggestions and Risk Calculations.</p>
             </div>
           )}
           
           {analyzing && (
             <div className="h-full flex flex-col items-center justify-center space-y-4">
               <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-fuchsia-300 animate-pulse">Consulting Gemini Knowledge Base...</p>
             </div>
           )}

           {analysisResult && (
             <div className="markdown-content text-sm leading-relaxed text-gray-200">
               <ReactMarkdown>{analysisResult}</ReactMarkdown>
             </div>
           )}
         </div>
      </div>

    </div>
  );
};

export default AnalysisRisk;