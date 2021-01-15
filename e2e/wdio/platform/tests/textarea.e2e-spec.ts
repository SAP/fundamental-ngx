import { TextareaPo } from '../pages/textarea.po';
import textAreaPageContent from '../fixtures/appData/textarea-page-content';
import testData from '../fixtures/testData/textarea';
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
    const copyPasteBtn = currentPlatformName() === 'Mac OS X' ? 'Command' : 'Control';
    beforeAll(() => {
        textareaPage.open();
        waitForPresent(textareaPage.readOnlyTextAreaLabel);
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(textareaPage.readOnlyTextAreaLabel);
    }, 1);

    if (browserIsIEorSafari()) {
        console.log('Skip for IE and Safari');
    }
    describe('has Textarea and', function() {
        it('should allow the user to enter multiple lines of text', () => {
            setValue(textareaPage.basicTextArea, testData.multiple_lines_text);
            const textareaText = getValue(textareaPage.basicTextArea);
            expect(textareaText).toEqual(testData.multiple_lines_text);
        });

        it('should have appropriate label', () => {
            const basicTextareaLabel = getText(textareaPage.basicTextAreaLabel);
            const readonlyTextareaLabel = getText(textareaPage.readOnlyTextAreaLabel);
            const disabledTextareaLabel = getText(textareaPage.disabledTextAreaLabel);
            const compactTextareaLabel = getText(textareaPage.compactTextAreaLabel);
            const noPlatformsFormTextAreaLabel = getText(textareaPage.noPlatformsFormTextAreaLabel);

            expect(basicTextareaLabel).toBe(textAreaPageContent.basic_text_area_label);
            expect(readonlyTextareaLabel).toBe(textAreaPageContent.readonly_text_area_label);
            expect(disabledTextareaLabel).toBe(textAreaPageContent.disabled_text_area_label);
            expect(compactTextareaLabel).toBe(textAreaPageContent.compact_text_area_label);
            expect(noPlatformsFormTextAreaLabel).toBe(textAreaPageContent.no_platforms_form_text_area_label);
        });
        // No example or no restriction
        /*        xit('should be able enter maximum characters (50)', async () => {

         });*/

        it('should not be able enter text in the disabled textarea', () => {
            // Is not fully valid
            expect(isEnabled(textareaPage.disabledTextArea)).toBe(false);
        });

        // No example
        /*        xit('should indicate entered invalid character with red border', async () => {
        });*/

        xit('should be able to copy paste the content into textarea', () => {
            setValue(textareaPage.basicTextArea, testData.fifty_character_string);
            // await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
            waitTextToBePresentInValue(textareaPage.basicTextArea, testData.fifty_character_string);
            sendKeys([copyPasteBtn, 'a']);
            sendKeys([copyPasteBtn, 'c']);
            sendKeys('DELETE');
            waitTextToBePresentInValue(textareaPage.basicTextArea);
            const textareaTextBefore = getValue(textareaPage.basicTextArea);
            sendKeys([copyPasteBtn, 'v']);
            const textareaText = getValue(textareaPage.basicTextArea);

            expect(textareaTextBefore).toBe('');
            expect(textareaText).toBe(testData.fifty_character_string);
        });

        it('should allow alphabets, numerical, special characters or combination of these (maybe postponed)', () => {
            setValue(textareaPage.basicTextArea, testData.fifty_character_string);
            const textareaText = getValue(textareaPage.basicTextArea);

            expect(textareaText).toBe(testData.fifty_character_string);
        });
        // No example
        /*        xit('should not accept restricted characters (maybe postponed)', async () => {});*/

        describe('placeholder should exhibit standard behaviour', function() {
            // The standard behaviour of place holder is under browser control, and can't be checked by webDriver,
            // Checking that placeholder is present.
            it('should appear as hint text and remain as long as text area is empty', () => {
                const textAriaPlaceholderBefore = getAttributeByName(textareaPage.basicTextArea, 'placeholder');

                expect(textAriaPlaceholderBefore).toBe(textAreaPageContent.basic_text_area_placeholder);
            });
        });

        describe('if textarea is enabled', function() {
            xit('should be able to perform cut', () => {
                setValue(textareaPage.basicTextArea, testData.fifty_character_string);
                sendKeys([copyPasteBtn, 'a']);
                pause();
                sendKeys([copyPasteBtn, 'x']);
                pause();
                const textareaTextBefore = getValue(textareaPage.basicTextArea);
                click(textareaPage.basicTextArea);
                sendKeys([copyPasteBtn, 'v']);
                pause();
                const textareaText = getValue(textareaPage.basicTextArea);

                expect(textareaTextBefore).toBe('');
                expect(textareaText).toBe(testData.fifty_character_string);
            });
        });

        /*      xit('should, if disabled, be able to perform copy action ??? ', async () => {
                });
        */

        it('should have focused state', () => {
            mouseHoverElement(textareaPage.basicTextArea);
            const borderColorOnHover = getCSSPropertyByName(textareaPage.basicTextArea, 'border-bottom-color');
            expect(borderColorOnHover.value).toContain('8,84,160'); // TODO: Replace with hex
        });

        it('should have hover state', () => {
            const borderStyleBefore = getCSSPropertyByName(textareaPage.basicTextArea, 'outline-style');
            click(textareaPage.basicTextArea);
            const borderStyle = getCSSPropertyByName(textareaPage.basicTextArea, 'outline-style');
            expect(borderStyleBefore.value).toBe('none');
            expect(borderStyle.value).toBe('dotted');
        });

        it('should have * if textarea is mandatory', () => {
            const labelAsterisk = executeScriptAfterTagAttr(textareaPage.detailedTextAreaLabel, 'content');
            expect(labelAsterisk).toBe('"*"');
        });

        it('should see an error if trying to submit empty mandatory textarea', () => {
            clearValue(textareaPage.detailedTextArea);
            const borderColor = getCSSPropertyByName(textareaPage.detailedTextArea, 'border-bottom-color');
            mouseHoverElement(textareaPage.detailedTextArea);
            const errorText = getText(textareaPage.detailedTextAreaErrorMessage);

            expect(borderColor.value).toContain('187,0,0');  // TODO: Replace with hex
            expect(errorText.trim()).toBe('Value is required');
        });
        // TODO: Need to be fixed for EdgeWin
        xit('should display the counter of characters allowed to input ', () => {
            // need to sendKeys because of the issue with characters counter
            addValue(textareaPage.detailedTextArea, 'test');
            const charCounterText1 = getText(textareaPage.detailedTextAreaCharacterCounter);
            const borderColorBefore = getCSSPropertyByName(textareaPage.detailedTextArea, 'border-bottom-color');

            addValue(textareaPage.detailedTextArea, 'test');
            const charCounterText2 = getText(textareaPage.detailedTextAreaCharacterCounter);
            setValue(textareaPage.detailedTextArea, 'test');
            mouseHoverElement(textareaPage.detailedTextArea);
            const borderColorAfter = getCSSPropertyByName(textareaPage.detailedTextArea, 'border-bottom-color');
            const charCounterText3 = getText(textareaPage.detailedTextAreaCharacterCounter);

            expect(charCounterText1.trim()).toBe('21 characters over the limit');
            expect(charCounterText2.trim()).toBe('25 characters over the limit');
            expect(borderColorBefore.value).toContain('187,0,0');
            expect(charCounterText3.trim()).toBe('6 characters remaining');
            expect(borderColorAfter.value).toContain('8,84,160');
        });

        it('should show error if more than permitted characters were added', () => {
            // need to sendKeys because of the issue with characters counter
            addValue(textareaPage.detailedTextArea, 'test');
            mouseHoverElement(textareaPage.detailedTextArea);
            const errorText = getText(textareaPage.detailedTextAreaErrorMessage);

            expect(errorText).toContain('Please get your character count under limit.');
        });

        it('should have compact smaller than basic', () => {
            const basicTextareaSize = getElementSize(textareaPage.basicTextArea);
            const compactTextareaSize = getElementSize(textareaPage.compactTextArea);

            expect(basicTextareaSize.height > compactTextareaSize.height).toBe(true);
        });

        it('should not change size if growing is disabled', () => {
            const textareaSizeBefore = getElementSize(textareaPage.growingDisabledTextarea);
            addValue(textareaPage.growingDisabledTextarea, testData.multiple_lines_text_8_lines);
            const textareaSizeAfter = getElementSize(textareaPage.growingDisabledTextarea);

            expect(textareaSizeBefore.height).toBe(textareaSizeAfter.height);
        });

        it('should grow if growing option is enabled (growing up to 5 lines)', () => {
            clearValue(textareaPage.growingMaxLinesTextarea);
            const textareaSize1 = getElementSize(textareaPage.growingMaxLinesTextarea);
            setValue(textareaPage.growingMaxLinesTextarea, testData.multiple_lines_text);
            const textareaSize2 = getElementSize(textareaPage.growingMaxLinesTextarea);
            addValue(textareaPage.growingMaxLinesTextarea, testData.multiple_lines_text);
            const textareaSize3 = getElementSize(textareaPage.growingMaxLinesTextarea);

            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toEqual(textareaSize3.height);
        });

        it('should grow if growing option is enabled (growing up to 80px)', () => {
            clearValue(textareaPage.growingHeightTextarea);
            const textareaSize1 = getElementSize(textareaPage.growingHeightTextarea);
            setValue(textareaPage.growingHeightTextarea, testData.multiple_lines_text_8_lines);
            const textareaSize2 = getElementSize(textareaPage.growingHeightTextarea);

            expect(textareaSize1.height).toBeLessThanOrEqual(textareaSize2.height);
            expect(textareaSize2.height).toEqual(80);
        });

        it('should grow if growing option is enabled and no maxLine or maxHeight are ser', () => {
            // TODO: Check if clearValue can be removed setValue clears bu default
            clearValue(textareaPage.withGrowingAndNoLimitsTextarea);
            const textareaSize1 = getElementSize(textareaPage.withGrowingAndNoLimitsTextarea);
            setValue(textareaPage.withGrowingAndNoLimitsTextarea, testData.multiple_lines_text_8_lines);
            const textareaSize2 = getElementSize(textareaPage.withGrowingAndNoLimitsTextarea);
            addValue(textareaPage.withGrowingAndNoLimitsTextarea, testData.multiple_lines_text_8_lines);
            const textareaSize3 = getElementSize(textareaPage.withGrowingAndNoLimitsTextarea);

            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toBeLessThan(textareaSize3.height);
        });

        it('should not accept more than 10 characters ', () => {
            setValue(textareaPage.withCharactersMaxNumberTextarea, testData.forty_nine_character_string);
            const currentText = getValue(textareaPage.withCharactersMaxNumberTextarea);

            expect(currentText.length).toBe(10);
        });

        // Disabled due to changes in inline help - now there is an icon instead of text
        xdescribe('have a visual cue ', function() {
            it('should have ? mark by default', () => {
                const popoverIconContant = executeScriptBeforeTagAttr(textareaPage.basicTextAreaPopoverIcon, 'content');
                expect(popoverIconContant).toBe('"?"');
            });

            it('should have popover with text', () => {
                mouseHoverElement(textareaPage.basicTextAreaPopoverIcon);
                waitForElDisplayed(textareaPage.basicTextAreaPopoverBody);
                const popoverText = getText(textareaPage.basicTextAreaPopoverBody);
                expect(popoverText).toContain(textAreaPageContent.basic_text_area_popover);
            });
        });
    });

});
