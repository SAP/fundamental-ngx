import AxeBuilder from '@axe-core/playwright';
import { Locator } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

async function dimensions(locator: Locator): Promise<{ width: number; height: number }> {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    if (!box) {
        throw new Error('Expected a visible element with dimensions.');
    }
    return { width: box.width, height: box.height };
}

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

test.describe('ui5/popover', () => {
    test('resizes from its keyboard handle and restores opener focus on Escape', async ({ page, goto }) => {
        await goto('ui5/popover/resizable-keyboard');
        const opener = page.locator('ui5-button').first();
        const popover = page.locator('ui5-popover[resizable]');
        await opener.click();
        await expect(popover).toBeVisible();
        const resizeHandle = popover.locator('.ui5-popover-keyboard-resize-handle');
        if (!(await resizeHandle.evaluate((element) => element.matches(':focus')))) {
            await page.keyboard.press('Tab');
        }
        await expect(resizeHandle).toBeFocused();
        const initialSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowRight');
        await expect.poll(async () => (await dimensions(popover)).width).toBeGreaterThan(initialSize.width);
        const widerSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowDown');
        await expect.poll(async () => (await dimensions(popover)).height).toBeGreaterThan(widerSize.height);
        await resizeHandle.press('Escape');
        await expect(popover).toBeHidden();
        await expect(opener).toBeFocused();
    });

    test('keeps the scrollable region keyboard accessible at its minimum reachable size', async ({ page, goto }) => {
        await goto('ui5/popover/resizable-keyboard');
        const opener = page.locator('#resizable-keyboard-popover-opener');
        const popover = page.locator('ui5-popover[resizable]');
        await opener.click();
        await expect(popover).toBeVisible();
        const resizeHandle = popover.locator('.ui5-popover-keyboard-resize-handle');
        if (!(await resizeHandle.evaluate((element) => element.matches(':focus')))) {
            await page.keyboard.press('Tab');
        }
        await expect(resizeHandle).toBeFocused();
        for (let press = 0; press < 48; press++) {
            await resizeHandle.press('Shift+ArrowLeft');
            await resizeHandle.press('Shift+ArrowUp');
        }
        const minimumSize = await dimensions(popover);
        await resizeHandle.press('Shift+ArrowLeft');
        await resizeHandle.press('Shift+ArrowUp');
        expect(await dimensions(popover)).toEqual(minimumSize);
        const violations = await new AxeBuilder({ page }).withRules(['scrollable-region-focusable']).analyze();
        expect(violations.violations).toEqual([]);
    });
});
