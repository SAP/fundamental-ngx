import { test, expect } from '../../fixtures/base.fixture';

test.describe('Multi Input Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/multi-input/multi-input');
    });

    test('creates token by selecting from dropdown', async ({ page }) => {
        const multiInput = page.locator('fd-multi-input').first();
        const addonButton = multiInput.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('fd-multi-input ul[fd-list], .cdk-overlay-container ul[fd-list]').first();
        await expect(listbox).toBeVisible();
        const option = listbox.locator('li[fd-list-item]').first();
        await option.click();
        const tokens = multiInput.locator('fd-token');
        await expect(tokens.first()).toBeVisible();
    });

    test('removes token with backspace', async ({ page }) => {
        const multiInput = page.locator('fd-multi-input').first();
        const addonButton = multiInput.locator('.fd-input-group__addon button').first();
        // Add a token first
        await addonButton.click();
        const listbox = page.locator('.cdk-overlay-container ul[fd-list], fd-multi-input ul[fd-list]').first();
        await expect(listbox).toBeVisible();
        await listbox.locator('li[fd-list-item]').first().click();
        // Verify token was added
        const tokens = multiInput.locator('fd-token');
        const countAfterAdd = await tokens.count();
        expect(countAfterAdd).toBeGreaterThan(0);
        // Focus input and press Left to select last token, then Delete
        const input = multiInput.locator('input.fd-tokenizer__input');
        await input.focus();
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Backspace');
        await expect(tokens).toHaveCount(countAfterAdd - 1);
    });

    test('removes token via close button', async ({ page }) => {
        const multiInput = page.locator('fd-multi-input').first();
        const addonButton = multiInput.locator('.fd-input-group__addon button').first();
        // Add a token first
        await addonButton.click();
        const listbox = page.locator('.cdk-overlay-container ul[fd-list], fd-multi-input ul[fd-list]').first();
        await expect(listbox).toBeVisible();
        await listbox.locator('li[fd-list-item]').first().click();
        // Token should exist
        const tokens = multiInput.locator('fd-token');
        const countAfterAdd = await tokens.count();
        expect(countAfterAdd).toBeGreaterThan(0);
        // Click the close button on the first token
        const closeBtn = tokens.first().locator('.fd-token__close');
        await closeBtn.click();
        await expect(tokens).toHaveCount(countAfterAdd - 1);
    });

    test('filters dropdown options by typing', async ({ page }) => {
        const multiInput = page.locator('fd-multi-input').first();
        const input = multiInput.locator('input.fd-tokenizer__input');
        await input.click();
        await input.pressSequentially('App', { delay: 50 });
        const listbox = page.locator('.cdk-overlay-container ul[fd-list], fd-multi-input ul[fd-list]').first();
        await expect(listbox).toBeVisible();
        const items = listbox.locator('li[fd-list-item]');
        await expect(items.first()).toContainText('Apple');
    });

    test('navigates dropdown with keyboard and selects', async ({ page }) => {
        const multiInput = page.locator('fd-multi-input').first();
        const addonButton = multiInput.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('fd-multi-input ul[fd-list], .cdk-overlay-container ul[fd-list]').first();
        await expect(listbox).toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        const tokens = multiInput.locator('fd-token');
        await expect(tokens.first()).toBeVisible();
    });
});
