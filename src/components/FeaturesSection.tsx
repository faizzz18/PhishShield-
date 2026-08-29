import React from 'react';
import { Link2, MessageSquareWarning, Sparkles, BarChart3, SearchCheck, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Link2,
      title: 'URL Threat Detection',
      description: 'Detect suspicious domain patterns, deceptive subdomains, raw IP hosts, obfuscated characters, and malicious-looking URLs.',
      tag: 'DNS & Syntax Heuristics',
      color: 'cyan',
    },
    {
      icon: MessageSquareWarning,
      title: 'Message Scam Detection',
      description: 'Identify phishing emails, SMS smishing lures, fraudulent urgent alerts, and suspicious social engineering communications.',
      tag: 'NLP Lexical Analysis',
      color: 'purple',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Provide intelligent, human-readable explanations that decode complex cyber attack vectors into straightforward insights.',
      tag: 'Neural Synthesis',
      color: 'pink',
    },
    {
      icon: BarChart3,
      title: 'Risk Scoring (0–100)',
      description: 'Generate an intuitive, calibrated risk index with granular classifications from LOW and MEDIUM to HIGH and CRITICAL.',
      tag: 'Dynamic Threat Index',
      color: 'yellow',
    },
    {
      icon: SearchCheck,
      title: 'Transparent Detection',
      description: 'Explain exactly why a URL or message was flagged—providing complete visibility without black-box confusion.',
      tag: 'Explainable Security',
      color: 'blue',
    },
    {
      icon: ShieldCheck,
      title: 'Safety Recommendations',
      description: 'Equip end-users and security teams with immediate actionable next steps to contain exposure and prevent breaches.',
      tag: 'Incident Mitigation',
      color: 'emerald',
    },
  ];

  return (
    <section id="features" className="relative py-20 border-t border-slate-800/80 scroll-mt-16">
      
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-300">
            <span>ENTERPRISE-GRADE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Comprehensive Phishing Defense
          </h2>
          <p className="text-base text-slate-300 font-normal">
            Equipped with multi-layered inspection modules designed to identify advanced social engineering and deceptive link architectures.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative p-7 rounded-3xl bg-[#081024]/85 border border-slate-800 hover:border-cyan-500/40 hover:bg-[#0b1735] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-all shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono-cyber uppercase font-semibold px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-cyber text-cyan-400/80 group-hover:text-cyan-300">
                  <span>Engine Module: Online</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
