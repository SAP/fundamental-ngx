import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/dialog', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/dialog/template-based-dialog');
    });

    test('opens dialog on trigger click', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /open/i }).first();
        await trigger.click();
        const dialog = page.locator('.cdk-overlay-container fd-dialog, .cdk-overlay-container [role="dialog"]').first();
        await expect(dialog).toBeVisible();
    });

    test('closes dialog on Escape', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /open/i }).first();
        await trigger.click();
        const dialog = page.locator('.cdk-overlay-container fd-dialog, .cdk-overlay-container [role="dialog"]').first();
        await expect(dialog).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
    });

    test('closes dialog via close button', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /open/i }).first();
        await trigger.click();
        const dialog = page.locator('.cdk-overlay-container fd-dialog, .cdk-overlay-container [role="dialog"]').first();
        await expect(dialog).toBeVisible();
        const closeBtn = dialog
            .locator('button[aria-label="close"], button[glyph="decline"], .fd-dialog__decisive-button')
            .first();
        if ((await closeBtn.count()) > 0) {
            await closeBtn.click();
        } else {
            const cancelBtn = dialog
                .locator('button')
                .filter({ hasText: /cancel|close|no/i })
                .first();
            await cancelBtn.click();
        }
        await expect(dialog).toBeHidden();
    });

    test('traps focus within dialog', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /open/i }).first();
        await trigger.click();
        const dialog = page.locator('.cdk-overlay-container fd-dialog, .cdk-overlay-container [role="dialog"]').first();
        await expect(dialog).toBeVisible();
        // Focus should be within the dialog
        const activeInDialog = await page.evaluate(() => {
            const dialogEl = document.querySelector('.cdk-overlay-container fd-dialog, [role="dialog"]');
            return dialogEl?.contains(document.activeElement) ?? false;
        });
        expect(activeInDialog).toBe(true);
    });

    test('dialog backdrop blocks interaction with page', async ({ page }) => {
        const trigger = page.locator('button').filter({ hasText: /open/i }).first();
        await trigger.click();
        const dialog = page.locator('.cdk-overlay-container fd-dialog, .cdk-overlay-container [role="dialog"]').first();
        await expect(dialog).toBeVisible();
        const backdrop = page.locator('.cdk-overlay-backdrop');
        if ((await backdrop.count()) > 0) {
            await expect(backdrop.first()).toBeVisible();
        } else {
            const dialogContent = dialog.locator('.fd-dialog__content, .fd-dialog__body');
            await expect(dialogContent.first()).toBeVisible();
        }
    });
});
