import { TextareaPo } from './textarea.po';
import {
    basic_text_area_label,
    basic_text_area_popover,
    basicTextareaPlaceholderArr,
    compact_text_area_label,
    counterTextareaPlaceholderArr,
    disabled_text_area_label,
    growingTextareaPlaceholderArr,
    no_platforms_form_text_area_label,
    readonly_text_area_label
} from './textarea-page-content';
import {
    fifty_character_string,
    forty_nine_character_string,
    multiple_lines_text,
    multiple_lines_text_8_lines
} from './textarea';
import {
    addValue,
    browserIsSafari,
    clearValue,
    click,
    currentPlatformName,
    executeScriptAfterTagAttr,
    executeScriptBeforeTagAttr,
    getElementArrayLength,
    getElementPlaceholder,
    getElementSize,
    getText,
    getValue,
    isElementDisplayed,
    isEnabled,
    mouseHoverElement,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    waitTextToBePresentInValue
} from '../../../../../e2e';

describe('Verify Textarea component', () => {
    const textareaPage = new TextareaPo();
    const {
        basicTextArea,
        basicTextAreaLabel,
        basicTextAreaPopoverIcon,
        basicTextAreaPopoverBody,
        readOnlyTextAreaLabel,
        disabledTextArea,
        disabledTextAreaLabel,
        growingDisabledTextarea,
        growingMaxLinesTextarea,
        growingHeightTextarea,
        withGrowingAndNoLimitsTextarea,
        withCharactersMaxNumberTextarea,
        compactTextArea,
        compactTextAreaLabel,
        detailedTextAreaLabel,
        detailedTextArea,
        detailedTextAreaErrorMessage,
        detailedTextAreaCharacterCounter,
        noPlatformsFormTextAreaLabel,
        textarea,
        textareaBasicExample,
        textareaAutogrowExample,
        textareaCounterExample,
        textareaCounterTemplateExample,
        message
    } = textareaPage;
    const copyPasteBtn = currentPlatformName() === 'Mac OS X' ? 'Command' : 'Control';

    beforeAll(() => {
        textareaPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(textareaPage.root);
        waitForElDisplayed(textareaPage.title);
    }, 1);

    describe('has Textarea and', () => {
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

        it('should check all placeholders', () => {
            checkPlaceholder(textareaBasicExample, basicTextareaPlaceholderArr);
            checkPlaceholder(textareaAutogrowExample, growingTextareaPlaceholderArr);
            checkPlaceholder(textareaCounterExample, counterTextareaPlaceholderArr);
            expect(getElementPlaceholder(textareaCounterTemplateExample + textarea)).toBe(
                counterTextareaPlaceholderArr[0]
            );
        });

        describe('if textarea is enabled', () => {
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

        it('should have * if textarea is mandatory', () => {
            const labelAsterisk = executeScriptAfterTagAttr(detailedTextAreaLabel, 'content');
            expect(labelAsterisk).toBe('"*"');
        });

        it('should see an error if trying to click empty mandatory textarea', () => {
            scrollIntoView(detailedTextArea);
            const textLength = getText('fdp-platform-textarea-counter-example fdp-textarea').length;

            for (let i = 0; i < textLength; i++) {
                click(detailedTextArea);
                sendKeys(['Backspace']);
            }
            click(detailedTextArea);
            waitForElDisplayed(detailedTextAreaErrorMessage);
            const errorText = getText(detailedTextAreaErrorMessage);

            expect(errorText.trim()).toBe('Value is required');
        });

        it('should display the counter of characters allowed to input ', () => {
            addValue(detailedTextArea, 'test');
            const charCounterText1 = getText(detailedTextAreaCharacterCounter);

            addValue(detailedTextArea, 'test');
            const charCounterText2 = getText(detailedTextAreaCharacterCounter);
            setValue(detailedTextArea, 'test');
            mouseHoverElement(detailedTextArea);
            const charCounterText3 = getText(detailedTextAreaCharacterCounter);

            expect(charCounterText1.trim()).toBe('21 characters over the limit');
            expect(charCounterText2.trim()).toBe('25 characters over the limit');
            expect(charCounterText3.trim()).toBe('6 characters remaining');
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

        xit('should grow if growing option is enabled (growing up to 5 lines)', () => {
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
            if (browserIsSafari()) {
                return;
            }
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

        it('should check over limit message for basic textarea', () => {
            checkOverLimitMessage(textareaBasicExample, 10, 2);
        });

        it('should check over limit message for aurogrow textarea', () => {
            checkOverLimitMessage(textareaAutogrowExample, 6, 1);
            checkOverLimitMessage(textareaAutogrowExample, 6, 3);
        });

        it('should check over limit message for counter textarea', () => {
            checkOverLimitMessage(textareaCounterExample, 10);
        });

        it('should check over limit message for counter template textarea', () => {
            checkOverLimitMessage(textareaCounterTemplateExample, 10);
        });

        // Disabled due to changes in inline help - now there is an icon instead of text
        xdescribe('have a visual cue ', () => {
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

        xdescribe('Check visual regression', () => {
            it('should check examples visual regression', () => {
                textareaPage.saveExampleBaselineScreenshot();
                expect(textareaPage.compareWithBaseline()).toBeLessThan(5);
            });
        });
    });

    function checkPlaceholder(example: string, placeholderArr: string[]): void {
        scrollIntoView(example);
        const textareaLength = getElementArrayLength(example + textarea);
        for (let i = 0; i < textareaLength; i++) {
            expect(getElementPlaceholder(example + textarea, i)).toBe(placeholderArr[i]);
        }
    }

    function checkOverLimitMessage(section: string, limit: number, i: number = 0): void {
        scrollIntoView(section);
        clearValue(section + textarea, i);
        click(section + textarea, i);
        for (let idx = 0; idx < limit + 1; idx++) {
            sendKeys('A');
        }
        expect(isElementDisplayed(message)).toBe(true);
        if (section === textareaBasicExample) {
            expect(getText(message).trim()).toBe('This is an example warning when used without forms.');
        }
        if (section !== textareaBasicExample) {
            expect(getText(message).trim()).toBe('Please get your character count under limit.');
        }
    }
});
