import { webDriver } from '../../driver/wdio';
import { InputGroupPo } from '../pages/input-group.po';
import inputGroupPContent from '../fixtures/appData/input-group-page-contents';

describe('Input Group should', function() {

    const inputGroupPage = new InputGroupPo();

    beforeAll(() => {
        inputGroupPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('have associated label element to describe its purpose', () => {
        expect(webDriver.getTextArr(inputGroupPage.standartInputLabelsArr)).toEqual(inputGroupPContent.standartInputLabels)
        expect(webDriver.getText(inputGroupPage.withFormInputLabel)).toEqual(inputGroupPContent.inputWithFormLabel);
    });

    xit('have correct placeholder text', () => {

    });

    it('have left text addon', () => {
        webDriver.waitForDisplayed(inputGroupPage.leftAlignedTextInputTextAddon);
        expect(webDriver.getText(inputGroupPage.leftAlignedTextInputTextAddon)).toContain('$');
    });

    it('have right text addon', () => {
        webDriver.waitForDisplayed(inputGroupPage.rightAlignedTextInputTextAddon);
        expect(webDriver.getText(inputGroupPage.rightAlignedTextInputTextAddon)).toContain('0.00');
    });

    it('have right and left text addons', () => {
        webDriver.waitForDisplayed(inputGroupPage.rightLeftAlignedTextInputTextAddon);
        expect(webDriver.getText(inputGroupPage.rightLeftAlignedTextInputTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.rightLeftAlignedTextInputTextAddon, 1)).toContain('0.00');
    });

    it('have button and text addons', () => {
        webDriver.waitForDisplayed(inputGroupPage.buttonInputSubmitButton);

        // Check if clickable. No logic behind the click
        expect(webDriver.getText(inputGroupPage.buttonInputLeftAndRightTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.buttonInputLeftAndRightTextAddon, 1)).toContain('0.00');
        expect(webDriver.isElementClickable(inputGroupPage.buttonInputSubmitButton)).toBe(true);
    });

    it('have icon addon', () => {
        webDriver.waitForDisplayed(inputGroupPage.iconInputEmailIcon);
    });

    it('compact have button and text addon', () => {
        webDriver.waitForDisplayed(inputGroupPage.compactGroupInput);
        expect(webDriver.getText(inputGroupPage.compactGroupLeftTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.compactGroupButtonAddon)).toContain('Submit');
        expect(webDriver.isElementClickable(inputGroupPage.compactGroupButtonAddon)).toBe(true);
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

    it('have text and button addons', () => {
        webDriver.waitForDisplayed(inputGroupPage.withFormInput);

        expect(webDriver.getText(inputGroupPage.withFormInputTextAddon)).toContain('$');
        expect(webDriver.getText(inputGroupPage.withFormInputTextAddon, 1)).toContain('0.00');
        expect(webDriver.getText(inputGroupPage.withFormInputButtonAddon)).toContain('Submit');
    });

    it('have error tooltip and visual que if empty', () => {
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

    // TODO Unxit after merge
    xit('should check RTL', () => {
        // inputGroupPage.checkRtlSwitch();
    });

});
