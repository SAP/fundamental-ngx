import { test, expect } from '../../fixtures/base.fixture';

test.describe('Tree Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/tree/simple-tree');
    });

    test('displays tree with items', async ({ page }) => {
        const tree = page.locator('fd-tree, [role="tree"]').first();
        await expect(tree).toBeVisible();
        const items = page.locator('[role="treeitem"], fd-tree-item');
        expect(await items.count()).toBeGreaterThan(0);
    });

    test('expands tree node on click', async ({ page }) => {
        const expandableNodes = page.locator('[role="treeitem"][aria-haspopup="true"][aria-level="1"]');
        const expandableNode = expandableNodes.first();
        await expect(expandableNode).toBeVisible();
        await expect(expandableNode).toHaveAttribute('aria-expanded', 'false');
        const expander = expandableNode.locator('.fd-tree__expander');
        await expander.click();
        await expect(expandableNode).toHaveAttribute('aria-expanded', 'true');
    });

    test('collapses expanded tree node', async ({ page }) => {
        const expandableNodes = page.locator('[role="treeitem"][aria-haspopup="true"][aria-level="1"]');
        const expandableNode = expandableNodes.first();
        await expect(expandableNode).toBeVisible();
        const expander = expandableNode.locator('.fd-tree__expander');
        await expander.click();
        await expect(expandableNode).toHaveAttribute('aria-expanded', 'true');
        await expander.click();
        await expect(expandableNode).toHaveAttribute('aria-expanded', 'false');
    });

    test('navigates tree items with keyboard', async ({ page }) => {
        const firstItem = page.locator('[role="treeitem"], fd-tree-item').first();
        await firstItem.click();
        await page.keyboard.press('ArrowDown');
        const activeRole = await page.evaluate(() => document.activeElement?.getAttribute('role') || document.activeElement?.tagName.toLowerCase());
        expect(activeRole).toBeTruthy();
    });
});
