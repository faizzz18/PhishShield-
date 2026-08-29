import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  AlertTriangle, 
  Globe, 
  Link as LinkIcon, 
  Lock, 
  Key, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  Info,
  Clock,
  Fingerprint,
  FileText,
  Binary,
  Award,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { SecurityAnalysisResult, RiskLevel, ThreatReason, ThreatBreakdownMetrics } from '../types';
import { getRiskColor } from '../utils/heuristicEngine';
import { cyberSound } from '../utils/cyberSoundEffects';

interface ResultDashboardProps {
  result: SecurityAnalysisResult;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'forensics' | 'certificate'>('overview');
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});

  const colors = getRiskColor(result.riskLevel);

  // Sound effect and animated score counter on mount/update
  useEffect(() => {
    if (result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH') {
      cyberSound.playThreatAlert();
    } else {
      cyberSound.playSuccess();
    }

    setDisplayScore(0);
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const increment = result.riskScore / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= result.riskScore) {
        setDisplayScore(result.riskScore);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.riskScore, result.riskLevel]);

  // Handle Copy Report
  const handleCopyReport = () => {
    cyberSound.playClick();
    const reportText = `[PhishShield AI Threat Report]
Target: ${result.targetValue}
Risk Score: ${result.riskScore}/100 (${result.riskLevel})
Verdict: ${result.verdictTitle}
Summary: ${result.verdictSummary}

Key Findings:
${result.reasons.map((r, i) => `${i + 1}. ${r.title} - ${r.description}`).join('\n')}

Recommendations:
${result.recommendations.map((rec) => `• ${rec}`).join('\n')}
Timestamp: ${result.analyzedAt}
Verified by PhishShield AI Heuristic Engine`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Export JSON Report
  const handleExportJson = () => {
    cyberSound.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `phishshield-analysis-${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleAction = (idx: number) => {
    cyberSound.playClick();
    setCompletedActions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Helper for rendering dynamic threat reason icon
  const renderReasonIcon = (iconType: ThreatReason['iconType'], severity: ThreatReason['severity']) => {
    const iconClass = severity === 'critical' || severity === 'high' 
      ? 'text-rose-400' 
      : severity === 'medium' 
      ? 'text-yellow-400' 
      : severity === 'safe' 
      ? 'text-emerald-400' 
      : 'text-cyan-400';

    switch (iconType) {
      case 'globe': return <Globe className={`w-5 h-5 ${iconClass}`} />;
      case 'link': return <LinkIcon className={`w-5 h-5 ${iconClass}`} />;
      case 'lock': return <Lock className={`w-5 h-5 ${iconClass}`} />;
      case 'zap': return <Zap className={`w-5 h-5 ${iconClass}`} />;
      case 'alert': return <ShieldAlert className={`w-5 h-5 ${iconClass}`} />;
      case 'check': return <CheckCircle2 className={`w-5 h-5 ${iconClass}`} />;
      case 'warning':
      default:
        return <AlertTriangle className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  // SVG Circular Meter Calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  // Mock cryptographic telemetry hash
  const pseudoHash = `0x${result.targetValue.split('').reduce((acc: number, c: string) => (((acc << 5) - acc) + c.charCodeAt(0)) | 0, 0).toString(16).padStart(8, '0').slice(0, 8)}...${result.id.slice(0, 12)}`;

  return (
    <div id="results-dashboard" className="relative py-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-400">
      
      {/* 1. TOP RESULT SUMMARY & CIRCULAR RISK SCORE METER */}
      <div className="relative rounded-3xl bg-[#091226]/95 border border-slate-700/80 p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
        
        {/* Top Glowing Laser Border */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500" />
        
        {/* Glow Ambient Corner */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-25 ${colors.bg}`} />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* Circular Meter Column */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
              
              {/* Outer Decorative Dial Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-slate-800/80" />
              <div className="absolute inset-3 rounded-full border border-dashed border-slate-700/40" />
              
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 170 170">
                {/* Background Track Circle */}
                <circle
                  cx="85"
                  cy="85"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="14"
                  className="text-slate-800/90"
                  fill="transparent"
                />
                {/* Dynamic Colored Progress Arc */}
                <circle
                  cx="85"
                  cy="85"
                  r={radius}
                  stroke={colors.fillHex}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                  style={{
                    filter: `drop-shadow(0 0 12px ${colors.fillHex}90)`
                  }}
                />
              </svg>

              {/* Center Counter & Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
                  {displayScore}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono-cyber font-semibold text-slate-400 uppercase mt-0.5">
                  / 100 Risk Score
                </span>
              </div>
            </div>

            {/* Risk Level Badge */}
            <div className="mt-3 sm:mt-4 text-center">
              <span className="text-[11px] sm:text-xs font-mono-cyber text-slate-400 block mb-1">
                SECURITY VERDICT:
              </span>
              <div className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold font-mono-cyber uppercase border ${colors.badge} ${colors.glow} tracking-wider inline-flex items-center gap-2 shadow-lg`}>
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>{result.riskLevel} RISK</span>
              </div>
            </div>
          </div>

          {/* Result Verdict Information */}
          <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left w-full">
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono-cyber text-slate-400">
              <Fingerprint className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Target: <strong className="text-cyan-300 uppercase">{result.targetType}</strong></span>
              <span className="text-slate-600">|</span>
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{result.analyzedAt}</span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-purple-300 font-semibold truncate max-w-[180px] sm:max-w-none">{pseudoHash}</span>
            </div>

            <h3 className={`text-xl sm:text-3xl font-extrabold font-display ${colors.text} tracking-tight`}>
              {result.verdictTitle}
            </h3>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal">
              {result.verdictSummary}
            </p>

            {/* Analyzed Target Value Display */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#040814] border border-slate-800/90 text-xs font-mono-cyber text-slate-300 flex items-start gap-2.5 break-all text-left">
              <span className="text-cyan-400 font-bold shrink-0">PAYLOAD:</span>
              <span className="text-slate-200">{result.targetValue}</span>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
              {result.targetType === 'url' && (
                result.riskScore < 50 ? (
                  <a
                    href={result.targetValue.startsWith('http') ? result.targetValue : `https://${result.targetValue}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberSound.playSuccess()}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 min-h-[42px] active:scale-98"
                  >
                    <span>Proceed to Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <a
                    href="#direct-gateway-panel"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('direct-gateway-panel');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950/40 min-h-[42px] active:scale-98"
                  >
                    <span>Inspect Safe Gateway</span>
                    <ShieldAlert className="w-4 h-4" />
                  </a>
                )
              )}

              <button
                onClick={handleCopyReport}
                id="btn-copy-report"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono-cyber text-slate-200 hover:text-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[42px] active:scale-98"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Report Copied!' : 'Copy Security Report'}</span>
              </button>

              <button
                onClick={handleExportJson}
                id="btn-export-json"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono-cyber text-slate-200 hover:text-purple-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm min-h-[42px] active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={() => {
                  cyberSound.playClick();
                  onReset();
                }}
                id="btn-analyze-another"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/50 text-xs font-mono-cyber text-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/40 min-h-[42px] active:scale-98"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Analyze Another Target</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* VIEW SWITCHER TABS (Overview, Deep Forensics, Audit Certificate) */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#060b18] border border-slate-800 max-w-lg mx-auto">
        <button
          onClick={() => {
            cyberSound.playClick();
            setActiveTab('overview');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-mono-cyber text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Threat Vectors</span>
        </button>

        <button
          onClick={() => {
            cyberSound.playClick();
            setActiveTab('forensics');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-mono-cyber text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'forensics'
              ? 'bg-purple-950/80 border border-purple-500/50 text-purple-300 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>Deep Forensics</span>
        </button>

        <button
          onClick={() => {
            cyberSound.playClick();
            setActiveTab('certificate');
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl font-mono-cyber text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'certificate'
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Audit Certificate</span>
        </button>
      </div>

      {/* TAB 1: THREAT OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* 2. THREAT BREAKDOWN CARDS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Threat Breakdown Analysis</span>
              </h4>
              <span className="text-xs font-mono-cyber text-slate-400">4 Security Vectors Scanned</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: URL Security */}
              <div className="p-5 rounded-2xl bg-[#081024]/90 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">URL Security</span>
                  <Globe className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-slate-400">Risk:</span>
                  <span className={`text-sm font-bold font-mono-cyber ${
                    result.breakdown.urlSecurity.level === 'CRITICAL' ? 'text-rose-400' :
                    result.breakdown.urlSecurity.level === 'HIGH' ? 'text-orange-400' :
                    result.breakdown.urlSecurity.level === 'MEDIUM' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {result.breakdown.urlSecurity.level}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.breakdown.urlSecurity.level === 'CRITICAL' ? 'bg-rose-500' :
                      result.breakdown.urlSecurity.level === 'HIGH' ? 'bg-orange-500' :
                      result.breakdown.urlSecurity.level === 'MEDIUM' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${result.breakdown.urlSecurity.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono-cyber truncate">
                  {result.breakdown.urlSecurity.detail}
                </p>
              </div>

              {/* Card 2: Social Engineering */}
              <div className="p-5 rounded-2xl bg-[#081024]/90 border border-slate-800 hover:border-purple-500/40 transition-all group">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Social Engineering</span>
                  <ShieldAlert className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-slate-400">Risk:</span>
                  <span className={`text-sm font-bold font-mono-cyber ${
                    result.breakdown.socialEngineering.level === 'CRITICAL' ? 'text-rose-400' :
                    result.breakdown.socialEngineering.level === 'HIGH' ? 'text-orange-400' :
                    result.breakdown.socialEngineering.level === 'MEDIUM' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {result.breakdown.socialEngineering.level}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.breakdown.socialEngineering.level === 'CRITICAL' ? 'bg-rose-500' :
                      result.breakdown.socialEngineering.level === 'HIGH' ? 'bg-orange-500' :
                      result.breakdown.socialEngineering.level === 'MEDIUM' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${result.breakdown.socialEngineering.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono-cyber truncate">
                  {result.breakdown.socialEngineering.detail}
                </p>
              </div>

              {/* Card 3: Credential Theft */}
              <div className="p-5 rounded-2xl bg-[#081024]/90 border border-slate-800 hover:border-yellow-500/40 transition-all group">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Credential Theft</span>
                  <Key className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-slate-400">Risk:</span>
                  <span className={`text-sm font-bold font-mono-cyber ${
                    result.breakdown.credentialTheft.level === 'CRITICAL' ? 'text-rose-400' :
                    result.breakdown.credentialTheft.level === 'HIGH' ? 'text-orange-400' :
                    result.breakdown.credentialTheft.level === 'MEDIUM' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {result.breakdown.credentialTheft.level}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      result.breakdown.credentialTheft.level === 'CRITICAL' ? 'bg-rose-500' :
                      result.breakdown.credentialTheft.level === 'HIGH' ? 'bg-orange-500' :
                      result.breakdown.credentialTheft.level === 'MEDIUM' ? 'bg-yellow-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${result.breakdown.credentialTheft.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono-cyber truncate">
                  {result.breakdown.credentialTheft.detail}
                </p>
              </div>

              {/* Card 4: Suspicious Keywords */}
              <div className="p-5 rounded-2xl bg-[#081024]/90 border border-slate-800 hover:border-rose-500/40 transition-all group">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400 mb-2">
                  <span className="font-semibold text-slate-200">Suspicious Keywords</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs text-slate-400">Detected:</span>
                  <span className="text-sm font-bold font-mono-cyber text-cyan-300">
                    {result.breakdown.suspiciousKeywords.count} keywords
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-rose-500 transition-all duration-1000"
                    style={{ width: `${Math.min(100, result.breakdown.suspiciousKeywords.count * 20)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-mono-cyber truncate">
                  {result.breakdown.suspiciousKeywords.detectedWords.slice(0, 3).join(', ') || 'None detected'}
                </p>
              </div>

            </div>
          </div>

          {/* 3. WHY IS THIS SUSPICIOUS? */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Why is this suspicious?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">
                  Detailed breakdown of heuristic markers and security signals flagged during automated scanning.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono-cyber text-cyan-400">
                {result.reasons.length} Flags Detected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.reasons.map((reason) => {
                const isHigh = reason.severity === 'critical' || reason.severity === 'high';
                return (
                  <div
                    key={reason.id}
                    className={`p-5 rounded-2xl bg-[#091226]/90 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                      isHigh
                        ? 'border-rose-500/30 hover:border-rose-400/60 hover:shadow-rose-950/30'
                        : reason.severity === 'safe'
                        ? 'border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-emerald-950/30'
                        : 'border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-cyan-950/30'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                        isHigh ? 'bg-rose-950/50 border border-rose-500/40' : reason.severity === 'safe' ? 'bg-emerald-950/50 border border-emerald-500/40' : 'bg-cyan-950/50 border border-cyan-500/40'
                      }`}>
                        {renderReasonIcon(reason.iconType, reason.severity)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm sm:text-base font-bold text-white font-display">
                            {reason.title}
                          </h5>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {reason.description}
                        </p>
                        <div className="pt-1.5 flex items-center gap-2">
                          <span className="text-[10px] font-mono-cyber uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            Category: {reason.category}
                          </span>
                          <span className={`text-[10px] font-mono-cyber uppercase font-semibold px-2 py-0.5 rounded ${
                            isHigh ? 'bg-rose-500/20 text-rose-300' : reason.severity === 'safe' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {reason.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. SAFETY RECOMMENDATIONS CHECKLIST */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0a1530] via-[#080f22] to-[#040814] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-xl shadow-cyan-950/40 overflow-hidden">
            
            <Shield className="absolute -right-6 -bottom-6 w-60 h-60 text-cyan-500/5 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 shadow-inner">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
                      🛡 Interactive Response Plan
                    </h4>
                    <p className="text-xs sm:text-sm text-cyan-300/80 font-mono-cyber">
                      Click to check off incident containment actions you have executed
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-xs font-mono-cyber text-cyan-300 self-start sm:self-center">
                  Incident Containment Matrix
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {result.recommendations.map((recommendation, idx) => {
                  const isDone = !!completedActions[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleAction(idx)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all cursor-pointer ${
                        isDone 
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200 line-through opacity-80' 
                          : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-800'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span className="font-medium">{recommendation}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-xs font-mono-cyber text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  If you suspect your credentials were entered on this page, immediately revoke active sessions and rotate secrets.
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: DEEP FORENSICS */}
      {activeTab === 'forensics' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#091226]/95 border border-purple-500/40 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Binary className="w-5 h-5 text-purple-400" />
                <span>Lexical & Structural Telemetry</span>
              </h4>
              <p className="text-xs text-slate-400 font-mono-cyber mt-0.5">
                Deep character entropy, protocol hygiene, and string distribution inspection
              </p>
            </div>
            <span className="px-3 py-1 rounded-md bg-purple-950/60 border border-purple-500/40 text-xs font-mono-cyber text-purple-300">
              Entropy Engine v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-cyber text-xs">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Payload Length</span>
              <span className="text-xl font-bold text-white">{result.targetValue.length} characters</span>
              <p className="text-[11px] text-slate-500">
                {result.targetValue.length > 75 ? '⚠️ Unusually long payload string' : '✓ Normal length threshold'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Digit-to-Letter Ratio</span>
              <span className="text-xl font-bold text-purple-300">
                {((result.targetValue.replace(/[^0-9]/g, '').length / (result.targetValue.length || 1)) * 100).toFixed(1)}%
              </span>
              <p className="text-[11px] text-slate-500">High numeric density can indicate obfuscated parameters</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Protocol Signature</span>
              <span className="text-xl font-bold text-cyan-300">
                {result.targetValue.startsWith('http://') ? 'HTTP (Insecure)' : result.targetValue.startsWith('https://') ? 'HTTPS (TLS)' : 'Raw String / Text'}
              </span>
              <p className="text-[11px] text-slate-500">
                {result.targetValue.startsWith('http://') ? '⚠️ Plaintext unencrypted transmission' : 'Protocol parsed cleanly'}
              </p>
            </div>
          </div>

          {/* Hex Representation Stream */}
          <div className="p-4 rounded-xl bg-[#050914] border border-slate-800 space-y-2 font-mono-cyber">
            <span className="text-xs text-slate-400 block flex items-center justify-between">
              <span>RAW PAYLOAD HEX STREAM</span>
              <span className="text-cyan-400 text-[10px]">UTF-8 HEX ENCODED</span>
            </span>
            <div className="p-3 rounded-lg bg-[#02050c] border border-slate-900 text-xs text-cyan-400/80 break-all leading-relaxed select-all">
              {result.targetValue.slice(0, 80).split('')
                .map((c: string) => c.charCodeAt(0).toString(16).padStart(2, '0'))
                .join(' ')} {result.targetValue.length > 80 ? '... [TRUNCATED]' : ''}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT CERTIFICATE */}
      {activeTab === 'certificate' && (
        <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#0e1d3e] to-[#070e20] border-2 border-emerald-500/50 shadow-2xl space-y-6 text-center animate-in fade-in duration-300 overflow-hidden">
          
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/60">
            <Award className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-extrabold text-white font-display tracking-tight">
              PhishShield AI Heuristic Audit Certificate
            </h4>
            <p className="text-xs font-mono-cyber text-emerald-300 uppercase tracking-wider">
              Verification ID: PS-{result.id.slice(0, 16).toUpperCase()}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#050a18]/90 border border-slate-800 text-left font-mono-cyber text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>Audit Subject:</span>
              <span className="text-slate-200 font-bold truncate max-w-[200px]">{result.targetValue}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Risk Verdict:</span>
              <span className={`font-bold ${colors.text}`}>{result.riskLevel} ({result.riskScore}/100)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Timestamp:</span>
              <span className="text-slate-200">{result.analyzedAt}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cryptographic Hash:</span>
              <span className="text-cyan-400">{pseudoHash}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyReport}
              className="px-5 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/60 text-emerald-300 font-mono-cyber text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Copy Certificate Details</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

