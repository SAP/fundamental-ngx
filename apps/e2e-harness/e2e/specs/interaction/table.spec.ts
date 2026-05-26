import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/table', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/table/column-sorting');
    });

    test('displays table with rows and columns', async ({ page }) => {
        const table = page.locator('table[fd-table], fd-table table').first();
        await expect(table).toBeVisible();
        const rows = table.locator('tbody tr, tr[fd-table-row]');
        expect(await rows.count()).toBeGreaterThan(0);
        const headers = table.locator('th, [fd-table-header-cell]');
        expect(await headers.count()).toBeGreaterThan(0);
    });

    test('header cells are focusable and receive focus on click', async ({ page }) => {
        const table = page.locator('table[fd-table], fd-table table').first();
        const headerCell = table.locator('th[tabindex="0"]').first();
        await headerCell.click();
        await expect(headerCell).toBeFocused();
    });

    test('table cells are focusable', async ({ page }) => {
        const table = page.locator('table[fd-table], fd-table table').first();
        await expect(table).toBeVisible();
        const firstCell = table.locator('tbody td[tabindex="0"]').first();
        await firstCell.click();
        await expect(firstCell).toBeFocused();
    });

    test('table displays correct number of columns', async ({ page }) => {
        const table = page.locator('table[fd-table], fd-table table').first();
        const headerCells = table.locator('thead th, [fd-table-header-cell]');
        const headerCount = await headerCells.count();
        const firstRowCells = table.locator('tbody tr:first-child td, tr[fd-table-row]:first-child td');
        const cellCount = await firstRowCells.count();
        expect(headerCount).toBe(cellCount);
    });

    test('table has accessible header structure', async ({ page }) => {
        const table = page.locator('table[fd-table], fd-table table').first();
        const thead = table.locator('thead');
        await expect(thead).toBeVisible();
        const headers = thead.locator('th');
        expect(await headers.count()).toBeGreaterThan(0);
    });
});
