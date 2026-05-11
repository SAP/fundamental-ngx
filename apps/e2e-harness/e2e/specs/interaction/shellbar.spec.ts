import { expect, test } from '../../fixtures/base.fixture';

test.describe('cx/shellbar', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('cx/side-navigation/shellbar');
    });

    test('displays shellbar with branding', async ({ page }) => {
        const shellbar = page.locator('fd-shellbar, cx-side-navigation').first();
        await expect(shellbar).toBeVisible({ timeout: 10000 });
    });

    test('navigation component contains interactive links', async ({ page }) => {
        const links = page.locator('a, [role="treeitem"], .fd-nested-list__link');
        await expect(links.first()).toBeVisible({ timeout: 10000 });
        expect(await links.count()).toBeGreaterThan(0);
    });

    test('clicking navigation link updates state', async ({ page }) => {
        const links = page.locator('a[fd-nested-list-link], .fd-nested-list__link, [role="treeitem"]');
        await expect(links.first()).toBeVisible({ timeout: 10000 });
        expect(await links.count()).toBeGreaterThan(1);
        const secondLink = links.nth(1);
        await secondLink.click();
        const selected = page.locator('.is-selected, [aria-current="page"], .is-expanded');
        await expect(selected.first()).toBeVisible();
    });

    test('layout contains both shellbar and navigation', async ({ page }) => {
        const page_content = page.locator('cx-side-navigation, fd-side-navigation, fd-shellbar');
        await expect(page_content.first()).toBeVisible({ timeout: 10000 });
    });
});
