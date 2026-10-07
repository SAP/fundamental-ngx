import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { marked } from 'marked';
import { MARKED_OPTIONS } from 'ngx-markdown';

// Register languages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

/**
 * Configure marked with syntax highlighting and copy button
 */
function configureMarked(): typeof marked {
    const renderer = new marked.Renderer();

    // Override code block rendering
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
        // Use base64 encoding to safely store code in data attribute
        const base64Code = btoa(unescape(encodeURIComponent(text)));

        if (lang && hljs.getLanguage(lang)) {
            try {
                const highlighted = hljs.highlight(text, { language: lang }).value;
                return `
                    <div class="code-block-wrapper">
                        <div class="code-block-header">
                            <span class="code-block-lang">${lang}</span>
                            <button class="code-block-copy" data-code="${base64Code}" title="Copy code">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
                                    <path d="M2 5h2V4H2v1zm0 2h2V6H2v1zm0 2h2V8H2v1zm0 2h2v-1H2v1z"/>
                                </svg>
                                Copy
                            </button>
                        </div>
                        <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
                    </div>
                `;
            } catch (e) {
                console.warn('Highlight.js error:', e);
            }
        }
        const autoHighlighted = hljs.highlightAuto(text).value;
        return `
            <div class="code-block-wrapper">
                <div class="code-block-header">
                    <span class="code-block-lang">code</span>
                    <button class="code-block-copy" data-code="${base64Code}" title="Copy code">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4z"/>
                            <path d="M2 5h2V4H2v1zm0 2h2V6H2v1zm0 2h2V8H2v1zm0 2h2v-1H2v1z"/>
                        </svg>
                        Copy
                    </button>
                </div>
                <pre><code class="hljs">${autoHighlighted}</code></pre>
            </div>
        `;
    };

    marked.setOptions({ renderer });
    return marked;
}

/**
 * Provide marked options with syntax highlighting for the chat component.
 * Use this in component providers.
 */
export function provideChatMarkdown(): { provide: typeof MARKED_OPTIONS; useValue: object } {
    // Configure marked on initialization
    configureMarked();

    return {
        provide: MARKED_OPTIONS,
        useValue: {}
    };
}
