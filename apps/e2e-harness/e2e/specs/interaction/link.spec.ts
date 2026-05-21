import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/link', () => {
    test('aria-disabled is set on disabled link', async ({ page, goto }) => {
        await goto('core/link/link');
        const disabled = page.locator('a[fd-link]', { hasText: 'Disabled Link' });
        await expect(disabled).toBeVisible();
        await expect(disabled).toHaveAttribute('aria-disabled', 'true');
    });

    test('prefix icon renders inside link content', async ({ page, goto }) => {
        await goto('core/link/link');
        const link = page.getByRole('link', { name: /^Icon Left Link$/ });
        await expect(link).toBeVisible();
        await expect(link.locator('fd-icon').first()).toBeVisible();
    });

    test('postfix icon renders inside link content', async ({ page, goto }) => {
        await goto('core/link/link');
        const link = page.getByRole('link', { name: /^Icon Right Link$/ });
        await expect(link).toBeVisible();
        await expect(link.locator('fd-icon').first()).toBeVisible();
    });
});
