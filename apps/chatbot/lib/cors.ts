/**
 * CORS support for the API routes.
 *
 * In local dev the docs app (http://localhost:4200) and this chatbot server
 * (http://localhost:3000) are *different origins*, so the browser blocks the
 * AI Assistant widget's POST to `/api/chat` unless the server answers with
 * `Access-Control-*` headers and a preflight `OPTIONS` (the JSON body makes it
 * a non-simple request, so the browser always preflights).
 *
 * We grant CORS only to origins we recognize — any `localhost` / `127.0.0.1`
 * origin (dev), plus anything listed in the `ALLOWED_ORIGINS` env var (the
 * hosted docs domain). Everything else gets no CORS headers, so the browser
 * blocks it. We echo the specific request Origin rather than sending `*`, which
 * keeps the allow-list meaningful and leaves the door open to credentialed
 * requests later.
 */

/** Matches `http(s)://localhost` and `http(s)://127.0.0.1`, with any port. */
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

/** Extra origins allowed in production, e.g. `https://fundamental-ngx.netlify.app`. */
function configuredOrigins(): string[] {
    return (process.env.ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean);
}

/** True when `origin` is a localhost origin or appears in `ALLOWED_ORIGINS`. */
function isAllowedOrigin(origin: string): boolean {
    return LOCALHOST_ORIGIN.test(origin) || configuredOrigins().includes(origin);
}

/**
 * CORS headers for a response, echoing the request Origin when it's allowed.
 *
 * Returns `{}` for same-origin requests (no `Origin` header) and for
 * disallowed origins — in the latter case the browser blocks the read, which
 * is exactly what we want.
 */
export function corsHeaders(req: Request): Record<string, string> {
    const origin = req.headers.get('origin');
    if (!origin || !isAllowedOrigin(origin)) {
        return {};
    }
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        // Echo whatever headers the preflight asked for (falls back to the one
        // header our client actually sends).
        'Access-Control-Allow-Headers': req.headers.get('access-control-request-headers') ?? 'Content-Type',
        'Access-Control-Max-Age': '86400',
        // Responses vary by Origin, so caches must key on it.
        Vary: 'Origin'
    };
}

/** 204 preflight response carrying the CORS headers for an `OPTIONS` request. */
export function preflight(req: Request): Response {
    return new Response(null, { status: 204, headers: corsHeaders(req) });
}
