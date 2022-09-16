import {
    addValue,
    browserIsSafariorFF,
    clearValue,
    click,
    doesItExist,
    executeScriptAfterTagAttr,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementSize,
    getText,
    getTextArr,
    getValue,
    isEnabled,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { errorText, favoriteColor, labelsArray, maxValidation, placeholdersArray } from './input-page-contents';
import { autocompleteOption, longLine, number, special_characters, text } from './input';
import { InputPo } from './input.po';

declare const $$: any;

describe('Input should ', () => {
    const inputPage = new InputPo();
    const {
        defaultInput,
        textInput,
        numberInput,
        compactInput,
        disabledInput,
        messagesComponentsInput,
        submitBtn,
        errorTextAttr,
        requiredInputLabel,
        questionMarkSpan,
        inputsLabels,
        inputsArray,
        autocompleteInput,
        autocompleteInputLabel,
        autocompleteOptions,
        errorMessage
    } = inputPage;

    beforeAll(() => {
        inputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(defaultInput);
    }, 1);

    it('have input without label', () => {
        waitForElDisplayed(defaultInput);
        expect(doesItExist(autocompleteInputLabel)).toBe(false);
    });

    it('be able to type something with keyboard', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);

        expect(getValue(defaultInput)).toBe(text);
    });

    it('have associated label element to describe its purpose', () => {
        expect(getTextArr(inputsLabels, 0, -2)).toEqual(labelsArray);
        expect(getText(inputsLabels, 8)).toContain(favoriteColor);
        expect(getText(inputsLabels, 9)).toContain(maxValidation);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, text);
        addValue(defaultInput, number);
        addValue(defaultInput, special_characters);

        expect(getValue(defaultInput)).toEqual(text + number + special_characters);
    });

    it('impose any filters on the kind of input values the component receives (text)', () => {
        waitForElDisplayed(textInput);
        addValue(textInput, number);
        addValue(textInput, special_characters);
        addValue(textInput, text);

        expect(getValue(textInput)).toEqual(number + special_characters + text); // ???
    });

    it('impose any filters on the kind of input values the component receives (number)', () => {
        if (browserIsSafariorFF()) {
            return;
            // not working on FF and safari, needs investigation
        }
        waitForElDisplayed(numberInput);
        click(numberInput);

        addValue(numberInput, number);
        addValue(numberInput, special_characters);

        expect(getValue(numberInput)).toEqual(number);
    });

    it('should check increase/decriase value by arrows', () => {
        waitForElDisplayed(numberInput);
        click(numberInput);

        sendKeys('ArrowUp');
        expect(getValue(numberInput)).toEqual('1');

        sendKeys('ArrowDown');
        sendKeys('ArrowDown');
        expect(getValue(numberInput)).toEqual('-1');
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

    it('check have disabled attr assigned', () => {
        waitForElDisplayed(disabledInput);
        expect(isEnabled(disabledInput)).toBe(false);
    });

    it('have placeholder', () => {
        expect(getAttributeByNameArr(inputsArray, 'placeholder', 1)).toEqual(placeholdersArray);
    });

    it('should have error border color', () => {
        scrollIntoView(messagesComponentsInput);
        waitForElDisplayed(messagesComponentsInput);
        click(submitBtn);
        click(messagesComponentsInput);
        pause(300);
        waitForElDisplayed(errorTextAttr);
        expect(getText(errorTextAttr).trim()).toBe(errorText);
    });

    it('should have visual cue for require input', () => {
        scrollIntoView(requiredInputLabel);
        pause(2000);
        expect(executeScriptAfterTagAttr(requiredInputLabel, 'content')).toBe('"*"');
    });

    it('should have visual cue for information', () => {
        expect($$(questionMarkSpan)).toBeTruthy();
    });

    it('should implement autosuggestion', () => {
        waitForElDisplayed(autocompleteInput);
        addValue(autocompleteInput, autocompleteOption);

        expect(getElementArrayLength(autocompleteOptions)).toBeGreaterThanOrEqual(2);
        const autocompleteOptionText = getTextArr(autocompleteOptions);
        autocompleteOptionText.forEach((option) => {
            expect(option.toLowerCase()).toContain(autocompleteOption);
        });
        pause(3000);
        click(autocompleteOptions);
        expect(getValue(autocompleteInput).toLowerCase()).toContain(autocompleteOption);
    });

    it('should compact be smaller than the default', () => {
        const defaultHeight = getElementSize(defaultInput);
        const compactHeight = getElementSize(compactInput);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should check that validation does not work earlier than necessary', () => {
        scrollIntoView(messagesComponentsInput);
        click(messagesComponentsInput);
        expect(doesItExist(errorMessage)).toBe(false);
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
