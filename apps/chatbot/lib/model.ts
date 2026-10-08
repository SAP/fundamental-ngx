/**
 * The single place the chatbot decides which model to call.
 *
 * Three providers are supported, selected by environment, so dev and prod differ
 * only in env vars. Precedence (first match wins):
 *   1. GOOGLE_GENERATIVE_AI_API_KEY → Google Gemini (free, no credit card) — the
 *      primary free + deploy path. Its free tier offers ~250K–1M TPM (vs Groq's
 *      8K), 1M-token context, and clean function calling.
 *   2. GROQ_API_KEY → Groq (free, no credit card). Secondary free path. Note: its
 *      GPT-OSS models emit malformed Harmony tool names, so the only Groq model
 *      that tool-calls reliably is qwen/qwen3.8-27b, and its 8K TPM is tight for
 *      this tool-heavy bot.
 *   3. ANTHROPIC_BASE_URL → an Anthropic-compatible gateway (e.g. the local SAP
 *      Hyperspace "Hai" proxy at http://localhost:6655/anthropic/v1) with
 *      `Authorization: Bearer <ANTHROPIC_API_KEY>`.
 *
 * If none is configured, `chatModel()` throws with instructions. (There is no
 * silent fall-through to the public Anthropic API — that would need a paid key we
 * don't use.) To add another provider, extend `chatModel()` — no other file changes.
 */
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import type { LanguageModel } from 'ai';

/** True when a Google Gemini key is configured — the primary free + deploy path. */
function hasGoogleKey(): boolean {
    return !!process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
}

/** True when a Groq key is configured — the secondary, no-credit-card path. */
function hasGroqKey(): boolean {
    return !!process.env.GROQ_API_KEY?.trim();
}

/** The provider families `chatModel()` can select, in precedence order. */
export type ChatProvider = 'google' | 'groq' | 'anthropic';

/**
 * Which provider `chatModel()` will use for the current env — or `null` when none
 * is configured. Mirrors the precedence in `chatModel()` exactly, so callers can
 * reason about provider capabilities (e.g. file support) without building a model.
 */
export function activeProvider(): ChatProvider | null {
    if (hasGoogleKey()) {
        return 'google';
    }
    if (hasGroqKey()) {
        return 'groq';
    }
    if (process.env.ANTHROPIC_BASE_URL?.trim()) {
        return 'anthropic';
    }
    return null;
}

/**
 * Providers whose default models can read file parts (images + PDFs). Gemini and
 * the Anthropic-compatible gateway (Claude) are multimodal; Groq's qwen fallback is
 * text-only, so file attachments must be rejected before they reach it.
 */
export const FILE_CAPABLE_PROVIDERS: ReadonlySet<ChatProvider> = new Set<ChatProvider>(['google', 'anthropic']);

/**
 * The model id to call. Override with CHAT_MODEL; otherwise a provider-appropriate
 * default. An empty/whitespace CHAT_MODEL falls back to the default — the `.env.local`
 * template ships a blank `CHAT_MODEL=` line, and `??` alone would return '' and make
 * the provider throw "Missing or empty model identifier".
 */
export function chatModelId(): string {
    const configured = process.env.CHAT_MODEL?.trim();
    if (configured) {
        return configured;
    }
    if (hasGoogleKey()) {
        return 'gemini-3.5-flash';
    }
    if (hasGroqKey()) {
        return 'qwen/qwen3.8-27b';
    }
    return 'claude-sonnet-4-5';
}

/** The configured chat model instance (Gemini, Groq, or an Anthropic-compatible gateway). */
export function chatModel(): LanguageModel {
    const googleKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
    if (googleKey) {
        return createGoogleGenerativeAI({ apiKey: googleKey })(chatModelId());
    }

    const groqKey = process.env.GROQ_API_KEY?.trim();
    if (groqKey) {
        return createGroq({ apiKey: groqKey })(chatModelId());
    }

    const baseURL = process.env.ANTHROPIC_BASE_URL?.trim();
    if (baseURL) {
        const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
        if (!apiKey) {
            throw new Error(
                'ANTHROPIC_BASE_URL is set but ANTHROPIC_API_KEY is missing. ' +
                    'Add your gateway/proxy token to ANTHROPIC_API_KEY in .env.local.'
            );
        }
        const provider = createAnthropic({ baseURL, apiKey, headers: { Authorization: `Bearer ${apiKey}` } });
        return provider(chatModelId());
    }

    throw new Error(
        'No model provider configured. Set GOOGLE_GENERATIVE_AI_API_KEY (free, no card — the recommended path) ' +
            'or GROQ_API_KEY (free, no card) or ANTHROPIC_BASE_URL + ANTHROPIC_API_KEY (local Anthropic-compatible ' +
            'gateway) in .env.local.'
    );
}
