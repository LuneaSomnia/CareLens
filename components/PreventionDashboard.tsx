import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, Vaccination, Screening } from '../types';
import { getGeminiRecommendations } from '../services/geminiService';
import { db, auth } from '../firebase';
import { collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';
import { X, Syringe, Activity, Heart, Plus, Shield, Sparkles } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
}

const PreventionDashboard: React.FC<Props> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'vaccines' | 'screening' | 'lifestyle'>('vaccines');
  const [recommendation, setRecommendation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Input States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDate, setNewItemDate] = useState('');
  const [newItemExtra, setNewItemExtra] = useState(''); // Notes or Result

  // Data
  const [vaccines, setVaccines] = useState<Vaccination[]>([]);
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [doctorRecords, setDoctorRecords] = useState<any[]>([]);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      if (!auth.currentUser) return;
      try {
        const q = query(
          collection(db, 'users', auth.currentUser.uid, 'medicalRecords'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctorRecords(records);
      } catch (error) {
        console.error("Error fetching medical records:", error);
      }
    };
    fetchMedicalRecords();
  }, []);

  const fetchAdvice = async (type: 'vaccine' | 'screening' | 'lifestyle') => {
    setLoading(true);
    setRecommendation('');

    // Save to DB1 (User's preventionData)
    if (auth.currentUser) {
      try {
        await addDoc(collection(db, 'users', auth.currentUser.uid, 'preventionData'), {
          type,
          vaccineHistory: JSON.stringify(vaccines),
          screeningHistory: JSON.stringify(screenings),
          lifestyleHabits: `Diet: ${userProfile.diet}, Activity: ${userProfile.activity}, Substance Use: ${userProfile.substanceUse}`,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.error("Failed to save prevention data to DB1", err);
      }
    }

    const result = await getGeminiRecommendations(userProfile, type);
    setRecommendation(result);
    setLoading(false);
  };

  const handleAddRecord = () => {
    if(!newItemName || !newItemDate) return;

    if (activeTab === 'vaccines') {
      const newVaccine: Vaccination = {
        id: Date.now().toString(),
        name: newItemName,
        date: newItemDate,
        notes: newItemExtra
      };
      setVaccines([...vaccines, newVaccine]);
    } else if (activeTab === 'screening') {
      const newScreening: Screening = {
        id: Date.now().toString(),
        name: newItemName,
        date: newItemDate,
        result: newItemExtra
      };
      setScreenings([...screenings, newScreening]);
    }
    
    // Reset and Close
    setNewItemName('');
    setNewItemDate('');
    setNewItemExtra('');
    setShowAddModal(false);
  };

  const renderTabButton = (id: 'vaccines' | 'screening' | 'lifestyle', label: string, icon: React.ReactNode) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setRecommendation('');
      }}
      className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-t-lg font-bold transition-all whitespace-nowrap text-sm md:text-base ${
        activeTab === id
          ? 'bg-blue-600/20 text-blue-300 border-b-2 border-blue-400'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="h-full flex flex-col relative">
      
      {/* Add Modal Overlay */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-none md:rounded-xl p-4">
          <div className="bg-gray-900 border border-blue-500/50 p-6 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Add {activeTab === 'vaccines' ? 'Immunization' : 'Screening'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={activeTab === 'vaccines' ? "e.g. Tetanus Booster" : "e.g. Mammogram"}
                  className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-blue-500 placeholder:text-gray-500/70"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <input 
                  type="date" 
                  value={newItemDate}
                  onChange={(e) => setNewItemDate(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-blue-500 placeholder:text-gray-500/70"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">{activeTab === 'vaccines' ? 'Notes' : 'Result'}</label>
                <input 
                  type="text" 
                  value={newItemExtra}
                  onChange={(e) => setNewItemExtra(e.target.value)}
                  placeholder={activeTab === 'vaccines' ? "e.g. Travel requirement" : "e.g. Normal"}
                  className="w-full bg-black/50 border border-gray-700 rounded p-2 text-white outline-none focus:border-blue-500 placeholder:text-gray-500/70"
                />
              </div>
              <button 
                onClick={handleAddRecord}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition-colors"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs - Scrollable on mobile */}
      <div className="flex border-b border-white/10 mb-6 overflow-x-auto no-scrollbar">
        {renderTabButton('vaccines', 'Immunization', <Syringe size={18} className="shrink-0" />)}
        {renderTabButton('screening', 'Screening', <Activity size={18} className="shrink-0" />)}
        {renderTabButton('lifestyle', 'Avoidance', <Heart size={18} className="shrink-0" />)}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        
        {/* Left Column: Data Input/Display */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-6">
          {activeTab === 'vaccines' && (
            <div className="bg-black/20 p-4 md:p-6 rounded-xl border border-blue-500/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg md:text-xl font-bold text-blue-300 flex items-center gap-2"><Syringe /> Your Immunizations</h3>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 text-xs bg-blue-900/50 hover:bg-blue-800 text-blue-200 px-3 py-1.5 rounded-full border border-blue-500/30 transition-all"
                >
                  <Plus size={14}/> Add
                </button>
              </div>
              <ul className="space-y-3">
                {vaccines.map(v => (
                  <li key={v.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-center border border-white/10">
                    <div>
                      <p className="font-semibold text-white">{v.name}</p>
                      <p className="text-sm text-gray-400">{v.notes}</p>
                    </div>
                    <span className="text-sm font-mono text-blue-300">{v.date}</span>
                  </li>
                ))}
                {doctorRecords.filter(r => r.type === 'VACCINE').map(r => (
                  <li key={r.id} className="bg-blue-900/20 p-3 rounded-lg flex justify-between items-center border border-blue-500/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{r.procedureName}</p>
                        <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded uppercase">Verified</span>
                      </div>
                      <p className="text-sm text-gray-400">{r.results}</p>
                    </div>
                    <span className="text-sm font-mono text-blue-300">{r.procedureDate}</span>
                  </li>
                ))}
                {vaccines.length === 0 && doctorRecords.filter(r => r.type === 'VACCINE').length === 0 && (
                  <div className="text-sm text-gray-400 p-4 border border-dashed border-gray-700 rounded-lg text-center">
                    <p className="mb-2">No immunizations recorded yet.</p>
                    <p className="text-gray-500 text-xs">Suggestions to add: COVID-19 mRNA, Influenza (Annual shot), Tetanus booster.</p>
                  </div>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'screening' && (
            <div className="bg-black/20 p-4 md:p-6 rounded-xl border border-blue-500/20">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg md:text-xl font-bold text-blue-300 flex items-center gap-2"><Activity /> Screening History</h3>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1 text-xs bg-blue-900/50 hover:bg-blue-800 text-blue-200 px-3 py-1.5 rounded-full border border-blue-500/30 transition-all"
                  >
                    <Plus size={14}/> Add
                  </button>
               </div>
              <ul className="space-y-3">
                {screenings.map(s => (
                  <li key={s.id} className="bg-white/5 p-3 rounded-lg flex justify-between items-center border border-white/10">
                    <div>
                      <p className="font-semibold text-white">{s.name}</p>
                      <p className="text-sm text-green-400">Result: {s.result}</p>
                    </div>
                    <span className="text-sm font-mono text-blue-300">{s.date}</span>
                  </li>
                ))}
                {doctorRecords.filter(r => r.type === 'SCREENING' || r.type === 'TEST').map(r => (
                  <li key={r.id} className="bg-blue-900/20 p-3 rounded-lg flex justify-between items-center border border-blue-500/30">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white">{r.procedureName}</p>
                        <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded uppercase">Verified</span>
                      </div>
                      <p className="text-sm text-green-400">Result: {r.results}</p>
                    </div>
                    <span className="text-sm font-mono text-blue-300">{r.procedureDate}</span>
                  </li>
                ))}
                {screenings.length === 0 && doctorRecords.filter(r => r.type === 'SCREENING' || r.type === 'TEST').length === 0 && (
                  <div className="text-sm text-gray-400 p-4 border border-dashed border-gray-700 rounded-lg text-center">
                    <p className="mb-2">No screenings recorded yet.</p>
                    <p className="text-gray-500 text-xs">Suggestions to add: Blood Pressure Check, Lipid Panel, Blood Sugar Test.</p>
                  </div>
                )}
              </ul>
            </div>
          )}

          {activeTab === 'lifestyle' && (
             <div className="bg-black/20 p-4 md:p-6 rounded-xl border border-blue-500/20">
               <h3 className="text-lg md:text-xl font-bold text-blue-300 mb-4 flex items-center gap-2"><Heart /> Current Lifestyle Snapshot</h3>
               <div className="space-y-2 text-gray-300">
                  <p><strong className="text-blue-200">Diet:</strong> {userProfile.diet || 'Not specified'}</p>
                  <p><strong className="text-blue-200">Activity:</strong> {userProfile.activity || 'Not specified'}</p>
                  <p><strong className="text-blue-200">Substance Use:</strong> {userProfile.substanceUse || 'Not specified'}</p>
               </div>
             </div>
          )}
        </div>

        {/* Right Column: AI Insights */}
        <div className="flex flex-col h-full overflow-hidden min-h-[300px]">
           <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-400/30 rounded-xl p-4 md:p-6 flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <Shield size={120} />
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                 <Sparkles className="text-yellow-400 animate-pulse" /> 
                 AI Recommendations
              </h3>
              <p className="text-sm text-blue-200 mb-4 md:mb-6">
                Personalized guidance for {userProfile.name} based on current data.
              </p>

              <div className="flex-1 overflow-y-auto bg-black/30 rounded-lg p-4 font-light text-gray-200 border border-white/5 shadow-inner custom-markdown">
                {loading ? (
                   <div className="flex items-center justify-center h-full space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                   </div>
                ) : recommendation ? (
                  <div className="markdown-content text-sm leading-relaxed">
                    <ReactMarkdown>{recommendation}</ReactMarkdown>
                    <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg text-xs text-blue-200/80 italic">
                      This suggestion is educational and based on the information in your profile. It is not a medical diagnosis. If you feel unwell or are unsure, please consult your clinician or visit a health facility promptly.
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 py-10">
                    <p className="text-center">Ready to analyze your data.</p>
                    <button 
                      onClick={() => fetchAdvice(activeTab === 'vaccines' ? 'vaccine' : activeTab === 'screening' ? 'screening' : 'lifestyle')}
                      className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors shadow-lg shadow-blue-500/30"
                    >
                      Generate Insights
                    </button>
                  </div>
                )}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PreventionDashboard;