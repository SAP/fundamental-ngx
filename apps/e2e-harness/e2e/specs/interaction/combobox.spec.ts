import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/combobox', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/combobox/combobox');
    });

    test('opens dropdown via addon button and shows all options', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        await expect(options).toHaveCount(5);
    });

    test('filters options by typing', async ({ page }) => {
        const input = page.locator('input[role="combobox"]').first();
        await input.click();
        await input.pressSequentially('App', { delay: 50 });
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        await expect(options.first()).toContainText('Apple');
    });

    test('selects option with keyboard navigation', async ({ page }) => {
        const input = page.locator('input[role="combobox"]').first();
        await input.click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(input).toHaveValue('Apple');
    });

    test('closes dropdown on Escape', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(listbox).toBeHidden();
    });

    test('selects option on click', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const option = listbox.locator('[role="option"]').filter({ hasText: 'Banana' });
        await option.click();
        const input = page.locator('input[role="combobox"]').first();
        await expect(input).toHaveValue('Banana');
    });
});
