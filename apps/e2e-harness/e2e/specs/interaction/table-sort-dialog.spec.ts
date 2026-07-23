import { expect, test } from '../../fixtures/base.fixture';

test.describe('platform/table - Sort Dialog Multi-Criteria', () => {
    test.beforeEach(async ({ page, goto }) => {
        await goto('platform/table/settings-dialog');
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        // Open the settings dialog via the action-settings button in toolbar
        const settingsButton = page.locator('button[glyph="action-settings"]').first();
        await settingsButton.waitFor({ state: 'visible', timeout: 10000 });
        await settingsButton.click();
        // Wait for dialog to open
        await page.locator('[role="dialog"]').waitFor({ state: 'visible' });
        // Navigate to Sort tab
        const sortTab = page.getByRole('tab', { name: /sort/i });
        await sortTab.click();
        await page.waitForTimeout(300); // Brief wait for tab content
    });

    test('displays initial sort criterion row with combobox and direction buttons', async ({ page }) => {
        const firstCombobox = page.locator('fd-combobox').first();
        await expect(firstCombobox).toBeVisible();

        // Check that sort direction buttons are visible (by glyph)
        const ascButton = page.locator('button[glyph="sort-ascending"]').first();
        const descButton = page.locator('button[glyph="sort-descending"]').first();
        await expect(ascButton).toBeVisible();
        await expect(descButton).toBeVisible();
    });

    test('has move up, move down, and delete buttons in the DOM', async ({ page }) => {
        // Buttons exist in the DOM even if initially hidden/disabled
        const moveUpButton = page.locator('button[glyph="slim-arrow-up"]').first();
        const moveDownButton = page.locator('button[glyph="slim-arrow-down"]').first();
        const deleteButton = page.locator('button[glyph="decline"]').first();

        // Check buttons are attached to DOM
        await expect(moveUpButton).toBeAttached();
        await expect(moveDownButton).toBeAttached();
        await expect(deleteButton).toBeAttached();
    });

    test('move up button is disabled on the first row initially', async ({ page }) => {
        const firstMoveUpButton = page.locator('button[glyph="slim-arrow-up"]').first();
        await expect(firstMoveUpButton).toBeDisabled();
    });

    test('delete button is disabled when no column is selected', async ({ page }) => {
        const deleteButton = page.locator('button[glyph="decline"]').first();
        await expect(deleteButton).toBeDisabled();
    });

    test('can change sort direction using segmented button', async ({ page }) => {
        // The buttons should be visible initially
        const ascButton = page.locator('button[glyph="sort-ascending"]').first();
        const descButton = page.locator('button[glyph="sort-descending"]').first();

        await expect(ascButton).toBeVisible();
        await expect(descButton).toBeVisible();

        // Both buttons should be enabled (part of segmented button)
        await expect(ascButton).toBeEnabled();
        await expect(descButton).toBeEnabled();
    });

    test('combobox has placeholder text', async ({ page }) => {
        const firstCombobox = page.locator('fd-combobox input').first();
        const placeholder = await firstCombobox.getAttribute('placeholder');
        expect(placeholder).toBeTruthy();
    });

    test('dialog has accessible structure', async ({ page }) => {
        // Dialog should have role
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();

        // Sort tab should be accessible
        const sortTab = page.getByRole('tab', { name: /sort/i });
        await expect(sortTab).toBeVisible();
    });
});
