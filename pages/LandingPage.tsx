import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="relative pt-20 overflow-hidden min-h-screen bg-[#020617]">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">NIT Agartala Official Club Portal</span>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
            WHERE PASSION <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-500 bg-clip-text text-transparent italic">
              MEETS PURPOSE.
            </span>
          </h1>
          
          <p className="max-w-2xl text-xl text-slate-400 mb-14 leading-relaxed font-medium">
            Discover NITA's most vibrant student communities. From elite coding labs to historic cultural ensembles, find the space where you belong.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={onGetStarted}
              className="group relative w-full sm:w-auto px-10 py-5 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center">
                Explore The Sphere
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 text-lg font-bold text-slate-300 bg-slate-800/40 hover:bg-slate-800 hover:text-white rounded-2xl border border-slate-700 transition-all">
              Platform Features
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-slate-800/50 pt-16">
          {[
            { label: 'Active Clubs', value: '20+' },
            { label: 'Students', value: '5K+' },
            { label: 'Annual Events', value: '100+' },
            { label: 'Years of Legacy', value: '50+' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;