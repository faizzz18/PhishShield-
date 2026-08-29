import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Terminal,
  Activity,
  Layers,
  Search,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { cyberSound } from '../utils/cyberSoundEffects';

interface DemoScenario {
  id: string;
  type: 'safe' | 'phishing';
  title: string;
  url: string;
  protocol: 'HTTPS' | 'HTTP';
  domain: string;
  riskScore: number;
  verdict: 'SAFE' | 'CRITICAL THREAT';
  statusText: string;
  badges: string[];
  metrics: {
    entropy: string;
    domainAge: string;
    tlsGrade: string;
    homographRisk: string;
    topSiteRank: string;
  };
  terminalLogs: string[];
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'safe-bank',
    type: 'safe',
    title: 'Legitimate Banking Portal',
    url: 'https://www.chase.com/secure/login/auth-session',
    protocol: 'HTTPS',
    domain: 'chase.com',
    riskScore: 0,
    verdict: 'SAFE',
    statusText: '100% Authentic Banking Domain // Zero Heuristic Anomalies',
    badges: ['EV TLS 1.3 Certified', 'Tranco Top 100 Domain', 'Clean Cryptographic Entropy', 'SPF & DMARC Enforced'],
    metrics: {
      entropy: '3.14 (Clean Baseline)',
      domainAge: '28+ Years (Established 1996)',
      tlsGrade: 'A+ (DigiCert Extended Validation)',
      homographRisk: '0% (Clean Latin-1 ASCII)',
      topSiteRank: '#38 Globally Verified',
    },
    terminalLogs: [
      'INIT: TLS handshake negotiation over Port 443 [TLS_AES_256_GCM_SHA384]',
      'DNS: Querying authoritative root servers for chase.com...',
      'WHOIS: Registrar: CSC Corporate Domains, Inc. | Age: 10,240 days',
      'ENTROPY: Shannon entropy index calculated at 3.14 (Safe variance)',
      'HEURISTICS: Zero typosquatting or punycode injection markers detected',
      'AI_CORE: NLP classification confirms legitimate transactional route',
      'VERDICT: ACCESS GRANTED -> Zero threat vectors identified.'
    ]
  },
  {
    id: 'safe-sso',
    type: 'safe',
    title: 'Google Enterprise SSO',
    url: 'https://accounts.google.com/signin/v2/identifier',
    protocol: 'HTTPS',
    domain: 'google.com',
    riskScore: 0,
    verdict: 'SAFE',
    statusText: 'Verified Identity Provider // Official Infrastructure',
    badges: ['Google Trust Services SSL', 'Strict Transport Security (HSTS)', 'Zero Redirect Traps', 'High Reputation Host'],
    metrics: {
      entropy: '3.22 (Optimal)',
      domainAge: '27+ Years (Established 1997)',
      tlsGrade: 'A+ (Google GTS CA 1C3)',
      homographRisk: '0% (Standard Hostname)',
      topSiteRank: '#1 Globally Verified',
    },
    terminalLogs: [
      'INIT: Cryptographic token validation with Google Global Cache...',
      'DNS: Resolving Anycast IP: 142.250.190.46 (AS15169 GOOGLE)',
      'TLS: Extended Validation verified; Cipher: CHACHA20-POLY1305',
      'HEURISTICS: Subdomain hierarchy validates authentic Google Auth path',
      'SAFETY_SHIELD: Zero suspicious redirect loops or obscured parameters',
      'VERDICT: 100% AUTHENTIC IDENTITY GATEWAY -> SAFE'
    ]
  },
  {
    id: 'phishing-trap',
    type: 'phishing',
    title: 'Deceptive Phishing Clone',
    url: 'https://chase-security-verify.xyz/login?session=auth99@malicious.pw',
    protocol: 'HTTPS',
    domain: 'chase-security-verify.xyz',
    riskScore: 94,
    verdict: 'CRITICAL THREAT',
    statusText: 'Severe Brand Impersonation Trap // Credential Harvesting Target',
    badges: ['High-Risk TLD (.xyz)', 'Brand Typosquatting (Chase)', '@-Symbol Credential Intercept', 'Domain Age < 48 Hours'],
    metrics: {
      entropy: '4.82 (High Randomness)',
      domainAge: '1.5 Days (Freshly Registered)',
      tlsGrade: 'D- (Free Automated Let\'s Encrypt)',
      homographRisk: '88% (Deceptive Keyword Mashup)',
      topSiteRank: 'Unranked (Suspicious)',
    },
    terminalLogs: [
      'INIT: Intercepting foreign routing request...',
      'DNS_ALERT: Suspicious registrar spotted via Free TLD Provider',
      'LEXICAL_WARN: Domain contains brand token "chase" with deceptive prefixes',
      'CRITICAL: "@" symbol found in query path (Credential redirect exploit)',
      'ENTROPY_SPIKE: Path entropy 4.82 exceeds safe threshold (3.90)',
      'AI_CORE: Neural classifier identifies credential theft signature (99.2% match)',
      'QUARANTINE: DEPLOYING SHIELD WALL -> ACCESS BLOCKED'
    ]
  }
];

