import {
  getEdgeClients,
  getEdgeClient,
  getPublicClientConfig,
  generateEdgeReply
} from '../../src/edge-agent.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const RATE_WINDOW_MS = 60_000;
const RATE_MAX_REQUESTS = 30;
const ipHits = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_MAX_REQUESTS) {
    return false;
  }
  timestamps.push(now);
  ipHits.set(ip, timestamps);
  return true;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  });
}

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  try {
    const url = new URL(request.url);
    const cleanPath = url.pathname.replace(/\/+$/, '');
    const method = request.method.toUpperCase();

    if (cleanPath === '/api/health' && method === 'GET') {
      const apiKey = env?.GEMINI_API_KEY;
      const hasKey = Boolean(apiKey && apiKey.trim() && apiKey !== 'your_gemini_api_key_here');
      return jsonResponse({ ok: true, mode: hasKey ? 'gemini' : 'demo' });
    }

    if (cleanPath === '/api/clients' && method === 'GET') {
      return jsonResponse({ clients: getEdgeClients() });
    }

    const configMatch = cleanPath.match(/^\/api\/clients\/([^/]+)\/config$/);
    if (configMatch && method === 'GET') {
      const client = getEdgeClient(decodeURIComponent(configMatch[1]));
      return jsonResponse(getPublicClientConfig(client));
    }

    if (cleanPath === '/api/chat' && method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!checkRateLimit(ip)) {
        return jsonResponse({ error: 'Too many requests. Please slow down.' }, 429);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
      }

      const { clientId = 'tamyiz', message, history = [] } = body || {};
      if (typeof message !== 'string' || !message.trim()) {
        return jsonResponse({ error: 'Message is required.' }, 400);
      }
      if (message.length > 2000) {
        return jsonResponse({ error: 'Message exceeds 2000 characters.' }, 400);
      }

      const client = getEdgeClient(clientId);
      const result = await generateEdgeReply({
        client,
        message: message.trim(),
        history,
        env
      });

      return jsonResponse({
        clientId: client.id,
        reply: result.reply,
        mode: result.mode
      });
    }

    return jsonResponse({ error: 'Not found' }, 404);
  } catch (err) {
    const status = err?.statusCode || 500;
    if (status >= 500) {
      console.error('[edge api error]', err);
    }
    return jsonResponse({ error: err?.message || 'Internal server error' }, status);
  }
}
