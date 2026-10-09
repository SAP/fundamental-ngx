import { SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { Renderer, marked } from 'marked';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

export function renderChatMarkdown(markdown: string, sanitizer?: DomSanitizer): string {
    const renderer = createRenderer();
    const rendered = marked.parse(markdown, { async: false, gfm: true, renderer });
    const html = typeof rendered === 'string' ? rendered : '';

    return sanitizer ? (sanitizer.sanitize(SecurityContext.HTML, html) ?? '') : html;
}

export function isAllowedChatUrl(value: string): boolean {
    return normalizeChatUrl(value) !== null;
}

function createRenderer(): Renderer {
    const renderer = new Renderer();

    renderer.html = ({ text }) => escapeHtml(text);
    renderer.image = ({ text }) => escapeHtml(text);
    renderer.link = ({ href, title, tokens }) => {
        const url = normalizeChatUrl(href);
        const label = renderer.parser.parseInline(tokens);
        if (!url) {
            return label;
        }

        const titleAttribute = title ? ' title="' + escapeAttribute(title) + '"' : '';
        const relationship = url.external ? ' rel="noopener noreferrer"' : '';
        return '<a href="' + escapeAttribute(url.href) + '"' + titleAttribute + relationship + '>' + label + '</a>';
    };
    renderer.code = ({ text, lang }) => {
        const language = lang?.trim().toLowerCase();
        const knownLanguage = language && /^[a-z0-9_-]+$/.test(language) && hljs.getLanguage(language);
        const highlighted = knownLanguage ? hljs.highlight(text, { language }).value : hljs.highlightAuto(text).value;
        const label = knownLanguage ? language : 'code';
        const languageClass = knownLanguage ? ' language-' + language : '';

        return (
            '<div class="code-block-wrapper"><div class="code-block-header"><span class="code-block-lang">' +
            label +
            '</span><button type="button" class="code-block-copy" aria-label="Copy code" title="Copy code">Copy</button></div><pre><code class="hljs' +
            languageClass +
            '">' +
            highlighted +
            '</code></pre></div>'
        );
    };

    return renderer;
}

function normalizeChatUrl(value: string): { href: string; external: boolean } | null {
    const href = value.trim();
    if (!href || href.startsWith('//')) {
        return null;
    }

    if (/^https:\/\//i.test(href)) {
        try {
            const url = new URL(href);
            return url.protocol === 'https:' ? { href: url.href, external: true } : null;
        } catch {
            return null;
        }
    }

    if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
        return null;
    }

    try {
        const base = new URL('https://chat.invalid/');
        const url = new URL(href, base);
        return url.origin === base.origin ? { href, external: false } : null;
    } catch {
        return null;
    }
}

function escapeHtml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeAttribute(value: string): string {
    return escapeHtml(value).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
