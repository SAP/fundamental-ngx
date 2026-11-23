import AxeBuilder from '@axe-core/playwright';
import { expect, Locator, Page, test } from '@playwright/test';

const route = '/__e2e/shellbar/search-accessibility';

type FixtureElementState = {
    tagName: string;
    className: string;
    hidden: boolean;
    ariaHidden: string | null;
    display: string;
    visibility: string;
    rectangle: { x: number; y: number; width: number; height: number };
} | null;

type SettledSearchState = {
    viewport: { width: number; height: number; devicePixelRatio: number };
    shellbar: FixtureElementState;
    input: FixtureElementState;
    ancestors: FixtureElementState[];
    openSearchTriggers: number;
};

test.describe('core/shellbar-search accessibility', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        const errors: string[] = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                errors.push(message.text());
            }
        });
        page.on('pageerror', (error) => errors.push(error.message));
        await page.goto(route);
        await expect(page.getByTestId('shellbar-search-accessibility-fixture')).toBeVisible();
        await showSearch(page);
        await testInfo.attach('settled-shellbar-search-state.json', {
            body: JSON.stringify(await settledSearchState(page), null, 2),
            contentType: 'application/json'
        });
        await expect(input(page)).toBeVisible();
        await page.evaluate(
            (recorded) =>
                ((window as Window & { __shellbarSearchErrors?: string[] }).__shellbarSearchErrors = recorded),
            errors
        );
    });

    test.afterEach(async ({ page }, testInfo) => {
        const errors = await page.evaluate(
            () => (window as Window & { __shellbarSearchErrors?: string[] }).__shellbarSearchErrors ?? []
        );
        await testInfo.attach('console-pageerrors.json', {
            body: JSON.stringify(errors, null, 2),
            contentType: 'application/json'
        });
        expect(errors).toEqual([]);
    });

    function host(page: Page): Locator {
        return page.getByTestId('shellbar-host');
    }

    function input(page: Page): Locator {
        return host(page).locator('fdp-search-field[data-testid="shellbar-search"] input[type="search"]');
    }

    function clear(page: Page): Locator {
        return host(page).locator('button.fdp-search-field__clear');
    }

    function filter(page: Page): Locator {
        return host(page).locator('button.fdp-search-field__advanced-filter-button');
    }

    function shellbarAction(page: Page): Locator {
        return host(page).getByTestId('shellbar-action').getByRole('button', { name: 'Shellbar action' });
    }

    function suggestion(page: Page, name: string): Locator {
        return page.getByRole('option', { name });
    }

    async function showSearch(page: Page): Promise<void> {
        if (!(await input(page).isVisible())) {
            const openSearch = host(page).getByRole('button', { name: 'Open Search' });
            await expect(openSearch).toBeVisible();
            await openSearch.click();
        }
        await expect(input(page)).toBeVisible();
    }

    async function eventLog(page: Page, testId: string): Promise<{ text: string; category: string | null }[]> {
        return JSON.parse((await page.getByTestId(testId).innerText()) || '[]') as {
            text: string;
            category: string | null;
        }[];
    }

    async function settledSearchState(page: Page): Promise<SettledSearchState> {
        return page.evaluate(() => {
            const describe = (element: Element | null): FixtureElementState => {
                if (!element) {
                    return null;
                }
                const htmlElement = element as HTMLElement;
                const style = getComputedStyle(htmlElement);
                const rect = htmlElement.getBoundingClientRect();
                return {
                    tagName: htmlElement.tagName,
                    className: htmlElement.className,
                    hidden: htmlElement.hidden,
                    ariaHidden: htmlElement.getAttribute('aria-hidden'),
                    display: style.display,
                    visibility: style.visibility,
                    rectangle: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
                };
            };
            const search = document.querySelector(
                'fdp-search-field[data-testid="shellbar-search"] input[type="search"]'
            );
            const ancestors: FixtureElementState[] = [];
            let ancestor = search?.parentElement ?? null;
            while (ancestor) {
                ancestors.push(describe(ancestor));
                ancestor = ancestor.parentElement;
            }
            return {
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    devicePixelRatio: window.devicePixelRatio
                },
                shellbar: describe(document.querySelector('fd-shellbar')),
                input: describe(search),
                ancestors,
                openSearchTriggers: Array.from(document.querySelectorAll('button')).filter((button) =>
                    button.getAttribute('aria-label')?.includes('Open Search')
                ).length
            };
        });
    }

    test('core/shellbar-search clear is named and absent while empty', async ({ page }) => {
        await expect(clear(page)).toHaveCount(0);
        await input(page).fill('apple');
        await expect(clear(page)).toHaveRole('button');
        await expect(clear(page)).toHaveAccessibleName('Clear Search');
        await expect(clear(page)).not.toHaveAttribute('aria-hidden', 'true');
        await expect(clear(page)).toHaveAttribute('tabindex', '0');
    });

    test('core/shellbar-search tabs natively through the desktop Shellbar boundaries', async ({ page }, testInfo) => {
        const before = page.getByTestId('before-shellbar');
        const after = page.getByTestId('after-shellbar');
        const focusTrace: string[] = [];
        const forwardTab = (): Promise<void> =>
            page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Tab' : 'Tab');
        const reverseTab = (): Promise<void> =>
            page.keyboard.press(testInfo.project.name === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab');
        const recordFocus = async (step: string): Promise<void> => {
            focusTrace.push(
                await page.evaluate((currentStep) => {
                    const activeElement = document.activeElement as HTMLElement | null;
                    return `${currentStep}: ${activeElement?.tagName.toLowerCase()}#${activeElement?.id || ''}.${
                        activeElement?.className || ''
                    }`;
                }, step)
            );
        };

        await before.focus();
        await expect(before).toBeFocused();
        await recordFocus('before-shellbar');
        await forwardTab();
        await expect(filter(page)).toBeFocused();
        await recordFocus('advanced-filter');
        await forwardTab();
        await expect(input(page)).toBeFocused();
        await recordFocus('input');
        await input(page).fill('apple');
        await expect(input(page)).toBeFocused();
        await forwardTab();
        await expect(clear(page)).toBeFocused();
        await recordFocus('clear');
        await forwardTab();
        await expect(shellbarAction(page)).toBeFocused();
        await recordFocus('shellbar-action');
        await forwardTab();
        await expect(after).toBeFocused();
        await recordFocus('after-shellbar');
        await reverseTab();
        await expect(shellbarAction(page)).toBeFocused();
        await recordFocus('reverse-shellbar-action');
        await reverseTab();
        await expect(clear(page)).toBeFocused();
        await recordFocus('reverse-clear');
        await reverseTab();
        await expect(input(page)).toBeFocused();
        await recordFocus('reverse-input');
        await reverseTab();
        await expect(filter(page)).toBeFocused();
        await recordFocus('reverse-advanced-filter');
        await reverseTab();
        await expect(before).toBeFocused();
        await recordFocus('reverse-before-shellbar');
        await testInfo.attach('native-focus-trace.json', {
            body: JSON.stringify(focusTrace, null, 2),
            contentType: 'application/json'
        });
    });

    for (const key of ['Enter', 'Space']) {
        test('core/shellbar-search native ' + key + ' clears once and restores input focus', async ({ page }) => {
            await input(page).fill('apple');
            const inputBaseline = await eventLog(page, 'desktop-input-events');
            const cancelBaseline = await eventLog(page, 'desktop-cancel-events');
            await input(page).focus();
            await page.keyboard.press('Tab');
            await page.keyboard.press(key);
            await expect(input(page)).toHaveValue('');
            await expect(clear(page)).toHaveCount(0);
            await expect(input(page)).toBeFocused();
            await expect
                .poll(() => eventLog(page, 'desktop-input-events'))
                .toEqual([...inputBaseline, { text: '', category: null }]);
            await expect
                .poll(() => eventLog(page, 'desktop-cancel-events'))
                .toEqual([...cancelBaseline, { text: '', category: null }]);
        });
    }

    test('core/shellbar-search clear applies the data-source empty-search policy', async ({ page }) => {
        const sourceQueries = async (): Promise<string[]> =>
            JSON.parse((await page.getByTestId('source-queries').innerText()) || '[]') as string[];

        await page.getByTestId('toggle-empty').click();
        await input(page).fill('app');
        await expect(suggestion(page, 'Apple')).toBeVisible();
        await expect(suggestion(page, 'Banana')).toHaveCount(0);
        await clear(page).click();
        await expect(input(page)).toHaveValue('');
        await expect(input(page)).toBeFocused();
        await expect(clear(page)).toHaveCount(0);
        await expect(input(page)).toHaveAttribute('aria-expanded', 'false');
        await expect(suggestion(page, 'Apple')).toBeHidden();

        await page.getByTestId('toggle-empty').click();
        await input(page).fill('app');
        await expect.poll(sourceQueries).toEqual(expect.arrayContaining(['app']));
        await input(page).focus();
        await expect(suggestion(page, 'Apple')).toBeVisible();
        await expect(suggestion(page, 'Banana')).toHaveCount(0);
        await clear(page).click();
        await expect(input(page)).toHaveValue('');
        await expect(input(page)).toBeFocused();
        await expect(clear(page)).toHaveCount(0);
        await expect.poll(sourceQueries).toEqual(expect.arrayContaining(['app', '']));
        await expect(input(page)).toHaveAttribute('aria-expanded', 'true');
        await expect(suggestion(page, 'Apple')).toBeVisible();
        await expect(suggestion(page, 'Banana')).toBeVisible();
    });

    test('core/shellbar-search standalone desktop clear retains negative tab policy', async ({ page }) => {
        const standalone = page.getByTestId('standalone-host');
        const standaloneInput = standalone.locator('input[type="search"]');
        await standaloneInput.fill('apple');
        const standaloneClear = standalone.locator('button.fdp-search-field__clear');
        await expect(standaloneClear).toHaveAttribute('tabindex', '-1');
        await expect(standaloneClear).toHaveAttribute('aria-hidden', 'true');
    });

    test('core/shellbar-search mobile clear retains its negative tab policy', async ({ page }) => {
        const mobile = page.getByTestId('mobile-host');
        const mobileInput = mobile.locator('input[type="search"]');
        await mobileInput.fill('apple');
        const mobileClear = mobile.locator('button.fdp-search-field__clear');
        await expect(mobileClear).toHaveAttribute('tabindex', '-1');
        await expect(mobileClear).toHaveAttribute('aria-hidden', 'false');
    });

    test('core/shellbar-search configured advanced filter is a named native button', async ({ page }) => {
        await expect(filter(page)).toHaveCount(1);
        await expect(filter(page)).toHaveRole('button');
        await expect(filter(page)).toHaveAccessibleName('Advanced filter');
        await expect(filter(page)).toHaveAttribute('title', 'Advanced filter');
    });

    test('core/shellbar-search advanced filter keyboard and pointer activation emit once', async ({ page }) => {
        await filter(page).focus();
        await page.keyboard.press('Enter');
        await filter(page).focus();
        await page.keyboard.press('Space');
        await filter(page).click();
        await expect(page.getByTestId('desktop-filter-events')).toHaveText('3');
    });

    test('core/shellbar-search optional filter removes with its public mode toggle', async ({ page }) => {
        await expect(filter(page)).toHaveCount(1);
        await page.getByTestId('toggle-filter').click();
        await expect(filter(page)).toHaveCount(0);
    });

    test('core/shellbar-search advanced filter reacts to the supplied language dictionary', async ({ page }) => {
        await page.getByTestId('set-fixture-filter-language').click();
        await expect(filter(page)).toHaveAccessibleName('Fixture advanced filter');
        await expect(filter(page)).toHaveAttribute('title', 'Fixture advanced filter');
    });

    test('core/shellbar-search scoped axe records the real advanced-filter button name', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .include('[data-testid="shellbar-host"]')
            .withRules(['button-name'])
            .analyze();
        await test.info().attach('scoped-axe-results.json', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json'
        });
        expect(results.violations.filter((violation) => violation.id === 'button-name')).toEqual([]);
    });
});
