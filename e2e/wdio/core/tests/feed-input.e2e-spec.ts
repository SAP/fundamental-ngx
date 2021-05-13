import {
    addIsActiveClass,
    addValue, checkElementScreenshot,
    clearValue, click,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength, getElementPlaceholder,
    getElementSize, getElementTitle, getImageTagBrowserPlatform,
    isEnabled, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { FeedInputPo } from '../pages/feed-input.po';
import { four_lines_text, eight_lines_text} from '../fixtures/testData/feed-input';

import {
    inputTextAreaDisable,
    inputButtonDisable,
    inputTextAreaActive, inputButtonActive
} from '../fixtures/testData/feed-input-tags';

import {
    default_placeholder, default_avatar, send_button_tooltip,
    button, textArea
} from '../fixtures/appData/feed-input-page-contents';

describe('Verify Feed Input component', function() {
    const feedInputPage = new FeedInputPo();
    const {
        feedInputTextArea, feedInputAvatar, feedInputButton, feedInputNoAvatar, disableInputTextArea,
        disableInputButton, activeInputTextAreas
    } = new FeedInputPo();

    beforeAll(() => {
        feedInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(feedInputAvatar);
    }, 1);

    it('should have correct placeholder assigned', () => {
        const feedInputLength = getElementArrayLength(feedInputTextArea);
        for (let i = 0; i < feedInputLength; i++) {
            expect(getElementPlaceholder(feedInputTextArea, i)).toEqual(default_placeholder);
        }
    });

    it('should have example with avatar image assigned', () => {
        const inputAvatarLength = getElementArrayLength(feedInputAvatar);
        for (let i = 0; i < inputAvatarLength; i++) {
            if (i === 1) {
                continue;
            }
            waitForPresent(feedInputAvatar, i);
            expect(getAttributeByName(feedInputAvatar, 'image', i)).not.toBe('');
            expect(getAttributeByName(feedInputAvatar, 'image', i)).not.toBeNull();
        }
    });

    it('should have example with default avatar assigned', () => {
        expect(getAttributeByName(feedInputAvatar, 'ng-reflect-glyph', 1)).toContain(default_avatar);
    });

    it('should have example with no avatar', () => {
        waitForElDisplayed(feedInputButton, 2);
        scrollIntoView(feedInputButton, 2);
        expect(doesItExist(feedInputNoAvatar)).toBe(false);
    });

    it('should have Send button assigned and to be disabled if no value set in the input', () => {
        const inputButtonLength = getElementArrayLength(feedInputButton);
        for (let i = 0; inputButtonLength > i; i++) {
            waitForPresent(feedInputButton, i);
            scrollIntoView(feedInputButton, i);
            expect(elementDisplayed(feedInputButton, i)).toBe(true);
            expect(getAttributeByName(feedInputButton, 'aria-disabled', i)).toBe('true');
        }
    });

    it('should have Send button enabled if value is set in the input', () => {
        const inputButtonLength = getElementArrayLength(feedInputButton);
        for (let i = 0; i < inputButtonLength; i++) {
            if (i === 3) {
                continue;
            }
            waitForPresent(feedInputTextArea, i);
            scrollIntoView(feedInputTextArea, i);
            setValue(feedInputTextArea, four_lines_text, i);
            waitForPresent(feedInputButton, i);
            expect(isEnabled(feedInputButton, i)).toBe(true);
        }
    });

    it('should grow if multiple row text is entered to the input ' +
        'stop growing after max Height option value was reached', () => {
        waitForPresent(feedInputTextArea);
        scrollIntoView(feedInputTextArea);
        const inputButtonLength = getElementArrayLength(feedInputButton);
        for (let i = 0; i < inputButtonLength - 1; i++) {
            if (i === 3) {
                continue;
            }
            clearValue(feedInputTextArea);
            const feedInputSize1 = getElementSize(feedInputTextArea, i, 'height');
            setValue(feedInputTextArea, eight_lines_text, i);
            const feedInputSize2 = getElementSize(feedInputTextArea, i, 'height');
            addValue(feedInputTextArea, eight_lines_text, i);
            const feedInputSize3 = getElementSize(feedInputTextArea, i, 'height');
            expect(feedInputSize1).toBeLessThan(feedInputSize2);
            expect(feedInputSize2).toBeLessThan(feedInputSize3);
            expect([183, 188, 189, 184]).toContain(feedInputSize2);
        }
    });

    it('should have focus stated assigned to elements', () => {
        const arrLength = getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength > i; i++) {
            if (i === 3) {
                continue;
            }
            waitForPresent(feedInputTextArea, i);
            scrollIntoView(feedInputTextArea, i);
            setValue(feedInputTextArea, four_lines_text, i);
            const inputFocusStyle = getCSSPropertyByName(feedInputTextArea, 'outline-style', i).value;
            sendKeys('Tab');
            const sendButtonFocusStyle = getCSSPropertyByName(feedInputButton, 'outline-style', i).value;
            expect(inputFocusStyle).toBe('dotted');
            expect(sendButtonFocusStyle).toContain('dotted');
        }
    });

    it('should avatar and Send button has correct tooltip', () => {
        const inputButtonLength = getElementArrayLength(feedInputButton);
        for (let i = 0; i < inputButtonLength; i++) {
            expect(getElementTitle(feedInputButton, i)).toEqual(send_button_tooltip);
        }
    });

    it('should check RTL', () => {
        feedInputPage.checkRtlSwitch();
    });

    describe('Should check visual regression', function() {

        it('should check examples visual regression', () => {
            feedInputPage.saveExampleBaselineScreenshot();
            expect(feedInputPage.compareWithBaseline()).toBeLessThan(1);
        });

        xit('should check disable input text area hover state', () => {
            scrollIntoView(disableInputTextArea);
            checkDisableElementHoverState(disableInputTextArea, inputTextAreaDisable, textArea);
        });

        xit('should check disable input button hover state', () => {
            scrollIntoView(disableInputButton);
            checkDisableElementHoverState(disableInputButton, inputButtonDisable, button);
        });

        xit('should check active input text areas states', () => {
            const activeInputTextAreasLength = getElementArrayLength(activeInputTextAreas);
            for (let i = 0; i < activeInputTextAreasLength; i++) {
                if (i === 3) {
                    continue;
                }
                scrollIntoView(activeInputTextAreas, i);
                checkElementStates(activeInputTextAreas, inputTextAreaActive + i + '-', textArea, i);
            }
        });

        xit('should check active input buttons states', () => {
            const inputButtonsLength = getElementArrayLength(feedInputButton);
            for (let i = 0; i < inputButtonsLength; i++) {
                if (i === 3) {
                    continue;
                }
                scrollIntoView(feedInputTextArea, i);
                setValue(feedInputTextArea, four_lines_text, i);
                checkElementHoverState(feedInputButton, inputButtonActive + i + '-', button, i);
            }
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), feedInputPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element item ${index} active state mismatch`);
    }

    function checkDisableElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + 'hover-state-' + getImageTagBrowserPlatform(),
            feedInputPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + 'hover-state-' + getImageTagBrowserPlatform(),
            feedInputPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} element hover state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});
