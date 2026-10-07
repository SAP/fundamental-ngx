import { expect, test } from '../../fixtures/base.fixture';

for (const example of ['menu', 'with-submenu']) {
    for (const backwards of [false, true]) {
        test(`core/menu/${example}: ${backwards ? 'Shift+Tab' : 'Tab'} leaves the menu`, async ({ page, goto }) => {
            await goto(`core/menu/${example}`);
            const trigger = page
                .getByRole('button', {
                    name: example === 'menu' ? 'Menu' : 'Menu with submenu',
                    exact: true
                })
                .first();
            await expect(trigger).toBeVisible();
            await trigger.evaluate((element) => {
                const before = document.createElement('input');
                before.setAttribute('aria-label', 'Before menu');
                const after = document.createElement('input');
                after.setAttribute('aria-label', 'After menu');
                element.before(before);
                element.after(after);
            });

            await trigger.click();
            const menu = page.locator('.cdk-overlay-container [role="menu"]').first();
            await expect(menu).toBeVisible();
            const items = menu.getByRole('menuitem');
            await expect(items.first()).toBeFocused();
            if (example === 'with-submenu') {
                await page.keyboard.press('ArrowRight');
                await expect(page.locator('.cdk-overlay-container [role="menuitem"]:focus')).toBeVisible();
            } else {
                await page.keyboard.press('ArrowDown');
                await expect(items.nth(1)).toBeFocused();
            }

            await page.keyboard.press(backwards ? 'Shift+Tab' : 'Tab');
            await expect(menu).toBeHidden();
            await expect(page.getByRole('textbox', { name: backwards ? 'Before menu' : 'After menu' })).toBeFocused();
        });
    }
}

test('core/menu/mobile: Tab stays within the mobile dialog', async ({ page, goto }) => {
    await goto('core/menu/mobile');
    await page.getByRole('button', { name: 'Open Mobile Menu', exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.locator('[fd-menu-interactive]').first().focus();
    await page.keyboard.press('Tab');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator(':focus')).toHaveCount(1);
});
