import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';
import { test as cspTest, expectNoStyleViolations, recordGeometry } from '../../fixtures/style-csp.fixture';

type DimensionSnapshot = { maxWidth: string; minWidth: string; width: string; renderedWidth: number };

cspTest.describe('SEC-390 Platform Select', () => {
    for (const scenario of ['select', 'select-ratios']) {
        cspTest(
            `initial viewport cap and ${scenario} layout survive strict styles`,
            async ({ page, goto }, testInfo) => {
                await goto(`style-csp?case=${scenario}`);
                const select = page.locator('fdp-select');
                await expect(select).toBeVisible();
                const expectedCap = await select.evaluate(
                    (element) =>
                        window.innerWidth -
                        (document.body.offsetWidth - document.body.clientWidth) -
                        element.getBoundingClientRect().left
                );
                const control = select.locator('.fd-select__control');
                await control.click();
                const option = page.locator('li[fd-option]').first();
                await expect(option).toBeVisible();
                expect
                    .soft(await option.evaluate((element) => getComputedStyle(element).maxWidth))
                    .toBe(`${expectedCap}px`);
                await expect(select.locator('.fd-select__text-content')).toHaveCSS(
                    'width',
                    scenario === 'select' ? '240px' : '360px'
                );
                if (scenario === 'select-ratios') {
                    for (const [selector, percent] of [
                        ['[fd-list-title]', 33],
                        ['[fd-list-secondary]', 67]
                    ] as const) {
                        const actual = await option.locator(selector).evaluate((element) => {
                            const style = getComputedStyle(element);
                            const parent = getComputedStyle(element.parentElement!);
                            return {
                                maxWidth: style.maxWidth,
                                width: parseFloat(style.width),
                                available:
                                    element.parentElement!.clientWidth -
                                    parseFloat(parent.paddingLeft) -
                                    parseFloat(parent.paddingRight)
                            };
                        });
                        expect.soft(actual.maxWidth).toBe(`${percent}%`);
                        expect.soft(actual.width).toBeCloseTo((actual.available * percent) / 100, 0);
                    }
                }
                await recordGeometry(option, testInfo, scenario);
                await page.keyboard.press('ArrowDown');
                await page.keyboard.press('Enter');
                await expect(option).toBeHidden();
                await expect(page.locator('output')).not.toBeEmpty();
                await expectNoStyleViolations(page);
            }
        );
    }
});

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

    test('preserves ARIA relationships and value through keyboard selection and repeated dismissal', async ({
        page
    }) => {
        const example = page.locator('fd-select-mode-example');
        const control = example.locator('fd-select').first().getByRole('combobox');
        const expectOpenRelationships = async (): Promise<Locator> => {
            await expect(control).toHaveAttribute('aria-expanded', 'true');
            const listboxId = await control.getAttribute('aria-controls');
            expect(listboxId).toBeTruthy();
            const openListbox = page.getByRole('listbox').filter({ has: page.getByRole('option') });
            await expect(openListbox).toHaveAttribute('id', listboxId ?? '');
            await expect(openListbox).toBeVisible();
            const activeId = await control.getAttribute('aria-activedescendant');
            if (activeId) {
                await expect(openListbox.locator(`[role="option"][id="${activeId}"]`)).toBeVisible();
            }
            return openListbox;
        };

        await expect(control).toHaveAttribute('aria-expanded', 'false');
        await control.focus();
        await page.keyboard.press('Enter');
        let listbox = await expectOpenRelationships();
        await page.keyboard.press('Home');
        await page.keyboard.press('Enter');
        await expect(control).toContainText('Apple');
        await expect(listbox).toBeHidden();
        await expect(control).toBeFocused();

        await page.keyboard.press('Enter');
        await expectOpenRelationships();
        await page.keyboard.press('ArrowDown');
        await expectOpenRelationships();
        await page.keyboard.press('ArrowUp');
        await expectOpenRelationships();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(control).toContainText('Pineapple');
        await expect(example.locator('small').first()).toHaveText('Selected value: Pineapple');
        await expect(control).toHaveAttribute('aria-expanded', 'false');
        await expect(control).toBeFocused();
        for (let cycle = 0; cycle < 2; cycle++) {
            await page.keyboard.press('Enter');
            listbox = await expectOpenRelationships();
            await page.keyboard.press('Escape');
            await expect(control).toHaveAttribute('aria-expanded', 'false');
            await expect(listbox).toBeHidden();
            await expect(control).toBeFocused();
            await expect(control).toContainText('Pineapple');
        }
    });

    test('exposes valid ARIA attributes when closed and keyboard opened', async ({ page }, testInfo) => {
        const scope = 'fd-select-mode-example > fd-select:first-of-type';
        const control = page.locator(scope).getByRole('combobox');
        for (const state of ['closed', 'open']) {
            if (state === 'open') {
                await control.focus();
                await page.keyboard.press('Enter');
                await expect(control).toHaveAttribute('aria-expanded', 'true');
            }
            const results = await new AxeBuilder({ page }).include(scope).withRules(['aria-valid-attr']).analyze();
            await testInfo.attach(`aria-valid-attr-${state}`, {
                body: JSON.stringify(results, null, 2),
                contentType: 'application/json'
            });
            expect.soft(await control.getAttribute('aria-active'), state).toBeNull();
            expect.soft(results.violations, state).toEqual([]);
        }
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
