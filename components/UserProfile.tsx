import React from 'react';
import { UserProfile } from '../types';
import { Save } from 'lucide-react';

interface Props {
  data: UserProfile;
  onChange: (data: UserProfile) => void;
}

const InputGroup = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-cyan-200">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600"
    />
  </div>
);

const TextAreaGroup = ({ label, value, onChange, placeholder = "" }: any) => (
  <div className="flex flex-col space-y-1 md:col-span-2">
    <label className="text-sm font-medium text-cyan-200">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-gray-600 resize-none"
    />
  </div>
);

const UserProfileComponent: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (key: keyof UserProfile, value: any) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-8">
      {/* Basic Info */}
      <section>
        <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-cyan-900/50 pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Full Name" value={data.name} onChange={(v: string) => handleChange('name', v)} />
          <InputGroup label="Age / DOB" value={data.age} onChange={(v: string) => handleChange('age', v)} />
          <InputGroup label="Gender" value={data.gender} onChange={(v: string) => handleChange('gender', v)} />
          <InputGroup label="Location" value={data.location} onChange={(v: string) => handleChange('location', v)} />
          <InputGroup label="Email" value={data.email} onChange={(v: string) => handleChange('email', v)} type="email" />
        </div>
      </section>

      {/* Health Background */}
      <section>
        <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-cyan-900/50 pb-2">Health Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextAreaGroup label="Current Conditions" value={data.conditions} onChange={(v: string) => handleChange('conditions', v)} placeholder="e.g. Hypertension, Asthma..." />
          <TextAreaGroup label="Allergies" value={data.allergies} onChange={(v: string) => handleChange('allergies', v)} placeholder="e.g. Peanuts, Penicillin..." />
          <TextAreaGroup label="Current Medications" value={data.medications} onChange={(v: string) => handleChange('medications', v)} />
          <TextAreaGroup label="Family History" value={data.familyHistory} onChange={(v: string) => handleChange('familyHistory', v)} placeholder="e.g. Father had diabetes..." />
          
          <div className="flex items-center space-x-3 mt-4">
             <input 
                type="checkbox" 
                checked={data.organDonor} 
                onChange={(e) => handleChange('organDonor', e.target.checked)}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
             />
             <label className="text-cyan-100">I am an Organ Donor</label>
          </div>
        </div>
      </section>

      {/* Lifestyle Data */}
      <section>
        <h3 className="text-xl font-bold text-cyan-400 mb-4 border-b border-cyan-900/50 pb-2">Lifestyle Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="Dietary Preference" value={data.diet} onChange={(v: string) => handleChange('diet', v)} placeholder="e.g. Vegan, Keto, No restrictions" />
          <InputGroup label="Physical Activity (Weekly)" value={data.activity} onChange={(v: string) => handleChange('activity', v)} placeholder="e.g. Gym 3x/week, Jogging 20mins/day" />
          <InputGroup label="Sleep Patterns" value={data.sleep} onChange={(v: string) => handleChange('sleep', v)} placeholder="e.g. 6-7 hours average" />
          <InputGroup label="Substance Use" value={data.substanceUse} onChange={(v: string) => handleChange('substanceUse', v)} placeholder="e.g. Social drinker, Non-smoker" />
        </div>
      </section>

      <div className="flex justify-end pt-6">
        <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105">
          <Save size={20} />
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileComponent;
