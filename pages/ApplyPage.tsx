
import React, { useState, useEffect } from 'react';
import { Club, Application, ClubSettings } from '../types';

interface ApplyPageProps {
  club: Club;
  userEnrollment: string;
  onSuccess: () => void;
  onBack: () => void;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ club, userEnrollment, onSuccess, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    branch: 'CSE',
    sop: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<ClubSettings>({ isOpen: true });
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const statusRaw = localStorage.getItem('clubsphere_club_status_v2');
    const statusMap = statusRaw ? JSON.parse(statusRaw) : {};
    if (statusMap[club.id]) {
      setSettings(statusMap[club.id]);
    }

    const appsRaw = localStorage.getItem('clubsphere_applications');
    const apps: Application[] = appsRaw ? JSON.parse(appsRaw) : [];
    const existing = apps.find(a => a.clubId === club.id && a.enrollmentNo === userEnrollment);
    if (existing) {
      setAlreadyApplied(true);
    }
  }, [club.id, userEnrollment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.sop) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const appsRaw = localStorage.getItem('clubsphere_applications');
      const apps: Application[] = appsRaw ? JSON.parse(appsRaw) : [];
      
      const newApp: Application = {
        id: Math.random().toString(36).substr(2, 9),
        clubId: club.id,
        clubName: club.name,
        fullName: formData.fullName,
        enrollmentNo: userEnrollment,
        branch: formData.branch,
        sop: formData.sop,
        status: 'pending',
        timestamp: Date.now(),
        resumeName: resume?.name
      };

      localStorage.setItem('clubsphere_applications', JSON.stringify([...apps, newApp]));
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  if (!settings.isOpen) {
    return (
      <div className="min-h-screen pt-40 px-6 flex flex-col items-center bg-[#020617]">
        <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[2.5rem] max-w-xl w-full text-center backdrop-blur-xl shadow-2xl">
          <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/30">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m0-8v6m-5.121-1.121l10.242 0a2 2 0 001.414-3.414l-5.121-5.121a2 2 0 00-2.828 0l-5.121 5.121a2 2 0 00-2.828 0l-5.121 5.121a2 2 0 001.414 3.414z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Recruitment Closed</h2>
          <p className="text-slate-400 font-medium leading-relaxed mb-10 italic">
            Applications for {club.name} are currently paused. Please stay tuned for the next cycle.
          </p>
          <button onClick={onBack} className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-700 transition-all">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 lg:px-12 flex flex-col items-center bg-[#020617]">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Detailed Club Portfolio */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
            <div className="w-24 h-24 bg-white/5 p-5 rounded-3xl border border-white/10 flex items-center justify-center mb-8">
              <img src={club.image} alt={club.name} className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-4 leading-tight">{club.name}</h2>
            <div className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
              {club.category}
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 pb-2">About the Club</h4>
               <p className="text-slate-400 text-sm leading-relaxed font-medium">
                 {club.longDescription}
               </p>
               <a 
                 href={club.instagram} 
                 target="_blank" 
                 className="flex items-center space-x-3 text-indigo-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
               >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 <span>Follow on Instagram</span>
               </a>
            </div>
          </div>

          {/* Official Broadacst Notice */}
          {settings.noticePdfName && (
            <div className="bg-indigo-600/10 border-2 border-indigo-500/30 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                 <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3 flex items-center space-x-2">
                   <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                   <span>Important Notice</span>
                 </h4>
                 <p className="text-xs text-indigo-300 font-bold mb-6 leading-relaxed">
                   The admin has uploaded <span className="text-white">"{settings.noticePdfName}"</span>. Please review this before finalizing your application.
                 </p>
                 <button 
                   onClick={() => alert(`Reviewing: ${settings.noticePdfName}`)}
                   className="w-full py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-95"
                 >
                   Open Official PDF
                 </button>
               </div>
            </div>
          )}
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-2">
          {alreadyApplied ? (
            <div className="bg-slate-900/40 border border-emerald-500/20 p-12 rounded-[3rem] text-center backdrop-blur-xl h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/30 text-emerald-400">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Application Logged</h3>
              <p className="text-slate-400 font-medium mb-10">You've successfully applied to {club.name}. The recruitment cell will review your profile shortly.</p>
              <button onClick={onBack} className="px-10 py-4 bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/30 border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-2xl shadow-2xl">
              <div className="mb-12">
                <h3 className="text-2xl font-black text-white mb-2">Member Onboarding: {club.name}</h3>
                <p className="text-slate-500 text-sm font-medium">Step 01: Profile Submission</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">Full Identity</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Legal full name"
                      className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all placeholder-slate-800"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">Enrollment (ReadOnly)</label>
                    <input 
                      type="text" 
                      disabled
                      className="w-full px-6 py-4 bg-slate-950/20 border border-slate-800 rounded-2xl text-slate-500 font-bold cursor-not-allowed"
                      value={userEnrollment}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">Department</label>
                  <select 
                    className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  >
                    {['CSE', 'ECE', 'EE', 'ME', 'CE', 'EIE', 'CH', 'BT', 'PE'].map(b => (
                      <option key={b} value={b} className="bg-slate-900">{b} Department</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">Statement of Purpose</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Why are you a good fit for this club? Mention your skills and motivation."
                    className="w-full px-6 py-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white font-bold focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                    value={formData.sop}
                    onChange={(e) => setFormData({...formData, sop: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 px-1">Candidate CV (PDF)</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                    />
                    <div className="w-full px-6 py-10 border-2 border-dashed border-slate-800 group-hover:border-indigo-500/50 rounded-2xl text-center transition-all bg-slate-950/20 flex flex-col items-center">
                      <svg className="w-8 h-8 text-slate-600 mb-4 group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <span className="text-slate-500 font-bold text-sm">
                        {resume ? resume.name : 'Drag & Drop your Professional CV'}
                      </span>
                    </div>
                  </div>
                </div>

                {error && <p className="text-red-400 text-xs font-black text-center">{error}</p>}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-[0.3em] rounded-3xl transition-all shadow-2xl active:scale-95 flex items-center justify-center space-x-4"
                >
                  {isSubmitting ? 'Submitting Application...' : (
                    <>
                      <span>Submit Profile</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
