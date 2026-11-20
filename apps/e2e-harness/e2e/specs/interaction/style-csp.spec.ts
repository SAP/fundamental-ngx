import { expect, expectNoStyleViolations, recordGeometry, test } from '../../fixtures/style-csp.fixture';

test.describe('SEC-390 strict styles', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('I1 custom empty Search Field results retain vertical spacing', async ({ page, goto }, testInfo) => {
        await goto('style-csp?case=search');
        await page.getByRole('searchbox').fill('Ap');
        await expect(page.getByRole('searchbox')).toHaveAttribute('aria-expanded', 'true');
        await page.getByRole('searchbox').fill('NoSuchProduce');
        const content = page.getByTestId('empty-results');
        await expect(content).toBeVisible();
        const wrapper = content.locator('..');
        const padding = await wrapper.evaluate((element) => ({
            top: getComputedStyle(element).paddingTop,
            bottom: getComputedStyle(element).paddingBottom,
            halfRem: `${parseFloat(getComputedStyle(document.documentElement).fontSize) / 2}px`
        }));
        expect.soft(padding.top).toBe(padding.halfRem);
        expect.soft(padding.bottom).toBe(padding.halfRem);
        await recordGeometry(wrapper, testInfo, 'search-empty');
        await page.keyboard.press('Escape');
        await expect(content).toBeHidden();
        await expectNoStyleViolations(page);
    });

    test('I3 Settings detail retains clipping and back navigation', async ({ page, goto }, testInfo) => {
        await goto('style-csp?case=settings');
        await page.getByRole('button', { name: 'Open detail' }).click();
        const detail = page.locator('[fd-settings-detail-area]');
        await expect(page.locator('.wide-detail')).toBeVisible();
        const actual = await detail.evaluate((element) => ({
            maxWidth: getComputedStyle(element).maxWidth,
            overflow: getComputedStyle(element).overflow,
            width: element.getBoundingClientRect().width,
            parentWidth: element.parentElement!.getBoundingClientRect().width,
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth
        }));
        expect.soft(actual).toMatchObject({ maxWidth: '100%', overflow: 'hidden' });
        expect.soft(actual.width).toBeLessThanOrEqual(actual.parentWidth);
        expect(actual.scrollWidth).toBeGreaterThan(actual.clientWidth);
        await recordGeometry(detail, testInfo, 'settings-detail');
        await page.getByRole('button', { name: 'Back', exact: true }).click();
        await expect(page.locator('.wide-detail')).toHaveCount(0);
        await expectNoStyleViolations(page);
    });

    test('I2 mobile User Menu body, fixed header, cloned name and submenu', async ({ page, goto }, testInfo) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await goto('style-csp?case=menu-mobile');
        await page.getByRole('button', { name: 'Open user menu' }).click();
        const body = page.locator('fd-dialog-body');
        await expect(body).toBeVisible();
        expect.soft(await body.evaluate((element) => getComputedStyle(element).padding)).toBe('0px');
        const header = page.locator('fd-dialog-header').getByRole('toolbar');
        const styles = await header.evaluate((element) => {
            const s = getComputedStyle(element);
            return { position: s.position, top: s.top, left: s.left, right: s.right, zIndex: s.zIndex };
        });
        expect.soft(styles).toEqual({ position: 'fixed', top: '0px', left: '0px', right: '0px', zIndex: '10' });
        await body.evaluate((element) => {
            element.scrollTop = element.scrollHeight;
        });
        const name = header.locator('.fd-user-menu__user-name');
        await expect(name).toBeVisible();
        await expect(name).toHaveText('Lisa Miller');
        expect
            .soft(
                await name.evaluate((element) => ({
                    textAlign: getComputedStyle(element).textAlign,
                    margin: getComputedStyle(element).marginInlineStart
                }))
            )
            .toEqual({ textAlign: 'center', margin: '44px' });
        await recordGeometry(header, testInfo, 'mobile-header');
        await body.evaluate((element) => {
            element.scrollTop = 0;
        });
        await page.getByRole('menuitem', { name: /^Preferences/ }).click();
        await expect(page.getByRole('menuitem', { name: 'Theme preferences' })).toBeVisible();
        expect.soft(await header.evaluate((element) => getComputedStyle(element).position)).toBe('fixed');
        await header.getByRole('button').first().click();
        await expect(page.getByRole('menuitem', { name: /^Preferences/ })).toBeVisible();
        await header.getByRole('button').last().click();
        await expect(body).toHaveCount(0);
        await expectNoStyleViolations(page);
    });

    test('I2 desktop User Menu submenu spans its list item', async ({ page, goto }, testInfo) => {
        await goto('style-csp?case=menu-desktop');
        await page.getByRole('button', { name: 'Open user menu' }).click();
        const item = page
            .locator('li[fd-user-menu-list-item]')
            .filter({ has: page.getByText('Preferences', { exact: true }) });
        const popover = item.locator('fd-popover');
        await expect(popover).toBeVisible();
        const geometry = await popover.evaluate((element) => ({
            width: element.getBoundingClientRect().width,
            parentWidth: element.parentElement!.clientWidth,
            computedWidth: getComputedStyle(element).width
        }));
        expect.soft(geometry.width).toBeCloseTo(geometry.parentWidth, 0);
        await page.getByRole('menuitem', { name: /^Preferences/ }).press('ArrowRight');
        await expect(page.getByRole('menuitem', { name: 'Theme preferences' })).toBeVisible();
        await recordGeometry(popover, testInfo, 'desktop-submenu');
        await page.keyboard.press('Escape');
        await expectNoStyleViolations(page);
    });

    for (const scenario of ['dialog', 'message-box']) {
        test(`${scenario === 'dialog' ? 'I4' : 'I5'} ${scenario} initial state, animation, close and reopen`, async ({
            page,
            goto
        }, testInfo) => {
            await goto(`style-csp?case=${scenario}`);
            const tag = scenario === 'dialog' ? 'fd-dialog-container' : 'fd-message-box-container';
            for (let cycle = 0; cycle < 2; cycle++) {
                await page
                    .getByRole('button', {
                        name: scenario === 'dialog' ? 'Open dialog' : 'Open message box',
                        exact: true
                    })
                    .click();
                const container = page.locator(tag);
                await expect(container).toHaveCSS('opacity', '1');
                const initial = await page.evaluate(
                    (host) =>
                        (window as any).__styleCsp.initial.filter(
                            (sample: { tag: string; phase: string }) =>
                                sample.tag === host && sample.phase === 'inserted'
                        ),
                    tag
                );
                expect.soft(initial[cycle]).toMatchObject({ opacity: '0', position: 'relative', zIndex: '999' });
                expect
                    .soft(
                        await container.evaluate((element) => ({
                            position: getComputedStyle(element).position,
                            zIndex: getComputedStyle(element).zIndex
                        }))
                    )
                    .toEqual({ position: 'relative', zIndex: '999' });
                await recordGeometry(container, testInfo, `${scenario}-${cycle}`);
                await page.getByRole('button', { name: 'Close', exact: true }).click();
                await expect(container).toHaveCount(0);
            }
            await expectNoStyleViolations(page);
        });
    }

    for (const animated of [true, false]) {
        test(`I6 exported CDK base subclass initial, enter and exit animated=${animated}`, async ({ page, goto }) => {
            await goto(`style-csp?case=base-toast&animated=${animated}`);
            const toast = page.locator('e2e-csp-base-toast');
            await expect(toast).toBeAttached();
            expect
                .soft(
                    await toast.evaluate((element) => ({
                        opacity: getComputedStyle(element).opacity,
                        transform: getComputedStyle(element).transform
                    }))
                )
                .toEqual({ opacity: '0', transform: 'matrix(1, 0, 0, 1, 0, 16)' });
            await page.getByRole('button', { name: 'Enter toast' }).click();
            await expect(page.locator('output')).toHaveText('entered');
            await expect(toast).toHaveCSS('opacity', '1');
            await expect(toast).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
            await expect(toast).toHaveClass('base-toast-consumer');
            await page.getByRole('button', { name: 'Exit toast' }).click();
            await expect(page.locator('output')).toHaveText('exited');
            await expect(toast).toHaveCount(0);
            await expectNoStyleViolations(page);
        });
    }

    test('I8 standalone theme icon defaults and CSSOM size', async ({ page, goto }, testInfo) => {
        await goto('style-csp?case=icon');
        const svg = page.locator('fdp-theme-selector-list-icon svg');
        await expect(svg).toBeVisible();
        await expect(svg).toHaveCSS('width', '56px');
        await expect(svg).toHaveCSS('height', '56px');
        const colors = [
            'rgb(28, 34, 40)',
            'rgb(66, 79, 94)',
            'rgb(41, 49, 58)',
            'rgb(58, 69, 82)',
            'rgb(145, 200, 246)',
            'rgb(211, 215, 217)',
            'rgb(53, 74, 95)',
            'rgb(121, 150, 180)',
            'rgb(255, 255, 255)'
        ];
        for (let index = 0; index < colors.length; index++) {
            expect
                .soft(
                    await svg
                        .locator(`.settings-selector-list-icon__cls-${index + 1}`)
                        .first()
                        .evaluate((element) => getComputedStyle(element).fill)
                )
                .toBe(colors[index]);
        }
        await recordGeometry(svg, testInfo, 'standalone-icon');
        await expectNoStyleViolations(page);
    });

    test('I8 real theme list palettes and custom template', async ({ page, goto }, testInfo) => {
        await goto('style-csp?case=theme-list');
        const list = page.locator('fdp-theme-selector-list');
        await expect(page.getByTestId('custom-theme')).toBeVisible();
        await expect(list.locator('fdp-theme-selector-list-icon')).toHaveCount(2);
        expect
            .soft(
                await list
                    .locator('.settings-selector-list__theme--sap_horizon .settings-selector-list-icon__cls-1')
                    .evaluate((element) => getComputedStyle(element).fill)
            )
            .toBe('rgb(245, 246, 247)');
        expect
            .soft(
                await list
                    .locator('.settings-selector-list__theme--sap_horizon_dark .settings-selector-list-icon__cls-1')
                    .evaluate((element) => getComputedStyle(element).fill)
            )
            .toBe('rgb(18, 23, 28)');
        await recordGeometry(list, testInfo, 'theme-list');
        await expectNoStyleViolations(page);
    });

    test('authorized Angular styles and CSSOM apply while a forbidden attribute stays blocked', async ({
        page,
        goto
    }) => {
        await goto('core/select/mode');
        const control = page.locator('fd-select .fd-select__control').first();
        await expect(control).toHaveCSS('display', 'flex');
        await expectNoStyleViolations(page);
        const result = await page.evaluate(() => {
            const element = document.createElement('div');
            document.body.append(element);
            element.style.width = '117px';
            element.style.setProperty('height', '23px');
            const cssom = { width: getComputedStyle(element).width, height: getComputedStyle(element).height };
            element.setAttribute('style', 'width: 151px');
            return { cssom, deniedWidth: getComputedStyle(element).width };
        });
        expect(result.cssom).toEqual({ width: '117px', height: '23px' });
        expect(result.deniedWidth).not.toBe('151px');
        await expect
            .poll(() =>
                page.evaluate(() =>
                    (window as any).__styleCsp.violations.some(
                        (event: { directive: string }) => event.directive === 'style-src-attr'
                    )
                )
            )
            .toBe(true);
    });
});
