const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    --_accent: var(--khala-accent, #2563eb);
    --_bg: var(--khala-bg, #ffffff);
    --_fg: var(--khala-fg, #0f172a);
    --_muted: var(--khala-muted, #64748b);
    --_surface: var(--khala-surface, #f1f5f9);
    --_border: var(--khala-border, #e2e8f0);
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 2147483000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.45;
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
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.25);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  }

  .launcher:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.4);
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
  }

  .launcher:focus-visible,
  .icon-btn:focus-visible,
  .chip:focus-visible,
  .send-btn:focus-visible,
  .input:focus-visible {
    outline: 2px solid var(--_accent);
    outline-offset: 2px;
  }

  .panel {
    width: min(370px, calc(100vw - 24px));
    height: min(540px, calc(100vh - 96px));
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    background: var(--_bg);
    border: 1px solid var(--_border);
    border-radius: 16px;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.22);
    overflow: hidden;
  }

  .panel[hidden] {
    display: none;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    background: var(--_accent);
    color: #ffffff;
  }

  .header-info {
    min-width: 0;
  }

  .agent-name {
    font-weight: 700;
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tagline {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    opacity: 0.9;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4ade80;
    flex-shrink: 0;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .icon-btn {
    border: none;
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.28);
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f8fafc;
  }

  .msg {
    max-width: 84%;
    padding: 10px 13px;
    border-radius: 14px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .msg.bot {
    align-self: flex-start;
    background: var(--_bg);
    border: 1px solid var(--_border);
    border-bottom-left-radius: 4px;
  }

  .msg.user {
    align-self: flex-end;
    background: var(--_accent);
    color: #ffffff;
    border-bottom-right-radius: 4px;
  }

  .msg.typing {
    color: var(--_muted);
    font-style: italic;
  }

  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px 14px;
    background: #f8fafc;
    border-top: 1px solid var(--_border);
  }

  .suggestions[hidden] {
    display: none;
  }

  .chip {
    border: 1px solid var(--_border);
    background: var(--_bg);
    color: var(--_fg);
    border-radius: 999px;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    text-align: left;
  }

  .chip:hover {
    border-color: var(--_accent);
    color: var(--_accent);
  }

  .composer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-top: 1px solid var(--_border);
    background: var(--_bg);
  }

  .input {
    flex: 1;
    min-width: 0;
    border: 1px solid var(--_border);
    border-radius: 10px;
    padding: 9px 12px;
    background: var(--_surface);
  }

  .send-btn {
    border: none;
    border-radius: 10px;
    padding: 9px 14px;
    background: var(--_accent);
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
  }

  .send-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .powered {
    text-align: center;
    font-size: 11px;
    color: var(--_muted);
    padding: 4px 8px 8px;
    background: var(--_bg);
  }
`);

const template = document.createElement('template');
template.innerHTML = `
  <section class="panel" role="dialog" aria-label="AI Support Chat" hidden>
    <header class="header">
      <div class="header-info">
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
    <div class="powered">Powered by Khala AI Agents</div>
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
      if (e.key === 'Escape' && !this._els.panel.hidden) {
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
    this._els.panel.hidden = false;
    this._els.launcher.setAttribute('aria-expanded', 'true');
    this._els.input.focus();
  }

  close() {
    this._els.panel.hidden = true;
    this._els.launcher.setAttribute('aria-expanded', 'false');
    this._els.launcher.focus();
  }

  toggle() {
    if (this._els.panel.hidden) {
      this.open();
    } else {
      this.close();
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
    this._els.messages.replaceChildren();
    const greeting = this._config?.greeting || fallbackGreeting || 'Hi! How can I help you today?';
    this._appendMessage('bot', greeting);
    this._renderSuggestions(this._config?.suggestedQuestions || []);
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

  _appendMessage(role, text, isTyping = false) {
    const div = document.createElement('div');
    div.className = `msg ${role}${isTyping ? ' typing' : ''}`;
    div.textContent = text;
    this._els.messages.append(div);
    this._els.messages.scrollTop = this._els.messages.scrollHeight;
    return div;
  }

  async sendMessage(rawText) {
    const text = (rawText || '').trim();
    if (!text || this._busy) return;

    this._busy = true;
    this._els.send.disabled = true;
    this._els.input.value = '';
    this._els.suggestions.hidden = true;

    this._appendMessage('user', text);
    const typingEl = this._appendMessage('bot', 'Thinking...', true);

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
        this._appendMessage('bot', data.reply);
      }
    } catch {
      typingEl.remove();
      this._appendMessage('bot', 'Unable to reach the support server right now.');
    } finally {
      this._busy = false;
      this._els.send.disabled = false;
      this._els.input.focus();
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
