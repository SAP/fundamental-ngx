import { expect, test } from '../../fixtures/base.fixture';

test.describe('ui5/numeric-input', () => {
    test('renders the migration route', async ({ page, goto }) => {
        await goto('ui5/numeric-input/basic');
        await expect(page.locator('ui5-numeric-input').first()).toBeVisible();
    });
});
