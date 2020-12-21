import { webDriver } from '../../driver/wdio';
import inputPContent from '../fixtures/appData/input-page-contents';
import inputTestData from '../fixtures/testData/input';
import { InputPo } from '../pages/input.po';

describe('Input should ', function() {
    const inputPage = new InputPo();

    beforeAll(() => {
        inputPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('have input without label', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.defaultInput);
        webDriver.waitForDisplayed(inputPage.defaultInput);
        expect(webDriver.doesItExist(inputPage.autocompleteInputLabel)).toBe(false);
    });

    it('be able to type something with keyboard', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.defaultInput);
        webDriver.waitForDisplayed(inputPage.defaultInput);
        webDriver.setValue(inputPage.defaultInput, inputTestData.text);

        expect(webDriver.getValue(inputPage.defaultInput)).toBe(inputTestData.text);
    });

    it('have associated label element to describe its purpose', () => {
        expect(webDriver.getTextArr(inputPage.inputsLabels, 0, -2)).toEqual(inputPContent.labelsArray);
        expect(webDriver.getText(inputPage.inputsLabels, 7)).toContain(inputPContent.favoriteColor);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.defaultInput);
        webDriver.waitForDisplayed(inputPage.defaultInput);
        webDriver.setValue(inputPage.defaultInput, inputTestData.text);
        webDriver.addValue(inputPage.defaultInput, inputTestData.number);
        webDriver.addValue(inputPage.defaultInput, inputTestData.special_characters);

        expect(webDriver.getValue(inputPage.defaultInput))
            .toEqual(inputTestData.text + inputTestData.number + inputTestData.special_characters);
    });

    it('impose any filters on the kind of input values the component receives (text)', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.textInput);
        webDriver.waitForDisplayed(inputPage.textInput);
        webDriver.addValue(inputPage.textInput, inputTestData.number);
        webDriver.addValue(inputPage.textInput, inputTestData.special_characters);
        webDriver.addValue(inputPage.textInput, inputTestData.text);

        expect(webDriver.getValue(inputPage.textInput))
            .toEqual(inputTestData.number + inputTestData.special_characters + inputTestData.text); // ???
    });
    // TODO: it is not working the same for manual and automation.
    xit('impose any filters on the kind of input values the component receives (number)', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.numberInput);
        webDriver.waitForDisplayed(inputPage.numberInput);
        webDriver.click(inputPage.numberInput);

        webDriver.sendKeys(inputTestData.number);
        webDriver.sendKeys(inputTestData.special_characters);
        webDriver.sendKeys(inputTestData.text);

        expect(webDriver.getText(inputPage.numberInput)).toEqual(inputTestData.number);
    });

    it('wrap the input characters to the next line', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.defaultInput);
        webDriver.waitForDisplayed(inputPage.defaultInput);
        const heightBefore = webDriver.getElementSize(inputPage.defaultInput, 'height') as number;
        webDriver.setValue(inputPage.defaultInput, inputTestData.longLine);
        const heightAfter = webDriver.getElementSize(inputPage.defaultInput, 'height') as number;

        expect(heightBefore).toBeLessThanOrEqual(heightAfter);
    });

    it('enable editing the entered characters', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.defaultInput);
        webDriver.waitForDisplayed(inputPage.defaultInput);
        webDriver.setValue(inputPage.defaultInput, inputTestData.text);
        webDriver.sendKeys('Backspace');

        expect(webDriver.getValue(inputPage.defaultInput)).toBe(inputTestData.text.slice(0, -1));
        webDriver.clearValue(inputPage.defaultInput);
        expect(webDriver.getValue(inputPage.defaultInput)).toBe('');
    });

    it('check have disabled attr assigned', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.disabledInput);
        webDriver.waitForDisplayed(inputPage.disabledInput);

        expect(webDriver.getAttributeByName(inputPage.disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(webDriver.isEnabled(inputPage.disabledInput)).toBe(false);
    });

    it('have placeholder', () => {
        expect(webDriver.getAttributeByNameArr(inputPage.inputsArray, 'placeholder', 1))
            .toEqual(inputPContent.placeholdersArray);
    });

    it('should have error border color', () => {
        if (!webDriver.isIEorSafari()) {
            webDriver.waitElementToBePresentInDOM(inputPage.messagesComponentsInput);
            webDriver.scrollIntoView(inputPage.messagesComponentsInput);
            webDriver.waitForDisplayed(inputPage.messagesComponentsInput);
            webDriver.click(inputPage.submitBtn);
            const errorBackgroundColor = webDriver.getCSSPropertyByName(inputPage.messagesComponentsInput, 'border-bottom-color').value;
            expect(errorBackgroundColor).toContain(inputPContent.errorBorderColor);
            webDriver.mouseHoverElement(inputPage.messagesComponentsInput);
            webDriver.pause(300);
            webDriver.waitForDisplayed(inputPage.errorText);
            expect(webDriver.getText(inputPage.errorText).trim()).toBe(inputPContent.errorText);
            return;
        }
        console.log('Skip for IE and Safari');
    });

    it('should have visual cue for require input', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.requiredInputLabel);
        webDriver.scrollIntoView(inputPage.requiredInputLabel);
        webDriver.pause(2000);
        expect(webDriver.executeScriptAfterTagAttr(inputPage.requiredInputLabel, 'content')).toBe('"*"');
    });

    it('should have visual cue for information', () => {
        expect(webDriver.executeScriptBeforeTagAttr(inputPage.questionMarkSpan, 'content')).toBe('"?"');
    });

    it('should implement autosuggestion', () => {
        webDriver.waitElementToBePresentInDOM(inputPage.autocompleteInput);
        webDriver.waitForDisplayed(inputPage.autocompleteInput);
        webDriver.addValue(inputPage.autocompleteInput, inputTestData.autocompleteOption);

        expect(webDriver.getElementArrayLength(inputPage.autocompleteOptions)).toBeGreaterThanOrEqual(2);
        const autocompleteOptionText = webDriver.getTextArr(inputPage.autocompleteOptions);
        autocompleteOptionText.forEach((option) => {
            expect(option.toLowerCase()).toContain(inputTestData.autocompleteOption);
        });
        webDriver.pause(3000);
        webDriver.click(inputPage.autocompleteOptions);
        expect((webDriver.getValue(inputPage.autocompleteInput)).toLowerCase()).toContain(inputTestData.autocompleteOption);
    });

    it('should compact be smaller than the default', () => {
        const defaultHeight = webDriver.getElementSize(inputPage.defaultInput) as WebdriverIO.SizeReturn;
        const compactHeight = webDriver.getElementSize(inputPage.compactInput) as WebdriverIO.SizeReturn;

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should check RTL', () => {
        inputPage.checkRtlSwitch();
    });
});
