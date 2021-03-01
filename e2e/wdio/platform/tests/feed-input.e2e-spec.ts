import {
    addValue,
    clearValue,
    doesItExist,
    elementDisplayed,
    executeScriptAfterTagFF,
    getAttributeByName,
    getAttributeByNameArr,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementSize,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { FeedInputPo } from '../pages/feed-input.po';
import {
    default_avatar_class,
    placeholders_array,
    send_button_tooltip
} from '../fixtures/appData/feed-input-page-contents';
import { eight_lines_text, four_lines_text } from '../fixtures/testData/feed-input';

describe('Verify Feed Input component', function() {
    const { feedInputAvatar, feedInputTextArea, feedInput, feedInputNoAvatar, feedInputButton } = new FeedInputPo();
    const feedInputPage = new FeedInputPo();

    beforeAll(() => {
        feedInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(feedInputAvatar);
    }, 1);

    it('should have correct placeholder assigned', () => {
        expect(getAttributeByNameArr(feedInputTextArea, 'placeholder')).toEqual(placeholders_array);
    });

    it('should have example with avatar image assigned', () => {
        waitForPresent(feedInput);
        waitForPresent(feedInputAvatar);
        expect(getAttributeByName(feedInput, 'avatarsrc')).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc')).not.toBeNull();
        expect(getAttributeByName(feedInputAvatar, 'class')).not.toContain(default_avatar_class);

        waitForPresent(feedInput, 3);
        waitForPresent(feedInputAvatar, 2);
        expect(getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc', 3)).not.toBeNull();
        expect(getAttributeByName(feedInputAvatar, 'class', 2)).not.toContain(default_avatar_class);

        waitForPresent(feedInput, 4);
        waitForPresent(feedInputAvatar, 3);
        expect(getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBe('');
        expect(getAttributeByName(feedInput, 'avatarsrc', 4)).not.toBeNull();
        expect(getAttributeByName(feedInputAvatar, 'class', 3)).not.toContain(default_avatar_class);
    });

    it('should have example with default avatar assigned', () => {
        expect(['', null]).toContain(getAttributeByName(feedInput, 'avatarsrc', 1));
        expect(getAttributeByName(feedInputAvatar, 'class', 1)).toContain(default_avatar_class);
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
            expect(getAttributeByName(feedInputButton, 'aria-disabled', i)).toBe('true');
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

    it('should stop growing after maxHeight option value was reached', () => {
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

            const sendButtonFocusStyle = executeScriptAfterTagFF(feedInputButton, i);

            expect(inputFocusStyle).toBe('dotted');
            expect(sendButtonFocusStyle).toContain('dotted');
        }
    });

    it('should avatar and Send button has correct tooltip', () => {
        expect(getAttributeByNameArr(feedInputButton, 'title')).toEqual(send_button_tooltip);
        // #4399 uncomment after fix
        // expect(getAttributeByNameArr(feedInputAvatar, 'title')).toEqual(avatar_tooltip);
    });

    it('should check RTL', () => {
        feedInputPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            feedInputPage.saveExampleBaselineScreenshot('feed-input');
            expect(feedInputPage.compareWithBaseline('feed-input')).toBeLessThan(1);
        });
    });
});
