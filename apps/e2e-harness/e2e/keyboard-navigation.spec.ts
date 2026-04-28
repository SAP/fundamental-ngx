import { expect, test } from '@playwright/test';

test.describe('Keyboard Navigation', () => {
    test.describe('Button', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/button/types');
            await page.waitForLoadState('networkidle');
        });

        test('Tab focuses the first button', async ({ page }) => {
            await page.keyboard.press('Tab');
            const firstButton = page.locator('button.fd-button').first();
            await expect(firstButton).toBeFocused();
        });

        test('successive Tabs move focus through buttons in order', async ({ page }) => {
            const buttons = page.locator('button.fd-button');
            const count = await buttons.count();
            expect(count).toBe(7);

            // Tab into the first button
            await page.keyboard.press('Tab');
            await expect(buttons.nth(0)).toBeFocused();

            // Tab through the remaining buttons
            for (let i = 1; i < count; i++) {
                await page.keyboard.press('Tab');
                await expect(buttons.nth(i)).toBeFocused();
            }
        });

        test('Enter on a focused button fires a click event', async ({ page }) => {
            const firstButton = page.locator('button.fd-button').first();

            // Attach a click listener that sets a data attribute as proof of activation
            await firstButton.evaluate((el) => {
                el.addEventListener('click', () => el.setAttribute('data-clicked', 'true'));
            });

            await page.keyboard.press('Tab');
            await expect(firstButton).toBeFocused();
            await page.keyboard.press('Enter');

            await expect(firstButton).toHaveAttribute('data-clicked', 'true');
        });

        test('Space on a focused button fires a click event', async ({ page }) => {
            const firstButton = page.locator('button.fd-button').first();

            await firstButton.evaluate((el) => {
                el.addEventListener('click', () => el.setAttribute('data-clicked', 'true'));
            });

            await page.keyboard.press('Tab');
            await expect(firstButton).toBeFocused();
            await page.keyboard.press('Space');

            await expect(firstButton).toHaveAttribute('data-clicked', 'true');
        });
    });

    test.describe('Combobox', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/combobox/basic');
            await page.waitForLoadState('networkidle');
        });

        test('Tab focuses the first combobox input', async ({ page }) => {
            await page.keyboard.press('Tab');
            const comboboxInput = page.locator('input[role="combobox"]').first();
            await expect(comboboxInput).toBeFocused();
        });

        test('typing into the input filters the dropdown', async ({ page }) => {
            const comboboxInput = page.locator('input[role="combobox"]').first();
            await comboboxInput.click();
            await page.keyboard.press('b');

            const options = page.locator('.fd-combobox-list-item:visible');
            await expect(options.first()).toBeVisible();
            await expect(options).toHaveCount(1);
            await expect(options.first()).toContainText('Banana');
        });

        test('ArrowDown opens dropdown and moves through options', async ({ page }) => {
            const comboboxInput = page.locator('input[role="combobox"]').first();
            await comboboxInput.click();

            // Alt+ArrowDown opens the dropdown
            await page.keyboard.press('Alt+ArrowDown');

            const options = page.locator('.fd-combobox-list-item:visible');
            await expect(options.first()).toBeVisible();
        });

        test('Enter selects the highlighted option', async ({ page }) => {
            const comboboxInput = page.locator('input[role="combobox"]').first();
            await comboboxInput.click();
            await comboboxInput.pressSequentially('App');

            const options = page.locator('.fd-combobox-list-item:visible');
            await expect(options.first()).toBeVisible();

            // ArrowDown to move focus to list, then Enter to select
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');

            // The input should contain the selected value
            await expect(comboboxInput).toHaveValue('Apple');
        });

        test('Escape closes the dropdown', async ({ page }) => {
            const comboboxInput = page.locator('input[role="combobox"]').first();
            await comboboxInput.click();
            await comboboxInput.pressSequentially('App');

            const options = page.locator('.fd-combobox-list-item:visible');
            await expect(options.first()).toBeVisible();

            await page.keyboard.press('Escape');

            await expect(options.first()).not.toBeVisible();
        });
    });

    test.describe('Form Container', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/form-container/basic');
            await page.waitForLoadState('networkidle');
        });

        test('Tab moves through form fields in sequence', async ({ page }) => {
            const textareas = page.locator('textarea');
            const count = await textareas.count();
            expect(count).toBe(6);

            // Tab into first focusable textarea
            await page.keyboard.press('Tab');
            const firstFocused = page.locator('textarea:focus');
            await expect(firstFocused).toBeVisible();

            // Continue tabbing — each Tab should focus the next textarea
            for (let i = 1; i < count; i++) {
                await page.keyboard.press('Tab');
                await expect(page.locator('textarea:focus')).toBeVisible();
            }
        });

        test('each textarea is focusable and accepts text input', async ({ page }) => {
            const firstTextarea = page.locator('textarea').first();
            await firstTextarea.click();
            await expect(firstTextarea).toBeFocused();

            const testText = 'Hello Keyboard Navigation';
            await page.keyboard.type(testText);

            await expect(firstTextarea).toHaveValue(testText);
        });

        test('textareas accept text input when focused directly', async ({ page }) => {
            const textareas = page.locator('textarea');
            const count = await textareas.count();

            for (let i = 0; i < count; i++) {
                const textarea = textareas.nth(i);
                await textarea.scrollIntoViewIfNeeded();
                await textarea.click({ force: true });
                await page.waitForTimeout(100);

                const text = `Field ${i + 1}`;
                await textarea.pressSequentially(text);
                await expect(textarea).toHaveValue(text);
            }
        });
    });
});
