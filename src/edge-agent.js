import tamyizClient from '../clients/tamyiz.json' with { type: 'json' };
import {
  CANDIDATE_MODELS,
  getPublicClientConfig,
  fetchLiveCatalog,
  buildSystemPrompt,
  matchExactFaq,
  matchFaqFallback,
  buildGeminiContents,
  stripSelfIntro
} from './agent-core.js';

export { getPublicClientConfig };

const EDGE_CLIENTS = {
  [tamyizClient.id]: tamyizClient
};

/**
 * List summary metadata for all configured edge clients.
 */
export function getEdgeClients() {
  return Object.values(EDGE_CLIENTS)
    .map((cfg) => ({
      id: cfg.id,
      businessName: cfg.businessName || cfg.id,
      agentName: cfg.agentName || 'AI Support',
      accentColor: cfg.accentColor || '#2563eb'
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Look up a configured client on the edge runtime.
 */
export function getEdgeClient(clientId) {
  if (typeof clientId !== 'string' || !/^[a-z0-9-]+$/.test(clientId)) {
    const err = new Error('Invalid clientId. Use lowercase letters, numbers, and hyphens only.');
    err.statusCode = 400;
    throw err;
  }
  const client = EDGE_CLIENTS[clientId];
  if (!client) {
    const err = new Error(`Client "${clientId}" not found.`);
    err.statusCode = 404;
    throw err;
  }
  return client;
}

/**
 * Generate an agent reply on Cloudflare Pages Functions using the Gemini REST API.
 */
export async function generateEdgeReply({ client, message, history = [], env = {} }) {
  const apiKey = env.GEMINI_API_KEY;
  const hasRealKey = Boolean(apiKey && apiKey.trim() && apiKey !== 'your_gemini_api_key_here');

  if (!hasRealKey) {
    return {
      reply: matchFaqFallback(client, message),
      mode: 'demo'
    };
  }

  const exactMatch = matchExactFaq(client, message);
  if (exactMatch) {
    return { reply: exactMatch, mode: 'instant' };
  }

  const primaryModel = env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const candidateModels = [...new Set([primaryModel, ...CANDIDATE_MODELS])];
  const catalog = await fetchLiveCatalog(client);
  const systemInstruction = buildSystemPrompt(client, catalog);
  const contents = buildGeminiContents(message, history);

  let lastError = null;
  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(6_000),
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 600
          }
        })
      });

      if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        const err = new Error(`Gemini HTTP ${res.status}: ${errBody}`);
        err.statusCode = res.status;
        if (res.status === 400 || res.status === 401 || res.status === 403) {
          throw err;
        }
        lastError = err;
        continue;
      }

      const data = await res.json();
      const parts = data?.candidates?.[0]?.content?.parts;
      const rawText = Array.isArray(parts)
        ? parts.filter((p) => !p?.thought).map((p) => p?.text || '').join('').trim()
        : '';
      const replyText = stripSelfIntro(rawText, client?.agentName);

      if (replyText) {
        return {
          reply: replyText,
          mode: 'gemini',
          model
        };
      }
    } catch (err) {
      if (err?.statusCode === 400 || err?.statusCode === 401 || err?.statusCode === 403) {
        throw err;
      }
      lastError = err;
    }
  }

  console.warn('[edge fallback] Gemini unavailable, using FAQ fallback:', lastError?.message || lastError);
  return {
    reply: matchFaqFallback(client, message, { isDemo: false }),
    mode: 'fallback'
  };
}
