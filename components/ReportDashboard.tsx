import React from 'react';
import { AdIntelligenceReport } from '../types';

interface ReportDashboardProps {
  report: AdIntelligenceReport;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ report }) => {
  // Defensive extraction ensures the UI never breaks even with large datasets
  const {
    marketIntelligence,
    audiencePsychology,
    competitorReport,
    positioningStrategy,
    contentStrategy,
    funnelBlueprint,
    executionPlaybook,
    metrics,
    frameworkAnalysis,
    sources = []
  } = report;

  const Badge = ({ children, color = "blue" }: { children: React.ReactNode; color?: string }) => (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
      color === 'blue' ? 'bg-cyan-500/10 text-cyan-400' : 
      color === 'orange' ? 'bg-orange-500/10 text-orange-400' :
      'bg-emerald-500/10 text-emerald-400'
    }`}>
      {children}
    </span>
  );

  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 0. Strategic Rationale */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 border-l-4 border-[#f6b21b] p-8 rounded-r-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-3">
          <Badge color="orange">IceMediaLabs Protocol Engine</Badge>
          <h2 className="text-2xl font-black text-white">{frameworkAnalysis?.appliedFramework || 'Custom Framework'}</h2>
        </div>
        <p className="text-slate-300 leading-relaxed italic opacity-80">
          "Strategic Rationale: {frameworkAnalysis?.whyUsed || 'Context-specific reasoning applied.'}"
        </p>
      </section>

      {/* 1. Market Intelligence */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-10 rounded-[40px] shadow-inner">
          <h3 className="text-white font-black text-xl mb-6 flex items-center gap-3">
            <span className="text-cyan-500">01</span> Market Intelligence Summary
          </h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Industry Landscape</p>
              <p className="text-base text-slate-300 leading-relaxed">{marketIntelligence?.industryInsights}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Demand Velocity</p>
              <p className="text-base text-slate-300 leading-relaxed">{marketIntelligence?.demandPatterns}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1bb0bd]/5 border border-[#1bb0bd]/20 p-10 rounded-[40px]">
          <p className="text-[10px] font-black text-[#1bb0bd] uppercase tracking-[0.2em] mb-6 text-center">Winning Ad Formats</p>
          <div className="space-y-4">
            {marketIntelligence?.winningFormats?.map((f, i) => (
              <div key={i} className="flex items-start gap-4 text-white text-sm bg-slate-900/40 p-3 rounded-2xl border border-slate-800/50">
                <span className="text-[#1bb0bd] font-black">#{(i+1)}</span>
                <span className="font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Audience Psychology */}
      <section className="bg-slate-900/60 border border-slate-800 p-10 rounded-[48px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <h3 className="text-white font-black text-xl mb-10 flex items-center gap-3 relative z-10">
          <span className="text-cyan-500">02</span> Audience Psychology Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {[
            { label: 'Core Pains', data: audiencePsychology?.corePains, icon: '⚡' },
            { label: 'Triggers', data: audiencePsychology?.emotionalTriggers, icon: '🔥' },
            { label: 'Objections', data: audiencePsychology?.objections, icon: '🛡️' },
            { label: 'Drivers', data: audiencePsychology?.decisionDrivers, icon: '🚀' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-4">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                {item.icon} {item.label}
              </p>
              <div className="space-y-3">
                {item.data?.map((point, i) => (
                  <div key={i} className="text-xs text-slate-300 leading-relaxed pl-3 border-l border-slate-800 hover:border-cyan-500 transition-colors">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Competitor Intelligence */}
      <section className="space-y-8">
        <h3 className="text-white font-black text-xl flex items-center gap-3">
          <span className="text-cyan-500">03</span> Competitor Intelligence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competitorReport?.map((comp, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] hover:scale-[1.02] transition-transform duration-500">
              <h4 className="text-lg font-black text-white mb-4 border-b border-slate-800 pb-2">{comp.brandName}</h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-1">Active Strategy</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{comp.strategy}</p>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl">
                  <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Gap & Weakness</p>
                  <p className="text-xs text-slate-200 italic">"{comp.weaknesses}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Positioning & Content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-[#1bb0bd]/10 to-slate-900 border border-[#1bb0bd]/20 p-10 rounded-[40px]">
          <h3 className="text-white font-black text-xl mb-8 flex items-center gap-3">
            <span className="text-cyan-500">04</span> Positioning Strategy
          </h3>
          <div className="space-y-8">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
              <p className="text-[10px] font-black text-[#1bb0bd] uppercase tracking-widest mb-3">Positioning Statement</p>
              <p className="text-lg text-white font-bold leading-tight italic">"{positioningStrategy?.statement}"</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Growth Catalyst</p>
                <p className="text-sm text-slate-300">{positioningStrategy?.whyThisWins}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Differentiation</p>
                <p className="text-sm text-slate-300">{positioningStrategy?.howItStandsOut}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[40px]">
          <h3 className="text-white font-black text-xl mb-8 flex items-center gap-3">
            <span className="text-cyan-500">05</span> Content Framework
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4 p-4 bg-slate-800/40 rounded-3xl border border-slate-800">
               <div className="text-2xl">⚡</div>
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Viral Angles</p>
                  <div className="flex flex-wrap gap-2">
                    {contentStrategy?.viralAngles?.map((v, i) => (
                      <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-cyan-500/10">
                        {v}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">30-Day Execution Cycle</p>
              <p className="text-sm text-slate-300 bg-slate-950 p-6 rounded-3xl border border-slate-800 leading-relaxed">
                {contentStrategy?.framework30Day}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Execution Playbook (Reels & Ads) */}
      <section className="bg-white/5 border border-white/10 p-12 rounded-[56px] shadow-2xl backdrop-blur-md">
        <h3 className="text-4xl font-black text-white mb-12 flex items-center gap-6">
          <span className="text-[#f6b21b]">07</span> Execution Playbook
          <Badge color="emerald">Immediate Deployment</Badge>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 10 Reel Hooks */}
          <div className="space-y-6">
            <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 border-b border-slate-800 pb-2">Scroll-Stopping Reels (10 Ideas)</h5>
            <div className="grid grid-cols-1 gap-4">
              {executionPlaybook?.reelIdeas?.map((reel, i) => (
                <div key={i} className="group p-5 bg-slate-950 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all">
                  <div className="flex gap-5">
                    <span className="text-2xl font-black text-slate-800 group-hover:text-cyan-500 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                    <div>
                      <p className="text-sm font-black text-cyan-400 mb-2 italic">"{reel.hook}"</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{reel.idea}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Angles & LP */}
          <div className="space-y-12">
            <div className="space-y-6">
               <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4 border-b border-slate-800 pb-2">High-Conv Ad Angles</h5>
               <div className="space-y-4">
                  {executionPlaybook?.adAngles?.map((angle, i) => (
                    <div key={i} className="p-5 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-3xl text-sm text-slate-200 font-medium">
                      {angle}
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-10 rounded-[40px] shadow-2xl">
               <p className="text-[10px] font-black text-[#1bb0bd] uppercase tracking-widest mb-6">Landing Page Architecture</p>
               <h4 className="text-2xl font-black text-white mb-4 leading-tight">{executionPlaybook?.lpHeadline}</h4>
               <p className="text-base text-slate-400 mb-8 leading-relaxed">{executionPlaybook?.lpSubhead}</p>
               <div className="flex flex-wrap gap-3">
                  {executionPlaybook?.ctas?.map((cta, i) => (
                    <button key={i} className="px-6 py-3 bg-cyan-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                      {cta}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[40px]">
               <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Weekly Growth Cadence
               </h5>
               <ul className="space-y-4">
                  {executionPlaybook?.weeklyActions?.map((act, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1 shrink-0"></span>
                      {act}
                    </li>
                  ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Metrics */}
      <section className="bg-slate-950 border border-slate-800 p-12 rounded-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6">KPI Tracking</p>
            <div className="space-y-3">
              {metrics?.track?.map((m, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                  {m}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-6">North Star Goal</p>
            <p className="text-xl font-black text-emerald-400 leading-tight">
              {metrics?.successDefinition}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-6">Critical Warning Signs</p>
            <div className="space-y-3">
              {metrics?.warningSigns?.map((w, i) => (
                <div key={i} className="text-[11px] font-black text-rose-400 bg-rose-500/5 border border-rose-500/10 px-4 py-3 rounded-2xl">
                  ⚠️ {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification */}
      {sources?.length > 0 && (
        <section className="pt-12 border-t border-slate-800">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-8 text-center">IceMediaLabs Intelligence Verification</p>
          <div className="flex flex-wrap justify-center gap-4">
            {sources.map((src, i) => (
              <a key={i} href={src.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] text-cyan-500 hover:text-white hover:border-cyan-500 transition-all font-bold uppercase tracking-widest">
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