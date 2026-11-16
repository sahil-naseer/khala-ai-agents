# Khala AI Agents (Tamyiz & Multi-Client Support Widget)

An embeddable 24/7 AI Customer Support Agent platform built with Node.js, Express, Web Components (Shadow DOM), and the Google Gemini API (`@google/genai`).

Built first for **Tamyiz**, and structured so you can onboard and sell AI support agents to paying clients by adding a single JSON file per client.

## Quick Start

1. Copy `.env.example` to `.env` and add your Gemini API key:
   ```sh
   cp .env.example .env
   ```
   *(If you don't add a key yet, the server runs in **Demo Mode** using your client's FAQ knowledge base.)*

2. Start the server:
   ```sh
   npm start
   ```

3. Open `http://localhost:3000` in your browser to test the **Tamyiz** chat widget and copy the 1-line embed script.

## Embed on Tamyiz (or any website)

Add this line before `</body>`:

```html
<script src="https://YOUR-DOMAIN.com/widget.js" data-client="tamyiz" defer></script>
```

## Onboard a New Customer

1. Copy `templates/template-client.json` to `clients/<customer-id>.json` (lowercase letters, numbers, hyphens).
2. Customize `businessName`, `agentName`, `accentColor`, `greeting`, `escalation`, and `knowledgeBase.faqs`.
3. Embed `<script src="https://YOUR-DOMAIN.com/widget.js" data-client="<customer-id>" defer></script>` on their site.
