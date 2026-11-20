import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

type MenuProbe = {
    events: boolean[];
    cleanup: () => void;
    state: () => { mobile: boolean; open: boolean };
};
type ProbeWindow = Window & {
    ng: {
        getComponent: (element: Element) => {
            mobile: () => boolean;
            isOpen: () => boolean;
            isOpenChange: { subscribe: (fn: (value: boolean) => void) => { unsubscribe: () => void } };
        };
    };
    userMenuProbe?: MenuProbe;
};

async function subscribe(menu: Locator): Promise<void> {
    await menu.evaluate((element) => {
        const browser = window as unknown as ProbeWindow;
        browser.userMenuProbe?.cleanup();
        const component = browser.ng.getComponent(element);
        const recordedEvents: boolean[] = [];
        const subscription = component.isOpenChange.subscribe((value) => recordedEvents.push(value));
        browser.userMenuProbe = {
            events: recordedEvents,
            cleanup: () => subscription.unsubscribe(),
            state: () => ({ mobile: component.mobile(), open: component.isOpen() })
        };
    });
}

async function events(page: Page): Promise<boolean[]> {
    return page.evaluate(() => (window as unknown as ProbeWindow).userMenuProbe?.events ?? []);
}

async function activate(trigger: Locator, method: string): Promise<void> {
    if (method === 'pointer') {
        await trigger.click();
    } else {
        await trigger.focus();
        await trigger.press(method);
    }
}

const surfaces = [
    {
        suite: 'core/user-menu',
        route: '__e2e/user-menu/default',
        selector: 'fd-user-menu-default-example',
        mobile: false
    },
    { suite: 'core/user-menu', route: '__e2e/user-menu/mobile', selector: 'fd-user-menu-mobile-example', mobile: true },
    { suite: 'core/shellbar', route: '__e2e/shellbar/basic', selector: 'fd-shellbar-basic-example', mobile: false }
];

