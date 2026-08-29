import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iyqhyazfxcujcordyqyc.supabase.co';

// Supabase Publishable Key
const supabaseKey = 'sb_publishable_xIVh7weMgpVGTl7MLTYaLw_V4uHg8u1';

/**
 * Direct HTTP fallback for Edge Functions invocation.
 * Ensures zero module-load crashes regardless of JWT decoding quirks, storage sandboxes, or iframe policies.
 */
async function directFunctionInvoke(
  functionName: string,
  options?: { body?: any; headers?: Record<string, string> }
): Promise<{ data: any; error: any }> {
  try {
    const endpoint = `${supabaseUrl.replace(/\/+$/, '')}/functions/v1/${functionName}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      ...(options?.headers || {})
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: options?.body ? JSON.stringify(options?.body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError: any = null;
      try {
        parsedError = JSON.parse(errorText);
      } catch {
        parsedError = { message: errorText || `HTTP ${response.status} ${response.statusText}` };
      }
      return { data: null, error: parsedError };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err };
  }
}

// Safely instantiate SDK client with disabled session persistence to avoid iframe localStorage exceptions
let internalClient: any = null;
try {
  internalClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
} catch (err) {
  console.warn('[PhishShield] Supabase client initialized in resilient fallback mode:', err);
}

// Unified client interface matching SupabaseClient contracts
export const supabase = {
  functions: {
    invoke: async (functionName: string, options?: { body?: any; headers?: Record<string, string> }) => {
      if (internalClient?.functions?.invoke) {
        try {
          const res = await internalClient.functions.invoke(functionName, options);
          if (res && (res.data || !res.error)) {
            return res;
          }
        } catch (e) {
          console.warn(`[Supabase SDK invoke] Fallback to direct HTTP for ${functionName}:`, e);
        }
      }
      return await directFunctionInvoke(functionName, options);
    }
  },
  auth: internalClient?.auth,
  from: (relation: string) => internalClient?.from?.(relation),
  storage: internalClient?.storage,
  channel: (name: string) => internalClient?.channel?.(name)
};
