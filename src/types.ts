export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ThreatReason {
  id: string;
  iconType: 'warning' | 'globe' | 'link' | 'alert' | 'lock' | 'zap' | 'shield' | 'check';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'safe';
  category: 'Domain Pattern' | 'Keyword' | 'Social Engineering' | 'Credential Theft' | 'Structure' | 'Trust Factor';
}

export interface ThreatBreakdownMetrics {
  urlSecurity: {
    level: RiskLevel;
    score: number; // 0-100 risk percentage
    detail: string;
  };
  socialEngineering: {
    level: RiskLevel;
    score: number;
    detail: string;
  };
  credentialTheft: {
    level: RiskLevel;
    score: number;
    detail: string;
  };
  suspiciousKeywords: {
    count: number;
    detectedWords: string[];
    riskScore: number;
  };
}

export interface SecurityAnalysisResult {
  id: string;
  targetType: 'url' | 'message';
  targetValue: string;
  analyzedAt: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  verdictTitle: string;
  verdictSummary: string;
  reasons: ThreatReason[];
  breakdown: ThreatBreakdownMetrics;
  recommendations: string[];
  heuristicDetails: {
    domainName?: string;
    protocol?: string;
    suspiciousTld?: boolean;
    ipAddressDetected?: boolean;
    excessiveSubdomains?: boolean;
    atSymbolFound?: boolean;
    urgencyToneDetected?: boolean;
    sensitiveKeywordsFound?: string[];
    entropyScore?: number;
  };
}

export interface PresetSample {
  id: string;
  type: 'url' | 'message';
  label: string;
  value: string;
  description: string;
  expectedRisk: RiskLevel;
}
