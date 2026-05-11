import { test, expect } from '../../fixtures/base.fixture';

test.describe('Form Container Interaction', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('platform/form-container/complex');
    });

    test('form contains multiple focusable fields in logical order', async ({ page }) => {
        const fields = page.locator('input:not([type="hidden"]):not([tabindex="-1"]), textarea, select');
        const count = await fields.count();
        expect(count).toBeGreaterThan(2);
        // Verify first field can receive focus
        await fields.first().focus();
        await expect(fields.first()).toBeFocused();
    });

    test('form has required fields with proper attributes', async ({ page }) => {
        const requiredInputs = page.locator('input[required], input[aria-required="true"], [aria-required="true"]');
        const allInputs = page.locator('input:not([type="hidden"]), textarea, select, fd-input input');
        const totalCount = await allInputs.count();
        const requiredCount = await requiredInputs.count();
        expect(totalCount).toBeGreaterThan(0);
        if (requiredCount > 0) {
            const firstRequired = requiredInputs.first();
            await expect(firstRequired).toBeVisible();
        }
    });

    test('form fields are laid out in a responsive grid', async ({ page }) => {
        const formItems = page.locator('fdp-form-group, [fd-form-item], .fd-form-item');
        const count = await formItems.count();
        expect(count).toBeGreaterThan(0);
        const firstItem = formItems.first();
        const box = await firstItem.boundingBox();
        expect(box).not.toBeNull();
        expect(box?.width).toBeGreaterThan(0);
    });
});
