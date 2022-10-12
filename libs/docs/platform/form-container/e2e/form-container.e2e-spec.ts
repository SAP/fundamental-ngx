import { FormContainerPo } from './form-container.po';
import {
    browserIsSafari,
    clearValue,
    click,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getElementArrayLength,
    getRandomString,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Form Container test suite', () => {
    const formContainerPage = new FormContainerPo();
    const {
        recommendedExampleFormGroup,
        recommendedExampleCheckboxLabel,
        recommendedExampleTextArea,
        recommendedExampleHelpIcon,
        popover,
        possibleExampleTextArea,
        possibleExampleCheckboxLabel,
        possibleExampleFormGroup,
        possibleExampleHelpIcon,
        notRecommendedExampleTextArea,
        notRecommendedExampleCheckboxLabel,
        notRecommendedExampleFormGroup,
        notRecommendedExampleHelpIcon,
        complexExampleTextArea,
        complexExampleCheckboxLabel,
        complexExampleFormGroup,
        complexExampleHelpIcon,
        complexExampleInputGroup,
        complexExampleSubmitBtn,
        complexExampleRadioBtn,
        complexExampleRadioBtnLabel,
        complexExampleStepInput,
        complexExampleStepInputBtn,
        complexExampleSwitch,
        columnExampleTextArea,
        formExampleTextArea,
        formExampleSwitch,
        formExampleHelpIcon,
        changeExampleTextArea,
        changeExampleCheckboxLabel,
        changeExampleTextAreaLabel,
        changeExampleHelpIcon,
        isInlineExampleTextArea,
        isInlineExampleCheckboxLabel,
        isInlineExampleHelpIcon,
        isInlineExampleRadioBtn,
        isInlineExampleRadioBtnLabel,
        dropdownOption,
        isInlineExampleDropdownMenu,
        isInlineExampleCombobox,
        comboboxListItem,
        isInlineExampleComboboxBtn
    } = formContainerPage;

    beforeAll(async () => {
        await formContainerPage.open();
    }, 1);

    describe('Recommended form layouts example', () => {
        it('should check the layout matches the described layout', async () => {
            await checkLayout(recommendedExampleFormGroup);
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(recommendedExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', async () => {
            await checkAddingText(recommendedExampleTextArea);
        });

        it('should show popover when clicking ? icon', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await checkHelpPopover(recommendedExampleHelpIcon);
        });
    });

    describe('Possible form layouts example', () => {
        it('should check the layout matches the described layout', async () => {
            await checkLayout(possibleExampleFormGroup);
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(possibleExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', async () => {
            await checkAddingText(possibleExampleTextArea);
        });

        it('should show popover when clicking ? icon', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await checkHelpPopover(possibleExampleHelpIcon);
        });
    });

    describe('Not recommended form layouts example', () => {
        it('should check the layout matches the described layout', async () => {
            await checkLayout(notRecommendedExampleFormGroup);
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(notRecommendedExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', async () => {
            await checkAddingText(notRecommendedExampleTextArea);
        });

        it('should show popover when clicking ? icon', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await checkHelpPopover(notRecommendedExampleHelpIcon);
        });
    });

    describe('Complex form example', () => {
        it('should check the layout matches the described layout', async () => {
            await checkLayout(complexExampleFormGroup);
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(complexExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', async () => {
            await checkAddingText(complexExampleTextArea);
        });

        it('should show popover when clicking ? icon', async () => {
            if (await browserIsSafari()) {
                // mouse hover method not working correctly on Safari
                return;
            }
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await checkHelpPopover(complexExampleHelpIcon);
        });

        it('should check step input error validation message', async () => {
            await scrollIntoView(complexExampleInputGroup);
            await click(complexExampleInputGroup);
            await click(complexExampleTextArea);
            await click(complexExampleInputGroup);
            await expect(await waitForPresent(popover)).toBe(true, 'error message not displayed');
            await expect((await getText(popover)).trim()).toEqual('Value is required');
        });

        it('should be able to set value in input group', async () => {
            const value = '12.50';

            await click(complexExampleInputGroup);
            await clearValue(complexExampleInputGroup);
            await setValue(complexExampleInputGroup, value);
            await click(complexExampleSubmitBtn);

            await expect(await getValue(complexExampleInputGroup)).toEqual(value);
        });

        it('should be able to select radio group buttons', async () => {
            const buttonCount = await getElementArrayLength(complexExampleRadioBtn);

            for (let i = 0; i < buttonCount; i++) {
                await click(complexExampleRadioBtnLabel, i);
                await expect(await getAttributeByName(complexExampleRadioBtn, 'aria-checked', i)).toBe(
                    'true',
                    `button ${i} not selected`
                );
            }
        });

        it('should be able to set value in step input', async () => {
            const value = '10.6';

            await scrollIntoView(complexExampleStepInput);
            await click(complexExampleStepInput);
            await sendKeys('Delete');
            await setValue(complexExampleStepInput, value);

            await expect(await getValue(complexExampleStepInput)).toEqual(value);
        });

        it('should be able to change value of step input with increase/decrease buttons', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await click(complexExampleStepInputBtn);

            await expect(await getValue(complexExampleStepInput)).toEqual('-1');
            await click(complexExampleStepInputBtn, 1);

            await expect(await getValue(complexExampleStepInput)).toEqual('0');
        });

        it('should check switch is clickable', async () => {
            await expect(await isElementClickable(complexExampleSwitch)).toBe(true, 'switch is not clickable');
        });
    });

    describe('Column Binding example', () => {
        it('should be able to add text to the textarea', async () => {
            await checkAddingText(columnExampleTextArea);
        });
    });

    describe('Form Field Group example', () => {
        it('should be able to add text to the textarea', async () => {
            await checkAddingText(formExampleTextArea);
        });

        it('should check switch is clickable', async () => {
            await expect(await isElementClickable(formExampleSwitch)).toBe(true, 'switch is not clickable');
        });

        it('should show popover when clicking ? icon', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await checkHelpPopover(formExampleHelpIcon);
        });
    });

    describe('Change of column number for a field example', () => {
        it('should be able to add text to the textarea', async () => {
            await checkAddingText(changeExampleTextArea);
        });

        it('should check the tooltip message matches the textarea label', async () => {
            if (await browserIsSafari()) {
                // mouse hover not working correctly in Safari
                return;
            }
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            const labelCount = await getElementArrayLength(changeExampleTextAreaLabel);

            for (let i = 0; i < labelCount; i++) {
                const labelText = await getText(changeExampleTextAreaLabel, i);
                await scrollIntoView(changeExampleHelpIcon, i);
                await click(changeExampleHelpIcon, i);
                await waitForElDisplayed(popover);

                await expect((await getText(popover)).toLowerCase()).toEqual(labelText.toLowerCase());
            }
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(changeExampleCheckboxLabel);
        });
    });

    describe('Change of isInline value for a field example', () => {
        it('should be able to add text to the textarea', async () => {
            await checkAddingText(isInlineExampleTextArea);
        });

        it('should be able to mark checkboxes', async () => {
            await markAllCheckboxes(isInlineExampleCheckboxLabel);
        });

        it('should be able to mark radio buttons', async () => {
            const buttonCount = await getElementArrayLength(isInlineExampleRadioBtn);

            for (let i = 0; i < buttonCount; i++) {
                await click(isInlineExampleRadioBtnLabel, i);
                await expect(await getAttributeByName(isInlineExampleRadioBtn, 'aria-checked', i)).toBe(
                    'true',
                    `button ${i} not marked`
                );
            }
        });

        it('should be able to select an option from the dropdown menu', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await click(isInlineExampleDropdownMenu);
            await waitForElDisplayed(dropdownOption);
            const optionText = await getText(dropdownOption);

            await click(dropdownOption);
            await expect(await getText(isInlineExampleDropdownMenu)).toEqual(optionText);
        });

        it('should be able to type option in combobox field', async () => {
            const appleText = 'Apple';
            await click(isInlineExampleCombobox);
            await sendKeys(appleText);

            await expect(await isElementDisplayed(comboboxListItem)).toBe(true, 'result not displayed');
            await expect(await getText(comboboxListItem)).toEqual(appleText);
        });

        it('should be able to select option in combobox field', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);
            await click(isInlineExampleComboboxBtn);
            await waitForElDisplayed(comboboxListItem);
            const firstOption = await getText(comboboxListItem);
            await click(comboboxListItem);

            await expect(await getValue(isInlineExampleCombobox)).toEqual(firstOption);
        });

        it('should show popover when clicking ? icon', async () => {
            await refreshPage();
            await waitForPresent(formContainerPage.title);

            const iconLength = await getElementArrayLength(isInlineExampleHelpIcon);

            for (let i = 0; i < iconLength; i++) {
                await scrollIntoView(isInlineExampleHelpIcon, i);
                await click(isInlineExampleHelpIcon, i);

                await expect(await waitForPresent(popover)).toBe(true, `tooltip for icon ${i} not displayed`);
                await expect(['', null, undefined]).not.toContain(await getText(popover));
            }
        });
    });

    async function checkLayout(selector: string): Promise<void> {
        const headerCount = await getElementArrayLength(selector);

        for (let i = 0; i < headerCount; i++) {
            const describedLayout = await getAttributeByName(selector, 'maintitle', i);
            const formLayout = await getAttributeByName(selector, 'columnlayout', i);

            await expect(formLayout).toEqual(describedLayout);
        }
    }

    async function markAllCheckboxes(selector: string): Promise<void> {
        const checkboxCount = await getElementArrayLength(selector);

        for (let i = 0; i < checkboxCount; i++) {
            await scrollIntoView(selector, i);
            await click(selector, i);
            await expect([null, '', undefined]).not.toContain(await executeScriptBeforeTagAttr(selector, 'content', i));
        }
    }

    async function checkAddingText(selector: string): Promise<void> {
        const textAreaLength = await getElementArrayLength(selector);

        for (let i = 0; i < textAreaLength; i++) {
            const text = await getRandomString(50);

            await scrollIntoView(selector, i);
            await click(selector, i);
            await setValue(selector, text, i);

            await expect(await getValue(selector, i)).toEqual(text);
        }
    }

    async function checkHelpPopover(selector: string): Promise<void> {
        const iconLength = await getElementArrayLength(selector);

        for (let i = 0; i < iconLength; i++) {
            await scrollIntoView(selector, i);
            await click(selector, i);

            await expect(await waitForPresent(popover)).toBe(true, `tooltip for icon ${i} not displayed`);
            await expect(['This is tooltip help', 'This is tooltip to help']).toContain(await getText(popover));
        }
    }
});
