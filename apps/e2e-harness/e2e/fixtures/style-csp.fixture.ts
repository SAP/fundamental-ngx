import type { Locator, Page, TestInfo } from '@playwright/test';
import { writeFileSync } from 'node:fs';
import { test as base, expect } from './base.fixture';

export const STYLE_NONCE = 'c2VudGluZWwtbG9jYWwtZml4dHVyZQ==';
export const STYLE_POLICY = `default-src 'self'; script-src 'self'; style-src 'self' 'nonce-${STYLE_NONCE}'; style-src-attr 'none'; style-src-elem 'self' 'nonce-${STYLE_NONCE}'; img-src 'self' data:; connect-src 'self'`;

export const test = base.extend<{ strictStyles: void }>({
    strictStyles: [
        async ({ page }, use, testInfo) => {
            const consoleErrors: string[] = [];
            const pageErrors: string[] = [];
            page.on('console', (message) => {
                if (message.type() === 'error') {consoleErrors.push(message.text());}
            });
            page.on('pageerror', (error) => pageErrors.push(error.message));
            await page.addInitScript(() => {
                const state = { violations: [] as object[], initial: [] as object[] };
                Object.assign(window, { __styleCsp: state });
                document.addEventListener('securitypolicyviolation', (event) => {
                    state.violations.push({
                        directive: event.effectiveDirective,
                        policy: event.originalPolicy,
                        blockedURI: event.blockedURI,
                        sourceFile: event.sourceFile,
                        line: event.lineNumber,
                        column: event.columnNumber,
                        disposition: event.disposition
                    });
                });
                const selector = 'fd-dialog-container, fd-message-box-container, fd-message-toast, e2e-csp-base-toast';
                const observed = new WeakSet<Element>();
                const capture = (element: Element, phase: string): void => {
                    if (!element.matches(selector)) {return;}
                    const style = getComputedStyle(element);
                    state.initial.push({
                        tag: element.localName,
                        phase,
                        opacity: style.opacity,
                        position: style.position,
                        zIndex: style.zIndex,
                        transform: style.transform,
                        connected: element.isConnected
                    });
                };
                new MutationObserver(() => {
                    document.querySelectorAll(selector).forEach((element) => {
                        if (!observed.has(element)) {
                            observed.add(element);
                            capture(element, 'inserted');
                        }
                    });
                }).observe(document, { childList: true, subtree: true });
                // Observe the real initial state before WAAPI starts; delegate unchanged to the browser.
                const animate = Element.prototype.animate;
                Element.prototype.animate = function (...args) {
                    capture(this, 'before-animation');
                    return animate.apply(this, args);
                };
            });
            await page.route('**/*', async (route) => {
                if (!route.request().isNavigationRequest() || route.request().frame() !== page.mainFrame()) {
                    await route.continue();
                    return;
                }
                const response = await route.fetch();
                const body = (await response.text())
                    .replace('<e2e-root', `<e2e-root ngCspNonce="${STYLE_NONCE}"`)
                    .replace('</head>', `<meta property="csp-nonce" nonce="${STYLE_NONCE}"></head>`);
                await route.fulfill({
                    response,
                    body,
                    headers: { ...response.headers(), 'content-security-policy': STYLE_POLICY }
                });
            });
            await use();
            await saveEvidence(
                testInfo,
                'style-csp-runtime.json',
                JSON.stringify(
                    {
                        policy: STYLE_POLICY,
                        browser: page.context().browser()?.version(),
                        consoleErrors,
                        pageErrors,
                        runtime: await page.evaluate(() => (window as any).__styleCsp).catch(() => null)
                    },
                    null,
                    2
                ),
                'application/json'
            );
            expect(pageErrors, 'No bootstrap/runtime errors may masquerade as CSP RED').toEqual([]);
            expect(
                consoleErrors.filter((error) => /^ERROR /.test(error)),
                'No Angular errors may masquerade as CSP RED'
            ).toEqual([]);
        },
        { auto: true }
    ]
});

export async function expectNoStyleViolations(page: Page): Promise<void> {
    // Let queued violation events and rendering work finish; do not assert fragile event counts.
    await page.evaluate(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    );
    const violations = await page.evaluate(() =>
        (window as any).__styleCsp.violations.filter((event: { directive: string }) =>
            ['style-src-attr', 'style-src-elem'].includes(event.directive)
        )
    );
    expect.soft(violations, 'Exercised component must not violate either style directive').toEqual([]);
}

export async function recordGeometry(locator: Locator, testInfo: TestInfo, name: string): Promise<void> {
    const geometry = await locator.evaluate((element) => {
        const ancestors: object[] = [];
        for (let node: Element | null = element; node; node = node.parentElement) {
            ancestors.push({
                tag: node.localName,
                class: node.className,
                rect: node.getBoundingClientRect().toJSON(),
                position: getComputedStyle(node).position,
                offsetParent: (node as HTMLElement).offsetParent?.tagName
            });
        }
        return ancestors;
    });
    await saveEvidence(testInfo, `${name}-geometry.json`, JSON.stringify(geometry, null, 2), 'application/json');
    await saveEvidence(testInfo, `${name}.png`, await locator.page().screenshot(), 'image/png');
}

async function saveEvidence(
    testInfo: TestInfo,
    name: string,
    body: string | Buffer,
    contentType: string
): Promise<void> {
    const path = testInfo.outputPath(name);
    writeFileSync(path, body);
    await testInfo.attach(name, { path, contentType });
}

export { expect } from '@playwright/test';
