import {
    clearValue,
    click,
    getElementArrayLength, getText,
    getValue,
    refreshPage,
    scrollIntoView, sendKeys, setValue,
    waitForElDisplayed, waitForPresent
} from '../../driver/wdio';
import { StepInputPo } from '../pages/step-input.po';
import {
    checkFocused,
    checkIfDisabled,
    checkNotFocused,
    checkTextValueContain,
    checkValueChanged
} from '../../helper/assertion-helper';

describe('Step input test suite', function() {
    const stepInputPage: StepInputPo = new StepInputPo();

    beforeAll(() => {
        stepInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(stepInputPage.stepInputRoot);
    }, 1);

    it('Verify increment and decrement buttons', () => {
        const arr = getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.activeInput, i);
            let value = getValue(stepInputPage.activeInput, i);
            click(stepInputPage.activeButtonIncrement, i);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
            value = getValue(stepInputPage.activeInput, i);
            click(stepInputPage.activeButtonDecrement, i);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
        }
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', () => {
        const arr = getElementArrayLength(stepInputPage.allInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.allInput, i);
            waitForElDisplayed(stepInputPage.allButtonIncrement, i);
            waitForElDisplayed(stepInputPage.allButtonDecrement, i);
            waitForElDisplayed(stepInputPage.allInput, i);
        }
    });

    it('Verify The user changes the value: By typing a number', () => {
        const arr = getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.activeInput, i);
            let value = getValue(stepInputPage.activeInput, i);
            setValue(stepInputPage.activeInput, '2', i);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
            value = getValue(stepInputPage.activeInput, i);
            setValue(stepInputPage.activeInput, '1', i);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
        }
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', () => {
        const arr = getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.activeInput, i);
            let value = getValue(stepInputPage.activeInput, i);
            click(stepInputPage.activeInput, i);
            sendKeys(['ArrowDown']);
            sendKeys(['Enter']);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
            value = getValue(stepInputPage.activeInput, i);
            click(stepInputPage.activeInput, i);
            sendKeys(['ArrowUp']);
            sendKeys(['Enter']);
            checkValueChanged(value, getValue(stepInputPage.activeInput, i));
        }
    });

    xit('Verify error message when entering invalid value', () => {
        scrollIntoView(stepInputPage.reactiveFormInput);
        stepInputPage.fillInput(stepInputPage.reactiveFormInput, 'invalid');
        waitForElDisplayed(stepInputPage.errorMessage);
        let formStatusText = getText(stepInputPage.formStatusText);
        checkTextValueContain(formStatusText, 'INVALID');

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '10');
        expect(stepInputPage.errorMessage).not.toBeVisible();
        formStatusText = getText(stepInputPage.formStatusText);
        checkTextValueContain(formStatusText, 'VALID');

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '5');
        waitForElDisplayed(stepInputPage.errorMessage);
        formStatusText = getText(stepInputPage.formStatusText);
        checkTextValueContain(formStatusText, 'INVALID');

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '25');
        browser.pause(500);
        waitForElDisplayed(stepInputPage.errorMessage);
        formStatusText = getText(stepInputPage.formStatusText);
        checkTextValueContain(formStatusText, 'INVALID');
    });

    it('Verify clicking the buttons does not place the caret in the input field.', () => {
        const arr = getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.activeInput, i);
            click(stepInputPage.activeButtonIncrement, i);
            checkNotFocused(stepInputPage.activeInput, i);
        }
    });

    // Need to debug on different browsers
    xit('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        const arr = getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(stepInputPage.activeInput, i);
            click(stepInputPage.activeInput, i);
            clearValue(stepInputPage.activeInput, i);
            const value = getValue(stepInputPage.activeInput, i);
            expect(value).toEqual('0');
        }
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
        scrollIntoView(stepInputPage.minMaxButtonIncrement);
        for (let i = 0; i < 20; i++) {
            click(stepInputPage.minMaxButtonIncrement);
        }
        checkIfDisabled(stepInputPage.minMaxButtonIncrement, 'aria-disabled', 'true');

        for (let i = 0; i < 40; i++) {
            click(stepInputPage.minMaxButtonDecrement);
        }
        checkIfDisabled(stepInputPage.minMaxButtonDecrement, 'aria-disabled', 'true');
    });

    xit('Verify when user enter the tap step input field should be highlighted or focused ', () => {
        const arr = getElementArrayLength(stepInputPage.inputWithoutForm);
        click(stepInputPage.inputWithoutForm);
        checkFocused(stepInputPage.inputWithoutForm);
        for (let i = 1; i < arr; i++) {
            scrollIntoView(stepInputPage.inputWithoutForm, i);
            sendKeys(['Tab']);
            checkFocused(stepInputPage.inputWithoutForm, i);
        }
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', () => {
        const arr = getElementArrayLength(stepInputPage.formInput);
        for (let i = 1; i < arr; i++) {
            scrollIntoView(stepInputPage.formInput, i);
            clearValue(stepInputPage.formInput, i);
            setValue(stepInputPage.formInput, '10', i);
            const quantity = getText(stepInputPage.quantityText, i);
            checkTextValueContain(quantity, '10');
        }
    });

    it('Check LTR/RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    });
});
