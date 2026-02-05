
import React, { useState } from 'react';
import { AdAnalysisInput } from '../types';

interface InputSectionProps {
  onAnalyze: (input: AdAnalysisInput) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isLoading }) => {
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('All India');
  const [platform, setPlatform] = useState('Both');
  const [rawAdText, setRawAdText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    onAnalyze({ keyword, region, platform, rawAdText });
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1bb0bd]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#1bb0bd]/10 transition-colors"></div>
      
      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Keyword / Intent</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., 'Masala', 'Nostalgia', 'Gen-Z Fashion'"
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1bb0bd] transition-all text-slate-200 placeholder:text-slate-600"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Region Focus</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1bb0bd] transition-all text-slate-200"
            >
              <option>All India</option>
              <option>North India (Delhi, Punjab, UP)</option>
              <option>South India (Karnataka, TN, Kerala, AP)</option>
              <option>West India (Maharashtra, Gujarat)</option>
              <option>East India (Bengal, Odisha, Bihar)</option>
              <option>Metro Tier 1 Only</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Platform</label>
          <div className="flex gap-4">
            {['Instagram', 'Facebook', 'Both'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                  platform === p
                    ? 'bg-[#1bb0bd] border-[#1bb0bd] text-white shadow-lg shadow-[#1bb0bd]/20'
                    : 'bg-slate-900/40 border-slate-700 text-slate-500 hover:border-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Raw Meta Ads Data (Optional)
          </label>
          <textarea
            value={rawAdText}
            onChange={(e) => setRawAdText(e.target.value)}
            placeholder="Paste headlines, primary copy, or CTA text for deeper context..."
            className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1bb0bd] transition-all text-slate-200 h-28 resize-none placeholder:text-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-br from-[#1bb0bd] to-[#128a96] hover:shadow-xl hover:shadow-[#1bb0bd]/30 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="tracking-wide uppercase text-xs">Processing Intelligence...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span className="tracking-wide uppercase text-xs font-extrabold">Generate Intel Report</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;
