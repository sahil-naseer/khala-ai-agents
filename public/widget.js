const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  :host {
    --_accent: var(--khala-accent, #0B0B0B);
    --_yellow: var(--khala-yellow, #FFD60A);
    --_paper: var(--khala-paper, #F1F1EF);
    --_bg: var(--khala-bg, #FFFFFF);
    --_fg: var(--khala-fg, #0B0B0B);
    --_muted: var(--khala-muted, #5E5E59);
    --_border: var(--khala-border, rgba(0, 0, 0, 0.12));
    --_danger: #B91C1C;
    --_danger-bg: #FEF2F2;
    --_danger-border: rgba(185, 28, 28, 0.25);
    --_ease: cubic-bezier(0.22, 1, 0.36, 1);
    --_vv-height: 100dvh;
    --_kb-offset: 0px;
    position: fixed;
    right: 24px;
    bottom: 24px;
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

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(11, 11, 11, 0.32);
    opacity: 0;
    pointer-events: none;
    touch-action: none;
    transition: opacity 0.28s var(--_ease);
    display: none;
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
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.22);
    transition: background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease, transform 0.26s var(--_ease), opacity 0.22s ease, box-shadow 0.24s ease;
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

  @media (hover: hover) {
    .launcher:hover {
      background: var(--_yellow);
      color: #0B0B0B;
      border-color: #0B0B0B;
      transform: translateY(-2px) scale(1.06);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.32), 0 0 0 1px #0B0B0B;
    }
  }

  .launcher:active {
    transform: scale(0.94);
  }

  .launcher:focus-visible,
  .icon-btn:focus-visible,
  .chip:focus-visible,
  .send-btn:focus-visible,
  .scroll-bottom-btn:focus-visible,
  .retry-btn:focus-visible,
  .input:focus-visible {
    outline: 2px solid #0B0B0B;
    outline-offset: 2px;
  }

  .icon-btn:focus-visible {
    outline-color: var(--_yellow);
  }

  .panel {
    position: relative;
    width: min(380px, calc(100vw - 32px));
    height: min(540px, calc(100dvh - 104px));
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    background: var(--_paper);
    border: 1px solid #0B0B0B;
    border-radius: 24px;
    overflow: hidden;
    overscroll-behavior: contain;
    visibility: hidden;
    opacity: 0;
    transform: translateY(14px) scale(0.95);
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
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 16px;
    background: #0B0B0B;
    color: #FFFFFF;
    border-bottom: 1px solid #0B0B0B;
  }

  .header-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: var(--_yellow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .header-info {
    min-width: 0;
  }

  .agent-name {
    font-family: var(--font-sub, 'Space Grotesk', system-ui, sans-serif);
    font-weight: 600;
    font-size: 14.5px;
    letter-spacing: -0.02em;
    line-height: 1.25;
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
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.74);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--_yellow);
    flex-shrink: 0;
    transition: background-color 0.2s ease;
  }

  :host([data-offline="true"]) .dot {
    background: #9CA3AF;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .icon-btn {
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: transparent;
    color: #FFFFFF;
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s var(--_ease);
  }

  @media (hover: hover) {
    .icon-btn:hover {
      background: var(--_yellow);
      color: #0B0B0B;
      border-color: var(--_yellow);
      transform: scale(1.06);
    }
  }

  .icon-btn:active {
    transform: scale(0.93);
  }

  .messages-wrap {
    position: relative;
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }

  .messages {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background:
      radial-gradient(rgba(0, 0, 0, 0.11) 1px, transparent 1.2px) 0 0 / 22px 22px,
      var(--_paper);
  }

  .scroll-bottom-btn {
    position: absolute;
    right: 12px;
    bottom: 10px;
    z-index: 2;
    border: 1px solid #0B0B0B;
    border-radius: 999px;
    background: var(--_bg);
    color: #0B0B0B;
    padding: 6px 12px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.22s var(--_ease), background-color 0.2s ease;
  }

  .scroll-bottom-btn.is-visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .scroll-bottom-btn:hover {
    background: var(--_yellow);
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
      transform: translateY(5px);
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

  .msg-row {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    animation: khala-msg-in 0.28s var(--_ease) both;
  }

  .msg-row.user {
    align-items: flex-end;
  }

  .msg-row.bot {
    align-items: flex-start;
  }

  .msg {
    max-width: 85%;
    padding: 11px 14px;
    border-radius: 18px;
    font-size: 13.5px;
    line-height: 1.52;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .msg.bot {
    background: var(--_bg);
    color: var(--_fg);
    border: 1px solid var(--_border);
    border-bottom-left-radius: 4px;
  }

  .msg.user {
    background: #0B0B0B;
    color: #FFFFFF;
    border: 1px solid #0B0B0B;
    border-bottom-right-radius: 4px;
  }

  .msg.bot.is-error {
    background: var(--_danger-bg);
    border-color: var(--_danger-border);
    color: #7F1D1D;
  }

  .msg-meta {
    font-size: 10px;
    line-height: 1.2;
    color: var(--_muted);
    margin-top: 3px;
    padding: 0 4px;
    user-select: none;
  }

  .retry-btn {
    margin-top: 8px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #0B0B0B;
    border-radius: 999px;
    background: #FFFFFF;
    color: #0B0B0B;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.18s ease, transform 0.18s var(--_ease);
  }

  .retry-btn:hover {
    background: var(--_yellow);
  }

  .retry-btn:active {
    transform: scale(0.96);
  }

  .msg.bot.is-revealing p,
  .msg.bot.is-revealing li,
  .msg.bot.is-revealing h3,
  .msg.bot.is-revealing h4 {
    animation: khala-line-in 0.26s var(--_ease) both;
    animation-delay: calc(var(--line-idx, 0) * 40ms);
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
    padding: 9px 15px;
  }

  .typing-dots {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .typing-dots span {
    width: 6px;
    height: 6px;
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
    border: 1px solid rgba(0, 0, 0, 0.18);
    background: var(--_bg);
    color: var(--_fg);
    border-radius: 999px;
    padding: 7px 13px;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    text-align: left;
    line-height: 1.35;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.22s var(--_ease);
  }

  @media (hover: hover) {
    .chip:hover {
      background: var(--_yellow);
      border-color: #0B0B0B;
      color: #0B0B0B;
      transform: translateY(-1px);
    }
  }

  .chip:active {
    background: var(--_yellow);
    border-color: #0B0B0B;
    transform: scale(0.97);
  }

  .composer {
    flex-shrink: 0;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 10px 12px;
    border-top: 1px solid var(--_border);
    background: var(--_bg);
  }

  .input {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    max-height: 104px;
    resize: none;
    overflow-y: hidden;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 9px 14px;
    line-height: 1.4;
    background: var(--_paper);
    color: var(--_fg);
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  .input::placeholder {
    color: var(--_muted);
  }

  .input:focus {
    background: var(--_bg);
    border-color: #0B0B0B;
    outline: none;
  }

  .send-btn {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid #0B0B0B;
    border-radius: 50%;
    background: #0B0B0B;
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, transform 0.22s var(--_ease);
  }

  @media (hover: hover) {
    .send-btn:hover:not(:disabled) {
      background: var(--_yellow);
      color: #0B0B0B;
    }
  }

  .send-btn:active:not(:disabled) {
    transform: scale(0.94);
  }

  .send-btn:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }

  .powered {
    flex-shrink: 0;
    text-align: center;
    font-family: var(--font-sub, 'Space Grotesk', ui-monospace, SFMono-Regular, monospace);
    font-size: 9.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--_muted);
    padding: 2px 10px 8px;
    background: var(--_bg);
  }

  /* Tablet */
  @media (min-width: 640px) and (max-width: 768px) {
    :host {
      right: 18px;
      bottom: 18px;
    }
    .panel {
      width: 368px;
      height: min(520px, calc(100dvh - 96px));
      border-radius: 22px;
      margin-bottom: 12px;
    }
  }

  @media (pointer: coarse) {
    .input {
      font-size: 16px;
    }
  }

  /* Dedicated mobile layout (360px - 430px and <= 639px) */
  @media (max-width: 639px) {
    :host {
      right: max(14px, env(safe-area-inset-right));
      bottom: max(14px, env(safe-area-inset-bottom));
    }
    :host([data-open="true"]) {
      right: max(10px, env(safe-area-inset-right));
      bottom: max(10px, env(safe-area-inset-bottom));
    }
    .backdrop {
      display: block;
    }
    :host([data-open="true"]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }
    .launcher {
      width: 46px;
      height: 46px;
    }
    :host([data-open="true"]) .launcher {
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0;
      pointer-events: none;
      transform: scale(0.8);
    }
    .panel {
      width: calc(100vw - 20px);
      max-width: 420px;
      height: min(520px, calc(var(--_vv-height, 100dvh) - 24px));
      max-height: calc(var(--_vv-height, 100dvh) - 20px);
      margin-bottom: var(--_kb-offset, 0px);
      border-radius: 22px;
      transform: translateY(20px) scale(0.97);
      transform-origin: bottom center;
    }
    .header {
      padding: 11px 14px;
    }
    .messages {
      padding: 12px;
      gap: 9px;
    }
    .msg {
      max-width: 86%;
      padding: 10px 13px;
      font-size: 14px;
    }
    .chip {
      padding: 8px 13px;
      font-size: 12.5px;
    }
    .composer {
      padding: 9px 10px;
      gap: 8px;
    }
    .input {
      font-size: 16px;
      min-height: 42px;
      padding: 9px 14px;
      border-radius: 21px;
    }
    .send-btn {
      width: 42px;
      height: 42px;
    }
    .powered {
      font-size: 9px;
      padding: 2px 8px 6px;
    }
  }

  /* Compact small phones (320px - 359px) */
  @media (max-width: 359px) {
    :host {
      right: max(10px, env(safe-area-inset-right));
      bottom: max(10px, env(safe-area-inset-bottom));
    }
    :host([data-open="true"]) {
      right: max(6px, env(safe-area-inset-right));
      bottom: max(8px, env(safe-area-inset-bottom));
    }
    .panel {
      width: calc(100vw - 12px);
      height: calc(var(--_vv-height, 100dvh) - 16px);
      max-height: calc(var(--_vv-height, 100dvh) - 16px);
      border-radius: 18px;
    }
    .header {
      padding: 10px 12px;
    }
    .avatar {
      width: 26px;
      height: 26px;
    }
    .agent-name {
      font-size: 13.5px;
    }
    .messages {
      padding: 10px;
    }
    .msg {
      max-width: 90%;
      padding: 9px 12px;
      font-size: 13.5px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .backdrop,
    .panel,
    .launcher,
    .launcher svg,
    .icon-btn,
    .chip,
    .input,
    .send-btn,
    .scroll-bottom-btn,
    .retry-btn {
      transition: none;
    }
    .msg-row,
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
  <div class="backdrop" data-el="backdrop" aria-hidden="true"></div>
  <section class="panel" role="dialog" aria-label="AI Support Chat" aria-hidden="true">
    <header class="header">
      <div class="header-brand">
        <div class="avatar" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
        </div>
        <div class="header-info">
          <div class="agent-name" data-el="agent-name">Support AI</div>
          <div class="tagline"><span class="dot" aria-hidden="true"></span><span data-el="tagline">Online</span></div>
        </div>
      </div>
      <div class="header-actions">
        <button type="button" class="icon-btn" data-el="reset" title="New conversation" aria-label="New conversation">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
        <button type="button" class="icon-btn" data-el="close" title="Close chat" aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </header>
    <div class="messages-wrap">
      <div class="messages" data-el="messages" aria-live="polite"></div>
      <button type="button" class="scroll-bottom-btn" data-el="scroll-bottom" aria-label="Jump to latest message">&darr; Latest</button>
    </div>
    <form class="composer" data-el="form">
      <textarea class="input" data-el="input" rows="1" placeholder="Type your question..." maxlength="2000" aria-label="Type your message"></textarea>
      <button type="submit" class="send-btn" data-el="send" aria-label="Send message" title="Send message" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </button>
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

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit'
});

function formatTimestamp(date = new Date()) {
  try {
    return timeFormatter.format(date);
  } catch {
    return '';
  }
}

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
      backdrop: this.shadowRoot.querySelector('[data-el="backdrop"]'),
      panel: this.shadowRoot.querySelector('.panel'),
      launcher: this.shadowRoot.querySelector('[data-el="launcher"]'),
      close: this.shadowRoot.querySelector('[data-el="close"]'),
      reset: this.shadowRoot.querySelector('[data-el="reset"]'),
      agentName: this.shadowRoot.querySelector('[data-el="agent-name"]'),
      tagline: this.shadowRoot.querySelector('[data-el="tagline"]'),
      messages: this.shadowRoot.querySelector('[data-el="messages"]'),
      scrollBottom: this.shadowRoot.querySelector('[data-el="scroll-bottom"]'),
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
    this._wasNearBottom = true;

    this._onDocPointerDown = (e) => {
      if (this._isOpen && !e.composedPath().includes(this)) {
        this.close();
      }
    };

    this._onViewportChange = () => this._updateViewportMetrics();
    this._onOnlineChange = () => this._syncOnlineStatus();
  }

  connectedCallback() {
    if (!this._listenersBound) {
      this._listenersBound = true;
      this._els.launcher.addEventListener('click', () => this.toggle());
      this._els.close.addEventListener('click', () => this.close());
      this._els.backdrop.addEventListener('click', () => this.close());
      this._els.reset.addEventListener('click', () => this.resetConversation());
      this._els.scrollBottom.addEventListener('click', () => {
        this._scrollToBottom(true);
        this._els.scrollBottom.classList.remove('is-visible');
      });

      this._els.messages.addEventListener('scroll', () => {
        this._wasNearBottom = this._isNearBottom();
        if (this._wasNearBottom) {
          this._els.scrollBottom.classList.remove('is-visible');
        }
      }, { passive: true });

      this._els.input.addEventListener('input', () => {
        this._autoResizeInput();
        this._syncSendState();
      });

      this._els.input.addEventListener('focus', () => {
        this._updateViewportMetrics();
        if (this._wasNearBottom) {
          this._scrollToBottom();
        }
      });

      this._els.input.addEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 229) return;
        if (e.key === 'Enter' && !e.shiftKey && !this._isCoarsePointer()) {
          e.preventDefault();
          if (!this._busy && this._els.input.value.trim()) {
            this.sendMessage(this._els.input.value);
          }
        }
      });

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
    window.addEventListener('online', this._onOnlineChange);
    window.addEventListener('offline', this._onOnlineChange);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this._onViewportChange);
      window.visualViewport.addEventListener('scroll', this._onViewportChange);
    }

    this._updateViewportMetrics();
    this._syncOnlineStatus();
    this._syncSendState();
    this.loadClientConfig();
  }

  disconnectedCallback() {
    document.removeEventListener('pointerdown', this._onDocPointerDown);
    window.removeEventListener('online', this._onOnlineChange);
    window.removeEventListener('offline', this._onOnlineChange);
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this._onViewportChange);
      window.visualViewport.removeEventListener('scroll', this._onViewportChange);
    }
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

  _isNearBottom() {
    const el = this._els.messages;
    return el.scrollHeight - el.scrollTop - el.clientHeight <= 72;
  }

  _autoResizeInput() {
    const el = this._els.input;
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, 104);
    if (next > 0) {
      el.style.height = `${next}px`;
    }
    el.style.overflowY = el.scrollHeight > 104 ? 'auto' : 'hidden';
  }

  _syncSendState() {
    this._els.send.disabled = this._busy || !this._els.input.value.trim();
  }

  _syncOnlineStatus() {
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    if (offline) {
      this.setAttribute('data-offline', 'true');
      this._els.tagline.textContent = 'Offline — check connection';
    } else {
      this.removeAttribute('data-offline');
      this._els.tagline.textContent = this._config?.tagline || 'Online';
    }
  }

  _updateViewportMetrics() {
    const vv = window.visualViewport;
    if (!vv) return;
    const kbOffset = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
    this.style.setProperty('--_vv-height', `${Math.round(vv.height)}px`);
    this.style.setProperty('--_kb-offset', `${kbOffset}px`);
    if (this._isOpen && this._wasNearBottom) {
      this._scrollToBottom();
    }
  }

  open() {
    this._isOpen = true;
    this._updateViewportMetrics();
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
    this._els.input.blur();
    if (this.shadowRoot.activeElement && this.shadowRoot.activeElement !== this._els.launcher) {
      this._els.launcher.focus();
    }
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
      this._syncOnlineStatus();
      const label = `Chat with ${this._config.businessName || 'us'}`;
      this._els.launcher.setAttribute('aria-label', label);
      this._els.launcher.setAttribute('title', label);
      this._els.input.placeholder = this._config.placeholder || 'Type your question...';
      this.resetConversation();
    } catch {
      this._els.agentName.textContent = 'Support AI';
      this._syncOnlineStatus();
      this.resetConversation('Hi! How can I help you today?');
    }
  }

  resetConversation(fallbackGreeting) {
    this._history = [];
    this._suggestionsEl = null;
    this._wasNearBottom = true;
    this._els.scrollBottom.classList.remove('is-visible');
    this._els.messages.replaceChildren();
    const greeting = this._config?.greeting || fallbackGreeting || 'Hi! How can I help you today?';
    this._appendMessage('bot', greeting);
    this._renderSuggestions(this._config?.suggestedQuestions || []);
  }

  _scrollToBottom(smooth = false) {
    if (this._scrollQueued) return;
    this._scrollQueued = true;
    requestAnimationFrame(() => {
      this._scrollQueued = false;
      const el = this._els.messages;
      if (smooth && typeof el.scrollTo === 'function') {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      } else {
        el.scrollTop = el.scrollHeight;
      }
      this._wasNearBottom = true;
      this._els.scrollBottom.classList.remove('is-visible');
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

  _appendMessage(role, text, options = {}) {
    const { animateBlocks = false, isError = false, retryText = null, preserveScroll = true } = options;
    const wasNearBottom = this._isNearBottom();

    const row = document.createElement('div');
    row.className = `msg-row ${role}`;

    const div = document.createElement('div');
    div.className = `msg ${role}${isError ? ' is-error' : ''}`;
    if (role === 'bot') {
      renderFormattedText(div, text);
      if (animateBlocks) {
        div.classList.add('is-revealing');
        const blocks = div.querySelectorAll('p, li, h3, h4');
        blocks.forEach((el, idx) => {
          el.style.setProperty('--line-idx', String(Math.min(idx, 8)));
        });
      }
      if (isError && retryText) {
        const retryBtn = document.createElement('button');
        retryBtn.type = 'button';
        retryBtn.className = 'retry-btn';
        retryBtn.textContent = '\u21bb Retry';
        retryBtn.addEventListener('click', () => {
          row.remove();
          this.sendMessage(retryText, { skipUserBubble: true });
        });
        div.append(retryBtn);
      }
    } else {
      div.textContent = text;
    }

    const meta = document.createElement('div');
    meta.className = 'msg-meta';
    meta.textContent = formatTimestamp();

    row.append(div, meta);
    this._els.messages.append(row);

    if (preserveScroll && !wasNearBottom && role === 'bot') {
      this._els.scrollBottom.classList.add('is-visible');
    } else if (role === 'bot' && animateBlocks) {
      requestAnimationFrame(() => {
        const msgBox = this._els.messages;
        if (row.offsetHeight > msgBox.clientHeight * 0.75 && typeof row.scrollIntoView === 'function') {
          row.scrollIntoView({ block: 'start', behavior: 'smooth' });
        } else {
          this._scrollToBottom(true);
        }
      });
    } else {
      this._scrollToBottom();
    }

    return row;
  }

  _appendTypingIndicator() {
    const wasNearBottom = this._isNearBottom();
    const row = document.createElement('div');
    row.className = 'msg-row bot';

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

    row.append(div);
    this._els.messages.append(row);
    if (wasNearBottom) {
      this._scrollToBottom();
    }
    return row;
  }

  async sendMessage(rawText, options = {}) {
    const text = (rawText || '').trim();
    if (!text || this._busy) return;

    const { skipUserBubble = false } = options;

    this._busy = true;
    if (!skipUserBubble) {
      this._els.input.value = '';
      this._autoResizeInput();
    }
    this._syncSendState();

    if (this._suggestionsEl) {
      this._suggestionsEl.remove();
      this._suggestionsEl = null;
    }

    if (!skipUserBubble) {
      this._appendMessage('user', text, { preserveScroll: false });
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      this._syncOnlineStatus();
      this._appendMessage('bot', 'You appear to be offline. Check your internet connection and tap Retry.', {
        animateBlocks: true,
        isError: true,
        retryText: text,
        preserveScroll: false
      });
      this._busy = false;
      this._syncSendState();
      return;
    }

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
        this._appendMessage('bot', data.error || 'Sorry, something went wrong. Please try again.', {
          animateBlocks: true,
          isError: true,
          retryText: text
        });
      } else {
        this._history.push({ role: 'user', text });
        this._history.push({ role: 'model', text: data.reply });
        this._appendMessage('bot', data.reply, { animateBlocks: true });
      }
    } catch {
      typingEl.remove();
      this._appendMessage('bot', 'Unable to reach the support server right now. Please check your connection and try again.', {
        animateBlocks: true,
        isError: true,
        retryText: text
      });
    } finally {
      this._busy = false;
      this._syncSendState();
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
