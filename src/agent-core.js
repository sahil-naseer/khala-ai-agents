export const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview',
  'gemini-3.5-flash-lite'
];

const catalogCache = new Map([
  ['tamyiz', {
    fetchedAt: 0,
    items: [
      {
        name: 'Four Minutes Fast',
        price: 550,
        status: 'on-sale',
        tagline: 'Six days. One signature. Eleven years to undo. A quiet, gripping novella about a daughter, her father, and the last window to say what matters.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/four-minutes-fast'
      },
      {
        name: 'The Girl Who Sold Dreams',
        price: 499,
        status: 'on-sale',
        tagline: "In a city that can't sleep, a 16-year-old girl sells dreams in jars until she steals one hiding a seven-year-old secret.",
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/the-girl-who-sold-dreams'
      },
      {
        name: 'The Last Letter from the Sea',
        price: 449,
        status: 'on-sale',
        tagline: 'A letter arrives from forty years ago. It knows what will happen next.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/the-last-letter-from-the-sea'
      },
      {
        name: 'The Built Mind',
        price: 400,
        status: 'on-sale',
        tagline: 'Stop relying on willpower. Build a mind that focuses, learns and recovers by design.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/the-built-mind'
      },
      {
        name: 'The First 12 Weeks',
        price: 349,
        status: 'on-sale',
        tagline: 'A practical, compassionate guide to navigating postpartum recovery, newborn care, rest, and emotional well-being during the first 12 weeks after birth.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/the-first-12-weeks'
      },
      {
        name: 'Start Selling Digital Products From Zero',
        price: 699,
        status: 'on-sale',
        tagline: 'A step-by-step playbook to find a niche, build, price and launch your first digital product, with no audience and no budget.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/start-selling-digital-products-from-zero'
      },
      {
        name: 'The AI Playbook',
        price: 299,
        status: 'on-sale',
        tagline: "Master prompting and choose the right AI tools. A beginner's guide to using AI well.",
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/the-ai-playbook'
      },
      {
        name: 'Stay Safe Online',
        price: 525,
        status: 'on-sale',
        tagline: 'How to avoid scams, hacks and data breaches. Plain language, no technical background needed.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/stay-safe-online'
      },
      {
        name: 'Research, Write & Cite with AI',
        price: 629,
        status: 'on-sale',
        tagline: 'Use AI for research without getting caught out by fake sources.',
        chapters: [],
        url: 'https://tamyiz.pages.dev/edition/research-write-and-cite-with-ai'
      }
    ]
  }]
]);
const CATALOG_TTL_MS = 5 * 60 * 1000;

/**
 * Unescape common HTML entities returned by product catalog endpoints.
 */
export function unescapeHtml(str) {
  return String(str || '').replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => (
    { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" }[e]
  ));
}

/**
 * Extract only the safe public fields needed by the browser widget.
 */
export function getPublicClientConfig(client) {
  return {
    id: client.id,
    businessName: client.businessName,
    agentName: client.agentName,
    tagline: client.tagline || 'Online',
    accentColor: client.accentColor || '#2563eb',
    greeting: client.greeting || `Hi! Welcome to ${client.businessName}. How can I help you?`,
    placeholder: client.placeholder || 'Type your question...',
    suggestedQuestions: Array.isArray(client.suggestedQuestions) ? client.suggestedQuestions : []
  };
}

const catalogInflight = new Map();

