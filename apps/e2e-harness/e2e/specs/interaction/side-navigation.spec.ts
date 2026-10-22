import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/side-navigation', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/side-navigation/object');
    });

    test('displays side navigation with items', async ({ page }) => {
        const sideNav = page.locator('fd-side-navigation, fd-side-nav');
        await expect(sideNav.first()).toBeVisible();
        const items = page.locator('.fd-nested-list__link, .fd-navigation-list__item-link');
        expect(await items.count()).toBeGreaterThan(0);
    });

    test('navigation items have proper structure', async ({ page }) => {
        const navLinks = page.locator('.fd-nested-list__link, a[fd-nested-list-link]');
        const count = await navLinks.count();
        expect(count).toBeGreaterThan(2);
        // Verify links have text content
        const firstLink = navLinks.first();
        const text = await firstLink.textContent();
        expect((text ?? '').trim().length).toBeGreaterThan(0);
    });

    test('navigation items are keyboard focusable', async ({ page }) => {
        const items = page.locator('.fd-nested-list__link, .fd-navigation-list__item-link');
        const firstItem = items.first();
        await firstItem.focus();
        await expect(firstItem).toBeFocused();
    });

    test('highlights selected item', async ({ page }) => {
        const items = page.locator('.fd-nested-list__link, .fd-navigation-list__item-link');
        const secondItem = items.nth(1);
        await secondItem.click();
        const selected = page.locator('.is-selected, [aria-current="page"]');
        await expect(selected.first()).toBeVisible();
    });
});

test.describe('ui5-fiori/side-navigation', () => {
    test('filters, highlights, announces, and clears search results with Escape and user input', async ({
        page,
        goto
    }) => {
        await goto('ui5-fiori/side-navigation/search-filter');
        const navigation = page.locator('ui5-side-navigation');
        const searchInput = navigation.locator('ui5-side-navigation-search-field ui5-input input');
        const items = navigation.locator('ui5-side-navigation-item');
        const initialItemCount = await items.count();

        await expect(page.locator('ui5-announcement-area .ui5-invisiblemessage-polite')).toHaveText('');
        expect(initialItemCount).toBeGreaterThan(1);
        await searchInput.fill('settings');
        await expect.poll(() => items.count()).toBeLessThan(initialItemCount);
        await expect(navigation.locator('.ui5-sn-item-highlight')).toHaveCount(1);
        await expect(page.locator('ui5-announcement-area .ui5-invisiblemessage-polite')).toHaveText('1 match found');
        await searchInput.press('Escape');
        await expect(searchInput).toHaveValue('');
        await expect(items).toHaveCount(initialItemCount);
        await expect(navigation.locator('.ui5-sn-item-highlight')).toHaveCount(0);
        await expect(page.locator('ui5-announcement-area .ui5-invisiblemessage-polite')).toHaveText(
            `${initialItemCount} matches found`
        );
        await searchInput.fill('settings');
        await expect.poll(() => items.count()).toBeLessThan(initialItemCount);
        await searchInput.press('ControlOrMeta+A');
        await searchInput.press('Backspace');
        await expect(searchInput).toHaveValue('');
        await expect(items).toHaveCount(initialItemCount);
        await expect(navigation.locator('.ui5-sn-item-highlight')).toHaveCount(0);
        await expect(page.locator('ui5-announcement-area .ui5-invisiblemessage-polite')).toHaveText(
            `${initialItemCount} matches found`
        );
    });

    test('uses UI5 zero-match rendering and preserves native Tab behavior', async ({ page, goto }) => {
        await goto('ui5-fiori/side-navigation/search-filter');
        const navigation = page.locator('ui5-side-navigation');
        const searchInput = navigation.locator('ui5-side-navigation-search-field ui5-input input');
        const items = navigation.locator('ui5-side-navigation-item:not(.ui5-sn-item-no-match)');
        const noMatchItem = navigation.locator('.ui5-sn-item-no-match');

        await searchInput.fill('zzzz-no-match');
        await expect(items).toHaveCount(0);
        await expect(noMatchItem).toBeVisible();
        await expect(page.getByText('No matching navigation items', { exact: true })).toHaveCount(0);
        await expect(page.getByRole('status')).toHaveCount(0);
        await searchInput.press('Tab');
        await expect(noMatchItem).toBeFocused();
    });

    test('hides filtering when collapsed and focuses a visible result after Tab', async ({ page, goto }) => {
        await goto('ui5-fiori/side-navigation/search-filter');
        const navigation = page.locator('ui5-side-navigation');
        const searchField = navigation.locator('ui5-side-navigation-search-field');
        const searchInput = searchField.locator('ui5-input input');
        const firstItem = navigation.locator('ui5-side-navigation-item').first();

        await page.getByRole('button', { name: 'Collapse Navigation' }).click();
        await expect(searchField).toBeHidden();
        await page.getByRole('button', { name: 'Expand Navigation' }).click();
        await expect(searchField).toBeVisible();
        await searchInput.fill('settings');
        await searchInput.focus();
        await searchInput.press('Tab');
        await expect(firstItem).toBeFocused();
    });
});
