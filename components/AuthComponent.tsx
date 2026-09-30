import React, { useState } from 'react';
import { loginWithGoogle } from '../firebase';
import { LogIn, UserPlus } from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const AuthComponent: React.FC<Props> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // T&C states
  const [showTerms, setShowTerms] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleGoogleAuth = async () => {
    setError('');
    
    if (!isLogin && !agreed) {
      setShowTerms(true);
      return;
    }

    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeAndSignup = async () => {
    if (!agreed) return;
    setShowTerms(false);
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {!showTerms ? (
        <div className="flex flex-col gap-4">
          {error && <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>}
          
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {loading ? 'Processing...' : isLogin ? <><LogIn size={20} /> Sign in with Google</> : <><UserPlus size={20} /> Sign up with Google</>}
          </button>
          
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-cyan-400 hover:text-cyan-300 text-sm mt-2"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      ) : (
        <div className="bg-black/60 border border-cyan-500/50 p-6 rounded-xl text-left max-h-[60vh] overflow-y-auto flex flex-col">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">CareLens — Terms & Conditions</h2>
          <div className="text-sm text-gray-300 space-y-3 mb-6 flex-1 overflow-y-auto pr-2">
            <p>Please read carefully. By creating an account and using CareLens you agree to these terms.</p>
            <p>CareLens is a preventive-health decision-support and education platform. Our goal is to help you track vaccinations, screenings, symptoms, and give personalized suggestions to help you stay healthy. By tapping “I Agree”, you confirm that you are 18 years old, that you shall provide accurate information, and that you consent to CareLens collecting and processing your health data as described below for delivering the service and for evaluation of the program.</p>
            <p>CareLens provides personalized information, recommendations, and decision-support only. It is not a diagnostic tool and does not replace professional medical advice or emergency care. If you have an urgent medical concern, seek immediate professional help.</p>
            <p>We collect and store; Basic identity & contact: name, date of birth, phone number, email. Health profile: medical conditions, allergies, medications, immunization history, family history. Lifestyle & habits: diet preferences, activity levels, smoking/substance use. Symptoms & user-entered logs: symptom diary entries you submit. Clinical records submitted by clinicians: test results, screening results, procedure reports.</p>
            <p>We collect and process this data in order to provide personalized preventive insights, reminders and referral recommendations. Individuals who can see the data include; CareLens staff & clinicians involved in your care (on a need-to-know basis), Our independent verification partners (e.g., IPA) for the purpose of verifying preventive actions — only minimal, necessary evidence will be shared with them.</p>
            <p>You can view, correct, and delete your account and data via settings. We encrypt data in transit and at rest and use industry standard measures to protect your information. CareLens provides information and support but cannot guarantee specific health outcomes. To the maximum extent permitted by law, CareLens and its staff are not liable for any damages arising from use of the service. You agree to seek healthcare providers for diagnosis and emergencies.</p>
            <p>By tapping “I Agree” you confirm you understand these terms and are in agreement with them.</p>
          </div>
          
          <div className="flex items-center gap-3 mb-6 pt-4 border-t border-cyan-500/30">
            <input 
              type="checkbox" 
              id="agree" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 accent-cyan-500 cursor-pointer"
            />
            <label htmlFor="agree" className="text-sm text-cyan-100 cursor-pointer">I have read and agree to the Terms & Conditions</label>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowTerms(false)}
              className="flex-1 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAgreeAndSignup}
              disabled={!agreed || loading}
              className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              {loading ? 'Creating...' : 'I Agree & Sign Up'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
