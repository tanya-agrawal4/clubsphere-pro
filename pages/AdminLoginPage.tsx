
import React, { useState } from 'react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onCancel }) => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Secure Verification Logic (Mocked for Demo)
    // Production would call: await api.auth.admin(credentials)
    setTimeout(() => {
      if (credentials.id === 'admin_nita' && credentials.password === 'nita_hq_2024') {
        onSuccess();
      } else {
        setError('Unauthorized access credentials.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl mx-auto mb-6 shadow-2xl shadow-rose-600/20">CS</div>
          <h2 className="text-3xl font-black text-white tracking-tight">Terminal Access</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Administrative Level 04 Restricted Area</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 px-1">Authority ID</label>
              <input 
                type="text" 
                required
                placeholder="Staff Identifier"
                className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-rose-500/50 transition-all placeholder-slate-700"
                value={credentials.id}
                onChange={(e) => setCredentials({...credentials, id: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 px-1">Secure Passkey</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-xl text-white font-bold focus:outline-none focus:border-rose-500/50 transition-all placeholder-slate-700"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg text-rose-400 text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center space-x-3"
            >
              {isLoading ? 'Verifying...' : 'Authorize Terminal'}
            </button>
            
            <button 
              type="button"
              onClick={onCancel}
              className="w-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors"
            >
              Return to Public Site
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
