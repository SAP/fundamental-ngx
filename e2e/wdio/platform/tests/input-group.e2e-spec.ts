import {
    browserIsIEorSafari,
    click,
    executeScriptAfterTagAttr,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getAttributeByNameArr,
    getElementSize,
    getText,
    getTextArr,
    getValue,
    isElementClickable,
    isEnabled,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { InputGroupPo } from '../pages/input-group.po';
import {inputWithFormLabel, inputWithFormPlaceholder, standardInputLabels, standardInputPlaceholders} from '../fixtures/appData/input-group-page-contents';
import {string_value, email_value, numeric_value} from '../fixtures/testData/input-group';

describe('Input Group should', function() {
    const inputGroupPage = new InputGroupPo();

    beforeAll(() => {
        inputGroupPage.open();
        waitForPresent(inputGroupPage.leftAlignedTextInput);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(inputGroupPage.leftAlignedTextInput);
    }, 1);

    it('have associated label element to describe its purpose', () => {
        expect(getTextArr(inputGroupPage.standartInputLabelsArr)).toEqual(standardInputLabels);
        expect(getText(inputGroupPage.withFormInputLabel)).toEqual(inputWithFormLabel);
    });

    it('have correct placeholder text', () => {
        expect(getAttributeByNameArr(inputGroupPage.standartInputArr, 'placeholder'))
            .toEqual(standardInputPlaceholders);
        expect(getAttributeByName(inputGroupPage.withFormInput, 'placeholder'))
            .toEqual(inputWithFormPlaceholder);
    });

    it('have left text addon and accept values', () => {
        waitForElDisplayed(inputGroupPage.leftAlignedTextInputTextAddon);
        setValue(inputGroupPage.leftAlignedTextInput, numeric_value);

        expect(getText(inputGroupPage.leftAlignedTextInputTextAddon)).toContain('$');
        expect(getValue(inputGroupPage.leftAlignedTextInput)).toBe(numeric_value);
    });

    it('have right text addon and accept values', () => {
        waitForElDisplayed(inputGroupPage.rightAlignedTextInputTextAddon);
        setValue(inputGroupPage.rightAlignedTextInput, numeric_value);

        expect(getText(inputGroupPage.rightAlignedTextInputTextAddon)).toContain('0.00');
        expect(getValue(inputGroupPage.rightAlignedTextInput)).toBe(numeric_value);
    });

    it('have right and left text addons and accept values', () => {
        waitForElDisplayed(inputGroupPage.rightLeftAlignedTextInputTextAddon);
        setValue(inputGroupPage.leftAndRightAlignedTextInput, numeric_value);

        expect(getText(inputGroupPage.rightLeftAlignedTextInputTextAddon)).toContain('$');
        expect(getText(inputGroupPage.rightLeftAlignedTextInputTextAddon, 1)).toContain('0.00');
        expect(getValue(inputGroupPage.leftAndRightAlignedTextInput)).toBe(numeric_value);
    });

    it('have button, text addons and accept values', () => {
        waitForElDisplayed(inputGroupPage.buttonInputSubmitButton);
        setValue(inputGroupPage.buttonInput, numeric_value);

        // Check if clickable. No logic behind the click
        expect(getText(inputGroupPage.buttonInputLeftAndRightTextAddon)).toContain('$');
        expect(getText(inputGroupPage.buttonInputLeftAndRightTextAddon, 1)).toContain('0.00');
        expect(isElementClickable(inputGroupPage.buttonInputSubmitButton)).toBe(true);
        expect(getValue(inputGroupPage.buttonInput)).toBe(numeric_value);
    });

    it('have icon addon and accept values', () => {
        waitForElDisplayed(inputGroupPage.iconInputEmailIcon);
        setValue(inputGroupPage.iconInput, email_value);

        expect(getValue(inputGroupPage.iconInput)).toBe(email_value);
    });

    it('compact have button and text addon', () => {
        waitForElDisplayed(inputGroupPage.compactGroupInput);
        setValue(inputGroupPage.compactGroupInput, string_value);

        expect(getText(inputGroupPage.compactGroupLeftTextAddon)).toContain('$');
        expect(getText(inputGroupPage.compactGroupButtonAddon)).toContain('Submit');
        expect(isElementClickable(inputGroupPage.compactGroupButtonAddon)).toBe(true);
        expect(getValue(inputGroupPage.compactGroupInput)).toBe(string_value);
    });

    it('compact be smaller than the default', () => {
        const defaultHeight = getElementSize(inputGroupPage.leftAlignedTextInput);
        const compactHeight = getElementSize(inputGroupPage.compactGroupInput);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('check have disabled attr assigned', () => {
        waitForPresent(inputGroupPage.disabledInput);
        waitForElDisplayed(inputGroupPage.disabledInput);

        expect(getAttributeByName(inputGroupPage.disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(isEnabled(inputGroupPage.disabledInput)).toBe(false);
    });

    it('check disabled attr has disabled button', () => {
        waitForElDisplayed(inputGroupPage.disabledInput);
        expect(isElementClickable(inputGroupPage.disabledInputButton)).toBe(false);
    });

    it('with Form input have text and button addons', () => {
        waitForElDisplayed(inputGroupPage.withFormInput);
        setValue(inputGroupPage.withFormInput, numeric_value);

        expect(getText(inputGroupPage.withFormInputTextAddon)).toContain('$');
        expect(getText(inputGroupPage.withFormInputTextAddon, 1)).toContain('0.00');
        expect(getText(inputGroupPage.withFormInputButtonAddon)).toContain('Submit');
        expect(getValue(inputGroupPage.withFormInput)).toBe(numeric_value);
    });

    xit('with form input have error tooltip and visual que if empty', () => {
        waitForElDisplayed(inputGroupPage.withFormInput);
        scrollIntoView(inputGroupPage.withFormInput);
        click(inputGroupPage.withFormInput);
        click(inputGroupPage.withFormInputButtonAddon);
        mouseHoverElement(inputGroupPage.withFormInput);

        expect(executeScriptBeforeTagAttr(inputGroupPage.withFormInputQuestionMark, 'content')).toBe('"?"');
        expect(executeScriptAfterTagAttr(inputGroupPage.withFormInputAsterixMark, 'content')).toBe('"*"');
        // TODO: Uncomment after merge
        /*        if (browserIsSafari()) {
            expect(getText(inputGroupPage.withFormInputErrorTooltip)).toEqual('Value is required');
            return;
        }
        console.log('Skip hover check for Safari');*/
    });

    xit('with form input have info tooltip', () => {
        if (browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        waitForElDisplayed(inputGroupPage.withFormInput);
        scrollIntoView(inputGroupPage.withFormInput);
        mouseHoverElement(inputGroupPage.withFormInputQuestionMark);
        expect(getText(inputGroupPage.withFormInputInfoTooltip)).toBe('This is tooltip to help');
    });

    it('should check RTL', () => {
        inputGroupPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            inputGroupPage.saveExampleBaselineScreenshot('input-group');
            expect(inputGroupPage.compareWithBaseline('input-group')).toBeLessThan(1);
        });
    });
});
