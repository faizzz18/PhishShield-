import React, { useState } from 'react';
import { Globe, MessageSquare, Search, Shield, Sparkles, Clipboard, Trash2, ArrowRight, AlertCircle, Activity, Cpu, Terminal, Check } from 'lucide-react';
import { DEFAULT_URL_SAMPLES, DEFAULT_MESSAGE_SAMPLES } from '../utils/heuristicEngine';
import { PresetSample } from '../types';
import { cyberSound } from '../utils/cyberSoundEffects';

interface AnalyzerTerminalProps {
  onAnalyze: (type: 'url' | 'message', input: string) => void;
  isAnalyzing: boolean;
}

export const AnalyzerTerminal: React.FC<AnalyzerTerminalProps> = ({ onAnalyze, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<'url' | 'message'>('url');
  const [urlInput, setUrlInput] = useState<string>('https://example-login-secure.xyz/account/verify?token=84892');
  const [messageInput, setMessageInput] = useState<string>(
    'URGENT! Your account will be blocked. Verify your account immediately by clicking the link below: https://secure-bank-verify-login.xyz/account'
  );
  const [inputError, setInputError] = useState<string | null>(null);

  const handleUrlSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) {
      setInputError('Please enter a URL to analyze.');
      cyberSound.playThreatAlert();
      return;
    }
    setInputError(null);
    cyberSound.playScanStart();
    onAnalyze('url', urlInput.trim());
  };

  const handleMessageSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) {
      setInputError('Please paste or type a suspicious message to analyze.');
      cyberSound.playThreatAlert();
      return;
    }
    setInputError(null);
    cyberSound.playScanStart();
    onAnalyze('message', messageInput.trim());
  };

  const handlePasteClipboard = async (type: 'url' | 'message') => {
    cyberSound.playClick();
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          if (type === 'url') setUrlInput(text.trim());
          else setMessageInput(text.trim());
          setInputError(null);
        }
      }
    } catch {
      // restricted in some iframe contexts
    }
  };

  const handleClear = (type: 'url' | 'message') => {
    cyberSound.playClick();
    if (type === 'url') setUrlInput('');
    else setMessageInput('');
  };

  const handleSelectSample = (sample: PresetSample) => {
    cyberSound.playClick();
    if (sample.type === 'url') {
      setUrlInput(sample.value);
    } else {
      setMessageInput(sample.value);
    }
    setInputError(null);
  };

  // Quick live heuristic indicator metrics
  const activeInput = activeTab === 'url' ? urlInput : messageInput;
  const hasAtSymbol = activeInput.includes('@');
  const hasSuspiciousTld = /\.(xyz|top|work|click|country|kim|info|cc|live|online|bar|pw)\b/i.test(activeInput);
  const hasUrgencyWord = /(urgent|immediate|blocked|suspended|terminate|24 hours|verify your account|password|action required)/i.test(activeInput);

  return (
    <section id="analyzer-section" className="relative py-12 scroll-mt-20">
      
      {/* Decorative Cyber Rings */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Glassmorphism Terminal Card */}
        <div className="relative rounded-3xl bg-[#091122]/95 border border-cyan-500/35 p-4 sm:p-8 md:p-10 shadow-2xl shadow-cyan-950/70 backdrop-blur-2xl overflow-hidden transition-all duration-300">
          
          {/* Top Neon Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-purple-500" />
          
          {/* Corner Cyber Brackets */}
          <div className="absolute top-3 left-4 text-cyan-500/40 font-mono-cyber text-[10px] select-none tracking-widest hidden xs:block">
            [SYS_TERMINAL_INPUT]
          </div>
          <div className="absolute top-3 right-4 text-cyan-500/40 font-mono-cyber text-[10px] select-none tracking-widest hidden sm:block">
            BUFFER: 4096KB | HEURISTIC: ENGAGED
          </div>

          {/* Terminal Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-7 border-b border-slate-800/80 pt-1 sm:pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono-cyber text-cyan-300 mb-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>HEURISTIC THREAT SCANNER</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-white font-display tracking-tight">
                Security Threat Analyzer
              </h2>
              <p className="text-xs sm:text-base text-slate-400 mt-1 max-w-2xl font-normal leading-relaxed">
                Directly inspect any website, URL, or suspicious message. PhishShield AI auto-analyzes the target and provides a safe, quarantined pass-through gateway.
              </p>
            </div>

            {/* Quick Status Badge */}
            <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono-cyber text-slate-300 self-start sm:self-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Engine: <strong className="text-cyan-300">Ready</strong></span>
              <span className="text-slate-600">|</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          {/* Mode Selector Tabs (Large Cyber Tabs) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#060b18] border border-slate-800/90 my-5 sm:my-8">
            
            {/* Tab: URL */}
            <button
              onClick={() => {
                setActiveTab('url');
                setInputError(null);
                cyberSound.playClick();
              }}
              id="tab-analyze-url"
              className={`flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl font-display font-semibold text-xs sm:text-base transition-all duration-300 cursor-pointer min-h-[44px] active:scale-98 ${
                activeTab === 'url'
                  ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border border-cyan-400/60 text-cyan-200 shadow-lg shadow-cyan-500/15'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
              }`}
            >
              <Globe className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'url' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>Analyze URL</span>
            </button>

            {/* Tab: Message */}
            <button
              onClick={() => {
                setActiveTab('message');
                setInputError(null);
                cyberSound.playClick();
              }}
              id="tab-analyze-message"
              className={`flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl font-display font-semibold text-xs sm:text-base transition-all duration-300 cursor-pointer min-h-[44px] active:scale-98 ${
                activeTab === 'message'
                  ? 'bg-gradient-to-r from-purple-950/90 to-blue-950/90 border border-purple-400/60 text-purple-200 shadow-lg shadow-purple-500/15'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
              }`}
            >
              <MessageSquare className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'message' ? 'text-purple-400' : 'text-slate-500'}`} />
              <span>Analyze Message</span>
            </button>

          </div>

          {/* URL Tab Content */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
                  <label htmlFor="url-input" className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <span>Target URL or Domain</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePasteClipboard('url')}
                      className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Clipboard className="w-3 h-3" />
                      <span>Paste</span>
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleClear('url')}
                      className="hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                {/* Large Input Field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>

                  <input
                    id="url-input"
                    type="text"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="Paste suspicious URL here... Example: https://secure-login-verify.xyz/account"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#060b18] border border-cyan-500/35 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm sm:text-base font-mono-cyber transition-all duration-200"
                    disabled={isAnalyzing}
                  />
                </div>

                {/* Live Input Telemetry Badge Indicators */}
                {urlInput.trim().length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-cyber text-[11px]">
                    <span className="text-slate-500">Live Signals:</span>
                    {hasSuspiciousTld && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        ⚠ High-Risk TLD detected
                      </span>
                    )}
                    {hasAtSymbol && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ⚠ @ Symbol userinfo detected
                      </span>
                    )}
                    <span className="text-slate-400 ml-auto">
                      Length: {urlInput.length} chars
                    </span>
                  </div>
                )}

                {inputError && (
                  <p className="text-xs text-rose-400 font-mono-cyber flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{inputError}</span>
                  </p>
                )}
              </div>

              {/* Quick Example Chips */}
              <div className="space-y-2">
                <span className="text-xs font-mono-cyber text-slate-400 uppercase tracking-wider block">
                  Quick Test Examples:
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_URL_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-cyber border transition-all cursor-pointer flex items-center gap-1.5 ${
                        urlInput === sample.value
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20 scale-[1.02]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate max-w-[200px] sm:max-w-none">{sample.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        sample.expectedRisk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : sample.expectedRisk === 'HIGH' ? 'bg-orange-500/20 text-orange-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {sample.expectedRisk}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Glowing Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-analyze-url"
                  disabled={isAnalyzing}
                  className="w-full py-4 px-8 rounded-2xl font-display font-bold text-base sm:text-lg text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:from-cyan-300 hover:to-sky-200 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <Search className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>🔍 Run Deep URL Analysis</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          )}

          {/* Message Tab Content */}
          {activeTab === 'message' && (
            <form onSubmit={handleMessageSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
                  <label htmlFor="message-input" className="flex items-center gap-1.5 text-purple-300 font-semibold">
                    <span>Message Body (Email, SMS, Chat)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePasteClipboard('message')}
                      className="hover:text-purple-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Clipboard className="w-3 h-3" />
                      <span>Paste</span>
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleClear('message')}
                      className="hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                {/* Large Textarea */}
                <div className="relative">
                  <textarea
                    id="message-input"
                    rows={4}
                    value={messageInput}
                    onChange={(e) => {
                      setMessageInput(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="Paste suspicious email, SMS or message here... Example: URGENT! Your account will be blocked. Verify your account immediately by clicking the link below."
                    className="w-full p-4 rounded-2xl bg-[#060b18] border border-purple-500/35 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 text-sm sm:text-base font-mono-cyber transition-all duration-200 resize-y"
                    disabled={isAnalyzing}
                  />
                </div>

                {/* Live Message Telemetry Indicators */}
                {messageInput.trim().length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono-cyber text-[11px]">
                    <span className="text-slate-500">Live Signals:</span>
                    {hasUrgencyWord && (
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        ⚠ Coercive Urgency Pattern
                      </span>
                    )}
                    {hasSuspiciousTld && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        ⚠ Embedded Suspicious Link TLD
                      </span>
                    )}
                    <span className="text-slate-400 ml-auto">
                      Words: {messageInput.trim().split(/\s+/).length} | Chars: {messageInput.length}
                    </span>
                  </div>
                )}

                {inputError && (
                  <p className="text-xs text-rose-400 font-mono-cyber flex items-center gap-1.5 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{inputError}</span>
                  </p>
                )}
              </div>

              {/* Quick Message Scenario Chips */}
              <div className="space-y-2">
                <span className="text-xs font-mono-cyber text-slate-400 uppercase tracking-wider block">
                  Preset Scam Scenarios:
                </span>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_MESSAGE_SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono-cyber border transition-all cursor-pointer flex items-center gap-1.5 ${
                        messageInput === sample.value
                          ? 'bg-purple-950/80 border-purple-400 text-purple-300 shadow-sm shadow-purple-500/20 scale-[1.02]'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span>{sample.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        sample.expectedRisk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : sample.expectedRisk === 'HIGH' ? 'bg-orange-500/20 text-orange-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {sample.expectedRisk}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Glowing Message Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="btn-analyze-message"
                  disabled={isAnalyzing}
                  className="w-full py-4 px-8 rounded-2xl font-display font-bold text-base sm:text-lg text-slate-950 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 hover:from-purple-300 hover:to-pink-200 transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-purple-400/40 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <Shield className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>🛡 Run Message Social Engineering Scan</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

