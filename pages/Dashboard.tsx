
import React, { useState, useMemo } from 'react';
import { CLUBS } from '../constants';
import { ClubCategory } from '../types';
import ClubCard from '../components/ClubCard';

interface DashboardProps {
  onApply: (clubId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onApply }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ClubCategory | 'all'>('all');

  const filteredClubs = useMemo(() => {
    return CLUBS.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) ||
                          club.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || club.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const categories = ['all', ...Object.values(ClubCategory)];

  return (
    <div className="pt-32 pb-32 px-6 sm:px-12 lg:px-16 max-w-[1400px] mx-auto min-h-screen">
      <div className="mb-20">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Active Directory</span>
        </div>
        <h2 className="text-6xl font-black text-white tracking-tighter mb-6 leading-tight">Discovery Hub</h2>
        <p className="text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">
          The centralized portal for NIT Agartala's student organizations. Connect, collaborate, and catalyze your growth.
        </p>
      </div>

      <div className="sticky top-24 z-40 bg-slate-950/80 backdrop-blur-xl border border-white/5 p-6 rounded-[2.5rem] mb-16 flex flex-col lg:flex-row gap-6 items-center shadow-2xl">
        <div className="w-full lg:max-w-md">
          <div className="relative group">
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Filter by keyword or club name..."
              className="w-full pl-16 pr-8 py-5 bg-slate-950 border border-slate-800 rounded-3xl text-white font-bold focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder-slate-700 shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-7 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap border ${
                activeCategory === cat 
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} onApply={() => onApply(club.id)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 border-2 border-dashed border-slate-800/50 rounded-[4rem] bg-slate-900/10">
          <div className="w-24 h-24 bg-slate-800/40 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-slate-700">
             <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Zero Matches Found</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">We couldn't find any results for "{search}" in {activeCategory} category.</p>
          <button 
            onClick={() => {setSearch(''); setActiveCategory('all');}} 
            className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-700 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
