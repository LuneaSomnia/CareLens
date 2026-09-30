import React, { useState, useEffect } from 'react';
import CrystalNode from './CrystalNode';
import GlassModal from './GlassModal';
import UserProfileComponent from './UserProfile';
import PreventionDashboard from './PreventionDashboard';
import AnalysisRisk from './AnalysisRisk';
import ManagementCare from './ManagementCare';
import SettingsModal from './SettingsModal';
import NotificationManager from './NotificationManager';
import Background from './Background';
import AuthComponent from './AuthComponent';
import { UserProfile, ViewState } from '../types';
import { auth, db, loginWithGoogle, logout } from '../firebase';
import { doc, getDoc, setDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { Settings, LogOut, LogIn } from 'lucide-react';

const INITIAL_PROFILE: UserProfile = {
  name: "",
  age: "",
  gender: "",
  email: "",
  location: "",
  conditions: "",
  allergies: "",
  medications: "",
  familyHistory: "",
  organDonor: false,
  diet: "",
  activity: "",
  sleep: "",
  substanceUse: "",
  pushNotificationsEnabled: false
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [unaddressedProceduresCount, setUnaddressedProceduresCount] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        } else {
          const newProfile = { ...INITIAL_PROFILE, name: currentUser.displayName || '', email: currentUser.email || '', uid: currentUser.uid };
          await setDoc(docRef, newProfile);
          setUserProfile(newProfile);
        }
      } else {
        setUserProfile(INITIAL_PROFILE);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'procedures'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setUnaddressedProceduresCount(snapshot.docs.length);
      });
      return () => unsubscribe();
    } else {
      setUnaddressedProceduresCount(0);
    }
  }, [user]);

  const handleUpdateProfile = async (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    if (user) {
      await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
    }
  };

  const closeModal = () => setView(ViewState.HOME);

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-[#050505] text-cyan-400">Loading CareLens...</div>;
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#050505] text-white relative">
        <Background />
        <div className="relative z-10 flex flex-col items-center justify-center bg-black/40 p-12 rounded-3xl border border-cyan-500/30 backdrop-blur-md w-full max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#2D5BFF] to-[#FF0099] drop-shadow-[0_0_25px_rgba(45,91,255,0.8)] uppercase mb-8">
            CareLens
          </h1>
          <p className="text-cyan-100/70 tracking-[0.15em] mb-12 uppercase text-sm font-semibold text-center">
            Your health, clearly in focus!🔍
          </p>
          
          <AuthComponent onSuccess={() => {}} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
      
      {/* Top Navigation / Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <button 
          onClick={() => setShowSettings(true)}
          className="relative p-3 bg-black/40 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-900/40 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          title="Settings"
        >
          ⚙️
          {unaddressedProceduresCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              {unaddressedProceduresCount}
            </span>
          )}
        </button>
        <button 
          onClick={logout}
          className="p-3 bg-black/40 border border-red-500/30 rounded-full text-red-400 hover:bg-red-900/40 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>

      <Background />

      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center transition-all duration-500 overflow-y-auto md:overflow-hidden ${view !== ViewState.HOME ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'}`}>
        
        <div className="flex flex-col items-center mb-8 md:mb-16 lg:mb-24 z-20 px-4 text-center mt-10 md:mt-0">
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] md:tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#00FF94] via-[#2D5BFF] to-[#FF0099] drop-shadow-[0_0_25px_rgba(45,91,255,0.8)] uppercase leading-tight">
            CareLens
          </h1>
          <p className="text-cyan-100/70 tracking-[0.15em] md:tracking-[0.2em] mt-4 uppercase text-xs md:text-sm font-semibold border-b border-cyan-500/30 pb-2">
            Your health, clearly in focus!🔍
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-20 w-full max-w-7xl px-4 z-20 pb-10 md:pb-0">
          <CrystalNode 
            icon="👤" 
            label="User Profile" 
            colorClass="text-cyan-300" 
            glowClass="animate-[pulse-glow-cyan_4s_infinite]"
            gradientClass="bg-gradient-to-br from-cyan-400/40 to-blue-600/40 border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            onClick={() => setView(ViewState.PROFILE)}
          />
          <CrystalNode 
            icon="🛡️" 
            label="Prevention" 
            colorClass="text-indigo-200"
            glowClass="animate-[pulse-glow-blue_5s_infinite]"
            gradientClass="bg-gradient-to-br from-[#2D5BFF]/40 to-[#8C52FF]/40 border-2 border-[#2D5BFF] shadow-[0_0_30px_rgba(45,91,255,0.4)]"
            onClick={() => setView(ViewState.PREVENTION)}
            delay="0.3s"
          />
          <CrystalNode 
            icon="🪴" 
            label="Management" 
            colorClass="text-teal-200"
            glowClass="animate-[pulse-glow-green_7s_infinite]"
            gradientClass="bg-gradient-to-br from-[#00FF94]/40 to-[#00BCD4]/40 border-2 border-[#00FF94] shadow-[0_0_30px_rgba(0,255,148,0.4)]"
            onClick={() => setView(ViewState.MANAGEMENT)}
            delay="0.6s"
          />
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

      {view === ViewState.PROFILE && (
        <GlassModal title="User Profile" onClose={closeModal} borderColorClass="border-cyan-400/30 shadow-cyan-500/20">
          <UserProfileComponent data={userProfile} onChange={handleUpdateProfile} />
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

      {showSettings && (
        <SettingsModal 
          userProfile={userProfile} 
          onUpdateProfile={handleUpdateProfile} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      <NotificationManager userProfile={userProfile} />
    </div>
  );
};

export default App;