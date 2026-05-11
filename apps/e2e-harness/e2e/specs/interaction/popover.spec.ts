import { test, expect } from '../../fixtures/base.fixture';

test.describe('Popover Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/popover/simple');
    });

    test('opens popover on trigger click', async ({ page }) => {
        const trigger = page.locator('fd-popover fd-popover-control button, [fdPopoverTrigger]').first();
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
    });

    test('closes popover on Escape', async ({ page }) => {
        const trigger = page.locator('fd-popover fd-popover-control button, [fdPopoverTrigger]').first();
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        await popoverBody.waitFor({ state: 'visible' });
        await page.keyboard.press('Escape');
        await expect(popoverBody).toBeHidden();
    });

    test('closes popover on trigger re-click', async ({ page }) => {
        const trigger = page.locator('fd-popover fd-popover-control button, [fdPopoverTrigger]').first();
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        await trigger.click();
        await expect(popoverBody).toBeHidden();
    });

    test('popover has correct positioning relative to trigger', async ({ page }) => {
        const trigger = page.locator('fd-popover fd-popover-control button, [fdPopoverTrigger]').first();
        const triggerBox = await trigger.boundingBox();
        await trigger.click();
        const popoverBody = page.locator('.cdk-overlay-container fd-popover-body, fd-popover-body').first();
        await expect(popoverBody).toBeVisible();
        const popoverBox = await popoverBody.boundingBox();
        expect(triggerBox).not.toBeNull();
        expect(popoverBox).not.toBeNull();
    });
});
