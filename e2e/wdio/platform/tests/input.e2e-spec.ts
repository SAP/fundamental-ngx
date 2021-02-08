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

    beforeAll(() => {
        inputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputPage.defaultInput);
    }, 1);

    it('have input without label', () => {
        waitForElDisplayed(inputPage.defaultInput);
        expect(doesItExist(inputPage.autocompleteInputLabel)).toBe(false);
    });

    it('be able to type something with keyboard', () => {
        waitForElDisplayed(inputPage.defaultInput);
        setValue(inputPage.defaultInput, inputTestData.text);

        expect(getValue(inputPage.defaultInput)).toBe(inputTestData.text);
    });

    it('have associated label element to describe its purpose', () => {
        expect(getTextArr(inputPage.inputsLabels, 0, -2)).toEqual(inputPContent.labelsArray);
        expect(getText(inputPage.inputsLabels, 7)).toContain(inputPContent.favoriteColor);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        waitForElDisplayed(inputPage.defaultInput);
        setValue(inputPage.defaultInput, inputTestData.text);
        addValue(inputPage.defaultInput, inputTestData.number);
        addValue(inputPage.defaultInput, inputTestData.special_characters);

        expect(getValue(inputPage.defaultInput))
            .toEqual(inputTestData.text + inputTestData.number + inputTestData.special_characters);
    });

    it('impose any filters on the kind of input values the component receives (text)', () => {
        waitForElDisplayed(inputPage.textInput);
        addValue(inputPage.textInput, inputTestData.number);
        addValue(inputPage.textInput, inputTestData.special_characters);
        addValue(inputPage.textInput, inputTestData.text);

        expect(getValue(inputPage.textInput))
            .toEqual(inputTestData.number + inputTestData.special_characters + inputTestData.text); // ???
    });
    // TODO: it is not working the same for manual and automation.
    xit('impose any filters on the kind of input values the component receives (number)', () => {
        waitForElDisplayed(inputPage.numberInput);
        click(inputPage.numberInput);

        sendKeys(inputTestData.number);
        sendKeys(inputTestData.special_characters);
        sendKeys(inputTestData.text);

        expect(getText(inputPage.numberInput)).toEqual(inputTestData.number);
    });

    it('wrap the input characters to the next line', () => {
        waitForElDisplayed(inputPage.defaultInput);
        const heightBefore = getElementSize(inputPage.defaultInput, 0, 'height') ;
        setValue(inputPage.defaultInput, inputTestData.longLine);
        const heightAfter = getElementSize(inputPage.defaultInput, 0, 'height');

        expect(heightBefore).toBeLessThanOrEqual(heightAfter);
    });

    it('enable editing the entered characters', () => {
        waitForElDisplayed(inputPage.defaultInput);
        setValue(inputPage.defaultInput, inputTestData.text);
        sendKeys('Backspace');

        expect(getValue(inputPage.defaultInput)).toBe(inputTestData.text.slice(0, -1));
        clearValue(inputPage.defaultInput);
        expect(getValue(inputPage.defaultInput)).toBe('');
    });

    it('check have disabled attr assigned', () => {
        waitForElDisplayed(inputPage.disabledInput);

        expect(getAttributeByName(inputPage.disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(isEnabled(inputPage.disabledInput)).toBe(false);
    });

    it('have placeholder', () => {
        expect(getAttributeByNameArr(inputPage.inputsArray, 'placeholder', 1))
            .toEqual(inputPContent.placeholdersArray);
    });

    it('should have error border color', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        waitForPresent(inputPage.messagesComponentsInput);
        scrollIntoView(inputPage.messagesComponentsInput);
        waitForElDisplayed(inputPage.messagesComponentsInput);
        click(inputPage.submitBtn);
        const errorBackgroundColor = getCSSPropertyByName(inputPage.messagesComponentsInput, 'border-bottom-color').value;
        expect(errorBackgroundColor).toContain(inputPContent.errorBorderColor);
        mouseHoverElement(inputPage.messagesComponentsInput);
        pause(300);
        waitForElDisplayed(inputPage.errorText);
        expect(getText(inputPage.errorText).trim()).toBe(inputPContent.errorText);
    });

    it('should have visual cue for require input', () => {
        waitForPresent(inputPage.requiredInputLabel);
        scrollIntoView(inputPage.requiredInputLabel);
        pause(2000);
        expect(executeScriptAfterTagAttr(inputPage.requiredInputLabel, 'content')).toBe('"*"');
    });

    xit('should have visual cue for information', () => {
        expect(executeScriptBeforeTagAttr(inputPage.questionMarkSpan, 'content')).toBe('"?"');
    });

    it('should implement autosuggestion', () => {
        waitForElDisplayed(inputPage.autocompleteInput);
        addValue(inputPage.autocompleteInput, inputTestData.autocompleteOption);

        expect(getElementArrayLength(inputPage.autocompleteOptions)).toBeGreaterThanOrEqual(2);
        const autocompleteOptionText = getTextArr(inputPage.autocompleteOptions);
        autocompleteOptionText.forEach((option) => {
            expect(option.toLowerCase()).toContain(inputTestData.autocompleteOption);
        });
        pause(3000);
        click(inputPage.autocompleteOptions);
        expect((getValue(inputPage.autocompleteInput)).toLowerCase()).toContain(inputTestData.autocompleteOption);
    });

    it('should compact be smaller than the default', () => {
        const defaultHeight = getElementSize(inputPage.defaultInput);
        const compactHeight = getElementSize(inputPage.compactInput);

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
