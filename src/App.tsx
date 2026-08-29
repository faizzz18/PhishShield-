import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CyberBackground } from './components/CyberBackground';
import { CyberThreatTicker } from './components/CyberThreatTicker';
import { ThreatSimulator } from './components/ThreatSimulator';
import { HeroSection } from './components/HeroSection';
import { AnalyzerTerminal } from './components/AnalyzerTerminal';
import { ScanningState } from './components/ScanningState';
import { ResultDashboard } from './components/ResultDashboard';
import { DirectScanGateway } from './components/DirectScanGateway';
import { WorkflowSection } from './components/WorkflowSection';
import { FeaturesSection } from './components/FeaturesSection';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SecurityAnalysisResult } from './types';
import { analyzeTarget } from './utils/heuristicEngine';
import { cyberSound } from './utils/cyberSoundEffects';
import { Zap, ShieldCheck, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [currentScanTarget, setCurrentScanTarget] = useState<{ type: 'url' | 'message'; value: string } | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'cyan' | 'emerald' | 'purple'>('cyan');
  const [interceptedUrl, setInterceptedUrl] = useState<string | null>(null);
  const [showInterceptedBanner, setShowInterceptedBanner] = useState<boolean>(false);
  
  // Initial realistic sample analysis matching prompt specs (Risk Score: 78/100 CRITICAL)
  const [analysisResult, setAnalysisResult] = useState<SecurityAnalysisResult | null>(() => {
    return analyzeTarget('url', 'https://example-login-secure.xyz/banking/update-credentials@secure-auth.net');
  });

  // URL Parameter Interceptor: directly analyze incoming query parameters (?url=..., ?scan=..., ?target=...)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        let targetParam = searchParams.get('url') || 
                          searchParams.get('scan') || 
                          searchParams.get('target') || 
                          searchParams.get('link') || 
                          searchParams.get('q');
        
        // Also check hash-based parameters (e.g. #url=... or #/scan?url=...)
        if (!targetParam && window.location.hash) {
          const hashQuery = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : window.location.hash.replace(/^#/, '');
          const hashParams = new URLSearchParams(hashQuery);
          targetParam = hashParams.get('url') || hashParams.get('scan') || hashParams.get('target') || hashParams.get('link');
        }

        if (targetParam && targetParam.trim().length > 0) {
          const cleanTarget = decodeURIComponent(targetParam.trim());
          setInterceptedUrl(cleanTarget);
          setShowInterceptedBanner(true);
          
          // Auto-trigger direct analysis without requiring copy-pasting
          handleAnalyze('url', cleanTarget);
        }
      }
    } catch {
      // Fallback gracefully if URL parsing fails
    }
  }, []);

  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = (type: 'url' | 'message', input: string) => {
    cyberSound.playScan();
    setCurrentScanTarget({ type, value: input });
    setIsScanning(true);
    setAnalysisResult(null);

    // Scroll to scanning view
    setTimeout(() => {
      const el = document.getElementById('analyzer-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    // Simulate cyber AI neural analysis pipeline (approx 2.4s)
    setTimeout(() => {
      const result = analyzeTarget(type, input);
      setAnalysisResult(result);
      setIsScanning(false);
      
      if (result.riskScore >= 60) {
        cyberSound.playAlarm();
      } else {
        cyberSound.playSuccess();
      }

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-dashboard');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }, 2400);
  };

  const handleSelectSimulatedThreat = (type: 'url' | 'message', payload: string) => {
    cyberSound.playClick();
    handleAnalyze(type, payload);
  };

  const handleReset = () => {
    cyberSound.playClick();
    scrollToAnalyzer();
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Interactive High-Tech Canvas Background with Animated Matrix Particles */}
      <CyberBackground theme={currentTheme} />
      
      {/* Ambient Radial Cyber Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/10 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Content Hierarchy */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* 1. Top Navbar */}
        <Navbar 
          onAnalyzeClick={scrollToAnalyzer}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
        />

        {/* 2. Real-Time Global Threat Intelligence Ticker */}
        <CyberThreatTicker />

        <main className="flex-grow">
          
          {/* Direct Link Interception Notification Alert */}
          {showInterceptedBanner && interceptedUrl && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-purple-950/90 border border-cyan-400/60 shadow-xl shadow-cyan-950/60 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                    <Zap className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold font-mono-cyber text-cyan-300 uppercase tracking-wider">
                        ⚡ DIRECT LINK INTERCEPTED & ANALYZED
                      </span>
                      <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        AUTO-SCAN ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 truncate font-mono-cyber mt-0.5">
                      Target: <span className="text-cyan-300 font-semibold">{interceptedUrl}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      cyberSound.playScanStart();
                      handleAnalyze('url', interceptedUrl);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold font-mono-cyber flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <span>Re-Scan</span>
                  </button>
                  <button
                    onClick={() => setShowInterceptedBanner(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Hero Section with Live Video Simulator & 3D Visualizer */}
          <HeroSection 
            onAnalyzeClick={scrollToAnalyzer}
            onHowItWorksClick={scrollToHowItWorks}
            onAnalyzeUrl={(url) => handleAnalyze('url', url)}
          />

          {/* 4. Main Analyzer Terminal */}
          <AnalyzerTerminal 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isScanning} 
          />

          {/* 5. Scanning Loading State (Conditional) */}
          {isScanning && currentScanTarget && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScanningState 
                targetType={currentScanTarget.type} 
                targetValue={currentScanTarget.value} 
              />
            </div>
          )}

          {/* 6. Analysis Result Dashboard & Direct Gateway (Conditional) */}
          {!isScanning && analysisResult && (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <ResultDashboard 
                result={analysisResult} 
                onReset={handleReset} 
              />

              <DirectScanGateway 
                result={analysisResult}
                onDirectScan={(url) => handleAnalyze('url', url)}
                interceptedUrl={interceptedUrl}
              />
            </div>
          )}

          {/* 7. Interactive Threat Vector Simulator & Attack Lab */}
          <ThreatSimulator onSelectThreat={handleSelectSimulatedThreat} />

          {/* 8. How PhishShield AI Works Pipeline */}
          <WorkflowSection />

          {/* 9. Comprehensive Features Grid */}
          <FeaturesSection />

          {/* 10. Trust / Statistics Section */}
          <StatsSection />

          {/* 11. Supplementary About / Security Manifesto Section */}
          <AboutSection />

        </main>

        {/* 12. Footer */}
        <Footer />

      </div>
    </div>
  );
}

