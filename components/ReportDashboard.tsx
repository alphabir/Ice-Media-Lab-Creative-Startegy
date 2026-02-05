import React from 'react';
import { AdIntelligenceReport } from '../types';

interface ReportDashboardProps {
  report: AdIntelligenceReport;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ report }) => {
  const {
    executiveSummary = { meaning: '', whatIsWorking: '' },
    demographics = [],
    competitors = [],
    performingCampaigns = [],
    creativePatterns = { topHooks: [], visualStyles: '', copyTone: '' },
    audienceComparison = { genZProfile: '', massProfile: '', dosAndDonts: [] },
    actionableAssets = { copyFrameworks: [], reelHooks: [], messagingAngles: [] },
    sources = []
  } = report;

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Executive Summary */}
      <section className="bg-slate-800/40 border border-slate-700/60 p-8 rounded-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1bb0bd]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1bb0bd]/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1bb0bd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Intelligence Briefing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-black text-[#1bb0bd] uppercase tracking-widest">Market Environment</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{executiveSummary.meaning}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-black text-[#f6b21b] uppercase tracking-widest">Growth Signals</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{executiveSummary.whatIsWorking}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Analysis */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-rose-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Competitor Intelligence</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitors.map((comp, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl hover:border-rose-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-white text-lg">{comp.brandName}</h4>
                  <span className="text-[10px] font-black bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded uppercase">{comp.marketShare} Share</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Primary Strategy</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{comp.primaryStrategy}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Winning Style: <span className="text-white">{comp.winningCreativeStyle}</span></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaign Benchmarks */}
      <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-[40px]">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            High-Performing Ad Patterns
          </h3>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border border-slate-800 px-4 py-1.5 rounded-full">Real-time Benchmarking</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {performingCampaigns.map((camp, i) => (
            <div key={i} className="bg-slate-800/20 border border-slate-700/40 p-6 rounded-2xl relative transition-all hover:bg-slate-800/40">
              <div className={`absolute top-4 right-4 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                camp.performanceRating === 'High' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#f6b21b]/10 text-[#f6b21b]'
              }`}>
                {camp.performanceRating} ROI
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-[#1bb0bd] font-black border border-slate-800">
                  {camp.platform.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{camp.format}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{camp.hookType}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/40 pt-4">{camp.reasoning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demographic Matrix */}
      <section className="overflow-hidden bg-slate-800/40 border border-slate-700/60 rounded-[32px]">
        <div className="p-8 border-b border-slate-700/60 bg-slate-900/40 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Target Demographic Matrix</h3>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-black">Meta Platform Audience Signals</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/60 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
              <tr>
                <th className="px-8 py-5">Tier Segment</th>
                <th className="px-6 py-5">Core Geographies</th>
                <th className="px-6 py-5">Age & Language</th>
                <th className="px-6 py-5">Trigger Pulse</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-700/40">
              {demographics.map((row, i) => (
                <tr key={i} className="hover:bg-[#1bb0bd]/5 transition-colors group">
                  <td className="px-8 py-6 font-bold text-white group-hover:text-[#1bb0bd]">{row.regionType}</td>
                  <td className="px-6 py-6 text-xs">{row.locations}</td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-xs">{row.ageGroup}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">{row.language}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-[#1bb0bd]/10 text-[#1bb0bd] rounded-lg text-[10px] font-black uppercase tracking-tight">
                      {row.purchaseTrigger}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Actionable Assets */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 p-8 rounded-[32px] border border-slate-800">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1bb0bd]"></span>
            Winning Reel Hooks
          </h4>
          <div className="space-y-4">
            {actionableAssets.reelHooks.map((h, i) => (
              <div key={i} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-2xl text-xs text-slate-200 leading-relaxed group hover:border-[#1bb0bd]/40 transition-colors">
                <span className="text-[#1bb0bd] font-black mr-2">#{i+1}</span>
                "{h}"
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900/40 p-8 rounded-[32px] border border-slate-800">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f6b21b]"></span>
            Hinglish Copy Angles
          </h4>
          <div className="space-y-4">
            {actionableAssets.messagingAngles.map((a, i) => (
              <div key={i} className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-2xl text-xs text-slate-200 leading-relaxed group hover:border-[#f6b21b]/40 transition-colors">
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Sources */}
      {sources.length > 0 && (
        <section className="pt-12 border-t border-slate-800/60">
          <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">Intelligence Node Verification</h4>
          <div className="flex flex-wrap gap-3">
            {sources.map((src, i) => (
              <a 
                key={i} 
                href={src.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-[10px] text-[#1bb0bd] hover:border-[#1bb0bd] transition-all flex items-center gap-2 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {src.title}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ReportDashboard;