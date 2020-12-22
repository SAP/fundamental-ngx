import { webDriver } from '../../driver/wdio';
import {StepInputPo} from '../pages/step-input.po'
import {
    checkFocused,
    checkIfDisabled,
    checkNotFocused,
    checkTextValueContain,
    checkValueChanged,
} from '../../helper/assertion-helper';

describe('Step input test suite', function() {
    const stepInputPage: StepInputPo = new StepInputPo();

    beforeAll(() => {
        stepInputPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify increment and decrement buttons', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.activeInput, i);
            let value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeButtonIncrement, i);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
            value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeButtonDecrement, i);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
        }
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.allInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.allInput, i);
            webDriver.waitForDisplayed(stepInputPage.allButtonIncrement, i);
            webDriver.waitForDisplayed(stepInputPage.allButtonDecrement, i);
            webDriver.waitForDisplayed(stepInputPage.allInput, i);
        }
    });

    it('Verify The user changes the value: By typing a number', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.activeInput, i);
            let value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.setValue(stepInputPage.activeInput, '2', i);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
            value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.setValue(stepInputPage.activeInput, '1', i);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
        }
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.activeInput, i);
            let value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeInput, i);
            webDriver.sendKeys(['ArrowDown']);
            webDriver.sendKeys(['Enter']);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
            value = webDriver.getValue(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeInput, i);
            webDriver.sendKeys(['ArrowUp']);
            webDriver.sendKeys(['Enter']);
            checkValueChanged(value, webDriver.getValue(stepInputPage.activeInput, i));
        }
    });

    it('Verify error message when entering invalid value', () => {
        webDriver.scrollIntoView(stepInputPage.reactiveFormInput);
        stepInputPage.fillInput(stepInputPage.reactiveFormInput, 'invalid')
        webDriver.waitForDisplayed(stepInputPage.errorMessage);
        let formStatusText = webDriver.getText(stepInputPage.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '10')
        expect(stepInputPage.errorMessage).not.toBeVisible();
        formStatusText = webDriver.getText(stepInputPage.formStatusText)
        checkTextValueContain(formStatusText, 'VALID')

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '5')
        webDriver.waitForDisplayed(stepInputPage.errorMessage);
        formStatusText = webDriver.getText(stepInputPage.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')

        stepInputPage.fillInput(stepInputPage.reactiveFormInput, '25')
        browser.pause(500)
        webDriver.waitForDisplayed(stepInputPage.errorMessage);
        formStatusText = webDriver.getText(stepInputPage.formStatusText)
        checkTextValueContain(formStatusText, 'INVALID')
    });

    it('Verify clicking the buttons does not place the caret in the input field.', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeButtonIncrement, i);
            checkNotFocused(stepInputPage.activeInput, i)
        }
    });

    // Need to debug on different browsers
    xit('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.activeInput);
        for (let i = 0; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.activeInput, i);
            webDriver.click(stepInputPage.activeInput, i);
            webDriver.clearValue(stepInputPage.activeInput, i);
            const value = webDriver.getValue(stepInputPage.activeInput, i);
            expect(value).toEqual( '0');
        }
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
        webDriver.scrollIntoView(stepInputPage.minMaxButtonIncrement);
        for (let i = 0; i < 20; i++) {
            webDriver.click(stepInputPage.minMaxButtonIncrement);
        }
        checkIfDisabled(stepInputPage.minMaxButtonIncrement, 'aria-disabled', 'true')

        for (let i = 0; i < 40; i++) {
            webDriver.click(stepInputPage.minMaxButtonDecrement);
        }
        checkIfDisabled(stepInputPage.minMaxButtonDecrement, 'aria-disabled', 'true')
    });

    it('Verify when user enter the tap step input field should be highlighted or focused ', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.inputWithoutForm);
        webDriver.click(stepInputPage.inputWithoutForm);
        checkFocused(stepInputPage.inputWithoutForm)
        for (let i = 1; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.inputWithoutForm, i);
            webDriver.sendKeys(['Tab']);
            checkFocused(stepInputPage.inputWithoutForm, i)
        }
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', () => {
        const arr = webDriver.getElementArrayLength(stepInputPage.formInput);
        for (let i = 1; i < arr; i++) {
            webDriver.scrollIntoView(stepInputPage.formInput, i);
            webDriver.clearValue(stepInputPage.formInput, i);
            webDriver.setValue(stepInputPage.formInput, '10', i);
            const quantity = webDriver.getText(stepInputPage.quantityText, i)
            checkTextValueContain(quantity, '10')
        }
    });

    it('Check LTR/RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    })
});