async function refreshCatalog(client) {
  if (catalogInflight.has(client.id)) {
    return catalogInflight.get(client.id);
  }
  const job = (async () => {
    try {
      const res = await fetch(client.catalogUrl, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return catalogCache.get(client.id)?.items || [];
      const data = await res.json();
      const rawProducts = Array.isArray(data?.products) ? data.products : [];
      const siteUrl = (client.siteUrl || '').replace(/\/$/, '');

      const items = rawProducts.map((p) => ({
        name: unescapeHtml(p.name),
        price: p.price,
        status: p.status || (p.available ? 'on-sale' : 'soon'),
        tagline: unescapeHtml(p.tagline),
        category: unescapeHtml(p.category || 'E-Books'),
        chapters: Array.isArray(p.tableOfContents) ? p.tableOfContents.map(unescapeHtml) : [],
        url: siteUrl && p.slug ? `${siteUrl}/edition/${p.slug}` : ''
      }));

      catalogCache.set(client.id, { items, fetchedAt: Date.now() });
      return items;
    } catch {
      return catalogCache.get(client.id)?.items || [];
    } finally {
      catalogInflight.delete(client.id);
    }
  })();
  catalogInflight.set(client.id, job);
  return job;
}

/**
 * Fetch and cache live product catalog with stale-while-revalidate if catalogUrl is configured.
 */
export async function fetchLiveCatalog(client) {
  if (!client?.catalogUrl) return [];

  const cached = catalogCache.get(client.id);
  if (cached) {
    if (Date.now() - cached.fetchedAt >= CATALOG_TTL_MS) {
      refreshCatalog(client).catch(() => {});
    }
    return cached.items;
  }

  return refreshCatalog(client);
}

/**
 * Build the system prompt for Gemini from a client's knowledge base, live catalog, and rules.
 */
export function buildSystemPrompt(client, catalog = []) {
  const kb = client.knowledgeBase || {};
  const faqsText = Array.isArray(kb.faqs)
    ? kb.faqs.map((f, i) => `${i + 1}. Q: ${f.question}\n   A: ${f.answer}`).join('\n')
    : 'No FAQs provided.';

  const catalogText = catalog.length > 0
    ? [
        `Total items in catalog: ${catalog.length}`,
        ...catalog.map((item, i) => {
          const priceStr = typeof item.price === 'number' ? `₹${item.price}` : 'Price TBA';
          const shortTagline = item.tagline.length > 90 ? `${item.tagline.slice(0, 87)}...` : item.tagline;
          const tocStr = item.chapters.length > 0 ? ` | ${item.chapters.length} ch: ${item.chapters.join(', ')}` : '';
          const urlStr = item.url ? ` | ${item.url}` : '';
          return `${i + 1}. "${item.name}" (${priceStr}, ${item.status}) — ${shortTagline}${tocStr}${urlStr}`;
        })
      ].join('\n')
    : '';

  const escalation = client.escalation || {};
  const contactParts = [
    escalation.email ? `Email: ${escalation.email}` : null,
    escalation.whatsapp ? `WhatsApp: ${escalation.whatsapp}` : null
  ].filter(Boolean);

  return [
    `You are "${client.agentName}", the official 24/7 AI Customer Support Agent for "${client.businessName}".`,
    `Tone & Style: ${client.tone || 'Helpful, concise, polite, and accurate.'}`,
    '',
    'Business Overview:',
    kb.overview || `${client.businessName} customer support.`,
    kb.workingHours ? `Working Hours: ${kb.workingHours}` : '',
    '',
    catalogText ? 'Live Product Catalog:\n' + catalogText + '\n' : '',
    'Knowledge Base & FAQs:',
    faqsText,
    '',
    'Strict Rules:',
    '- Only state facts, book titles, prices, policies, and contact details present in the Business Overview, Live Product Catalog, or FAQs above.',
    '- Never invent pricing, discounts, guarantees, or policies.',
    `- If you are unsure or the user needs human help, ${escalation.note || 'apologize politely and share our support contact.'}`,
    contactParts.length > 0 ? `Support Contact: ${contactParts.join(' | ')}` : '',
    '- Write plain URLs (e.g. https://tamyiz.pages.dev) without Markdown [text](url) syntax.',
    '- Keep responses concise (2–4 sentences unless listing books or step-by-step instructions).'
  ]
    .filter(Boolean)
    .join('\n');
}

function normalizeQuestion(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const GREETING_RE = /^(?:hi|hello|hey|salam|salaam|assalamu alaikum|assalam o alaikum|aoa|hi there|hello there)$/;

/**
 * Return an instant FAQ or greeting answer when the user's message matches a configured FAQ or greeting.
 */
export function matchExactFaq(client, userMessage) {
  const target = normalizeQuestion(userMessage);
  if (!target) return null;

  if (GREETING_RE.test(target)) {
    const name = client?.businessName || 'us';
    return `Hi! Welcome to ${name}. I can help you explore our 9 PDF e-books, bundle discounts (20% off 2 books, 25% off 3+), Razorpay checkout, or recovering a download link. What would you like to know?`;
  }

  const faqs = client?.knowledgeBase?.faqs || [];
  for (const faq of faqs) {
    if (normalizeQuestion(faq.question) === target) {
      return faq.answer;
    }
  }
  return null;
}

/**
 * Deterministic FAQ keyword matcher used when GEMINI_API_KEY is missing or temporarily unavailable.
 */
export function matchFaqFallback(client, userMessage, { isDemo = true } = {}) {
  const text = (userMessage || '').toLowerCase();
  const tokens = text.split(/[^a-z0-9\u0600-\u06FF]+/).filter((t) => t.length > 2);
  const faqs = client.knowledgeBase?.faqs || [];

  let bestFaq = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const haystack = `${faq.question} ${faq.answer}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  const demoSuffix = isDemo ? '\n\n(Demo mode: add GEMINI_API_KEY in .env for full AI responses.)' : '';

  if (bestFaq && bestScore >= 1) {
    return `${bestFaq.answer}${demoSuffix}`;
  }

  if (/hour|time|open|when/i.test(text) && client.knowledgeBase?.workingHours) {
    return `${client.knowledgeBase.workingHours}${demoSuffix}`;
  }

  const email = client.escalation?.email || 'our support team';
  const whatsapp = client.escalation?.whatsapp ? ` or WhatsApp ${client.escalation.whatsapp}` : '';
  if (!isDemo) {
    return `I'm not 100% sure about that from our current FAQ. Please reach out to ${email}${whatsapp} and our team will be happy to help!`;
  }
  return `Thanks for reaching out to ${client.businessName}! I'm currently running in local demo mode (no GEMINI_API_KEY set yet). You can ask one of the suggested questions above, or reach us at ${email}.`;
}

/**
 * Build sanitized Gemini contents array from conversation history and the latest user message.
 */
export function buildGeminiContents(message, history = []) {
  const sanitizedHistory = Array.isArray(history)
    ? history
        .slice(-10)
        .filter((m) => m && (m.role === 'user' || m.role === 'model') && typeof m.text === 'string' && m.text.trim())
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.text.slice(0, 2000) }]
        }))
    : [];

  return [
    ...sanitizedHistory,
    { role: 'user', parts: [{ text: message }] }
  ];
}
