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

    beforeAll(async () => {
        await textareaPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(textareaPage.root);
        await waitForElDisplayed(textareaPage.title);
    }, 1);

    describe('has Textarea and', () => {
        it('should allow the user to enter multiple lines of text', async () => {
            await setValue(basicTextArea, multiple_lines_text);
            const textareaText = await getValue(basicTextArea);
            await expect(textareaText).toEqual(multiple_lines_text);
        });

        it('should have appropriate label', async () => {
            const basicTextareaLabel = await getText(basicTextAreaLabel);
            const readonlyTextareaLabel = await getText(readOnlyTextAreaLabel);
            const disabledTextareaLabel = await getText(disabledTextAreaLabel);
            const compactTextareaLabel = await getText(compactTextAreaLabel);
            const noPlatformsFormAreaLabelText = await getText(noPlatformsFormTextAreaLabel);

            await expect(basicTextareaLabel).toBe(basic_text_area_label);
            await expect(readonlyTextareaLabel).toBe(readonly_text_area_label);
            await expect(disabledTextareaLabel).toBe(disabled_text_area_label);
            await expect(compactTextareaLabel).toBe(compact_text_area_label);
            await expect(noPlatformsFormAreaLabelText).toBe(no_platforms_form_text_area_label);
        });
        // No example or no restriction
        /*        xit('should be able enter maximum characters (50)', async () => {

         });*/

        it('should not be able enter text in the disabled textarea', async () => {
            // Is not fully valid
            await expect(await isEnabled(disabledTextArea)).toBe(false);
        });

        // No example
        /*        xit('should indicate entered invalid character with red border', async () => {
        });*/

        xit('should be able to copy paste the content into textarea', async () => {
            await setValue(basicTextArea, fifty_character_string);
            // await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
            await waitTextToBePresentInValue(basicTextArea, fifty_character_string);
            await sendKeys([copyPasteBtn, 'a']);
            await sendKeys([copyPasteBtn, 'c']);
            await sendKeys('DELETE');
            await waitTextToBePresentInValue(basicTextArea);
            const textareaTextBefore = await getValue(basicTextArea);
            await sendKeys([copyPasteBtn, 'v']);
            const textareaText = await getValue(basicTextArea);

            await expect(textareaTextBefore).toBe('');
            await expect(textareaText).toBe(fifty_character_string);
        });

        it('should allow alphabets, numerical, special characters or combination of these (maybe postponed)', async () => {
            await setValue(basicTextArea, fifty_character_string);
            const textareaText = await getValue(basicTextArea);

            await expect(textareaText).toBe(fifty_character_string);
        });
        // No example
        /*        xit('should not accept restricted characters (maybe postponed)', async () => {});*/

        it('should check all placeholders', async () => {
            await checkPlaceholder(textareaBasicExample, basicTextareaPlaceholderArr);
            await checkPlaceholder(textareaAutogrowExample, growingTextareaPlaceholderArr);
            await checkPlaceholder(textareaCounterExample, counterTextareaPlaceholderArr);
            await expect(await getElementPlaceholder(textareaCounterTemplateExample + textarea)).toBe(
                counterTextareaPlaceholderArr[0]
            );
        });

        describe('if textarea is enabled', () => {
            xit('should be able to perform cut', async () => {
                await setValue(basicTextArea, fifty_character_string);
                await sendKeys([copyPasteBtn, 'a']);
                await pause();
                await sendKeys([copyPasteBtn, 'x']);
                await pause();
                const textareaTextBefore = await getValue(basicTextArea);
                await click(basicTextArea);
                await sendKeys([copyPasteBtn, 'v']);
                await pause();
                const textareaText = await getValue(basicTextArea);

                await expect(textareaTextBefore).toBe('');
                await expect(textareaText).toBe(fifty_character_string);
            });
        });

        /*      xit('should, if disabled, be able to perform copy action ??? ', async () => {
                });
        */

        it('should have * if textarea is mandatory', async () => {
            const labelAsterisk = await executeScriptAfterTagAttr(detailedTextAreaLabel, 'content');
            await expect(labelAsterisk).toBe('"*"');
        });

        it('should see an error if trying to click empty mandatory textarea', async () => {
            await scrollIntoView(detailedTextArea);
            const textLength = (await getText('fdp-platform-textarea-counter-example fdp-textarea')).length;

            for (let i = 0; i < textLength; i++) {
                await click(detailedTextArea);
                await sendKeys(['Backspace']);
            }
            await click(detailedTextArea);
            await waitForElDisplayed(detailedTextAreaErrorMessage);
            const errorText = await getText(detailedTextAreaErrorMessage);

            await expect(errorText.trim()).toBe('Value is required');
        });

        it('should display the counter of characters allowed to input ', async () => {
            await addValue(detailedTextArea, 'test');
            const charCounterText1 = await getText(detailedTextAreaCharacterCounter);

            await addValue(detailedTextArea, 'test');
            const charCounterText2 = await getText(detailedTextAreaCharacterCounter);
            await setValue(detailedTextArea, 'test');
            await mouseHoverElement(detailedTextArea);
            const charCounterText3 = await getText(detailedTextAreaCharacterCounter);

            await expect(charCounterText1.trim()).toBe('21 characters over the limit');
            await expect(charCounterText2.trim()).toBe('25 characters over the limit');
            await expect(charCounterText3.trim()).toBe('6 characters remaining');
        });

        it('should show error if more than permitted characters were added', async () => {
            // need to sendKeys because of the issue with characters counter
            await addValue(detailedTextArea, 'test');
            await mouseHoverElement(detailedTextArea);
            const errorText = await getText(detailedTextAreaErrorMessage);

            await expect(errorText).toContain('Please get your character count under limit.');
        });

        it('should have compact smaller than basic', async () => {
            const basicTextareaSize = await getElementSize(basicTextArea);
            const compactTextareaSize = await getElementSize(compactTextArea);

            await expect(basicTextareaSize.height > compactTextareaSize.height).toBe(true);
        });

        it('should not change size if growing is disabled', async () => {
            const textareaSizeBefore = await getElementSize(growingDisabledTextarea);
            await addValue(growingDisabledTextarea, multiple_lines_text_8_lines);
            const textareaSizeAfter = await getElementSize(growingDisabledTextarea);

            await expect(textareaSizeBefore.height).toBe(textareaSizeAfter.height);
        });

        xit('should grow if growing option is enabled (growing up to 5 lines)', async () => {
            await clearValue(growingMaxLinesTextarea);
            const textareaSize1 = await getElementSize(growingMaxLinesTextarea);
            await setValue(growingMaxLinesTextarea, multiple_lines_text);
            const textareaSize2 = await getElementSize(growingMaxLinesTextarea);
            await addValue(growingMaxLinesTextarea, multiple_lines_text);
            const textareaSize3 = await getElementSize(growingMaxLinesTextarea);

            await expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            await expect(textareaSize2.height).toEqual(textareaSize3.height);
        });

        it('should grow if growing option is enabled (growing up to 80px)', async () => {
            if (await browserIsSafari()) {
                return;
            }
            await clearValue(growingHeightTextarea);
            const textareaSize1 = await getElementSize(growingHeightTextarea);
            await setValue(growingHeightTextarea, multiple_lines_text_8_lines);
            const textareaSize2 = await getElementSize(growingHeightTextarea);

            await expect(textareaSize1.height).toBeLessThanOrEqual(textareaSize2.height);
            await expect(textareaSize2.height).toEqual(80);
        });

        it('should grow if growing option is enabled and no maxLine or maxHeight are ser', async () => {
            // TODO: Check if clearValue can be removed setValue clears bu default
            await clearValue(withGrowingAndNoLimitsTextarea);
            const textareaSize1 = await getElementSize(withGrowingAndNoLimitsTextarea);
            await setValue(withGrowingAndNoLimitsTextarea, multiple_lines_text_8_lines);
            const textareaSize2 = await getElementSize(withGrowingAndNoLimitsTextarea);
            await addValue(withGrowingAndNoLimitsTextarea, multiple_lines_text_8_lines);
            const textareaSize3 = await getElementSize(withGrowingAndNoLimitsTextarea);

            await expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            await expect(textareaSize2.height).toBeLessThan(textareaSize3.height);
        });

        it('should not accept more than 10 characters ', async () => {
            await setValue(withCharactersMaxNumberTextarea, forty_nine_character_string);
            const currentText = await getValue(withCharactersMaxNumberTextarea);

            await expect(currentText.length).toBe(10);
        });

        it('should check over limit message for basic textarea', async () => {
            await checkOverLimitMessage(textareaBasicExample, 10, 2);
        });

        it('should check over limit message for aurogrow textarea', async () => {
            await checkOverLimitMessage(textareaAutogrowExample, 6, 1);
            await checkOverLimitMessage(textareaAutogrowExample, 6, 3);
        });

        it('should check over limit message for counter textarea', async () => {
            await checkOverLimitMessage(textareaCounterExample, 10);
        });

        it('should check over limit message for counter template textarea', async () => {
            await checkOverLimitMessage(textareaCounterTemplateExample, 10);
        });

        // Disabled due to changes in inline help - now there is an icon instead of text
        xdescribe('have a visual cue ', () => {
            it('should have ? mark by default', async () => {
                const popoverIconContent = await executeScriptBeforeTagAttr(basicTextAreaPopoverIcon, 'content');
                await expect(popoverIconContent).toBe('"?"');
            });

            it('should have popover with text', async () => {
                await mouseHoverElement(basicTextAreaPopoverIcon);
                await waitForElDisplayed(basicTextAreaPopoverBody);
                const popoverText = await getText(basicTextAreaPopoverBody);
                await expect(popoverText).toContain(basic_text_area_popover);
            });
        });

        xdescribe('Check visual regression', () => {
            it('should check examples visual regression', async () => {
                await textareaPage.saveExampleBaselineScreenshot();
                await expect(await textareaPage.compareWithBaseline()).toBeLessThan(5);
            });
        });
    });

    async function checkPlaceholder(example: string, placeholderArr: string[]): Promise<void> {
        await scrollIntoView(example);
        const textareaLength = await getElementArrayLength(example + textarea);
        for (let i = 0; i < textareaLength; i++) {
            await expect(await getElementPlaceholder(example + textarea, i)).toBe(placeholderArr[i]);
        }
    }

    async function checkOverLimitMessage(section: string, limit: number, i: number = 0): Promise<void> {
        await scrollIntoView(section);
        await clearValue(section + textarea, i);
        await click(section + textarea, i);
        for (let idx = 0; idx < limit + 1; idx++) {
            await sendKeys('A');
        }
        await expect(await isElementDisplayed(message)).toBe(true);
        if (section === textareaBasicExample) {
            await expect((await getText(message)).trim()).toBe('This is an example warning when used without forms.');
        }
        if (section !== textareaBasicExample) {
            await expect((await getText(message)).trim()).toBe('Please get your character count under limit.');
        }
    }
});
