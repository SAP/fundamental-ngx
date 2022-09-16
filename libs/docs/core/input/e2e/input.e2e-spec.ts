import {
    addValue,
    browserIsSafari,
    clearValue,
    click,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getPreviousElementText,
    getText,
    getValue,
    isElementDisplayed,
    isEnabled,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    informationInputLabelText,
    inputMessageText,
    invalidInputLabelText,
    labelsArray,
    stateClassesArr,
    testText,
    validInputLabelText,
    warningInputLabelText
} from './input-page-contents';
import { longLine, number, special_characters, text } from './input';
import { InputPo } from './input.po';

describe('Input should ', () => {
    const inputPage = new InputPo();
    const {
        defaultInput,
        requiredInput,
        passwordInput,
        compactInput,
        inlineHelpRightInput,
        inlineHelpLeftInput,
        validInput,
        invalidInput,
        warningInput,
        informationInput,
        disabledInput,
        readonlyInput,
        reactiveDefaultInput,
        reactiveDisabledInput,
        reactivePrimaryInput,
        reactiveSecondaryInput,
        formMessagePopover,
        validInputLabel,
        invalidInputLabel,
        warningInputLabel,
        informationInputLabel,
        addBtn,
        reactivePrimaryInput2,
        allInputFields,
        popoverHelp,
        questionMark,
        inputStateExample,
        input
    } = inputPage;

    const inputsArr = [
        defaultInput,
        requiredInput,
        passwordInput,
        compactInput,
        inlineHelpRightInput,
        inlineHelpLeftInput,
        disabledInput,
        readonlyInput,
        reactiveDefaultInput,
        reactiveDisabledInput,
        reactivePrimaryInput,
        reactiveSecondaryInput
    ];

    beforeAll(() => {
        inputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputPage.root);
        waitForElDisplayed(inputPage.title);
    }, 1);

    it('be able to type something with keyboard', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);

        expect(getValue(defaultInput)).toBe(text);
    });

    it('have associated label element to describe its purpose', () => {
        for (let i = 0; inputsArr.length > i; i++) {
            expect(getPreviousElementText(inputsArr[i]).trim()).toBe(labelsArray[i]);
        }
        expect(getText(validInputLabel).trim()).toBe(validInputLabelText);
        expect(getText(invalidInputLabel).trim()).toBe(invalidInputLabelText);
        expect(getText(warningInputLabel).trim()).toBe(warningInputLabelText);
        expect(getText(informationInputLabel).trim()).toBe(informationInputLabelText);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);
        addValue(defaultInput, number);
        addValue(defaultInput, special_characters);

        expect(getValue(defaultInput)).toEqual(text + number + special_characters);
    });

    it('wrap the input characters to the next line', () => {
        waitForElDisplayed(defaultInput);
        const heightBefore = getElementSize(defaultInput, 0, 'height');
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
        expect(getText(formMessagePopover).trim()).toBe(inputMessageText);

        scrollIntoView(invalidInput);
        mouseHoverElement(invalidInput);
        expect(getText(formMessagePopover).trim()).toBe(inputMessageText);

        click(warningInput);
        expect(getText(formMessagePopover).trim()).toBe(inputMessageText);

        click(informationInput);
        expect(getText(formMessagePopover).trim()).toBe(inputMessageText);
    });

    it('should add to more input fields by click Add btn', () => {
        click(addBtn);
        expect(getElementArrayLength(reactivePrimaryInput2)).toBe(2);
    });

    it('should check all input fields work correctly', () => {
        const inputLength = getElementArrayLength(allInputFields);
        for (let i = 0; i < inputLength; i++) {
            scrollIntoView(allInputFields, i);
            setValue(allInputFields, text + number + special_characters, i);
            expect(getValue(allInputFields, i)).toBe(text + number + special_characters);
        }
    });

    it('should check displayed popover by clicking and check text', () => {
        scrollIntoView(questionMark);
        click(questionMark);
        expect(isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
        expect(getText(popoverHelp).trim()).toBe(testText);

        click(questionMark, 1);
        expect(isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
        expect(getText(popoverHelp).trim()).toBe(testText);
    });

    it('should check displayed popover by hover question mark', () => {
        // skipped due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(questionMark);
        mouseHoverElement(questionMark);
        expect(isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');

        mouseHoverElement(questionMark, 1);
        expect(isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
    });

    it('should check states', () => {
        scrollIntoView(inputStateExample);
        const checkboxCount = getElementArrayLength(inputStateExample + input);

        for (let i = 0; i < checkboxCount; i++) {
            expect(getElementClass(inputStateExample + input, i)).toContain(stateClassesArr[i]);
        }
    });

    it('should check RTL', () => {
        inputPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            inputPage.saveExampleBaselineScreenshot();
            expect(inputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
