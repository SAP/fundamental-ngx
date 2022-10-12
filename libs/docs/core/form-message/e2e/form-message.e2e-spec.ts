import { FormMessagePo } from './form-message.po';
import {
    browserIsSafari,
    click,
    getElementPlaceholder,
    getText,
    getValue,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

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
        await waitForPresent(formMessagePage.root);
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

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6982
    xit('should check that messaging by hover does not work in other way after clicking button', async () => {
        await scrollIntoView(messageWithInputGroup, 2);
        await mouseHoverElement(messageWithInputGroup, 2);
        await expect(await isElementDisplayed(messageInformation)).toBe(true);
        await click(buttons, 2);
        await mouseHoverElement(messageWithInputGroup, 2);
        await expect(await isElementDisplayed(messageInformation)).toBe(true);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await formMessagePage.saveExampleBaselineScreenshot();
            await expect(await formMessagePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
