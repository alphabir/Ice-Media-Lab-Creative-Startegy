import React from 'react';
import { storageService } from '../services/storageService';
import { User } from '../types';

interface EmployeeDirectoryProps {
  onSelectEmployee: (user: User) => void;
}

const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({ onSelectEmployee }) => {
  const users = storageService.getUsers();

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white">Ice Media Lab Organization Directory</h2>
        <p className="text-slate-400">Connect with fellow strategists and market specialists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div 
            key={user.email} 
            onClick={() => onSelectEmployee(user)}
            className="group bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-[#1bb0bd]/60 hover:bg-slate-800/40 cursor-pointer transition-all flex items-start gap-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1bb0bd]/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-[#1bb0bd]/10 transition-colors"></div>
            
            <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-[#1bb0bd] border border-slate-700 group-hover:scale-105 transition-transform">
              {user.fullName.charAt(0)}
            </div>
            <div className="relative z-10 flex-1">
              <h4 className="font-bold text-white group-hover:text-[#1bb0bd] transition-colors">{user.fullName}</h4>
              <p className="text-xs text-slate-500 uppercase font-semibold">{user.role}</p>
              <p className="text-xs text-slate-600 mt-2 truncate w-full">{user.email}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Contributions</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-white">{user.analysisHistory.length}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reports</span>
                  </div>
                </div>
                <div className="text-[#1bb0bd] opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;