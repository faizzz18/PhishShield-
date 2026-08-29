import React, { useState, useEffect } from 'react';
import { ShieldAlert, Globe2, Radio, Activity, AlertOctagon, ArrowUpRight, Zap } from 'lucide-react';

interface ThreatIncident {
  id: string;
  target: string;
  category: 'Credential Harvester' | 'Urgent Smishing' | 'Fake Bank Portal' | 'CEO Fraud' | 'Malware Dropper' | 'Typosquatting';
  region: string;
  flag: string;
  risk: number;
  timeAgo: string;
}

const INITIAL_INCIDENTS: ThreatIncident[] = [
  { id: 'inc-1', target: 'login-secure-chase.xyz/auth', category: 'Fake Bank Portal', region: 'US-East', flag: '🇺🇸', risk: 94, timeAgo: '2s ago' },
  { id: 'inc-2', target: 'usps-track-package-fee.top', category: 'Urgent Smishing', region: 'EU-Central', flag: '🇩🇪', risk: 88, timeAgo: '6s ago' },
  { id: 'inc-3', target: 'paypal-security-limitation.info', category: 'Credential Harvester', region: 'AP-Tokyo', flag: '🇯🇵', risk: 96, timeAgo: '12s ago' },
  { id: 'inc-4', target: 'micro-soft-auth-reset.live', category: 'Typosquatting', region: 'UK-London', flag: '🇬🇧', risk: 91, timeAgo: '19s ago' },
  { id: 'inc-5', target: 'internal-payroll-verify.click', category: 'CEO Fraud', region: 'CA-Toronto', flag: '🇨🇦', risk: 85, timeAgo: '24s ago' },
  { id: 'inc-6', target: 'crypto-airdrop-claim.tech', category: 'Malware Dropper', region: 'SG-Singapore', flag: '🇸🇬', risk: 98, timeAgo: '31s ago' },
];

export const CyberThreatTicker: React.FC = () => {
  const [incidents, setIncidents] = useState<ThreatIncident[]>(INITIAL_INCIDENTS);
  const [activeIncidentIndex, setActiveIncidentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIncidentIndex((prev) => (prev + 1) % incidents.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [incidents.length]);

  return (
    <div className="w-full bg-[#050b18]/90 border-y border-cyan-500/20 py-2.5 px-4 backdrop-blur-md relative overflow-hidden">
      
      {/* Subtle Laser Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono-cyber">
        
        {/* Left Live Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-950/60 border border-rose-500/40 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="font-bold tracking-wider text-[11px] uppercase">Live Threat Radar</span>
          </div>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>Global Ingestion Feed</span>
          </span>
        </div>

        {/* Center Rotating Threat Capsule */}
        <div className="flex-1 max-w-2xl overflow-hidden px-2">
          {incidents.map((inc, index) => {
            if (index !== activeIncidentIndex) return null;
            return (
              <div 
                key={inc.id}
                className="flex items-center justify-center md:justify-start gap-2.5 text-slate-300 animate-in fade-in slide-in-from-right-4 duration-300 truncate"
              >
                <span className="text-sm">{inc.flag}</span>
                <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">[{inc.region}]</span>
                <span className="text-cyan-300 font-semibold truncate max-w-[200px] sm:max-w-none">{inc.target}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-bold">
                  {inc.category}
                </span>
                <span className="text-rose-400 font-bold hidden sm:inline">Risk {inc.risk}%</span>
                <span className="text-slate-500 text-[10px] hidden lg:inline">({inc.timeAgo})</span>
              </div>
            );
          })}
        </div>

        {/* Right Status Counters */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Threats Intercepted: <strong className="text-slate-200">148,920+</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Avg Latency: &lt;1.2s</span>
          </div>
        </div>

      </div>
    </div>
  );
};
