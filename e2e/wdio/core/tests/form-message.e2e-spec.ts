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

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            formMessagePage.saveExampleBaselineScreenshot();
            expect(formMessagePage.compareWithBaseline()).toBeLessThan(5);
        });

        xit('verify input fields states', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                scrollIntoView(inputFields, i);
                checkElementStates(inputFields, inputFieldTag + i + '-', input, i);
            }
        });

        xit('verify buttons states', () => {
            const buttonsLength = getElementArrayLength(buttons);
            for (let i = 1; i < buttonsLength; i++) {
                scrollIntoView(buttons, i);
                checkElementStates(buttons, buttonTag + i + '-', button, i);
            }
        });

        xit('verify message information 1st input field hover state', () => {
            scrollIntoView(messageWithInput);
            click(messageWithInput);
            checkElementHoverState(messageInformation, messageTag + '0-hover-state-', message);
        });

        xit('verify message information 2nd input field hover state', () => {
            scrollIntoView(buttons, 1);
            click(buttons, 1);
            checkElementHoverState(messageInformation, messageTag + '1-hover-state-', message);
        });

        xit('verify message information textarea field hover state', () => {
            scrollIntoView(messageWithTextArea);
            click(messageWithTextArea);
            checkElementHoverState(messageInformation, messageTag + '2-hover-state-', message);
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element with index ${index} hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element with index ${index} focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with index ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});

