import { expect, test } from '../../fixtures/base.fixture';

test.describe('core/combobox leave behavior', () => {
    const combobox = (page: import('@playwright/test').Page, index: number): import('@playwright/test').Locator =>
        page.locator('fd-combobox').nth(index);
    const input = (page: import('@playwright/test').Page, index: number): import('@playwright/test').Locator =>
        combobox(page, index).locator('input[role="combobox"]');
    const valueReadout = (page: import('@playwright/test').Page, index: number): import('@playwright/test').Locator =>
        page.locator('small').nth(index);

    const selectKiwi = async (page: import('@playwright/test').Page, index: number): Promise<void> => {
        const field = input(page, index);
        await field.click();
        await field.pressSequentially('K', { delay: 30 });
        const listbox = page.locator('[role="listbox"]');
        await expect(listbox).toBeVisible();
        await listbox.locator('[role="option"]').filter({ hasText: 'Kiwi' }).click();
        await expect(field).toHaveValue('Kiwi');
    };

    const replaceWithCustom = async (page: import('@playwright/test').Page, index: number): Promise<void> => {
        const field = input(page, index);
        await field.click();
        await field.fill('Custom');
        await expect(field).toHaveValue('Custom');
    };

    const typeAutocompletePrefix = async (page: import('@playwright/test').Page, index: number): Promise<void> => {
        const field = input(page, index);
        await field.click();
        await field.pressSequentially('K', { delay: 30 });
        await expect(field).toHaveValue('Kiwi');
        await expect
            .poll(() => field.evaluate((element: HTMLInputElement) => [element.selectionStart, element.selectionEnd]))
            .toEqual([1, 4]);
    };

    const captureCvaWrites = async (page: import('@playwright/test').Page, index: number): Promise<void> => {
        await combobox(page, index).evaluate((host) => {
            type Combobox = {
                onChange: (value: unknown) => void;
                __e2eCvaWrites?: unknown[];
            };
            type AngularDebug = { getComponent: (element: Element) => Combobox };

            const component = (window as unknown as { ng: AngularDebug }).ng.getComponent(host);
            const originalOnChange = component.onChange;
            component.__e2eCvaWrites = [];
            component.onChange = (value: unknown) => {
                component.__e2eCvaWrites?.push(value);
                originalOnChange(value);
            };
        });
    };

    const cvaWrites = (page: import('@playwright/test').Page, index: number): Promise<unknown[]> =>
        combobox(page, index).evaluate((host) => {
            type Combobox = { __e2eCvaWrites?: unknown[] };
            type AngularDebug = { getComponent: (element: Element) => Combobox };

            return (window as unknown as { ng: AngularDebug }).ng.getComponent(host).__e2eCvaWrites ?? [];
        });

    test.beforeEach(async ({ goto }) => {
        await goto('core/combobox/forms');
    });

    test('commits a unique autocomplete candidate on Tab in display-value mode', async ({ page }) => {
        await typeAutocompletePrefix(page, 1);
        await captureCvaWrites(page, 1);

        await page.keyboard.press('Tab');

        await expect(input(page, 1)).toHaveValue('Kiwi');
        await expect(valueReadout(page, 1)).toContainText('Json Value: "Kiwi"');
        await expect.poll(() => cvaWrites(page, 1)).toEqual(['Kiwi']);
    });

    test('commits a unique autocomplete candidate on pointer leave in display-value mode', async ({ page }) => {
        await typeAutocompletePrefix(page, 1);
        await captureCvaWrites(page, 1);

        await valueReadout(page, 0).click();

        await expect(input(page, 1)).toHaveValue('Kiwi');
        await expect(valueReadout(page, 1)).toContainText('Json Value: "Kiwi"');
        await expect.poll(() => cvaWrites(page, 1)).toEqual(['Kiwi']);
    });

    test('commits an autocomplete candidate once when a focusable outside button is clicked', async ({ page }) => {
        await page.evaluate(() => {
            const outsideButtonElement = document.createElement('button');
            outsideButtonElement.id = 'core-combobox-outside-focus-target';
            outsideButtonElement.type = 'button';
            outsideButtonElement.textContent = 'Outside focus target';
            document.body.append(outsideButtonElement);
        });
        await typeAutocompletePrefix(page, 1);
        await captureCvaWrites(page, 1);

        const outsideButton = page.locator('#core-combobox-outside-focus-target');
        await outsideButton.click();

        await expect(outsideButton).toBeFocused();
        await expect(input(page, 1)).toHaveValue('Kiwi');
        await expect(valueReadout(page, 1)).toContainText('Json Value: "Kiwi"');
        await expect.poll(() => cvaWrites(page, 1)).toEqual(['Kiwi']);
    });

    test('commits a unique autocomplete candidate once on Tab in object mode', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('Tab');

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toHaveLength(1);
        await expect
            .poll(() => cvaWrites(page, 0))
            .toEqual([expect.objectContaining({ displayedValue: 'Kiwi', value: 'KiwiValue' })]);
    });

    test('commits a unique autocomplete candidate once on pointer leave in object mode', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await valueReadout(page, 1).click();

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toHaveLength(1);
        await expect
            .poll(() => cvaWrites(page, 0))
            .toEqual([expect.objectContaining({ displayedValue: 'Kiwi', value: 'KiwiValue' })]);
    });

    test('retains the ArrowRight-accepted autocomplete object on Tab', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Tab');

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toEqual([expect.objectContaining({ displayedValue: 'Kiwi' })]);
    });

    test('retains the ArrowLeft-accepted autocomplete object on pointer leave', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('ArrowLeft');
        await valueReadout(page, 1).click();

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toEqual([expect.objectContaining({ displayedValue: 'Kiwi' })]);
    });

    test('does not roll back an Enter-accepted autocomplete object on pointer leave', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('Enter');
        await valueReadout(page, 1).click();

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toEqual([expect.objectContaining({ displayedValue: 'Kiwi' })]);
    });

    test('does not emit an ArrowDown-selected object twice on Tab', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Tab');

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toEqual([expect.objectContaining({ displayedValue: 'Kiwi' })]);
    });

    test('preserves an exact unique object label on pointer leave', async ({ page }) => {
        const field = input(page, 0);
        await field.click();
        await field.fill('Kiwi');
        await field.press('End');
        await captureCvaWrites(page, 0);

        await valueReadout(page, 1).click();

        await expect(field).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).not.toContain(null);
    });

    test('commits an accepted autocomplete candidate on Shift+Tab exactly once', async ({ page }) => {
        await typeAutocompletePrefix(page, 0);
        await captureCvaWrites(page, 0);

        await page.keyboard.press('Shift+Tab');

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect.poll(() => cvaWrites(page, 0)).toEqual([expect.objectContaining({ displayedValue: 'Kiwi' })]);
    });

    test('preserves nonmatching custom text on pointer leave in display-value mode', async ({ page }) => {
        await selectKiwi(page, 1);
        await replaceWithCustom(page, 1);

        await valueReadout(page, 0).click();

        await expect(input(page, 1)).toHaveValue('Custom');
        await expect(valueReadout(page, 1)).toContainText('Json Value: "Custom"');
    });

    test('restores the selected object on pointer leave in object mode', async ({ page }) => {
        await selectKiwi(page, 0);
        await replaceWithCustom(page, 0);

        await valueReadout(page, 1).click();

        await expect(input(page, 0)).toHaveValue('Kiwi');
        await expect(valueReadout(page, 0)).toContainText('"displayedValue": "Kiwi"');
        await expect(valueReadout(page, 0)).toContainText('"value": "KiwiValue"');
    });
});

