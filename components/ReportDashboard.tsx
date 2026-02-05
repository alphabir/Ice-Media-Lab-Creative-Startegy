import React from 'react';
import { AdIntelligenceReport } from '../types';

interface ReportDashboardProps {
  report: AdIntelligenceReport;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ report }) => {
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
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 0. Framework Rationale (The Strategy Why) */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 border-l-4 border-[#f6b21b] p-6 rounded-r-2xl">
        <div className="flex items-center gap-3 mb-2">
          <Badge color="orange">Strategic Framework Applied</Badge>
          <h2 className="text-xl font-black text-white">{frameworkAnalysis.appliedFramework}</h2>
        </div>
        <p className="text-sm text-slate-400 italic">"Why this framework? {frameworkAnalysis.whyUsed}"</p>
      </section>

      {/* 1. Market Intelligence */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 p-8 rounded-[32px]">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            🔍 Market Intelligence Summary
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Industry Insights</p>
              <p className="text-sm text-slate-300 leading-relaxed">{marketIntelligence.industryInsights}</p>
            </div>
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Demand Patterns</p>
              <p className="text-sm text-slate-300 leading-relaxed">{marketIntelligence.demandPatterns}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/20 border border-slate-800 p-8 rounded-[32px]">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Winning Formats</p>
          <div className="space-y-2">
            {marketIntelligence.winningFormats.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-white text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Audience Psychology */}
      <section className="bg-slate-900/40 border border-slate-800 p-8 rounded-[40px]">
        <h3 className="text-white font-bold text-lg mb-8">🧠 Audience Psychology Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Core Pains', data: audiencePsychology.corePains, color: 'rose' },
            { label: 'Emotional Triggers', data: audiencePsychology.emotionalTriggers, color: 'cyan' },
            { label: 'Objections', data: audiencePsychology.objections, color: 'orange' },
            { label: 'Decision Drivers', data: audiencePsychology.decisionDrivers, color: 'emerald' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-3">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
              <div className="space-y-2">
                {item.data.map((point, i) => (
                  <p key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-slate-600 shrink-0"></span>
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Competitor Intelligence */}
      <section className="space-y-6">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">⚔️ Competitor Intelligence Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitorReport.map((comp, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h4 className="font-bold text-white mb-2">{comp.brandName}</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed"><span className="text-rose-400 font-bold uppercase text-[9px]">Strategy:</span> {comp.strategy}</p>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl">
                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Gap/Weakness</p>
                <p className="text-[10px] text-slate-300 italic">"{comp.weaknesses}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Positioning & 5. Content Strategy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-cyan-500/5 border border-cyan-500/20 p-8 rounded-[32px]">
          <h3 className="text-white font-bold text-lg mb-6">🧩 Positioning & Differentiation</h3>
          <div className="space-y-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-2">Unique Positioning Statement</p>
              <p className="text-sm text-white font-medium italic">"{positioningStrategy.statement}"</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Why This Wins</p>
                <p className="text-xs text-slate-400">{positioningStrategy.whyThisWins}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">How It Stands Out</p>
                <p className="text-xs text-slate-400">{positioningStrategy.howItStandsOut}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[32px]">
          <h3 className="text-white font-bold text-lg mb-6">📣 Content & Distribution Strategy</h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Platform-wise Plan</p>
              <p className="text-xs text-slate-300">{contentStrategy.platformPlan}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">30-Day Content Framework</p>
              <p className="text-xs text-slate-300 p-3 bg-slate-800 rounded-xl leading-relaxed">{contentStrategy.framework30Day}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {contentStrategy.viralAngles.map((angle, i) => (
                <span key={i} className="text-[9px] font-black text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded uppercase">
                  ⚡ {angle}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Funnel Blueprint */}
      <section className="bg-slate-900 border border-slate-800 p-8 rounded-[40px]">
        <h3 className="text-white font-bold text-lg mb-6">🔄 Funnel & Conversion Blueprint</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awareness → Trust → Conversion</p>
            <p className="text-xs text-slate-300">{funnelBlueprint.flow}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lead Capture Logic</p>
            <p className="text-xs text-slate-300">{funnelBlueprint.leadCaptureLogic}</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nurture Strategy</p>
            <p className="text-xs text-slate-300">{funnelBlueprint.nurtureStrategy}</p>
          </div>
        </div>
      </section>

      {/* 7. Execution Playbook */}
      <section className="space-y-8">
        <h3 className="text-3xl font-black text-white flex items-center gap-4">
          🚀 Execution Playbook
          <Badge color="emerald">Immediate Action Items</Badge>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reel Ideas */}
          <div className="space-y-4">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">10 High-Velocity Reel Ideas</p>
            <div className="grid grid-cols-1 gap-3">
              {executionPlaybook.reelIdeas.map((reel, i) => (
                <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl group hover:border-cyan-500/40 transition-all">
                  <div className="flex gap-4">
                    <span className="text-xl font-black text-slate-800 group-hover:text-cyan-500/20 transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                    <div>
                      <p className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-1 italic">Hook: "{reel.hook}"</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{reel.idea}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Ad Angles */}
            <div className="space-y-4">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">5 Strategic Ad Angles</p>
              <div className="space-y-3">
                {executionPlaybook.adAngles.map((angle, i) => (
                  <div key={i} className="p-4 bg-slate-800/20 border-l-2 border-emerald-500 rounded-r-2xl">
                    <p className="text-xs text-slate-200">{angle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Landing Page */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Direct Response Landing Page</p>
              <h4 className="text-xl font-bold text-white mb-2 underline decoration-cyan-500 underline-offset-4">{executionPlaybook.lpHeadline}</h4>
              <p className="text-sm text-slate-400 mb-6">{executionPlaybook.lpSubhead}</p>
              <div className="flex flex-wrap gap-2">
                {executionPlaybook.ctas.map((cta, i) => (
                  <button key={i} className="px-4 py-2 bg-cyan-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                    {cta}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Actions */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Weekly Growth Cadence</p>
              <ul className="space-y-2">
                {executionPlaybook.weeklyActions.map((action, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-3">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Metrics & KPIs */}
      <section className="bg-slate-950 border border-slate-800 p-10 rounded-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Primary Metrics</h5>
            <div className="space-y-2">
              {metrics.track.map((m, i) => (
                <p key={i} className="text-xs text-white font-medium">• {m}</p>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Success Milestone</h5>
            <p className="text-sm text-cyan-400 font-bold leading-relaxed">{metrics.successDefinition}</p>
          </div>
          <div>
            <h5 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Early Warning Signs</h5>
            <div className="space-y-2">
              {metrics.warningSigns.map((w, i) => (
                <div key={i} className="text-[10px] text-rose-400/80 bg-rose-500/5 px-3 py-1.5 rounded-lg border border-rose-500/10">
                  {w}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      {sources.length > 0 && (
        <section className="pt-12 border-t border-slate-800">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-6">VARTA Node Intelligence Verification</p>
          <div className="flex flex-wrap gap-3">
            {sources.map((src, i) => (
              <a key={i} href={src.url} target="_blank" rel="noopener" className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-[10px] text-cyan-500 hover:border-cyan-500 transition-all flex items-center gap-2">
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