for (const surface of surfaces) {
    test.describe(surface.suite + ' ' + (surface.mobile ? 'mobile' : surface.selector), () => {
        const consoleErrors: string[] = [];
        test.beforeEach(async ({ page, goto }) => {
            consoleErrors.length = 0;
            page.on('pageerror', (error) => consoleErrors.push(error.message));
            page.on('console', (message) => {
                if (message.type() === 'error') {
                    consoleErrors.push(message.text());
                }
            });
            await goto(surface.route);
            await expect(page.locator(surface.selector)).toBeVisible();
            await expect(page.locator(surface.selector + ' fd-user-menu-control')).toBeVisible();
        });
        test.afterEach(async ({ page }, testInfo) => {
            await testInfo.attach('console-errors', {
                body: JSON.stringify(consoleErrors),
                contentType: 'application/json'
            });
            await page.evaluate(() => {
                const browser = window as unknown as ProbeWindow;
                browser.userMenuProbe?.cleanup();
                delete browser.userMenuProbe;
            });
            expect(
                consoleErrors.filter((message) =>
                    /NG\d+|ExpressionChanged|detectChanges|Maximum call stack/.test(message)
                )
            ).toEqual([]);
        });

        test('exposes one named owning button and one trigger tab stop', async ({ page }, testInfo) => {
            const trigger = page.locator(surface.selector + ' fd-user-menu-control');
            await expect(trigger).toHaveAttribute('tabindex', '0');
            await expect(trigger).toHaveAttribute('aria-expanded', 'false');
            await expect(trigger.locator('button, [role="button"], [tabindex="0"]')).toHaveCount(0);
            const axe = await new AxeBuilder({ page })
                .include(surface.selector + ' fd-user-menu-control')
                .withRules(['aria-allowed-attr'])
                .analyze();
            await testInfo.attach('trigger-axe', { body: JSON.stringify(axe), contentType: 'application/json' });
            await expect.soft(trigger).toHaveRole('button');
            await expect.soft(trigger).toHaveAccessibleName('User Menu');
            await expect
                .soft(page.locator(surface.selector).getByRole('button', { name: 'User Menu', exact: true }))
                .toHaveCount(1);
            expect.soft(axe.violations).toEqual([]);
        });

        if (!surface.mobile) {
            test('opens once for pointer Enter and Space and restores state and focus on Escape', async ({ page }) => {
                const menu = page.locator(surface.selector + ' fd-user-menu');
                const trigger = menu.locator('fd-user-menu-control');
                await subscribe(menu);
                for (const method of ['pointer', 'Enter', 'Space']) {
                    await activate(trigger, method);
                    await expect(page.locator('fd-user-menu-body:visible')).toHaveCount(1);
                    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
                    await page.keyboard.press('Escape');
                    await expect(page.locator('fd-user-menu-body:visible')).toHaveCount(0);
                    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
                    await expect(trigger).toBeFocused();
                }
                expect(await events(page)).toEqual([true, false, true, false, true, false]);
            });
        } else {
            for (const method of ['pointer', 'Enter', 'Space']) {
                test(
                    'synchronizes mobile state through ' + method + ' opening Close Escape and Space reopening',
                    async ({ page }) => {
                        const menu = page.locator(surface.selector + ' fd-user-menu');
                        const trigger = menu.locator('fd-user-menu-control');
                        await subscribe(menu);
                        expect(
                            await page.evaluate(() => (window as unknown as ProbeWindow).userMenuProbe?.state().mobile)
                        ).toBe(true);
                        await activate(trigger, method);
                        await expect(page.getByRole('dialog')).toHaveCount(1);
                        await expect(page.getByRole('dialog')).toBeVisible();
                        await expect.soft(trigger).toHaveAttribute('aria-expanded', 'true');
                        expect.soft(await events(page)).toEqual([true]);
                        expect
                            .soft(
                                await page.evaluate(
                                    () => (window as unknown as ProbeWindow).userMenuProbe?.state().open
                                )
                            )
                            .toBe(true);
                        await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click();
                        await expect(page.getByRole('dialog')).toHaveCount(0);
                        await expect(trigger).toBeFocused();
                        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
                        expect.soft(await events(page)).toEqual([true, false]);
                        await trigger.press('Space');
                        await expect(page.getByRole('dialog')).toBeVisible();
                        await expect.soft(trigger).toHaveAttribute('aria-expanded', 'true');
                        await page.keyboard.press('Escape');
                        await expect(page.getByRole('dialog')).toHaveCount(0);
                        await expect(trigger).toBeFocused();
                        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
                        expect.soft(await events(page)).toEqual([true, false, true, false]);
                        await trigger.press('Space');
                        await expect(page.getByRole('dialog')).toBeVisible();
                        await expect.soft(trigger).toHaveAttribute('aria-expanded', 'true');
                        expect.soft(await events(page)).toEqual([true, false, true, false, true]);
                    }
                );
            }
            test('preserves account actions Tab traversal submenu Previous and repeat dismissal', async ({ page }) => {
                const trigger = page.locator(surface.selector + ' fd-user-menu-control');
                await trigger.click();
                const dialog = page.getByRole('dialog');
                const accounts = dialog.locator('fd-panel li');
                await expect(accounts).toHaveCount(3);
                await accounts.nth(1).click();
                await expect(dialog).toBeVisible();
                await expect(accounts.nth(1)).toBeFocused();
                await page.keyboard.press('Tab');
                expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
                await page.keyboard.press('Shift+Tab');
                expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
                await dialog
                    .getByRole('menuitem')
                    .filter({ has: page.getByText('Menu Item', { exact: true }) })
                    .click();
                await expect(dialog.getByText('Sub-menu Item 0', { exact: true })).toBeVisible();
                await dialog.getByRole('button', { name: 'Previous', exact: true }).click();
                await expect(dialog.getByText('Accounts (3)', { exact: true })).toBeVisible();
                await dialog
                    .getByRole('menuitem')
                    .filter({ has: page.getByText('Settings', { exact: true }) })
                    .click();
                await expect(dialog).toHaveCount(0);
                await expect(page.getByText('Settings action performed', { exact: true })).toBeVisible();
                await expect(trigger).toBeFocused();
                await trigger.press('Space');
                await expect(page.getByRole('dialog')).toBeVisible();
                await page.keyboard.press('Escape');
                await expect(trigger).toBeFocused();
            });
        }

        if (surface.mobile || surface.suite === 'core/shellbar') {
            test('names each account image while retaining account row text and actions', async ({
                page
            }, testInfo) => {
                await page.locator(surface.selector + ' fd-user-menu-control').click();
                const body = page.locator('fd-user-menu-body:visible');
                await expect(body).toHaveCount(1);
                const avatars = body.locator('fd-panel li fd-avatar');
                await expect(avatars).toHaveCount(3);
                const axe = await new AxeBuilder({ page })
                    .include('fd-user-menu-body fd-panel li fd-avatar')
                    .withRules(['role-img-alt'])
                    .analyze();
                await testInfo.attach('account-axe', { body: JSON.stringify(axe), contentType: 'application/json' });
                for (const [index, name] of ['Lisa Miller', 'John Doe', 'Jane Doe'].entries()) {
                    await expect.soft(avatars.nth(index)).toHaveRole('img');
                    await expect.soft(avatars.nth(index)).toHaveAccessibleName(name);
                    await expect(body.locator('fd-panel li').nth(index)).toContainText(name);
                }
                expect.soft(axe.violations).toEqual([]);
            });
        }
    });
}
