import React from 'react';
import { ClipboardPaste, Cpu, ShieldAlert, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste URL or Message',
      desc: 'Input any suspicious link, email header, SMS scam, or text snippet into the terminal.',
      icon: ClipboardPaste,
      glowColor: 'cyan',
    },
    {
      step: '02',
      title: 'Heuristic Analysis',
      desc: 'Our engine parses RFC syntax, domain entropy, SSL integrity, and suspicious lexicons.',
      icon: Cpu,
      glowColor: 'blue',
    },
    {
      step: '03',
      title: 'Threat Detection',
      desc: 'Flags brand impersonation, spoofed TLDs, URL masking, and coercive psychological pressure.',
      icon: ShieldAlert,
      glowColor: 'purple',
    },
    {
      step: '04',
      title: 'AI Explanation',
      desc: 'Synthesizes plain-English explanations detailing exactly why the target is hazardous.',
      icon: Sparkles,
      glowColor: 'pink',
    },
    {
      step: '05',
      title: 'Stay Protected',
      desc: 'Follow tailored action steps to neutralize risks, block sender vectors, and secure credentials.',
      icon: CheckCircle,
      glowColor: 'emerald',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 border-t border-slate-800/80 scroll-mt-16">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-64 bg-cyan-900/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-300">
            <span>AUTOMATED WORKFLOW PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            How PhishShield AI Works
          </h2>
          <p className="text-base text-slate-300 font-normal">
            From raw input to intelligent threat breakdown in milliseconds. Here is how our multi-stage detection pipeline operates.
          </p>
        </div>

        {/* Workflow Horizontal Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-[#080f22]/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0b1632] transition-all duration-300 flex flex-col items-start justify-between group shadow-lg"
              >
                {/* Connecting arrow indicator for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Step Marker Badge */}
                <div className="w-full flex items-center justify-between mb-4">
                  <span className="text-xs font-mono-cyber font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    STEP {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 group-hover:text-cyan-200 group-hover:scale-110 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
