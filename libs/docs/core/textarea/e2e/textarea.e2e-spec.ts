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

    beforeAll(() => {
        textareaPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(textareaPage.root);
        waitForElDisplayed(textareaPage.title);
    }, 1);

    it('should check orientation', () => {
        textareaPage.checkRtlSwitch();
    });

    it('should check setting value in input', () => {
        for (let i = 0; i < sections.length; i++) {
            checkEnteringValue(sections[i]);
        }
    });

    it('check displayed value from textarea in form example', () => {
        for (let i = 0; i < sections.length; i++) {
            checkPlaceholderIsCorrect(sections[i]);
        }
    });

    it('should check required field', () => {
        expect(getAttributeByName(defaultExample + textarea, 'aria-required', 1)).toBe('true');
        expect(getElementClass(defaultExample + label, 1)).toContain('required');
    });

    it('should check states of the textareas for the state example', () => {
        for (let i = 0; i < 4; i++) {
            expect(getElementClass(stateExample + textarea, i)).toContain(states[i]);
        }
    });

    it('should check inline help in inline help example', () => {
        // skip due to hoverElement does not work in Safari
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(helpIcon);
        mouseHoverElement(helpIcon);
        expect(isElementDisplayed(helpContent)).toBe(true);
        expect(getText(helpContent)).toEqual('Inline Help');
    });

    it('should check disabled and read only textareas', () => {
        expect(isElementClickable(stateExample + textarea, 4)).toBe(false);
        expect(getAttributeByName(stateExample + textarea, 'disabled', 4)).not.toBe(null);
        expect(isElementClickable(formExample + textarea, 1)).toBe(false);
        expect(getAttributeByName(formExample + textarea, 'disabled', 1)).not.toBe(null);

        expect(getAttributeByName(stateExample + textarea, 'readonly', 5)).not.toBe(null);
        click(stateExample + textarea, 5);
        sendKeys('test');
        expect(getValue(stateExample + textarea, 5)).toBe('');
    });

    it('should have compact smaller than basic', () => {
        const basicTextareaSize = getElementSize(basicTextArea);
        const compactTextareaSize = getElementSize(compactTextarea);

        expect(basicTextareaSize.height).toBeGreaterThan(compactTextareaSize.height);
    });

    it('should check display form message', () => {
        scrollIntoView(stateExample);
        const inputLength = getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            scrollIntoView(stateExample + textarea, i);
            click(stateExample + textarea, i);
            expect(isElementDisplayed(formMessage)).toBe(
                true,
                `form message does not displayed for input with index ${i}`
            );
        }
    });

    it('should check text of form message', () => {
        scrollIntoView(stateExample);
        const inputLength = getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            scrollIntoView(stateExample + textarea, i);
            click(stateExample + textarea, i);
            expect(getText(formMessage).trim()).toBe(formMessageTestText);
        }
    });

    it('should check class of form message', () => {
        scrollIntoView(stateExample);
        const inputLength = getElementArrayLength(stateExample + textarea);
        for (let i = 0; i < inputLength - 2; i++) {
            scrollIntoView(stateExample + textarea, i);
            click(stateExample + textarea, i);
            expect(getElementClass(formMessage)).toContain(styleArr[i]);
        }
    });

    xit('should check visual regression for all examples', () => {
        textareaPage.saveExampleBaselineScreenshot();
        expect(textareaPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkPlaceholderIsCorrect(section: string): void {
        const areaLength = getElementArrayLength(section + textarea);
        for (let i = 0; i < areaLength; i++) {
            expect(getElementPlaceholder(section + textarea, i)).toEqual('Field placeholder text');
        }
    }

    function checkEnteringValue(section: string): void {
        const testValue = 'My custom test string';
        const areaLength = getElementArrayLength(section + textarea);
        for (let i = 0; i < areaLength; i++) {
            if (
                getAttributeByName(section + textarea, 'disabled', i) == null &&
                getAttributeByName(section + textarea, 'readonly', i) == null
            ) {
                setValue(section + textarea, testValue, i);
                expect(getValue(section + textarea, i)).toEqual(testValue);
            }
        }
    }
});
