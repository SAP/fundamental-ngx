import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/inline-help', () => {
    test('applies static popoverConfig max width before the first visible frame', async ({ page, goto }) => {
        await goto('core/inline-help/inline-help');

        await page.evaluate(() => {
            type MaxWidthSnapshot = { inlineMaxWidth: string; computedMaxWidth: string; width: number };
            const testWindow = window as typeof window & {
                __inlineHelpMaxWidthFirstFrame?: MaxWidthSnapshot;
                __inlineHelpMaxWidthTransitions?: string[];
            };
            testWindow.__inlineHelpMaxWidthTransitions = [];
            document.addEventListener(
                'transitionrun',
                (event) => {
                    if (event instanceof TransitionEvent && event.propertyName === 'max-width') {
                        testWindow.__inlineHelpMaxWidthTransitions?.push(event.propertyName);
                    }
                },
                { capture: true }
            );
            const observer = new MutationObserver(() => {
                const inlineHelpBody = document.querySelector<HTMLElement>(
                    '.cdk-overlay-container .fd-inline-help__content'
                );
                if (!inlineHelpBody || testWindow.__inlineHelpMaxWidthFirstFrame) {
                    return;
                }
                const style = getComputedStyle(inlineHelpBody);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                    testWindow.__inlineHelpMaxWidthFirstFrame = {
                        inlineMaxWidth: inlineHelpBody.style.maxWidth,
                        computedMaxWidth: style.maxWidth,
                        width: inlineHelpBody.getBoundingClientRect().width
                    };
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        });

        await page
            .locator('.fd-inline-help-example')
            .filter({ hasText: 'Additional information' })
            .locator('fd-icon')
            .click();

        const body = page.locator('.cdk-overlay-container .fd-inline-help__content').first();
        await expect(body).toBeVisible();
        expect(
            await page.evaluate(
                () =>
                    (
                        window as typeof window & {
                            __inlineHelpMaxWidthFirstFrame?: {
                                inlineMaxWidth: string;
                                computedMaxWidth: string;
                                width: number;
                            };
                        }
                    ).__inlineHelpMaxWidthFirstFrame
            )
        ).toEqual({ inlineMaxWidth: '320px', computedMaxWidth: '320px', width: expect.closeTo(320, 1) });
        await expect
            .poll(() =>
                body.evaluate((element) => ({
                    inlineMaxWidth: (element as HTMLElement).style.maxWidth,
                    computedMaxWidth: getComputedStyle(element).maxWidth,
                    width: element.getBoundingClientRect().width
                }))
            )
            .toEqual({ inlineMaxWidth: '320px', computedMaxWidth: '320px', width: expect.closeTo(320, 1) });
        expect(
            await page.evaluate(
                () =>
                    (window as typeof window & { __inlineHelpMaxWidthTransitions?: string[] })
                        .__inlineHelpMaxWidthTransitions
            )
        ).toEqual([]);

        const geometry = await body.evaluate(async (element) => {
            const snapshot = (): DOMRect => element.getBoundingClientRect();
            const samples: DOMRect[] = [];
            const samplingStartedAt = performance.now();
            await new Promise<void>((resolve) => {
                const sampleFrame = (timestamp: number): void => {
                    samples.push(snapshot());
                    if (timestamp - samplingStartedAt >= 150) {
                        resolve();
                        return;
                    }
                    window.requestAnimationFrame(sampleFrame);
                };
                window.requestAnimationFrame(sampleFrame);
            });
            return samples.map(({ x, y, width, height }) => ({ x, y, width, height }));
        });
        for (const sample of geometry) {
            expect(sample).toEqual({
                x: expect.closeTo(geometry[0]?.x ?? 0, 1),
                y: expect.closeTo(geometry[0]?.y ?? 0, 1),
                width: expect.closeTo(320, 1),
                height: expect.closeTo(geometry[0]?.height ?? 0, 1)
            });
        }
        expect(
            await page.evaluate(
                () =>
                    (window as typeof window & { __inlineHelpMaxWidthTransitions?: string[] })
                        .__inlineHelpMaxWidthTransitions
            )
        ).toEqual([]);
    });
});
