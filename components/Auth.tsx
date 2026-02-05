import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { User } from '../types';

interface AuthProps {
  onAuthComplete: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Strategist');
  const [department, setDepartment] = useState('Creative Strategy');
  const [error, setError] = useState('');

  const departments = [
    'Creative Strategy',
    'Brand Management',
    'Performance Marketing',
    'Data Intelligence',
    'Content Production',
    'Media Buying'
  ];

  const roles = [
    'Strategist',
    'Brand Manager',
    'Creative Lead',
    'Performance Lead',
    'Analyst',
    'Director'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = storageService.login(email);
      if (user) {
        onAuthComplete(user);
      } else {
        setError('Corporate email not found. Please register as a new employee.');
      }
    } else {
      const existing = storageService.getUsers().find(u => u.email === email);
      if (existing) {
        setError('Email already registered in the organization.');
        return;
      }
      
      const newUser: User = {
        email,
        fullName,
        role,
        department,
        joinedDate: Date.now(),
        analysisHistory: []
      };
      
      storageService.saveUser(newUser);
      // Auto-login after registration
      storageService.login(email);
      onAuthComplete(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1424] px-4 selection:bg-[#1bb0bd]">
      <div className="max-w-md w-full bg-[#0f172a] border border-slate-800 p-10 rounded-[32px] shadow-2xl relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1bb0bd] via-[#1bb0bd] to-[#f6b21b]"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-24 mb-6">
             <div className="w-16 h-16 bg-[#1bb0bd] rounded-2xl flex items-center justify-center font-bold text-3xl text-white shadow-xl shadow-[#1bb0bd]/20">I</div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            {isLogin ? 'Employee Portal' : 'Register Profile'}
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Ice Media Lab Enterprise Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all placeholder:text-slate-700 text-sm"
                  placeholder="Employee Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-400">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Primary Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all placeholder:text-slate-700 text-sm"
              placeholder="name@icemedia.lab"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-[11px] font-bold text-center mt-2 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#1bb0bd] to-[#128a96] hover:shadow-[#1bb0bd]/40 hover:shadow-xl text-white font-black py-4 rounded-xl shadow-lg transform active:scale-[0.97] transition-all mt-6 tracking-widest uppercase text-xs"
          >
            {isLogin ? 'Authenticate Session' : 'Establish Corporate Identity'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-500 hover:text-[#1bb0bd] text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
          >
            {isLogin ? "Join the Ice Media workforce" : "Return to employee portal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;