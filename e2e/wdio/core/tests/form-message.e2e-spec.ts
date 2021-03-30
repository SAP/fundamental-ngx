import { FormMessagePo } from '../pages/form-message.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click, getAttributeByName, getElementArrayLength, getImageTagBrowserPlatform, getText,
    getValue,
    isElementClickable, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, setValue, waitForPresent
} from '../../driver/wdio';

import {
    testText,
    testMultilineText,
    input,
    btn,
    msg,
    text,
    clickEventMessage1,
    clickEventMessage2,
    clickEventMessage3,
    clickEventMessage4
} from '../fixtures/appData/form-message-contents';

import {
    inputField,
    button,
    message,
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

    fit('should check message with input field', () => {
        scrollIntoView(messageWithInput);
        expect(getAttributeByName(messageWithInput, 'placeholder')).toBe(text);
        setValue(messageWithInput, testText);
        expect(getValue(messageWithInput)).toBe(testText);
        expect(getText(messageInformation)).toBe(clickEventMessage1);
    });

    fit('should check message with input group field', () => {
        scrollIntoView(messageWithInputGroup, 1);
        setValue(messageWithInputGroup, testText, 1);
        expect(getValue(messageWithInputGroup, 1)).toBe(testText);
        click(buttons, 1);
        expect(getText(messageInformation)).toBe(clickEventMessage2);
    });

    fit('should check message with input group field - hover', () => {
        scrollIntoView(messageWithInputGroup, 2);
        mouseHoverElement(messageWithInputGroup, 2);
        expect(getText(messageInformation)).toBe(clickEventMessage3);
        setValue(messageWithInputGroup, testText, 2);
        expect(getValue(messageWithInputGroup, 2)).toBe(testText);
        expect(isElementClickable(buttons, 2)).toBe(true);
    });

    fit('should check message with textarea', () => {
        scrollIntoView(messageWithTextArea);
        setValue(messageWithTextArea, testMultilineText);
        expect(getValue(messageWithTextArea)).toBe(testMultilineText);
        expect(getText(messageInformation)).toBe(clickEventMessage4);
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            formMessagePage.saveExampleBaselineScreenshot();
            expect(formMessagePage.compareWithBaseline()).toBeLessThan(1);
        });

        it('verify input fields states', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                scrollIntoView(inputFields, i);
                checkElementStates(inputFields, inputField + i + '-', input, i);
            }
        });

        it('verify buttons states', () => {
            const buttonsLength = getElementArrayLength(buttons);
            for (let i = 1; i < buttonsLength; i++) {
                scrollIntoView(buttons, i);
                checkElementStates(buttons, button + i + '-', btn, i);
            }
        });

        it('verify message information 1st input field hover state', () => {
            scrollIntoView(messageWithInput);
            click(messageWithInput);
            checkMessageHoverState(messageInformation, message + '-0', msg);
        });

        it('verify message information 2nd input field hover state', () => {
            scrollIntoView(buttons, 1);
            click(buttons, 1);
            checkMessageHoverState(messageInformation, message + '-1', msg);
        });

        it('verify message information textarea field hover state', () => {
            scrollIntoView(messageWithTextArea);
            click(messageWithTextArea);
            checkMessageHoverState(messageInformation, message + '-2', msg);
        });
    });

    function checkMessageHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + 'hover-state-' + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});

