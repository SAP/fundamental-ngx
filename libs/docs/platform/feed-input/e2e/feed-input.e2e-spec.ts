import {
    addValue,
    browserIsSafari,
    clearValue,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getAttributeByNameArr,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { FeedInputPo } from './feed-input.po';
import {
    avatar_tooltip,
    default_avatar_class,
    placeholders_array,
    send_button_tooltip
} from './feed-input-page-contents';
import { eight_lines_text, four_lines_text } from './feed-input';

describe('Verify Feed Input component', () => {
    const {
        feedInputAvatar,
        feedInputTextArea,
        feedInput,
        feedInputNoAvatar,
        feedInputButton,
        feedInputPlaceholder1,
        feedInputPlaceholder2
    } = new FeedInputPo();
    const feedInputPage = new FeedInputPo();

    beforeAll(() => {
        feedInputPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(feedInputPage.root);
        waitForElDisplayed(feedInputPage.title);
    }, 1);

    it('should have correct placeholder assigned', () => {
        expect(getAttributeByNameArr(feedInputTextArea, 'placeholder')).toEqual(placeholders_array);
    });

    it('should have example with avatar image assigned', () => {
        waitForPresent(feedInput);
        waitForPresent(feedInputAvatar);
        expect(getAttributeByName(feedInput, 'avatarsrc')).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc')).not.toBeNull();
        expect(getElementClass(feedInputAvatar)).not.toContain(default_avatar_class);

        waitForPresent(feedInput, 3);
        waitForPresent(feedInputAvatar, 2);
        expect(getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBeNull();
        expect(getElementClass(feedInputAvatar, 2)).not.toContain(default_avatar_class);

        waitForPresent(feedInput, 4);
        waitForPresent(feedInputAvatar, 3);
        expect(getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBeNull();
        expect(getElementClass(feedInputAvatar, 3)).not.toContain(default_avatar_class);
    });

    it('should have example with default avatar assigned', () => {
        expect(['', null]).toContain(getAttributeByName(feedInput, 'avatarsrc', 1));
        expect(getElementClass(feedInputAvatar, 1)).toContain(default_avatar_class);
    });

    it('should have example with no avatar', () => {
        waitForElDisplayed(feedInputButton, 2);
        scrollIntoView(feedInputButton, 2);
        expect(doesItExist(feedInputNoAvatar)).toBe(false);
    });

    it('should have Send button assigned and to be disabled if no value set in the input', () => {
        const arrLength = getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength > i; i++) {
            waitForPresent(feedInputButton, i);
            scrollIntoView(feedInputButton, i);
            expect(elementDisplayed(feedInputButton, i)).toBe(true);
            expect(getAttributeByName(feedInputButton, 'disabled', i)).toBe('true');
        }
    });

    it('should have Send button enabled if value is set in the input', () => {
        const arrLength = getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength > i; i++) {
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

    it('should grow if multiple row text is entered to the input', () => {
        waitForPresent(feedInputTextArea);
        scrollIntoView(feedInputTextArea);
        const arrLength = getElementArrayLength(feedInputButton);
        for (let i = 0; arrLength - 1 > i; i++) {
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
        }
    });

    xit('should stop growing after maxHeight option value was reached', () => {
        if (browserIsSafari()) {
            // correct value not returned on Safari
            return;
        }

        waitForPresent(feedInputTextArea, 4);
        scrollIntoView(feedInputTextArea, 4);

        clearValue(feedInputTextArea, 4);
        const feedInputSize1 = getElementSize(feedInputTextArea, 4, 'height');
        setValue(feedInputTextArea, eight_lines_text, 4);
        const feedInputSize2 = getElementSize(feedInputTextArea, 4, 'height');

        expect(feedInputSize1).toBeLessThanOrEqual(feedInputSize2);
        expect(feedInputSize2).toEqual(95);
    });

    it('should have focus stated assigned to elements', () => {
        if (browserIsSafari()) {
            // button not focused on Safari
            return;
        }
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
        expect(getAttributeByNameArr(feedInputButton, 'title')).toEqual(send_button_tooltip);
        expect(getAttributeByNameArr(feedInputAvatar, 'title')).toEqual(avatar_tooltip);
    });

    it('should check that all placeholders are displayed', () => {
        const firstPlaceholderLength = getElementArrayLength(feedInputPlaceholder1);
        const secondPlaceholderLength = getElementArrayLength(feedInputPlaceholder2);

        for (let i = 0; i < firstPlaceholderLength; i++) {
            expect(isElementDisplayed(feedInputPlaceholder1, i)).toBe(true, 'placeholder is not displayed');
        }
        for (let i = 0; i < secondPlaceholderLength; i++) {
            expect(isElementDisplayed(feedInputPlaceholder2, i)).toBe(true, 'placeholder is not displayed');
        }
    });

    it('should check that no ablity to type text in disabled input', () => {
        expect(isElementClickable(feedInputTextArea, 3)).toBe(false, 'input is not disabled');
        expect(isElementClickable(feedInputButton, 3)).toBe(false, 'submit button is not disabled');
    });

    it('should check RTL', () => {
        feedInputPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            feedInputPage.saveExampleBaselineScreenshot();
            expect(feedInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
