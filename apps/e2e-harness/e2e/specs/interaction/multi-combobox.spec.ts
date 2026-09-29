import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/multi-combobox', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/multi-combobox/datasource');
    });

    test('updates an open dropdown when a selected token is removed', async ({ page }) => {
        const multiCombobox = page.locator('fd-multi-combobox').first();
        const input = multiCombobox.locator('input[role="combobox"]');
        const dropdownButton = multiCombobox.getByRole('button', { name: 'Select Options' });
        const listbox = page.locator('.fd-multi-combobox__list[role="listbox"]');
        const option = (name: string): import('@playwright/test').Locator =>
            listbox.locator(`li[role="option"]:has([fd-list-title][title="${name}"])`);
        const checkbox = (name: string): import('@playwright/test').Locator =>
            option(name).locator('input[type="checkbox"]');
        const checkboxLabel = (name: string): import('@playwright/test').Locator =>
            option(name).locator('.fd-checkbox__label');
        const selectedValue = page.locator('p').filter({ hasText: 'Selected:' }).first();

        await dropdownButton.click();
        await expect(listbox).toBeVisible();

        // The example begins with Banana selected. Deselect it so this test selects it through the public UI.
        await checkboxLabel('Banana').click();
        await expect(option('Banana')).not.toHaveClass(/is-selected/);
        await expect(checkbox('Banana')).not.toBeChecked();

        await checkboxLabel('Apple').click();
        await expect(option('Apple')).toHaveClass(/is-selected/);
        await expect(checkbox('Apple')).toBeChecked();

        await checkboxLabel('Banana').click();
        await expect(multiCombobox.locator('fd-token').filter({ hasText: 'Banana' })).toBeVisible();
        await expect(option('Banana')).toHaveClass(/is-selected/);
        await expect(checkbox('Banana')).toBeChecked();

        await multiCombobox.locator('fd-token').filter({ hasText: 'Banana' }).locator('.fd-token__close').click();

        await expect(listbox).toBeVisible();
        await expect(multiCombobox.locator('fd-token').filter({ hasText: 'Banana' })).toHaveCount(0);
        await expect(option('Banana')).not.toHaveClass(/is-selected/);
        await expect(checkbox('Banana')).not.toBeChecked();
        await expect(option('Apple')).toHaveClass(/is-selected/);
        await expect(checkbox('Apple')).toBeChecked();
        await expect(selectedValue).toContainText('Apple');
        await expect(selectedValue).not.toContainText('Banana');

        await input.press('Escape');
        await expect(listbox).toBeHidden();
        await dropdownButton.click();
        await expect(listbox).toBeVisible();
        await expect(option('Banana')).not.toHaveClass(/is-selected/);
        await expect(checkbox('Banana')).not.toBeChecked();
        await expect(option('Apple')).toHaveClass(/is-selected/);
        await expect(checkbox('Apple')).toBeChecked();
    });
});
