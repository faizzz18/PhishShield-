import React, { useEffect, useState } from 'react';
import { Shield, Check, Loader2, Cpu, Terminal, Sparkles, Activity, Radio } from 'lucide-react';
import { cyberSound } from '../utils/cyberSoundEffects';

interface ScanningStateProps {
  targetType: 'url' | 'message';
  targetValue: string;
}

interface StepItem {
  id: number;
  label: string;
  detail: string;
}

export const ScanningState: React.FC<ScanningStateProps> = ({ targetType, targetValue }) => {
  const steps: StepItem[] = [
    { id: 1, label: 'Checking URL structure', detail: 'Parsing RFC3986 tokens, scheme security, host legitimacy...' },
    { id: 2, label: 'Detecting suspicious keywords', detail: 'Scanning lexical dictionaries for credential & urgency bait...' },
    { id: 3, label: 'Analyzing domain patterns', detail: 'Evaluating TLD reputation, entropy scoring, subdomain nesting...' },
    { id: 4, label: 'Checking social engineering language', detail: 'Extracting psychological pressure tactics and coercive triggers...' },
    { id: 5, label: 'Calculating risk score', detail: 'Aggregating heuristic neural weights and compiling verdict...' },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'INIT: Neural Threat Engine Initialized [v4.8.2]',
    `TARGET_ACQUIRED: [${targetType.toUpperCase()}] ${targetValue.slice(0, 48)}${targetValue.length > 48 ? '...' : ''}`,
  ]);

  useEffect(() => {
    // Step progression timer
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length) {
          const next = prev + 1;
          cyberSound.playClick();
          const logMessages = [
            'LEXICAL_PARSER: Tokenizing protocol components...',
            'DNS_HEURISTICS: Checking domain entropy and registrar patterns...',
            'NLP_CLASSIFIER: Detecting coercive urgency phrasing...',
            'REPUTATION_ENGINE: Cross-referencing known phishing vectors...',
            'VERDICT_SYNTHESIS: Finalizing threat risk matrix [0-100]...',
          ];
          if (logMessages[prev]) {
            setTelemetryLogs((logs) => [...logs, logMessages[prev]]);
          }
          return next;
        }
        return prev;
      });
    }, 450);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  return (
    <div className="relative my-8 max-w-4xl mx-auto rounded-3xl bg-[#070e20]/95 border border-cyan-400/40 p-6 sm:p-10 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* Animated Laser Scanning Line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-scan shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none" />

      {/* Header Status */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-800">
        <div className="relative p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <Cpu className="w-4 h-4 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            PhishShield AI is analyzing potential threats...
          </h3>
          <p className="text-xs sm:text-sm text-cyan-400/90 font-mono-cyber mt-1 flex items-center justify-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-300" />
            <span>Running 10+ Heuristic Security Checkpoints</span>
          </p>
        </div>

        {/* Target Preview Snippet */}
        <div className="w-full max-w-lg px-4 py-2 rounded-xl bg-[#040711] border border-slate-800 text-xs font-mono-cyber text-slate-300 truncate">
          <span className="text-slate-500 mr-2">Target:</span>
          <span className="text-cyan-300">{targetValue}</span>
        </div>
      </div>

      {/* Animated Step List */}
      <div className="py-6 space-y-3">
        {steps.map((step, idx) => {
          const isDone = currentStepIndex > idx;
          const isCurrent = currentStepIndex === idx;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400/60 text-cyan-200 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/30 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono-cyber transition-all ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                      : 'bg-slate-800 text-slate-600 border border-slate-700'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>

                <div>
                  <span className="text-sm font-semibold font-display tracking-wide">
                    {step.label}
                  </span>
                  <p className="text-[11px] font-mono-cyber opacity-75 hidden sm:block">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Status State */}
              <div className="text-xs font-mono-cyber shrink-0">
                {isDone && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>PASSED</span>
                  </span>
                )}
                {isCurrent && (
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>SCANNING</span>
                  </span>
                )}
                {!isDone && !isCurrent && (
                  <span className="text-slate-600">QUEUED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Live Telemetry Feed */}
      <div className="mt-2 p-3.5 rounded-xl bg-[#03060f] border border-slate-800/80 font-mono-cyber text-[11px] text-slate-400 space-y-1 overflow-hidden">
        <div className="flex items-center justify-between pb-1 text-slate-500 border-b border-slate-800/60">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>AI SCAN STREAM TELEMETRY</span>
          </span>
          <span className="text-cyan-400 animate-pulse">LIVE</span>
        </div>
        <div className="space-y-0.5 pt-1 max-h-24 overflow-y-auto">
          {telemetryLogs.map((log, i) => (
            <div key={i} className="text-slate-400 truncate">
              <span className="text-cyan-500 mr-1.5">›</span>
              {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

