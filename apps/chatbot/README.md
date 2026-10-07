# Fundamental NGX Assistant

Next.js chatbot grounded in the Fundamental NGX MCP server (`libs/mcp-server`).
The model is given the MCP tools (`search_components`, `get_component_api`,
`get_usage_guide`, …) and must answer from them, so replies track the live
component API instead of training data.

Two routes, both in this one app:

- `/api/mcp` — the MCP server over HTTP (shared `createMcpFetchHandler()`).
- `/api/chat` — the orchestrator: opens an MCP client to `/api/mcp`, runs
  `streamText`, and streams the answer back.

See [`../../PR.md`](../../PR.md) for the full architecture and request flow.

## Local dev

```bash
nx run mcp-server:extract-metadata   # generate the static components.json catalog
cd apps/chatbot
yarn install
# create .env.local and set ONE provider key (see Configuration below)
yarn dev                             # http://localhost:3000
```

Then ask e.g. _"How do I use fd-dialog?"_ — the answer is assembled from live MCP
tool calls.

> `.env.local` is read only at server startup. After editing it, restart `yarn dev`.

## Configuration

Set these in `apps/chatbot/.env.local` (not committed). The provider is chosen by
which key is present; if several are set the first in this order wins.

| Variable                       | Required | Purpose                                                                                                                           |
| ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | deploy   | Google Gemini (AI Studio) key — free, no credit card. **Recommended** deploy path. Highest priority.                              |
| `GROQ_API_KEY`                 | fallback | Groq key (free, no credit card). Used when no Google key is set. Roomier models aside, its 8K TPM is tight for this bot.          |
| `ANTHROPIC_BASE_URL`           | local    | Anthropic-compatible gateway, e.g. `http://localhost:6655/anthropic/v1` (SAP Hyperspace "Hai" proxy). Selects the Anthropic path. |
| `ANTHROPIC_API_KEY`            | local    | Token for the gateway above, sent as `Authorization: Bearer …`. Required when `ANTHROPIC_BASE_URL` is set.                        |
| `CHAT_MODEL`                   | no       | Model id override. Blank → `gemini-3.5-flash` (Google), `qwen/qwen3.8-27b` (Groq), or `claude-sonnet-4-5` (Anthropic).            |
| `MCP_SERVER_URL`               | no       | MCP endpoint the chat route connects to. Blank → `http://localhost:3000/api/mcp` (this app's own route).                          |

> **On `CHAT_MODEL` for Gemini:** leave it blank to use `gemini-3.5-flash`
> (verified available and good at tool-calling). Avoid pinning the
> `gemini-flash-latest` alias or the newest `gemini-3.8-flash` as a default — the
> newest release is often capacity-throttled (503), and the AI SDK retries 503s
> silently, which looks like a hang. Other known-good ids: `gemini-3.7-flash`,
> `gemini-3.6-flash`, `gemini-3.5-flash-lite`.

## Deploy to Vercel (free)

- New Project → import this repo. **Root Directory:** `apps/chatbot` (Vercel checks
  out the full repo, so `../../libs/mcp-server` resolves via `transpilePackages`).
- **Framework preset:** Next.js (auto-detected).
- **Environment variables:** set `GOOGLE_GENERATIVE_AI_API_KEY` (free key from
  Google AI Studio, no card required) and
  `MCP_SERVER_URL=https://<your-deployment>/api/mcp`. Leave `CHAT_MODEL` blank.
  Do **not** point `ANTHROPIC_BASE_URL` at a `localhost` gateway — it isn't
  reachable from Vercel's network.
- The Vercel Hobby plan is free and needs no credit card; this app calls providers
  directly and does not use the paid Vercel AI Gateway product.
- First deploy: confirm `/api/mcp` returns the tool list and the chat answers a
  live question.

> Free public inference tiers have rate limits and may use prompts for training.
> Fine for a public component-library assistant; confirm with your team before
> sending anything non-public.

## Swapping the model

`lib/model.ts` is the only place that decides which endpoint is called. For a
provider already supported, just set the env vars above — no code change. To add a
new provider, extend `chatModel()` there (and `chatModelId()` for its default).

## Testing

```bash
cd apps/chatbot && yarn test
```

Covers the model layer (provider defaults and precedence, `CHAT_MODEL` override,
blank/whitespace fallback, the built instance per path) and the
`trimHistoryForBudget` history-trimming helper. An opt-in integration test in
`app/api/chat/route.spec.ts` loads the real MCP tools when `MCP_SERVER_URL` is set;
it's skipped by default.
