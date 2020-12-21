import { webDriver } from '../../driver/wdio';
import { InputGroupPo } from '../pages/input-group.po';
import inputGroupPContent from '../fixtures/appData/input-group-page-contents';
import inputGroupTestData from '../fixtures/testData/input-group';

describe('Input Group should', function() {
    const inputGroupPage = new InputGroupPo();

    beforeAll(() => {
        inputGroupPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('have associated label element to describe its purpose', () => {
        expect(webDriver.getTextArr(inputGroupPage.standartInputLabelsArr)).toEqual(inputGroupPContent.standardInputLabels);
        expect(webDriver.getText(inputGroupPage.withFormInputLabel)).toEqual(inputGroupPContent.inputWithFormLabel);
    });

    it('have correct placeholder text', () => {
        expect(webDriver.getAttributeByNameArr(inputGroupPage.standartInputArr, 'placeholder'))
            .toEqual(inputGroupPContent.standardInputPlaceholders);
        expect(webDriver.getAttributeByName(inputGroupPage.withFormInput, 'placeholder'))
            .toEqual(inputGroupPContent.inputWithFormPlaceholder);
    });

    it('have left text addon and accept values', () => {
        webDriver.waitForDisplayed(inputGroupPage.leftAlignedTextInputTextAddon);
        webDriver.setValue(inputGroupPage.leftAlignedTextInput, inputGroupTestData.numeric_value);

        expect(webDriver.getText(inputGroupPage.leftAlignedTextInputTextAddon)).toContain('$');
        expect(webDriver.getValue(inputGroupPage.leftAlignedTextInput)).toBe(inputGroupTestData.numeric_value);
    });

    it('have right text addon and accept values', () => {
        webDriver.waitForDisplayed(inputGroupPage.rightAlignedTextInputTextAddon);
        webDriver.setValue(inputGroupPage.rightAlignedTextInput, inputGroupTestData.numeric_value);

        expect(webDriver.getText(inputGroupPage.rightAlignedTextInputTextAddon)).toContain('0.00');
        expect(webDriver.getValue(inputGroupPage.rightAlignedTextInput)).toBe(inputGroupTestData.numeric_value);
    });

    it('have right and left text addons and accept values', () => {
        webDriver.waitForDisplayed(inputGroupPage.rightLeftAlignedTextInputTextAddon);
        webDriver.setValue(inputGroupPage.leftAndRightAlignedTextInput, inputGroupTestData.numeric_value);

        expect(webDriver.getText(inputGroupPage.rightLeftAlignedTextInputTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.rightLeftAlignedTextInputTextAddon, 1)).toContain('0.00');
        expect(webDriver.getValue(inputGroupPage.leftAndRightAlignedTextInput)).toBe(inputGroupTestData.numeric_value);
    });

    it('have button, text addons and accept values', () => {
        webDriver.waitForDisplayed(inputGroupPage.buttonInputSubmitButton);
        webDriver.setValue(inputGroupPage.buttonInput, inputGroupTestData.numeric_value);

        // Check if clickable. No logic behind the click
        expect(webDriver.getText(inputGroupPage.buttonInputLeftAndRightTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.buttonInputLeftAndRightTextAddon, 1)).toContain('0.00');
        expect(webDriver.isElementClickable(inputGroupPage.buttonInputSubmitButton)).toBe(true);
        expect(webDriver.getValue(inputGroupPage.buttonInput)).toBe(inputGroupTestData.numeric_value);
    });

    it('have icon addon and accept values', () => {
        webDriver.waitForDisplayed(inputGroupPage.iconInputEmailIcon);
        webDriver.setValue(inputGroupPage.iconInput, inputGroupTestData.email_value);

        expect(webDriver.getValue(inputGroupPage.iconInput)).toBe(inputGroupTestData.email_value);
    });

    it('compact have button and text addon', () => {
        webDriver.waitForDisplayed(inputGroupPage.compactGroupInput);
        webDriver.setValue(inputGroupPage.compactGroupInput, inputGroupTestData.string_value);

        expect(webDriver.getText(inputGroupPage.compactGroupLeftTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.compactGroupButtonAddon)).toContain('Submit');
        expect(webDriver.isElementClickable(inputGroupPage.compactGroupButtonAddon)).toBe(true);
        expect(webDriver.getValue(inputGroupPage.compactGroupInput)).toBe(inputGroupTestData.string_value);
    });

    it('compact be smaller than the default', () => {
        const defaultHeight = webDriver.getElementSize(inputGroupPage.leftAlignedTextInput) as WebdriverIO.SizeReturn;
        const compactHeight = webDriver.getElementSize(inputGroupPage.compactGroupInput) as WebdriverIO.SizeReturn;

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('check have disabled attr assigned', () => {
        webDriver.waitElementToBePresentInDOM(inputGroupPage.disabledInput);
        webDriver.waitForDisplayed(inputGroupPage.disabledInput);

        expect(webDriver.getAttributeByName(inputGroupPage.disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(webDriver.isEnabled(inputGroupPage.disabledInput)).toBe(false);
    });

    it('check disabled attr has disabled button', () => {
        webDriver.waitForDisplayed(inputGroupPage.disabledInput);
        expect(webDriver.isElementClickable(inputGroupPage.disabledInputButton)).toBe(false);
    });

    it('with Form input have text and button addons', () => {
        webDriver.waitForDisplayed(inputGroupPage.withFormInput);
        webDriver.setValue(inputGroupPage.withFormInput, inputGroupTestData.numeric_value);

        expect(webDriver.getText(inputGroupPage.withFormInputTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.withFormInputTextAddon, 1)).toContain('0.00');
        expect(webDriver.getText(inputGroupPage.withFormInputButtonAddon)).toContain('Submit');
        expect(webDriver.getValue(inputGroupPage.withFormInput)).toBe(inputGroupTestData.numeric_value);
    });

    it('with form input have error tooltip and visual que if empty', () => {
        webDriver.waitForDisplayed(inputGroupPage.withFormInput);
        webDriver.scrollIntoView(inputGroupPage.withFormInput);
        webDriver.click(inputGroupPage.withFormInput);
        webDriver.click(inputGroupPage.withFormInputButtonAddon);
        webDriver.mouseHoverElement(inputGroupPage.withFormInput);

        expect(webDriver.executeScriptBeforeTagAttr(inputGroupPage.withFormInputQuestionMark, 'content')).toBe('"?"');
        expect(webDriver.executeScriptAfterTagAttr(inputGroupPage.withFormInputAsterixMark, 'content')).toBe('"*"');
        // TODO: Uncomment after merge
        /*        if (webDriver.isBrowser('Safari')) {
            expect(webDriver.getText(inputGroupPage.withFormInputErrorTooltip)).toEqual('Value is required');
            return;
        }
        console.log('Skip hover check for Safari');*/
    });

    it('with form input have info tooltip', () => {
        if (!webDriver.isIEorSafari()) {
            webDriver.waitForDisplayed(inputGroupPage.withFormInput);
            webDriver.scrollIntoView(inputGroupPage.withFormInput);
            webDriver.mouseHoverElement(inputGroupPage.withFormInputQuestionMark);
            expect(webDriver.getText(inputGroupPage.withFormInputInfoTooltip)).toBe('This is tooltip to help');
            return;
        }
    });

    it('should check RTL', () => {
        inputGroupPage.checkRtlSwitch();
    });

});
