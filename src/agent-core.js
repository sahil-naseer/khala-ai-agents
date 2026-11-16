export const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3.7-flash'
];

const catalogCache = new Map();
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

/**
 * Fetch and cache live product catalog if the client config defines catalogUrl.
 */
export async function fetchLiveCatalog(client) {
  if (!client?.catalogUrl) return [];

  const cached = catalogCache.get(client.id);
  if (cached && Date.now() - cached.fetchedAt < CATALOG_TTL_MS) {
    return cached.items;
  }

  try {
    const res = await fetch(client.catalogUrl, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return cached?.items || [];
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
    return cached?.items || [];
  }
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
        `Total published/listed items currently in catalog: ${catalog.length}`,
        ...catalog.map((item, i) => {
          const priceStr = typeof item.price === 'number' ? `₹${item.price}` : 'Price TBA';
          const tocStr = item.chapters.length > 0 ? ` | Chapters (${item.chapters.length}): ${item.chapters.join('; ')}` : '';
          const urlStr = item.url ? ` | Link: ${item.url}` : '';
          return `${i + 1}. "${item.name}" — ${priceStr} [${item.status}] — ${item.tagline}${tocStr}${urlStr}`;
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
