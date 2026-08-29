import React from 'react';
import { Shield, Lock, Eye, AlertOctagon, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 border-t border-slate-800/80 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-300">
              <Shield className="w-3.5 h-3.5" />
              <span>ABOUT PHISHSHIELD AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Democratizing Enterprise-Grade Threat Intelligence
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Phishing attacks and social engineering schemes are becoming exponentially sophisticated, bypassing traditional spam filters through zero-day domain registrations, typosquatting, and high-pressure psychological manipulation.
            </p>

            <p className="text-base text-slate-300 leading-relaxed">
              PhishShield AI was engineered to bridge the gap between everyday internet users and cybersecurity professionals—delivering instantaneous, transparent heuristic assessments before you click a deceptive link or surrender confidential credentials.
            </p>

            {/* Checklist Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white text-sm">Real-time Heuristic Pattern Recognition</span>
                  <p className="text-xs text-slate-400">Evaluates URL syntax anomalies, character substitution, and domain entropy on the fly.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white text-sm">Psychological Coercion Detection</span>
                  <p className="text-xs text-slate-400">Flags artificial urgency, fear triggers, and credential harvesting requests in emails & SMS.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white text-sm">Strict Zero-Log Privacy Safeguards</span>
                  <p className="text-xs text-slate-400">Analyzed URLs and messages are processed ephemerally with zero permanent telemetry logging.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Cyber Threat Intelligence Visualizer */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080f22] border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono-cyber font-bold text-slate-200 uppercase">
                    Security Manifesto
                  </span>
                </div>
                <span className="text-[10px] font-mono-cyber text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  SHIELD PROTOCOL ACTIVE
                </span>
              </div>

              <div className="space-y-4 font-mono-cyber text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-cyan-400 font-semibold mb-1">01. Never Trust Blind Links</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Over 88% of credential compromises stem from deceptively crafted domains disguised as official customer portals.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-purple-400 font-semibold mb-1">02. Spot the Artificial Pressure</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Scammers deliberately induce panic with false deadlines (&quot;Your account will be closed in 2 hours&quot;) to short-circuit critical thinking.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-emerald-400 font-semibold mb-1">03. Guard 2FA &amp; Passwords</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Legitimate banking institutions and service providers will never request one-time SMS verification codes via inbound phone or text.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
