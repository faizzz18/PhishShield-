import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Sparkles, Terminal, Activity, Menu, X, Radio } from 'lucide-react';
import { cyberSound } from '../utils/cyberSoundEffects';

interface NavbarProps {
  onAnalyzeClick: () => void;
  currentTheme: 'cyan' | 'emerald' | 'purple';
  onThemeChange: (theme: 'cyan' | 'emerald' | 'purple') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onAnalyzeClick,
  currentTheme,
  onThemeChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(cyberSound.getMuted());

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Threat Lab', href: '#threat-lab' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ];

  const handleToggleAudio = () => {
    const muted = cyberSound.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleNavClick = () => {
    cyberSound.playClick();
  };

  const handleThemeSelect = (theme: 'cyan' | 'emerald' | 'purple') => {
    onThemeChange(theme);
    cyberSound.playClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#060913]/90 backdrop-blur-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            id="nav-logo"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1 min-h-[44px]"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-400/50 p-2 shadow-lg shadow-cyan-500/20 group-hover:border-cyan-400 group-hover:shadow-cyan-400/40 transition-all duration-300 shrink-0">
              {/* Circuit Micro-Lines */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 w-px h-2 bg-cyan-400/80 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-px h-2 bg-cyan-400/80 -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 h-px w-2 bg-cyan-400/80 -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 h-px w-2 bg-cyan-400/80 -translate-y-1/2" />
              </div>
              
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-105 transition-transform" />
              
              {/* AI Node Pulse Dot */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-cyan-400 border-2 border-[#060913]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                  PhishShield
                </span>
                <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent font-display">
                  AI
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-cyan-400/80 font-mono-cyber font-medium -mt-0.5 flex items-center gap-1">
                <span>Neural Defense</span>
                <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium text-slate-300 hover:text-cyan-300 transition-colors relative py-1 group min-h-[44px] flex items-center"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Controls: Audio SFX, Theme HUD, and Launch Button */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Audio SFX Toggle Button */}
            <button
              onClick={handleToggleAudio}
              id="navbar-audio-toggle"
              title={isAudioMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX'}
              className={`p-2.5 rounded-xl border text-xs font-mono-cyber transition-all duration-300 flex items-center gap-1.5 cursor-pointer min-h-[44px] min-w-[44px] justify-center ${
                !isAudioMuted
                  ? 'bg-cyan-950/40 border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {!isAudioMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-cyan-400 rounded-full animate-sound-1" />
                    <span className="w-0.5 bg-cyan-400 rounded-full animate-sound-2" />
                    <span className="w-0.5 bg-cyan-400 rounded-full animate-sound-3" />
                  </div>
                </>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Cyber Theme Accent Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => handleThemeSelect('cyan')}
                id="theme-btn-cyan"
                title="Electric Cyan HUD"
                className={`w-6 h-6 rounded-lg border transition-all cursor-pointer ${
                  currentTheme === 'cyan' 
                    ? 'bg-cyan-400 border-white shadow-sm shadow-cyan-400/50 scale-110' 
                    : 'bg-cyan-900/50 border-cyan-700/50 opacity-60 hover:opacity-100'
                }`}
              />
              <button
                onClick={() => handleThemeSelect('emerald')}
                id="theme-btn-emerald"
                title="Matrix Emerald SOC"
                className={`w-6 h-6 rounded-lg border transition-all cursor-pointer ${
                  currentTheme === 'emerald' 
                    ? 'bg-emerald-400 border-white shadow-sm shadow-emerald-400/50 scale-110' 
                    : 'bg-emerald-900/50 border-emerald-700/50 opacity-60 hover:opacity-100'
                }`}
              />
              <button
                onClick={() => handleThemeSelect('purple')}
                id="theme-btn-purple"
                title="Synthwave Violet"
                className={`w-6 h-6 rounded-lg border transition-all cursor-pointer ${
                  currentTheme === 'purple' 
                    ? 'bg-purple-400 border-white shadow-sm shadow-purple-400/50 scale-110' 
                    : 'bg-purple-900/50 border-purple-700/50 opacity-60 hover:opacity-100'
                }`}
              />
            </div>

            {/* Launch Analyzer Button */}
            <button
              onClick={() => {
                cyberSound.playScanStart();
                onAnalyzeClick();
              }}
              id="navbar-analyze-btn"
              className="relative group px-4 py-2.5 rounded-xl font-semibold text-sm text-cyan-300 bg-cyan-950/40 border border-cyan-400/60 hover:border-cyan-300 hover:bg-cyan-900/40 transition-all duration-300 glow-cyan hover:glow-cyan-lg active:scale-98 cursor-pointer flex items-center gap-2 min-h-[44px]"
            >
              <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Scan Target</span>
            </button>
          </div>

          {/* Mobile Actions Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label={isAudioMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            >
              {!isAudioMuted ? <Volume2 className="w-5 h-5 text-cyan-400" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                cyberSound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              id="mobile-menu-toggle"
              className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cyan-500/20 bg-[#070d1d]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1.5 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  cyberSound.playClick();
                }}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-cyan-950/40 hover:text-cyan-300 active:bg-cyan-950/60 transition-colors flex items-center justify-between min-h-[44px]"
              >
                <span>{link.name}</span>
                <span className="text-cyan-400 font-mono-cyber text-sm font-bold">→</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 text-xs font-mono-cyber text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Engine: Operational</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => handleThemeSelect('cyan')}
                  title="Cyan Theme"
                  className={`w-7 h-7 rounded-lg cursor-pointer transition-all flex items-center justify-center ${currentTheme === 'cyan' ? 'bg-cyan-400 text-slate-950 shadow-md font-bold' : 'bg-cyan-950 text-cyan-400'}`}
                >
                  <span className="text-[10px]">C</span>
                </button>
                <button
                  onClick={() => handleThemeSelect('emerald')}
                  title="Emerald Theme"
                  className={`w-7 h-7 rounded-lg cursor-pointer transition-all flex items-center justify-center ${currentTheme === 'emerald' ? 'bg-emerald-400 text-slate-950 shadow-md font-bold' : 'bg-emerald-950 text-emerald-400'}`}
                >
                  <span className="text-[10px]">E</span>
                </button>
                <button
                  onClick={() => handleThemeSelect('purple')}
                  title="Purple Theme"
                  className={`w-7 h-7 rounded-lg cursor-pointer transition-all flex items-center justify-center ${currentTheme === 'purple' ? 'bg-purple-400 text-slate-950 shadow-md font-bold' : 'bg-purple-950 text-purple-400'}`}
                >
                  <span className="text-[10px]">P</span>
                </button>
              </div>
            </div>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                cyberSound.playScanStart();
                onAnalyzeClick();
              }}
              id="mobile-analyze-cta"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-center text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-300 shadow-lg shadow-cyan-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <Terminal className="w-5 h-5 text-slate-950" />
              <span>Launch Threat Analyzer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

