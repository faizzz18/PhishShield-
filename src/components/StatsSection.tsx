import React from 'react';
import { ShieldCheck, Gauge, Layers, Zap, Activity, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '10+',
      label: 'Security Checks',
      sublabel: 'Heuristic & structural inspection layers',
      icon: ShieldCheck,
      color: 'text-cyan-400',
    },
    {
      value: '0–100',
      label: 'Risk Scoring',
      sublabel: 'Fine-grained threat probability index',
      icon: Gauge,
      color: 'text-purple-400',
    },
    {
      value: '2',
      label: 'Input Types',
      sublabel: 'Dedicated URL & message analysis engines',
      icon: Layers,
      color: 'text-sky-400',
    },
    {
      value: '< 1.2s',
      label: 'Instant Analysis',
      sublabel: 'Ultra-low latency heuristic evaluation',
      icon: Zap,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section className="relative py-16 border-t border-slate-800/80">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trust Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#070e20] via-[#09132b] to-[#070e20] border border-cyan-500/30 p-8 sm:p-12 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-800/90">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono-cyber text-cyan-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>BENCHMARKED THREAT DETECTION MATRIX</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Built for Speed, Accuracy, and Transparency
              </h3>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono-cyber text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero-Storage Privacy Architecture</span>
            </div>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-cyan-400 mb-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display ${stat.color} tracking-tight drop-shadow-sm`}>
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-100 font-display">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-400 font-mono-cyber max-w-[200px]">
                    {stat.sublabel}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
