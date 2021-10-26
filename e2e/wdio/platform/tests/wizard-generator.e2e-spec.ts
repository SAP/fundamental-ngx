import { WizardGeneratorPO } from '../pages/wizard-generator.po';
import {
    browserIsFirefox,
    click,
    currentPlatformName,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '../../driver/wdio';
import { firstAdress, secondAdress, name, cardDetails, cardDetails2 } from '../fixtures/testData/wizard-generator';

describe('Wizard generator test suite', () => {
    const WizardGeneratorPage = new WizardGeneratorPO();
    const {
        defaultExample,
        customizableGeneratorExample,
        externalNavigationExample,
        visibleSummaryExample,
        responsiveExample,
        summaryObjectsExample,
        onChangeExample,
        dialogExample,
        customizableDialogExample,
        branchingExample,
        responsiveDialogExample,
        step,
        stepContainer,
        select,
        button,
        listItem,
        nextStepBtn,
        listItemText,
        input,
        formLabel,
        editButton,
        nextStepBtn2,
        checkboxLabel,
        checkbox,
        dialog,
        dialogBarButton,
        selectControl
    } = WizardGeneratorPage;

    beforeAll(() => {
        WizardGeneratorPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(WizardGeneratorPage.title);
    }, 1);

    describe('Default example', () => {
        it('Basic way', () => {
            checkBasicWay(defaultExample);
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(defaultExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(defaultExample);
        });

        it('should check navigation by scrolling', () => {
            checkNavigationByScrolling(defaultExample);
        });
    });

    describe('responsive example', () => {
        it('should check basic way', () => {
            checkBasicWay(responsiveExample);
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(responsiveExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(responsiveExample);
        });

        it('should check navigation by scrolling', () => {
            checkNavigationByScrolling(responsiveExample);
        });
    });

    describe('visible summary example', () => {
        // skipped for FF on macOS due to https://github.com/SAP/fundamental-ngx/issues/7038
        it('should check basic way for visible summary example', () => {
            if (!browserIsFirefox() && currentPlatformName() !== 'macOs') {
                checkBasicWay(visibleSummaryExample);
            }
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(visibleSummaryExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(visibleSummaryExample);
        });

        it('should check navigation by scrolling', () => {
            // skipped for FF on Windows due to https://github.com/SAP/fundamental-ngx/issues/7046
            if (!browserIsFirefox() && currentPlatformName() !== 'Windows') {
                checkNavigationByScrolling(visibleSummaryExample);
            }
        });
    });

    describe('external navigation example', () => {
        it('should check basic way', () => {
            checkBasicWay(externalNavigationExample);
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(externalNavigationExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(externalNavigationExample);
        });
    });

    describe('customizable example', () => {
        it('should check basic way', () => {
            checkBasicWay(customizableGeneratorExample);
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(customizableGeneratorExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(customizableGeneratorExample);
        });
    });

    describe('summary object example', () => {
        it('should check basic way', () => {
            checkBasicWay(summaryObjectsExample);
        });

        it('should check validation required elements', () => {
            checkValidationRequiredFields(summaryObjectsExample);
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(summaryObjectsExample);
        });

        it('should check navigation by scrolling', () => {
            // skipped for FF on Windows due to https://github.com/SAP/fundamental-ngx/issues/7046
            if (!browserIsFirefox() && currentPlatformName() !== 'Windows') {
                checkNavigationByScrolling(summaryObjectsExample);
            }
        });
    });

    describe('On change example', () => {
        it('should check basic way', () => {
            scrollIntoView(onChangeExample);
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            expect(getElementClass(onChangeExample + step, 1)).toContain('current', 'you not moved to second step');
            expect(getElementClass(onChangeExample + step, 0)).toContain('completed', 'first step not completed');
            const defaultValue = getValue(onChangeExample + input, 1);
            click(onChangeExample + nextStepBtn, 1);
            expect(getText(onChangeExample + formLabel, 0)).toEqual(name, 'value is not equal entered value');
            expect(getText(onChangeExample + formLabel, 1)).toEqual(defaultValue, 'value is not equal entered value');
            click(onChangeExample + editButton);
            setValue(onChangeExample + input, cardDetails2);
            click(onChangeExample + nextStepBtn);
            expect(getText(onChangeExample + formLabel, 0)).toEqual(cardDetails2, 'value is not equal changed value');
        });

        it('should check required fields validation', () => {
            scrollIntoView(onChangeExample);
            click(onChangeExample + nextStepBtn);
            expect(getElementClass(onChangeExample + input)).toContain('error', 'error is not appeared');
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            // clear default value
            const inputValue = getValue(onChangeExample + input, 1);
            click(onChangeExample + input, 1);
            for (let i = 0; i < inputValue.length; i++) {
                sendKeys('Backspace');
            }
            expect(getElementClass(onChangeExample + input, 1)).toContain('error', 'error is not appeared');
        });

        it('should check default value from first input', () => {
            scrollIntoView(onChangeExample);
            setValue(onChangeExample + input, name);
            click(onChangeExample + nextStepBtn);
            expect(getValue(onChangeExample + input, 1)).toEqual(
                name + '-repo',
                'value is not equal entered value + default additional string'
            );
        });

        it('should check navigation by steps', () => {
            checkNavigationBySteps(onChangeExample);
        });

        it('should check navigation by scrolling', () => {
            checkNavigationByScrolling(onChangeExample);
        });
    });

    describe('dialog example', () => {
        it('should check basic way', () => {
            click(dialogExample + button);
            checkBasicWay(dialog);
        });

        it('should check required fields validation', () => {
            click(dialogExample + button);
            checkValidationRequiredFields(dialog);
        });

        it('should check navigation by steps', () => {
            click(dialogExample + button);
            checkNavigationBySteps(dialog);
        });

        it('should check navigation by buttons', () => {
            checkNavigationByButtonsInDialog(dialogExample);
        });
    });

    describe('customizable dialog example', () => {
        it('should check basic way', () => {
            click(customizableDialogExample + button);
            checkBasicWay(dialog);
        });

        it('should check required fields validation', () => {
            click(customizableDialogExample + button);
            checkValidationRequiredFields(dialog);
        });

        it('should check navigation by steps', () => {
            click(customizableDialogExample + button);
            checkNavigationBySteps(dialog);
        });

        it('should check navigation by buttons', () => {
            checkNavigationByButtonsInDialog(customizableDialogExample);
        });
    });

    describe('condition dialog example', () => {
        it('should check basic way', () => {
            click(branchingExample + button);
            click(dialog + select);
            const productType = getText(listItemText);
            click(listItem);
            click(dialog + nextStepBtn2);

            expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
            expect(getElementClass(dialog + step, 1)).toContain('current', 'you not moved to second step');
            setValue(dialog + input, name);
            setValue(dialog + input, firstAdress, 1);
            setValue(dialog + input, secondAdress, 2);
            click(dialog + nextStepBtn2);
            expect(getElementClass(dialog + step, 1)).toContain('completed', 'second step is not completed');
            expect(getElementClass(dialog + step, 2)).toContain('current', 'you not moved to third step');
            click(dialog + select);
            const paymentMethod = getText(listItemText);
            click(listItem);
            click(dialog + nextStepBtn2);
            setValue(dialog + input, cardDetails);
            click(dialog + nextStepBtn2);
            click(dialog + nextStepBtn2);

            expect(getText(dialog + formLabel, 0)).toBe(productType, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 1)).toBe(name, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 2)).toBe(firstAdress, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 3)).toBe(secondAdress, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 4)).toBe(paymentMethod, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 5)).toBe(cardDetails, 'value is not equal entered value');
            expect(getText(dialog + formLabel, 6)).toBe('-', 'no dash');
            click(dialog + editButton, 3);
            setValue(dialog + input, cardDetails2);
            click(dialog + nextStepBtn2);
            expect(getText(dialog + formLabel, 5)).toBe(cardDetails2, 'value is not equal changed value');
        });

        it('should check required fields validation', () => {
            click(branchingExample + button);
            click(dialog + nextStepBtn2);
            expect(getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
            click(dialog + select);
            click(listItem);
            click(dialog + nextStepBtn2);
            click(dialog + nextStepBtn2);
            expect(getElementClass(dialog + input)).toContain('error', 'error is not appeared');
            setValue(dialog + input, name);
            setValue(dialog + input, firstAdress, 1);
            click(dialog + nextStepBtn2);
            click(dialog + nextStepBtn2);
            expect(getElementClass(dialog + selectControl)).toContain('error', 'error is not appeared');
            click(dialog + select);
            click(listItem);
            click(dialog + nextStepBtn2);
            click(dialog + nextStepBtn2);
            expect(getElementClass(dialog + input)).toContain('error', 'error is not appeared');
        });

        it('should check navigation by steps', () => {
            click(branchingExample + button);
            checkNavigationBySteps(dialog);
        });

        it('should check navigation by buttons', () => {
            checkNavigationByButtonsInDialog(branchingExample);
        });
    });

    describe('responsive dialog example', () => {
        it('should check basic way', () => {
            refreshPage();
            click(responsiveDialogExample + button);
            checkBasicWay(dialog);
        });

        it('should check required fields validation', () => {
            click(responsiveDialogExample + button);
            checkValidationRequiredFields(dialog);
        });

        it('should check navigation by steps', () => {
            click(responsiveDialogExample + button);
            checkNavigationBySteps(dialog);
        });

        it('should check navigation by buttons', () => {
            checkNavigationByButtonsInDialog(responsiveDialogExample);
        });
    });

    function checkNavigationByScrolling(selector: string): void {
        scrollIntoView(selector);
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            click(selector + select);
            click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        expect(getElementClass(selector + step, 1)).toContain('current', 'second step is not current');
        expect(getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        scrollIntoView(selector + stepContainer);
        scrollIntoView(selector + step);
        expect(getElementClass(selector + step, 0)).toContain('current', 'step did not back to first');
        expect(getElementClass(selector + step, 1)).toContain('upcoming', 'step did not back to first');
    }

    function checkNavigationByButtonsInDialog(selector: string): void {
        scrollIntoView(selector);
        click(selector + button);
        click(dialog + select);
        click(listItem);
        click(dialog + nextStepBtn2);
        expect(getElementArrayLength(dialogBarButton)).toBe(3, 'back button is appeared');
        expect(getElementClass(dialog + step, 1)).toContain('current', 'second step is not current');
        expect(getElementClass(dialog + step, 0)).toContain('completed', 'first step is not completed');
        click(dialogBarButton);
        expect(getElementClass(dialog + step, 0)).toContain('current', 'step did not back to first');
        expect(getElementClass(dialog + step, 1)).toContain('upcoming', 'step did not back to first');
        expect(getElementArrayLength(dialogBarButton)).toBe(2, 'back button is not hidden');
    }

    function checkNavigationBySteps(selector: string): void {
        scrollIntoView(selector);
        expect(isElementClickable(selector + stepContainer, 1)).toBe(false, 'second step clickable but should not');
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector === onChangeExample) {
            setValue(selector + input, name);
        }
        if (selector !== summaryObjectsExample && selector !== onChangeExample) {
            click(selector + select);
            click(listItem);
        }
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        expect(getElementClass(selector + step, 1)).toContain('current', 'you not moved to second step');
        expect(getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        click(selector + stepContainer);
        expect(getElementClass(selector + step, 0)).toContain(
            'current',
            'you did not get back to first step by click on step tab'
        );
    }

    function checkValidationRequiredFields(selector: string): void {
        scrollIntoView(selector);
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        if (selector !== summaryObjectsExample) {
            expect(getElementClass(selector + selectControl)).toContain('error', 'error is not appeared');
            click(selector + select);
            click(listItem);
        }
        if (selector === summaryObjectsExample) {
            expect(getElementClass(selector + checkbox)).toContain('error', 'error is not appeared');
            click(checkboxLabel);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn);
            click(selector + nextStepBtn, 1);
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
            click(selector + nextStepBtn2);
        }
        expect(getElementClass(selector + input)).toContain('error', 'error is not appeared');
        expect(getElementClass(selector + input, 1)).toContain('error', 'error is not appeared');
        setValue(selector + input, name);
        setValue(selector + input, firstAdress, 1);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn, 1);
            click(selector + nextStepBtn, 2);
            expect(getElementClass(selector + input, 3)).toContain('error', 'error is not appeared');
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
            click(selector + nextStepBtn2);
            expect(getElementClass(selector + input)).toContain('error', 'error is not appeared');
        }
    }

    function checkBasicWay(selector: string): void {
        if (selector === summaryObjectsExample) {
            click(checkboxLabel);
        }
        if (selector !== summaryObjectsExample) {
            click(selector + select);
            const itemText = getText(listItemText);
            click(listItem);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn);
            expect(getElementClass(selector + step, 1)).toContain('current', 'you not moved to second step');
            expect(getElementClass(selector + step, 0)).toContain('completed', 'first step is not completed');
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
        }
        setValue(selector + input, name);
        setValue(selector + input, firstAdress, 1);
        setValue(selector + input, secondAdress, 2);
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            click(selector + nextStepBtn, 1);
            expect(getElementClass(selector + step, 1)).toContain('completed', 'second step is not completed');
            expect(getElementClass(selector + step, 2)).toContain('current', 'third step is not current');
        }
        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            click(selector + nextStepBtn2);
        }

        if (
            selector === externalNavigationExample ||
            selector === customizableGeneratorExample ||
            selector === dialog
        ) {
            setValue(selector + input, cardDetails);
            click(selector + nextStepBtn2);
            click(selector + nextStepBtn2);
        }
        if (
            selector !== externalNavigationExample &&
            selector !== customizableGeneratorExample &&
            selector !== dialog
        ) {
            setValue(selector + input, cardDetails, 3);
            click(selector + nextStepBtn, 2);
            click(selector + nextStepBtn, 3);
        }

        expect(getText(selector + formLabel, 1)).toBe(name, 'value is not equal entered value');
        expect(getText(selector + formLabel, 2)).toBe(firstAdress, 'value is not equal entered value');
        expect(getText(selector + formLabel, 3)).toBe(secondAdress, 'value is not equal entered value');
        expect(getText(selector + formLabel, 4)).toBe(cardDetails, 'value is not equal entered value');
        expect(getText(selector + formLabel, 5)).toBe('-', 'no dash');
        click(selector + editButton, 2);
        setValue(selector + input, cardDetails2);
        selector === externalNavigationExample || selector === customizableGeneratorExample || selector === dialog
            ? click(selector + nextStepBtn2)
            : click(selector + nextStepBtn);
        expect(getText(selector + formLabel, 4)).toBe(cardDetails2, 'current value is not equal changed value');
    }
});
