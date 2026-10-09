# Fundamental NGX documentation assistant

The assistant answers Fundamental NGX questions using the generated MCP component catalog.

There are two ways to run it:

- **Embedded docs assistant (recommended):** the Angular documentation site with Netlify Functions at `/api/chat` and `/api/mcp`.
- **Standalone chatbot:** the original Next.js prototype in `apps/chatbot`, served at `http://localhost:3000`.

## Run the embedded docs assistant

Run these commands from the repository root.

### 1. Install and generate the MCP catalog

Use Node and Yarn versions compatible with the root `package.json`, then run:

```bash
yarn install --immutable
yarn nx run mcp-server:extract-metadata
```

The second command creates `libs/mcp-server/src/data/components.json`, which the MCP function needs.

### 2. Choose how to provide an AI key

For local development, either configure a server-side provider or enter a Gemini or Groq key in the assistant UI.

To use a server-side provider, create the ignored local environment file:

```bash
cp apps/chatbot/.env.local.example apps/chatbot/.env.local
```

Edit `apps/chatbot/.env.local` and configure one provider:

```dotenv
# Gemini
GOOGLE_GENERATIVE_AI_API_KEY=...

# Or Groq
GROQ_API_KEY=...

# Or a local Anthropic-compatible proxy
ANTHROPIC_BASE_URL=http://localhost:6655/anthropic/v1
ANTHROPIC_API_KEY=...
```

Set only the provider you want to use. `CHAT_MODEL` is optional; provider defaults are documented in [`.env.local.example`](./.env.local.example). Restart Netlify Dev after changing the file.

> Never commit `.env.local` or paste a key into a URL. The file is git-ignored.

### 3. Start Angular and the Netlify Functions

```bash
NPM_CONFIG_USERCONFIG="$PWD/.npmrc" npx netlify dev \
  --filter docs \
  --command "yarn nx serve docs --excludeTaskDependencies --port=4200" \
  --target-port 4200 \
  --skip-wait-port \
  --skip-gitignore
```

Wait for the Angular build to finish, then open the Netlify URL printed in the terminal, normally:

```text
http://localhost:8888
```

Do not open `http://localhost:4200` when testing the assistant. Port `4200` is the Angular server only; port `8888` proxies the site and the `/api/*` Netlify Functions together.

Open the assistant from the floating button:

- If `.env.local` contains a valid provider, the UI reports that the local provider is active and no browser key is required.
- Without a local provider, select Gemini or Groq and enter that provider's key for the current page session.
- Groq uses the internally configured `qwen/qwen3.8-27b` model; the model ID is not supplied by the browser.

## Run the docs without the assistant backend

```bash
yarn start:docs
```

This serves the Angular docs directly. The assistant UI may be visible, but `/api/chat` and `/api/mcp` are unavailable because Netlify Functions are not running.

## Run the standalone Next.js chatbot

The standalone prototype reads `apps/chatbot/.env.local` and serves its own chat and MCP routes.

```bash
yarn nx run mcp-server:extract-metadata
cd apps/chatbot
yarn install
yarn dev
```

Open `http://localhost:3000` and ask a question such as _"How do I use fd-dialog?"_

From the repository root, `yarn start` starts both the Angular docs and this standalone chatbot. It requires the standalone dependencies, generated catalog, and `.env.local` to exist.

## Provider behavior

| Where it runs            | Supported credential mode                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Netlify Dev on localhost | Local `.env.local` provider (Gemini, Groq, or Anthropic-compatible), or a Gemini/Groq key entered in the UI |
| Deployed Netlify site    | Gemini or Groq key entered in the UI                                                                        |
| Standalone Next.js app   | Local `.env.local` provider                                                                                 |

On a deployed Netlify site, the browser key is kept only in page memory and sent to the same-origin `/api/chat` function. It is not placed in the URL or local storage. The deployed function intentionally does not use `apps/chatbot/.env.local`.

Provider selection for local environment variables uses this priority: Gemini, Groq, then Anthropic-compatible. If multiple providers are configured, the first one wins.

## Attachments

Each question can include up to three PNG, JPEG, WebP, GIF, or PDF files. A non-empty text question is still required. The combined decoded file limit is 256 KiB on deployed sites and 5 MiB only through trusted loopback Netlify Dev. The UI shows the active limit; the Function validates the files and limit again.

Attachments are kept only in the current page's memory. File data is sent in the current `/api/chat` request to the selected model provider, never to MCP tools, diagnostics, sources, URLs, or browser storage, and it is not resent with later questions. Gemini and the Anthropic-compatible local provider accept attachments. Groq does not; the UI disables them for a browser-supplied Groq key and the Function rejects Groq attachment requests before model or MCP work.

## Troubleshooting

### `/api/chat` returns 404

Make sure Netlify Dev is running and open `http://localhost:8888`, not the Angular server on port `4200`.

### The send button is disabled

Select Gemini or Groq and enter that provider's key in the assistant UI, or configure a valid provider in `apps/chatbot/.env.local` and restart Netlify Dev.

An attachment cannot be sent by itself; enter a non-empty question. If files are rejected, confirm that there are no more than three, every file is a supported type, and their combined size is within the limit shown in the assistant.

### Netlify reports `EALLOWSCRIPTS`

Keep the `NPM_CONFIG_USERCONFIG="$PWD/.npmrc"` prefix in the Netlify command. It makes the plugin installation use this repository's npm configuration.

### Browser console shows `rum_collection ... ERR_BLOCKED_BY_CLIENT`

This is typically a browser privacy or ad-blocking extension blocking telemetry. It is unrelated to `/api/chat`.

### Enable safe browser traces

Append `?fdGuideDebug=1` to the docs URL, for example:

```text
http://localhost:8888/?fdGuideDebug=1
```

The console traces request timing, response status, and stream event counts. They do not print the API key or message content.

## Tests

From the repository root:

```bash
yarn nx run docs-functions:test
yarn nx run docs-functions:build
yarn nx run docs:test
yarn nx run mcp-server:test
```

For the standalone Next.js chatbot:

```bash
cd apps/chatbot
yarn test
```
