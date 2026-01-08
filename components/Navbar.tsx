
import React from 'react';

interface NavbarProps {
  userEnrollment?: string;
  onLogout: () => void;
  onNavigate: (page: 'landing' | 'login' | 'dashboard' | 'apply' | 'admin') => void;
}

const Navbar: React.FC<NavbarProps> = ({ userEnrollment, onLogout, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl group-hover:scale-105 transition-transform">CS</div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase hidden sm:block">
              ClubSphere
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <button onClick={() => onNavigate('landing')} className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('dashboard')} className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Explore</button>
          </div>

          <div className="flex items-center space-x-6">
            {userEnrollment ? (
              <div className="flex items-center space-x-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Student Access</span>
                  <span className="text-sm font-bold text-indigo-400">{userEnrollment}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-slate-800 hover:bg-red-500/20 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-xl transition-all"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="px-8 py-3 text-xs font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
