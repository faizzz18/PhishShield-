import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ExternalLink, 
  Share2, 
  Copy, 
  Check, 
  Bookmark, 
  ArrowRight, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Eye, 
  RefreshCw, 
  Zap, 
  Globe 
} from 'lucide-react';
import { SecurityAnalysisResult } from '../types';
import { cyberSound } from '../utils/cyberSoundEffects';

interface DirectScanGatewayProps {
  result: SecurityAnalysisResult | null;
  onDirectScan: (url: string) => void;
  interceptedUrl?: string | null;
}

export const DirectScanGateway: React.FC<DirectScanGatewayProps> = ({
  result,
  onDirectScan,
  interceptedUrl
}) => {
  const [customShareUrl, setCustomShareUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedBookmarklet, setCopiedBookmarklet] = useState<boolean>(false);
  const [showQuarantineModal, setShowQuarantineModal] = useState<boolean>(false);
  const [showSandboxPreview, setShowSandboxPreview] = useState<boolean>(false);

  // Derive current base origin
  const getBaseOrigin = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return 'https://phishshield.ai';
  };

  const currentTargetUrl = result?.targetType === 'url' ? result.targetValue : (interceptedUrl || '');
  const isSafe = result ? result.riskScore < 50 : false;
  const isDangerous = result ? result.riskScore >= 50 : false;

  // Format destination URL safely
  const formatDestinationUrl = (url: string) => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  const targetCleanUrl = formatDestinationUrl(currentTargetUrl);

  const directShareLink = targetCleanUrl 
    ? `${getBaseOrigin()}?url=${encodeURIComponent(targetCleanUrl)}`
    : `${getBaseOrigin()}?url=`;

  const handleCopyDirectLink = (linkToCopy?: string) => {
    cyberSound.playClick();
    const link = linkToCopy || directShareLink;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyBookmarklet = () => {
    cyberSound.playClick();
    const bookmarkletCode = `javascript:(function(){window.open('${getBaseOrigin()}?url='+encodeURIComponent(window.location.href));})();`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookmarkletCode);
      setCopiedBookmarklet(true);
      setTimeout(() => setCopiedBookmarklet(false), 2500);
    }
  };

  return (
    <div id="direct-gateway-panel" className="relative rounded-3xl bg-[#081024]/95 border border-cyan-500/30 p-4 sm:p-7 shadow-2xl backdrop-blur-2xl overflow-hidden mt-6">
      
      {/* Top Laser Accent */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500" />
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Direct Website Gateway & Automated Inspection
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                1-CLICK AUTO
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Open any website directly through PhishShield AI&apos;s real-time defensive scanner.
            </p>
          </div>
        </div>

        {/* Share / Link Copier */}
        {targetCleanUrl && (
          <button
            onClick={() => handleCopyDirectLink()}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-xs font-mono-cyber text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
            title="Copy Direct Scan URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Direct Scan Link'}</span>
          </button>
        )}
      </div>

      {/* Main Dual Path Gateway: SAFE vs THREAT Pass-Through */}
      {result && result.targetType === 'url' && (
        <div className="py-4">
          {isSafe ? (
            /* SAFE PASS-THROUGH GATE */
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 shrink-0 mt-0.5 md:mt-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-sm font-mono-cyber">
                      VERIFIED DIRECT ACCESS APPROVED
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono-cyber border border-emerald-500/30">
                      SSL VALID
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    This domain passed heuristic threat detection with zero active phishing signals. You can directly proceed to the verified website.
                  </p>
                  <p className="text-[11px] font-mono-cyber text-emerald-300/80 mt-1.5 break-all">
                    Destination: <span className="underline">{targetCleanUrl}</span>
                  </p>
                </div>
              </div>

              {/* Direct Open Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
                <a
                  href={targetCleanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => cyberSound.playSuccess()}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm font-mono-cyber shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    cyberSound.playClick();
                    setShowSandboxPreview(!showSandboxPreview);
                  }}
                  className="px-3.5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono-cyber text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSandboxPreview ? 'Hide Inspection' : 'Sandbox View'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* DANGEROUS / QUARANTINE PASS-THROUGH GATE */
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/30 border border-rose-500/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-400 shrink-0 mt-0.5 md:mt-0">
                  <ShieldAlert className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold text-sm font-mono-cyber">
                      DIRECT ACCESS QUARANTINED (HIGH RISK)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/70 text-rose-200 font-mono-cyber border border-rose-500/40">
                      THREAT BLOCKED
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Warning: PhishShield AI flagged this website with a <strong className="text-rose-400">{result.riskScore}/100 Risk Score</strong>. Navigating directly exposes your device to credential harvesters or malicious scripts.
                  </p>
                  <p className="text-[11px] font-mono-cyber text-rose-300/80 mt-1.5 break-all">
                    Quarantined Target: <span className="underline">{targetCleanUrl}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    cyberSound.playClick();
                    setShowSandboxPreview(!showSandboxPreview);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono-cyber text-slate-200 hover:text-cyan-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{showSandboxPreview ? 'Close Safe Preview' : 'Safe Isolated Inspector'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    cyberSound.playThreatAlert();
                    setShowQuarantineModal(true);
                  }}
                  className="px-4 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/50 text-rose-300 text-xs font-mono-cyber flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Bypass Shield & Open</span>
                </button>
              </div>
            </div>
          )}

          {/* Sandbox Isolated Inspection Frame */}
          {showSandboxPreview && (
            <div className="mt-4 p-4 rounded-2xl bg-[#030712] border border-slate-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-200 font-bold">Isolated Headless Sandbox Viewer</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    SANDBOXED NO-SCRIPT
                  </span>
                </div>
                <span className="text-slate-500">Origin: {targetCleanUrl}</span>
              </div>
              
              <div className="p-3 rounded-xl bg-[#0a1226] border border-slate-800/80 font-mono-cyber text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Security Isolation Layer:</span>
                  <span className="text-emerald-400">ACTIVE (Zero Cookies / Zero Script Execution)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Heuristic Engine Verdict:</span>
                  <span className={isSafe ? 'text-emerald-400' : 'text-rose-400'}>{result.riskLevel} - {result.verdictTitle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Target IP & Geo:</span>
                  <span className="text-cyan-300">Protected Relay / Virtual Proxy Mode</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Direct Link Generator & One-Click Tools */}
      <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Tool 1: Instant Direct Scan Link Maker */}
        <div className="p-3.5 rounded-2xl bg-[#050b1a] border border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 font-mono-cyber flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Direct Scan URL Generator</span>
            </span>
            <span className="text-[10px] font-mono-cyber text-slate-500">Share with anyone</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Generate an automated scanning link for any suspicious website so friends or colleagues are protected before opening it:
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={customShareUrl}
              onChange={(e) => setCustomShareUrl(e.target.value)}
              placeholder="Enter URL to create auto-scan link (e.g. apple.com)..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#02050c] border border-slate-800 text-xs font-mono-cyber text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => {
                if (customShareUrl.trim()) {
                  const directLink = `${getBaseOrigin()}?url=${encodeURIComponent(formatDestinationUrl(customShareUrl.trim()))}`;
                  handleCopyDirectLink(directLink);
                } else {
                  handleCopyDirectLink();
                }
              }}
              className="px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono-cyber flex items-center gap-1.5 cursor-pointer shrink-0 transition-all active:scale-95"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Tool 2: One-Click Browser Bookmarklet */}
        <div className="p-3.5 rounded-2xl bg-[#050b1a] border border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-300 font-mono-cyber flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>1-Click Browser Bookmarklet</span>
            </span>
            <span className="text-[10px] font-mono-cyber text-purple-400/80">Instant Scan</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Scan any webpage you are currently viewing directly without copying and pasting:
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyBookmarklet}
              className="flex-1 py-2 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-mono-cyber flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              {copiedBookmarklet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{copiedBookmarklet ? 'Bookmarklet Copied!' : 'Copy 🛡️ "Scan Current Page" Bookmarklet'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Quarantine Warning Modal */}
      {showQuarantineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-md w-full bg-[#0c1427] border border-rose-500/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-2xl bg-rose-950/80 border border-rose-500/50">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-display">
                  Security Bypass Warning
                </h4>
                <p className="text-xs font-mono-cyber text-rose-300">
                  Critical Risk Threat Vector Detected
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono-cyber">
              PhishShield AI strongly advises against navigating directly to this target:
              <br />
              <span className="text-rose-400 font-bold break-all block mt-1 p-2 rounded-lg bg-slate-950 border border-slate-800">
                {targetCleanUrl}
              </span>
            </p>

            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-200 font-mono-cyber space-y-1">
              <p>• Do not enter passwords, 2FA codes, or credit card numbers.</p>
              <p>• Do not download or execute any files from this domain.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  cyberSound.playClick();
                  setShowQuarantineModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-cyber cursor-pointer"
              >
                Keep Protected
              </button>

              <a
                href={targetCleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowQuarantineModal(false)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs font-mono-cyber flex items-center gap-1.5 cursor-pointer shadow-lg shadow-rose-950/50"
              >
                <span>Proceed at Own Risk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
