import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  ArrowRight, 
  Zap, 
  Globe, 
  Mail, 
  Lock, 
  Cpu, 
  CheckCircle2, 
  Radio, 
  Sparkles, 
  Terminal, 
  Video, 
  Radar 
} from 'lucide-react';
import { cyberSound } from '../utils/cyberSoundEffects';
import { UrlAnalysisVideoDemo } from './UrlAnalysisVideoDemo';

interface HeroSectionProps {
  onAnalyzeClick: () => void;
  onHowItWorksClick: () => void;
  onAnalyzeUrl?: (url: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyzeClick, onHowItWorksClick, onAnalyzeUrl }) => {
  const [visualMode, setVisualMode] = useState<'video' | 'radar'>('video');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [directInput, setDirectInput] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative pt-4 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-20 overflow-hidden">
      
      {/* Background Cyber Atmosphere Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[300px] sm:h-[500px] bg-cyan-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 sm:right-10 w-[280px] sm:w-[500px] h-[250px] sm:h-[400px] bg-purple-600/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] sm:text-xs font-mono-cyber text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-slate-200">
                Detect. Analyze. Protect.
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-cyan-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>Heuristic AI Engine v4.8</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.15] sm:leading-[1.12]">
              Don&apos;t Click.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                Analyze First.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              PhishShield AI uses intelligent heuristic analysis and AI-powered insights to detect suspicious URLs, phishing messages, scam attempts and social engineering threats before they harm you.
            </p>

            {/* Direct Website Quick-Scan Launcher Bar */}
            <div className="w-full p-3 sm:p-4 rounded-2xl bg-[#070e20]/90 border border-cyan-500/30 shadow-xl shadow-cyan-950/40 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono-cyber text-slate-400">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DIRECT WEBSITE INSPECTION (NO COPY-PASTE)</span>
                </span>
                <span className="text-slate-500 hidden xs:inline">Type & Enter</span>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (directInput.trim() && onAnalyzeUrl) {
                    cyberSound.playScanStart();
                    onAnalyzeUrl(directInput.trim());
                  } else {
                    onAnalyzeClick();
                  }
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <input
                    type="text"
                    value={directInput}
                    onChange={(e) => setDirectInput(e.target.value)}
                    placeholder="Enter website (e.g. paypal.com, bank-auth.xyz)..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#030612] border border-slate-700/80 text-xs sm:text-sm font-mono-cyber text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 text-slate-950 font-bold text-xs font-mono-cyber flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-500/20 active:scale-95 transition-all shrink-0 min-h-[40px]"
                >
                  <span>Direct Scan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Instant 1-Click Direct Website Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono-cyber">
                <span className="text-slate-500 text-[10px]">1-Click Test:</span>
                {[
                  { name: 'paypal.com', safe: true },
                  { name: 'chase-security-verify.xyz', safe: false },
                  { name: 'google.com', safe: true },
                  { name: 'metamask-airdrop.top', safe: false },
                  { name: 'github.com', safe: true }
                ].map((site) => (
                  <button
                    key={site.name}
                    type="button"
                    onClick={() => {
                      setDirectInput(site.name);
                      if (onAnalyzeUrl) {
                        cyberSound.playScanStart();
                        onAnalyzeUrl(`https://${site.name}`);
                      }
                    }}
                    className={`px-2 py-0.5 rounded-md border text-[10px] transition-all cursor-pointer flex items-center gap-1 ${
                      site.safe 
                        ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                        : 'bg-rose-950/50 border-rose-500/30 text-rose-300 hover:bg-rose-900/60'
                    }`}
                  >
                    <span>{site.name}</span>
                    <span className="text-[9px] opacity-75">{site.safe ? '✓' : '⚠'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
              <button
                onClick={() => {
                  cyberSound.playScanStart();
                  onAnalyzeClick();
                }}
                id="hero-primary-cta"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 group min-h-[48px]"
              >
                <Terminal className="w-4 h-4 text-slate-950" />
                <span>Open Threat Analyzer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  cyberSound.playClick();
                  onHowItWorksClick();
                }}
                id="hero-secondary-cta"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/80 hover:text-cyan-300 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>How It Works</span>
                <Zap className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 border-t border-slate-800/80 w-full text-xs font-mono-cyber text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Real-Time Heuristics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>100% Privacy Safe</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Video Demo / 3D Cyber Visualizer with Switcher */}
          <div className="lg:col-span-6 relative flex flex-col items-center w-full max-w-full overflow-hidden sm:overflow-visible">
            
            {/* Mode Switcher Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 bg-[#02050c]/90 p-1.5 rounded-2xl border border-slate-800 shadow-lg w-full sm:w-auto">
              <button
                onClick={() => {
                  setVisualMode('video');
                  cyberSound.playClick();
                }}
                className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 rounded-xl text-xs font-mono-cyber font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[40px] ${
                  visualMode === 'video'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live Video Simulator</span>
              </button>

              <button
                onClick={() => {
                  setVisualMode('radar');
                  cyberSound.playClick();
                }}
                className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-2 rounded-xl text-xs font-mono-cyber font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[40px] ${
                  visualMode === 'radar'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Radar className="w-3.5 h-3.5" />
                <span>3D Threat Radar</span>
              </button>
            </div>

            {/* Video Mode */}
            {visualMode === 'video' && (
              <div className="w-full animate-in fade-in zoom-in-95 duration-300">
                <UrlAnalysisVideoDemo onAnalyzeUrl={onAnalyzeUrl} />
              </div>
            )}

            {/* Radar Mode */}
            {visualMode === 'radar' && (
              <div 
                className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center transition-transform duration-200 ease-out animate-in fade-in duration-300 mx-auto my-2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  perspective: '1000px',
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                {/* Outer Radar Pulse Ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 cyber-grid-dots" />
                <div className="absolute inset-4 rounded-full border border-cyan-400/25" />
                <div className="absolute inset-10 sm:inset-12 rounded-full border border-dashed border-purple-500/35" />
                
                {/* Radar Rotating Sweep Line */}
                <div className="absolute inset-4 rounded-full overflow-hidden pointer-events-none animate-radar opacity-50">
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/35 to-transparent origin-bottom-right" />
                </div>

                {/* Central Glowing Shield Cybercore */}
                <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-b from-[#0e1d3e] to-[#070e22] border-2 border-cyan-400/70 p-4 sm:p-6 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/30 backdrop-blur-xl group">
                  
                  {/* Circuit Laser Scan Line */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-scan blur-[1px] pointer-events-none" />
                  
                  {/* Main Shield Visual */}
                  <div className="relative p-3 sm:p-4 rounded-2xl bg-cyan-950/70 border border-cyan-400/60 mb-2 sm:mb-3 shadow-inner shadow-cyan-500/30">
                    <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 filter drop-shadow-[0_0_15px_rgba(6,182,212,0.7)]" />
                    <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] sm:text-xs font-mono-cyber font-bold tracking-widest text-cyan-300 uppercase flex items-center justify-center gap-1.5">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span>Threat Radar AI</span>
                    </span>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono-cyber mt-0.5">
                      Heuristic Defense Active
                    </p>
                  </div>
                </div>

                {/* Floating Warning Element 1: URL Flag */}
                <div className="absolute top-0 left-0 sm:-top-3 sm:left-2 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-900/95 border border-rose-500/50 text-[10px] sm:text-xs font-mono-cyber text-rose-300 shadow-xl shadow-rose-950/60 flex items-center gap-1.5 sm:gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-rose-200">TLD:</span>{' '}
                    <span className="text-rose-400 font-bold">.xyz</span>
                  </div>
                </div>

                {/* Floating Element 2: Malicious URL Fragment */}
                <div className="absolute bottom-0 left-0 sm:-bottom-2 sm:-left-4 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 text-[10px] sm:text-xs font-mono-cyber text-cyan-300 shadow-xl shadow-cyan-950/70 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
                  <span className="truncate max-w-[110px] sm:max-w-[170px] text-slate-300">
                    verify-login...
                  </span>
                  <span className="px-1 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] sm:text-[10px] font-bold">
                    FLAG
                  </span>
                </div>

                {/* Floating Element 3: Urgent Message Icon */}
                <div className="absolute top-2 right-0 sm:top-10 sm:-right-4 z-20 px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-900/95 border border-purple-500/50 text-[10px] sm:text-xs font-mono-cyber text-purple-200 shadow-xl shadow-purple-950/70 flex items-center gap-1.5 sm:gap-2">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-[9px] sm:text-[10px] text-purple-400 uppercase font-semibold">Social Eng.</div>
                    <div className="text-[10px] sm:text-xs text-slate-200 font-medium">Urgency detected</div>
                  </div>
                </div>

                {/* Floating Element 4: Real-time risk indicator */}
                <div className="absolute bottom-2 right-0 sm:-bottom-4 sm:right-4 z-20 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900/95 border border-amber-500/50 text-[10px] sm:text-[11px] font-mono-cyber text-amber-300 flex items-center gap-1.5 shadow-lg shadow-amber-950/40">
                  <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span>Weight: 94%</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
