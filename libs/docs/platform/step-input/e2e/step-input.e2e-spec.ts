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
    focusElement,
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

    beforeAll(async () => {
        await stepInputPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(stepInputPage.root);
        await waitForElDisplayed(stepInputPage.title);
    }, 2);

    it('Verify increment and decrement buttons', async () => {
        const arr = await getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            let value = await getValue(activeInput, i);
            await click(activeButtonIncrement, i);
            await checkValueChanged(value, await getValue(activeInput, i));
            value = await getValue(activeInput, i);
            await click(activeButtonDecrement, i);
            await checkValueChanged(value, await getValue(activeInput, i));
        }
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', async () => {
        const arr = await getElementArrayLength(allInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(allInput, i);
            await waitForElDisplayed(allButtonIncrement, i);
            await waitForElDisplayed(allButtonDecrement, i);
            await waitForElDisplayed(allInput, i);
        }
    });

    it('Verify The user changes the value: By typing a number', async () => {
        const arr = await getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            let value = await getValue(activeInput, i);
            await setValue(activeInput, '2', i);
            await checkValueChanged(value, await getValue(activeInput, i));
            value = await getValue(activeInput, i);
            await setValue(activeInput, '1', i);
            await checkValueChanged(value, await getValue(activeInput, i));
        }
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', async () => {
        const arr = await getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            let value = await getValue(activeInput, i);
            await click(activeInput, i);
            await sendKeys(['ArrowDown']);
            await sendKeys(['Enter']);
            await checkValueChanged(value, await getValue(activeInput, i));
            value = await getValue(activeInput, i);
            await click(activeInput, i);
            await sendKeys(['ArrowUp']);
            await sendKeys(['Enter']);
            await checkValueChanged(value, await getValue(activeInput, i));
        }
    });

    it('Verify error message when entering invalid value', async () => {
        await scrollIntoView(reactiveFormInput);
        await fillInput(reactiveFormInput, 'invalid');
        await waitForElDisplayed(errorMessage);
        let statusText = await getText(formStatusText);
        await checkTextValueContain(statusText, 'INVALID');

        await fillInput(reactiveFormInput, '10');
        const isDisplayed = await $(reactiveFormInput + ' fd-step-input' + errorMessage).isDisplayed();
        await expect(isDisplayed).toBeFalsy();
        statusText = await getText(formStatusText);
        await checkTextValueContain(statusText, 'VALID');

        await fillInput(reactiveFormInput, '5');
        await waitForElDisplayed(errorMessage);
        statusText = await getText(formStatusText);
        await checkTextValueContain(statusText, 'INVALID');

        await fillInput(reactiveFormInput, '25');
        await browser.pause(500);
        await waitForElDisplayed(errorMessage);
        statusText = await getText(stepInputPage.formStatusText);
        await checkTextValueContain(statusText, 'INVALID');
    });

    it('Verify clicking the buttons does not place the caret in the input field.', async () => {
        const arr = await getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            await click(activeButtonIncrement, i);
            await checkNotFocused(activeInput, i);
        }
    });

    it('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', async () => {
        if (await browserIsSafari()) {
            return;
        }
        const arr = await getElementArrayLength(activeInput);

        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            await doubleClick(activeInput, i);
            await sendKeys(['Backspace', 'Enter']);
            const value = await getValue(activeInput, i);

            await expect(['0', '0.00', '']).toContain(value);
        }
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', async () => {
        await scrollIntoView(minMaxButtonIncrement);
        for (let i = 0; i < 20; i++) {
            await click(minMaxButtonIncrement);
        }
        await checkIfDisabled(minMaxButtonIncrement, 'aria-disabled', 'true');

        for (let i = 0; i < 40; i++) {
            await click(minMaxButtonDecrement);
        }
        await checkIfDisabled(minMaxButtonDecrement, 'aria-disabled', 'true');
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', async () => {
        const arr = await getElementArrayLength(formInput);
        for (let i = 1; i < arr; i++) {
            await scrollIntoView(formInput, i);
            await clearValue(formInput, i);
            await setValue(formInput, '10', i);
            const quantity = await getText(quantityText, i);
            await checkTextValueContain(quantity, '10');
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6963
    xit('Verify increment and decrement buttons', async () => {
        const arr = await getElementArrayLength(activeInput);
        for (let i = 0; i < arr; i++) {
            await scrollIntoView(activeInput, i);
            const defaultValue = await getValue(activeInput, i);
            await clickRightMouseBtn(activeButtonIncrement, i);
            await expect(await getValue(activeInput, i)).toEqual(
                defaultValue,
                'value changed by clickin on right mouse button'
            );
            await clickRightMouseBtn(activeButtonDecrement, i);
            await expect(await getValue(activeInput, i)).toEqual(
                defaultValue,
                'value changed by clickin on right mouse button'
            );
        }
    });

    it('Check LTR/RTL orientation', async () => {
        await stepInputPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await stepInputPage.saveExampleBaselineScreenshot();
            await expect(await stepInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
