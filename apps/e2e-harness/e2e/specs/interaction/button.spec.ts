import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/button', () => {
    test('button receives focus on click', async ({ page, goto }) => {
        await goto('core/button/types');
        const button = page.locator('button[fd-button]').first();
        await button.click();
        await expect(button).toBeFocused();
    });

    test('toggle button is rendered with toggled modifier class', async ({ page, goto }) => {
        await goto('core/button/toggled');
        const toggleButton = page.locator('button[fd-button]').first();
        await expect(toggleButton).toBeVisible();
        await expect(toggleButton).toBeEnabled();
    });

    test('badge button displays badge element', async ({ page, goto }) => {
        await goto('core/button/badge');
        const buttonWithBadge = page.locator('button[fd-button]').first();
        await expect(buttonWithBadge).toBeVisible();
        const badge = page.locator('.fd-button__badge, fd-badge');
        await expect(badge.first()).toBeVisible();
    });

    test('disabled button is not interactive', async ({ page, goto }) => {
        await goto('core/button/state');
        const disabledButton = page.locator('button[fd-button][disabled]').first();
        await expect(disabledButton).toBeVisible();
        await expect(disabledButton).toBeDisabled();
    });
});
