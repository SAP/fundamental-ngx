import { activeProvider, chatModel, chatModelId } from './model';

/** Save/restore the env vars the model layer reads, so tests don't leak state. */
const ENV_KEYS = [
    'CHAT_MODEL',
    'GOOGLE_GENERATIVE_AI_API_KEY',
    'GROQ_API_KEY',
    'ANTHROPIC_BASE_URL',
    'ANTHROPIC_API_KEY'
] as const;
const original: Record<string, string | undefined> = {};

beforeEach(() => {
    for (const k of ENV_KEYS) {
        original[k] = process.env[k];
        delete process.env[k];
    }
});

afterEach(() => {
    for (const k of ENV_KEYS) {
        if (original[k] === undefined) delete process.env[k];
        else process.env[k] = original[k];
    }
});

describe('chatModelId', () => {
    it('defaults to Claude Sonnet 4.5 when no provider key is set', () => {
        expect(chatModelId()).toBe('claude-sonnet-4-5');
    });

    it('defaults to Gemini 3.5 Flash when GOOGLE_GENERATIVE_AI_API_KEY is set', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        expect(chatModelId()).toBe('gemini-3.5-flash');
    });

    it('defaults to Qwen3 27B when only GROQ_API_KEY is set', () => {
        process.env.GROQ_API_KEY = 'gsk_test';
        expect(chatModelId()).toBe('qwen/qwen3.8-27b');
    });

    it('prefers Gemini over Groq when both keys are set', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        process.env.GROQ_API_KEY = 'gsk_test';
        expect(chatModelId()).toBe('gemini-3.5-flash');
    });

    it('honours the CHAT_MODEL override regardless of provider', () => {
        process.env.CHAT_MODEL = 'claude-opus-4-5';
        expect(chatModelId()).toBe('claude-opus-4-5');
        process.env.GROQ_API_KEY = 'gsk_test';
        process.env.CHAT_MODEL = 'llama-3.1-8b-instant';
        expect(chatModelId()).toBe('llama-3.1-8b-instant');
    });

    it('falls back to the default when CHAT_MODEL is empty or whitespace', () => {
        process.env.CHAT_MODEL = '';
        expect(chatModelId()).toBe('claude-sonnet-4-5');
        process.env.CHAT_MODEL = '   ';
        expect(chatModelId()).toBe('claude-sonnet-4-5');
    });
});

describe('chatModel', () => {
    it('builds a Google model instance when GOOGLE_GENERATIVE_AI_API_KEY is set', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        const model = chatModel();
        expect(model.modelId).toBe('gemini-3.5-flash');
        expect(model.provider).toContain('google');
    });

    it('builds an Anthropic model instance when the gateway is configured', () => {
        process.env.ANTHROPIC_BASE_URL = 'http://localhost:6655/anthropic/v1';
        process.env.ANTHROPIC_API_KEY = 'token_test';
        const model = chatModel();
        expect(model.modelId).toBe('claude-sonnet-4-5');
        expect(model.provider).toContain('anthropic');
    });

    it('builds a Groq model instance when GROQ_API_KEY is set', () => {
        process.env.GROQ_API_KEY = 'gsk_test';
        const model = chatModel();
        expect(model.modelId).toBe('qwen/qwen3.8-27b');
        expect(model.provider).toContain('groq');
    });

    it('prefers Gemini over Groq when both keys are set', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        process.env.GROQ_API_KEY = 'gsk_test';
        const model = chatModel();
        expect(model.provider).toContain('google');
    });

    it('throws when no provider is configured', () => {
        expect(() => chatModel()).toThrow(/No model provider configured/);
    });

    it('throws when ANTHROPIC_BASE_URL is set but the key is missing', () => {
        process.env.ANTHROPIC_BASE_URL = 'http://localhost:6655/anthropic/v1';
        expect(() => chatModel()).toThrow(/ANTHROPIC_API_KEY is missing/);
    });
});

describe('activeProvider', () => {
    it('returns null when no provider is configured', () => {
        expect(activeProvider()).toBeNull();
    });

    it('returns "google" when a Gemini key is set', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        expect(activeProvider()).toBe('google');
    });

    it('returns "groq" when only a Groq key is set', () => {
        process.env.GROQ_API_KEY = 'gsk_test';
        expect(activeProvider()).toBe('groq');
    });

    it('returns "anthropic" when only the gateway base URL is set', () => {
        process.env.ANTHROPIC_BASE_URL = 'http://localhost:6655/anthropic/v1';
        expect(activeProvider()).toBe('anthropic');
    });

    it('prefers Google over Groq, mirroring chatModel() precedence', () => {
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'aiza_test';
        process.env.GROQ_API_KEY = 'gsk_test';
        expect(activeProvider()).toBe('google');
    });
});
