import {
    click,
    doesItExist,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementPlaceholder,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { MultiInputPo } from './multi-input.po';

describe('Multi input test suite', () => {
    const multiInputPage: MultiInputPo = new MultiInputPo();
    const {
        expandedDropdown,
        activeDropdownButtons,
        activeInputs,
        mobileInput,
        filledInput,
        approveButton,
        groupHeader,
        groupDropdown,
        options,
        dropdownOptions,
        selectedToken,
        crossButton,
        dropdownOptionText,
        dropdownOptionTextValueHelp,
        header,
        validationPopover,
        compactExampleTokens,
        errorMessage,
        declineButton,
        listitems,
        reactiveExample
    } = multiInputPage;

    beforeAll(async () => {
        await multiInputPage.open();
        await waitForPresent(multiInputPage.title);
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(multiInputPage.root);
        await waitForElDisplayed(multiInputPage.title);
    }, 1);

    it('Verify multi input allows user to enter multiple values', async () => {
        const activeButtonsQuantity = await getElementArrayLength(activeDropdownButtons);
        const mobileExample = 6;
        const disabledExample = 5;
        const loadingExample = 8;

        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i === disabledExample) {
                continue;
            }
            if (i !== mobileExample) {
                await multiInputPage.expandDropdown(activeDropdownButtons, i, i === loadingExample);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await scrollIntoView(header, i);
                await multiInputPage.selectOption(optionsArr[1]);
                await multiInputPage.expandDropdown(activeDropdownButtons, i, i === loadingExample);
                await scrollIntoView(header, i);
                await multiInputPage.selectOption(optionsArr[2]);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await expect(await getText(filledInput, i)).toContain(optionsArr[2]);
            }
            if (i === mobileExample) {
                await multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await multiInputPage.selectOption(optionsArr[1]);
                await multiInputPage.selectOption(optionsArr[2]);
                await click(approveButton);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await expect(await getText(filledInput, i)).toContain(optionsArr[2]);
            }
        }
    });

    it('Check RTL/LTR orientation', async () => {
        await multiInputPage.checkRtlSwitch();
    });

    it('Verify group headers are not interactive', async () => {
        const headersQuantity = await getElementArrayLength(groupHeader);
        await multiInputPage.expandDropdown(groupDropdown);
        for (let i = 0; i < headersQuantity; i++) {
            await scrollIntoView(groupHeader, i);
            await click(groupHeader, i);
            await waitForElDisplayed(expandedDropdown);
        }
    });

    it('Verify A token can be added using suggestions or value help.', async () => {
        const inputQuantity = await getElementArrayLength(activeInputs);
        const disabledExample = 5;

        for (let i = 0; i < inputQuantity - 2; i++) {
            if (i === disabledExample) {
                continue;
            }
            await multiInputPage.expandDropdown(activeDropdownButtons, i);
            const optionsArr = await getAttributeByNameArr(options, 'title');
            await setValue(activeInputs, optionsArr[1].substring(0, 2), i);
            await multiInputPage.selectOption(optionsArr[1]);
            await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
        }
    });

    it('Verify The user can deselect an item by clicking its delete icon[X].', async () => {
        const activeButtonsQuantity = await getElementArrayLength(activeDropdownButtons);
        const mobileExample = 6;
        const disabledExample = 5;

        for (let i = 1; i < activeButtonsQuantity - 1; i++) {
            if (i === disabledExample) {
                continue;
            }
            if (i !== mobileExample) {
                await multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await scrollIntoView(header, i);
                await multiInputPage.selectOption(optionsArr[1]);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await scrollIntoView('fd-tokenizer', i);
                await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).click();
                const isDisplayed = await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).isDisplayed();
                await expect(isDisplayed).toBeFalsy();
            }
            if (i === mobileExample) {
                await multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await scrollIntoView(header, i);
                await multiInputPage.selectOption(optionsArr[1]);
                await click(approveButton);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await scrollIntoView('fd-tokenizer', i);
                await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).click();
                const isDisplayed = await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).isDisplayed();
                await expect(isDisplayed).toBeFalsy();
            }
        }
    });

    it('Verify When the user starts typing in the input field, the list is filtered', async () => {
        await multiInputPage.expandDropdown(activeDropdownButtons, 1);
        const optionsArr = await getAttributeByNameArr(options, 'title');
        await click(activeDropdownButtons, 1);
        await setValue(activeInputs, optionsArr[1].substring(0, 3), 1);
        let filteredOptions = await getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = await getText(dropdownOptionTextValueHelp, j);
            await expect(dropdownOption).toContain(optionsArr[1].substring(0, 3));
        }
        await scrollIntoView(multiInputPage.activeInputs, 0);
        await multiInputPage.expandDropdown(activeDropdownButtons, 0);
        await setValue(activeInputs, optionsArr[1].substring(0, 3), 0);
        filteredOptions = await getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = await getText(dropdownOptionText, j);
            await expect(dropdownOption).toContain(optionsArr[1].substring(0, 3));
        }
        await multiInputPage.expandDropdown(activeDropdownButtons, 6);
        await setValue(mobileInput, optionsArr[4].substring(0, 3));
        filteredOptions = await getElementArrayLength(dropdownOptions);
        for (let j = 0; j < filteredOptions; j++) {
            const dropdownOption = await getText(dropdownOptionTextValueHelp, j);
            await expect(dropdownOption).toContain(optionsArr[4].substring(0, 3));
        }
    });

    it('Verify user can delete the token using backspace and delete key', async () => {
        const activeButtonsQuantity = await getElementArrayLength(activeDropdownButtons);
        const disabledExample = 5;
        const mobileExample = 6;

        for (let i = 0; i < activeButtonsQuantity; i++) {
            if (i === disabledExample) {
                continue;
            }
            if (i !== mobileExample) {
                await scrollIntoView(activeDropdownButtons, i);
                await multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await scrollIntoView(header, i);
                const closeElement = await $$('fd-tokenizer')[i]!.$('.fd-token__close');
                // Clear all inputs
                if (!closeElement.error) {
                    await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).click();
                }
                await multiInputPage.selectOption(optionsArr[1]);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await expect((await getText(filledInput, i)).split('\n')[0]).toBe(optionsArr[1]);
                await click(selectedToken);
                await sendKeys(['Backspace', 'Backspace']);
                const isDisplayed = await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).isDisplayed();
                await expect(isDisplayed).toBeFalsy();
            }
            if (i === mobileExample) {
                await multiInputPage.expandDropdown(activeDropdownButtons, i);
                const optionsArr = await getAttributeByNameArr(options, 'title');
                await scrollIntoView(header, i);
                await multiInputPage.selectOption(optionsArr[1]);
                await click(approveButton);
                await expect(await getText(filledInput, i)).toContain(optionsArr[1]);
                await expect((await getText(filledInput, i)).split('\n')[0]).toBe(optionsArr[1]);
                await click(selectedToken);
                await sendKeys(['Backspace', 'Backspace']);
                const isDisplayed = await (await $$('fd-tokenizer')[i]!.$('.fd-token__close')).isDisplayed();
                await expect(isDisplayed).toBeFalsy();
            }
        }
    });

    it('Verify inputs should have placeholder', async () => {
        const activeInputsQuantity = await getElementArrayLength(activeInputs);
        for (let i = 0; i < activeInputsQuantity; i++) {
            await expect(await getElementPlaceholder(activeInputs, i)).toContain('Field placeholder text');
        }
    });

    it('should check validation on empty required field', async () => {
        await scrollIntoView(activeInputs, 7);
        await click(activeInputs, 7);

        // should trigger blur first
        await click(reactiveExample);
        await click(activeInputs, 7);

        await expect(await waitForElDisplayed(validationPopover)).toBe(true);
        await expect((await getText(validationPopover)).trim()).toBe('Value is required');
    });

    // skip due to https://github.com/SAP/fundamental-ngx/issues/6969
    xit('should check validation on invalid entry', async () => {
        await scrollIntoView(activeInputs, 7);
        await click(activeInputs, 7);
        await sendKeys(['aaaaa']);

        await expect(await waitForElDisplayed(validationPopover)).toBe(true);
        await expect((await getText(validationPopover)).trim()).toBe('Invalid entry');
    });

    it('should verify user cannot add the same item twice', async () => {
        await scrollIntoView(activeInputs, 1);
        await multiInputPage.expandDropdown(activeDropdownButtons, 1);
        const optionsArr = await getAttributeByNameArr(options, 'title');
        await setValue(activeInputs, optionsArr[1].substring(0, 4), 1);
        await click(options);
        const firstSelectionTokenCount = await getElementArrayLength(compactExampleTokens);
        await setValue(activeInputs, optionsArr[1].substring(0, 4), 1);
        await click(options);
        const secondSelectionTokenCount = await getElementArrayLength(compactExampleTokens);

        await expect(firstSelectionTokenCount).toEqual(1);
        await expect(secondSelectionTokenCount).toEqual(0);
    });

    it('should verify only 1 token created', async () => {
        await scrollIntoView(activeInputs, 1);
        const originalTokenCount = await getElementArrayLength(compactExampleTokens);
        await multiInputPage.expandDropdown(activeDropdownButtons, 1);
        await click(options);
        const newTokenCount = await getElementArrayLength(compactExampleTokens);
        await expect(newTokenCount).toEqual(originalTokenCount + 1);
    });

    it('should check error message after clear field in reactive example', async () => {
        await scrollIntoView(activeInputs, 7);
        await multiInputPage.expandDropdown(activeDropdownButtons, 7);
        await multiInputPage.selectOption('Alaska');
        await click(crossButton('Alaska'));
        await expect(await isElementDisplayed(errorMessage)).toBe(true);
        await expect((await getText(errorMessage)).trim()).toBe('Value is required');
    });

    it('should check no cross icons in menu list items', async () => {
        await scrollIntoView(activeDropdownButtons, 4);
        await click(activeDropdownButtons, 4);

        await expect(await doesItExist(listitems + declineButton)).toBe(false);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await multiInputPage.saveExampleBaselineScreenshot();
            await expect(await multiInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
