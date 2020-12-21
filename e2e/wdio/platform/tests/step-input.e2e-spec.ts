import { webDriver } from '../../driver/wdio';
import {StepInputPo} from '../pages/step-input.po'

describe('Step input test suite', function() {
    const stepInputPage: StepInputPo = new StepInputPo();
    const{ checkIncrementDecrementButtons, checkStepInputComponent, checkValueAfterTypingTheNumber,
        checkValueAfterEnteringByKeyboardButtons, checkInvalidInput, checkFocusOnInputAfterClickingButtons,
        checkValueAfterClearingTheInput, checkIncreaseDecreaseButtonIsDisabledWithMaxValue,
        checkInputFocusedAfterClickingTabButton, checkQuantity, checkRtlSwitch, reactiveFormInput,
    } = new StepInputPo();

    beforeAll(() => {
        stepInputPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify increment and decrement buttons', () => {
        checkIncrementDecrementButtons();
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', () => {
        checkStepInputComponent();
    });

    it('Verify The user changes the value: By typing a number', () => {
        checkValueAfterTypingTheNumber();
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', () => {
        checkValueAfterEnteringByKeyboardButtons();
    });

    it('Verify error message when entering invalid value', () => {
        checkInvalidInput(reactiveFormInput);
    });

    it('Verify clicking the buttons does not place the caret in the input field.', () => {
        checkFocusOnInputAfterClickingButtons();
    });

    xit('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        checkValueAfterClearingTheInput();
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
        checkIncreaseDecreaseButtonIsDisabledWithMaxValue();
    });

    it('Verify when user enter the tap step input field should be highlighted or focused ', () => {
        checkInputFocusedAfterClickingTabButton();
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', () => {
        checkQuantity();
    });

    it('Check LTR/RTL orientation', () => {
        checkRtlSwitch();
    })
});
