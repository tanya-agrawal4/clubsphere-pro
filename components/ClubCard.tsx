
import React from 'react';
import { Club } from '../types';

interface ClubCardProps {
  club: Club;
  onApply: () => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ club, onApply }) => {
  // Check global status from localStorage (simulating dynamic check)
  const statusRaw = localStorage.getItem('clubsphere_club_status');
  const statusMap = statusRaw ? JSON.parse(statusRaw) : {};
  const isOpen = statusMap[club.id] !== false; // Default to true

  return (
    <div className="group relative h-full flex flex-col bg-slate-900/40 border border-slate-800/60 hover:border-indigo-500/50 rounded-[2rem] p-7 transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl shadow-xl hover:shadow-indigo-500/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
      
      <div className="flex items-start justify-between mb-8">
        <div className="relative w-20 h-20 rounded-2xl bg-white/5 p-3 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/40 group-hover:bg-white/10 transition-all duration-500 overflow-hidden">
          <img 
            src={club.image} 
            alt={`${club.name} logo`} 
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
            draggable={false}
          />
        </div>
        <div className="flex flex-col items-end">
          <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-2">
            {club.category}
          </span>
          <div className="flex items-center space-x-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">
              {isOpen ? 'Recruiting' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-black text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
          {club.name}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
          {club.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mt-auto pt-6 border-t border-slate-800/40">
        <button 
          onClick={onApply}
          disabled={!isOpen}
          className={`col-span-3 flex items-center justify-center py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg active:scale-95 ${
            isOpen 
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20' 
            : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          {isOpen ? 'Apply Now' : 'Closed'}
        </button>
        <a 
          href={club.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="col-span-1 flex items-center justify-center bg-slate-800 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-700 hover:border-transparent group/insta"
          title="Official Instagram"
        >
          <svg className="w-5 h-5 transition-transform group-hover/insta:scale-110" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ClubCard;
