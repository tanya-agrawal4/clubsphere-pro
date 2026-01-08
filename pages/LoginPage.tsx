
import React, { useState } from 'react';

interface LoginPageProps {
  onStudentLogin: (enrollmentNo: string) => void;
  onAdminLogin: () => void;
  onNavigateBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onStudentLogin, onAdminLogin, onNavigateBack }) => {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [enrollment, setEnrollment] = useState('');
  const [adminCreds, setAdminCreds] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEnrollment = (value: string) => {
    const regex = /^[0-9]{2}[A-Z]{3}[0-9]{3}$/;
    if (!value) return "Authentication is required.";
    if (!regex.test(value.toUpperCase())) return "Invalid format (e.g. 22BCS001).";
    return "";
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEnrollment(enrollment);
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onStudentLogin(enrollment.toUpperCase());
    }, 1200);
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (adminCreds.id === 'admin_nita' && adminCreds.password === 'nita_hq_2024') {
        onAdminLogin();
      } else {
        setError('Unauthorized access credentials.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="max-w-lg w-full">
        {/* Branding */}
        <div 
          className="flex items-center justify-center space-x-3 mb-10 cursor-pointer group"
          onClick={onNavigateBack}
        >
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl group-hover:rotate-6 transition-transform">CS</div>
          <span className="text-3xl font-black text-white tracking-tighter uppercase">ClubSphere</span>
        </div>

        {/* Role Switcher */}
        <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 mb-8 w-full max-w-[320px] mx-auto backdrop-blur-xl">
          <button 
            onClick={() => { setRole('student'); setError(''); }}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'student' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
          >
            Student
          </button>
          <button 
            onClick={() => { setRole('admin'); setError(''); }}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'admin' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-500 hover:text-white'}`}
          >
            Admin
          </button>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-10 md:p-14 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] ${role === 'student' ? 'bg-indigo-500/10' : 'bg-rose-500/10'}`}></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-2 leading-tight">
              {role === 'student' ? 'Student Portal' : 'Authority Terminal'}
            </h2>
            <p className="text-slate-400 font-medium mb-10">
              {role === 'student' ? 'Use your enrollment to access the hub.' : 'Level 04 Restricted Administrative Area.'}
            </p>

            {role === 'student' ? (
              <form onSubmit={handleStudentSubmit} className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Enrollment Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 22BCS001"
                    value={enrollment}
                    onChange={(e) => { setEnrollment(e.target.value); setError(''); }}
                    className={`w-full px-6 py-5 bg-slate-950/50 border ${error ? 'border-red-500' : 'border-slate-800'} rounded-2xl text-white font-bold placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30"
                >
                  {loading ? 'Verifying...' : 'Access Hub'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Authority ID</label>
                  <input
                    type="text"
                    placeholder="Staff Identifier"
                    value={adminCreds.id}
                    onChange={(e) => setAdminCreds({...adminCreds, id: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white font-bold placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Secure Passkey</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={adminCreds.password}
                    onChange={(e) => setAdminCreds({...adminCreds, password: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white font-bold placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-xl shadow-rose-600/30"
                >
                  {loading ? 'Authorizing...' : 'Terminal Access'}
                </button>
              </form>
            )}

            {error && (
              <p className="mt-6 text-[10px] font-black text-red-400 uppercase tracking-widest text-center animate-bounce">
                {error}
              </p>
            )}
          </div>
        </div>

        <button 
          onClick={onNavigateBack}
          className="mt-10 w-full text-center text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          Return to home
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
