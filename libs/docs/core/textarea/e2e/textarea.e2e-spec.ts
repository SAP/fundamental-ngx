import { TextareaPo } from './textarea.po';
import {
    browserIsSafari,
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementPlaceholder,
    getElementSize,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { formMessageTestText, sections, states, styleArr } from './textarea-contents';

describe('Textarea component test', () => {
    const textareaPage = new TextareaPo();
    const {
        defaultExample,
        formExample,
        stateExample,
        textarea,
        label,
        helpIcon,
        helpContent,
        formMessage,
        basicTextArea,
        compactTextarea
    } = textareaPage;

    beforeAll(async () => {
        await textareaPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(textareaPage.root);
        await waitForElDisplayed(textareaPage.title);
    }, 1);

    it('should check orientation', async () => {
        await textareaPage.checkRtlSwitch();
    });

    it('should check setting value in input', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkEnteringValue(sections[i]);
        }
    });

    it('check displayed value from textarea in form example', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkPlaceholderIsCorrect(sections[i]);
        }
    });

    it('should check required field', async () => {
        await expect(await getAttributeByName(defaultExample + textarea, 'aria-required', 1)).toBe('true');
        await expect(await getElementClass(defaultExample + label, 1)).toContain('required');
    });

    it('should check states of the textareas for the state example', async () => {
        for (let i = 0; i < 4; i++) {
            await expect(await getElementClass(stateExample + textarea, i)).toContain(states[i]);
        }
    });

    it('should check inline help in inline help example', async () => {
        // skip due to hoverElement does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(helpIcon);
        await mouseHoverElement(helpIcon);
        await expect(await isElementDisplayed(helpContent)).toBe(true);
        await expect(await getText(helpContent)).toEqual('Inline Help');
    });

    it('should check disabled and read only textareas', async () => {
        await expect(await isElementClickable(stateExample + textarea, 4)).toBe(false);
        await expect(await getAttributeByName(stateExample + textarea, 'disabled', 4)).not.toBe(null);
        await expect(await isElementClickable(formExample + textarea, 1)).toBe(false);
        await expect(await getAttributeByName(formExample + textarea, 'disabled', 1)).not.toBe(null);

        await expect(await getAttributeByName(stateExample + textarea, 'readonly', 5)).not.toBe(null);
        await click(stateExample + textarea, 5);
        await sendKeys('test');
        await expect(await getValue(stateExample + textarea, 5)).toBe('');
    });

    it('should have compact smaller than basic', async () => {
        const basicTextareaSize = await getElementSize(basicTextArea);
        const compactTextareaSize = await getElementSize(compactTextarea);

        await expect(basicTextareaSize.height).toBeGreaterThan(compactTextareaSize.height);
    });

    it('should check display form message', async () => {
        await scrollIntoView(stateExample);
        const inputLength = await getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            await scrollIntoView(stateExample + textarea, i);
            await click(stateExample + textarea, i);
            await expect(await isElementDisplayed(formMessage)).toBe(
                true,
                `form message does not displayed for input with index ${i}`
            );
        }
    });

    it('should check text of form message', async () => {
        await scrollIntoView(stateExample);
        const inputLength = await getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            await scrollIntoView(stateExample + textarea, i);
            await click(stateExample + textarea, i);
            await expect((await getText(formMessage)).trim()).toBe(formMessageTestText);
        }
    });

    it('should check class of form message', async () => {
        await scrollIntoView(stateExample);
        const inputLength = await getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            await scrollIntoView(stateExample + textarea, i);
            await click(stateExample + textarea, i);
            await expect(await getElementClass(formMessage)).toContain(styleArr[i]);
        }
    });

    xit('should check visual regression for all examples', async () => {
        await textareaPage.saveExampleBaselineScreenshot();
        await expect(await textareaPage.compareWithBaseline()).toBeLessThan(5);
    });

    async function checkPlaceholderIsCorrect(section: string): Promise<void> {
        const areaLength = await getElementArrayLength(section + textarea);
        for (let i = 0; i < areaLength; i++) {
            await expect(await getElementPlaceholder(section + textarea, i)).toEqual('Field placeholder text');
        }
    }

    async function checkEnteringValue(section: string): Promise<void> {
        const testValue = 'My custom test string';
        const areaLength = await getElementArrayLength(section + textarea);
        for (let i = 0; i < areaLength; i++) {
            if (
                (await getAttributeByName(section + textarea, 'disabled', i)) == null &&
                (await getAttributeByName(section + textarea, 'readonly', i)) == null
            ) {
                await setValue(section + textarea, testValue, i);
                await expect(await getValue(section + textarea, i)).toEqual(testValue);
            }
        }
    }
});
