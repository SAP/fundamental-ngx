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