test.describe('core/combobox valueProperty leave behavior', () => {
    const input = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('fd-combobox').nth(1).locator('input[role="combobox"]');
    const formValue = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('pre');

    const captureCvaWrites = async (page: import('@playwright/test').Page): Promise<void> => {
        await page
            .locator('fd-combobox')
            .nth(1)
            .evaluate((host) => {
                type Combobox = { onChange: (value: unknown) => void; __e2eCvaWrites?: unknown[] };
                type AngularDebug = { getComponent: (element: Element) => Combobox };
                const component = (window as unknown as { ng: AngularDebug }).ng.getComponent(host);
                const originalOnChange = component.onChange;
                component.__e2eCvaWrites = [];
                component.onChange = (value: unknown) => {
                    component.__e2eCvaWrites?.push(value);
                    originalOnChange(value);
                };
            });
    };

    const cvaWrites = (page: import('@playwright/test').Page): Promise<unknown[]> =>
        page
            .locator('fd-combobox')
            .nth(1)
            .evaluate((host) => {
                type Combobox = { __e2eCvaWrites?: unknown[] };
                type AngularDebug = { getComponent: (element: Element) => Combobox };
                return (window as unknown as { ng: AngularDebug }).ng.getComponent(host).__e2eCvaWrites ?? [];
            });

    const typeApplePrefix = async (page: import('@playwright/test').Page): Promise<void> => {
        const field = input(page);
        await field.click();
        await field.pressSequentially('A', { delay: 30 });
        await expect(field).toHaveValue('Apple');
        await expect
            .poll(() => field.evaluate((element: HTMLInputElement) => [element.selectionStart, element.selectionEnd]))
            .toEqual([1, 5]);
    };

    test.beforeEach(async ({ goto }) => {
        await goto('core/combobox/value-property');
    });

    test('writes the public valueProperty payload once on Tab', async ({ page }) => {
        await typeApplePrefix(page);
        await captureCvaWrites(page);
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Tab');

        await expect(input(page)).toHaveValue('Apple');
        await expect(formValue(page)).toContainText('"fruitWithValueProperty": "A1"');
        await expect.poll(() => cvaWrites(page)).toEqual(['A1']);
    });

    test('writes the public valueProperty payload once on pointer leave', async ({ page }) => {
        await typeApplePrefix(page);
        await captureCvaWrites(page);
        await page.keyboard.press('ArrowRight');
        await page.getByRole('button', { name: 'Select Apple (A1)' }).click();

        await expect(input(page)).toHaveValue('Apple');
        await expect(formValue(page)).toContainText('"fruitWithValueProperty": "A1"');
        await expect.poll(() => cvaWrites(page)).toEqual(['A1']);
    });
});

