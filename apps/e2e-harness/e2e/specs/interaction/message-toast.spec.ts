import { Locator } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

async function boundingBoxOf(locator: Locator): Promise<{ x: number; y: number; width: number; height: number }> {
    const box = await locator.boundingBox();
    expect(box).not.toBeNull();
    return box as { x: number; y: number; width: number; height: number };
}

test.describe('core/message-toast', () => {
    test('hover on toast cancels auto-dismiss; mouseleave restarts it', async ({ page, goto }) => {
        await goto('core/message-toast/message-toast');

        await page.getByRole('button', { name: 'Open from String' }).click();
        const toast = page.locator('fd-message-toast');
        await expect(toast).toBeVisible();

        await page.waitForTimeout(2000);
        await toast.hover();
        await page.waitForTimeout(4000);
        await expect(toast).toBeVisible();

        await page.mouse.move(0, 0);
        await expect(toast).not.toBeVisible({ timeout: 6000 });
    });

    test.describe('positioning', () => {
        const halfW = 640;
        const halfH = 360;

        test.beforeEach(async ({ page }) => {
            await page.setViewportSize({ width: 1280, height: 720 });
        });

        test('top left', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on top left corner' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            expect(box.x).toBeLessThan(halfW);
            expect(box.y).toBeLessThan(halfH);
        });

        test('top center', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on top center' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            const centerX = box.x + box.width / 2;
            expect(Math.abs(centerX - halfW)).toBeLessThan(box.width / 2 + 8);
            expect(box.y).toBeLessThan(halfH);
        });

        test('top right', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on top right corner' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            expect(box.x + box.width).toBeGreaterThan(halfW);
            expect(box.y).toBeLessThan(halfH);
        });

        test('bottom left', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on bottom left corner' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            expect(box.x).toBeLessThan(halfW);
            expect(box.y + box.height).toBeGreaterThan(halfH);
        });

        test('bottom center', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on bottom center' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            const centerX = box.x + box.width / 2;
            expect(Math.abs(centerX - halfW)).toBeLessThan(box.width / 2 + 8);
            expect(box.y + box.height).toBeGreaterThan(halfH);
        });

        test('bottom right', async ({ page, goto }) => {
            await goto('core/message-toast/position');
            await page.getByRole('button', { name: 'Open on bottom right corner' }).click();
            const toast = page.locator('fd-message-toast');
            await expect(toast).toBeVisible();
            const box = await boundingBoxOf(toast);
            expect(box.x + box.width).toBeGreaterThan(halfW);
            expect(box.y + box.height).toBeGreaterThan(halfH);
        });
    });
});
