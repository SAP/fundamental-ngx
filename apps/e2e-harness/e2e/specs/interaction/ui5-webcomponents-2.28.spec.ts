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

function textArea(page: import('@playwright/test').Page, counterMode: 'None' | 'Auto' | 'Always'): Locator {
    return page.locator(`ui5-textarea[counter-mode="${counterMode}"]`);
}

function textAreaInput(textAreaLocator: Locator): Locator {
    return textAreaLocator.locator('textarea');
}

function characterCounter(textAreaLocator: Locator): Locator {
    return textAreaLocator.locator('.ui5-textarea-exceeded-text');
}

async function axeViolationIds(page: import('@playwright/test').Page, rule: string): Promise<string[]> {
    return (await new AxeBuilder({ page }).withRules([rule]).analyze()).violations.map((violation) => violation.id);
}

test.describe('UI5 Web Components 2.28 documentation interactions', () => {
    test('harness baseline renders an existing UI5 example', async ({ page, goto }) => {
        await goto('ui5/text-area/basic');

        await expect(page.locator('ui5-textarea')).toBeVisible();
    });

    test('filters, highlights, and clears Side Navigation search results', async ({ page, goto }) => {
        await goto('ui5-fiori/side-navigation/search-filter');

        const navigation = page.locator('ui5-side-navigation');
        const searchField = page.locator('ui5-side-navigation-search-field');
        const searchInput = searchField.locator('ui5-input input');
        const items = navigation.locator('ui5-side-navigation-item');

        await expect(searchField).toBeVisible();
        const initialItemCount = await items.count();
        expect(initialItemCount).toBeGreaterThan(1);

        await searchInput.fill('settings');
        await expect.poll(() => items.count()).toBeLessThan(initialItemCount);
        await expect(navigation.locator('.ui5-sn-item-highlight')).toHaveCount(1);

        await searchInput.press('Escape');
        await expect(searchInput).toHaveValue('');
        await expect.poll(() => items.count()).toBe(initialItemCount);
        await expect(navigation.locator('.ui5-sn-item-highlight')).toHaveCount(0);
    });

    test('renders and announces an empty Side Navigation search result', async ({ page, goto }) => {
        await goto('ui5-fiori/side-navigation/search-filter');

        const navigation = page.locator('ui5-side-navigation');
        const searchInput = navigation.locator('ui5-side-navigation-search-field ui5-input input');
        const items = navigation.locator('ui5-side-navigation-item:not(.ui5-sn-item-no-match)');

        await searchInput.fill('zzzz-no-match');

        await expect(items).toHaveCount(0);
        await expect(page.getByText('No matching navigation items', { exact: true })).toBeVisible();
        await expect(page.getByRole('status', { name: '0 matches found' })).toHaveCount(1);
    });

    test('announces Side Navigation result restoration after Escape and clear', async ({ page, goto }) => {
        await goto('ui5-fiori/side-navigation/search-filter');

        const navigation = page.locator('ui5-side-navigation');
        const searchInput = navigation.locator('ui5-side-navigation-search-field ui5-input input');
        const items = navigation.locator('ui5-side-navigation-item');
        const initialItemCount = await items.count();
        const restoredAnnouncement = `${initialItemCount} matches found`;

        await searchInput.fill('settings');
        await searchInput.press('Escape');
        await expect(searchInput).toHaveValue('');
        await expect(items).toHaveCount(initialItemCount);
        await expect(page.getByRole('status', { name: restoredAnnouncement })).toHaveCount(1);

        await searchInput.fill('settings');
        await searchInput.press('ControlOrMeta+A');
        await searchInput.press('Backspace');
        await expect(searchInput).toHaveValue('');
        await expect(items).toHaveCount(initialItemCount);
        await expect(page.getByRole('status', { name: restoredAnnouncement })).toHaveCount(1);
    });

    test('hides Side Navigation filtering when collapsed and keeps restored results keyboard reachable', async ({
        page,
        goto
    }) => {
        await goto('ui5-fiori/side-navigation/search-filter');

        const navigation = page.locator('ui5-side-navigation');
        const searchField = navigation.locator('ui5-side-navigation-search-field');
        const searchInput = searchField.locator('ui5-input input');
        const firstItem = navigation.locator('ui5-side-navigation-item').first();

        await page.getByRole('button', { name: 'Collapse navigation' }).click({ timeout: 5_000 });
        await expect(searchField).toBeHidden();

        await page.getByRole('button', { name: 'Expand navigation' }).click({ timeout: 5_000 });
        await expect(searchField).toBeVisible();

        await searchInput.fill('settings');
        await searchInput.press('Escape');
        await searchInput.focus();
        await searchInput.press('Tab');
        await expect(firstItem).toBeFocused();
    });

    test('uses None mode for a hard TextArea limit without a counter', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');

        const none = textArea(page, 'None');
        const input = textAreaInput(none);

        await expect(none).toBeVisible();
        await expect(characterCounter(none)).toHaveCount(0);

        const maxLength = Number(await input.getAttribute('maxlength'));
        expect(maxLength).toBeGreaterThan(0);

        await input.fill('x'.repeat(maxLength + 1));
        await expect(input).toHaveValue('x'.repeat(maxLength));
    });

    test('shows the Auto TextArea counter on focus without changing the component height', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');

        const auto = textArea(page, 'Auto');
        const input = textAreaInput(auto);
        const counter = characterCounter(auto);

        await expect(auto).toBeVisible();
        const beforeFocus = await dimensions(auto);
        await expect(counter).toBeHidden();

        await input.focus();
        await expect(counter).toBeVisible();
        expect((await dimensions(auto)).height).toBe(beforeFocus.height);

        const maxLength = Number(await auto.getAttribute('maxlength'));
        expect(maxLength).toBeGreaterThan(0);

        const value = 'x'.repeat(maxLength + 1);
        await input.fill(value);
        await expect(input).toHaveValue(value);
    });

    test('keeps the Always TextArea counter visible and allows text beyond its limit', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');

        const always = textArea(page, 'Always');
        const input = textAreaInput(always);

        await expect(always).toBeVisible();
        await expect(characterCounter(always)).toBeVisible();

        const maxLength = Number(await always.getAttribute('maxlength'));
        expect(maxLength).toBeGreaterThan(0);

        const value = 'x'.repeat(maxLength + 1);
        await input.fill(value);
        await expect(input).toHaveValue(value);
    });

    test('derives every TextArea accessible name from its visible label', async ({ page, goto }) => {
        await goto('ui5/text-area/character-counter-modes');

        const textAreas = [
            {
                counterMode: 'None' as const,
                label: 'None — hard limit (100)',
                accessibleName: 'None — hard limit (100)',
                placeholder: 'The counter is never shown'
            },
            {
                counterMode: 'Auto' as const,
                label: 'Auto — counter on focus (100)',
                accessibleName: 'Auto — counter on focus (100) 100 characters left',
                placeholder: 'Focus to reveal the counter'
            },
            {
                counterMode: 'Always' as const,
                label: 'Always — soft limit (100)',
                accessibleName: 'Always — soft limit (100) 100 characters left',
                placeholder: 'The counter is always visible'
            }
        ];

        for (const { counterMode, label: labelText, accessibleName, placeholder } of textAreas) {
            const label = page.locator('label', { hasText: labelText });
            const area = textArea(page, counterMode);
            const input = textAreaInput(area);

            await expect(label).toBeVisible();
            const labelId = await label.getAttribute('id');
            expect(labelId).not.toBeNull();
            if (!labelId) {
                throw new Error(`Expected the ${labelText} label to have an id.`);
            }

            await expect(area).toHaveAttribute('accessible-name-ref', labelId);
            await expect(input).toHaveAccessibleName(accessibleName);
            await expect(input).not.toHaveAccessibleName(placeholder);
        }
    });

    test('resizes a Popover from its keyboard handle and restores opener focus on Escape', async ({ page, goto }) => {
        await goto('ui5/popover/resizable-keyboard');

        const opener = page.locator('ui5-button').first();
        const popover = page.locator('ui5-popover[resizable]');

        await expect(opener).toBeVisible();
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

    test('keeps the Popover scrollable region keyboard accessible at its minimum reachable size', async ({
        page,
        goto
    }) => {
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

        const violations = await axeViolationIds(page, 'scrollable-region-focusable');

        expect(violations).toEqual([]);
    });

    test('classifies page-has-heading-one as a harness baseline, not a Phase 6 demo regression', async ({
        page,
        goto
    }) => {
        await goto('ui5/text-area/basic');
        await expect(page.locator('ui5-textarea')).toBeVisible();
        const controlViolations = await axeViolationIds(page, 'page-has-heading-one');

        await goto('ui5/popover/resizable-keyboard');
        await expect(page.locator('#resizable-keyboard-popover-opener')).toBeVisible();
        const phaseSixViolations = await axeViolationIds(page, 'page-has-heading-one');

        expect({ controlViolations, phaseSixViolations }).toEqual({
            controlViolations: ['page-has-heading-one'],
            phaseSixViolations: ['page-has-heading-one']
        });
    });

    test('keeps the default Bar structural without toolbar semantics', async ({ page, goto }) => {
        await goto('ui5/bar/basic');

        await expect(page.locator('ui5-bar')).not.toHaveAttribute('role', 'toolbar');
    });

    test('renders Bar icons without SAP-icons-v5 loader errors', async ({ page, goto }) => {
        const consoleErrors: string[] = [];
        page.on('console', (message) => {
            if (message.type() === 'error') {
                consoleErrors.push(message.text());
            }
        });

        await goto('ui5/bar/basic');

        const iconButtons = page.locator('ui5-bar ui5-button');
        await expect(iconButtons).toHaveCount(2);

        const icons = await iconButtons.evaluateAll((buttons) =>
            buttons.map((button) => {
                const icon = button.shadowRoot?.querySelector('ui5-icon');
                return {
                    name: button.getAttribute('icon'),
                    hasPath: Boolean(icon?.shadowRoot?.querySelector('svg path'))
                };
            })
        );
        const missingLoaderErrors = consoleErrors.filter((message) => message.includes('SAP-icons-v5'));

        expect({ missingLoaderErrors, icons }).toEqual({
            missingLoaderErrors: [],
            icons: [
                { name: 'home', hasPath: true },
                { name: 'action-settings', hasPath: true }
            ]
        });
    });

    test('renders the Numeric Input migration route', async ({ page, goto }) => {
        await goto('ui5/numeric-input/basic');

        await expect(page.locator('ui5-numeric-input').first()).toBeVisible();
    });
});
