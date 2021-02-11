import {
    addValue,
    browserIsIEorSafari,
    clearValue,
    click,
    doesItExist,
    executeScriptAfterTagAttr,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getAttributeByNameArr,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementSize,
    getText,
    getTextArr,
    getValue,
    isEnabled,
    mouseHoverElement,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import inputPContent from '../fixtures/appData/input-page-contents';
import inputTestData from '../fixtures/testData/input';
import { InputPo } from '../pages/input.po';

describe('Input should ', function() {
    const inputPage = new InputPo();
    const {
        defaultInput, textInput, numberInput, compactInput, readonlyInput, disabledInput, inlineHelpInput,
        messagesComponentsInput, submitBtn, errorText, requiredInputLabel, questionMarkSpan, inputsLabels, inputsArray,
        autocompleteInput, autocompleteInputLabel, autocompleteOptions
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
        setValue(defaultInput, inputTestData.text);

        expect(getValue(defaultInput)).toBe(inputTestData.text);
    });

    it('have associated label element to describe its purpose', () => {
        expect(getTextArr(inputsLabels, 0, -2)).toEqual(inputPContent.labelsArray);
        expect(getText(inputsLabels, 7)).toContain(inputPContent.favoriteColor);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, inputTestData.text);
        addValue(defaultInput, inputTestData.number);
        addValue(defaultInput, inputTestData.special_characters);

        expect(getValue(defaultInput))
            .toEqual(inputTestData.text + inputTestData.number + inputTestData.special_characters);
    });

    it('impose any filters on the kind of input values the component receives (text)', () => {
        waitForElDisplayed(textInput);
        addValue(textInput, inputTestData.number);
        addValue(textInput, inputTestData.special_characters);
        addValue(textInput, inputTestData.text);

        expect(getValue(textInput))
            .toEqual(inputTestData.number + inputTestData.special_characters + inputTestData.text); // ???
    });
    // TODO: it is not working the same for manual and automation.
    xit('impose any filters on the kind of input values the component receives (number)', () => {
        waitForElDisplayed(numberInput);
        click(numberInput);

        sendKeys(inputTestData.number);
        sendKeys(inputTestData.special_characters);
        sendKeys(inputTestData.text);

        expect(getText(numberInput)).toEqual(inputTestData.number);
    });

    it('wrap the input characters to the next line', () => {
        waitForElDisplayed(defaultInput);
        const heightBefore = getElementSize(defaultInput, 0, 'height') ;
        setValue(defaultInput, inputTestData.longLine);
        const heightAfter = getElementSize(defaultInput, 0, 'height');

        expect(heightBefore).toBeLessThanOrEqual(heightAfter);
    });

    it('enable editing the entered characters', () => {
        waitForElDisplayed(defaultInput);
        setValue(defaultInput, inputTestData.text);
        sendKeys('Backspace');

        expect(getValue(defaultInput)).toBe(inputTestData.text.slice(0, -1));
        clearValue(defaultInput);
        expect(getValue(defaultInput)).toBe('');
    });

    it('check have disabled attr assigned', () => {
        waitForElDisplayed(disabledInput);

        expect(getAttributeByName(disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(isEnabled(disabledInput)).toBe(false);
    });

    it('have placeholder', () => {
        expect(getAttributeByNameArr(inputsArray, 'placeholder', 1))
            .toEqual(inputPContent.placeholdersArray);
    });

    it('should have error border color', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        waitForPresent(messagesComponentsInput);
        scrollIntoView(messagesComponentsInput);
        waitForElDisplayed(messagesComponentsInput);
        click(submitBtn);
        const errorBackgroundColor = getCSSPropertyByName(messagesComponentsInput, 'border-bottom-color').value;
        expect(errorBackgroundColor).toContain(inputPContent.errorBorderColor);
        mouseHoverElement(messagesComponentsInput);
        pause(300);
        waitForElDisplayed(errorText);
        expect(getText(errorText).trim()).toBe(inputPContent.errorText);
    });

    it('should have visual cue for require input', () => {
        waitForPresent(requiredInputLabel);
        scrollIntoView(requiredInputLabel);
        pause(2000);
        expect(executeScriptAfterTagAttr(requiredInputLabel, 'content')).toBe('"*"');
    });

    xit('should have visual cue for information', () => {
        expect(executeScriptBeforeTagAttr(questionMarkSpan, 'content')).toBe('"?"');
    });

    it('should implement autosuggestion', () => {
        waitForElDisplayed(autocompleteInput);
        addValue(autocompleteInput, inputTestData.autocompleteOption);

        expect(getElementArrayLength(autocompleteOptions)).toBeGreaterThanOrEqual(2);
        const autocompleteOptionText = getTextArr(autocompleteOptions);
        autocompleteOptionText.forEach((option) => {
            expect(option.toLowerCase()).toContain(inputTestData.autocompleteOption);
        });
        pause(3000);
        click(autocompleteOptions);
        expect((getValue(autocompleteInput)).toLowerCase()).toContain(inputTestData.autocompleteOption);
    });

    it('should compact be smaller than the default', () => {
        const defaultHeight = getElementSize(defaultInput);
        const compactHeight = getElementSize(compactInput);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should check RTL', () => {
        inputPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            inputPage.saveExampleBaselineScreenshot('input');
            expect(inputPage.compareWithBaseline('input')).toBeLessThan(1);
        });
    });
});
