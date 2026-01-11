import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, HealthMetric } from '../types';
import { getManagementPlan } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, ClipboardList, TrendingUp } from 'lucide-react';

interface Props {
  userProfile: UserProfile;
}

const ManagementCare: React.FC<Props> = ({ userProfile }) => {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [plan, setPlan] = useState('');
  const [loadingPlan, setLoadingPlan] = useState(false);
  
  // Parse conditions from profile string to array
  const conditionsList = userProfile.conditions 
    ? userProfile.conditions.split(',').map(c => c.trim()) 
    : ['General Wellness'];

  // Mock Health Data for Charts
  const [healthData] = useState<HealthMetric[]>([
    { date: 'Week 1', systolic: 130, diastolic: 85, heartRate: 72, weight: 70 },
    { date: 'Week 2', systolic: 128, diastolic: 82, heartRate: 70, weight: 69.5 },
    { date: 'Week 3', systolic: 125, diastolic: 80, heartRate: 68, weight: 69.2 },
    { date: 'Week 4', systolic: 122, diastolic: 78, heartRate: 65, weight: 68.8 },
  ]);

  const generatePlan = async () => {
    if(!selectedCondition) return;
    setLoadingPlan(true);
    const result = await getManagementPlan(userProfile, selectedCondition);
    setPlan(result);
    setLoadingPlan(false);
  };

  return (
    <div className="h-full flex flex-col space-y-8">
      
      {/* Top Section: Disease Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-1/2 min-h-[400px]">
        
        {/* Controls */}
        <div className="bg-black/30 border border-teal-500/30 p-5 rounded-xl col-span-1">
          <h3 className="text-xl font-bold text-teal-300 mb-4 flex items-center gap-2">
            <ClipboardList /> Condition Management
          </h3>
          <p className="text-sm text-gray-400 mb-4">Select a condition to generate a personalized care plan.</p>
          
          <div className="space-y-4">
            <select 
              className="w-full bg-black/50 border border-teal-500/50 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-400 outline-none"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">-- Select Condition --</option>
              {conditionsList.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            
            <button 
              onClick={generatePlan}
              disabled={!selectedCondition || loadingPlan}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-lg shadow-lg shadow-teal-500/20 transition-all"
            >
              {loadingPlan ? 'Generating Plan...' : 'Create Care Plan'}
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="bg-black/30 border border-teal-500/30 p-6 rounded-xl col-span-1 lg:col-span-2 overflow-y-auto">
          {plan ? (
            <div className="markdown-content text-sm leading-relaxed text-gray-200">
               <h3 className="text-teal-300 border-b border-teal-500/30 pb-2 mb-4">Care Plan: {selectedCondition}</h3>
               <ReactMarkdown>{plan}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
               <ClipboardList size={64} className="mb-4 text-teal-200" />
               <p className="text-center">Select a condition to view adaptive guidance<br/>and educational modules.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Progress Tracking */}
      <div className="flex-1 bg-black/30 border border-teal-500/30 p-5 rounded-xl flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-teal-300 flex items-center gap-2">
              <TrendingUp /> Progress Tracking
            </h3>
            <button className="text-xs bg-teal-900/50 hover:bg-teal-800 px-3 py-1 rounded text-teal-200 border border-teal-500/30">+ Input New Vitals</button>
         </div>

         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">
            {/* BP Chart */}
            <div className="bg-black/20 p-4 rounded-lg">
               <h4 className="text-sm font-semibold text-gray-300 mb-2 text-center">Blood Pressure Trend (mmHg)</h4>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={healthData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                   <XAxis dataKey="date" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} domain={[60, 160]} />
                   <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                   <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2} dot={{r:4}} name="Systolic" />
                   <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2} dot={{r:4}} name="Diastolic" />
                 </LineChart>
               </ResponsiveContainer>
            </div>

            {/* Weight/Heart Rate Chart */}
            <div className="bg-black/20 p-4 rounded-lg">
               <h4 className="text-sm font-semibold text-gray-300 mb-2 text-center">Heart Rate (BPM)</h4>
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={healthData}>
                   <defs>
                     <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                   <XAxis dataKey="date" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} domain={[40, 120]} />
                   <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                   <Area type="monotone" dataKey="heartRate" stroke="#14b8a6" fillOpacity={1} fill="url(#colorHr)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ManagementCare;