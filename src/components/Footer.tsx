import React, { useState } from 'react';
import { Shield, ShieldAlert, Cpu, Lock, Github, Twitter, Linkedin, Heart, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <footer className="relative bg-[#040711] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      
      {/* Decorative Grid Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-400/40 p-2 shadow-lg shadow-cyan-500/10">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  PhishShield
                </span>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-display">
                  AI
                </span>
              </div>
            </div>

            <p className="text-sm font-display italic text-cyan-300 font-medium">
              &ldquo;Detect threats before they detect you.&rdquo;
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-powered heuristic security engine protecting users against deceptive URLs, spoofed authentication portals, and malicious social engineering messages.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-cyber uppercase font-bold text-slate-200 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-cyan-300 transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
              </li>
              <li>
                <button 
                  onClick={() => setPrivacyModalOpen(true)}
                  className="hover:text-cyan-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy &amp; Ethics
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Threat Hotline Info */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-cyber uppercase font-bold text-slate-200 tracking-wider">
              Security Protocol
            </h4>
            <div className="p-4 rounded-2xl bg-[#070e20] border border-slate-800 text-xs font-mono-cyber text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Retention Architecture</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Inputs analyzed by PhishShield AI are processed strictly in volatile memory. No client URLs or message contents are stored in permanent telemetry databases.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono-cyber text-center md:text-left">
          
          {/* Mandatory Disclaimer */}
          <p className="max-w-2xl text-[11px] text-slate-400 leading-relaxed">
            <span className="text-slate-300 font-semibold">Disclaimer:</span> PhishShield AI provides heuristic risk analysis and should not be considered a guarantee of website or message safety. Always exercise caution when interacting with unknown digital sources.
          </p>

          <div className="shrink-0 text-slate-400">
            © {new Date().getFullYear()} PhishShield AI. All rights reserved.
          </div>

        </div>

      </div>

      {/* Privacy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-lg w-full rounded-3xl bg-[#091122] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">Privacy &amp; Data Ethics</h3>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono-cyber cursor-pointer"
              >
                ESC / CLOSE
              </button>
            </div>

            <div className="text-xs font-mono-cyber text-slate-300 space-y-3 leading-relaxed max-h-80 overflow-y-auto pr-2">
              <p>
                <strong className="text-cyan-300">1. Ephemeral Processing:</strong> We do not log, persist, or resell any URLs or text messages entered into the analysis terminal.
              </p>
              <p>
                <strong className="text-cyan-300">2. Real-Time Heuristics:</strong> Pattern matching and threat checks execute on sandboxed instances with automated memory cleanup cycles.
              </p>
              <p>
                <strong className="text-cyan-300">3. Non-Intrusive Scanning:</strong> The system does not execute suspicious binaries or trigger malicious JavaScript payloads on client devices.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs font-mono-cyber font-bold hover:bg-cyan-900 transition-colors cursor-pointer"
              >
                Understood &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
