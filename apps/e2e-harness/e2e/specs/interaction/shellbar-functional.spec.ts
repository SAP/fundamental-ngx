import AxeBuilder from '@axe-core/playwright';
import type { Locator, Page, TestInfo } from '@playwright/test';
import { expect, test } from '@playwright/test';

interface PageEvents {
    readonly console: { type: string; text: string }[];
    readonly errors: string[];
}

const pageEvents = new WeakMap<Page, PageEvents>();

async function receipt(page: Page, info: TestInfo, name: string, data: unknown): Promise<void> {
    await info.attach(name + '.json', { body: JSON.stringify(data, null, 2), contentType: 'application/json' });
    await info.attach(name + '.png', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
}

function eventsFor(page: Page): PageEvents {
    const events = pageEvents.get(page);
    if (!events) {
        throw new Error('Page events were not registered before navigation.');
    }
    return events;
}

async function settle(page: Page): Promise<{ activeElement: string | null; hasFocus: boolean }> {
    await page.evaluate(
        () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    );
    return page.evaluate(() => ({
        activeElement: document.activeElement instanceof HTMLElement ? document.activeElement.outerHTML : null,
        hasFocus: document.hasFocus()
    }));
}

test.beforeEach(async ({ page }) => {
    const events: PageEvents = { console: [], errors: [] };
    pageEvents.set(page, events);
    page.on('console', (message) => events.console.push({ type: message.type(), text: message.text() }));
    page.on('pageerror', (error) => events.errors.push(error.message));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/__e2e/shellbar/functional');
    await expect(page.getByTestId('shellbar-functional-fixture')).toBeVisible();
    await expect(page.getByTestId('mobile-region').locator('button .fd-button__badge')).toHaveText('1');
    await settle(page);
});

function logicalActions(page: Page): Locator {
    return page.getByTestId('logical-actions-shellbar').locator('fd-shellbar-actions').first();
}

async function expectToolbarForCount(page: Page, count: number): Promise<void> {
    const actions = logicalActions(page);
    if (count > 1) {
        await expect(actions).toHaveAttribute('role', 'toolbar');
        await expect(actions).toHaveAttribute('aria-label', 'Shellbar');
    } else {
        await expect(actions).not.toHaveAttribute('role');
        await expect(actions).not.toHaveAttribute('aria-label');
    }
}

async function expectToolbarForSearch(actions: Locator, count: number): Promise<void> {
    if (count > 1) {
        await expect(actions).toHaveRole('toolbar');
        await expect(actions).toHaveAccessibleName('Shellbar');
    } else {
        await expect(actions).not.toHaveAttribute('role');
        await expect(actions).not.toHaveAttribute('aria-label');
    }
}

test('core/shellbar default named banner is owned by the shellbar host', async ({ page }, info) => {
    const scope = page.getByTestId('default-banner-shellbar');
    const shellbar = scope.locator('fd-shellbar');
    const axe = await new AxeBuilder({ page }).include('[data-testid=default-banner-shellbar]').analyze();
    await receipt(page, info, 'default-banner', {
        host: await shellbar.evaluate((element) => ({
            role: element.getAttribute('role'),
            name: element.getAttribute('aria-label')
        })),
        axe
    });
    await expect(scope.getByRole('banner', { name: 'Shellbar' })).toHaveCount(1);
    await expect(shellbar).toHaveAttribute('role', 'banner');
    await expect(shellbar).toHaveAttribute('aria-label', 'Shellbar');
    await expect(shellbar.locator('.fd-shellbar')).not.toHaveAttribute('aria-label');
});

test('core/shellbar consumer group override retains its outer banner', async ({ page }) => {
    const wrapper = page.getByTestId('group-banner-wrapper');
    await expect(wrapper).toHaveAttribute('role', 'banner');
    await expect(wrapper.locator('fd-shellbar')).toHaveAttribute('role', 'group');
    await expect(
        page.locator(
            '[data-testid=group-banner-wrapper][role=banner], [data-testid=group-banner-wrapper] [role=banner]'
        )
    ).toHaveCount(1);
});

test('core/shellbar isolated landmark route has valid named host and group axe contexts', async ({ page }, info) => {
    await page.goto('/__e2e/shellbar/landmarks');
    const host = page.getByTestId('landmark-default-shellbar');
    const actions = page.getByTestId('landmark-actions');
    await expect(host).toHaveRole('banner');
    await expect(host).toHaveAccessibleName('Shellbar');
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(actions).toHaveRole('toolbar');
    await expect(actions).toHaveAccessibleName('Shellbar');
    const hostAxe = await new AxeBuilder({ page }).include('[data-testid=landmark-default-shellbar]').analyze();
    const actionsAxe = await new AxeBuilder({ page }).include('[data-testid=landmark-actions]').analyze();
    const ancestors = await host.evaluate((element) => {
        const result: { tag: string; role: string | null }[] = [];
        for (let current = element.parentElement; current; current = current.parentElement) {
            result.push({ tag: current.tagName.toLowerCase(), role: current.getAttribute('role') });
        }
        return result;
    });
    const defaultFocus = await settle(page);
    const events = eventsFor(page);
    await receipt(page, info, 'isolated-landmarks', {
        ancestors,
        hostAxe,
        actionsAxe,
        defaultFocus,
        console: events.console,
        pageErrors: events.errors
    });
    expect(hostAxe.violations).toEqual([]);
    expect(hostAxe.incomplete).toEqual([]);
    expect(actionsAxe.violations).toEqual([]);
    expect(actionsAxe.incomplete).toEqual([]);
    expect(ancestors).not.toContainEqual({ tag: 'main', role: null });
    expect(events.errors).toEqual([]);
    await page.getByTestId('landmark-toggle').click();
    const wrapper = page.getByTestId('landmark-wrapper');
    const group = page.getByTestId('landmark-group-shellbar');
    const groupActions = group.locator('fd-shellbar-actions');
    await expect(wrapper).toHaveAttribute('role', 'banner');
    await expect(group).toHaveAttribute('role', 'group');
    await expect(group).toHaveRole('group');
    await expect(group).toHaveAccessibleName('Shellbar');
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(groupActions).toHaveRole('toolbar');
    await expect(groupActions).toHaveAccessibleName('Shellbar');
    const wrapperAxe = await new AxeBuilder({ page }).include('[data-testid=landmark-wrapper]').analyze();
    const wrapperActionsAxe = await new AxeBuilder({ page })
        .include('[data-testid=landmark-group-shellbar] fd-shellbar-actions')
        .analyze();
    const wrapperAncestors = await group.evaluate((element) => {
        const result: { tag: string; role: string | null }[] = [];
        for (let current = element.parentElement; current; current = current.parentElement) {
            result.push({ tag: current.tagName.toLowerCase(), role: current.getAttribute('role') });
        }
        return result;
    });
    const wrapperFocus = await settle(page);
    await receipt(page, info, 'isolated-landmark-wrapper', {
        wrapperAxe,
        wrapperActionsAxe,
        wrapperAncestors,
        wrapperFocus,
        console: events.console,
        pageErrors: events.errors
    });
    expect(wrapperAxe.violations).toEqual([]);
    expect(wrapperAxe.incomplete).toEqual([]);
    expect(wrapperActionsAxe.violations).toEqual([]);
    expect(wrapperActionsAxe.incomplete).toEqual([]);
    expect(wrapperAncestors).not.toContainEqual({ tag: 'main', role: null });
    expect(events.errors).toEqual([]);
});

test('core/shellbar action components transition 0 to 1 to 2 to 1 to 0 logical entries', async ({ page }, info) => {
    const history: unknown[] = [];
    for (const count of [0, 1, 2, 1, 0]) {
        await page.getByTestId('semantic-actions-' + count).click();
        await expect(logicalActions(page).locator('fd-shellbar-action')).toHaveCount(count);
        await expectToolbarForCount(page, count);
        history.push({ count, role: await logicalActions(page).getAttribute('role') });
    }
    await receipt(page, info, 'action-transitions', history);
});

test('core/shellbar plain fd-button projections transition 0 to 1 to 2 to 1 to 0', async ({ page }, info) => {
    const history: unknown[] = [];
    for (const count of [0, 1, 2, 1, 0]) {
        await page.getByTestId('semantic-buttons-' + count).click();
        await expect(logicalActions(page).locator('[data-semantic-button]')).toHaveCount(count);
        await expectToolbarForCount(page, count);
        if (count === 1) {
            await expect(logicalActions(page).locator('[data-semantic-button]')).toHaveRole('button');
        }
        history.push({ count, role: await logicalActions(page).getAttribute('role') });
    }
    await receipt(page, info, 'plain-button-transitions', history);
});

test('core/shellbar mixed action and plain-button composite entries are counted once each', async ({ page }) => {
    await page.getByTestId('semantic-actions-1').click();
    await page.getByTestId('semantic-buttons-1').click();
    await expect(logicalActions(page).locator('fd-shellbar-action')).toHaveCount(1);
    await expect(logicalActions(page).locator('[data-semantic-button]')).toHaveCount(1);
    await expectToolbarForCount(page, 2);
});

test('core/shellbar generated assistive entry updates a stable plain-button projection', async ({ page }, info) => {
    await page.getByTestId('semantic-buttons-1').click();
    await expectToolbarForCount(page, 1);
    await page.getByTestId('semantic-assistive-toggle').click();
    await expectToolbarForCount(page, 2);
    await page.getByTestId('semantic-assistive-toggle').click();
    await expectToolbarForCount(page, 1);
    await receipt(page, info, 'generated-entry', { role: await logicalActions(page).getAttribute('role') });
});

test('core/shellbar composite controls are one logical entry beside one stable action', async ({ page }, info) => {
    const composites = [
        ['combobox', 'combobox-shellbar', 'combobox-actions', 'semantic-combobox'],
        ['legacy-user', 'legacy-user-shellbar', 'legacy-user-actions', 'semantic-legacy-user'],
        ['user-menu', 'user-menu-shellbar', 'user-menu-actions', 'semantic-user-menu'],
        ['product-switch', 'product-switch-shellbar', 'product-switch-actions', 'semantic-product-switch']
    ] as const;
    const ledger: unknown[] = [];
    for (const [name, shellbarTestId, actionsTestId, controlTestId] of composites) {
        const shellbar = page.getByTestId(shellbarTestId);
        const actions = page.getByTestId(actionsTestId);
        const control = page.getByTestId(controlTestId);
        await expect(shellbar.locator('fd-shellbar-actions')).toHaveCount(1);
        await expect(control).toHaveCount(1);
        const internalButtons = await control.locator('button').count();
        expect(internalButtons).toBeGreaterThan(0);
        await expect(actions.locator('fd-shellbar-action')).toHaveCount(0);
        await expect(actions).not.toHaveAttribute('role');
        await page.getByTestId('semantic-composite-stable-toggle').click();
        await expect(actions.locator('fd-shellbar-action')).toHaveCount(1);
        await expect(actions).toHaveRole('toolbar');
        await expect(actions).toHaveAccessibleName('Shellbar');
        await page.getByTestId('semantic-composite-stable-toggle').click();
        await expect(actions).not.toHaveAttribute('role');
        ledger.push({
            name,
            internalButtons,
            roleAfterRemoval: await actions.getAttribute('role')
        });
    }
    const settled = await settle(page);
    const events = eventsFor(page);
    await receipt(page, info, 'composite-ledger', {
        ledger,
        settled,
        console: events.console,
        pageErrors: events.errors
    });
    expect(events.errors).toEqual([]);
});

test('core/shellbar real Platform Search attaches and detaches as one entry beside a stable projection', async ({
    page
}, info) => {
    const shellbar = page.getByTestId('search-shellbar');
    const actions = page.getByTestId('search-actions');
    await expect(shellbar.locator('fd-shellbar-actions')).toHaveCount(1);
    await expect(actions.locator('fd-shellbar-action')).toHaveCount(1);
    await expectToolbarForSearch(actions, 1);
    await page.getByTestId('semantic-search-toggle').click();
    const search = page.getByTestId('semantic-search');
    await expect(search).toHaveCount(1);
    await expectToolbarForSearch(actions, 2);
    await expect(actions.locator('fd-shellbar-action')).toHaveCount(2);
    const searchButton = actions.locator('fd-shellbar-action').first().getByRole('button');
    await expect(searchButton).toHaveAttribute('aria-expanded', 'false');
    await searchButton.click();
    const portalledSearch = actions.locator('.fd-shellbar__action fdp-search-field');
    await expect(portalledSearch).toHaveCount(1);
    await expect(portalledSearch).toBeVisible();
    const expandedFocus = await settle(page);
    expect(expandedFocus.hasFocus).toBe(true);
    await expectToolbarForSearch(actions, 2);
    const beforeDetach = await shellbar.evaluate((element) => ({
        actionsRole: element.querySelector('[data-testid=search-actions]')?.getAttribute('role'),
        portalledSearch: !!element.querySelector('[data-testid=search-actions] fdp-search-field'),
        searchParent: element.querySelector('[data-testid=semantic-search]')?.parentElement?.className
    }));
    await page.getByTestId('semantic-search-toggle').click();
    const afterDetachFocus = await settle(page);
    const afterDetach = await shellbar.evaluate((element) => ({
        actionsRole: element.querySelector('[data-testid=search-actions]')?.getAttribute('role'),
        remainingSearch: !!element.querySelector('[data-testid=semantic-search]'),
        actionCount: element.querySelectorAll('[data-testid=search-actions] fd-shellbar-action').length
    }));
    const events = eventsFor(page);
    await receipt(page, info, 'platform-search-detach', {
        beforeDetach,
        expandedFocus,
        afterDetach,
        afterDetachFocus,
        console: events.console,
        pageErrors: events.errors
    });
    await expect(search).toHaveCount(0);
    await expectToolbarForSearch(actions, 1);
    await receipt(page, info, 'platform-search-lifecycle', {
        actionCount: await actions.locator('fd-shellbar-action').count(),
        role: await actions.getAttribute('role'),
        console: events.console,
        pageErrors: events.errors
    });
    expect(events.errors).toEqual([]);
});

test('core/shellbar real actions host overflows and restores through narrow wide narrow geometry', async ({
    page
}, info) => {
    const container = page.getByTestId('real-overflow-container');
    const shellbar = page.getByTestId('real-overflow-shellbar');
    const actions = page.getByTestId('real-overflow-actions');
    const history: unknown[] = [];

    for (const [width, expectOverflow] of [
        ['narrow', true],
        ['wide', false],
        ['narrow', true]
    ] as const) {
        await page.getByTestId('real-overflow-' + width).click();
        // The real overflow layout measures asynchronously after a container resize.
        await page.waitForTimeout(150);
        const focus = await settle(page);
        await expect(actions).toHaveRole('toolbar');
        await expect(actions).toHaveAccessibleName('Shellbar');
        await expect(actions.locator('fd-shellbar-action')).toHaveCount(2);
        const overflowTrigger = actions.locator('fd-shellbar-actions-mobile button');
        if (expectOverflow) {
            await expect(overflowTrigger).toHaveCount(1);
            await expect(actions.getByRole('button', { name: 'Overflow one' })).not.toBeVisible();
            await expect(actions.getByRole('button', { name: 'Overflow two' })).not.toBeVisible();
            await overflowTrigger.click();
            const rows = page.locator('[fd-menu-interactive]:visible');
            await expect(rows.filter({ hasText: 'Overflow one' })).toHaveCount(1);
            await expect(rows.filter({ hasText: 'Overflow two' })).toHaveCount(1);
            await page.keyboard.press('Escape');
            await expect(rows).toHaveCount(0);
        } else {
            await expect(overflowTrigger).toHaveCount(0);
            await expect(actions.getByRole('button', { name: 'Overflow one' })).toBeVisible();
            await expect(actions.getByRole('button', { name: 'Overflow two' })).toBeVisible();
        }
        history.push({
            focus,
            state: await container.evaluate((element) => {
                const shellbarElement = element.querySelector('.fd-shellbar') as HTMLElement;
                const actionsElement = element.querySelector('fd-shellbar-actions') as HTMLElement;
                return {
                    width: element.getBoundingClientRect().width,
                    shellbarWidth: shellbarElement.getBoundingClientRect().width,
                    actionsWidth: actionsElement.getBoundingClientRect().width,
                    actionsEnd: actionsElement.getBoundingClientRect().right,
                    shellbarEnd: shellbarElement.getBoundingClientRect().right,
                    role: actionsElement.getAttribute('role'),
                    labels: Array.from(actionsElement.querySelectorAll('fd-shellbar-action')).map((action) =>
                        action.getAttribute('aria-label')
                    )
                };
            })
        });
        await expect(shellbar.locator('fd-shellbar-actions')).toHaveCount(1);
    }
    const events = eventsFor(page);
    await receipt(page, info, 'real-overflow-lifecycle', {
        history,
        console: events.console,
        pageErrors: events.errors
    });
    expect(events.errors).toEqual([]);
});

test('core/shellbar overflow keeps projected membership and menu semantics', async ({ page }, info) => {
    const mobile = page.getByTestId('mobile-region');
    const trigger = mobile.locator('button');
    await page.getByTestId('add-action').click();
    await trigger.click();
    const rows = page.locator('[fd-menu-interactive]:visible');
    await expect(rows.filter({ hasText: 'One' })).toHaveCount(1);
    await expect(rows.filter({ hasText: 'Five' })).toHaveCount(1);
    await expect(rows.first()).toHaveRole('menuitem');
    await receipt(page, info, 'overflow-preservation', { rows: await rows.allTextContents() });
    await page.keyboard.press('Escape');
    await expect(rows).toHaveCount(0);
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
