import { Locator } from '@playwright/test';
import { expect, test } from '../../fixtures/base.fixture';

const fixtures = [
    {
        mode: 'Reactive Forms',
        route: 'core/radio/form-group',
        legend: 'Read-only radio buttons',
        fieldset: 'radio-readonly-form-fieldset',
        readout: 'radio-readonly-form-readout',
        optionId: 'radio-readonly-form-2',
        label: 'Option 2',
        value: '1',
        checked: [true, false, false]
    },
    {
        mode: 'ngModel',
        route: 'core/radio/radio',
        legend: 'Radio button States in read only mode',
        fieldset: 'radio-readonly-ngmodel-fieldset',
        readout: 'radio-readonly-ngmodel-readout',
        optionId: 'radio-readonly-2',
        label: 'Warning Option',
        value: 'val1',
        checked: [false, true, false, false, false, false]
    }
];

async function snapshot(group: Locator, readoutId: string, waitForFrames = true): Promise<object> {
    return group.evaluate(
        async (element, { id, wait }) => {
            // Native radio preactivation is allowed inside dispatch; assert after rendering settles.
            if (wait) {
                await new Promise<void>((resolve) =>
                    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
                );
            }
            const readoutElement = element.querySelector<HTMLElement>('#' + id);
            const readout = readoutElement?.textContent ?? '';
            const diagnostic = (label: string): string | undefined => {
                const term = Array.from(readoutElement?.querySelectorAll('dt') ?? []).find(
                    (candidate) => candidate.textContent?.trim() === label
                );
                return term?.nextElementSibling?.textContent?.trim();
            };
            const inputs = Array.from(element.querySelectorAll<HTMLInputElement>('input[type=radio]'));
            return {
                value:
                    diagnostic('Radio Button Value:') ?? /Radio Button Value:\s*(No selection|\S+)/.exec(readout)?.[1],
                touched:
                    diagnostic('Radio Button Touched:') === 'true' ||
                    /Radio Button Touched:\s*true/.test(readout) ||
                    !!element.querySelector('fd-radio-button.ng-touched'),
                dirty:
                    diagnostic('Radio Button Dirty:') === 'true' ||
                    /Radio Button Dirty:\s*true/.test(readout) ||
                    !!element.querySelector('fd-radio-button.ng-dirty'),
                checked: inputs.map((input) => input.checked),
                ariaChecked: inputs.map((input) => input.getAttribute('aria-checked')),
                readOnly: inputs.map((input) => input.readOnly),
                ariaReadOnly: inputs.map((input) => input.getAttribute('aria-readonly')),
                disabled: inputs.map((input) => input.disabled)
            };
        },
        { id: readoutId, wait: waitForFrames }
    );
}

