import React, { useState } from 'react';
import { Shield, ShieldAlert, Sparkles, Terminal, ArrowRight, Eye, Code, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cyberSound } from '../utils/cyberSoundEffects';

interface ThreatSimulatorProps {
  onLoadScenario: (type: 'url' | 'message', content: string) => void;
}

interface AttackVector {
  id: string;
  title: string;
  category: 'URL Obfuscation' | 'Credential Deception' | 'Social Pressure' | 'Typosquatting';
  payload: string;
  type: 'url' | 'message';
  riskScore: number;
  highlightWords: string[];
  explanation: string;
  defenseTip: string;
}

const ATTACK_VECTORS: AttackVector[] = [
  {
    id: 'vec-subdomain',
    title: 'Deceptive Subdomain Cloaking',
    category: 'URL Obfuscation',
    payload: 'https://paypal.com.account-verification-service.xyz/signin',
    type: 'url',
    riskScore: 88,
    highlightWords: ['paypal.com', '.xyz'],
    explanation: 'Attackers place a trusted brand (paypal.com) inside subdomains, while the actual host is account-verification-service.xyz.',
    defenseTip: 'Always read domain names from right to left before the first single slash (/), ignoring subdomains.',
  },
  {
    id: 'vec-at-injection',
    title: 'Basic Auth @ Symbol Redirection',
    category: 'Credential Deception',
    payload: 'https://netflix.com@unauthorized-billing-portal.cc/update-card',
    type: 'url',
    riskScore: 94,
    highlightWords: ['netflix.com@', '.cc'],
    explanation: 'In standard URI syntax, everything before the @ symbol is treated as a username, secretly directing the victim to unauthorized-billing-portal.cc.',
    defenseTip: 'Never trust URLs containing an @ character before the path starts.',
  },
  {
    id: 'vec-typosquat',
    title: 'Homoglyph & Brand Typosquatting',
    category: 'Typosquatting',
    payload: 'https://bank0famerica-security-portal.top/login-secure',
    type: 'url',
    riskScore: 92,
    highlightWords: ['bank0famerica', '.top'],
    explanation: 'Substitutes letters with lookalike characters (0 instead of O) on suspicious low-cost TLDs (.top).',
    defenseTip: 'Bookmark your official financial portals and avoid clicking unverified links in texts.',
  },
  {
    id: 'vec-urgency-sms',
    title: 'High-Urgency SMS Extortion',
    category: 'Social Pressure',
    payload: 'FINAL NOTICE: Your IRS refund of $1,420 will expire in 2 hours. Submit SSN & direct deposit details immediately to claim: https://irs-tax-refund.online',
    type: 'message',
    riskScore: 95,
    highlightWords: ['FINAL NOTICE', 'expire in 2 hours', 'immediately', 'SSN'],
    explanation: 'Combines artificial countdown urgency, financial incentive, and sensitive credential harvesting.',
    defenseTip: 'Government agencies never demand personal information via SMS with tight deadlines.',
  },
];

export const ThreatSimulator: React.FC<ThreatSimulatorProps> = ({ onLoadScenario }) => {
  const [selectedVector, setSelectedVector] = useState<AttackVector>(ATTACK_VECTORS[0]);

  const handleSelectVector = (vector: AttackVector) => {
    setSelectedVector(vector);
    cyberSound.playClick();
  };

  const handleTestInScanner = () => {
    cyberSound.playScanStart();
    onLoadScenario(selectedVector.type, selectedVector.payload);
  };

  return (
    <section id="threat-lab" className="relative py-16 scroll-mt-20">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono-cyber text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>INTERACTIVE HEURISTIC LAB</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Anatomy of a Phishing Attack
          </h2>
          
          <p className="text-base text-slate-400 leading-relaxed font-normal">
            Explore common obfuscation techniques used by cybercriminals. Select a threat vector below to see how PhishShield AI dissects the payload.
          </p>
        </div>

        {/* Interactive Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Vector Selectors */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            {ATTACK_VECTORS.map((vec) => {
              const isSelected = selectedVector.id === vec.id;
              return (
                <button
                  key={vec.id}
                  onClick={() => handleSelectVector(vec)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-950/80 to-slate-900/90 border-purple-500/60 shadow-lg shadow-purple-950/50 scale-[1.02]'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-purple-500/30 hover:bg-slate-800/40'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    isSelected 
                      ? 'bg-purple-900/40 border-purple-400/50 text-purple-300' 
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                  }`}>
                    <ShieldAlert className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono-cyber text-purple-400 font-medium uppercase tracking-wider">
                        {vec.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono-cyber text-[10px] font-bold">
                        Risk {vec.riskScore}%
                      </span>
                    </div>

                    <h4 className="text-base font-semibold text-white font-display mt-0.5">
                      {vec.title}
                    </h4>

                    <p className="text-xs font-mono-cyber text-slate-400 truncate mt-1">
                      {vec.payload}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Holographic Dissection HUD */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 rounded-3xl bg-[#080e1e]/95 border border-purple-500/40 p-6 sm:p-8 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
              
              {/* Corner Sci-Fi Brackets */}
              <div className="absolute top-3 left-3 text-purple-400/40 font-mono-cyber text-xs select-none">⎡ HUD_LAB ⎤</div>
              <div className="absolute top-3 right-3 text-cyan-400/40 font-mono-cyber text-xs select-none">⎣ LIVE_DECON ⎦</div>

              <div className="space-y-6 pt-3">
                
                {/* HUD Top Meta */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono-cyber text-purple-300 uppercase tracking-wider font-semibold">
                      Heuristic Dissection Engine
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span>Malicious Pattern Identified</span>
                  </div>
                </div>

                {/* Target Payload Visualizer Box */}
                <div className="space-y-2">
                  <span className="text-xs font-mono-cyber text-slate-400 uppercase">Simulated Threat String</span>
                  <div className="p-4 rounded-xl bg-[#040711] border border-purple-500/30 font-mono-cyber text-sm text-slate-200 break-all leading-relaxed relative">
                    <span className="text-rose-400 font-bold bg-rose-950/40 px-1 py-0.5 rounded border border-rose-500/30 mr-1.5">
                      PAYLOAD:
                    </span>
                    {selectedVector.payload}
                  </div>
                </div>

                {/* Heuristic Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Explanation Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase font-mono-cyber">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>How the Deception Works</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedVector.explanation}
                    </p>
                  </div>

                  {/* Defense Tip Card */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase font-mono-cyber">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Heuristic Rule & Defense</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedVector.defenseTip}
                    </p>
                  </div>

                </div>

              </div>

              {/* Action Trigger Button */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono-cyber text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Ready to inject into live analysis pipeline</span>
                </div>

                <button
                  onClick={handleTestInScanner}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs font-mono-cyber uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Scan This Payload in Terminal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
