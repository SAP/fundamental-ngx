import {
    clearValue,
    click,
    getElementArrayLength,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
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
    const {
        stepInputRoot, activeButtonIncrement, activeButtonDecrement, allInput, allButtonIncrement, allButtonDecrement,
        activeInput, reactiveFormInput, formInput, errorMessage, minMaxButtonDecrement,
        minMaxButtonIncrement, inputWithoutForm, quantityText, formStatusText, fillInput
    } = stepInputPage;

    beforeAll(() => {
        stepInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(stepInputRoot);
    }, 1);

    it('Verify increment and decrement buttons', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            let value = getValue(activeInput, i);
            click(activeButtonIncrement, i);
            checkValueChanged(value, getValue(activeInput, i));
            value = getValue(activeInput, i);
            click(activeButtonDecrement, i);
            checkValueChanged(value, getValue(activeInput, i));
        }
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', () => {
        const arr = getElementArrayLength(allInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(allInput, i);
            waitForElDisplayed(allButtonIncrement, i);
            waitForElDisplayed(allButtonDecrement, i);
            waitForElDisplayed(allInput, i);
        }
    });

    it('Verify The user changes the value: By typing a number', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            let value = getValue(activeInput, i);
            setValue(activeInput, '2', i);
            checkValueChanged(value, getValue(activeInput, i));
            value = getValue(activeInput, i);
            setValue(activeInput, '1', i);
            checkValueChanged(value, getValue(activeInput, i));
        }
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            let value = getValue(activeInput, i);
            click(activeInput, i);
            sendKeys(['ArrowDown']);
            sendKeys(['Enter']);
            checkValueChanged(value, getValue(activeInput, i));
            value = getValue(activeInput, i);
            click(activeInput, i);
            sendKeys(['ArrowUp']);
            sendKeys(['Enter']);
            checkValueChanged(value, getValue(activeInput, i));
        }
    });

    xit('Verify error message when entering invalid value', () => {
        scrollIntoView(reactiveFormInput);
        fillInput(reactiveFormInput, 'invalid');
        waitForElDisplayed(errorMessage);
        let statusText = getText(formStatusText);
        checkTextValueContain(statusText, 'INVALID');

        fillInput(reactiveFormInput, '10');
        expect(errorMessage).not.toBeVisible();
        statusText = getText(formStatusText);
        checkTextValueContain(statusText, 'VALID');

        fillInput(reactiveFormInput, '5');
        waitForElDisplayed(errorMessage);
        statusText = getText(formStatusText);
        checkTextValueContain(statusText, 'INVALID');

        fillInput(reactiveFormInput, '25');
        browser.pause(500);
        waitForElDisplayed(errorMessage);
        statusText = getText(stepInputPage.formStatusText);
        checkTextValueContain(statusText, 'INVALID');
    });

    it('Verify clicking the buttons does not place the caret in the input field.', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            click(activeButtonIncrement, i);
            checkNotFocused(activeInput, i);
        }
    });

    // Need to debug on different browsers
    xit('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            click(activeInput, i);
            clearValue(activeInput, i);
            const value = getValue(activeInput, i);
            expect(value).toEqual('0');
        }
    });

    xit('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
        scrollIntoView(minMaxButtonIncrement);
        for (let i = 0; i < 20; i++) {
            click(minMaxButtonIncrement);
        }
        checkIfDisabled(minMaxButtonIncrement, 'aria-disabled', 'true');

        for (let i = 0; i < 40; i++) {
            click(minMaxButtonDecrement);
        }
        checkIfDisabled(minMaxButtonDecrement, 'aria-disabled', 'true');
    });

    xit('Verify when user enter the tap step input field should be highlighted or focused ', () => {
        const arr = getElementArrayLength(inputWithoutForm);
        click(inputWithoutForm);
        checkFocused(inputWithoutForm);
        for (let i = 1; i < arr; i++) {
            scrollIntoView(inputWithoutForm, i);
            sendKeys(['Tab']);
            checkFocused(inputWithoutForm, i);
        }
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', () => {
        const arr = getElementArrayLength(formInput);
        for (let i = 1; i < arr; i++) {
            scrollIntoView(formInput, i);
            clearValue(formInput, i);
            setValue(formInput, '10', i);
            const quantity = getText(quantityText, i);
            checkTextValueContain(quantity, '10');
        }
    });

    it('Check LTR/RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            stepInputPage.saveExampleBaselineScreenshot();
            expect(stepInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
