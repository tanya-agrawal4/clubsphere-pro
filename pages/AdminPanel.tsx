
import React, { useState, useEffect } from 'react';
import { CLUBS } from '../constants';
import { Application, ClubStatusMap, ApplicationStatus } from '../types';

const AdminPanel: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [statusMap, setStatusMap] = useState<ClubStatusMap>({});
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications'>('overview');
  const [viewingResume, setViewingResume] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('clubsphere_admin_token');
    if (token !== 'active_admin_session') {
      window.location.href = '/';
      return;
    }

    const appsRaw = localStorage.getItem('clubsphere_applications');
    setApps(appsRaw ? JSON.parse(appsRaw) : []);

    const statusRaw = localStorage.getItem('clubsphere_club_status_v2');
    setStatusMap(statusRaw ? JSON.parse(statusRaw) : {});
  }, []);

  const saveStatus = (newMap: ClubStatusMap) => {
    setStatusMap(newMap);
    localStorage.setItem('clubsphere_club_status_v2', JSON.stringify(newMap));
    const simpleMap: any = {};
    Object.keys(newMap).forEach(k => simpleMap[k] = newMap[k].isOpen);
    localStorage.setItem('clubsphere_club_status', JSON.stringify(simpleMap));
  };

  const toggleStatus = (clubId: string) => {
    const current = statusMap[clubId] || { isOpen: true };
    const newMap = { ...statusMap, [clubId]: { ...current, isOpen: !current.isOpen } };
    saveStatus(newMap);
  };

  const handleNoticeUpload = (clubId: string, file: File | null) => {
    if (!file) return;
    const current = statusMap[clubId] || { isOpen: true };
    const newMap = { 
      ...statusMap, 
      [clubId]: { 
        ...current, 
        noticePdfName: file.name, 
        noticeTimestamp: Date.now() 
      } 
    };
    saveStatus(newMap);
    alert(`Notice broadcasted for ${CLUBS.find(c => c.id === clubId)?.name}`);
  };

  const updateAppStatus = (appId: string, newStatus: ApplicationStatus) => {
    const updatedApps = apps.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    setApps(updatedApps);
    localStorage.setItem('clubsphere_applications', JSON.stringify(updatedApps));
    setViewingApp(null);
  };

  const getAppCount = (clubId: string) => apps.filter(a => a.clubId === clubId).length;

  return (
    <div className="min-h-screen pt-32 pb-32 px-6 lg:px-12 bg-[#020617]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-rose-400"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-400">Authority Terminal</span>
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter leading-tight">Club Controls</h2>
          </div>
          
          <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Control Center
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Review Queue
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Club Management Table */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
                <table className="w-full text-left">
                  <thead className="border-b border-slate-800/60 bg-slate-950/40">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Club Entity</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Broadcast Notice</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Access Flow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {CLUBS.map(club => {
                      const settings = statusMap[club.id] || { isOpen: true };
                      return (
                        <tr key={club.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white/5 p-2 rounded-lg border border-white/5 group-hover:border-white/20 transition-all">
                                <img src={club.image} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <div className="text-sm font-black text-white">{club.name}</div>
                                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">{getAppCount(club.id)} Applicants</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              {settings.noticePdfName ? (
                                <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                                  <span className="text-[9px] font-bold uppercase truncate max-w-[120px]">{settings.noticePdfName}</span>
                                </div>
                              ) : (
                                <span className="text-[9px] font-bold text-slate-600 uppercase mb-2">No active broadcast</span>
                              )}
                              <label className="cursor-pointer bg-slate-800/50 hover:bg-slate-700 text-[8px] font-black uppercase tracking-widest text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 w-fit transition-all">
                                Upload Notice
                                <input type="file" accept=".pdf" className="hidden" onChange={(e) => handleNoticeUpload(club.id, e.target.files?.[0] || null)} />
                              </label>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => toggleStatus(club.id)}
                              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                                settings.isOpen 
                                ? 'border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10' 
                                : 'border-rose-500/20 text-rose-500 hover:bg-rose-500/10'
                              }`}
                            >
                              {settings.isOpen ? 'Recruiting' : 'Paused'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] shadow-2xl">
                <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Authority Overview</div>
                <div className="text-4xl font-black text-white mb-6">Database</div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/70 text-xs font-bold">Total Hubs</span>
                    <span className="text-white font-black">{CLUBS.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/70 text-xs font-bold">Pending Review</span>
                    <span className="text-white font-black">{apps.filter(a => a.status === 'pending').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {apps.length === 0 ? (
                <div className="col-span-full py-40 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
                   <p className="text-slate-600 font-black uppercase tracking-widest text-xs">No pending applications</p>
                </div>
              ) : (
                apps.map(app => (
                  <div key={app.id} className={`bg-slate-900/40 border ${app.status === 'accepted' ? 'border-emerald-500/30' : app.status === 'rejected' ? 'border-rose-500/30' : 'border-white/5'} p-8 rounded-[2rem] hover:border-indigo-500/50 transition-all group shadow-xl`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400' : 
                        app.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' : 
                        'bg-indigo-500/10 text-indigo-400'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-[9px] font-bold text-slate-600">{new Date(app.timestamp).toLocaleDateString()}</span>
                    </div>
                    
                    <h4 className="text-xl font-black text-white mb-1">{app.fullName}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">{app.enrollmentNo}</p>
                    
                    <div className="space-y-3 mb-8">
                       <div className="flex items-center justify-between text-[10px]">
                         <span className="text-slate-500 font-bold uppercase">Applied to</span>
                         <span className="text-white font-black">{app.clubName}</span>
                       </div>
                       <div className="flex items-center justify-between text-[10px]">
                         <span className="text-slate-500 font-bold uppercase">Resume Link</span>
                         <span className={app.resumeName ? 'text-emerald-400 font-black' : 'text-slate-700 font-black'}>
                           {app.resumeName ? 'Ready for Review' : 'Missing CV'}
                         </span>
                       </div>
                    </div>

                    <button 
                      onClick={() => setViewingApp(app)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg active:scale-95"
                    >
                      Review Application
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Detailed Application Modal with Resume Hub */}
        {viewingApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-xl">
            <div className="max-w-4xl w-full bg-slate-900 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <button 
                onClick={() => setViewingApp(null)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="mb-10">
                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Recruitment Hub: Profile Review</div>
                <h3 className="text-4xl font-black text-white tracking-tight">{viewingApp.fullName}</h3>
                <div className="flex space-x-4 mt-2">
                   <span className="text-slate-500 font-bold uppercase text-[10px]">{viewingApp.enrollmentNo}</span>
                   <span className="text-slate-500 font-bold uppercase text-[10px]">• {viewingApp.branch} Department</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Statement of Purpose</h5>
                    <p className="text-slate-300 text-sm font-medium leading-relaxed italic italic-quote bg-slate-950/50 p-6 rounded-2xl border border-white/5 h-64 overflow-y-auto">
                      "{viewingApp.sop}"
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Resume Document</h5>
                    {viewingApp.resumeName ? (
                      <div className="p-10 bg-slate-950/50 rounded-2xl border border-white/5 flex flex-col items-center justify-center space-y-4">
                        <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                        <div className="text-center">
                          <p className="text-[10px] font-black text-white uppercase truncate max-w-[200px]">{viewingApp.resumeName}</p>
                          <p className="text-[8px] font-bold text-slate-600 uppercase">PDF Document Attachment</p>
                        </div>
                        <button 
                          onClick={() => setViewingResume(viewingApp.resumeName || null)}
                          className="w-full py-4 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                        >
                          View Official Resume
                        </button>
                      </div>
                    ) : (
                      <div className="p-12 bg-slate-950/20 rounded-2xl border border-dashed border-slate-800 text-center">
                        <p className="text-[9px] font-black text-slate-700 uppercase">Candidate did not attach CV</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex gap-4">
                <button 
                  onClick={() => updateAppStatus(viewingApp.id, 'accepted')}
                  className="flex-1 py-4 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                >
                  Accept Candidate
                </button>
                <button 
                  onClick={() => updateAppStatus(viewingApp.id, 'rejected')}
                  className="flex-1 py-4 bg-rose-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-rose-600/20 active:scale-95"
                >
                  Decline Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* High-Fidelity Resume Modal */}
        {viewingResume && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/95 backdrop-blur-lg">
            <div className="max-w-4xl w-full h-[85vh] bg-slate-100 rounded-[3rem] flex flex-col overflow-hidden relative shadow-2xl">
               <button 
                onClick={() => setViewingResume(null)}
                className="absolute top-6 right-6 bg-slate-200 text-slate-900 p-2 rounded-full hover:bg-slate-300 transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="p-6 border-b bg-slate-200 flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-slate-600">Document Transmission: {viewingResume}</span>
                 <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                 </div>
              </div>

              <div className="flex-grow p-12 overflow-y-auto bg-slate-50">
                 {/* Render a professional CV layout */}
                 <div className="max-w-2xl mx-auto bg-white p-16 shadow-2xl border border-slate-200 text-slate-900 font-serif min-h-screen">
                    <h1 className="text-4xl font-bold mb-1 border-b-4 border-slate-900 pb-2">{viewingApp?.fullName}</h1>
                    <div className="text-sm mb-12 flex justify-between italic text-slate-500">
                       <span>{viewingApp?.enrollmentNo}</span>
                       <span>NIT Agartala Student Profile</span>
                    </div>

                    <section className="mb-10">
                       <h2 className="text-xs font-black uppercase tracking-widest bg-slate-100 px-3 py-1.5 mb-5 inline-block">Professional Summary</h2>
                       <p className="text-sm leading-relaxed text-slate-700">Dedicated engineering undergraduate from the {viewingApp?.branch} Department at National Institute of Technology, Agartala. Aiming to apply technical skills and leadership qualities to contribute effectively to the {viewingApp?.clubName} community.</p>
                    </section>

                    <section className="mb-10">
                       <h2 className="text-xs font-black uppercase tracking-widest bg-slate-100 px-3 py-1.5 mb-5 inline-block">Motivation & Vision</h2>
                       <p className="text-sm leading-relaxed text-slate-700 italic border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/20">"{viewingApp?.sop}"</p>
                    </section>

                    <section className="mb-10">
                       <h2 className="text-xs font-black uppercase tracking-widest bg-slate-100 px-3 py-1.5 mb-5 inline-block">Education</h2>
                       <div className="flex justify-between text-sm font-bold">
                          <span>Bachelor of Technology ({viewingApp?.branch})</span>
                          <span>2022 - 2026</span>
                       </div>
                       <p className="text-sm text-slate-600">NIT Agartala, Jirania, Tripura</p>
                    </section>

                    <div className="mt-24 text-[10px] text-slate-300 text-center border-t pt-6 uppercase tracking-widest">
                       End of Recruitment Document Hub Preview
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
