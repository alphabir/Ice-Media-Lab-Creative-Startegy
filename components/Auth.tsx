import React, { useState } from 'react';
import { storageService } from '../services/storageService';
import { User } from '../types';
import Logo from './Logo';

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
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Updated to requested domain
  const CORPORATE_DOMAIN = '@icemedialab.com';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    const normalizedEmail = email.toLowerCase().trim();

    // Strict Domain Validation - Restricting to @icemedialab.com only
    if (!normalizedEmail.endsWith(CORPORATE_DOMAIN)) {
      setError(`Access Denied. IceMediaLabs Intelligence is restricted to authorized ${CORPORATE_DOMAIN} identities.`);
      setIsAuthenticating(false);
      return;
    }

    // Simulate Organizational DB Handshake
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (isLogin) {
      const user = storageService.login(normalizedEmail);
      if (user) {
        onAuthComplete(user);
      } else {
        setError('Member identity not found. Please register your corporate profile.');
      }
    } else {
      const existing = storageService.getAllUsers().find(u => u.email === normalizedEmail);
      if (existing) {
        setError('This corporate identity is already provisioned.');
        setIsAuthenticating(false);
        return;
      }
      
      const newUser: User = {
        email: normalizedEmail,
        fullName,
        role,
        department,
        joinedDate: Date.now(),
        analysisHistory: []
      };
      
      storageService.saveUser(newUser);
      storageService.login(normalizedEmail);
      onAuthComplete(newUser);
    }
    setIsAuthenticating(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080e1a] px-4 selection:bg-[#1bb0bd]">
      <div className="max-w-md w-full bg-[#0f172a] border border-slate-800 p-10 rounded-[40px] shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-500 ring-1 ring-white/5">
        {/* Security Glow Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1bb0bd] via-cyan-400 to-[#f6b21b]"></div>
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
             <Logo className="h-24" variant="full" />
          </div>
          <div className="mt-4 space-y-1">
            <h2 className="text-xl font-black text-white tracking-[0.2em] uppercase">
              {isLogin ? 'ICEMEDIALABS CORE ACCESS' : 'MEMBER PROVISIONING'}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] italic">Ice Media Lab Personnel Only</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Member Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-4 text-white focus:ring-1 focus:ring-[#1bb0bd] focus:border-[#1bb0bd] outline-none transition-all placeholder:text-slate-700 text-sm"
                  placeholder="Employee Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Designation</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-3 py-4 text-white focus:ring-1 focus:ring-[#1bb0bd] outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Division</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-3 py-4 text-white focus:ring-1 focus:ring-[#1bb0bd] outline-none transition-all text-sm appearance-none cursor-pointer"
                  >
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">Organizational Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-4 text-white focus:ring-1 focus:ring-[#1bb0bd] focus:border-[#1bb0bd] outline-none transition-all placeholder:text-slate-700 text-sm font-medium"
              placeholder={`user${CORPORATE_DOMAIN}`}
            />
            <div className="mt-2 flex items-center justify-between px-1">
              <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Required: {CORPORATE_DOMAIN}</p>
              {email.toLowerCase().endsWith(CORPORATE_DOMAIN) && (
                <span className="text-[8px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-[10px] font-bold text-center mt-2 animate-in zoom-in-95">
              SECURITY EXCEPTION: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full bg-gradient-to-r from-[#1bb0bd] to-[#128a96] hover:brightness-110 text-white font-black py-5 rounded-2xl shadow-[0_10px_30px_-5px_rgba(27,176,189,0.4)] transform active:scale-[0.98] transition-all mt-6 tracking-[0.2em] uppercase text-xs flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuthenticating ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                {isLogin ? 'ENTER ICEMEDIALABS NODE' : 'PROVISION ACCOUNT'}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-slate-500 hover:text-[#1bb0bd] text-[9px] font-black uppercase tracking-[0.2em] transition-colors"
          >
            {isLogin ? "NEW PERSONNEL? PROVISION ACCESS" : "RETURNING MEMBER? AUTHENTICATE"}
          </button>
        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#1bb0bd]/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#f6b21b]/5 rounded-full blur-[150px] animate-pulse delay-700"></div>
      </div>
    </div>
  );
};

export default Auth;