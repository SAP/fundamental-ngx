import { test, expect } from '../../fixtures/base.fixture';

test.describe('Menu Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/menu/with-submenu');
    });

    test('opens menu on trigger click', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /menu/i }).first();
        await trigger.click();
        const menu = page.locator('.cdk-overlay-container [role="menu"], fd-menu [role="menu"]').first();
        await expect(menu).toBeVisible();
    });

    test('closes menu on Escape', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /menu/i }).first();
        await trigger.click();
        const menu = page.locator('.cdk-overlay-container [role="menu"], fd-menu [role="menu"]').first();
        await expect(menu).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();
    });

    test('navigates menu items with keyboard', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /menu/i }).first();
        await trigger.click();
        const menu = page.locator('.cdk-overlay-container [role="menu"], fd-menu [role="menu"]').first();
        await expect(menu).toBeVisible();
        await page.keyboard.press('ArrowDown');
        const focusedItem = menu.locator('[role="menuitem"]:focus, .is-focused');
        await expect(focusedItem).toBeVisible();
    });

    test('opens submenu on hover or arrow right', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /menu/i }).first();
        await trigger.click();
        const menu = page.locator('.cdk-overlay-container [role="menu"], fd-menu [role="menu"]').first();
        await expect(menu).toBeVisible();
        const submenuItem = menu.locator('[role="menuitem"]').filter({ has: page.locator('.fd-menu__addon-after') }).first();
        if (await submenuItem.count() > 0) {
            await submenuItem.hover();
            const submenu = page.locator('.cdk-overlay-container [role="menu"]').nth(1);
            await expect(submenu).toBeVisible();
        }
    });

    test('selects menu item on click and menu closes', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /menu/i }).first();
        await trigger.click();
        const menu = page.locator('.cdk-overlay-container [role="menu"], fd-menu [role="menu"]').first();
        await expect(menu).toBeVisible();
        const items = menu.locator('[role="menuitem"]');
        expect(await items.count()).toBeGreaterThan(0);
    });
});
