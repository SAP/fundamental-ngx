import {
    browserIsSafari,
    checkIfDisabled,
    checkNotFocused,
    checkTextValueContain,
    checkValueChanged,
    clearValue,
    click,
    clickRightMouseBtn,
    doubleClick,
    getElementArrayLength,
    getText,
    getValue,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { StepInputPo } from './step-input.po';

describe('Step input test suite', () => {
    const stepInputPage: StepInputPo = new StepInputPo();
    const {
        activeButtonIncrement,
        activeButtonDecrement,
        allInput,
        allButtonIncrement,
        allButtonDecrement,
        activeInput,
        reactiveFormInput,
        formInput,
        errorMessage,
        minMaxButtonDecrement,
        minMaxButtonIncrement,
        quantityText,
        formStatusText,
        fillInput
    } = stepInputPage;

    beforeAll(() => {
        stepInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(stepInputPage.root);
        waitForElDisplayed(stepInputPage.title);
    }, 2);

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

    it('Verify error message when entering invalid value', () => {
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

    it('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        if (browserIsSafari()) {
            return;
        }
        const arr = getElementArrayLength(activeInput);

        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            doubleClick(activeInput, i);
            sendKeys(['Backspace', 'Enter']);
            const value = getValue(activeInput, i);

            expect(['0', '0.00', '']).toContain(value);
        }
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
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

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6963
    xit('Verify increment and decrement buttons', () => {
        const arr = getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(activeInput, i);
            const defaultValue = getValue(activeInput, i);
            clickRightMouseBtn(activeButtonIncrement, i);
            expect(getValue(activeInput, i)).toEqual(defaultValue, 'value changed by clickin on right mouse button');
            clickRightMouseBtn(activeButtonDecrement, i);
            expect(getValue(activeInput, i)).toEqual(defaultValue, 'value changed by clickin on right mouse button');
        }
    });

    it('Check LTR/RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            stepInputPage.saveExampleBaselineScreenshot();
            expect(stepInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
