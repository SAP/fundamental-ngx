import { expect, test } from '../../fixtures/base.fixture';

test.describe('platform/icon-tab-bar', () => {
    test('[active] on second tab is honored when stackContent=true', async ({ page, goto }) => {
        await goto('platform/icon-tab-bar/stack-content-active-repro');

        const tabs = page.locator('.fd-icon-tab-bar__tab');

        // Second tab (index 1) must be selected on load.
        // Use assertion-retry rather than a fixed sleep to avoid flake on loaded CI.
        await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true', { timeout: 3000 });
        // First tab must NOT be selected.
        await expect(tabs.nth(0)).not.toHaveAttribute('aria-selected', 'true');
    });
});
