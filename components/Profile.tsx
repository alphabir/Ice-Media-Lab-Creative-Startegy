import React from 'react';
import { User, AdIntelligenceReport } from '../types';

interface ProfileProps {
  user: User;
  isOwnProfile?: boolean;
  onViewReport: (report: AdIntelligenceReport) => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isOwnProfile = false, onViewReport, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-8 gap-6">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1bb0bd] to-[#159ca8] rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-[#1bb0bd]/20 transition-transform group-hover:scale-105">
              {user.fullName.charAt(0)}
            </div>
            {isOwnProfile && (
              <div className="absolute -top-2 -right-2 bg-[#f6b21b] text-slate-900 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-lg">
                Active
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold text-white tracking-tight">{user.fullName}</h1>
            </div>
            <p className="text-[#1bb0bd] font-medium tracking-wide">{user.role} • {user.department}</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                Joined {new Date(user.joinedDate).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </p>
              <span className="text-slate-800">|</span>
              <p className="text-slate-500 text-xs lowercase font-medium">{user.email}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Return to Hub</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1bb0bd]/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
          <div className="relative z-10">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-[#1bb0bd] transition-colors">{user.analysisHistory.length}</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Intel Datasets</div>
          </div>
        </div>
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#f6b21b]/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
          <div className="relative z-10">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-[#f6b21b] transition-colors">Standard</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Clearance</div>
          </div>
        </div>
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-12 -mt-12"></div>
          <div className="relative z-10">
            <div className="text-4xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">100%</div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Node Integrity</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#1bb0bd] rounded-full"></div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Intelligence Contribution History</h3>
        </div>
        
        {user.analysisHistory.length === 0 ? (
          <div className="p-16 text-center bg-slate-900/40 border border-slate-800 border-dashed rounded-[40px] text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="font-medium">No intelligence reports mapped to this identity yet.</p>
            {isOwnProfile && (
              <button 
                onClick={onBack}
                className="mt-6 text-[#1bb0bd] text-xs font-black uppercase tracking-widest hover:underline"
              >
                Launch Primary Analyzer
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {user.analysisHistory.map((report) => (
              <div 
                key={report.id}
                onClick={() => onViewReport(report)}
                className="group flex items-center justify-between p-6 bg-slate-800/20 hover:bg-[#1bb0bd]/5 border border-slate-700/50 hover:border-[#1bb0bd]/40 rounded-2xl cursor-pointer transition-all backdrop-blur-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-[#1bb0bd] group-hover:bg-[#1bb0bd] group-hover:text-white transition-all shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg group-hover:text-[#1bb0bd] transition-colors leading-tight">
                      "{report.input.keyword}"
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {report.input.region}
                      </span>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Analyzed {new Date(report.timestamp).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[#1bb0bd] font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  Access Intelligence
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;