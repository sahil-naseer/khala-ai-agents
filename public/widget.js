const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    --_accent: var(--khala-accent, #0B0B0B);
    --_yellow: var(--khala-yellow, #FFD60A);
    --_paper: var(--khala-paper, #F1F1EF);
    --_bg: var(--khala-bg, #FFFFFF);
    --_fg: var(--khala-fg, #0B0B0B);
    --_muted: var(--khala-muted, #5E5E59);
    --_border: var(--khala-border, rgba(0, 0, 0, 0.14));
    --_ease: cubic-bezier(0.22, 1, 0.36, 1);
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 2147483000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: var(--font-body, 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
    font-size: 14px;
    line-height: 1.5;
    color: var(--_fg);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  button, input, textarea {
    font: inherit;
    color: inherit;
  }

  .launcher {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    background: var(--_accent);
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.25);
    transition: background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.26s var(--_ease), box-shadow 0.24s ease;
  }

  .launcher:hover {
    background: var(--_yellow);
    color: #0B0B0B;
    border-color: #0B0B0B;
    transform: translateY(-2px) scale(1.06);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32), 0 0 0 1px #0B0B0B;
  }

  .launcher:active {
    transform: scale(0.95);
  }

  .launcher:focus-visible,
  .icon-btn:focus-visible,
  .chip:focus-visible,
  .send-btn:focus-visible,
  .input:focus-visible {
    outline: 2px solid #0B0B0B;
    outline-offset: 2px;
  }

  .icon-btn:focus-visible {
    outline-color: var(--_yellow);
  }

  .panel {
    width: min(384px, calc(100vw - 28px));
    height: min(556px, calc(100dvh - 96px));
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    background: var(--_paper);
    border: 1px solid #0B0B0B;
    border-radius: 26px;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transform: translateY(16px) scale(0.92);
    transform-origin: bottom right;
    pointer-events: none;
    box-shadow: none;
    transition: opacity 0.34s var(--_ease), transform 0.34s var(--_ease), visibility 0.34s;
  }

  .panel.is-open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
    box-shadow: 0 24px 52px -12px rgba(0, 0, 0, 0.28);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px;
    background: #0B0B0B;
    color: #FFFFFF;
    border-bottom: 1px solid #0B0B0B;
  }

  .header-info {
    min-width: 0;
  }

  .kicker {
    font-family: var(--font-sub, 'Space Grotesk', ui-monospace, SFMono-Regular, monospace);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--_yellow);
    margin-bottom: 2px;
  }

  .agent-name {
    font-family: var(--font-sub, 'Space Grotesk', system-ui, sans-serif);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tagline {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-family: var(--font-sub, 'Space Grotesk', system-ui, sans-serif);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--_yellow);
    flex-shrink: 0;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .icon-btn {
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: transparent;
    color: #FFFFFF;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s var(--_ease);
  }

  .icon-btn:hover {
    background: var(--_yellow);
    color: #0B0B0B;
    border-color: var(--_yellow);
    transform: scale(1.06);
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background:
      radial-gradient(rgba(0, 0, 0, 0.12) 1px, transparent 1.2px) 0 0 / 22px 22px,
      var(--_paper);
  }

  @keyframes khala-msg-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes khala-wave {
    0%, 60%, 100% {
      opacity: 0.35;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-4px);
    }
  }

  .msg {
    max-width: 86%;
    padding: 12px 16px;
    border-radius: 20px;
    font-size: 13.5px;
    line-height: 1.55;
    word-break: break-word;
    animation: khala-msg-in 0.32s var(--_ease) both;
  }

  .msg.bot {
    align-self: flex-start;
    background: var(--_bg);
    color: var(--_fg);
    border: 1px solid var(--_border);
    border-bottom-left-radius: 6px;
  }

  .msg.user {
    align-self: flex-end;
    background: #0B0B0B;
    color: #FFFFFF;
    border: 1px solid #0B0B0B;
    border-bottom-right-radius: 6px;
  }

  .msg p {
    margin: 0 0 8px;
  }

  .msg p:last-child {
    margin-bottom: 0;
  }

  .msg ul,
  .msg ol {
    margin: 6px 0;
    padding-left: 18px;
  }

  .msg ul:last-child,
  .msg ol:last-child {
    margin-bottom: 0;
  }

  .msg li + li {
    margin-top: 4px;
  }

  .msg a {
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;
    border-radius: 4px;
    padding: 0 2px;
  }

  .msg.bot a:hover {
    background: var(--_yellow);
    color: #0B0B0B;
    text-decoration: none;
  }

  .msg.typing {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--_muted);
    font-size: 12.5px;
    border-radius: 999px;
    padding: 10px 16px;
  }

  .typing-dots {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .typing-dots span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #0B0B0B;
    display: inline-block;
    animation: khala-wave 1.15s ease-in-out infinite;
  }

  .typing-dots span:nth-child(2) {
    animation-delay: 0.16s;
  }

  .typing-dots span:nth-child(3) {
    animation-delay: 0.32s;
  }

  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    padding: 10px 16px;
    background: var(--_paper);
    border-top: 1px solid var(--_border);
  }

  .suggestions[hidden] {
    display: none;
  }

  .chip {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: var(--_bg);
    color: var(--_fg);
    border-radius: 999px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.22s var(--_ease);
  }

  .chip:hover {
    background: var(--_yellow);
    border-color: #0B0B0B;
    color: #0B0B0B;
    transform: translateY(-1px);
  }

  .composer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid var(--_border);
    background: var(--_bg);
  }

  .input {
    flex: 1;
    min-width: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 999px;
    padding: 10px 16px;
    background: var(--_paper);
    color: var(--_fg);
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .input:focus {
    background: var(--_bg);
    border-color: #0B0B0B;
    outline: none;
  }

  .send-btn {
    border: 1px solid #0B0B0B;
    border-radius: 999px;
    padding: 10px 18px;
    background: #0B0B0B;
    color: #FFFFFF;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.22s var(--_ease);
  }

  .send-btn:hover:not(:disabled) {
    background: var(--_yellow);
    color: #0B0B0B;
  }

  .send-btn:active:not(:disabled) {
    transform: scale(0.96);
  }

  .send-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .powered {
    text-align: center;
    font-family: var(--font-sub, 'Space Grotesk', ui-monospace, SFMono-Regular, monospace);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--_muted);
    padding: 3px 10px 9px;
    background: var(--_bg);
  }

  @media (max-width: 768px) {
    :host {
      right: max(14px, env(safe-area-inset-right));
      bottom: max(14px, env(safe-area-inset-bottom));
    }
    .launcher {
      width: 44px;
      height: 44px;
    }
    .panel {
      border-radius: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel,
    .launcher,
    .icon-btn,
    .chip,
    .input,
    .send-btn {
      transition: none;
    }
    .msg,
    .typing-dots span {
      animation: none;
    }
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <section class="panel" role="dialog" aria-label="AI Support Chat" aria-hidden="true">
    <header class="header">
      <div class="header-info">
        <div class="kicker">[ AI SUPPORT ]</div>
        <div class="agent-name" data-el="agent-name">Support AI</div>
        <div class="tagline"><span class="dot" aria-hidden="true"></span><span data-el="tagline">Online</span></div>
      </div>
      <div class="header-actions">
        <button type="button" class="icon-btn" data-el="reset" title="New conversation" aria-label="New conversation">&#x21bb;</button>
        <button type="button" class="icon-btn" data-el="close" title="Close chat" aria-label="Close chat">&#x2715;</button>
      </div>
    </header>
    <div class="messages" data-el="messages" aria-live="polite"></div>
    <div class="suggestions" data-el="suggestions" hidden></div>
    <form class="composer" data-el="form">
      <input type="text" class="input" data-el="input" placeholder="Type your question..." maxlength="2000" autocomplete="off" />
      <button type="submit" class="send-btn" data-el="send">Send</button>
    </form>
    <div class="powered">[ TAMYIZ™ INSTANT SUPPORT ]</div>
  </section>
  <button type="button" class="launcher" data-el="launcher" aria-expanded="false" aria-label="Chat with AI Support" title="Chat with AI Support">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  </button>
`;

/**
 * Append plain text with inline **bold** segments and clickable https:// URLs using safe DOM nodes.
 */
function appendInlineFormatted(parent, text) {
  const tokenRe = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.append(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      const strong = document.createElement('strong');
      strong.textContent = token.slice(2, -2);
      parent.append(strong);
    } else {
      let url = token;
      let trailing = '';
      while (/[.,!?;:]$/.test(url)) {
        trailing = url.slice(-1) + trailing;
        url = url.slice(0, -1);
      }
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = url;
      parent.append(link);
      if (trailing) parent.append(document.createTextNode(trailing));
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parent.append(document.createTextNode(text.slice(lastIndex)));
  }
}

/**
 * Safely render paragraphs, bullet lists, bold spans, and URLs without innerHTML.
 */
function renderFormattedText(container, text) {
  container.replaceChildren();
  const lines = String(text || '').split(/\r?\n/);
  let currentList = null;
  let listTag = null;
  let paragraphLines = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const p = document.createElement('p');
    paragraphLines.forEach((line, idx) => {
      if (idx > 0) p.append(document.createElement('br'));
      appendInlineFormatted(p, line);
    });
    container.append(p);
    paragraphLines = [];
  };

  const flushList = () => {
    if (!currentList) return;
    container.append(currentList);
    currentList = null;
    listTag = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const bulletMatch = line.match(/^(?:[-*•])\s+(.+)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);

    if (bulletMatch || orderedMatch) {
      flushParagraph();
      const targetTag = orderedMatch ? 'ol' : 'ul';
      if (!currentList || listTag !== targetTag) {
        flushList();
        currentList = document.createElement(targetTag);
        listTag = targetTag;
      }
      const li = document.createElement('li');
      appendInlineFormatted(li, (orderedMatch || bulletMatch)[1]);
      currentList.append(li);
    } else {
      flushList();
      paragraphLines.push(line);
    }
  }

  flushParagraph();
  flushList();
}

class KhalaSupportWidget extends HTMLElement {
  static get observedAttributes() {
    return ['client', 'api-base'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.adoptedStyleSheets = [sheet];
    this.shadowRoot.append(template.content.cloneNode(true));

    this._els = {
      panel: this.shadowRoot.querySelector('.panel'),
      launcher: this.shadowRoot.querySelector('[data-el="launcher"]'),
      close: this.shadowRoot.querySelector('[data-el="close"]'),
      reset: this.shadowRoot.querySelector('[data-el="reset"]'),
      agentName: this.shadowRoot.querySelector('[data-el="agent-name"]'),
      tagline: this.shadowRoot.querySelector('[data-el="tagline"]'),
      messages: this.shadowRoot.querySelector('[data-el="messages"]'),
      suggestions: this.shadowRoot.querySelector('[data-el="suggestions"]'),
      form: this.shadowRoot.querySelector('[data-el="form"]'),
      input: this.shadowRoot.querySelector('[data-el="input"]'),
      send: this.shadowRoot.querySelector('[data-el="send"]')
    };

    this._history = [];
    this._config = null;
    this._busy = false;
    this._isOpen = false;
    this._scrollQueued = false;
    this._streamToken = 0;
  }

  connectedCallback() {
    this._els.launcher.addEventListener('click', () => this.toggle());
    this._els.close.addEventListener('click', () => this.close());
    this._els.reset.addEventListener('click', () => this.resetConversation());
    this._els.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage(this._els.input.value);
    });
    this.shadowRoot.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this._isOpen) {
        this.close();
      }
    });

    this.loadClientConfig();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal && this.isConnected && (name === 'client' || name === 'api-base')) {
      this.loadClientConfig();
    }
  }

  get clientId() {
    return this.getAttribute('client') || 'tamyiz';
  }

  get apiBase() {
    return (this.getAttribute('api-base') || window.location.origin).replace(/\/$/, '');
  }

  open() {
    this._isOpen = true;
    this._els.panel.classList.add('is-open');
    this._els.panel.setAttribute('aria-hidden', 'false');
    this._els.launcher.setAttribute('aria-expanded', 'true');
    this._scrollToBottom();
    requestAnimationFrame(() => this._els.input.focus());
  }

  close() {
    this._isOpen = false;
    this._els.panel.classList.remove('is-open');
    this._els.panel.setAttribute('aria-hidden', 'true');
    this._els.launcher.setAttribute('aria-expanded', 'false');
    this._els.launcher.focus();
  }

  toggle() {
    if (this._isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  async loadClientConfig() {
    try {
      const res = await fetch(`${this.apiBase}/api/clients/${encodeURIComponent(this.clientId)}/config`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this._config = await res.json();

      if (this._config.accentColor) {
        this.style.setProperty('--khala-accent', this._config.accentColor);
      }
      this._els.agentName.textContent = this._config.agentName || 'Support AI';
      this._els.tagline.textContent = this._config.tagline || 'Online';
      const label = `Chat with ${this._config.businessName || 'us'}`;
      this._els.launcher.setAttribute('aria-label', label);
      this._els.launcher.setAttribute('title', label);
      this._els.input.placeholder = this._config.placeholder || 'Type your question...';
      this.resetConversation();
    } catch {
      this._els.agentName.textContent = 'Support AI';
      this.resetConversation('Hi! How can I help you today?');
    }
  }

  resetConversation(fallbackGreeting) {
    this._streamToken += 1;
    this._history = [];
    this._els.messages.replaceChildren();
    const greeting = this._config?.greeting || fallbackGreeting || 'Hi! How can I help you today?';
    this._appendMessage('bot', greeting);
    this._renderSuggestions(this._config?.suggestedQuestions || []);
  }

  _scrollToBottom() {
    if (this._scrollQueued) return;
    this._scrollQueued = true;
    requestAnimationFrame(() => {
      this._scrollQueued = false;
      this._els.messages.scrollTop = this._els.messages.scrollHeight;
    });
  }

  _renderSuggestions(questions) {
    this._els.suggestions.replaceChildren();
    if (!Array.isArray(questions) || questions.length === 0) {
      this._els.suggestions.hidden = true;
      return;
    }
    this._els.suggestions.hidden = false;
    for (const q of questions) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = q;
      btn.addEventListener('click', () => this.sendMessage(q));
      this._els.suggestions.append(btn);
    }
  }

  _appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (role === 'bot') {
      renderFormattedText(div, text);
    } else {
      div.textContent = text;
    }
    this._els.messages.append(div);
    this._scrollToBottom();
    return div;
  }

  _appendTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'msg bot typing';
    const dots = document.createElement('span');
    dots.className = 'typing-dots';
    dots.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i += 1) {
      dots.append(document.createElement('span'));
    }
    const label = document.createElement('span');
    label.textContent = 'Writing reply...';
    div.append(dots, label);
    this._els.messages.append(div);
    this._scrollToBottom();
    return div;
  }

  _streamBotMessage(fullText) {
    const text = String(fullText || '');
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || text.length < 24) {
      return Promise.resolve(this._appendMessage('bot', text));
    }

    const token = ++this._streamToken;
    const div = document.createElement('div');
    div.className = 'msg bot';
    renderFormattedText(div, text);

    const textEntries = [];
    let totalChars = 0;
    const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const full = node.nodeValue || '';
      if (full.length > 0) {
        textEntries.push({ node, full });
        totalChars += full.length;
        node.nodeValue = '';
      }
    }

    this._els.messages.append(div);
    if (totalChars === 0) {
      this._scrollToBottom();
      return Promise.resolve(div);
    }

    const totalFrames = 28;
    let frame = 0;

    return new Promise((resolve) => {
      const step = () => {
        if (token !== this._streamToken || !div.isConnected) {
          resolve(div);
          return;
        }

        frame += 1;
        const t = Math.min(1, frame / totalFrames);
        const eased = 1 - Math.pow(1 - t, 2.2);
        let remaining = t >= 1 ? totalChars : Math.ceil(totalChars * eased);

        for (const entry of textEntries) {
          if (remaining <= 0) {
            entry.node.nodeValue = '';
          } else if (remaining >= entry.full.length) {
            entry.node.nodeValue = entry.full;
            remaining -= entry.full.length;
          } else {
            entry.node.nodeValue = entry.full.slice(0, remaining);
            remaining = 0;
          }
        }

        if (frame % 7 === 0 || t >= 1) {
          this._scrollToBottom();
        }

        if (t >= 1) {
          resolve(div);
          return;
        }
        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    });
  }

  async sendMessage(rawText) {
    const text = (rawText || '').trim();
    if (!text || this._busy) return;

    this._busy = true;
    this._els.send.disabled = true;
    this._els.input.value = '';
    this._els.suggestions.hidden = true;

    this._appendMessage('user', text);
    const typingEl = this._appendTypingIndicator();

    try {
      const res = await fetch(`${this.apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(20_000),
        body: JSON.stringify({
          clientId: this.clientId,
          message: text,
          history: this._history
        })
      });

      const data = await res.json();
      typingEl.remove();

      if (!res.ok) {
        this._appendMessage('bot', data.error || 'Sorry, something went wrong. Please try again.');
      } else {
        this._history.push({ role: 'user', text });
        this._history.push({ role: 'model', text: data.reply });
        await this._streamBotMessage(data.reply);
      }
    } catch {
      typingEl.remove();
      this._appendMessage('bot', 'Unable to reach the support server right now.');
    } finally {
      this._busy = false;
      this._els.send.disabled = false;
      if (this._isOpen) {
        this._els.input.focus();
      }
    }
  }
}

if (!customElements.get('khala-support-widget')) {
  customElements.define('khala-support-widget', KhalaSupportWidget);
}

// Auto-mount when embedded via <script src=".../widget.js" data-client="tamyiz"></script>
(() => {
  const current = document.currentScript;
  if (!current || current.hasAttribute('data-manual')) return;

  const mount = () => {
    if (document.querySelector('khala-support-widget')) return;
    const el = document.createElement('khala-support-widget');
    const client = current.getAttribute('data-client') || 'tamyiz';
    const apiBase = current.getAttribute('data-api-base') || new URL(current.src).origin;
    el.setAttribute('client', client);
    el.setAttribute('api-base', apiBase);
    document.body.append(el);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
