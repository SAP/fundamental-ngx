import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/tabs', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/tabs/default-tab');
    });

    test('displays tablist with multiple tabs', async ({ page }) => {
        const tablist = page.locator('[role="tablist"]').first();
        await expect(tablist).toBeVisible();
        const tabs = tablist.locator('[role="tab"]');
        expect(await tabs.count()).toBeGreaterThan(1);
    });

    test('activates tab on click and shows corresponding panel', async ({ page }) => {
        const tablist = page.locator('[role="tablist"]').first();
        const tabs = tablist.locator('[role="tab"]');
        const secondTab = tabs.nth(1);
        await secondTab.click();
        await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('navigates between tabs with arrow keys', async ({ page }) => {
        const tablist = page.locator('[role="tablist"]').first();
        const tabs = tablist.locator('[role="tab"]');
        const firstTab = tabs.first();
        await firstTab.click();
        await expect(firstTab).toHaveAttribute('aria-selected', 'true');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');
        const secondTab = tabs.nth(1);
        await expect(secondTab).toHaveAttribute('aria-selected', 'true');
    });

    test('only one tab is selected at a time', async ({ page }) => {
        const tablist = page.locator('[role="tablist"]').first();
        const tabs = tablist.locator('[role="tab"]');
        const secondTab = tabs.nth(1);
        await secondTab.click();
        const selectedTabs = tablist.locator('[role="tab"][aria-selected="true"]');
        await expect(selectedTabs).toHaveCount(1);
    });
});
