import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';
import {checkValueEqual, checkTextValueContain, checkValueChanged, checkFocused , checkNotFocused, checkIfDisabled} from '../../helper/assertion-helper';


export class StepInputPo extends BaseComponentPo {
    private url = '/step-input';
    root = '#page-content';

    stepInputRoot = '.fd-step-input';
    activeButtonIncrement = '//button[@title="Increment" and @aria-disabled="false" and not(ancestor::div[contains(@class, "is-readonly")])]';
    activeButtonDecrement = '//button[@title="Decrement" and @aria-disabled="false" and not(ancestor::div[contains(@class, "is-readonly")])]';
    allInput = '//input[contains(@class, "fd-step-input__input")and not (ancestor::div[contains(@class, "is-readonly")])]';
    allButtonIncrement = '//button[@title="Increment" and not(ancestor::div[contains(@class, "is-readonly")])]';
    allButtonDecrement = '//button[@title="Decrement" and not(ancestor::div[contains(@class, "is-readonly")])]';
    activeInput = '//input[contains(@class, "fd-step-input__input") and not(ancestor::div[contains(@class, "is-disabled")]) and not (ancestor::div[contains(@class, "is-readonly")])]';
    reactiveFormInput = 'input#qty';
    formInput = 'input[name=qty]'
    inputInTemplateDriverForm = 'input#number'
    errorMessage = '.is-error';
    minMaxButtonDecrement = '[ng-reflect-name="minMaxLimits"] button[title="Decrement"]';
    minMaxButtonIncrement = '[ng-reflect-name="minMaxLimits"] button[title="Increment"]';
    inputWithoutForm = '//input[contains(@class, "fd-step-input__input") and not (ancestor::div[contains(@class, "is-disabled")]) and not (@name="qty")]';
    quantityText = '.fd-page__content + pre'
    formStatusText = '.fd-page__content + pre ~ pre'

    checkIncrementDecrementButtons(): void {
        const arr = webDriver.getElementArrayLength(this.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.activeInput, i);
            const defaultValue = webDriver.getValue(this.activeInput, i);
            webDriver.click(this.activeButtonIncrement, i);
            checkValueChanged(defaultValue, webDriver.getValue(this.activeInput, i));
            const newValue = webDriver.getValue(this.activeInput, i);
            webDriver.click(this.activeButtonDecrement, i);
            checkValueChanged(newValue, webDriver.getValue(this.activeInput, i));
        }
    };

    checkStepInputComponent(): void {
        const arr = webDriver.getElementArrayLength(this.allInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.allInput, i);
            webDriver.waitForDisplayed(this.allButtonIncrement, i);
            webDriver.waitForDisplayed(this.allButtonDecrement, i);
            webDriver.waitForDisplayed(this.allInput, i);
        }
    };

    checkValueAfterTypingTheNumber(): void {
        const arr = webDriver.getElementArrayLength(this.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.activeInput, i);
            const defaultValue = webDriver.getValue(this.activeInput, i);
            webDriver.setValue(this.activeInput, '2', i);
            checkValueChanged(defaultValue, webDriver.getValue(this.activeInput, i));
            const newValue = webDriver.getValue(this.activeInput, i);
            webDriver.setValue(this.activeInput, '1', i);
            checkValueChanged(newValue, webDriver.getValue(this.activeInput, i));
        }
    };

    checkValueAfterEnteringByKeyboardButtons(): void {
        const arr = webDriver.getElementArrayLength(this.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.activeInput, i);
            const defaultValue = webDriver.getValue(this.activeInput, i);
            webDriver.click(this.activeInput, i);
            driver.keys(['ArrowDown']);
            driver.keys(['Enter']);
            checkValueChanged(defaultValue, webDriver.getValue(this.activeInput, i));
            const newValue = webDriver.getValue(this.activeInput, i);
            webDriver.click(this.activeInput, i);
            driver.keys(['ArrowUp']);
            driver.keys(['Enter']);
            checkValueChanged(newValue, webDriver.getValue(this.activeInput, i));
        }
    };

    checkInvalidInput(input: string): void {
        webDriver.scrollIntoView(input);
        webDriver.clearValue(input);
        webDriver.setValue(input, 'invalid');
        driver.keys(['Enter']);
        webDriver.waitForDisplayed(this.errorMessage);
        let formStatusText = webDriver.getText(this.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')

        webDriver.clearValue(input);
        webDriver.setValue(input, '10'); // reset value to remove error message
        driver.keys(['Enter']);
        webDriver.waitForNotDisplayed(this.errorMessage);
        formStatusText = webDriver.getText(this.formStatusText)
        checkTextValueContain(formStatusText, 'VALID')

        webDriver.clearValue(input);
        webDriver.setValue(input, '5');
        driver.keys(['Enter']);
        webDriver.waitForDisplayed(this.errorMessage);
        formStatusText = webDriver.getText(this.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')

        webDriver.clearValue(input);
        webDriver.setValue(input, '25'); // reset value to remove error message
        driver.keys(['Enter']);
        webDriver.waitForDisplayed(this.errorMessage);
        formStatusText = webDriver.getText(this.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')
    }

    checkFocusOnInputAfterClickingButtons(): void {
        const arr = webDriver.getElementArrayLength(this.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.activeInput, i);
            webDriver.click(this.activeButtonIncrement, i);
            checkNotFocused(this.activeInput, i)
        }
    }

    checkValueAfterClearingTheInput(): void {
        const arr = webDriver.getElementArrayLength(this.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(this.activeInput, i);
            webDriver.click(this.activeInput, i);
            webDriver.clearValue(this.activeInput, i);
            const value = webDriver.getValue(this.activeInput, i);
            checkValueEqual(value, '0');
        }
    }

    checkIncreaseDecreaseButtonIsDisabledWithMaxValue(): void {
        webDriver.scrollIntoView(this.minMaxButtonIncrement);
        for (let i = 0; i < 20; i++) {
            webDriver.click(this.minMaxButtonIncrement);
        }
        checkIfDisabled(this.minMaxButtonIncrement, 'aria-disabled', 'true')

        for (let i = 0; i < 40; i++) {
            webDriver.click(this.minMaxButtonDecrement);
        }
        checkIfDisabled(this.minMaxButtonDecrement, 'aria-disabled', 'true')
    }

    checkInputFocusedAfterClickingTabButton(): void {
        const arr = webDriver.getElementArrayLength(this.inputWithoutForm);
        webDriver.click(this.inputWithoutForm);
        checkFocused(this.inputWithoutForm)
        for (let i = 1; i < arr; i++) {
            webDriver.scrollIntoView(this.inputWithoutForm, i);
            driver.keys(['Tab']);
            checkFocused(this.inputWithoutForm, i)
        }
    }

    checkQuantity(): void {
        const arr = webDriver.getElementArrayLength(this.formInput);
        for (let i = 1; i < arr; i++) {
            webDriver.scrollIntoView(this.formInput, i);
            webDriver.clearValue(this.formInput, i);
            webDriver.setValue(this.formInput, '10', i);
            const quantity = webDriver.getText(this.quantityText, i)
            checkTextValueContain(quantity, '10')
        }
    }

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }
}

