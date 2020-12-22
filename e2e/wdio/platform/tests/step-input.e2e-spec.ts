import { webDriver } from '../../driver/wdio';
import {StepInputPo} from '../pages/step-input.po'

describe('Step input test suite', function() {
    const stepInputPage: StepInputPo = new StepInputPo();

    beforeAll(() => {
        stepInputPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify increment and decrement buttons', () => {
        stepInputPage.checkIncrementDecrementButtons();
    });

    it('Verify The step input consists of an input field and buttons with icons to decrease or increase the value.', () => {
        stepInputPage.checkStepInputComponent();
    });

    it('Verify The user changes the value: By typing a number', () => {
        stepInputPage.checkValueAfterTypingTheNumber();
    });

    it('Verify The user changes the value: With keyboard shortcuts (up/down, page up/down)', () => {
        stepInputPage.checkValueAfterEnteringByKeyboardButtons();
    });

    it('Verify error message when entering invalid value', () => {
        stepInputPage.checkInvalidInput(stepInputPage.reactiveFormInput);
    });

    it('Verify clicking the buttons does not place the caret in the input field.', () => {
        stepInputPage.checkFocusOnInputAfterClickingButtons();
    });

    // Need to debug on different browsers
    xit('Verify the value in the field becomes 0 or the minimum if the minimum is larger than 0.', () => {
        stepInputPage.checkValueAfterClearingTheInput();
    });

    it('Verify when the maximum/minimum values are reached, the Increase/Decrease button and up/down keyboard navigation are disabled.', () => {
        stepInputPage.checkIncreaseDecreaseButtonIsDisabledWithMaxValue();
    });

    it('Verify when user enter the tap step input field should be highlighted or focused ', () => {
        stepInputPage.checkInputFocusedAfterClickingTabButton();
    });

    it('Verify you can show a descriptive reference or unit of measurement after the field (property: description).', () => {
        stepInputPage.checkQuantity();
    });

    it('Check LTR/RTL orientation', () => {
        stepInputPage.checkRtlSwitch();
    })
});
