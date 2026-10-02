import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/avatar-group', () => {
    for (const groupIndex of [0, 1]) {
        test(`keeps focus on the clicked avatar in group ${groupIndex + 1}`, async ({ page, goto }) => {
            await goto('core/avatar-group/max-visible');
            const group = page.locator('fd-avatar-group').nth(groupIndex);
            const avatars = group.locator('fd-avatar');
            const second = avatars.nth(1);
            const third = avatars.nth(2);
            const popover = page.locator('.cdk-overlay-container .fd-popover__body');

            await second.click();
            await expect(popover).toContainText('Sarah Parker');
            await expect(second).toBeFocused();
            await third.click();
            await expect(popover).toHaveCount(1);
            await expect(popover).toContainText('Jason Goldwell');
            await expect(third).toBeFocused();

            await third.click();
            await expect(popover).toHaveCount(0);
            await expect(third).toBeFocused();

            await second.click();
            await expect(popover).toContainText('Sarah Parker');
            await expect(second).toBeFocused();
            await second.click();
            await expect(popover).toHaveCount(0);
            await expect(second).toBeFocused();
        });
    }
});
