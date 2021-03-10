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
    const {
        standartInputLabelsArr, standartInputArr, leftAlignedTextInput, leftAlignedTextInputTextAddon, rightAlignedTextInput,
        rightAlignedTextInputTextAddon, leftAndRightAlignedTextInput, rightLeftAlignedTextInputTextAddon, buttonInput,
        buttonInputLeftAndRightTextAddon, buttonInputSubmitButton, iconInput, iconInputEmailIcon, compactGroupInput,
        compactGroupButtonAddon, compactGroupLeftTextAddon, disabledInput, disabledInputButton, withFormInput,
        withFormInputTextAddon, withFormInputButtonAddon, withFormInputLabel, withFormInputQuestionMark,
        withFormInputAsterixMark, withFormInputErrorTooltip, withFormInputInfoTooltip
    } = inputGroupPage;

    beforeAll(() => {
        inputGroupPage.open();
        waitForPresent(leftAlignedTextInput);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(leftAlignedTextInput);
    }, 1);

    it('have associated label element to describe its purpose', () => {
        expect(getTextArr(standartInputLabelsArr)).toEqual(standardInputLabels);
        expect(getText(withFormInputLabel)).toEqual(inputWithFormLabel);
    });

    it('have correct placeholder text', () => {
        expect(getAttributeByNameArr(standartInputArr, 'placeholder'))
            .toEqual(standardInputPlaceholders);
        expect(getAttributeByName(withFormInput, 'placeholder'))
            .toEqual(inputWithFormPlaceholder);
    });

    it('have left text addon and accept values', () => {
        waitForElDisplayed(leftAlignedTextInputTextAddon);
        setValue(leftAlignedTextInput, numeric_value);

        expect(getText(leftAlignedTextInputTextAddon)).toContain('$');
        expect(getValue(leftAlignedTextInput)).toBe(numeric_value);
    });

    it('have right text addon and accept values', () => {
        waitForElDisplayed(rightAlignedTextInputTextAddon);
        setValue(rightAlignedTextInput, numeric_value);

        expect(getText(rightAlignedTextInputTextAddon)).toContain('0.00');
        expect(getValue(rightAlignedTextInput)).toBe(numeric_value);
    });

    it('have right and left text addons and accept values', () => {
        waitForElDisplayed(rightLeftAlignedTextInputTextAddon);
        setValue(leftAndRightAlignedTextInput, numeric_value);

        expect(getText(rightLeftAlignedTextInputTextAddon)).toContain('$');
        expect(getText(rightLeftAlignedTextInputTextAddon, 1)).toContain('0.00');
        expect(getValue(leftAndRightAlignedTextInput)).toBe(numeric_value);
    });

    it('have button, text addons and accept values', () => {
        waitForElDisplayed(buttonInputSubmitButton);
        setValue(buttonInput, numeric_value);

        // Check if clickable. No logic behind the click
        expect(getText(buttonInputLeftAndRightTextAddon)).toContain('$');
        expect(getText(buttonInputLeftAndRightTextAddon, 1)).toContain('0.00');
        expect(isElementClickable(buttonInputSubmitButton)).toBe(true);
        expect(getValue(buttonInput)).toBe(numeric_value);
    });

    it('have icon addon and accept values', () => {
        waitForElDisplayed(iconInputEmailIcon);
        setValue(iconInput, email_value);

        expect(getValue(iconInput)).toBe(email_value);
    });

    it('compact have button and text addon', () => {
        waitForElDisplayed(compactGroupInput);
        setValue(compactGroupInput, string_value);

        expect(getText(compactGroupLeftTextAddon)).toContain('$');
        expect(getText(compactGroupButtonAddon)).toContain('Submit');
        expect(isElementClickable(compactGroupButtonAddon)).toBe(true);
        expect(getValue(compactGroupInput)).toBe(string_value);
    });

    it('compact be smaller than the default', () => {
        const defaultHeight = getElementSize(leftAlignedTextInput);
        const compactHeight = getElementSize(compactGroupInput);

        expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('check have disabled attr assigned', () => {
        waitForPresent(disabledInput);
        waitForElDisplayed(disabledInput);

        expect(getAttributeByName(disabledInput, 'ng-reflect-is-disabled')).toBe('true');
        expect(isEnabled(disabledInput)).toBe(false);
    });

    it('check disabled attr has disabled button', () => {
        waitForElDisplayed(disabledInput);
        expect(isElementClickable(disabledInputButton)).toBe(false);
    });

    it('with Form input have text and button addons', () => {
        waitForElDisplayed(withFormInput);
        setValue(withFormInput, numeric_value);

        expect(getText(withFormInputTextAddon)).toContain('$');
        expect(getText(withFormInputTextAddon, 1)).toContain('0.00');
        expect(getText(withFormInputButtonAddon)).toContain('Submit');
        expect(getValue(withFormInput)).toBe(numeric_value);
    });

    xit('with form input have error tooltip and visual que if empty', () => {
        waitForElDisplayed(withFormInput);
        scrollIntoView(withFormInput);
        click(withFormInput);
        click(withFormInputButtonAddon);
        mouseHoverElement(withFormInput);

        expect(executeScriptBeforeTagAttr(withFormInputQuestionMark, 'content')).toBe('"?"');
        expect(executeScriptAfterTagAttr(withFormInputAsterixMark, 'content')).toBe('"*"');
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
        waitForElDisplayed(withFormInput);
        scrollIntoView(withFormInput);
        mouseHoverElement(withFormInputQuestionMark);
        expect(getText(withFormInputInfoTooltip)).toBe('This is tooltip to help');
    });

    it('should check RTL', () => {
        inputGroupPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            inputGroupPage.saveExampleBaselineScreenshot();
            expect(inputGroupPage.compareWithBaseline()).toBeLessThan(1);
        });
    });
});
