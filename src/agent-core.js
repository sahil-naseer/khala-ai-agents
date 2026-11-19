export const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-flash-lite-latest'
];

export function getCandidateModels(configuredModel) {
  const clean = typeof configuredModel === 'string' ? configuredModel.trim() : '';
  const ignored = !clean || clean === 'gemini-3.1-flash-lite' || clean === 'gemini-3.5-flash';
  const primary = ignored ? 'gemini-3.5-flash-lite' : clean;
  return [...new Set([primary, ...CANDIDATE_MODELS])];
}

export function buildGenerationConfig(model = '') {
  const config = {
    temperature: 0.3,
    maxOutputTokens: 700
  };
  if (model && !String(model).includes('lite')) {
    config.thinkingConfig = { thinkingBudget: 0 };
  }
  return config;
}

const catalogCache = new Map([
  ['tamyiz', {
    fetchedAt: Date.now(),
    items: [
      {
        name: 'Four Minutes Fast',
        price: 550,
        status: 'on-sale',
        pages: '40',
        tagline: 'Six days. One signature. Eleven years to undo. A quiet, gripping novella about a daughter, her father, and the last window to say what matters.',
        description: '"Saturday morning is the last window." When a doctor calls Clara Mercer on a Sunday night, she learns three things at once: her father has a tumour that can still be cut out, he refuses to sign the consent form, and her name is still on his chart, eleven years after the funeral where she said something she has never been...',
        chapters: [
          'Day One: Monday · The Door',
          'Day Two: Tuesday · The Binder',
          'Day Three: Wednesday · With the Grain',
          'Day Four: Thursday · The Lantern',
          'Day Five: Friday · The Breakwater',
          'Day Six: Saturday · Four Minutes',
          'Epilogue: May · The Launch'
        ],
        url: 'https://tamyiz.pages.dev/edition/four-minutes-fast'
      },
      {
        name: 'The Girl Who Sold Dreams',
        price: 499,
        status: 'on-sale',
        pages: '56',
        tagline: "In a city that can't sleep, a 16-year-old girl sells dreams in jars until she steals one hiding a seven-year-old secret.",
        description: 'In Marrow, nobody sleeps. A low hum under the streets has kept the whole city awake for seven years. People survive on scraps of rest: twenty minutes on the tram, an hour in a chair. A real dream, the deep kind with a beginning and an end, is rarer than oranges in winter, and it sells for more. Sixteen-year-old Ila Bra...',
        chapters: [
          'Chapter 1 – Two Marks and a Yes',
          'Chapter 2 – Ninety Marks',
          'Chapter 3 – The Ring',
          'Chapter 4 – Bell Street',
          'Chapter 5 – Tea',
          'Chapter 6 – Heavy',
          'Chapter 7 – The Shape of It',
          'Chapter 8 – A Taste',
          'Chapter 9 – Seven, Eight, Nine'
        ],
        url: 'https://tamyiz.pages.dev/edition/the-girl-who-sold-dreams'
      },
      {
        name: 'The Last Letter from the Sea',
        price: 449,
        status: 'on-sale',
        pages: '60',
        tagline: 'A letter arrives from forty years ago. It knows what will happen next.',
        description: "The first letter arrives on a Tuesday, in the rain, with no stamp. Nora Vale is thirty-nine, and she has put her own life on hold for years. The envelope is damp, smells of tar and cold water, and is dated forty years ago, the week her father's ship went down. Its message is small: someone will knock at ten past four.",
        chapters: [
          'Prologue: The Sea Keeps Everything',
          'Chapter One: The Blue Envelope',
          'Chapter Two: The Light That Was Dark',
          'Chapter Three: The Cliff Path',
          'Chapter Four: What Ines Kept',
          'Chapter Five: The Man in the Green Scarf',
          'Chapter Six: Ink and Salt',
          'Chapter Seven: The Long Tide',
          'Chapter Eight: The Storm Letter',
          'Chapter Nine: Mist',
          'Chapter Ten: The Last Letter',
          'Epilogue: Dawn at the End of the Pier',
          'Afterword: A Note Before You Go',
          'Reading Group Questions'
        ],
        url: 'https://tamyiz.pages.dev/edition/the-last-letter-from-the-sea'
      },
      {
        name: 'The Built Mind',
        price: 400,
        status: 'on-sale',
        pages: '79',
        tagline: 'Stop relying on willpower. Build a mind that focuses, learns and recovers by design.',
        description: "You don't have a focus problem. You have a design problem. The Built Mind shows you how to stop fighting your phone, your habits and your moods with willpower, and build a system that does the work for you. It rests on five connected pillars: Attention, Environment, Habits, Learning and Resilience.",
        chapters: [
          'Before You Begin: The Email You Never Wrote',
          'The Built Mind System',
          '1. The Leaky Mind',
          '2. The Price of a Glance',
          '3. Deep Work Is a Place',
          '4. The Machine You Already Are',
          '5. Build the Room, Not the Resolution',
          '6. The Ugly Middle',
          '7. Retrieve, Space, Sleep',
          '8. The Storm Inside',
          '9. Shock Absorbers',
          '10. The Operating System',
          'The 7-Day Reset',
          'Your Built Mind Blueprint',
          'A Note on the Science'
        ],
        url: 'https://tamyiz.pages.dev/edition/the-built-mind'
      },
      {
        name: 'The First 12 Weeks',
        price: 349,
        status: 'on-sale',
        pages: '86',
        tagline: 'A practical, compassionate guide to navigating postpartum recovery, newborn care, rest, and emotional well-being during the first 12 weeks after birth.',
        description: 'The first 12 weeks after childbirth can bring physical changes, sleepless nights, emotional ups and downs, and countless questions. The First 12 Weeks is a practical guide designed to help new mothers navigate this transition with more clarity, confidence, and support.',
        chapters: [
          'Understanding the First 12 Weeks',
          'Postpartum Recovery and Rest',
          'Sleep and Shared Caregiving',
          'Nutrition and Simple Meal Planning',
          'Gentle Movement and Recovery',
          'Emotional Well-Being',
          'Building Manageable Daily Routines',
          'Practical Recovery Checklists',
          'Printable Trackers and Worksheets',
          'Healthcare Questions and Support Contacts'
        ],
        url: 'https://tamyiz.pages.dev/edition/the-first-12-weeks'
      },
      {
        name: 'Start Selling Digital Products From Zero',
        price: 699,
        status: 'on-sale',
        pages: '91',
        tagline: 'A step-by-step playbook to find a niche, build, price and launch your first digital product, with no audience and no budget.',
        description: "The complete beginner's guide to making your first digital product and actually selling it: templates, printables, e-books, checklists or AI prompt packs. Go step by step from idea to launch: pick a niche with real buyers, prove people want it before you build, build with free tools, price, list, launch and scale.",
        chapters: [
          'Start here',
          'Pick your niche',
          'Validate before you build',
          'Pick your first product',
          'Build it',
          'Choose your platform',
          'Price it',
          'Create the listing and sales page',
          'Build your audience',
          'Launch',
          'Grow your shop',
          'Mistakes to avoid and staying legal',
          'Stay organised and scale',
          'Four worked examples',
          'Toolkit: FAQ, 30-day calendar, 90-day plan, 12 templates, glossary, checklist'
        ],
        url: 'https://tamyiz.pages.dev/edition/start-selling-digital-products-from-zero'
      },
      {
        name: 'The AI Playbook',
        price: 299,
        status: 'on-sale',
        pages: '45',
        tagline: "Master prompting and choose the right AI tools. A beginner's guide to using AI well.",
        description: 'AI is now part of how people study, code, write, research, design and run businesses. Part One teaches you how to brief an AI clearly with 12 steps, 12 mistakes to avoid, and worked examples; Part Two covers the AI Toolkit across research, writing, coding, media, automation, plus 21 bonus prompts.',
        chapters: [
          'Why prompting matters',
          'What is prompting?',
          'Twelve steps to keep in mind before prompting',
          'Twelve mistakes to avoid',
          'Worked example: from vague to excellent',
          'Checklist, template and quick reference',
          'AI Toolkit 2026: think and research',
          'Write, translate and work',
          'Coding and development',
          'Images, design, video and avatars',
          'Voice, music, data and presentations',
          'Automation, workflows and SEO',
          'Open models and model families at a glance',
          'The practical starting set',
          'Bonus: the prompt library (21 prompts)'
        ],
        url: 'https://tamyiz.pages.dev/edition/the-ai-playbook'
      },
      {
        name: 'Stay Safe Online',
        price: 525,
        status: 'on-sale',
        pages: '55',
        tagline: 'How to avoid scams, hacks and data breaches. Plain language, no technical background needed.',
        description: 'Plain-language guide covering passwords, two-step verification and passkeys, spotting phishing messages and common scams, securing phones/Wi-Fi/sessions, banking safety, sections for students, families, and small businesses, an emergency action plan, and 16 real cases.',
        chapters: [
          'Why anyone can be a target',
          'Passwords that actually protect you',
          'Two-step verification and passkeys',
          'Anatomy of a phish: spotting fake messages',
          'Common scams to recognise',
          'Securing your phone, computer, Wi-Fi and sessions',
          'Social media, privacy and your identity',
          'Safe shopping, banking and mobile money',
          'A special chapter for students',
          'For parents and families',
          'Protecting your small business',
          'Updates, backups and everyday habits',
          'If it happens: your emergency action plan',
          '16 real cases, simple lessons',
          'Your toolkit: cheat sheet, 30-day plan, 10 scenarios, templates'
        ],
        url: 'https://tamyiz.pages.dev/edition/stay-safe-online'
      },
      {
        name: 'Research, Write & Cite with AI',
        price: 629,
        status: 'on-sale',
        pages: '76',
        tagline: 'Use AI for research without getting caught out by fake sources.',
        description: 'A step-by-step guide for university students and beginner researchers who want to use AI the right way: finding genuine papers, checking every claim so AI never traps you with fabricated citations, writing in your own words, and citing properly in APA, MLA and Harvard.',
        chapters: [
          'Why AI makes up sources',
          'Finding real papers with AI',
          'Checking every claim',
          'Writing in your own words',
          'Citing in APA, MLA and Harvard',
          'Your research checklist'
        ],
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

      const items = rawProducts.map((p) => {
        const pagesSpec = Array.isArray(p.specifications)
          ? p.specifications.find((s) => s && String(s.label).toLowerCase() === 'pages')
          : null;
        const pages = p.pages || (pagesSpec ? unescapeHtml(pagesSpec.value) : '');
        const cleanDesc = unescapeHtml(p.description || '').replace(/\s+/g, ' ').trim();
        return {
          name: unescapeHtml(p.name),
          price: p.price,
          status: p.status || (p.available ? 'on-sale' : 'soon'),
          pages: String(pages || '').trim(),
          tagline: unescapeHtml(p.tagline),
          description: cleanDesc.length > 320 ? `${cleanDesc.slice(0, 317)}...` : cleanDesc,
          category: unescapeHtml(p.category || 'E-Books'),
          chapters: Array.isArray(p.tableOfContents) ? p.tableOfContents.map(unescapeHtml) : [],
          url: siteUrl && p.slug ? `${siteUrl}/edition/${p.slug}` : ''
        };
      });

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
          const pagesStr = item.pages ? `, ${item.pages} pages` : '';
          const taglineStr = item.tagline ? ` — ${item.tagline}` : '';
          const tocStr = Array.isArray(item.chapters) && item.chapters.length > 0
            ? ` Chapters (${item.chapters.length}): ${item.chapters.join('; ')}.`
            : '';
          const urlStr = item.url ? ` URL: ${item.url}` : '';
          return `${i + 1}. "${item.name}" (${priceStr}, ${item.status}${pagesStr})${taglineStr}${tocStr}${urlStr}`;
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
    `- Never introduce yourself or repeat your name (NEVER start replies with "Hi, I'm ${client.agentName || 'Vee'}", "Hello, I am ${client.agentName || 'Vee'}", or similar greetings). The user already knows who you are from the chat header. Answer their question directly without repetitive greetings.`,
    '- Only state facts, book titles, prices, page counts, chapter names, policies, and contact details present in the Business Overview, Live Product Catalog, or FAQs above.',
    '- Give concrete, specific answers: when asked about books, topics, chapters, pages, pricing, refunds, or links, name the exact book titles, prices in ₹, page counts, relevant chapters from the catalog, and include the exact plain URL. Never give vague or generic summaries when specific details exist above.',
    '- Never invent pricing, discounts, guarantees, or policies.',
    `- If you are unsure or the user needs human help, ${escalation.note || 'apologize politely and share our support contact.'}`,
    contactParts.length > 0 ? `Support Contact: ${contactParts.join(' | ')}` : '',
    '- Write plain URLs (e.g. https://tamyiz.pages.dev/editions) without Markdown [text](url) syntax.',
    '- Keep responses concise and well-structured (2–5 sentences, or clean bullet points when listing books, chapters, or steps).'
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

const FAQ_ALIAS_MATCHERS = [
  {
    pattern: /^(?:how many (?:e ?)?books(?: do you have| are there| available| do you sell)?|what (?:e ?)?books (?:do you have|are available|do you sell)|(?:can you )?(?:list|show)(?: me)?(?: all)?(?: your)? (?:e ?)?books|all (?:your )?(?:e ?)?books|books list|catalog(?:ue)?)$/,
    matchFaq: (faq) => /how many books/i.test(faq.question)
  },
  {
    pattern: /^(?:(?:are there )?(?:any )?bundle discounts?(?: available)?|what (?:are )?(?:the )?(?:bundle )?discounts?(?: available)?|how do(?:es)? (?:the )?bundle discount work|do you have (?:any )?(?:bundle )?discounts?|offers?)$/,
    matchFaq: (faq) => /bundle discount/i.test(faq.question)
  },
  {
    pattern: /^(?:how (?:do i|to|can i) download(?: my)? (?:e ?book|book|pdf)(?: after paying| after payment)?|how do i get my (?:e ?book|book|pdf) after paying)$/,
    matchFaq: (faq) => /download.*after paying/i.test(faq.question)
  },
  {
    pattern: /^(?:(?:how (?:do i|to|can i) )?(?:recover|re ?download|get back)(?: a| my)? (?:lost )?(?:download )?(?:link|e ?book|book|file)s?|i lost my (?:download|e ?book|book|file)(?: link)?|lost download(?: link)?)$/,
    matchFaq: (faq) => /recover.*lost download/i.test(faq.question)
  }
];

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

  for (const alias of FAQ_ALIAS_MATCHERS) {
    if (alias.pattern.test(target)) {
      const matched = faqs.find(alias.matchFaq);
      if (matched) return matched.answer;
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

/**
 * Strips repetitive introductory greetings and self-introductions (e.g. "Hi, I'm Vee!").
 */
export function stripSelfIntro(text, agentName = 'Vee') {
  if (typeof text !== 'string') return '';
  const escapedName = (agentName || 'Vee').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const introPattern = new RegExp(
    `^(?:(?:Assalamu Alaikum[!,.]*|Hi|Hello|Hey|Greetings)[!,.]*\\s+)?(?:I'm|I am)\\s+${escapedName}(?:\\s*[,-]?\\s*(?:your|the|an)\\s+[^.!?\\n]+[!.?]+|\\s+from\\s+[^.!?\\n]+[!.?]+|[!,.]+|\\s+and\\s+[^.!?\\n]+[!.?]+)\\s*`,
    'i'
  );
  const stripped = text.replace(introPattern, '').trim();
  return stripped.length > 0 ? stripped : text.trim();
}
