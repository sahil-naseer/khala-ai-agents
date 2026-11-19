import fs from 'node:fs/promises';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';
import {
  getCandidateModels,
  buildGenerationConfig,
  getPublicClientConfig,
  fetchLiveCatalog,
  buildSystemPrompt,
  matchExactFaq,
  matchFaqFallback,
  buildGeminiContents,
  stripSelfIntro
} from './agent-core.js';

export { getPublicClientConfig, fetchLiveCatalog, buildSystemPrompt, matchExactFaq, matchFaqFallback, stripSelfIntro };

const DEFAULT_CLIENTS_DIR = path.resolve(process.cwd(), 'clients');
const CLIENT_ID_PATTERN = /^[a-z0-9-]+$/;

/**
 * Validate clientId and return the resolved JSON file path.
 * Rejects path traversal or invalid characters.
 */
function resolveClientPath(clientId, clientsDir = DEFAULT_CLIENTS_DIR) {
  if (typeof clientId !== 'string' || !CLIENT_ID_PATTERN.test(clientId)) {
    const err = new Error('Invalid clientId. Use lowercase letters, numbers, and hyphens only.');
    err.statusCode = 400;
    throw err;
  }
  const resolvedDir = path.resolve(clientsDir);
  const target = path.resolve(resolvedDir, `${clientId}.json`);
  if (!target.startsWith(`${resolvedDir}${path.sep}`)) {
    const err = new Error('Invalid client path.');
    err.statusCode = 400;
    throw err;
  }
  return target;
}

/**
 * Load a client configuration JSON from disk.
 */
export async function loadClientConfig(clientId, clientsDir = DEFAULT_CLIENTS_DIR) {
  const filePath = resolveClientPath(clientId, clientsDir);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const notFound = new Error(`Client "${clientId}" not found.`);
      notFound.statusCode = 404;
      throw notFound;
    }
    throw error;
  }
}

/**
 * List all available client IDs and summary metadata.
 */
export async function listClients(clientsDir = DEFAULT_CLIENTS_DIR) {
  const entries = await fs.readdir(clientsDir, { withFileTypes: true });
  const clients = [];
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      const id = entry.name.slice(0, -5);
      if (!CLIENT_ID_PATTERN.test(id)) continue;
      const cfg = await loadClientConfig(id, clientsDir);
      clients.push({
        id: cfg.id || id,
        businessName: cfg.businessName || id,
        agentName: cfg.agentName || 'AI Support',
        accentColor: cfg.accentColor || '#2563eb'
      });
    }
  }
  return clients.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Generate an agent reply using Gemini API (or demo fallback if no API key).
 */
export async function generateAgentReply({ client, message, history = [] }) {
  const apiKey = process.env.GEMINI_API_KEY;
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

  const ai = new GoogleGenAI({ apiKey });
  const candidateModels = getCandidateModels(process.env.GEMINI_MODEL);
  const catalog = await fetchLiveCatalog(client);
  const systemInstruction = buildSystemPrompt(client, catalog);
  const contents = buildGeminiContents(message, history);

  let lastError = null;
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction,
          ...buildGenerationConfig(model),
          abortSignal: AbortSignal.timeout(5_000)
        }
      });

      const rawText = response?.text?.trim();
      const replyText = stripSelfIntro(rawText, client?.agentName);
      if (replyText) {
        return {
          reply: replyText,
          mode: 'gemini',
          model
        };
      }
    } catch (err) {
      lastError = err;
      const status = err?.status || err?.statusCode;
      if (status === 400 || status === 401 || status === 403) {
        throw err;
      }
    }
  }

  console.warn('[agent fallback] Gemini unavailable, using FAQ fallback:', lastError?.message || lastError);
  return {
    reply: matchFaqFallback(client, message, { isDemo: false }),
    mode: 'fallback'
  };
}
