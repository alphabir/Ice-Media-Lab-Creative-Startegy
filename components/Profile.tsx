
import React from 'react';
import { User, AdIntelligenceReport } from '../types';

interface ProfileProps {
  user: User;
  onViewReport: (report: AdIntelligenceReport) => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onViewReport, onBack }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-slate-800 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#1bb0bd] to-[#159ca8] rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-[#1bb0bd]/20">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">{user.fullName}</h1>
            <p className="text-[#1bb0bd] font-medium">{user.role} • {user.department}</p>
            <p className="text-slate-500 text-sm mt-1">Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all border border-slate-700"
        >
          Return to Hub
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 text-center">
          <div className="text-3xl font-bold text-white mb-1">{user.analysisHistory.length}</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reports Generated</div>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 text-center">
          <div className="text-3xl font-bold text-white mb-1">Standard</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Access Tier</div>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700 text-center">
          <div className="text-3xl font-bold text-white mb-1">Creative</div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Primary Engine</div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Activity History</h3>
        {user.analysisHistory.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl text-slate-500">
            No reports generated yet. Start analyzing keywords to build your profile.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {user.analysisHistory.map((report) => (
              <div 
                key={report.id}
                onClick={() => onViewReport(report)}
                className="group flex items-center justify-between p-6 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700 hover:border-[#1bb0bd]/50 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1bb0bd]/10 rounded-xl text-[#1bb0bd] group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">"{report.input.keyword}"</h4>
                    <p className="text-sm text-slate-400">{report.input.region} • {new Date(report.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#1bb0bd] font-bold text-sm">
                  View Analysis
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