test.describe('core/combobox', () => {
    test.beforeEach(async ({ goto }) => {
        await goto('core/combobox/combobox');
    });

    test('opens dropdown via addon button and shows all options', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        await expect(options).toHaveCount(8);
    });

    test('filters options by typing', async ({ page }) => {
        const input = page.locator('input[role="combobox"]').first();
        await input.click();
        await input.pressSequentially('App', { delay: 50 });
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const options = listbox.locator('[role="option"]');
        await expect(options.first()).toContainText('Apple');
    });

    test('selects option with keyboard navigation', async ({ page }) => {
        const input = page.locator('input[role="combobox"]').first();
        await input.click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await expect(input).toHaveValue('Apple');
    });

    test('closes dropdown on Escape', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(listbox).toBeHidden();
    });

    test('selects option on click', async ({ page }) => {
        const combobox = page.locator('fd-combobox').first();
        const addonButton = combobox.locator('.fd-input-group__addon button').first();
        await addonButton.click();
        const listbox = page.locator('[role="listbox"]').first();
        await expect(listbox).toBeVisible();
        const option = listbox.locator('[role="option"]').filter({ hasText: 'Banana' });
        await option.click();
        const input = page.locator('input[role="combobox"]').first();
        await expect(input).toHaveValue('Banana');
    });

    test('handles fast typing without losing characters (autocomplete race condition)', async ({ page }) => {
        // Regression test for: autocomplete selecting last typed character during fast typing
        // Bug: typing "Week24" fast would result in "Wek24" or "Wee24"
        // Cause: selection range used stale model value instead of current native input value

        // Create a custom test with specific values
        const input = page.locator('input[role="combobox"]').first();
        await input.click();

        // Type "App" with minimal delay to simulate fast typing
        await input.pressSequentially('App', { delay: 10 });

        // Should autocomplete to "Apple" and NOT lose the second 'p'
        await expect(input).toHaveValue('Apple');

        // Clear via keyboard (Ctrl+A + Delete simulates real user clearing the field)
        await input.press('Control+a');
        await input.press('Delete');
        await input.pressSequentially('Bana', { delay: 10 });

        await expect(input).toHaveValue('Banana');

        // Verify no characters were overwritten during typing
        // The bug would cause the last character to be selected, so next keystroke overwrites it
    });
});

