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

    beforeAll(() => {
        formContainerPage.open();
    }, 1);

    describe('Recommended form layouts example', () => {
        it('should check the layout matches the described layout', () => {
            checkLayout(recommendedExampleFormGroup);
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(recommendedExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', () => {
            checkAddingText(recommendedExampleTextArea);
        });

        it('should show popover when clicking ? icon', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            checkHelpPopover(recommendedExampleHelpIcon);
        });
    });

    describe('Possible form layouts example', () => {
        it('should check the layout matches the described layout', () => {
            checkLayout(possibleExampleFormGroup);
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(possibleExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', () => {
            checkAddingText(possibleExampleTextArea);
        });

        it('should show popover when clicking ? icon', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            checkHelpPopover(possibleExampleHelpIcon);
        });
    });

    describe('Not recommended form layouts example', () => {
        it('should check the layout matches the described layout', () => {
            checkLayout(notRecommendedExampleFormGroup);
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(notRecommendedExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', () => {
            checkAddingText(notRecommendedExampleTextArea);
        });

        it('should show popover when clicking ? icon', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            checkHelpPopover(notRecommendedExampleHelpIcon);
        });
    });

    describe('Complex form example', () => {
        it('should check the layout matches the described layout', () => {
            checkLayout(complexExampleFormGroup);
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(complexExampleCheckboxLabel);
        });

        it('should be able to add text in the textareas', () => {
            checkAddingText(complexExampleTextArea);
        });

        it('should show popover when clicking ? icon', () => {
            if (browserIsSafari()) {
                // mouse hover method not working correctly on Safari
                return;
            }
            refreshPage();
            waitForPresent(formContainerPage.title);
            checkHelpPopover(complexExampleHelpIcon);
        });

        it('should check step input error validation message', () => {
            scrollIntoView(complexExampleInputGroup);
            click(complexExampleInputGroup);
            click(complexExampleTextArea);
            click(complexExampleInputGroup);
            expect(waitForPresent(popover)).toBe(true, 'error message not displayed');
            expect(getText(popover).trim()).toEqual('Value is required');
        });

        it('should be able to set value in input group', () => {
            const value = '12.50';

            click(complexExampleInputGroup);
            clearValue(complexExampleInputGroup);
            setValue(complexExampleInputGroup, value);
            click(complexExampleSubmitBtn);

            expect(getValue(complexExampleInputGroup)).toEqual(value);
        });

        it('should be able to select radio group buttons', () => {
            const buttonCount = getElementArrayLength(complexExampleRadioBtn);

            for (let i = 0; i < buttonCount; i++) {
                click(complexExampleRadioBtnLabel, i);
                expect(getAttributeByName(complexExampleRadioBtn, 'aria-checked', i)).toBe(
                    'true',
                    `button ${i} not selected`
                );
            }
        });

        it('should be able to set value in step input', () => {
            const value = '10.6';

            scrollIntoView(complexExampleStepInput);
            click(complexExampleStepInput);
            sendKeys('Delete');
            setValue(complexExampleStepInput, value);

            expect(getValue(complexExampleStepInput)).toEqual(value);
        });

        it('should be able to change value of step input with increase/decrease buttons', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            click(complexExampleStepInputBtn);

            expect(getValue(complexExampleStepInput)).toEqual('-1');
            click(complexExampleStepInputBtn, 1);

            expect(getValue(complexExampleStepInput)).toEqual('0');
        });

        it('should check switch is clickable', () => {
            expect(isElementClickable(complexExampleSwitch)).toBe(true, 'switch is not clickable');
        });
    });

    describe('Column Binding example', () => {
        it('should be able to add text to the textarea', () => {
            checkAddingText(columnExampleTextArea);
        });
    });

    describe('Form Field Group example', () => {
        it('should be able to add text to the textarea', () => {
            checkAddingText(formExampleTextArea);
        });

        it('should check switch is clickable', () => {
            expect(isElementClickable(formExampleSwitch)).toBe(true, 'switch is not clickable');
        });

        it('should show popover when clicking ? icon', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            checkHelpPopover(formExampleHelpIcon);
        });
    });

    describe('Change of column number for a field example', () => {
        it('should be able to add text to the textarea', () => {
            checkAddingText(changeExampleTextArea);
        });

        it('should check the tooltip message matches the textarea label', () => {
            if (browserIsSafari()) {
                // mouse hover not working correctly in Safari
                return;
            }
            refreshPage();
            waitForPresent(formContainerPage.title);
            const labelCount = getElementArrayLength(changeExampleTextAreaLabel);

            for (let i = 0; i < labelCount; i++) {
                const labelText = getText(changeExampleTextAreaLabel, i);
                scrollIntoView(changeExampleHelpIcon, i);
                click(changeExampleHelpIcon, i);
                waitForElDisplayed(popover);

                expect(getText(popover).toLowerCase()).toEqual(labelText.toLowerCase());
            }
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(changeExampleCheckboxLabel);
        });
    });

    describe('Change of isInline value for a field example', () => {
        it('should be able to add text to the textarea', () => {
            checkAddingText(isInlineExampleTextArea);
        });

        it('should be able to mark checkboxes', () => {
            markAllCheckboxes(isInlineExampleCheckboxLabel);
        });

        it('should be able to mark radio buttons', () => {
            const buttonCount = getElementArrayLength(isInlineExampleRadioBtn);

            for (let i = 0; i < buttonCount; i++) {
                click(isInlineExampleRadioBtnLabel, i);
                expect(getAttributeByName(isInlineExampleRadioBtn, 'aria-checked', i)).toBe(
                    'true',
                    `button ${i} not marked`
                );
            }
        });

        it('should be able to select an option from the dropdown menu', () => {
            if (browserIsSafari()) {
                return;
            }
            click(isInlineExampleDropdownMenu);
            waitForElDisplayed(dropdownOption);
            const optionText = getText(dropdownOption);

            click(dropdownOption);
            expect(getText(isInlineExampleDropdownMenu)).toEqual(optionText);
        });

        it('should be able to type option in combobox field', () => {
            const appleText = 'Apple';
            click(isInlineExampleCombobox);
            sendKeys(appleText);

            expect(isElementDisplayed(comboboxListItem)).toBe(true, 'result not displayed');
            expect(getText(comboboxListItem)).toEqual(appleText);
        });

        it('should be able to select option in combobox field', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);
            click(isInlineExampleComboboxBtn);
            waitForElDisplayed(comboboxListItem);
            const firstOption = getText(comboboxListItem);
            click(comboboxListItem);

            expect(getValue(isInlineExampleCombobox)).toEqual(firstOption);
        });

        it('should show popover when clicking ? icon', () => {
            refreshPage();
            waitForPresent(formContainerPage.title);

            const iconLength = getElementArrayLength(isInlineExampleHelpIcon);

            for (let i = 0; i < iconLength; i++) {
                scrollIntoView(isInlineExampleHelpIcon, i);
                click(isInlineExampleHelpIcon, i);

                expect(waitForPresent(popover)).toBe(true, `tooltip for icon ${i} not displayed`);
                expect(['', null, undefined]).not.toContain(getText(popover));
            }
        });
    });

    function checkLayout(selector: string): void {
        const headerCount = getElementArrayLength(selector);

        for (let i = 0; i < headerCount; i++) {
            const describedLayout = getAttributeByName(selector, 'maintitle', i);
            const formLayout = getAttributeByName(selector, 'columnlayout', i);

            expect(formLayout).toEqual(describedLayout);
        }
    }

    function markAllCheckboxes(selector: string): void {
        const checkboxCount = getElementArrayLength(selector);

        for (let i = 0; i < checkboxCount; i++) {
            scrollIntoView(selector, i);
            click(selector, i);
            expect([null, '', undefined]).not.toContain(executeScriptBeforeTagAttr(selector, 'content', i));
        }
    }

    function checkAddingText(selector: string): void {
        const textAreaLength = getElementArrayLength(selector);

        for (let i = 0; i < textAreaLength; i++) {
            const text = getRandomString(50);

            scrollIntoView(selector, i);
            click(selector, i);
            setValue(selector, text, i);

            expect(getValue(selector, i)).toEqual(text);
        }
    }

    function checkHelpPopover(selector: string): void {
        const iconLength = getElementArrayLength(selector);

        for (let i = 0; i < iconLength; i++) {
            scrollIntoView(selector, i);
            click(selector, i);

            expect(waitForPresent(popover)).toBe(true, `tooltip for icon ${i} not displayed`);
            expect(['This is tooltip help', 'This is tooltip to help']).toContain(getText(popover));
        }
    }
});
