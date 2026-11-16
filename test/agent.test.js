import fs from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  loadClientConfig,
  listClients,
  getPublicClientConfig,
  buildSystemPrompt,
  matchExactFaq,
  matchFaqFallback
} from '../src/agent.js';
import { createApp } from '../server.js';

test('loadClientConfig loads tamyiz and rejects invalid/traversal IDs', async () => {
  const tamyiz = await loadClientConfig('tamyiz');
  assert.equal(tamyiz.id, 'tamyiz');
  assert.equal(tamyiz.businessName, 'TAMYIZ™');

  await assert.rejects(() => loadClientConfig('../package'), { statusCode: 400 });
  await assert.rejects(() => loadClientConfig('nonexistent-client'), { statusCode: 404 });
});

test('listClients includes only tamyiz', async () => {
  const clients = await listClients();
  const ids = clients.map((c) => c.id);
  assert.deepEqual(ids, ['tamyiz']);
});

test('getPublicClientConfig omits internal knowledgeBase', async () => {
  const tamyiz = await loadClientConfig('tamyiz');
  const pub = getPublicClientConfig(tamyiz);
  assert.equal(pub.businessName, 'TAMYIZ™');
  assert.equal(pub.knowledgeBase, undefined);
});

test('buildSystemPrompt includes business name and FAQs', async () => {
  const tamyiz = await loadClientConfig('tamyiz');
  const prompt = buildSystemPrompt(tamyiz);
  assert.match(prompt, /TAMYIZ™/);
  assert.match(prompt, /Razorpay/i);
});

test('matchExactFaq matches every suggestedQuestion in tamyiz config', async () => {
  const tamyiz = await loadClientConfig('tamyiz');
  for (const q of tamyiz.suggestedQuestions) {
    const answer = matchExactFaq(tamyiz, q);
    assert.ok(answer && answer.length > 10, `Expected exact FAQ match for "${q}"`);
  }
  assert.equal(matchExactFaq(tamyiz, 'Something completely unrelated'), null);
});

test('matchFaqFallback matches relevant FAQ in demo mode', async () => {
  const tamyiz = await loadClientConfig('tamyiz');
  const reply = matchFaqFallback(tamyiz, 'How do I download my e-book after paying?');
  assert.match(reply, /Razorpay/);
});

test('HTTP API endpoints serve config and chat responses', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert.equal(healthRes.status, 200);
    const health = await healthRes.json();
    assert.equal(health.ok, true);

    const cfgRes = await fetch(`${baseUrl}/api/clients/tamyiz/config`);
    assert.equal(cfgRes.status, 200);
    const cfg = await cfgRes.json();
    assert.equal(cfg.id, 'tamyiz');

    const prevKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    const chatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: 'tamyiz', message: 'How can I contact support?' })
    });
    if (prevKey !== undefined) process.env.GEMINI_API_KEY = prevKey;

    assert.equal(chatRes.status, 200);
    const chat = await chatRes.json();
    assert.equal(chat.clientId, 'tamyiz');
    assert.equal(chat.mode, 'demo');
    assert.match(chat.reply, /tamyiz\.co@gmail\.com/);
  } finally {
    server.close();
  }
});

test('widget.js includes mobile responsive, keyboard, multiline, scroll, and error/offline states', async () => {
  const src = await fs.readFile(new URL('../public/widget.js', import.meta.url), 'utf8');

  // Multiline textarea, IME composition guard, and Shift+Enter newline support
  assert.match(src, /<textarea class="input" data-el="input"/);
  assert.match(src, /e\.isComposing \|\| e\.keyCode === 229/);
  assert.match(src, /e\.key === 'Enter' && !e\.shiftKey/);
  assert.match(src, /_autoResizeInput\(\)/);

  // Mobile keyboard adaptation via visualViewport
  assert.match(src, /window\.visualViewport/);
  assert.match(src, /--_vv-height/);
  assert.match(src, /--_kb-offset/);

  // Responsive breakpoints (320px, 360-430px, 768px, desktop) and overflow prevention
  assert.match(src, /@media \(min-width: 640px\) and \(max-width: 768px\)/);
  assert.match(src, /@media \(max-width: 639px\)/);
  assert.match(src, /@media \(max-width: 359px\)/);
  assert.match(src, /overflow-wrap: anywhere;/);

  // Natural scrolling, retry error state, and online/offline listeners
  assert.match(src, /scroll-bottom-btn/);
  assert.match(src, /_isNearBottom\(\)/);
  assert.match(src, /retry-btn/);
  assert.match(src, /addEventListener\('online'/);
  assert.match(src, /addEventListener\('offline'/);
});
