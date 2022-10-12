import {
    addValue,
    browserIsSafariorFF,
    clearValue,
    click,
    doesItExist,
    executeScriptAfterTagAttr,
    getAttributeByNameArr,
    getElementArrayLength,
    getElementSize,
    getText,
    getTextArr,
    getValue,
    isEnabled,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { errorText, favoriteColor, labelsArray, maxValidation, placeholdersArray } from './input-page-contents';
import { autocompleteOption, longLine, number, special_characters, text } from './input';
import { InputPo } from './input.po';

declare const $$: any;

describe('Input should ', () => {
    const inputPage = new InputPo();
    const {
        defaultInput,
        textInput,
        numberInput,
        compactInput,
        disabledInput,
        messagesComponentsInput,
        submitBtn,
        errorTextAttr,
        requiredInputLabel,
        questionMarkSpan,
        inputsLabels,
        inputsArray,
        autocompleteInput,
        autocompleteInputLabel,
        autocompleteOptions,
        errorMessage
    } = inputPage;

    beforeAll(async () => {
        await inputPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(defaultInput);
    }, 1);

    it('have input without label', async () => {
        await waitForElDisplayed(defaultInput);
        await expect(await doesItExist(autocompleteInputLabel)).toBe(false);
    });

    it('be able to type something with keyboard', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);

        await expect(await getValue(defaultInput)).toBe(text);
    });

    it('have associated label element to describe its purpose', async () => {
        await expect(await getTextArr(inputsLabels, 0, -2)).toEqual(labelsArray);
        await expect(await getText(inputsLabels, 8)).toContain(favoriteColor);
        await expect(await getText(inputsLabels, 9)).toContain(maxValidation);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);
        await addValue(defaultInput, number);
        await addValue(defaultInput, special_characters);

        await expect(await getValue(defaultInput)).toEqual(text + number + special_characters);
    });

    it('impose any filters on the kind of input values the component receives (text)', async () => {
        await waitForElDisplayed(textInput);
        await addValue(textInput, number);
        await addValue(textInput, special_characters);
        await addValue(textInput, text);

        await expect(await getValue(textInput)).toEqual(number + special_characters + text); // ???
    });

    it('impose any filters on the kind of input values the component receives (number)', async () => {
        if (await browserIsSafariorFF()) {
            return;
            // not working on FF and safari, needs investigation
        }
        await waitForElDisplayed(numberInput);
        await click(numberInput);

        await addValue(numberInput, number);
        await addValue(numberInput, special_characters);

        await expect(await getValue(numberInput)).toEqual(number);
    });

    it('should check increase/decriase value by arrows', async () => {
        await waitForElDisplayed(numberInput);
        await click(numberInput);

        await sendKeys('ArrowUp');
        await expect(await getValue(numberInput)).toEqual('1');

        await sendKeys('ArrowDown');
        await sendKeys('ArrowDown');
        await expect(await getValue(numberInput)).toEqual('-1');
    });

    it('wrap the input characters to the next line', async () => {
        await waitForElDisplayed(defaultInput);
        const heightBefore = await (await getElementSize(defaultInput, 0)).height;
        await setValue(defaultInput, longLine);
        const heightAfter = await (await getElementSize(defaultInput, 0)).height;

        await expect(heightBefore).toBeLessThanOrEqual(heightAfter);
    });

    it('enable editing the entered characters', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);
        await sendKeys('Backspace');

        await expect(await getValue(defaultInput)).toBe(text.slice(0, -1));
        await clearValue(defaultInput);
        await expect(await getValue(defaultInput)).toBe('');
    });

    it('check have disabled attr assigned', async () => {
        await waitForElDisplayed(disabledInput);
        await expect(await isEnabled(disabledInput)).toBe(false);
    });

    it('have placeholder', async () => {
        await expect(await getAttributeByNameArr(inputsArray, 'placeholder', 1)).toEqual(placeholdersArray);
    });

    it('should have error border color', async () => {
        await scrollIntoView(messagesComponentsInput);
        await waitForElDisplayed(messagesComponentsInput);
        await click(submitBtn);
        await click(messagesComponentsInput);
        await pause(300);
        await waitForElDisplayed(errorTextAttr);
        await expect((await getText(errorTextAttr)).trim()).toBe(errorText);
    });

    it('should have visual cue for require input', async () => {
        await scrollIntoView(requiredInputLabel);
        await pause(2000);
        await expect(await executeScriptAfterTagAttr(requiredInputLabel, 'content')).toBe('"*"');
    });

    it('should have visual cue for information', async () => {
        await expect(await $$(questionMarkSpan)).toBeTruthy();
    });

    it('should implement autosuggestion', async () => {
        await waitForElDisplayed(autocompleteInput);
        await addValue(autocompleteInput, autocompleteOption);

        await expect(await getElementArrayLength(autocompleteOptions)).toBeGreaterThanOrEqual(2);
        const autocompleteOptionText = await getTextArr(autocompleteOptions);
        for (const option of autocompleteOptionText) {
            await expect(option.toLowerCase()).toContain(autocompleteOption);
        }
        await pause(3000);
        await click(autocompleteOptions);
        await expect((await getValue(autocompleteInput)).toLowerCase()).toContain(autocompleteOption);
    });

    it('should compact be smaller than the default', async () => {
        const defaultHeight = await getElementSize(defaultInput);
        const compactHeight = await getElementSize(compactInput);

        await expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should check that validation does not work earlier than necessary', async () => {
        await scrollIntoView(messagesComponentsInput);
        await click(messagesComponentsInput);
        await expect(await doesItExist(errorMessage)).toBe(false);
    });

    it('should check RTL', async () => {
        await inputPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await inputPage.saveExampleBaselineScreenshot();
            await expect(await inputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
