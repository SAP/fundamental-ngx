import {
    browserIsSafari,
    click,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { FormMessagePo } from './form-message.po';

import {
    clickEventMessage,
    eventMessageTextArea,
    hoverEventMessageInput,
    hoverEventMessageInputGroup,
    placeholderText,
    testMultilineText,
    testText
} from './form-message-contents';

describe('Form Message test suite:', () => {
    const formMessagePage = new FormMessagePo();
    const { messageWithInput, messageWithInputGroup, buttons, messageInformation, messageWithTextArea } =
        formMessagePage;

    beforeAll(async () => {
        await formMessagePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await formMessagePage.waitForRoot();
        await waitForElDisplayed(formMessagePage.title);
    }, 1);

    it('should check message with input has placeholder', async () => {
        await scrollIntoView(messageWithInput);
        await expect(await getElementPlaceholder(messageWithInput)).toBe(placeholderText);
    });

    it('should check message with input field', async () => {
        await scrollIntoView(messageWithInput);
        await setValue(messageWithInput, testText);
        await expect(await getValue(messageWithInput)).toBe(testText);
        await expect((await getText(messageInformation)).trim()).toBe(hoverEventMessageInput);
    });

    it('should check message with input group field', async () => {
        await scrollIntoView(messageWithInputGroup, 1);
        await setValue(messageWithInputGroup, testText, 1);
        await expect(await getValue(messageWithInputGroup, 1)).toBe(testText);
        await click(buttons, 1);
        await expect((await getText(messageInformation)).trim()).toBe(clickEventMessage);
    });

    it('should check message with input group field - hover', async () => {
        // skipped due to hoverElement does not work in Safari
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(messageWithInputGroup, 2);
        await mouseHoverElement(messageWithInputGroup, 2);
        await expect(await getText(messageInformation)).toBe(hoverEventMessageInputGroup);
        await setValue(messageWithInputGroup, testText, 2);
        await expect(await getValue(messageWithInputGroup, 2)).toBe(testText);
        await expect(await isElementClickable(buttons, 2)).toBe(true);
    });

    it('should check message with textarea', async () => {
        await scrollIntoView(messageWithTextArea);
        await setValue(messageWithTextArea, testMultilineText);
        await expect(await getValue(messageWithTextArea)).toBe(testMultilineText);
        await expect((await getText(messageInformation)).trim()).toBe(eventMessageTextArea);
    });
});
