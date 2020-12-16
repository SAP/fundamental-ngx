import { browser, Key } from 'protractor';
import { TextareaPo } from '../pages/textarea.po';
import textAreaPageContent from '../fixtures/appData/textarea-page-content';
import testData from '../fixtures/testData/textarea';
import {
    getValueOfAttribute,
    getValueOfAttributeValue,
    hoverMouse,
    setInput,
    waitForTextToBePresentInElementValue, waitForVisible
} from '../../helper/helper';


describe('Verify Textarea component', function() {
    const textareaPage = new TextareaPo();
    const copyPasteBtn = process.platform === 'darwin' ? 'COMMAND' : 'CONTROL';
    beforeAll(async () => {
        await textareaPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    describe('has Textarea and', function() {
        it('should allow the user to enter multiple lines of text', async () => {
            await setInput(await textareaPage.basicTextArea, testData.multiple_lines_text);
            const textareaText = await getValueOfAttributeValue(await textareaPage.basicTextArea);

            expect(textareaText).toEqual(testData.multiple_lines_text);
        });

        it('should have appropriate label', async () => {
            const basicTextareaLabel = await textareaPage.basicTextAreaLabel.getText();
            const readonlyTextareaLabel = await textareaPage.readOnlyTextAreaLabel.getText();
            const disabledTextareaLabel = await textareaPage.disabledTextAreaLabel.getText();
            const compactTextareaLabel = await textareaPage.compactTextAreaLabel.getText();
            const noPlatformsFormTextAreaLabel = await textareaPage.noPlatformsFormTextAreaLabel.getText();

            expect(basicTextareaLabel).toBe(textAreaPageContent.basic_text_area_label);
            expect(readonlyTextareaLabel).toBe(textAreaPageContent.readonly_text_area_label);
            expect(disabledTextareaLabel).toBe(textAreaPageContent.disabled_text_area_label);
            expect(compactTextareaLabel).toBe(textAreaPageContent.compact_text_area_label);
            expect(noPlatformsFormTextAreaLabel).toBe(textAreaPageContent.no_platforms_form_text_area_label);

        });
        // No example or no restriction
/*        xit('should be able enter maximum characters (50)', async () => {

        });*/

        it('should not be able enter text in the disabled textarea', async () => {
            // Is not fully valid
            expect(await textareaPage.disabledTextArea.isEnabled()).toBe(false);
        });

        // No example
/*        xit('should indicate entered invalid character with red border', async () => {
        });*/

        it('should be able to copy paste the content into textarea', async () => {
            await setInput(await textareaPage.basicTextArea, testData.fifty_character_string);
            // await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
            await waitForTextToBePresentInElementValue(await textareaPage.basicTextArea, testData.fifty_character_string);
            await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'a'));
            await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'c'));
            await textareaPage.basicTextArea.sendKeys(Key.DELETE);
            await waitForTextToBePresentInElementValue(await textareaPage.basicTextArea, '');
            const textareaTextBefore = await getValueOfAttributeValue(await textareaPage.basicTextArea);
            await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'v'));
            const textareaText = await getValueOfAttributeValue(await textareaPage.basicTextArea);

            expect(textareaTextBefore).toBe('');
            expect(textareaText).toBe(testData.fifty_character_string);
        });

        it('should allow alphabets, numerical, special characters or combination of these (maybe postponed)', async () => {
            await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
            const textareaText = await getValueOfAttributeValue(await textareaPage.basicTextArea);

            expect(textareaText).toBe(testData.fifty_character_string);
        });
        // No example
