import { FormMessagePo } from '../pages/form-message.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click, getAttributeByName, getElementArrayLength, getElementPlaceholder, getImageTagBrowserPlatform, getText,
    getValue,
    isElementClickable, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, setValue, waitForPresent
} from '../../driver/wdio';

import {
    testText,
    testMultilineText,
    input,
    button,
    message,
    placeholderText,
    hoverEventMessageInput,
    hoverEventMessageInputGroup,
    clickEventMessage,
    eventMessageTextArea
} from '../fixtures/appData/form-message-contents';

import {
    inputFieldTag,
    buttonTag,
    messageTag
} from '../fixtures/testData/form-message-tags';

describe('Form Message test suite:', function() {

    const formMessagePage = new FormMessagePo();
    const { messageWithInput, messageWithInputGroup, buttons, messageInformation, messageWithTextArea, inputFields } = formMessagePage;

    beforeAll(() => {
        formMessagePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(messageWithInput);
    }, 1);

    it('should check message with input has placeholder', () => {
        scrollIntoView(messageWithInput);
        expect(getElementPlaceholder(messageWithInput)).toBe(placeholderText);
    });

    it('should check message with input field', () => {
        scrollIntoView(messageWithInput);
        setValue(messageWithInput, testText);
        expect(getValue(messageWithInput)).toBe(testText);
        expect(getText(messageInformation)).toBe(hoverEventMessageInput);
    });

    it('should check message with input group field', () => {
        scrollIntoView(messageWithInputGroup, 1);
        setValue(messageWithInputGroup, testText, 1);
        expect(getValue(messageWithInputGroup, 1)).toBe(testText);
        click(buttons, 1);
        expect(getText(messageInformation)).toBe(clickEventMessage);
    });

    it('should check message with input group field - hover', () => {
        scrollIntoView(messageWithInputGroup, 2);
        mouseHoverElement(messageWithInputGroup, 2);
        expect(getText(messageInformation)).toBe(hoverEventMessageInputGroup);
        setValue(messageWithInputGroup, testText, 2);
        expect(getValue(messageWithInputGroup, 2)).toBe(testText);
        expect(isElementClickable(buttons, 2)).toBe(true);
    });

    it('should check message with textarea', () => {
        scrollIntoView(messageWithTextArea);
        setValue(messageWithTextArea, testMultilineText);
        expect(getValue(messageWithTextArea)).toBe(testMultilineText);
        expect(getText(messageInformation)).toBe(eventMessageTextArea);
    });

    xdescribe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            formMessagePage.saveExampleBaselineScreenshot();
            expect(formMessagePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

