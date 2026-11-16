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
    pointer-events: none;
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
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .launcher {
    position: relative;
    pointer-events: auto;
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

  .launcher svg {
    position: absolute;
    transition: opacity 0.22s ease, transform 0.26s var(--_ease);
  }

  .launcher .icon-bot {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .launcher .icon-close {
    opacity: 0;
    transform: rotate(-90deg) scale(0.6);
  }

  :host([data-open="true"]) .launcher .icon-bot {
    opacity: 0;
    transform: rotate(90deg) scale(0.6);
  }

  :host([data-open="true"]) .launcher .icon-close {
    opacity: 1;
    transform: rotate(0deg) scale(1);
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
    width: min(376px, calc(100vw - 28px));
    height: min(520px, calc(100dvh - 96px));
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    background: var(--_paper);
    border: 1px solid #0B0B0B;
    border-radius: 24px;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transform: translateY(14px) scale(0.94);
    transform-origin: bottom right;
    pointer-events: none;
    box-shadow: none;
    transition: opacity 0.28s var(--_ease), transform 0.28s var(--_ease), visibility 0.28s;
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
    padding: 15px 18px;
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
    padding: 14px;
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
      transform: translateY(8px) scale(0.985);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes khala-line-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
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
    max-width: 88%;
    padding: 11px 15px;
    border-radius: 20px;
    font-size: 13.5px;
    line-height: 1.55;
    word-break: break-word;
    animation: khala-msg-in 0.28s var(--_ease) both;
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

  .msg.bot.is-revealing p,
  .msg.bot.is-revealing li,
  .msg.bot.is-revealing h3,
  .msg.bot.is-revealing h4 {
    animation: khala-line-in 0.28s var(--_ease) both;
    animation-delay: calc(var(--line-idx, 0) * 45ms);
  }

  .msg p {
    margin: 0 0 8px;
  }

  .msg p:last-child {
    margin-bottom: 0;
  }

  .msg h3,
  .msg h4 {
    margin: 2px 0 6px;
    font-family: var(--font-sub, 'Space Grotesk', system-ui, sans-serif);
    font-size: 13.5px;
    font-weight: 700;
    line-height: 1.35;
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

  .msg code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    background: rgba(0, 0, 0, 0.06);
    padding: 1px 5px;
    border-radius: 6px;
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
    gap: 6px;
    margin-top: 2px;
    animation: khala-msg-in 0.3s var(--_ease) 0.08s both;
  }

  .chip {
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: var(--_bg);
    color: var(--_fg);
    border-radius: 999px;
    padding: 7px 13px;
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
    padding: 9px 15px;
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
    padding: 9px 17px;
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

  @media (max-width: 768px), (pointer: coarse) {
    .launcher {
      width: 44px;
      height: 44px;
    }
    .input {
      font-size: 16px;
    }
  }

  @media (max-width: 639px) {
    :host {
      right: max(12px, env(safe-area-inset-right));
      bottom: max(12px, env(safe-area-inset-bottom));
    }
    .panel {
      width: min(328px, calc(100vw - 24px));
      height: min(420px, calc(100dvh - 96px));
      margin-bottom: 8px;
      border-radius: 22px;
    }
    .header {
      padding: 12px 15px;
    }
    .kicker {
      font-size: 9px;
    }
    .agent-name {
      font-size: 14px;
    }
    .tagline {
      font-size: 9.5px;
    }
    .icon-btn {
      width: 32px;
      height: 32px;
    }
    .messages {
      padding: 12px;
      gap: 8px;
    }
    .msg {
      padding: 9px 13px;
      font-size: 13px;
      border-radius: 17px;
    }
    .chip {
      padding: 6px 12px;
      font-size: 12px;
    }
    .composer {
      padding: 8px 10px;
      gap: 6px;
    }
    .input {
      padding: 8px 13px;
      min-height: 38px;
    }
    .send-btn {
      padding: 0 14px;
      min-height: 38px;
      font-size: 13px;
    }
    .powered {
      font-size: 9px;
      padding: 2px 8px 7px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .panel,
    .launcher,
    .launcher svg,
    .icon-btn,
    .chip,
    .input,
    .send-btn {
      transition: none;
    }
    .msg,
    .msg.bot.is-revealing p,
    .msg.bot.is-revealing li,
    .msg.bot.is-revealing h3,
    .msg.bot.is-revealing h4,
    .suggestions,
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
    <form class="composer" data-el="form">
      <input type="text" class="input" data-el="input" placeholder="Type your question..." maxlength="2000" autocomplete="off" />
      <button type="submit" class="send-btn" data-el="send">Send</button>
    </form>
    <div class="powered">[ TAMYIZ™ INSTANT SUPPORT ]</div>
  </section>
  <button type="button" class="launcher" data-el="launcher" aria-expanded="false" aria-label="Chat with AI Support" title="Chat with AI Support">
    <svg class="icon-bot" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
    <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </button>
`;

/**
 * Append plain text with inline markdown links, bare URLs, **bold**, *italic*, and `code` safely.
 */
function appendInlineFormatted(parent, text) {
  const tokenRe = /(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`\n]+`|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.append(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    const token = match[0];
    if (token.startsWith('[')) {
      const mdLink = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      if (mdLink) {
        const link = document.createElement('a');
        link.href = mdLink[2];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = mdLink[1];
        parent.append(link);
      } else {
        parent.append(document.createTextNode(token));
      }
    } else if (token.startsWith('**') && token.endsWith('**')) {
      const strong = document.createElement('strong');
      strong.textContent = token.slice(2, -2);
      parent.append(strong);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      const em = document.createElement('em');
      em.textContent = token.slice(1, -1);
      parent.append(em);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      const code = document.createElement('code');
      code.textContent = token.slice(1, -1);
      parent.append(code);
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
 * Safely render headings, paragraphs, bullet/numbered lists, bold/italic/code, and links without innerHTML.
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

    const headingMatch = line.match(/^#{1,4}\s+(.+)$/);
    const bulletMatch = line.match(/^(?:[-*•])\s+(.+)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);

    if (headingMatch) {
      flushParagraph();
      flushList();
      const h = document.createElement('h3');
      appendInlineFormatted(h, headingMatch[1]);
      container.append(h);
    } else if (bulletMatch || orderedMatch) {
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
      form: this.shadowRoot.querySelector('[data-el="form"]'),
      input: this.shadowRoot.querySelector('[data-el="input"]'),
      send: this.shadowRoot.querySelector('[data-el="send"]')
    };

    this._history = [];
    this._config = null;
    this._busy = false;
    this._isOpen = false;
    this._scrollQueued = false;
    this._suggestionsEl = null;
    this._listenersBound = false;
    this._onDocPointerDown = (e) => {
      if (this._isOpen && !e.composedPath().includes(this)) {
        this.close();
      }
    };
  }

  connectedCallback() {
    if (!this._listenersBound) {
      this._listenersBound = true;
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
    }

    document.addEventListener('pointerdown', this._onDocPointerDown);
    this.loadClientConfig();
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._onDocPointerDown);
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

  _isCoarsePointer() {
    return Boolean(window.matchMedia?.('(pointer: coarse)').matches);
  }

  open() {
    this._isOpen = true;
    this.setAttribute('data-open', 'true');
    this._els.panel.classList.add('is-open');
    this._els.panel.setAttribute('aria-hidden', 'false');
    this._els.launcher.setAttribute('aria-expanded', 'true');
    this._scrollToBottom();
    if (!this._isCoarsePointer()) {
      requestAnimationFrame(() => this._els.input.focus());
    }
  }

  close() {
    this._isOpen = false;
    this.removeAttribute('data-open');
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
    this._history = [];
    this._suggestionsEl = null;
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
    if (this._suggestionsEl) {
      this._suggestionsEl.remove();
      this._suggestionsEl = null;
    }
    if (!Array.isArray(questions) || questions.length === 0) return;

    const wrap = document.createElement('div');
    wrap.className = 'suggestions';
    for (const q of questions) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.textContent = q;
      btn.addEventListener('click', () => this.sendMessage(q));
      wrap.append(btn);
    }
    this._suggestionsEl = wrap;
    this._els.messages.append(wrap);
  }

  _appendMessage(role, text, animateBlocks = false) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (role === 'bot') {
      renderFormattedText(div, text);
      if (animateBlocks) {
        div.classList.add('is-revealing');
        const blocks = div.querySelectorAll('p, li, h3, h4');
        blocks.forEach((el, idx) => {
          el.style.setProperty('--line-idx', String(Math.min(idx, 8)));
        });
      }
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

  async sendMessage(rawText) {
    const text = (rawText || '').trim();
    if (!text || this._busy) return;

    this._busy = true;
    this._els.send.disabled = true;
    this._els.input.value = '';
    if (this._suggestionsEl) {
      this._suggestionsEl.remove();
      this._suggestionsEl = null;
    }

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
        this._appendMessage('bot', data.error || 'Sorry, something went wrong. Please try again.', true);
      } else {
        this._history.push({ role: 'user', text });
        this._history.push({ role: 'model', text: data.reply });
        this._appendMessage('bot', data.reply, true);
      }
    } catch {
      typingEl.remove();
      this._appendMessage('bot', 'Unable to reach the support server right now.', true);
    } finally {
      this._busy = false;
      this._els.send.disabled = false;
      if (this._isOpen && !this._isCoarsePointer()) {
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
