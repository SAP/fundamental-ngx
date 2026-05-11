import { test, expect } from '../../fixtures/base.fixture';

test.describe('Select Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/select/mode');
    });

    test('opens dropdown on click and shows options', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        expect(await options.count()).toBeGreaterThan(0);
    });

    test('selects option with keyboard', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(listbox).toBeHidden();
    });

    test('closes dropdown on Escape', async ({ page }) => {
        const select = page.locator('fd-select').first();
        const control = select.locator('.fd-select__control');
        await control.click();
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(listbox).toBeHidden();
    });

    test('disabled select does not open', async ({ page }) => {
        // The disabled select is the 3rd fd-select on the mode example page
        const disabledSelect = page.locator('fd-select').nth(2);
        const control = disabledSelect.locator('.fd-select__control');
        await expect(control).toHaveAttribute('aria-disabled', 'true');
        await control.click({ force: true });
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeHidden();
    });
});