interface UrlAnalysisVideoDemoProps {
  onAnalyzeUrl?: (url: string) => void;
  compact?: boolean;
}

export const UrlAnalysisVideoDemo: React.FC<UrlAnalysisVideoDemoProps> = ({ 
  onAnalyzeUrl, 
  compact = false 
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [displayedUrlChars, setDisplayedUrlChars] = useState<number>(0);

  const scenario = DEMO_SCENARIOS[selectedScenarioIndex];
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const soundPlayedRef = useRef<{ scan: boolean; verdict: boolean }>({ scan: false, verdict: false });

  // Reset progress when switching scenarios
  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setProgress(0);
    setDisplayedUrlChars(0);
    soundPlayedRef.current = { scan: false, verdict: false };
    cyberSound.playClick();
  };

  // Video Animation Loop
  useEffect(() => {
    const DURATION_MS = 9000 / playbackSpeed; // Total video loop duration

    const updateFrame = (currentTime: number) => {
      if (!isPlaying) {
        lastTimeRef.current = currentTime;
        animationFrameRef.current = requestAnimationFrame(updateFrame);
        return;
      }

      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      setProgress((prev) => {
        const next = prev + (delta / DURATION_MS) * 100;
        
        // Typing effect for URL in phase 1 (0% to 25%)
        if (next <= 25) {
          const charPercent = next / 25;
          const chars = Math.floor(charPercent * scenario.url.length);
          setDisplayedUrlChars(chars);
        } else {
          setDisplayedUrlChars(scenario.url.length);
        }

        // Sound triggers
        if (soundEnabled) {
          if (next >= 25 && !soundPlayedRef.current.scan) {
            soundPlayedRef.current.scan = true;
            cyberSound.playScan();
          }
          if (next >= 85 && !soundPlayedRef.current.verdict) {
            soundPlayedRef.current.verdict = true;
            if (scenario.type === 'safe') {
              cyberSound.playSuccess();
            } else {
              cyberSound.playAlarm();
            }
          }
        }

        // Loop playback when completed
        if (next >= 100) {
          soundPlayedRef.current = { scan: false, verdict: false };
          return 0; // Seamless loop
        }

        return next;
      });

      animationFrameRef.current = requestAnimationFrame(updateFrame);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, scenario, soundEnabled]);

  // Phase computation
  // Phase 1: 0% - 25% (URL Ingestion & SSL Lock Handshake)
  // Phase 2: 25% - 60% (Heuristic & AI Neural Dissection)
  // Phase 3: 60% - 85% (Risk Score Gauge & Telemetry Computation)
  // Phase 4: 85% - 100% (Final Animated Shield Verdict)
  const currentPhase = progress < 25 ? 1 : progress < 60 ? 2 : progress < 85 ? 3 : 4;
  const currentTimeSec = ((progress / 100) * 9).toFixed(1);

  const activeTerminalIndex = Math.min(
    Math.floor((progress / 100) * scenario.terminalLogs.length),
    scenario.terminalLogs.length - 1
  );

  return (
    <div className={`relative rounded-3xl bg-gradient-to-b from-[#0a1226]/95 via-[#060c1c]/95 to-[#03060f]/95 border ${scenario.type === 'safe' ? 'border-cyan-500/30' : 'border-rose-500/30'} shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 group`}>
      
      {/* Top Cybernetic Video Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3.5 py-3 sm:px-6 sm:py-3.5 bg-slate-950/80 border-b border-slate-800/80 gap-2.5 sm:gap-3">
        
        {/* Left: Video Player Title & Status Badge */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          
          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${scenario.type === 'safe' ? 'bg-cyan-400' : 'bg-rose-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${scenario.type === 'safe' ? 'bg-cyan-500' : 'bg-rose-500'}`} />
            </span>
            <span className="text-[11px] sm:text-xs font-mono-cyber font-bold tracking-wider uppercase text-slate-200 truncate">
              Live URL Analysis Simulator
            </span>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-mono-cyber font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 hidden md:inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
            <span>AI Neural Demo</span>
          </span>
        </div>

        {/* Right: Scenario Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#02050c] p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          {DEMO_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono-cyber transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer min-h-[36px] ${
                selectedScenarioIndex === idx
                  ? sc.type === 'safe'
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-950/50 font-bold'
                    : 'bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-md shadow-rose-950/50 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {sc.type === 'safe' ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              )}
              <span className="hidden md:inline">{sc.title}</span>
              <span className="md:hidden truncate">{sc.type === 'safe' ? (idx === 0 ? 'Bank' : 'SSO') : 'Phish'}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Main Video Viewport Canvas */}
      <div className="relative p-4 sm:p-7 min-h-[360px] sm:min-h-[420px] flex flex-col justify-between overflow-hidden">
        
        {/* Animated Laser Scanning Sweep Grid Background */}
        <div className="absolute inset-0 cyber-grid-dots opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-cyan-900/10 via-transparent to-transparent pointer-events-none" />

        {/* Phase Laser Scanner Bar (Horizontally Sweeping) */}
        <div 
          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none transform -skew-x-12 transition-all duration-75"
          style={{ left: `${progress * 0.9}%` }}
        />

        {/* Top: Animated Browser Address Bar Interception */}
        <div className="relative z-10 w-full space-y-4">
          
          {/* Simulated Browser URL Bar */}
          <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#020612]/90 border border-slate-700/80 shadow-lg shadow-black/50">
            
            {/* Lock / Protocol Indicator */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono-cyber font-bold ${
              scenario.type === 'safe' 
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' 
                : 'bg-rose-950/80 text-rose-400 border border-rose-500/40'
            }`}>
              {scenario.type === 'safe' ? (
                <Lock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              )}
              <span>{scenario.protocol}</span>
            </div>

            {/* Address Bar URL Input with Real-time Typing Cursor */}
            <div className="flex-1 font-mono-cyber text-xs sm:text-sm text-slate-200 truncate select-all flex items-center">
              <span className="text-slate-400">{scenario.url.slice(0, displayedUrlChars)}</span>
              {currentPhase === 1 && (
                <span className="w-2 h-4 bg-cyan-400 inline-block ml-0.5 animate-pulse" />
              )}
            </div>

            {/* Stage Indicator Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono-cyber text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Phase 0{currentPhase}/04</span>
            </div>
          </div>

          {/* Phase Status Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs font-mono-cyber text-slate-400">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin [animation-duration:6s]" />
              <span>
                {currentPhase === 1 && 'Ingesting & Tokenizing URL Components...'}
                {currentPhase === 2 && 'Executing Multi-Layer Heuristic Matrix...'}
                {currentPhase === 3 && 'Evaluating Domain Entropy & Typosquatting...'}
                {currentPhase === 4 && 'Generating Autonomous Clearance Verdict.'}
              </span>
            </div>

            <div className="text-[11px] text-cyan-400 font-bold">
              {scenario.domain}
            </div>
          </div>

        </div>

        {/* Middle: Dynamic Interactive Visual Stages */}
        <div className="relative z-10 my-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* Left Visual: AI Neural Core & Metrics HUD */}
          <div className="md:col-span-7 space-y-3.5">
            
            {/* 4 Real-time Diagnostic Telemetry Gauges */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Metric 1: Entropy */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
                  <span>Entropy Ratio</span>
                  <span className={scenario.type === 'safe' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {progress >= 25 ? scenario.metrics.entropy : 'Measuring...'}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${scenario.type === 'safe' ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    style={{ width: `${progress >= 25 ? (scenario.type === 'safe' ? 32 : 88) : 10}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Domain Age */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
                  <span>Domain Age</span>
                  <span className={scenario.type === 'safe' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {progress >= 35 ? (scenario.type === 'safe' ? '28+ Yrs' : '< 48 Hrs') : 'Resolving...'}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${scenario.type === 'safe' ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    style={{ width: `${progress >= 35 ? (scenario.type === 'safe' ? 95 : 12) : 10}%` }}
                  />
                </div>
              </div>

              {/* Metric 3: TLS Encryption Grade */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
                  <span>SSL / TLS Grade</span>
                  <span className={scenario.type === 'safe' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {progress >= 45 ? scenario.metrics.tlsGrade.split(' ')[0] : 'Handshake...'}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${scenario.type === 'safe' ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    style={{ width: `${progress >= 45 ? (scenario.type === 'safe' ? 98 : 25) : 10}%` }}
                  />
                </div>
              </div>

              {/* Metric 4: Spoofing / Typosquatting Check */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-cyber">
                  <span>Homograph Spoof</span>
                  <span className={scenario.type === 'safe' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {progress >= 55 ? scenario.metrics.homographRisk : 'Auditing...'}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${scenario.type === 'safe' ? 'bg-emerald-400' : 'bg-rose-500'}`}
                    style={{ width: `${progress >= 55 ? (scenario.type === 'safe' ? 0 : 88) : 10}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Live Streaming Terminal Log Output */}
            <div className="p-3 rounded-xl bg-[#02050c] border border-slate-800 text-[11px] font-mono-cyber space-y-1">
              <div className="text-slate-500 flex items-center gap-1.5 pb-1 border-b border-slate-900">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>NEURAL HEURISTIC EXECUTION LOG</span>
              </div>
              <div className="text-cyan-300/90 h-10 overflow-hidden flex flex-col justify-end">
                <p className="truncate text-slate-400">
                  {activeTerminalIndex > 0 ? scenario.terminalLogs[activeTerminalIndex - 1] : ''}
                </p>
                <p className={`truncate font-semibold ${scenario.type === 'safe' ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {scenario.terminalLogs[activeTerminalIndex]}
                </p>
              </div>
            </div>

          </div>

          {/* Right Visual: Holographic Verdict Card / Shield Center */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            
            <div className={`relative w-full p-5 sm:p-6 rounded-2xl transition-all duration-500 flex flex-col items-center text-center ${
              currentPhase === 4 
                ? scenario.type === 'safe'
                  ? 'bg-gradient-to-b from-emerald-950/60 to-[#021810]/80 border-2 border-emerald-400/80 shadow-2xl shadow-emerald-500/30'
                  : 'bg-gradient-to-b from-rose-950/60 to-[#200508]/80 border-2 border-rose-500/80 shadow-2xl shadow-rose-500/30'
                : 'bg-slate-950/80 border border-slate-800/80'
            }`}>
              
              {/* Central Glowing Shield Icon */}
              <div className="relative mb-3">
                <div className={`p-4 rounded-2xl border transition-all duration-500 ${
                  currentPhase === 4
                    ? scenario.type === 'safe'
                      ? 'bg-emerald-950/90 border-emerald-400/80 shadow-lg shadow-emerald-500/50 scale-110'
                      : 'bg-rose-950/90 border-rose-500/80 shadow-lg shadow-rose-500/50 scale-110'
                    : 'bg-slate-900 border-slate-700'
                }`}>
                  {scenario.type === 'safe' ? (
                    <ShieldCheck className={`w-12 h-12 transition-colors duration-300 ${
                      currentPhase === 4 ? 'text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.9)]' : 'text-slate-400'
                    }`} />
                  ) : (
                    <ShieldAlert className={`w-12 h-12 transition-colors duration-300 ${
                      currentPhase === 4 ? 'text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]' : 'text-slate-400'
                    }`} />
                  )}
                </div>

                {/* Pulsing ring on phase 4 */}
                {currentPhase === 4 && (
                  <div className={`absolute -inset-2 rounded-2xl border-2 animate-ping pointer-events-none ${
                    scenario.type === 'safe' ? 'border-emerald-400/40' : 'border-rose-500/40'
                  }`} />
                )}
              </div>

              {/* Verdict Label */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono-cyber uppercase tracking-widest text-slate-400">
                  {currentPhase === 4 ? 'Analysis Verdict' : 'Calculating Risk'}
                </div>
                
                <h4 className={`text-xl sm:text-2xl font-black font-display tracking-tight ${
                  currentPhase === 4
                    ? scenario.type === 'safe'
                      ? 'text-emerald-300 drop-shadow-sm'
                      : 'text-rose-400 drop-shadow-sm'
                    : 'text-slate-200'
                }`}>
                  {currentPhase === 4 
                    ? (scenario.type === 'safe' ? 'VERIFIED SAFE' : 'MALICIOUS TRAP')
                    : `Risk Score: ${Math.round((progress / 85) * scenario.riskScore)}/100`}
                </h4>

                <p className="text-xs font-mono-cyber text-slate-300 max-w-[240px] mx-auto leading-relaxed pt-1">
                  {currentPhase === 4 ? scenario.statusText : 'Performing cryptographic & lexical checks...'}
                </p>
              </div>

              {/* Key Badge List */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {scenario.badges.slice(0, 2).map((b, i) => (
                  <span key={i} className={`px-2 py-0.5 rounded text-[10px] font-mono-cyber font-medium ${
                    scenario.type === 'safe'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-950/90 text-rose-300 border border-rose-500/30'
                  }`}>
                    {b}
                  </span>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Video Transport & Control Bar */}
        <div className="relative z-10 pt-3 border-t border-slate-800/80 space-y-2.5 sm:space-y-3">
          
          {/* Scrubbable Video Progress Bar with Expanded Touch Hit Area */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(newProgress);
              cyberSound.playClick();
            }}
            className="group/progress relative py-2 -my-1 cursor-pointer"
          >
            <div className="relative h-2 group-hover/progress:h-3 bg-slate-900/90 rounded-full transition-all duration-150 overflow-hidden">
              {/* Progress Fill */}
              <div 
                className={`h-full transition-all duration-100 rounded-full ${
                  scenario.type === 'safe'
                    ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 shadow-md shadow-emerald-500/50'
                    : 'bg-gradient-to-r from-amber-400 via-rose-500 to-red-600 shadow-md shadow-rose-500/50'
                }`}
                style={{ width: `${progress}%` }}
              />
              
              {/* Stage Milestone Dividers */}
              <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
                <div className="w-[1px] h-full bg-slate-800/80" style={{ left: '25%' }} />
                <div className="w-[1px] h-full bg-slate-800/80" style={{ left: '60%' }} />
                <div className="w-[1px] h-full bg-slate-800/80" style={{ left: '85%' }} />
              </div>
            </div>
          </div>

          {/* Controls Strip: Play/Pause, Timestamp, Speed, Sound & Action CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono-cyber text-slate-300">
            
            {/* Left Controls */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 sm:gap-2.5">
              
              <div className="flex items-center gap-1.5">
                {/* Play / Pause */}
                <button
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                    cyberSound.playClick();
                  }}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
                  title={isPlaying ? 'Pause Demo' : 'Play Demo'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                </button>

                {/* Replay */}
                <button
                  onClick={() => {
                    setProgress(0);
                    setIsPlaying(true);
                    cyberSound.playClick();
                  }}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95"
                  title="Restart Animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    cyberSound.playClick();
                  }}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center active:scale-95 ${
                    soundEnabled 
                      ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                  title={soundEnabled ? 'Mute Demo Audio' : 'Enable Demo Audio'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                {/* Timestamp Counter */}
                <div className="text-slate-400 text-[10px] sm:text-[11px] font-mono-cyber">
                  <span className="text-cyan-300 font-bold">{currentTimeSec}s</span> / 9.0s
                </div>

                {/* Playback Speed Multiplier */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.5, 2, 0.5];
                    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(nextSpeed);
                    cyberSound.playClick();
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[10px] sm:text-[11px] text-cyan-300 font-mono-cyber cursor-pointer min-h-[36px] flex items-center justify-center"
                  title="Adjust Playback Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Right Action CTA: Test in Live Analyzer */}
            {onAnalyzeUrl && (
              <button
                onClick={() => {
                  cyberSound.playScanStart();
                  onAnalyzeUrl(scenario.url);
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer group/cta min-h-[40px] active:scale-98"
              >
                <span>Run In Live Scanner</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
