
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
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = storageService.login(email);
      if (user) {
        onAuthComplete(user);
      } else {
        setError('Email not found. Please register as a new employee.');
      }
    } else {
      const existing = storageService.getUsers().find(u => u.email === email);
      if (existing) {
        setError('Email already registered.');
        return;
      }
      const newUser: User = {
        email,
        fullName,
        role,
        department: 'Creative Strategy',
        joinedDate: Date.now(),
        analysisHistory: []
      };
      storageService.saveUser(newUser);
      storageService.login(email);
      onAuthComplete(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1424] px-4 selection:bg-[#1bb0bd]">
      <div className="max-w-md w-full bg-[#0f172a] border border-slate-800 p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1bb0bd] via-[#1bb0bd] to-[#f6b21b]"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-24 mb-6">
             <img 
                src="logo.png" 
                alt="Ice Media Lab" 
                className="h-full object-contain" 
                onError={(e) => {
                  (e.target as any).style.display = 'none';
                  (e.target as any).nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-16 h-16 bg-[#1bb0bd] rounded-2xl items-center justify-center font-bold text-3xl text-white">I</div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            {isLogin ? 'Employee Portal' : 'Register Profile'}
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Ice Media Lab Enterprise</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all placeholder:text-slate-700"
                  placeholder="Employee Name"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Primary Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all"
                >
                  <option>Strategist</option>
                  <option>Brand Manager</option>
                  <option>Creative Lead</option>
                  <option>Performance Marketing</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#1bb0bd] outline-none transition-all placeholder:text-slate-700"
              placeholder="name@icemedia.lab"
            />
          </div>

          {error && <p className="text-rose-500 text-xs font-bold text-center mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-[#1bb0bd] to-[#128a96] hover:shadow-[#1bb0bd]/40 hover:shadow-xl text-white font-black py-4 rounded-xl shadow-lg transform active:scale-[0.97] transition-all mt-4 tracking-widest uppercase text-xs"
          >
            {isLogin ? 'Authenticate Session' : 'Create Organization Identity'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-500 hover:text-[#1bb0bd] text-[10px] font-black uppercase tracking-[0.2em] transition-colors"
          >
            {isLogin ? "Join the organization" : "Return to portal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
