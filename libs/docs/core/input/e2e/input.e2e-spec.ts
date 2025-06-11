import {
    addValue,
    browserIsSafari,
    clearValue,
    click,
    getElementArrayLength,
    getElementSize,
    getValue,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { longLine, number, special_characters, text } from './input';
import { InputPo } from './input.po';

describe('Input should ', () => {
    const inputPage = new InputPo();
    const { defaultInput, addBtn, reactivePrimaryInput2, popoverHelp, questionMark } = inputPage;

    beforeAll(async () => {
        await inputPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await inputPage.waitForRoot();
        await waitForElDisplayed(inputPage.title);
    }, 1);

    it('be able to type something with keyboard', async () => {
        await waitForElDisplayed(defaultInput);
        await setValue(defaultInput, text);

        await expect(await getValue(defaultInput)).toBe(text);
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

    it('should add to more input fields by click Add btn', async () => {
        await click(addBtn);
        await expect(await getElementArrayLength(reactivePrimaryInput2)).toBe(2);
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

    it('should check RTL', async () => {
        await inputPage.checkRtlSwitch();
    });
});
