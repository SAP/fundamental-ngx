import type { Page, TestInfo } from '@playwright/test';
import { expect, test } from '@playwright/test';

async function receipt(page: Page, info: TestInfo, name: string, data: unknown): Promise<void> {
    await info.attach(name + '.json', { body: JSON.stringify(data, null, 2), contentType: 'application/json' });
    await info.attach(name + '.png', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
}

test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/__e2e/shellbar/functional');
    await expect(page.getByTestId('shellbar-functional-fixture')).toBeVisible();
    await expect(page.getByTestId('mobile-region').locator('button .fd-button__badge')).toHaveText('1');
});

test('default/literal projection controls retain exactly one item on each requested side', async ({ page }) => {
    for (const [id, position] of [
        ['default-position', 'left'],
        ['literal-left', 'left'],
        ['literal-right', 'right']
    ]) {
        const item = page.locator('#' + id);
        await expect(item).toHaveCount(1);
        await expect(item).toBeVisible();
        expect(await item.evaluate((element) => element.parentElement?.getAttribute('data-position'))).toBe(position);
    }
});

test('measured narrow/wide/narrow suppresses avoidable separator overflow', async ({ page }, info) => {
    const history = [];
    for (const width of ['narrow', 'wide', 'narrow']) {
        await page.getByTestId('residual-' + width).click();
        await page.waitForTimeout(200);
        const geometry = await page.getByTestId('geometry-container').evaluate((container) => {
            const bar = container.querySelector('.fd-shellbar') as HTMLElement;
            const mandatory = container.querySelector('#geometry-mandatory') as HTMLElement;
            const separator = container.querySelector('#geometry-separator') as HTMLElement;
            const actions = container.querySelector('fd-shellbar-actions') as HTMLElement;
            const style = getComputedStyle(bar);
            const end = bar.getBoundingClientRect().right - parseFloat(style.paddingInlineEnd);
            const itemWidth = mandatory.getBoundingClientRect().width;
            const separatorWidth = separator.getBoundingClientRect().width;
            const contextGroup = mandatory.parentElement as HTMLElement;
            const contextWidth = contextGroup.getBoundingClientRect().width;
            const rightGroup = container.querySelector('[data-position="right"]') as HTMLElement;
            const contextFreeSpace = parseFloat(getComputedStyle(rightGroup).marginInlineStart) || 0;
            const actionsEnd = actions.getBoundingClientRect().right;
            return {
                viewport: innerWidth,
                shellbarWidth: bar.getBoundingClientRect().width,
                itemWidth,
                separatorWidth,
                separatorDisplay: getComputedStyle(separator).display,
                actionsEnd,
                end,
                contextWidth,
                contextGap: getComputedStyle(contextGroup).columnGap,
                contextFreeSpace,
                residual: end - actionsEnd + contextWidth + contextFreeSpace,
                padding: style.paddingInline,
                gap: style.columnGap,
                offsetParent: separator.offsetParent?.tagName
            };
        });
        history.push({ width, ...geometry, aggregate: await page.getByTestId('geometry-aggregate').textContent() });
        await receipt(page, info, 'separator-' + history.length + '-' + width, geometry);
        expect.soft(geometry.itemWidth).toBe(80);
        expect.soft(geometry.residual).toBeGreaterThanOrEqual(80);
        if (width === 'narrow') {
            expect.soft(geometry.residual).toBeCloseTo(90, 1);
            expect.soft(geometry.separatorDisplay).toBe('none');
            expect.soft(geometry.actionsEnd).toBeLessThanOrEqual(geometry.end + 0.5);
        } else {
            expect.soft(geometry.separatorWidth).toBe(16);
        }
    }
    await receipt(page, info, 'separator-geometry', history);
});

