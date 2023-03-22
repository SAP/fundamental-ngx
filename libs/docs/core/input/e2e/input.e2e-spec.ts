import { wait } from '@nrwl/nx-cloud/lib/utilities/waiter';
import {
    addValue,
    browserIsSafari,
    clearValue,
    click,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getPreviousElementText,
    getText,
    getValue,
    isElementDisplayed,
    isEnabled,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    informationInputLabelText,
    inputMessageText,
    invalidInputLabelText,
    labelsArray,
    stateClassesArr,
    testText,
    validInputLabelText,
    warningInputLabelText
} from './input-page-contents';
import { longLine, number, special_characters, text } from './input';
import { InputPo } from './input.po';

describe('Input should ', () => {
    const inputPage = new InputPo();
    const {
        defaultInput,
        requiredInput,
        passwordInput,
        compactInput,
        inlineHelpRightInput,
        inlineHelpLeftInput,
        validInput,
        invalidInput,
        warningInput,
        informationInput,
        disabledInput,
        readonlyInput,
        reactiveDefaultInput,
        reactiveDisabledInput,
        reactivePrimaryInput,
        reactiveSecondaryInput,
        formMessagePopover,
        validInputLabel,
        invalidInputLabel,
        warningInputLabel,
        informationInputLabel,
        addBtn,
        reactivePrimaryInput2,
        allInputFields,
        popoverHelp,
        questionMark,
        inputStateExample,
        input
    } = inputPage;

    const inputsArr = [
        defaultInput,
        requiredInput,
        passwordInput,
        compactInput,
        inlineHelpRightInput,
        inlineHelpLeftInput,
        disabledInput,
        readonlyInput,
        reactiveDefaultInput,
        reactiveDisabledInput,
        reactivePrimaryInput,
        reactiveSecondaryInput
    ];

    beforeAll(async () => {
        await inputPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(inputPage.root);
        await waitForElDisplayed(inputPage.title);
    }, 1);

    it('be able to type something with keyboard', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);

        await expect(await getValue(defaultInput)).toBe(text);
    });

    it('have associated label element to describe its purpose', async () => {
        for (let i = 0; inputsArr.length > i; i++) {
            await expect((await getPreviousElementText(inputsArr[i])).trim()).toBe(labelsArray[i]);
        }
        await expect((await getText(validInputLabel)).trim()).toBe(validInputLabelText);
        await expect((await getText(invalidInputLabel)).trim()).toBe(invalidInputLabelText);
        await expect((await getText(warningInputLabel)).trim()).toBe(warningInputLabelText);
        await expect((await getText(informationInputLabel)).trim()).toBe(informationInputLabelText);
    });

    it('by default accept all kinds of input values – alphabet, numerical, special characters', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);
        await addValue(defaultInput, number);
        await addValue(defaultInput, special_characters);

        await expect(await getValue(defaultInput)).toEqual(text + number + special_characters);
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

    it('check have disabled attr assigned to disabled inputs', async () => {
        await waitForElDisplayed(disabledInput);
        await expect(await isEnabled(disabledInput)).toBe(false);

        await waitForElDisplayed(reactiveDisabledInput);
        await expect(await isEnabled(reactiveDisabledInput)).toBe(false);
    });

    it('should compact be smaller than the default', async () => {
        const defaultHeight = await getElementSize(defaultInput);
        const compactHeight = await getElementSize(compactInput);

        await expect(defaultHeight.height).toBeGreaterThan(compactHeight.height);
    });

    it('should have message attached to the input', async () => {
        await click(validInput);
        await expect((await getText(formMessagePopover)).trim()).toBe(inputMessageText);

        await scrollIntoView(invalidInput);
        await mouseHoverElement(invalidInput);
        await expect((await getText(formMessagePopover)).trim()).toBe(inputMessageText);

        await click(warningInput);
        await expect((await getText(formMessagePopover)).trim()).toBe(inputMessageText);

        await click(informationInput);
        await expect((await getText(formMessagePopover)).trim()).toBe(inputMessageText);
    });

    it('should add to more input fields by click Add btn', async () => {
        await click(addBtn);
        await expect(await getElementArrayLength(reactivePrimaryInput2)).toBe(2);
    });

    it('should check all input fields work correctly', async () => {
        const inputLength = await getElementArrayLength(allInputFields);
        for (let i = 0; i < inputLength; i++) {
            await scrollIntoView(allInputFields, i);
            await setValue(allInputFields, text + number + special_characters, i);
            await expect(await getValue(allInputFields, i)).toBe(text + number + special_characters);
        }
    });

    // Does not make sense since clicking on label will shift the focus on the input, and inline help has focusout trigger to hide the popover.
    xit('should check displayed popover by clicking and check text', async () => {
        await scrollIntoView(questionMark);
        await click(questionMark);
        await expect(await isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
        await expect((await getText(popoverHelp)).trim()).toBe(testText);

        await click(questionMark, 1);
        await expect(await isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
        await expect((await getText(popoverHelp)).trim()).toBe(testText);
    });

    it('should check displayed popover by hover question mark', async () => {
        // skipped due to hoverElement does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(questionMark);
        await mouseHoverElement(questionMark);
        await expect(await isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');

        await mouseHoverElement(questionMark, 1);
        await expect(await isElementDisplayed(popoverHelp)).toBe(true, 'popover not displayed');
    });

    it('should check states', async () => {
        await scrollIntoView(inputStateExample);
        const checkboxCount = await getElementArrayLength(inputStateExample + input);

        for (let i = 0; i < checkboxCount; i++) {
            await expect(await getElementClass(inputStateExample + input, i)).toContain(stateClassesArr[i]);
        }
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
