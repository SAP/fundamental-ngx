import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/button', () => {
    test('button receives focus on click', async ({ page, goto }) => {
        await goto('core/button/types');
        const button = page.locator('button[fd-button]').first();
        await button.click();
        await expect(button).toBeFocused();
    });

    test('button maintains focus after Enter key press', async ({ page, goto }) => {
        await goto('core/button/toggled');
        const toggleButton = page.locator('button[fd-button]').first();
        await toggleButton.focus();
        const pressedBefore = await toggleButton.getAttribute('aria-pressed');
        await page.keyboard.press('Enter');
        await expect(toggleButton).toBeFocused();
        if (pressedBefore !== null) {
            const expected = pressedBefore === 'true' ? 'false' : 'true';
            await expect(toggleButton).toHaveAttribute('aria-pressed', expected);
        }
    });

    test('toggle button changes state on click', async ({ page, goto }) => {
        await goto('core/button/toggled');
        const toggleButton = page.locator('button[fd-button]').first();
        const initialPressed = await toggleButton.getAttribute('aria-pressed');
        await toggleButton.click();
        if (initialPressed !== null) {
            const expected = initialPressed === 'true' ? 'false' : 'true';
            await expect(toggleButton).toHaveAttribute('aria-pressed', expected);
        }
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
