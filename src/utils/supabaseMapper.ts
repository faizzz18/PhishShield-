import { SecurityAnalysisResult, RiskLevel, ThreatReason, ThreatBreakdownMetrics } from '../types';
import { analyzeTarget, getRiskLevelFromScore } from './heuristicEngine';

/**
 * Maps raw response payloads from Supabase Edge Functions ('analyze-url' / 'analyze-text')
 * to the robust SecurityAnalysisResult schema expected by PhishShield AI components.
 */
export function mapSupabaseAnalysisResponse(
  rawResponse: any,
  type: 'url' | 'message',
  input: string
): SecurityAnalysisResult {
  // If response is invalid or empty, return heuristic engine fallback
  if (!rawResponse || typeof rawResponse !== 'object') {
    return analyzeTarget(type, input);
  }

  // Extract nested data payload if wrapped (e.g. data.data, data.result, data.analysis)
  const data = rawResponse.result || rawResponse.data || rawResponse.analysis || rawResponse;

  // Base fallback result to ensure 100% complete fields
  const fallback = analyzeTarget(type, input);

  // Extract numeric risk score (0-100)
  let riskScore = fallback.riskScore;
  if (typeof data.riskScore === 'number' && !isNaN(data.riskScore)) {
    riskScore = Math.max(0, Math.min(100, Math.round(data.riskScore)));
  } else if (typeof data.risk_score === 'number' && !isNaN(data.risk_score)) {
    riskScore = Math.max(0, Math.min(100, Math.round(data.risk_score)));
  } else if (typeof data.score === 'number' && !isNaN(data.score)) {
    riskScore = Math.max(0, Math.min(100, Math.round(data.score)));
  } else if (typeof data.threatScore === 'number' && !isNaN(data.threatScore)) {
    riskScore = Math.max(0, Math.min(100, Math.round(data.threatScore)));
  }

  // Extract or compute categorical risk level
  let riskLevel: RiskLevel = getRiskLevelFromScore(riskScore);
  const rawLevel = (data.riskLevel || data.risk_level || data.level || data.severity || '').toString().toUpperCase();
  if (rawLevel === 'LOW' || rawLevel === 'MEDIUM' || rawLevel === 'HIGH' || rawLevel === 'CRITICAL') {
    riskLevel = rawLevel as RiskLevel;
  }

  // Extract verdict title & summary
  const verdictTitle = data.verdictTitle || 
                       data.verdict_title || 
                       data.title || 
                       data.verdict || 
                       fallback.verdictTitle;

  const verdictSummary = data.verdictSummary || 
                         data.verdict_summary || 
                         data.summary || 
                         data.description || 
                         data.explanation || 
                         fallback.verdictSummary;

  // Extract reasons / threats list
  let reasons: ThreatReason[] = fallback.reasons;
  const rawReasons = data.reasons || data.threats || data.threat_reasons || data.findings || data.signals;
  if (Array.isArray(rawReasons) && rawReasons.length > 0) {
    reasons = rawReasons.map((item: any, idx: number): ThreatReason => {
      if (typeof item === 'string') {
        return {
          id: `reason-sb-${idx}`,
          iconType: (riskScore > 50 ? 'warning' : 'check') as any,
          title: item,
          description: item,
          severity: riskScore > 75 ? 'critical' : riskScore > 50 ? 'high' : riskScore > 25 ? 'medium' : 'safe',
          category: type === 'url' ? 'Domain Pattern' : 'Social Engineering'
        };
      }
      return {
        id: item.id || `reason-sb-${idx}`,
        iconType: item.iconType || item.icon_type || (item.severity === 'safe' ? 'check' : 'warning'),
        title: item.title || item.name || 'Security Signal',
        description: item.description || item.detail || item.message || '',
        severity: item.severity || (riskScore > 75 ? 'critical' : riskScore > 50 ? 'high' : riskScore > 25 ? 'medium' : 'safe'),
        category: item.category || (type === 'url' ? 'Domain Pattern' : 'Social Engineering')
      };
    });
  }

  // Extract recommendations list
  let recommendations: string[] = fallback.recommendations;
  const rawRecs = data.recommendations || data.actions || data.action_items || data.advice;
  if (Array.isArray(rawRecs) && rawRecs.length > 0) {
    recommendations = rawRecs.map((r: any) => (typeof r === 'string' ? r : r.text || r.title || String(r)));
  }

  // Extract threat breakdown metrics
  const breakdown: ThreatBreakdownMetrics = {
    urlSecurity: {
      level: data.breakdown?.urlSecurity?.level || 
             data.breakdown?.url_security?.level || 
             fallback.breakdown.urlSecurity.level,
      score: typeof data.breakdown?.urlSecurity?.score === 'number' 
        ? data.breakdown.urlSecurity.score 
        : typeof data.breakdown?.url_security?.score === 'number'
        ? data.breakdown.url_security.score
        : fallback.breakdown.urlSecurity.score,
      detail: data.breakdown?.urlSecurity?.detail || 
              data.breakdown?.url_security?.detail || 
              fallback.breakdown.urlSecurity.detail
    },
    socialEngineering: {
      level: data.breakdown?.socialEngineering?.level || 
             data.breakdown?.social_engineering?.level || 
             fallback.breakdown.socialEngineering.level,
      score: typeof data.breakdown?.socialEngineering?.score === 'number' 
        ? data.breakdown.socialEngineering.score 
        : typeof data.breakdown?.social_engineering?.score === 'number'
        ? data.breakdown.social_engineering.score
        : fallback.breakdown.socialEngineering.score,
      detail: data.breakdown?.socialEngineering?.detail || 
              data.breakdown?.social_engineering?.detail || 
              fallback.breakdown.socialEngineering.detail
    },
    credentialTheft: {
      level: data.breakdown?.credentialTheft?.level || 
             data.breakdown?.credential_theft?.level || 
             fallback.breakdown.credentialTheft.level,
      score: typeof data.breakdown?.credentialTheft?.score === 'number' 
        ? data.breakdown.credentialTheft.score 
        : typeof data.breakdown?.credential_theft?.score === 'number'
        ? data.breakdown.credential_theft.score
        : fallback.breakdown.credentialTheft.score,
      detail: data.breakdown?.credentialTheft?.detail || 
              data.breakdown?.credential_theft?.detail || 
              fallback.breakdown.credentialTheft.detail
    },
    suspiciousKeywords: {
      count: typeof data.breakdown?.suspiciousKeywords?.count === 'number'
        ? data.breakdown.suspiciousKeywords.count
        : typeof data.breakdown?.suspicious_keywords?.count === 'number'
        ? data.breakdown.suspicious_keywords.count
        : fallback.breakdown.suspiciousKeywords.count,
      detectedWords: Array.isArray(data.breakdown?.suspiciousKeywords?.detectedWords)
        ? data.breakdown.suspiciousKeywords.detectedWords
        : Array.isArray(data.breakdown?.suspicious_keywords?.detected_words)
        ? data.breakdown.suspicious_keywords.detected_words
        : fallback.breakdown.suspiciousKeywords.detectedWords,
      riskScore: typeof data.breakdown?.suspiciousKeywords?.riskScore === 'number'
        ? data.breakdown.suspiciousKeywords.riskScore
        : typeof data.breakdown?.suspicious_keywords?.risk_score === 'number'
        ? data.breakdown.suspicious_keywords.risk_score
        : fallback.breakdown.suspiciousKeywords.riskScore
    }
  };

  const heuristicDetails = data.heuristicDetails || 
                           data.heuristic_details || 
                           data.heuristics || 
                           fallback.heuristicDetails;

  return {
    id: data.id || `analysis-${Date.now()}`,
    targetType: type,
    targetValue: input,
    analyzedAt: data.analyzedAt || 
                data.analyzed_at || 
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    riskScore,
    riskLevel,
    verdictTitle,
    verdictSummary,
    reasons,
    breakdown,
    recommendations,
    heuristicDetails
  };
}
