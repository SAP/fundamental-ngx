import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/shellbar context-area-overflow visual', () => {
    test('wide — all context items visible, overflow button hidden', async ({ page, goto }) => {
        await page.setViewportSize({ width: 1280, height: 300 });
        await goto('core/shellbar/context-area-overflow');
        await expect(page.locator('fd-shellbar')).toBeVisible();
        await expect(page).toHaveScreenshot('core/shellbar-context-area-overflow-wide.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
            animations: 'disabled',
            mask: [page.locator('fd-avatar')]
        });
    });

    test('narrow — some context items hidden, overflow button visible', async ({ page, goto }) => {
        await page.setViewportSize({ width: 500, height: 300 });
        await goto('core/shellbar/context-area-overflow');
        await expect(page.locator('fd-shellbar')).toBeVisible();
        await expect(page.locator('fd-shellbar-context-area fd-popover')).toHaveCSS('visibility', 'visible');
        await expect(page).toHaveScreenshot('core/shellbar-context-area-overflow-narrow.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.01,
            animations: 'disabled',
            mask: [page.locator('fd-avatar')]
        });
    });
});
