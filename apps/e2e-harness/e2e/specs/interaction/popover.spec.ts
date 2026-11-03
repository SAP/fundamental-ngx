import AxeBuilder from '@axe-core/playwright';
import { Locator } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

async function dimensions(locator: Locator): Promise<{ width: number; height: number }> {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    if (!box) {
        throw new Error('Expected a visible element with dimensions.');
    }
    return { width: box.width, height: box.height };
}

test.describe('core/popover', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/popover/simple');
    });

    test('opens popover on trigger click', async ({ page }) => {
        const trigger = page.locator('fd-avatar[ariaLabel="photo 1 in circle"]');
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
    });

    test('closes popover on Escape', async ({ page }) => {
        const trigger = page.locator('fd-avatar[ariaLabel="photo 1 in circle"]');
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        await popoverBody.waitFor({ state: 'visible' });
        await page.keyboard.press('Escape');
        await expect(popoverBody).toBeHidden();
    });

    test('closes popover on trigger re-click', async ({ page }) => {
        const trigger = page.locator('fd-avatar[ariaLabel="photo 1 in circle"]');
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        await trigger.click();
        await expect(popoverBody).toBeHidden();
    });

    test('popover has correct positioning relative to trigger', async ({ page }) => {
        const trigger = page.locator('fd-avatar[ariaLabel="photo 1 in circle"]');
        const triggerBox = await trigger.boundingBox();
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        const popoverBox = await popoverBody.boundingBox();
        expect(triggerBox).not.toBeNull();
        expect(popoverBox).not.toBeNull();
    });

    test('applies an initial max width before the first visible frame', async ({ page }) => {
        const trigger = page.getByRole('button', { name: 'Product details' });

        await page.evaluate(() => {
            type MaxWidthSnapshot = { inlineMaxWidth: string; computedMaxWidth: string; width: number };
            const testWindow = window as typeof window & {
                __popoverMaxWidthFirstFrame?: MaxWidthSnapshot;
                __popoverMaxWidthTransitions?: string[];
            };
            testWindow.__popoverMaxWidthTransitions = [];
            document.addEventListener(
                'transitionrun',
                (event) => {
                    if (event instanceof TransitionEvent && event.propertyName === 'max-width') {
                        testWindow.__popoverMaxWidthTransitions?.push(event.propertyName);
                    }
                },
                { capture: true }
            );
            const observer = new MutationObserver(() => {
                const popoverBody = document.querySelector<HTMLElement>('.cdk-overlay-container .fd-popover__body');
                if (!popoverBody || testWindow.__popoverMaxWidthFirstFrame) {
                    return;
                }
                const style = getComputedStyle(popoverBody);
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                    testWindow.__popoverMaxWidthFirstFrame = {
                        inlineMaxWidth: popoverBody.style.maxWidth,
                        computedMaxWidth: style.maxWidth,
                        width: popoverBody.getBoundingClientRect().width
                    };
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
        });

        await trigger.click();

        const body = page.locator('.cdk-overlay-container .fd-popover__body').first();
        await expect(body).toBeVisible();
        const firstFrame = await page.evaluate(
            () =>
                (
                    window as typeof window & {
                        __popoverMaxWidthFirstFrame?: {
                            inlineMaxWidth: string;
                            computedMaxWidth: string;
                            width: number;
                        };
                    }
                ).__popoverMaxWidthFirstFrame
        );
        expect(firstFrame).toEqual({
            inlineMaxWidth: '320px',
            computedMaxWidth: '320px',
            width: expect.closeTo(320, 1)
        });
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
                    (window as typeof window & { __popoverMaxWidthTransitions?: string[] }).__popoverMaxWidthTransitions
            )
        ).toEqual([]);
        expect(
            await body.evaluate(
                (element) =>
                    element
                        .getAnimations()
                        .filter(
                            (animation) =>
                                animation instanceof CSSTransition && animation.transitionProperty === 'max-width'
                        ).length
            )
        ).toBe(0);

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
        expect(geometry[0]?.width).toEqual(expect.closeTo(320, 1));
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
                    (window as typeof window & { __popoverMaxWidthTransitions?: string[] }).__popoverMaxWidthTransitions
            )
        ).toEqual([]);
    });
});

test.describe('ui5/popover', () => {
    test('resizes from its keyboard handle and restores opener focus on Escape', async ({ page, goto }) => {
        await goto('ui5/popover/resizable-keyboard');
        const opener = page.locator('ui5-button').first();
        const popover = page.locator('ui5-popover[resizable]');
        await opener.click();
        await expect(popover).toBeVisible();
        const resizeHandle = popover.locator('.ui5-popover-keyboard-resize-handle');
        if (!(await resizeHandle.evaluate((element) => element.matches(':focus')))) {
            await page.keyboard.press('Tab');
        }
        await expect(resizeHandle).toBeFocused();
        const initialSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowRight');
        await expect.poll(async () => (await dimensions(popover)).width).toBeGreaterThan(initialSize.width);
        const widerSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowDown');
        await expect.poll(async () => (await dimensions(popover)).height).toBeGreaterThan(widerSize.height);
        await resizeHandle.press('Escape');
        await expect(popover).toBeHidden();
        await expect(opener).toBeFocused();
    });

    test('keeps the scrollable region keyboard accessible at its minimum reachable size', async ({ page, goto }) => {
        await goto('ui5/popover/resizable-keyboard');
        const opener = page.locator('#resizable-keyboard-popover-opener');
        const popover = page.locator('ui5-popover[resizable]');
        await opener.click();
        await expect(popover).toBeVisible();
        const resizeHandle = popover.locator('.ui5-popover-keyboard-resize-handle');
        if (!(await resizeHandle.evaluate((element) => element.matches(':focus')))) {
            await page.keyboard.press('Tab');
        }
        await expect(resizeHandle).toBeFocused();
        for (let press = 0; press < 48; press++) {
            await resizeHandle.press('Shift+ArrowLeft');
            await resizeHandle.press('Shift+ArrowUp');
        }
        const minimumSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowLeft');
        await resizeHandle.press('Shift+ArrowUp');
        expect(await dimensions(popover)).toEqual(minimumSize);
        const violations = await new AxeBuilder({ page }).withRules(['scrollable-region-focusable']).analyze();
        expect(violations.violations).toEqual([]);
    });
});
