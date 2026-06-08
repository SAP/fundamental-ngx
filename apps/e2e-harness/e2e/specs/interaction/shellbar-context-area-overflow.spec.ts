import { expect, test } from '../../fixtures/base.fixture';

const NARROW_VIEWPORT = { width: 500, height: 800 };
const WIDE_VIEWPORT = { width: 1280, height: 800 };

test.describe('core/shellbar context-area-overflow', () => {
    test('overflow popover is hidden when shellbar is wide enough to show all items', async ({ page, goto }) => {
        await page.setViewportSize(WIDE_VIEWPORT);
        await goto('core/shellbar/context-area-overflow');
        const shellbar = page.locator('fd-shellbar');
        await expect(shellbar).toBeVisible();
        const overflowPopover = page.locator('fd-shellbar-context-area fd-popover');
        await expect(overflowPopover).toHaveCSS('visibility', 'hidden');
    });

    test('overflow popover is visible when shellbar is too narrow to show all items', async ({ page, goto }) => {
        await page.setViewportSize(NARROW_VIEWPORT);
        await goto('core/shellbar/context-area-overflow');
        const shellbar = page.locator('fd-shellbar');
        await expect(shellbar).toBeVisible();
        const overflowPopover = page.locator('fd-shellbar-context-area fd-popover');
        await expect(overflowPopover).toHaveCSS('visibility', 'visible');
    });

    test('clicking overflow button opens popover body with cloned hidden items', async ({ page, goto }) => {
        await page.setViewportSize(NARROW_VIEWPORT);
        await goto('core/shellbar/context-area-overflow');
        const shellbar = page.locator('fd-shellbar');
        await expect(shellbar).toBeVisible();
        const overflowPopover = page.locator('fd-shellbar-context-area fd-popover');
        await expect(overflowPopover).toHaveCSS('visibility', 'visible');
        await overflowPopover.locator('button[aria-label="Show hidden context items"]').click();
        const popoverBody = page.locator('fd-popover-body');
        await expect(popoverBody).toBeVisible();
        const container = popoverBody.locator('.sap-padding--tiny');
        await expect(container).not.toBeEmpty();
    });
});