for (const key of ['Home', 'End', 'ArrowLeft', 'ArrowRight']) {
    test('trusted SELECT ' + key + ' matches the outside control', async ({ page, browser }, info) => {
        await page.evaluate(() => {
            (window as any).__keys = [];
            document.addEventListener('keydown', (event) =>
                (window as any).__keys.push({
                    key: event.key,
                    target: (event.target as HTMLElement).id,
                    cancelled: event.defaultPrevented,
                    trusted: event.isTrusted,
                    focus: (document.activeElement as HTMLElement)?.id
                })
            );
        });
        const records = [];
        for (const id of ['outside-select', 'inside-select']) {
            const select = page.locator('#' + id);
            await expect(select).toBeVisible();
            await select.focus();
            await expect(select).toBeFocused();
            await page.keyboard.down(key);
            await page.keyboard.up(key);
            records.push(
                await page.evaluate((selectId) => {
                    const element = document.getElementById(selectId) as HTMLSelectElement;
                    return {
                        id: selectId,
                        focus: (document.activeElement as HTMLElement)?.id,
                        selectedIndex: element.selectedIndex,
                        event: (window as any).__keys.at(-1)
                    };
                }, id)
            );
        }
        await receipt(page, info, 'select-' + key, { browser: browser.version(), records });
        expect(records.every((record) => record.event.trusted)).toBe(true);
        expect(records[0].event.cancelled).toBe(false);
        expect(records[0].focus).toBe('outside-select');
        expect.soft(records[1].event.cancelled).toBe(records[0].event.cancelled);
        expect.soft(records[1].focus).toBe('inside-select');
    });
}

test('ordinary LTR/RTL navigation and editable controls remain functional', async ({ page }) => {
    await page.locator('#nav-first').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#inside-select')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#inside-input')).toBeFocused();
    for (const rtl of [false, true]) {
        if (rtl) {
            await page.getByTestId('toggle-rtl').click();
        }
        for (const [start, key, end] of [
            ['nav-middle', 'Home', 'nav-first'],
            ['nav-middle', 'End', 'nav-last'],
            ['nav-middle', rtl ? 'ArrowLeft' : 'ArrowRight', 'nav-last'],
            ['nav-last', rtl ? 'ArrowRight' : 'ArrowLeft', 'nav-middle']
        ]) {
            await page.locator('#' + start).focus();
            await page.keyboard.press(key);
            await expect(page.locator('#' + end)).toBeFocused();
        }
        for (const id of ['inside-input', 'inside-textarea', 'inside-editor']) {
            for (const key of ['Home', 'End', 'ArrowLeft', 'ArrowRight']) {
                await page.locator('#' + id).focus();
                await page.keyboard.press(key);
                await expect(page.locator('#' + id)).toBeFocused();
            }
        }
    }
});

test('projected membership renders 1 → 6 → 1 → absent at stable 314px', async ({ page }, info) => {
    const mobile = page.getByTestId('mobile-region');
    const trigger = mobile.locator('button');
    const mounted = await mobile.elementHandle();
    const history = [];
    for (const [step, ids, total] of [
        ['initial', ['One'], '1'],
        ['add-action', ['One', 'Five'], '6'],
        ['remove-five', ['One'], '1'],
        ['remove-all', [], null]
    ] as const) {
        if (step !== 'initial') {
            await page.getByTestId(step).click();
        }
        await expect(page.locator('fd-shellbar-action[data-action]')).toHaveCount(ids.length);
        const labels = await page
            .locator('fd-shellbar-action[data-action]')
            .evaluateAll((elements) => elements.map((element) => element.getAttribute('data-action')));
        expect(labels).toEqual(ids);
        const badgeElement = trigger.locator('.fd-button__badge');
        const badge = (await badgeElement.count()) ? ((await badgeElement.textContent())?.trim() ?? null) : null;
        const width = await mobile.evaluate((element) => element.getBoundingClientRect().width);
        history.push({ step, labels, badge, width });
        expect.soft(badge).toBe(total);
        expect(width).toBe(314);
        expect(await mounted?.evaluate((element) => element.isConnected)).toBe(true);
        await trigger.click();
        for (const label of ids) {
            await expect(page.locator('[fd-menu-interactive]:visible').filter({ hasText: label })).toHaveCount(1);
        }
        await page.keyboard.press('Escape');
    }
    await receipt(page, info, 'notification-membership', history);
});

test('existing count updates and desktop pointer callback are preserved', async ({ page }) => {
    const badge = page.getByTestId('mobile-region').locator('button .fd-button__badge');
    await page.getByTestId('change-count').click();
    await expect(badge).toHaveText('2');
    await page.getByTestId('show-desktop').click();
    await page.locator('fd-shellbar-action[data-action="One"] button').click();
    await expect.poll(async () => JSON.parse(await page.getByTestId('callback-log').innerText()).length).toBe(1);
    const entries = JSON.parse(await page.getByTestId('callback-log').innerText());
    expect(entries).toHaveLength(1);
    expect(entries[0].mouse).toBe(true);
});