for (const config of fixtures) {
    test.describe(config.mode + ' read-only radio', () => {
        const expected = {
            value: config.value,
            dirty: false,
            touched: false,
            checked: config.checked,
            ariaChecked: config.checked.map(String),
            readOnly: config.checked.map(() => true),
            ariaReadOnly: config.checked.map(() => 'true'),
            disabled: config.checked.map(() => false)
        };

        test.beforeEach(async ({ page, goto }) => {
            await goto(config.route);
            const group = page.getByRole('group', { name: config.legend, exact: true });
            await expect(group).toHaveAttribute('id', config.fieldset);
            await expect(group.locator('input[type=radio]')).toHaveCount(config.checked.length);
            await expect.poll(() => snapshot(group, config.readout)).toEqual(expected);
            if (config.mode === 'Reactive Forms') {
                await expect(group.locator('#' + config.readout + ' dt')).toHaveText([
                    'Radio Button Value:',
                    'Radio Button Touched:',
                    'Radio Button Dirty:',
                    'Radio Button Valid:'
                ]);
            }
            const identities = await group.locator('input[type=radio]').evaluateAll((elements) =>
                elements.map((element) => {
                    const input = element as HTMLInputElement;
                    return {
                        unique: document.querySelectorAll('#' + input.id).length === 1,
                        ownLabel: Array.from(input.closest('fieldset')!.querySelectorAll('label')).some(
                            (label) => label.control === input
                        )
                    };
                })
            );
            expect(identities).toEqual(config.checked.map(() => ({ unique: true, ownLabel: true })));
        });

        test('direct native input click is cancelled and restores every native/ARIA sibling while preserving model and pristine state', async ({
            page
        }, testInfo) => {
            const group = page.getByRole('group', { name: config.legend, exact: true });
            const cancellation = await group.locator('#' + config.optionId).evaluate((element) => {
                const clicks: Event[] = [];
                element.addEventListener('click', (event) => clicks.push(event), { once: true });
                (element as HTMLInputElement).click();
                return clicks.map((event) => ({
                    cancelable: event.cancelable,
                    defaultPrevented: event.defaultPrevented
                }));
            });
            expect(cancellation).toEqual([{ cancelable: true, defaultPrevented: true }]);
            const afterDispatch = await snapshot(group, config.readout, false);
            expect(afterDispatch).toEqual(expected);
            const afterTwoFrames = await snapshot(group, config.readout);
            expect(afterTwoFrames).toEqual(expected);
            await testInfo.attach('native-click-cancellation-and-restoration', {
                body: JSON.stringify({ cancellation, afterDispatch, afterTwoFrames }, null, 2),
                contentType: 'application/json'
            });
        });

        for (const target of ['label text', 'label circle'] as const) {
            test(
                target + ' preserves model, pristine state and every native/ARIA sibling',
                async ({ page }, testInfo) => {
                    const group = page.getByRole('group', { name: config.legend, exact: true });
                    const label = group.locator('label[for="' + config.optionId + '"]');
                    await expect(label).toBeVisible();
                    if (target === 'label text') {
                        await label.getByText(config.label, { exact: true }).click();
                    } else {
                        const box = await label.boundingBox();
                        expect(box).not.toBeNull();
                        await label.click({ position: { x: 8, y: box!.height / 2 } });
                    }
                    await testInfo.attach('settled-state', {
                        body: JSON.stringify(await snapshot(group, config.readout), null, 2),
                        contentType: 'application/json'
                    });
                    await expect.poll(() => snapshot(group, config.readout)).toEqual(expected);
                }
            );
        }

        for (const key of ['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']) {
            test(key + ' preserves model, pristine state and every native/ARIA sibling', async ({ page }, testInfo) => {
                const group = page.getByRole('group', { name: config.legend, exact: true });
                const inputs = group.locator('input[type=radio]');
                const start = key === 'Space' ? config.checked.indexOf(true) + 1 : config.checked.indexOf(true);
                await inputs.nth(start).focus();
                await expect(inputs.nth(start)).toBeFocused();
                await page.keyboard.press(key);
                await testInfo.attach('settled-state', {
                    body: JSON.stringify(await snapshot(group, config.readout), null, 2),
                    contentType: 'application/json'
                });
                await expect.poll(() => snapshot(group, config.readout)).toEqual(expected);
                await expect(group.locator('input[type=radio]:focus')).toHaveCount(1);
            });
        }

        if (config.mode === 'Reactive Forms') {
            test('programmatic set button selects option 3 without marking the control dirty', async ({ page }) => {
                const group = page.getByRole('group', { name: config.legend, exact: true });
                await group.getByRole('button', { name: 'Set value to 3' }).click();

                await expect
                    .poll(() => snapshot(group, config.readout))
                    .toEqual({
                        ...expected,
                        value: '3',
                        checked: [false, false, true],
                        ariaChecked: ['false', 'false', 'true']
                    });
            });

            test('reset button clears selection and restores pristine and untouched state', async ({
                page,
                browserName
            }) => {
                const group = page.getByRole('group', { name: config.legend, exact: true });
                await group.locator('input[type=radio]').first().focus();
                await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
                await expect(group.getByRole('button', { name: 'Set value to 3' })).toBeFocused();
                await group.getByRole('button', { name: 'Set value to 3' }).click();
                await expect.poll(() => snapshot(group, config.readout)).toMatchObject({ value: '3', touched: true });

                await group.getByRole('button', { name: 'Reset control' }).click();

                const cleared = {
                    ...expected,
                    value: 'No selection',
                    checked: [false, false, false],
                    ariaChecked: ['false', 'false', 'false']
                };
                await expect.poll(() => snapshot(group, config.readout)).toEqual(cleared);
                await expect(group.locator('#' + config.readout + ' dd').first()).toHaveText('No selection');
            });
        }
    });
}
