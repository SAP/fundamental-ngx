import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

type DimensionSnapshot = { maxWidth: string; minWidth: string; width: string; renderedWidth: number };

async function verifyFillControlFirstFrame(
    page: Page,
    control: Locator,
    expected: Partial<DimensionSnapshot> & Pick<DimensionSnapshot, 'renderedWidth'>
): Promise<void> {
    await page.evaluate(() => {
        const testWindow = window as typeof window & {
            __selectFillControlFirstFrame?: DimensionSnapshot;
            __selectFillControlTransitions?: string[];
        };
        testWindow.__selectFillControlFirstFrame = undefined;
        testWindow.__selectFillControlTransitions = [];
        document.addEventListener(
            'transitionrun',
            (event) => {
                if (
                    event instanceof TransitionEvent &&
                    event.target instanceof HTMLElement &&
                    event.target.matches('.fd-popover__body')
                ) {
                    testWindow.__selectFillControlTransitions?.push(event.propertyName);
                }
            },
            { capture: true, once: false }
        );
        const observer = new MutationObserver(() => {
            const overlayBody = document.querySelector<HTMLElement>('.cdk-overlay-container .fd-popover__body');
            if (!overlayBody || testWindow.__selectFillControlFirstFrame) {
                return;
            }
            const style = getComputedStyle(overlayBody);
            if (style.display !== 'none' && style.visibility !== 'hidden') {
                testWindow.__selectFillControlFirstFrame = {
                    maxWidth: style.maxWidth,
                    minWidth: style.minWidth,
                    width: style.width,
                    renderedWidth: overlayBody.getBoundingClientRect().width
                };
                observer.disconnect();
            }
        });
        observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    });

    await control.click();

    const body = page.locator('.cdk-overlay-container .fd-popover__body').first();
    await expect(body).toBeVisible();
    await expect
        .poll(() =>
            page.evaluate(
                () =>
                    (window as typeof window & { __selectFillControlFirstFrame?: DimensionSnapshot })
                        .__selectFillControlFirstFrame
            )
        )
        .toBeDefined();
    const firstFrame = await page.evaluate(
        () =>
            (window as typeof window & { __selectFillControlFirstFrame?: DimensionSnapshot })
                .__selectFillControlFirstFrame
    );
    const { renderedWidth: expectedRenderedWidth, ...expectedStyles } = expected;
    expect(firstFrame).toBeDefined();
    expect(firstFrame).toMatchObject(expectedStyles);
    expect(firstFrame?.renderedWidth).toBeCloseTo(expectedRenderedWidth, 0);

    const widths = await body.evaluate(async (element) => {
        const samples: number[] = [];
        const startedAt = performance.now();
        await new Promise<void>((resolve) => {
            const sampleFrame = (timestamp: number): void => {
                samples.push(element.getBoundingClientRect().width);
                if (timestamp - startedAt >= 150) {
                    resolve();
                    return;
                }
                window.requestAnimationFrame(sampleFrame);
            };
            window.requestAnimationFrame(sampleFrame);
        });
        return samples;
    });
    for (const width of widths) {
        expect(width).toBeCloseTo(expectedRenderedWidth, 0);
    }
    expect(
        await page.evaluate(
            () =>
                (window as typeof window & { __selectFillControlTransitions?: string[] }).__selectFillControlTransitions
        )
    ).toEqual([]);
}

test.describe('core/select', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/select/mode');
    });

    test('opens dropdown on click and shows options', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        expect(await options.count()).toBeGreaterThan(0);
    });

    test('selects option with keyboard', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(listbox).toBeHidden();
    });

    test('closes dropdown on Escape', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(listbox).toBeHidden();
    });

    test('applies fill control dimensions before the first visible frame without transitions', async ({ page }) => {
        const control = page.locator('fd-select').first().locator('.fd-select__control');
        const triggerWidth = await control.evaluate((element) => element.getBoundingClientRect().width);
        const expectedWidth = `${Math.round(triggerWidth)}px`;

        await verifyFillControlFirstFrame(page, control, {
            maxWidth: '600px',
            minWidth: expectedWidth,
            width: expectedWidth,
            renderedWidth: triggerWidth
        });
    });

    test('applies equal fill control width before the first visible frame without transitions', async ({
        page,
        goto
    }) => {
        await goto('core/select/semantic-state');
        const control = page.locator('fd-select').first().locator('.fd-select__control');
        const triggerWidth = await control.evaluate((element) => element.getBoundingClientRect().width);
        const expectedWidth = `${Math.round(triggerWidth)}px`;

        await verifyFillControlFirstFrame(page, control, {
            width: expectedWidth,
            renderedWidth: triggerWidth
        });
    });

    test('disabled select does not open', async ({ page }) => {
        // The disabled select is the 3rd fd-select on the mode example page
        const disabledSelect = page.locator('fd-select').nth(2);
        const control = disabledSelect.locator('.fd-select__control');
        await expect(control).toHaveAttribute('aria-disabled', 'true');
        await control.click({ force: true });
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeHidden();
    });
});
