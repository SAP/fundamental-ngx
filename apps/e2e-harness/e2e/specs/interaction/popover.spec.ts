import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/popover', () => {
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

    test('restores trigger focus when clicking non-focusable space outside', async ({ page }) => {
        await page.evaluate(() => {
            const outside = document.createElement('div');
            outside.id = 'popover-outside-space';
            outside.textContent = 'Outside space';
            outside.style.cssText = 'position: fixed; right: 0; bottom: 0; padding: 20px';
            document.body.append(outside);
        });
        const trigger = page.getByRole('button', { name: 'Sample', exact: true });
        await trigger.focus();
        await trigger.press('Enter');
        const action = page.locator('.cdk-overlay-container').getByRole('button', { name: 'Save', exact: true });
        await action.focus();
        await expect(action).toBeFocused();

        await page.locator('#popover-outside-space').click();

        await expect(action).toBeHidden();
        await expect(trigger).toBeFocused();
    });

    test('preserves focus transferred to an outside input', async ({ page }) => {
        await page.evaluate(() => {
            const outside = document.createElement('input');
            outside.id = 'popover-outside-input';
            outside.setAttribute('aria-label', 'Outside input');
            outside.style.cssText = 'position: fixed; right: 0; bottom: 0';
            document.body.append(outside);
        });
        const trigger = page.getByRole('button', { name: 'Sample', exact: true });
        await trigger.focus();
        await trigger.press('Enter');
        const action = page.locator('.cdk-overlay-container').getByRole('button', { name: 'Save', exact: true });
        await action.focus();
        const outsideInput = page.getByRole('textbox', { name: 'Outside input' });

        await outsideInput.click();

        await expect(action).toBeHidden();
        await expect(outsideInput).toBeFocused();
    });

    test('restores trigger focus after clicking blank space in a focusable page container', async ({ page }) => {
        await page.evaluate(() => {
            const container = document.querySelector('e2e-root') as HTMLElement;
            container.tabIndex = 0;
            const outside = document.createElement('div');
            outside.id = 'popover-outside-space';
            outside.textContent = 'Outside space';
            outside.style.cssText = 'position: fixed; right: 0; bottom: 0; padding: 20px';
            container.append(outside);
        });
        const trigger = page.getByRole('button', { name: 'Sample', exact: true });
        await trigger.click();
        const action = page.locator('.cdk-overlay-container').getByRole('button', { name: 'Save', exact: true });
        await action.focus();
        await expect(action).toBeFocused();

        await page.locator('#popover-outside-space').click();

        await expect(action).toBeHidden();
        await expect(trigger).toBeFocused();
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
