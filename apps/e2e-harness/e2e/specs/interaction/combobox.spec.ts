import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/combobox click-outside parity with Tab out', () => {
    // Regression for issue #13481: click-outside must revert invalid input the same way Tab out does.
    // Uses the reactive-form example (objects mode: communicateByObject=true).

    const setupKiwiThenAppend123 = async (page: import('@playwright/test').Page): Promise<void> => {
        const combobox = page.locator('fd-combobox').first();
        const input = combobox.locator('input[role="combobox"]');

        // Select Kiwi via the dropdown
        await input.click();
        await input.pressSequentially('Kiwi', { delay: 30 });
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        const kiwiOption = listbox.locator('[role="option"]').filter({ hasText: 'Kiwi' });
        await kiwiOption.click();
        await expect(input).toHaveValue('Kiwi');

        // Re-focus and append "123" — just type the suffix; cursor is at end after refocus
        await input.click();
        await input.pressSequentially('123', { delay: 50 });
        await expect(input).toHaveValue('Kiwi123');
    };

    test.beforeEach(async ({ goto }) => {
        await goto('core/combobox/forms');
    });

    test('scenario 1 — Tab out reverts invalid input to last valid selection', async ({ page }) => {
        await setupKiwiThenAppend123(page);

        await page.keyboard.press('Tab');

        const combobox = page.locator('fd-combobox').first();
        const input = combobox.locator('input[role="combobox"]');
        await expect(input).toHaveValue('Kiwi');

        const jsonValue = page.locator('small').first();
        await expect(jsonValue).toContainText('"displayedValue": "Kiwi"');
        await expect(jsonValue).toContainText('"value": "KiwiValue"');
    });

    test('scenario 2 — click outside reverts invalid input to last valid selection', async ({ page }) => {
        await setupKiwiThenAppend123(page);

        // Click the value readout of the second combobox — outside the first combobox and its CDK overlay
        await page.locator('small').last().click();

        const combobox = page.locator('fd-combobox').first();
        const input = combobox.locator('input[role="combobox"]');
        await expect(input).toHaveValue('Kiwi');

        const jsonValue = page.locator('small').first();
        await expect(jsonValue).toContainText('"displayedValue": "Kiwi"');
        await expect(jsonValue).toContainText('"value": "KiwiValue"');
    });
});

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
        await expect(options).toHaveCount(8);
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

    test('handles fast typing without losing characters (autocomplete race condition)', async ({ page }) => {
        // Regression test for: autocomplete selecting last typed character during fast typing
        // Bug: typing "Week24" fast would result in "Wek24" or "Wee24"
        // Cause: selection range used stale model value instead of current native input value

        // Create a custom test with specific values
        const input = page.locator('input[role="combobox"]').first();
        await input.click();

        // Type "App" with minimal delay to simulate fast typing
        await input.pressSequentially('App', { delay: 10 });

        // Should autocomplete to "Apple" and NOT lose the second 'p'
        await expect(input).toHaveValue('Apple');

        // Clear via keyboard (Ctrl+A + Delete simulates real user clearing the field)
        await input.press('Control+a');
        await input.press('Delete');
        await input.pressSequentially('Bana', { delay: 10 });

        await expect(input).toHaveValue('Banana');

        // Verify no characters were overwritten during typing
        // The bug would cause the last character to be selected, so next keystroke overwrites it
    });
});
