
import React from 'react';
import { storageService } from '../services/storageService';

const EmployeeDirectory: React.FC = () => {
  const users = storageService.getUsers();

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white">Ice Media Lab Organization Directory</h2>
        <p className="text-slate-400">Connect with fellow strategists and market specialists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.email} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-[#1bb0bd]/30 transition-all flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-[#1bb0bd] border border-slate-700">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-white">{user.fullName}</h4>
              <p className="text-xs text-slate-500 uppercase font-semibold">{user.role}</p>
              <p className="text-xs text-[#1bb0bd] mt-2">{user.email}</p>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Contributions</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-white">{user.analysisHistory.length}</span>
                  <span className="text-xs text-slate-400">Intel Reports</span>
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
