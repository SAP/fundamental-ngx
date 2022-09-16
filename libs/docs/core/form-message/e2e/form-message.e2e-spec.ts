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

    beforeAll(() => {
        formMessagePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(formMessagePage.root);
        waitForElDisplayed(formMessagePage.title);
    }, 1);

    it('should check message with input has placeholder', () => {
        scrollIntoView(messageWithInput);
        expect(getElementPlaceholder(messageWithInput)).toBe(placeholderText);
    });

    it('should check message with input field', () => {
        scrollIntoView(messageWithInput);
        setValue(messageWithInput, testText);
        expect(getValue(messageWithInput)).toBe(testText);
        expect(getText(messageInformation).trim()).toBe(hoverEventMessageInput);
    });

    it('should check message with input group field', () => {
        scrollIntoView(messageWithInputGroup, 1);
        setValue(messageWithInputGroup, testText, 1);
        expect(getValue(messageWithInputGroup, 1)).toBe(testText);
        click(buttons, 1);
        expect(getText(messageInformation).trim()).toBe(clickEventMessage);
    });

    it('should check message with input group field - hover', () => {
        // skipped due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
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
        expect(getText(messageInformation).trim()).toBe(eventMessageTextArea);
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6982
    xit('should check that messaging by hover does not work in other way after clicking button', () => {
        scrollIntoView(messageWithInputGroup, 2);
        mouseHoverElement(messageWithInputGroup, 2);
        expect(isElementDisplayed(messageInformation)).toBe(true);
        click(buttons, 2);
        mouseHoverElement(messageWithInputGroup, 2);
        expect(isElementDisplayed(messageInformation)).toBe(true);
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            formMessagePage.saveExampleBaselineScreenshot();
            expect(formMessagePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
