import { test, expect } from '../../fixtures/base.fixture';

test.describe('Pagination Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/pagination/pagination');
    });

    test('displays pagination with page numbers', async ({ page }) => {
        const pagination = page.locator('fd-pagination');
        await expect(pagination).toBeVisible();
        const pageButtons = pagination.locator('button.fd-pagination__link');
        expect(await pageButtons.count()).toBeGreaterThan(0);
    });

    test('navigates to page on button click', async ({ page }) => {
        const pagination = page.locator('fd-pagination');
        await expect(pagination).toBeVisible();
        const pageInput = pagination.locator('input.fd-pagination__input');
        const valueBefore = await pageInput.inputValue();
        const pageButtons = pagination.locator('button.fd-pagination__link:not(.is-active)');
        const firstInactive = pageButtons.first();
        await firstInactive.click();
        await expect(pageInput).not.toHaveValue(valueBefore);
    });

    test('active page has aria-current attribute', async ({ page }) => {
        const pagination = page.locator('fd-pagination');
        await expect(pagination).toBeVisible();
        const active = pagination.locator('button.fd-pagination__link.is-active');
        await expect(active).toHaveAttribute('aria-current', 'true');
    });
});