test.describe('platform/combobox leave behavior', () => {
    const input = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('fdp-combobox input[role="combobox"]');
    const selectionReadout = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('fdp-form-field-extras');
    const addonButton = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('fdp-combobox .fd-input-group__addon button');
    const listbox = (page: import('@playwright/test').Page): import('@playwright/test').Locator =>
        page.locator('[role="listbox"]');

    const configure = async (
        page: import('@playwright/test').Page,
        options: { closeOnOutsideClick?: boolean; tabOutStrategy?: 'close' | 'closeAndSelect' }
    ): Promise<void> => {
        await page.locator('fdp-combobox').evaluate((host, configuration) => {
            type Combobox = {
                closeOnOutsideClick: boolean;
                tabOutStrategy: 'close' | 'closeAndSelect';
                selectionChange: { subscribe: (listener: () => void) => void };
                __e2eSelectionChangeCount?: number;
            };
            type AngularDebug = { getComponent: (element: Element) => Combobox };

            const component = (window as unknown as { ng: AngularDebug }).ng.getComponent(host);
            component.closeOnOutsideClick = configuration.closeOnOutsideClick ?? component.closeOnOutsideClick;
            component.tabOutStrategy = configuration.tabOutStrategy ?? component.tabOutStrategy;
            component.__e2eSelectionChangeCount = 0;
            component.selectionChange.subscribe(() => {
                component.__e2eSelectionChangeCount = (component.__e2eSelectionChangeCount ?? 0) + 1;
            });
        }, options);
    };

    const selectionChangeCount = (page: import('@playwright/test').Page): Promise<number> =>
        page.locator('fdp-combobox').evaluate((host) => {
            type Combobox = { __e2eSelectionChangeCount?: number };
            type AngularDebug = { getComponent: (element: Element) => Combobox };

            return (window as unknown as { ng: AngularDebug }).ng.getComponent(host).__e2eSelectionChangeCount ?? 0;
        });

    const typeApplePrefix = async (page: import('@playwright/test').Page): Promise<void> => {
        const field = input(page);
        await field.click();
        await field.fill('');
        await expect(field).toHaveValue('');
        await field.pressSequentially('App', { delay: 30 });
        await expect(field).toHaveValue('Apple');
        await expect
            .poll(() => field.evaluate((element: HTMLInputElement) => [element.selectionStart, element.selectionEnd]))
            .toEqual([3, 5]);
    };

    test.beforeEach(async ({ goto }) => {
        await goto('platform/combobox/forms');
    });

    test('commits Apple on Tab from the completed autocomplete candidate', async ({ page }) => {
        await typeApplePrefix(page);

        await page.keyboard.press('Tab');

        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect(selectionReadout(page)).toContainText(
            /Form Selected Item:\s*\{\s*"field":\s*\{\s*"name":\s*"Apple"/
        );
    });

    test('commits Apple rather than the typed App prefix on pointer leave', async ({ page }) => {
        await typeApplePrefix(page);

        await page.mouse.click(1, 1);

        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect(selectionReadout(page)).toContainText(
            /Form Selected Item:\s*\{\s*"field":\s*\{\s*"name":\s*"Apple"/
        );
    });

    test('commits Apple once when a focusable outside button is clicked', async ({ page }) => {
        await page.evaluate(() => {
            const outsideButtonElement = document.createElement('button');
            outsideButtonElement.id = 'platform-combobox-outside-focus-target';
            outsideButtonElement.type = 'button';
            outsideButtonElement.textContent = 'Outside focus target';
            document.body.append(outsideButtonElement);
        });
        await configure(page, {});
        await typeApplePrefix(page);

        const outsideButton = page.locator('#platform-combobox-outside-focus-target');
        await outsideButton.click();

        await expect(outsideButton).toBeFocused();
        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('commits Apple once after ArrowRight and Tab', async ({ page }) => {
        await configure(page, {});
        await typeApplePrefix(page);

        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Tab');

        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('commits Apple once after ArrowLeft and pointer leave', async ({ page }) => {
        await configure(page, {});
        await typeApplePrefix(page);

        await page.keyboard.press('ArrowLeft');
        await page.mouse.click(1, 1);

        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('resolves an exact unique Apple label to its option on Tab', async ({ page }) => {
        await configure(page, {});
        const field = input(page);
        await field.click();
        await field.fill('Apple');
        await field.press('End');

        await page.keyboard.press('Tab');

        await expect(field).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('resolves an exact unique Apple label to its option on pointer leave', async ({ page }) => {
        await configure(page, {});
        const field = input(page);
        await field.click();
        await field.fill('Apple');
        await field.press('End');

        await page.mouse.click(1, 1);

        await expect(field).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('does not select either duplicate Apple option without active-option identity', async ({ page }) => {
        await configure(page, {});
        await page.locator('fdp-combobox').evaluate((host) => {
            type Option = { label: string; value: { id: number; name: string } };
            type Combobox = {
                _suggestions: Option[];
                _flatSuggestions: Option[];
                inputText: string;
                isOpenChangeHandle: (open: boolean) => void;
                _captureAutocompleteCandidate: () => void;
                searchInputElement: { nativeElement: HTMLInputElement };
            };
            type AngularDebug = { getComponent: (element: Element) => Combobox };
            const component = (window as unknown as { ng: AngularDebug }).ng.getComponent(host);
            const options = [
                { label: 'Apple', value: { id: 1, name: 'Apple' } },
                { label: 'Apple', value: { id: 2, name: 'Apple' } }
            ];
            const nativeInput = component.searchInputElement.nativeElement;
            component._suggestions = options;
            component._flatSuggestions = options;
            component.inputText = 'App';
            component.isOpenChangeHandle(true);
            nativeInput.focus();
            nativeInput.value = 'Apple';
            nativeInput.setSelectionRange(3, 5);
            component._captureAutocompleteCandidate();
        });

        await page.keyboard.press('Tab');

        await expect.poll(() => selectionChangeCount(page)).toBe(0);
        await expect(selectionReadout(page)).not.toContainText('"id": 1');
        await expect(selectionReadout(page)).not.toContainText('"id": 2');
    });

    test('preserves a nonmatching custom value on pointer leave', async ({ page }) => {
        const field = input(page);
        await field.click();
        await field.fill('Custom');
        await expect(field).toHaveValue('Custom');

        await page.mouse.click(1, 1);

        await expect(field).toHaveValue('Custom');
        await expect(selectionReadout(page)).toContainText('Selected Item: "Custom"');
        await expect(selectionReadout(page)).toContainText(/Form Selected Item:\s*\{\s*"field":\s*"Custom"/);
    });

    test('closes on a second Tab after a completed autocomplete leave without selecting again', async ({ page }) => {
        await configure(page, {});
        await typeApplePrefix(page);

        await page.keyboard.press('Tab');

        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect(listbox(page)).toBeHidden();
        await expect.poll(() => selectionChangeCount(page)).toBe(1);

        await addonButton(page).click();
        await expect(listbox(page)).toBeVisible();
        await page.keyboard.press('Tab');

        await expect(listbox(page)).toBeHidden();
        await expect(input(page)).toHaveValue('Apple');
        await expect(selectionReadout(page)).toContainText('"name": "Apple"');
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });

    test('closes on a second Tab with tabOutStrategy close without replacing the selected value', async ({ page }) => {
        await configure(page, { tabOutStrategy: 'close' });
        await typeApplePrefix(page);

        await page.keyboard.press('Tab');

        await expect(input(page)).toHaveValue('Strawberry');
        await expect(selectionReadout(page)).toContainText('"name": "Strawberry"');
        await expect(listbox(page)).toBeHidden();
        await expect.poll(() => selectionChangeCount(page)).toBe(0);

        await addonButton(page).click();
        await expect(listbox(page)).toBeVisible();
        await page.keyboard.press('Tab');

        await expect(listbox(page)).toBeHidden();
        await expect(input(page)).toHaveValue('Strawberry');
        await expect(selectionReadout(page)).toContainText('"name": "Strawberry"');
        await expect.poll(() => selectionChangeCount(page)).toBe(0);
    });

    test('keeps the popover open when a pointer moves focus outside and closeOnOutsideClick is false', async ({
        page
    }) => {
        await configure(page, { closeOnOutsideClick: false });
        await page.evaluate(() => {
            const outsideButtonElement = document.createElement('button');
            outsideButtonElement.id = 'platform-combobox-outside-focus-target';
            outsideButtonElement.type = 'button';
            outsideButtonElement.textContent = 'Outside focus target';
            document.body.append(outsideButtonElement);
        });

        await addonButton(page).click();
        await expect(listbox(page)).toBeVisible();

        const outsideButton = page.locator('#platform-combobox-outside-focus-target');
        await input(page).evaluate((element) => {
            element.addEventListener(
                'blur',
                () => {
                    element.dataset['e2eBlurred'] = 'true';
                },
                { once: true }
            );
        });
        await outsideButton.click();

        await expect(input(page)).toHaveAttribute('data-e2e-blurred', 'true');
        await expect(listbox(page)).toBeVisible();
        await expect(input(page)).toHaveValue('Strawberry');
        await expect(selectionReadout(page)).toContainText('"name": "Strawberry"');
        await expect.poll(() => selectionChangeCount(page)).toBe(0);
    });

    test('commits hidden-suggestion custom text without closing on outside focus when closeOnOutsideClick is false', async ({
        page
    }) => {
        await configure(page, { closeOnOutsideClick: false });
        await page.evaluate(() => {
            const outsideButton = document.createElement('button');
            outsideButton.id = 'platform-combobox-hidden-suggestions-focus-target';
            outsideButton.type = 'button';
            document.body.append(outsideButton);
        });

        const field = input(page);
        await field.click();
        await field.fill('Custom');
        await expect(field).toHaveValue('Custom');
        await expect(listbox(page)).toBeHidden();

        await page.locator('#platform-combobox-hidden-suggestions-focus-target').click();

        await expect(field).toHaveValue('Custom');
        await expect(selectionReadout(page)).toContainText('Selected Item: "Custom"');
        await expect(selectionReadout(page)).toContainText(/Form Selected Item:\s*\{\s*"field":\s*"Custom"/);
        await expect.poll(() => selectionChangeCount(page)).toBe(1);
    });
});
