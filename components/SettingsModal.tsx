import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserProfile, Recommendation, ProcedureRecord } from '../types';
import { Bell, BellOff, X, CheckSquare, Square, Trash2, AlertTriangle, ChevronDown, ChevronUp, Check, XCircle, MinusCircle } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

interface Props {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ userProfile, onUpdateProfile, onClose }) => {
  const [activeTab, setActiveTab] = useState<'RECOMMENDATIONS' | 'PROCEDURES' | 'ACCOUNT'>('RECOMMENDATIONS');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [procedures, setProcedures] = useState<ProcedureRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Procedure Interaction State
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(null);
  const [procedureAction, setProcedureAction] = useState<'undertaken' | 'not_undertaken' | 'prefer_not_to_say' | null>(null);
  const [procedureResults, setProcedureResults] = useState('');
  const [submittingProc, setSubmittingProc] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;
      setLoading(true);
      try {
        // Fetch recommendations
        const recsQuery = query(collection(db, 'recommendations'), where('userId', '==', auth.currentUser.uid));
        const recsSnapshot = await getDocs(recsQuery);
        const recsData = recsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recommendation));
        
        // Filter out expired recommendations
        const now = new Date();
        const validRecs = [];
        for (const rec of recsData) {
          if (new Date(rec.expiresAt) < now) {
            await deleteDoc(doc(db, 'recommendations', rec.id));
          } else {
            validRecs.push(rec);
          }
        }
        setRecommendations(validRecs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

        // Fetch procedures
        const procQuery = query(collection(db, 'procedures'), where('userId', '==', auth.currentUser.uid));
        const procSnapshot = await getDocs(procQuery);
        const procData = procSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProcedureRecord));
        setProcedures(procData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

      } catch (error) {
        console.error("Error fetching settings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePushNotifications = async () => {
    const newValue = !userProfile.pushNotificationsEnabled;
    const updatedProfile = { ...userProfile, pushNotificationsEnabled: newValue };
    onUpdateProfile(updatedProfile);
    
    if (newValue) {
      if ('Notification' in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            new Notification('CareLens', {
              body: 'Push notifications enabled successfully!',
              icon: '/favicon.ico'
            });
          } else {
            onUpdateProfile({ ...userProfile, pushNotificationsEnabled: false });
            alert('Please allow notifications in your browser settings.');
          }
        } catch (error) {
          console.warn('Notifications permission request failed, likely due to iframe restrictions:', error);
          // Keep it enabled in profile anyway for demo purposes, or revert it.
          // We'll keep it enabled so the UI toggles.
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;
    setDeleting(true);
    try {
      const uid = auth.currentUser.uid;
      
      // Delete subcollections
      const subcollections = ['medicalRecords', 'preventionData', 'analysisData', 'managementData'];
      for (const sub of subcollections) {
        const subQuery = query(collection(db, 'users', uid, sub));
        const subSnapshot = await getDocs(subQuery);
        for (const docSnap of subSnapshot.docs) {
          await deleteDoc(doc(db, 'users', uid, sub, docSnap.id));
        }
      }

      // Delete user document
      await deleteDoc(doc(db, 'users', uid));
      
      // Delete recommendations
      const recsQuery = query(collection(db, 'recommendations'), where('userId', '==', uid));
      const recsSnapshot = await getDocs(recsQuery);
      for (const docSnap of recsSnapshot.docs) {
        await deleteDoc(doc(db, 'recommendations', docSnap.id));
      }
      
      // Delete procedures
      const procQuery = query(collection(db, 'procedures'), where('userId', '==', uid));
      const procSnapshot = await getDocs(procQuery);
      for (const docSnap of procSnapshot.docs) {
        await deleteDoc(doc(db, 'procedures', docSnap.id));
      }
      
      // Delete auth user
      await deleteUser(auth.currentUser);
      
      // Close modal, app will redirect to login due to auth state change
      onClose();
    } catch (error: any) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. You may need to sign in again before performing this action. " + error.message);
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  const handleProcedureActionSelection = async (proc: ProcedureRecord, action: 'undertaken' | 'not_undertaken' | 'prefer_not_to_say') => {
    if (!auth.currentUser) return;
    setSubmittingProc(true);
    
    if (action === 'not_undertaken' || action === 'prefer_not_to_say') {
      try {
        await deleteDoc(doc(db, 'procedures', proc.id));
        setProcedures(procedures.filter(p => p.id !== proc.id));
        setSelectedProcedureId(null);
        setProcedureAction(null);
      } catch (err) {
        console.error("Error deleting procedure", err);
      }
    } else if (action === 'undertaken') {
      if (proc.type === 'VACCINE') {
        try {
          // Store in medical records directly
          const userMedicalRecordRef = collection(db, 'users', auth.currentUser.uid, 'medicalRecords');
          await addDoc(userMedicalRecordRef, {
            procedureName: proc.name,
            type: proc.type,
            results: "Completed",
            procedureDate: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
          });
          // Delete from recommended procedures
          await deleteDoc(doc(db, 'procedures', proc.id));
          setProcedures(procedures.filter(p => p.id !== proc.id));
          setSelectedProcedureId(null);
          setProcedureAction(null);
        } catch (err) {
          console.error("Error moving vaccine", err);
        }
      } else {
        // Test or Screening: need user to input findings
        setProcedureAction('undertaken');
      }
    }
    setSubmittingProc(false);
  };

  const handleProcedureResultsSubmit = async (proc: ProcedureRecord) => {
    if (!auth.currentUser || !procedureResults.trim()) return;
    setSubmittingProc(true);
    try {
      const userMedicalRecordRef = collection(db, 'users', auth.currentUser.uid, 'medicalRecords');
      await addDoc(userMedicalRecordRef, {
        procedureName: proc.name,
        type: proc.type,
        results: procedureResults,
        procedureDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      });
      await deleteDoc(doc(db, 'procedures', proc.id));
      setProcedures(procedures.filter(p => p.id !== proc.id));
      setSelectedProcedureId(null);
      setProcedureAction(null);
      setProcedureResults('');
    } catch (err) {
      console.error("Error saving procedure results", err);
    }
    setSubmittingProc(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0B1026] border border-cyan-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 bg-black/40">
          <h2 className="text-2xl font-bold text-cyan-400">Settings & History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Push Notifications Toggle */}
          <section className="bg-black/30 p-6 rounded-xl border border-cyan-500/10 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {userProfile.pushNotificationsEnabled ? <Bell className="text-cyan-400" size={20} /> : <BellOff className="text-gray-500" size={20} />}
                Push Notifications
              </h3>
              <p className="text-sm text-gray-400 mt-1">Receive short nudges and reminders for preventive actions, tests, and habits.</p>
            </div>
            <button 
              onClick={togglePushNotifications}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${userProfile.pushNotificationsEnabled ? 'bg-cyan-500' : 'bg-gray-600'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${userProfile.pushNotificationsEnabled ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
          </section>

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-cyan-500/20 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('RECOMMENDATIONS')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'RECOMMENDATIONS' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Recommendations
            </button>
            <button 
              onClick={() => setActiveTab('PROCEDURES')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'PROCEDURES' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Recommended Procedures
            </button>
            <button 
              onClick={() => setActiveTab('ACCOUNT')}
              className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'ACCOUNT' ? 'border-red-400 text-red-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Account Management
            </button>
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 'RECOMMENDATIONS' && (
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm p-3 rounded-lg flex items-center gap-2">
                    <Trash2 size={16} className="text-blue-400" />
                    Recommendations are only stored and displayed for 7 days, after which they are automatically deleted to make room for more.
                  </div>
                  
                  {['PREVENTION', 'MANAGEMENT', 'ANALYSIS'].map(category => {
                    const categoryRecs = recommendations.filter(r => r.category === category);
                    if (categoryRecs.length === 0) return null;
                    return (
                      <div key={category} className="space-y-3 mt-6">
                        <h4 className="text-lg font-semibold text-cyan-300 capitalize border-b border-cyan-500/20 pb-2">
                          {category.toLowerCase()}
                        </h4>
                        {categoryRecs.map(rec => (
                          <div key={rec.id} className="bg-black/40 p-4 rounded-lg border border-gray-800">
                            <p className="text-xs text-gray-500 mb-2">{new Date(rec.createdAt).toLocaleString()}</p>
                            <div className="text-sm text-gray-200 markdown-content">
                              <ReactMarkdown>{rec.text}</ReactMarkdown>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  {recommendations.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No recent recommendations found.</p>
                  )}
                </div>
              )}

              {activeTab === 'PROCEDURES' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 mb-4">Click on any recommended screening, test, or vaccine to update its status. Addressed procedures will be moved to your health records or deleted.</p>
                  
                  <div className="grid gap-3">
                    {procedures.map(proc => (
                      <div key={proc.id} className="bg-black/40 rounded-lg border border-gray-800 overflow-hidden transition-all">
                        <div 
                          className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                          onClick={() => {
                            if (selectedProcedureId === proc.id) {
                              setSelectedProcedureId(null);
                              setProcedureAction(null);
                            } else {
                              setSelectedProcedureId(proc.id);
                              setProcedureAction(null);
                            }
                          }}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold px-2 py-1 rounded bg-gray-800 text-gray-300">{proc.type}</span>
                            </div>
                            <h4 className="text-base font-medium text-white mt-1">{proc.name}</h4>
                            <p className="text-sm text-cyan-200/70 mt-1">Facility: {proc.facility}</p>
                          </div>
                          <div className="text-xs text-gray-500 text-right flex flex-col items-end gap-2">
                            {new Date(proc.createdAt).toLocaleDateString()}
                            {selectedProcedureId === proc.id ? <ChevronUp size={16} className="text-cyan-400" /> : <ChevronDown size={16} className="text-gray-500" />}
                          </div>
                        </div>

                        {selectedProcedureId === proc.id && (
                          <div className="p-4 border-t border-gray-800 bg-black/60">
                            {!procedureAction && (
                              <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                  onClick={() => handleProcedureActionSelection(proc, 'undertaken')}
                                  disabled={submittingProc}
                                  className="flex-1 py-2 px-3 bg-green-900/30 hover:bg-green-900/50 text-green-400 border border-green-500/30 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                  <Check size={16} /> Undertaken
                                </button>
                                <button 
                                  onClick={() => handleProcedureActionSelection(proc, 'not_undertaken')}
                                  disabled={submittingProc}
                                  className="flex-1 py-2 px-3 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                  <XCircle size={16} /> Not Undertaken
                                </button>
                                <button 
                                  onClick={() => handleProcedureActionSelection(proc, 'prefer_not_to_say')}
                                  disabled={submittingProc}
                                  className="flex-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                                >
                                  <MinusCircle size={16} /> Prefer not to say
                                </button>
                              </div>
                            )}

                            {procedureAction === 'undertaken' && (
                              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-sm text-cyan-200">Please provide the findings, results, and feedback obtained from this {proc.type.toLowerCase()}:</p>
                                <textarea
                                  value={procedureResults}
                                  onChange={(e) => setProcedureResults(e.target.value)}
                                  className="w-full bg-black/50 border border-cyan-500/30 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 min-h-[100px] text-sm"
                                  placeholder="Enter results here..."
                                />
                                <div className="flex gap-3 justify-end">
                                  <button 
                                    onClick={() => setProcedureAction(null)}
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    onClick={() => handleProcedureResultsSubmit(proc)}
                                    disabled={!procedureResults.trim() || submittingProc}
                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                                  >
                                    {submittingProc ? 'Saving...' : 'Save & Move to Records'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {procedures.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No recommended procedures found.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'ACCOUNT' && (
                <div className="space-y-6">
                  <div className="bg-black/40 p-6 rounded-xl border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-2">View & Correct Data</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      You can view and correct your personal information, health profile, and lifestyle habits directly from the main dashboard by clicking on the "Edit Profile" button.
                    </p>
                  </div>

                  <div className="bg-red-900/10 p-6 rounded-xl border border-red-500/30">
                    <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2 mb-2">
                      <AlertTriangle size={20} />
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-300 mb-6">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    
                    {!deleteConfirm ? (
                      <button 
                        onClick={() => setDeleteConfirm(true)}
                        className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/50 rounded-lg font-medium transition-colors"
                      >
                        Delete Account
                      </button>
                    ) : (
                      <div className="bg-black/60 p-4 rounded-lg border border-red-500">
                        <p className="text-sm text-red-300 mb-4 font-medium">
                          Are you absolutely sure you want to delete your account? 
                          This will permanently erase all your data, including health records, symptom logs, and recommendations from our system. 
                          This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => setDeleteConfirm(false)}
                            disabled={deleting}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                          >
                            {deleting ? 'Deleting...' : <><Trash2 size={16} /> Yes, Delete My Account</>}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
