
import React from 'react';
import { AdIntelligenceReport } from '../types';

interface ReportDashboardProps {
  report: AdIntelligenceReport;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ report }) => {
  const executiveSummary = report?.executiveSummary || { meaning: '', whatIsWorking: '' };
  const keywordInterpretation = report?.keywordInterpretation || { culturalMeaning: '', emotionalAssociations: [], scenarios: [] };
  const demographics = report?.demographics || [];
  const creativePatterns = report?.creativePatterns || { topHooks: [], visualStyles: '', copyTone: '' };
  const audienceComparison = report?.audienceComparison || { genZProfile: '', massProfile: '', dosAndDonts: [] };
  const brandStrategy = report?.brandStrategy || { legacyApproach: '', fmcgTips: '', pitfalls: '' };
  const actionableAssets = report?.actionableAssets || { copyFrameworks: [], reelHooks: [], messagingAngles: [] };
  const trendAlerts = report?.trendAlerts || { opportunities: [], saturationWarnings: [] };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Executive Summary */}
      <section className="bg-slate-800/40 border border-slate-700/60 p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1bb0bd]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1bb0bd]/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1bb0bd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m14.566 4.383a11.977 11.977 0 00-1.296-3.703L12.11 8.822l-1.11 1.11M3.382 7.03a11.95 11.95 0 00-1.296 3.703L8.822 12.11l1.11-1.11" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Executive Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#1bb0bd] uppercase tracking-widest">Strategic Meaning</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{executiveSummary.meaning}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#1bb0bd] uppercase tracking-widest">Success Signals</h3>
              <p className="text-slate-300 leading-relaxed text-sm">{executiveSummary.whatIsWorking}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Nuance */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#f6b21b] rounded-full"></span>
            Cultural Context (India)
          </h3>
          <div className="p-4 bg-slate-900/50 rounded-2xl border-l-4 border-[#1bb0bd] mb-6">
            <p className="text-slate-200 italic text-sm">"{keywordInterpretation.culturalMeaning}"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Emotional Hooks</h4>
              <ul className="space-y-3">
                {keywordInterpretation.emotionalAssociations.map((ea, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1bb0bd]"></span>
                    {ea}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Market Scenarios</h4>
              <ul className="space-y-3">
                {keywordInterpretation.scenarios.map((s, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1bb0bd]"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-[#f6b21b]/5 border border-[#f6b21b]/20 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f6b21b]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Trend Radar
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Opportunities</h4>
              <div className="space-y-2">
                {trendAlerts.opportunities.map((opp, i) => (
                  <div key={i} className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-100 text-[11px] leading-relaxed">
                    {opp}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-3">Saturation Alert</h4>
              <div className="space-y-2">
                {trendAlerts.saturationWarnings.map((sat, i) => (
                  <div key={i} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-100 text-[11px] leading-relaxed">
                    {sat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demographic Matrix */}
      <section className="overflow-hidden bg-slate-800/40 border border-slate-700/60 rounded-3xl">
        <div className="p-8 border-b border-slate-700/60 bg-slate-900/40">
          <h3 className="text-xl font-bold text-white">Demographic Inference Matrix</h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Based on AI-detected meta patterns</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/60 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
              <tr>
                <th className="px-8 py-5">Segment</th>
                <th className="px-6 py-5">Core Geographies</th>
                <th className="px-6 py-5">Age & Lang</th>
                <th className="px-6 py-5">Cultural Tone</th>
                <th className="px-6 py-5">Conversion Trigger</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300 divide-y divide-slate-700/40">
              {demographics.map((row, i) => (
                <tr key={i} className="hover:bg-[#1bb0bd]/5 transition-colors">
                  <td className="px-8 py-5 font-bold text-white">{row.regionType}</td>
                  <td className="px-6 py-5">{row.locations}</td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold">{row.ageGroup}</span>
                      <span className="text-[11px] text-slate-500">{row.language}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5"><span className="text-xs uppercase px-2 py-1 bg-slate-700/50 rounded">{row.culturalTone}</span></td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 bg-[#1bb0bd]/10 text-[#1bb0bd] rounded text-[10px] font-bold uppercase">
                      {row.purchaseTrigger}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparison Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gen-Z Profile */}
        <div className="bg-slate-900/40 border-t-4 border-[#f6b21b] p-8 rounded-3xl shadow-xl shadow-[#f6b21b]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xs font-black px-2 py-1 bg-[#f6b21b] text-slate-900 rounded">GEN-Z</div>
            <h3 className="text-xl font-bold text-white">Behavioral Profile</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{audienceComparison.genZProfile}</p>
          <div className="space-y-4 pt-4 border-t border-slate-700/50">
            <h4 className="text-[10px] font-black text-[#f6b21b] uppercase">Strategic Directive</h4>
            <div className="grid grid-cols-1 gap-2">
              {audienceComparison.dosAndDonts.find(d => d.audience.toLowerCase().includes('gen'))?.dos.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-emerald-400">
                  <span className="font-bold">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mass Profile */}
        <div className="bg-slate-900/40 border-t-4 border-[#1bb0bd] p-8 rounded-3xl shadow-xl shadow-[#1bb0bd]/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xs font-black px-2 py-1 bg-[#1bb0bd] text-white rounded">MASS</div>
            <h3 className="text-xl font-bold text-white">Market Sentiment</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{audienceComparison.massProfile}</p>
          <div className="space-y-4 pt-4 border-t border-slate-700/50">
            <h4 className="text-[10px] font-black text-[#1bb0bd] uppercase">Tactical Directive</h4>
            <div className="grid grid-cols-1 gap-2">
              {audienceComparison.dosAndDonts.find(d => d.audience.toLowerCase().includes('mass'))?.dos.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#1bb0bd]">
                  <span className="font-bold">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strategy */}
      <section className="bg-gradient-to-br from-[#1bb0bd]/10 via-slate-800/20 to-slate-900/40 border border-[#1bb0bd]/20 p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#f6b21b]/5 rounded-full blur-[100px] -mb-40 -mr-40"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-extrabold text-white mb-10 tracking-tight flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1bb0bd] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Strategic Blueprint
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-[#f6b21b] font-black text-xs uppercase tracking-widest border-b border-[#f6b21b]/20 pb-2">Heritage Move</h4>
              <p className="text-slate-300 text-xs leading-loose">{brandStrategy.legacyApproach}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#1bb0bd] font-black text-xs uppercase tracking-widest border-b border-[#1bb0bd]/20 pb-2">Modern Disruptor</h4>
              <p className="text-slate-300 text-xs leading-loose">{brandStrategy.fmcgTips}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-rose-400 font-black text-xs uppercase tracking-widest border-b border-rose-500/20 pb-2">Risk Vector</h4>
              <p className="text-slate-300 text-xs leading-loose">{brandStrategy.pitfalls}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Actionable Assets */}
      <section className="bg-slate-800/40 border border-slate-700/60 p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1bb0bd]"></span>
          Ready-to-Deploy Assets
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#1bb0bd] rounded-full"></div>
              Ad Copy Frameworks
            </h4>
            {actionableAssets.copyFrameworks.map((f, i) => (
              <div key={i} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-700/60 text-[11px] font-mono text-[#1bb0bd] leading-relaxed relative group overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-[#1bb0bd] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {f}
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-[#f6b21b] rounded-full"></div>
              Gen-Z Reel Hooks
            </h4>
            {actionableAssets.reelHooks.map((h, i) => (
              <div key={i} className="p-5 bg-[#f6b21b]/5 rounded-2xl border border-[#f6b21b]/10 text-xs text-slate-200 leading-relaxed italic">
                "{h}"
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full"></div>
              Strategic Messaging
            </h4>
            {actionableAssets.messagingAngles.map((a, i) => (
              <div key={i} className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-xs text-slate-200 leading-relaxed">
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReportDashboard;
