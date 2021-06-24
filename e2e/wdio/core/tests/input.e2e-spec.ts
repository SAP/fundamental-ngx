import {
    addValue,
    clearValue, click, getElementArrayLength,
    getElementSize,
    getPreviousElementText, getText,
    getValue,
    isEnabled, mouseHoverElement,
    refreshPage, scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import {
    informationInputLabelText, inputMessageText,
    invalidInputLabelText,
    labelsArray,
    validInputLabelText,
    warningInputLabelText
} from '../fixtures/appData/input-page-contents';
import { longLine, number, special_characters, text } from '../fixtures/testData/input';
import { InputPo } from '../pages/input.po';

describe('Input should ', function() {
    const inputPage = new InputPo();
    const { defaultInput, requiredInput, passwordInput, compactInput,
        inlineHelpRightInput, inlineHelpLeftInput, validInput, invalidInput,
        warningInput, informationInput, disabledInput, readonlyInput, reactiveDefaultInput,
        reactiveDisabledInput, reactivePrimaryInput, reactiveSecondaryInput, formMessagePopover,
        validInputLabel, invalidInputLabel, warningInputLabel, informationInputLabel, addBtn, reactivePrimaryInput2
    } = inputPage;

    const inputsArr = [defaultInput, requiredInput, passwordInput, compactInput,
        inlineHelpRightInput, inlineHelpLeftInput, disabledInput, readonlyInput, reactiveDefaultInput,
        reactiveDisabledInput, reactivePrimaryInput, reactiveSecondaryInput];

    beforeAll(() => {
        inputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(defaultInput);
    }, 1);

    it('be able to type something with keyboard', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);

        expect(getValue(defaultInput)).toBe(text);
    });

    it('have associated label element to describe its purpose', () => {
        for (let i = 0; inputsArr.length > i; i++) {
            expect(getPreviousElementText(inputsArr[i])).toBe(labelsArray[i]);
        }
        expect(getText(validInputLabel)).toBe(validInputLabelText);
        expect(getText(invalidInputLabel)).toBe(invalidInputLabelText);
        expect(getText(warningInputLabel)).toBe(warningInputLabelText);
        expect(getText(informationInputLabel)).toBe(informationInputLabelText);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);
        addValue(defaultInput, number);
        addValue(defaultInput, special_characters);

        expect(getValue(defaultInput))
            .toEqual(text + number + special_characters);
    });

    it('wrap the input characters to the next line', () => {
        waitForElDisplayed(defaultInput);
        const heightBefore = getElementSize(defaultInput, 0, 'height') ;
        setValue(defaultInput, longLine);
        const heightAfter = getElementSize(defaultInput, 0, 'height');

        expect(heightBefore).toBeLessThanOrEqual(heightAfter);
    });

    it('enable editing the entered characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);
        sendKeys('Backspace');

        expect(getValue(defaultInput)).toBe(text.slice(0, -1));
        clearValue(defaultInput);
        expect(getValue(defaultInput)).toBe('');
    });

    it('check have disabled attr assigned to disabled inputs', () => {
        waitForElDisplayed(disabledInput);
        expect(isEnabled(disabledInput)).toBe(false);

        waitForElDisplayed(reactiveDisabledInput);
        expect(isEnabled(reactiveDisabledInput)).toBe(false);
    });

    it('should compact be smaller than the default', () => {
        const defaultHeight = getElementSize(defaultInput);
        const compactHeight = getElementSize(compactInput);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should have message attached to the input', () => {
        click(validInput);
        expect(getText(formMessagePopover)).toBe(inputMessageText);

        scrollIntoView(invalidInput);
        mouseHoverElement(invalidInput);
        expect(getText(formMessagePopover)).toBe(inputMessageText);

        click(warningInput);
        expect(getText(formMessagePopover)).toBe(inputMessageText);

        click(informationInput);
        expect(getText(formMessagePopover)).toBe(inputMessageText);
    });

    it('should add to more input fields by click Add btn', () => {
     click(addBtn);
     expect(getElementArrayLength(reactivePrimaryInput2)).toBe(2);
    });

    it('should check RTL', () => {
        inputPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            inputPage.saveExampleBaselineScreenshot();
            expect(inputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
