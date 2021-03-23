import { FormMessagePo } from '../pages/form-message.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click, getAttributeByName, getElementArrayLength, getText,
    getValue,
    isElementClickable, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, setValue, waitForPresent
} from '../../driver/wdio';

import {
    test,
    test2,
    input,
    button,
    message,
    text,
    message1,
    message2,
    message3,
    message4
} from '../fixtures/appData/form-message-contents';

import {
    inputFieldExample,
    inputFieldHoverSTate,
    inputFieldActiveState,
    inputFieldFocusState,
    buttonExample,
    buttonHoverState,
    buttonActiveState,
    buttonFocusState,
    messageExample,
    messageHoverState
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

    it('should check message with input field', () => {
        scrollIntoView(messageWithInput);
        expect(getAttributeByName(messageWithInput, 'placeholder')).toBe(text);
        setValue(messageWithInput, test);
        expect(getValue(messageWithInput)).toBe(test);
        expect(getText(messageInformation)).toBe(message1);
    });

    it('should check message with input group field', () => {
        scrollIntoView(messageWithInputGroup, 1);
        setValue(messageWithInputGroup, test, 1);
        expect(getValue(messageWithInputGroup, 1)).toBe(test);
        click(buttons, 1);
        expect(getText(messageInformation)).toBe(message2);
    });

    it('should check message with input group field - hover', () => {
        scrollIntoView(messageWithInputGroup, 2);
        mouseHoverElement(messageWithInputGroup, 2);
        expect(getText(messageInformation)).toBe(message3);
        setValue(messageWithInputGroup, test, 2);
        expect(getValue(messageWithInputGroup, 2)).toBe(test);
        expect(isElementClickable(buttons, 2)).toBe(true);
    });

    it('should check message with textarea', () => {
        scrollIntoView(messageWithTextArea);
        setValue(messageWithTextArea, test2);
        expect(getValue(messageWithTextArea)).toBe(test2);
        expect(getText(messageInformation)).toBe(message4);
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            formMessagePage.saveExampleBaselineScreenshot();
            expect(formMessagePage.compareWithBaseline()).toBeLessThan(1);
        });

        it('verify input fields hover state', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                scrollIntoView(inputFields, i);
                checkElementHoverState(inputFields, inputFieldExample + inputFieldHoverSTate + '-' + i, input, i);
            }
        });

        it('verify input fields active state', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                scrollIntoView(inputFields, i);
                checkElementActiveState(inputFields, inputFieldExample + inputFieldActiveState + '-' + i, input, i);
            }
        });

        it('verify input fields focus state', () => {
            const inputLength = getElementArrayLength(inputFields);
            for (let i = 0; i < inputLength; i++) {
                scrollIntoView(inputFields, i);
                checkElementFocusState(inputFields, inputFieldExample + inputFieldFocusState + '-' + i, input, i);
            }
        });

        it('verify buttons hover state', () => {
            const buttonsLength = getElementArrayLength(buttons);
            for (let i = 1; i < buttonsLength; i++) {
                scrollIntoView(buttons, i);
                checkElementHoverState(buttons, buttonExample + buttonHoverState + '-' + i, button, i);
            }
        });

        it('verify buttons active state', () => {
            const buttonsLength = getElementArrayLength(buttons);
            for (let i = 1; i < buttonsLength; i++) {
                scrollIntoView(buttons, i);
                checkElementActiveState(buttons, buttonExample + buttonActiveState + '-' + i, button, i);
            }
        });

        it('verify buttons focus state', () => {
            const buttonsLength = getElementArrayLength(buttons);
            for (let i = 1; i < buttonsLength; i++) {
                scrollIntoView(buttons, i);
                checkElementFocusState(buttons, buttonExample + buttonFocusState + '-' + i, button, i);
            }
        });

        it('verify message information 1st input field hover state', () => {
            scrollIntoView(messageWithInput);
            click(messageWithInput);
            checkElementHoverState(messageInformation, messageExample + messageHoverState + '-0', message);
        });

        it('verify message information 2nd input field hover state', () => {
            scrollIntoView(buttons, 1);
            click(buttons, 1);
            checkElementHoverState(messageInformation, messageExample + messageHoverState + '-1', message);
        });

        it('verify message information textarea field hover state', () => {
            scrollIntoView(messageWithTextArea);
            click(messageWithTextArea);
            checkElementHoverState(messageInformation, messageExample + messageHoverState + '-2', message);
        });

    });


    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, formMessagePage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }
});

