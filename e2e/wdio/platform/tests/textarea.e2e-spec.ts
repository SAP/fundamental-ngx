import { TextareaPo } from '../pages/textarea.po';
import {
    basic_text_area_label,
    basic_text_area_placeholder,
    basic_text_area_popover,
    compact_text_area_label,
    disabled_text_area_label,
    no_platforms_form_text_area_label,
    readonly_text_area_label
} from '../fixtures/appData/textarea-page-content';
import {
    fifty_character_string,
    forty_nine_character_string,
    multiple_lines_text,
    multiple_lines_text_8_lines
} from '../fixtures/testData/textarea';
import {
    addValue,
    browserIsIEorSafari,
    clearValue,
    click,
    currentPlatformName,
    executeScriptAfterTagAttr,
    executeScriptBeforeTagAttr,
    getAttributeByName,
    getCSSPropertyByName,
    getElementSize,
    getText,
    getValue,
    isEnabled,
    mouseHoverElement,
    pause,
    refreshPage,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    waitTextToBePresentInValue
} from '../../driver/wdio';

describe('Verify Textarea component', function() {
    const textareaPage = new TextareaPo();
    const {
        basicTextArea, basicTextAreaLabel, basicTextAreaPopoverIcon, basicTextAreaPopoverBody, readOnlyTextAreaLabel,
        disabledTextArea, disabledTextAreaLabel, growingDisabledTextarea, growingMaxLinesTextarea, growingHeightTextarea,
        withGrowingAndNoLimitsTextarea, withCharactersMaxNumberTextarea, compactTextArea, compactTextAreaLabel,
        detailedTextAreaLabel, detailedTextArea, detailedTextAreaErrorMessage, detailedTextAreaCharacterCounter,
        noPlatformsFormTextAreaLabel
    } = textareaPage;
    const copyPasteBtn = currentPlatformName() === 'Mac OS X' ? 'Command' : 'Control';

    beforeAll(() => {
        textareaPage.open();
        waitForPresent(readOnlyTextAreaLabel);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(readOnlyTextAreaLabel);
    }, 1);

    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
    }
    describe('has Textarea and', function() {
        it('should allow the user to enter multiple lines of text', () => {
            setValue(basicTextArea, multiple_lines_text);
            const textareaText = getValue(basicTextArea);
            expect(textareaText).toEqual(multiple_lines_text);
        });

        it('should have appropriate label', () => {
            const basicTextareaLabel = getText(basicTextAreaLabel);
            const readonlyTextareaLabel = getText(readOnlyTextAreaLabel);
            const disabledTextareaLabel = getText(disabledTextAreaLabel);
            const compactTextareaLabel = getText(compactTextAreaLabel);
            const noPlatformsFormAreaLabelText = getText(noPlatformsFormTextAreaLabel);

            expect(basicTextareaLabel).toBe(basic_text_area_label);
            expect(readonlyTextareaLabel).toBe(readonly_text_area_label);
            expect(disabledTextareaLabel).toBe(disabled_text_area_label);
            expect(compactTextareaLabel).toBe(compact_text_area_label);
            expect(noPlatformsFormAreaLabelText).toBe(no_platforms_form_text_area_label);
        });
        // No example or no restriction
        /*        xit('should be able enter maximum characters (50)', async () => {

         });*/

        it('should not be able enter text in the disabled textarea', () => {
            // Is not fully valid
            expect(isEnabled(disabledTextArea)).toBe(false);
        });

        // No example
        /*        xit('should indicate entered invalid character with red border', async () => {
        });*/

        xit('should be able to copy paste the content into textarea', () => {
            setValue(basicTextArea, fifty_character_string);
            // await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
            waitTextToBePresentInValue(basicTextArea, fifty_character_string);
            sendKeys([copyPasteBtn, 'a']);
            sendKeys([copyPasteBtn, 'c']);
            sendKeys('DELETE');
            waitTextToBePresentInValue(basicTextArea);
            const textareaTextBefore = getValue(basicTextArea);
            sendKeys([copyPasteBtn, 'v']);
            const textareaText = getValue(basicTextArea);

            expect(textareaTextBefore).toBe('');
            expect(textareaText).toBe(fifty_character_string);
        });

        it('should allow alphabets, numerical, special characters or combination of these (maybe postponed)', () => {
            setValue(basicTextArea, fifty_character_string);
            const textareaText = getValue(basicTextArea);

            expect(textareaText).toBe(fifty_character_string);
        });
        // No example
        /*        xit('should not accept restricted characters (maybe postponed)', async () => {});*/

        describe('placeholder should exhibit standard behaviour', function() {
            // The standard behaviour of place holder is under browser control, and can't be checked by webDriver,
            // Checking that placeholder is present.
            it('should appear as hint text and remain as long as text area is empty', () => {
                const textAriaPlaceholderBefore = getAttributeByName(basicTextArea, 'placeholder');

                expect(textAriaPlaceholderBefore).toBe(basic_text_area_placeholder);
            });
        });

        describe('if textarea is enabled', function() {
            xit('should be able to perform cut', () => {
                setValue(basicTextArea, fifty_character_string);
                sendKeys([copyPasteBtn, 'a']);
                pause();
                sendKeys([copyPasteBtn, 'x']);
                pause();
                const textareaTextBefore = getValue(basicTextArea);
                click(basicTextArea);
                sendKeys([copyPasteBtn, 'v']);
                pause();
                const textareaText = getValue(basicTextArea);

                expect(textareaTextBefore).toBe('');
                expect(textareaText).toBe(fifty_character_string);
            });
        });

        /*      xit('should, if disabled, be able to perform copy action ??? ', async () => {
                });
        */

        it('should have focused state', () => {
            mouseHoverElement(basicTextArea);
            const borderColorOnHover = getCSSPropertyByName(basicTextArea, 'border-bottom-color');
            expect(borderColorOnHover.value).toContain('8,84,160'); // TODO: Replace with hex
        });

        it('should have hover state', () => {
            const borderStyleBefore = getCSSPropertyByName(basicTextArea, 'outline-style');
            click(basicTextArea);
            const borderStyle = getCSSPropertyByName(basicTextArea, 'outline-style');
            expect(borderStyleBefore.value).toBe('none');
            expect(borderStyle.value).toBe('dotted');
        });

        it('should have * if textarea is mandatory', () => {
            const labelAsterisk = executeScriptAfterTagAttr(detailedTextAreaLabel, 'content');
            expect(labelAsterisk).toBe('"*"');
        });

        it('should see an error if trying to submit empty mandatory textarea', () => {
            clearValue(detailedTextArea);
            const borderColor = getCSSPropertyByName(detailedTextArea, 'border-bottom-color');
            mouseHoverElement(detailedTextArea);
            const errorText = getText(detailedTextAreaErrorMessage);

            expect(borderColor.value).toContain('187,0,0');  // TODO: Replace with hex
            expect(errorText.trim()).toBe('Value is required');
        });
        // TODO: Need to be fixed for EdgeWin
        xit('should display the counter of characters allowed to input ', () => {
            // need to sendKeys because of the issue with characters counter
            addValue(detailedTextArea, 'test');
            const charCounterText1 = getText(detailedTextAreaCharacterCounter);
            const borderColorBefore = getCSSPropertyByName(detailedTextArea, 'border-bottom-color');

            addValue(detailedTextArea, 'test');
            const charCounterText2 = getText(detailedTextAreaCharacterCounter);
            setValue(detailedTextArea, 'test');
            mouseHoverElement(detailedTextArea);
            const borderColorAfter = getCSSPropertyByName(detailedTextArea, 'border-bottom-color');
            const charCounterText3 = getText(detailedTextAreaCharacterCounter);

            expect(charCounterText1.trim()).toBe('21 characters over the limit');
            expect(charCounterText2.trim()).toBe('25 characters over the limit');
            expect(borderColorBefore.value).toContain('187,0,0');
            expect(charCounterText3.trim()).toBe('6 characters remaining');
            expect(borderColorAfter.value).toContain('8,84,160');
        });

        it('should show error if more than permitted characters were added', () => {
            // need to sendKeys because of the issue with characters counter
            addValue(detailedTextArea, 'test');
            mouseHoverElement(detailedTextArea);
            const errorText = getText(detailedTextAreaErrorMessage);

            expect(errorText).toContain('Please get your character count under limit.');
        });

        it('should have compact smaller than basic', () => {
            const basicTextareaSize = getElementSize(basicTextArea);
            const compactTextareaSize = getElementSize(compactTextArea);

            expect(basicTextareaSize.height > compactTextareaSize.height).toBe(true);
        });

        it('should not change size if growing is disabled', () => {
            const textareaSizeBefore = getElementSize(growingDisabledTextarea);
            addValue(growingDisabledTextarea, multiple_lines_text_8_lines);
            const textareaSizeAfter = getElementSize(growingDisabledTextarea);

            expect(textareaSizeBefore.height).toBe(textareaSizeAfter.height);
        });

        it('should grow if growing option is enabled (growing up to 5 lines)', () => {
            clearValue(growingMaxLinesTextarea);
            const textareaSize1 = getElementSize(growingMaxLinesTextarea);
            setValue(growingMaxLinesTextarea, multiple_lines_text);
            const textareaSize2 = getElementSize(growingMaxLinesTextarea);
            addValue(growingMaxLinesTextarea, multiple_lines_text);
            const textareaSize3 = getElementSize(growingMaxLinesTextarea);

            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toEqual(textareaSize3.height);
        });

        it('should grow if growing option is enabled (growing up to 80px)', () => {
            clearValue(growingHeightTextarea);
            const textareaSize1 = getElementSize(growingHeightTextarea);
            setValue(growingHeightTextarea, multiple_lines_text_8_lines);
            const textareaSize2 = getElementSize(growingHeightTextarea);

            expect(textareaSize1.height).toBeLessThanOrEqual(textareaSize2.height);
            expect(textareaSize2.height).toEqual(80);
        });

        it('should grow if growing option is enabled and no maxLine or maxHeight are ser', () => {
            // TODO: Check if clearValue can be removed setValue clears bu default
            clearValue(withGrowingAndNoLimitsTextarea);
            const textareaSize1 = getElementSize(withGrowingAndNoLimitsTextarea);
            setValue(withGrowingAndNoLimitsTextarea, multiple_lines_text_8_lines);
            const textareaSize2 = getElementSize(withGrowingAndNoLimitsTextarea);
            addValue(withGrowingAndNoLimitsTextarea, multiple_lines_text_8_lines);
            const textareaSize3 = getElementSize(withGrowingAndNoLimitsTextarea);

            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toBeLessThan(textareaSize3.height);
        });

        it('should not accept more than 10 characters ', () => {
            setValue(withCharactersMaxNumberTextarea, forty_nine_character_string);
            const currentText = getValue(withCharactersMaxNumberTextarea);

            expect(currentText.length).toBe(10);
        });

        // Disabled due to changes in inline help - now there is an icon instead of text
        xdescribe('have a visual cue ', function() {
            it('should have ? mark by default', () => {
                const popoverIconContent = executeScriptBeforeTagAttr(basicTextAreaPopoverIcon, 'content');
                expect(popoverIconContent).toBe('"?"');
            });

            it('should have popover with text', () => {
                mouseHoverElement(basicTextAreaPopoverIcon);
                waitForElDisplayed(basicTextAreaPopoverBody);
                const popoverText = getText(basicTextAreaPopoverBody);
                expect(popoverText).toContain(basic_text_area_popover);
            });
        });

        describe('Check visual regression', function() {
            it('should check examples visual regression', () => {
                textareaPage.saveExampleBaselineScreenshot();
                expect(textareaPage.compareWithBaseline()).toBeLessThan(3);
            });
        });
    });

});
