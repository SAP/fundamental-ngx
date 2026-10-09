import { renderChatMarkdown } from './fd-guide-chat-markdown';

function renderIntoDocument(markdown: string): HTMLElement {
    const host = document.createElement('div');
    host.innerHTML = renderChatMarkdown(markdown);
    document.body.append(host);
    return host;
}

describe('renderChatMarkdown', () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

    it('renders restricted Markdown formatting after completion', () => {
        const host = renderIntoDocument(
            '# Heading\n\n**bold**\n\n- one\n- two\n\n| API | Value |\n| --- | --- |\n| role | dialog |'
        );

        expect(host.querySelector('h1')?.textContent).toBe('Heading');
        expect(host.querySelector('strong')?.textContent).toBe('bold');
        expect(host.querySelectorAll('li')).toHaveLength(2);
        expect(host.querySelector('table')).not.toBeNull();
    });

    it('does not create active DOM or network-capable elements from HTML and dangerous Markdown', () => {
        const host = renderIntoDocument(
            '<script>window.__chatScriptRan = true</script>\n' +
                '<div onclick="window.__chatHandlerRan = true">click</div>\n' +
                '![tracking](https://tracker.invalid/pixel.gif)\n' +
                '<iframe src="https://evil.invalid/frame"></iframe>\n' +
                '[bad](javascript:alert(1)) [also-bad](data:text/html,boom)'
        );

        expect(host.querySelector('script, img, iframe')).toBeNull();
        expect(host.querySelector('[onclick], [onerror], [onload]')).toBeNull();
        expect(host.querySelector('a[href^="javascript:"], a[href^="data:"]')).toBeNull();
    });

    it('keeps HTML-looking fenced code visible as escaped source', () => {
        const fence = String.fromCharCode(96).repeat(3);
        const host = renderIntoDocument(fence + 'html\n<script>alert(1)</script>\n<img src="/tracking">\n' + fence);
        const code = host.querySelector('pre code');

        expect(code?.textContent).toContain('<script>alert(1)</script>');
        expect(host.querySelector('pre script, pre img, script, img')).toBeNull();
    });

    it('allows relative links and HTTPS links, adding the external-link relationship', () => {
        const host = renderIntoDocument(
            '[component](/components/dialog) [docs](https://sap.github.io/fundamental-ngx/)'
        );
        const links = [...host.querySelectorAll('a')];

        expect(links.map((link) => link.getAttribute('href'))).toEqual([
            '/components/dialog',
            'https://sap.github.io/fundamental-ngx/'
        ]);
        expect(links[0].getAttribute('rel')).toBeNull();
        expect(links[1].getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('does not trust malformed Markdown or generated HTML as a bypassed HTML value', () => {
        const host = renderIntoDocument('[broken](javascript:/*\n\n<div>untrusted</div>');

        expect(host.querySelector('script, iframe, img')).toBeNull();
        expect(host.querySelector('[onclick], [onerror]')).toBeNull();
        expect(host.textContent).toContain('untrusted');
    });
});
