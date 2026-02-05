import React, { useState } from 'react';
import { User } from '../types';
import Logo from './Logo';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onViewProfile: () => void;
  onViewDirectory: () => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onViewProfile, onViewDirectory, onHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c1424]/90 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={onHome}
          >
            <Logo className="h-14" variant="full" />
            <div className="hidden lg:flex flex-col -space-y-1 pl-4 border-l border-slate-800">
              <span className="text-[10px] font-black text-[#f6b21b] tracking-[0.2em] uppercase">Intelligence Suite</span>
              <span className="text-[9px] font-black text-slate-600 tracking-widest uppercase">v2.5.0-PRV</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <button onClick={onHome} className="hover:text-[#1bb0bd] transition-colors">Analyzer</button>
            <button onClick={onViewDirectory} className="hover:text-[#1bb0bd] transition-colors">Directory</button>
            <span className="text-slate-800">|</span>
            
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 pl-4 border-l border-slate-800 group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-slate-200 group-hover:text-[#1bb0bd] transition-colors lowercase tracking-tight font-medium">{user.email}</span>
                  <span className="text-[9px] text-slate-500 font-black uppercase">{user.role}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#1bb0bd] font-black group-hover:border-[#1bb0bd] transition-colors overflow-hidden">
                  {user.fullName.charAt(0)}
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-[#0f172a] border border-slate-700/50 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-white/5">
                  <div className="px-4 py-3 border-b border-slate-800 mb-2">
                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Active Credentials</p>
                    <p className="text-xs text-white font-bold">{user.fullName}</p>
                    <p className="text-[10px] text-[#1bb0bd] font-bold mt-1 uppercase">{user.department}</p>
                  </div>
                  <button 
                    onClick={() => { onViewProfile(); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-[#1bb0bd] transition-colors flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Corporate Profile
                  </button>
                  <button 
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800 mt-2 flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Terminate Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;