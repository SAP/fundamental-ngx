import {
    browserIsIEorSafari,
    click,
    executeScriptAfterTagAttr,
    getAttributeByNameArr,
    getElementPlaceholder,
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
} from '../../../../../e2e';
import { InputGroupPo } from './input-group.po';
import {
    inputWithFormLabel,
    inputWithFormPlaceholder,
    standardInputLabels,
    standardInputPlaceholders
} from './input-group-page-contents';
import { email_value, numeric_value, string_value } from './input-group';

declare const $$: any;

describe('Input Group should', () => {
    const inputGroupPage = new InputGroupPo();
    const {
        standartInputLabelsArr,
        standartInputArr,
        leftAlignedTextInput,
        leftAlignedTextInputTextAddon,
        rightAlignedTextInput,
        rightAlignedTextInputTextAddon,
        leftAndRightAlignedTextInput,
        rightLeftAlignedTextInputTextAddon,
        buttonInput,
        buttonInputLeftAndRightTextAddon,
        buttonInputSubmitButton,
        iconInput,
        iconInputEmailIcon,
        compactGroupInput,
        compactGroupButtonAddon,
        compactGroupLeftTextAddon,
        disabledInput,
        disabledInputButton,
        withFormInput,
        withFormInputTextAddon,
        withFormInputButtonAddon,
        withFormInputLabel,
        withFormInputQuestionMark,
        withFormInputAsterixMark,
        withFormInputInfoTooltip
    } = inputGroupPage;

    beforeAll(async () => {
        await inputGroupPage.open();
        await waitForPresent(leftAlignedTextInput);
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(inputGroupPage.root);
        await waitForElDisplayed(inputGroupPage.title);
    }, 1);

    it('have associated label element to describe its purpose', async () => {
        await expect(await getTextArr(standartInputLabelsArr)).toEqual(standardInputLabels);
        await expect(await getText(withFormInputLabel)).toEqual(inputWithFormLabel);
    });

    it('have correct placeholder text', async () => {
        await expect(await getAttributeByNameArr(standartInputArr, 'placeholder')).toEqual(standardInputPlaceholders);
        await expect(await getElementPlaceholder(withFormInput)).toEqual(inputWithFormPlaceholder);
    });

    it('have left text addon and accept values', async () => {
        await waitForElDisplayed(leftAlignedTextInputTextAddon);
        await setValue(leftAlignedTextInput, numeric_value);

        await expect(await getText(leftAlignedTextInputTextAddon)).toContain('$');
        await expect(await getValue(leftAlignedTextInput)).toBe(numeric_value);
    });

    it('have right text addon and accept values', async () => {
        await waitForElDisplayed(rightAlignedTextInputTextAddon);
        await setValue(rightAlignedTextInput, numeric_value);

        await expect(await getText(rightAlignedTextInputTextAddon)).toContain('USD');
        await expect(await getValue(rightAlignedTextInput)).toBe(numeric_value);
    });

    it('have right and left text addons and accept values', async () => {
        await waitForElDisplayed(rightLeftAlignedTextInputTextAddon);
        await setValue(leftAndRightAlignedTextInput, numeric_value);

        await expect(await getText(rightLeftAlignedTextInputTextAddon)).toContain('$');
        await expect(await getText(rightLeftAlignedTextInputTextAddon, 1)).toContain('USD');
        await expect(await getValue(leftAndRightAlignedTextInput)).toBe(numeric_value);
    });

    it('have button, text addons and accept values', async () => {
        await waitForElDisplayed(buttonInputSubmitButton);
        await setValue(buttonInput, numeric_value);

        // Check if clickable. No logic behind the click
        await expect(await getText(buttonInputLeftAndRightTextAddon)).toContain('$');
        await expect(await getText(buttonInputLeftAndRightTextAddon, 1)).toContain('USD');
        await expect(await isElementClickable(buttonInputSubmitButton)).toBe(true);
        await expect(await getValue(buttonInput)).toBe(numeric_value);
    });

    it('have icon addon and accept values', async () => {
        await waitForElDisplayed(iconInputEmailIcon);
        await setValue(iconInput, email_value);

        await expect(await getValue(iconInput)).toBe(email_value);
    });

    it('compact have button and text addon', async () => {
        await waitForElDisplayed(compactGroupInput);
        await setValue(compactGroupInput, string_value);

        await expect(await getText(compactGroupLeftTextAddon)).toContain('$');
        await expect(await getText(compactGroupButtonAddon)).toContain('Submit');
        await expect(await isElementClickable(compactGroupButtonAddon)).toBe(true);
        await expect(await getValue(compactGroupInput)).toBe(string_value);
    });

    it('compact be smaller than the default', async () => {
        const defaultHeight = await getElementSize(leftAlignedTextInput);
        const compactHeight = await getElementSize(compactGroupInput);

        await expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('check have disabled attr assigned', async () => {
        await waitForPresent(disabledInput);
        await scrollIntoView(disabledInput);

        await expect(await isEnabled(disabledInput)).toBe(false);
    });

    it('check disabled attr has disabled button', async () => {
        await waitForElDisplayed(disabledInput);
        await expect(await isElementClickable(disabledInputButton)).toBe(false);
    });

    it('with Form input have text and button addons', async () => {
        await waitForElDisplayed(withFormInput);
        await setValue(withFormInput, numeric_value);

        await expect(await getText(withFormInputTextAddon)).toContain('$');
        await expect(await getText(withFormInputTextAddon, 1)).toContain('USD');
        await expect(await getText(withFormInputButtonAddon)).toContain('Submit');
        await expect(await getValue(withFormInput)).toBe(numeric_value);
    });

    it('with form input have error tooltip and visual que if empty', async () => {
        await waitForElDisplayed(withFormInput);
        await scrollIntoView(withFormInput);
        await click(withFormInput);
        await click(withFormInputButtonAddon);
        await mouseHoverElement(withFormInput);

        await expect(await $$(withFormInputQuestionMark)).toBeTruthy();

        await expect(await executeScriptAfterTagAttr(withFormInputAsterixMark, 'content')).toBe('"*"');
        await expect((await getText(inputGroupPage.withFormInputErrorTooltip)).trim()).toEqual('Value is required');
    });

    it('with form input have info tooltip', async () => {
        if (await browserIsIEorSafari()) {
            console.log('Skip for IE and Safari');
            return;
        }
        await waitForElDisplayed(withFormInput);
        await scrollIntoView(withFormInput);
        await click(withFormInputQuestionMark);
        await expect(await getText(withFormInputInfoTooltip)).toBe('This is tooltip to help');
    });

    it('should check RTL', async () => {
        await inputGroupPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await inputGroupPage.saveExampleBaselineScreenshot();
            await expect(await inputGroupPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