/*        xit('should not accept restricted characters (maybe postponed)', async () => {});*/

        describe('placeholder should exhibit standard behaviour', function() {
            // The standard behaviour of place holder is under browser control, and can't be checked by webDriver,
            // Checking that placeholder is present.
            it('should appear as hint text and remain as long as text area is empty', async () => {
                const textAriaPlaceholderBefore = await getValueOfAttribute(await textareaPage.basicTextArea, 'placeholder');

                expect(textAriaPlaceholderBefore).toBe(textAreaPageContent.basic_text_area_placeholder);
            });
        });

        describe('if textarea is enabled', function() {
            it('should be able to perform cut', async () => {
                await textareaPage.basicTextArea.sendKeys(testData.fifty_character_string);
                await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'a'));
                await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'x'));
                const textareaTextBefore = await getValueOfAttributeValue(await textareaPage.basicTextArea);
                await textareaPage.basicTextArea.sendKeys(Key.chord(Key[copyPasteBtn], 'v'));
                const textareaText = await getValueOfAttributeValue(await textareaPage.basicTextArea);

                expect(textareaTextBefore).toBe('');
                expect(textareaText).toBe(testData.fifty_character_string);
            });
        });

/*      xit('should, if disabled, be able to perform copy action ??? ', async () => {
        });
*/

        it('should have focused state', async () => {
            await hoverMouse(await textareaPage.basicTextArea).then(async () => {
                const borderColorOnHover = await textareaPage.basicTextArea.getCssValue('border-color');
                expect(borderColorOnHover).toBe('rgb(8, 84, 160)');
            });
        });

        it('should have hover state', async () => {
            const borderStyleBefore = await textareaPage.basicTextArea.getCssValue('outline-style');
            await textareaPage.basicTextArea.click();
            const borderStyle = await textareaPage.basicTextArea.getCssValue('outline-style');
            expect(borderStyleBefore).toBe('none');
            expect(borderStyle).toBe('dotted');
        });

        it('should have * if textarea is mandatory', async () => {
            const labelAsterisk = await browser.executeScript(`return (window.getComputedStyle(document.querySelector('${textareaPage.detailedTextAreaLabel.locator().value}'), ":after").content)`);
            expect(labelAsterisk).toBe('"*"');

        });

        it('should see an error if trying to submit empty mandatory textarea', async () => {
            await textareaPage.detailedTextArea.clear();
            const borderColor = await textareaPage.detailedTextArea.getCssValue('border-color');
            const errorText = await hoverMouse(textareaPage.detailedTextArea).then(async () => {
                return await textareaPage.detailedTextAreaErrorMessage.getText();
            });

            expect(borderColor).toBe('rgb(187, 0, 0)');
            expect(errorText.trim()).toBe('Value is required');
        });

        it('should display the counter of characters allowed to input ', async () => {
            // need to sendKeys because of the issue with characters counter
            await textareaPage.detailedTextArea.sendKeys('test');
            const charCounterText1 = await textareaPage.detailedTextAreaCharacterCounter.getText();
            const borderColorBefore = await textareaPage.detailedTextArea.getCssValue('border-color');

            await textareaPage.detailedTextArea.sendKeys('test');
            const charCounterText2 = await textareaPage.detailedTextAreaCharacterCounter.getText();
            await textareaPage.detailedTextArea.clear();
            await textareaPage.detailedTextArea.sendKeys('test');

            const borderColorAfter = await hoverMouse(await textareaPage.detailedTextArea).then(async () => {
                return await textareaPage.detailedTextArea.getCssValue('border-color');
            });
            const charCounterText3 = await textareaPage.detailedTextAreaCharacterCounter.getText();

            expect(charCounterText1).toBe('21 characters over the limit');
            expect(charCounterText2).toBe('25 characters over the limit');
            expect(borderColorBefore).toBe('rgb(187, 0, 0)');
            expect(charCounterText3).toBe('6 characters remaining');
            expect(borderColorAfter).toBe('rgb(8, 84, 160)');
        });

        it('should show error if more than permitted characters were added', async () => {
            // need to sendKeys because of the issue with characters counter
            await textareaPage.detailedTextArea.sendKeys('test');
            const errorText = await hoverMouse(textareaPage.detailedTextArea).then(async () => {
                return await textareaPage.detailedTextAreaErrorMessage.getText();
            });

            expect(errorText).toContain('Please get your character count under limit.');
        });

        it('should have compact smaller than basic', async () => {
            const basicTextareaSize = await textareaPage.basicTextArea.getSize();
            const compactTextareaSize = await textareaPage.compactTextArea.getSize();

            expect(basicTextareaSize.height > compactTextareaSize.height).toBe(true);
        });

        it('should not change size if growing is disabled', async () => {
            const textareaSizeBefore = await textareaPage.growingDisabledTextarea.getSize();
            await textareaPage.growingDisabledTextarea.sendKeys(testData.multiple_lines_text_8_lines);
            const textareaSizeAfter = await textareaPage.growingDisabledTextarea.getSize();

            expect(textareaSizeBefore.height).toBe(textareaSizeAfter.height);
        });

        it('should grow if growing option is enabled (growing up to 5 lines)', async () => {
            await textareaPage.growingMaxLinesTextarea.clear();
            const textareaSize1 = await textareaPage.growingMaxLinesTextarea.getSize();
            await textareaPage.growingMaxLinesTextarea.sendKeys(testData.multiple_lines_text);
            const textareaSize2 = await textareaPage.growingMaxLinesTextarea.getSize();
            await textareaPage.growingMaxLinesTextarea.sendKeys(testData.multiple_lines_text);
            const textareaSize3 = await textareaPage.growingMaxLinesTextarea.getSize();

            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toEqual(textareaSize3.height);
        });

        it('should grow if growing option is enabled (growing up to 80px)', async () => {
            await textareaPage.growingHeightTextarea.clear();
            const textareaSize1 = await textareaPage.growingHeightTextarea.getSize();
            await textareaPage.growingHeightTextarea.sendKeys(testData.multiple_lines_text_8_lines);
            const textareaSize2 = await textareaPage.growingHeightTextarea.getSize();


            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toEqual(80);
        });

        it('should grow if growing option is enabled and no maxLine or maxHeight are ser', async () => {
            await textareaPage.withGrowingAndNoLimitsTextarea.clear();
            const textareaSize1 = await textareaPage.withGrowingAndNoLimitsTextarea.getSize();
            await textareaPage.withGrowingAndNoLimitsTextarea.sendKeys(testData.multiple_lines_text_8_lines);
            const textareaSize2 = await textareaPage.withGrowingAndNoLimitsTextarea.getSize();
            await textareaPage.withGrowingAndNoLimitsTextarea.sendKeys(testData.multiple_lines_text_8_lines);
            const textareaSize3 = await textareaPage.withGrowingAndNoLimitsTextarea.getSize();


            expect(textareaSize1.height).toBeLessThan(textareaSize2.height);
            expect(textareaSize2.height).toBeLessThan(textareaSize3.height);
        });

        it('should not accept more than 10 characters ', async () => {
            await textareaPage.withCharactersMaxNumberTextarea.clear();
            await textareaPage.withCharactersMaxNumberTextarea.sendKeys(testData.forty_nine_character_string);
            const currentText = await await getValueOfAttributeValue(await textareaPage.withCharactersMaxNumberTextarea);

            expect(currentText.length).toBe(10);
        });

        describe('have a visual cue ', function() {
            it('should have ? mark by default', async () => {
                const popoverIconContant = await browser.executeScript(`return (window.getComputedStyle(document.querySelector('${textareaPage.basicTextAreaPopoverIcon.locator().value}'), ":before").content)`);
                expect(popoverIconContant).toBe('"?"');
            });

            it('should have popover with text', async () => {
                await hoverMouse(await textareaPage.basicTextAreaPopoverIcon).then(async () => {
                    await waitForVisible(await textareaPage.basicTextAreaPopoverBody);
                    const popoverText = await textareaPage.basicTextAreaPopoverBody.getText();
                    expect(popoverText).toContain(textAreaPageContent.basic_text_area_popover);
                });
            });
        });
    });
});