for (const target of ['action', 'assistive']) {
    for (const activation of ['pointer', 'Enter', 'Space']) {
        test(target + ' full ' + activation + ' uses one MouseEvent callback', async ({ page, browser }, info) => {
            const trigger = page.getByTestId('mobile-region').locator('button');
            await page.evaluate(() => {
                const win = window as any;
                win.__activation = { closes: 0, keys: [], pointer: null };
                document.addEventListener(
                    'click',
                    (event) => {
                        win.__activation.pointer = event;
                    },
                    true
                );
                document.addEventListener('keydown', (event) =>
                    win.__activation.keys.push({
                        phase: 'down',
                        key: event.key,
                        cancelled: event.defaultPrevented,
                        trusted: event.isTrusted
                    })
                );
                document.addEventListener('keyup', (event) =>
                    win.__activation.keys.push({
                        phase: 'up',
                        key: event.key,
                        cancelled: event.defaultPrevented,
                        trusted: event.isTrusted
                    })
                );
                const menu = win.ng.getComponent(document.querySelector('[data-testid="mobile-region"] fd-menu'));
                menu.isOpenChange.subscribe((open: boolean) => {
                    if (!open) {
                        win.__activation.closes++;
                    }
                });
            });
            await trigger.click();
            const row = page
                .locator('[fd-menu-interactive]:visible')
                .filter({ hasText: target === 'action' ? 'One' : 'Assistive' });
            await expect(row).toHaveCount(1);
            if (activation === 'pointer') {
                await row.click();
            } else {
                await page.keyboard.press('Home');
                await page.keyboard.press(target === 'action' ? 'ArrowDown' : 'End');
                await expect(row).toBeFocused();
                await page.keyboard.down(activation);
                await page.keyboard.up(activation);
            }
            await expect.soft(page.locator('[fd-menu-interactive]:visible')).toHaveCount(0);
            await expect.soft.poll(() => page.evaluate(() => (window as any).__activation.closes)).toBe(1);
            const result = await page.evaluate(() => {
                const win = window as any;
                const fixture = win.ng.getComponent(document.querySelector('e2e-shellbar-mobile-projection'));
                const state = win.__activation;
                return {
                    entries: JSON.parse(fixture.eventLog()),
                    closes: state.closes,
                    keys: state.keys,
                    pointerIdentity: fixture.events[0] === state.pointer,
                    scroll: scrollY,
                    focusedTrigger:
                        document.activeElement === document.querySelector('[data-testid="mobile-region"] button')
                };
            });
            await receipt(page, info, 'activation-' + target + '-' + activation, {
                browser: browser.version(),
                ...result
            });
            expect.soft(result.entries).toHaveLength(1);
            expect.soft(result.entries.every((entry: { mouse: boolean }) => entry.mouse)).toBe(true);
            expect.soft(result.closes).toBe(1);
            expect.soft(result.focusedTrigger).toBe(true);
            if (activation === 'pointer') {
                expect(result.pointerIdentity).toBe(true);
            } else {
                const keys = result.keys.filter(
                    (entry: { key: string }) => entry.key === (activation === 'Space' ? ' ' : activation)
                );
                expect(keys.map((entry: { phase: string }) => entry.phase)).toEqual(['down', 'up']);
                expect(keys.every((entry: { trusted: boolean }) => entry.trusted)).toBe(true);
                if (activation === 'Space') {
                    expect.soft(keys[0].cancelled).toBe(true);
                    expect.soft(result.scroll).toBe(0);
                }
            }
        });
    }
}

test('search activation and menu navigation/escape controls remain functional', async ({ page }) => {
    const trigger = page.getByTestId('mobile-region').locator('button');
    await trigger.click();
    const rows = page.locator('[fd-menu-interactive]:visible');
    await page.keyboard.press('Home');
    await expect(rows.first()).toBeFocused();
    await page.keyboard.press('End');
    await expect(rows.last()).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(rows.nth(1)).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(rows.last()).toBeFocused();
    await page.keyboard.press('Home');
    await rows.first().click();
    await expect(page.getByTestId('search-count')).toHaveText('1');
    await expect(rows).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await trigger.click();
    await page.keyboard.press('Escape');
    await expect(rows).toHaveCount(0);
    await expect(trigger).toBeFocused();
});
