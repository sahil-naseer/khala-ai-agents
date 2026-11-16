import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import {
  loadClientConfig,
  listClients,
  getPublicClientConfig,
  generateAgentReply
} from './src/agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Simple in-memory sliding-window rate limiter per IP.
 */
function createRateLimiter({ windowMs = 60_000, maxRequests = 30 } = {}) {
  const hits = new Map();
  return (req, res, next) => {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const timestamps = (hits.get(ip) || []).filter((t) => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests. Please slow down.' });
    }
    timestamps.push(now);
    hits.set(ip, timestamps);
    next();
  };
}

export function createApp({ clientsDir } = {}) {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '64kb' }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() &&
      process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
    );
    res.json({ ok: true, mode: hasKey ? 'gemini' : 'demo' });
  });

  app.get('/api/clients', async (_req, res, next) => {
    try {
      const clients = await listClients(clientsDir);
      res.json({ clients });
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/clients/:clientId/config', async (req, res, next) => {
    try {
      const client = await loadClientConfig(req.params.clientId, clientsDir);
      res.json(getPublicClientConfig(client));
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/chat', createRateLimiter(), async (req, res, next) => {
    try {
      const { clientId = 'tamyiz', message, history = [] } = req.body || {};
      if (typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required.' });
      }
      if (message.length > 2000) {
        return res.status(400).json({ error: 'Message exceeds 2000 characters.' });
      }

      const client = await loadClientConfig(clientId, clientsDir);
      const result = await generateAgentReply({
        client,
        message: message.trim(),
        history
      });

      res.json({
        clientId: client.id,
        reply: result.reply,
        mode: result.mode
      });
    } catch (err) {
      next(err);
    }
  });

  app.use((err, _req, res, _next) => {
    const status = err.statusCode || 500;
    if (status >= 500) {
      console.error('[server error]', err);
    }
    res.status(status).json({ error: err.message || 'Internal server error' });
  });

  return app;
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;
if (isDirectRun) {
  const port = Number(process.env.PORT) || 3000;
  const app = createApp();
  app.listen(port, () => {
    console.log(`Khala AI Agent server running at http://localhost:${port}`);
  });
}
