import {
    addValue,
    clearValue,
    doesItExist,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementPlaceholder,
    getElementSize,
    getElementTitle,
    isEnabled,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { FeedInputPo } from './feed-input.po';
import { eight_lines_text, four_lines_text } from './feed-input';
import { default_avatar, default_placeholder, emptyValuesArr, send_button_tooltip } from './feed-input-page-contents';

describe('Verify Feed Input component', () => {
    const feedInputPage = new FeedInputPo();
    const { feedInputTextArea, feedInputAvatar, feedInputButton, feedInputNoAvatar } = new FeedInputPo();

    beforeAll(() => {
        feedInputPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(feedInputPage.root);
        waitForElDisplayed(feedInputPage.title);
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
        expect(getAttributeByName(feedInputAvatar, 'glyph', 1)).toContain(default_avatar);
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
            scrollIntoView(feedInputButton, i);
            expect(isEnabled(feedInputButton, i)).toBe(true);
        }
    });

    it(
        'should grow if multiple row text is entered to the input ' +
            'stop growing after max Height option value was reached',
        () => {
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
        }
    );

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

            expect(emptyValuesArr).not.toContain(sendButtonFocusStyle);
            expect(emptyValuesArr).not.toContain(inputFocusStyle);
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

    xdescribe('Should check visual regression', () => {
        it('should check examples visual regression', () => {
            feedInputPage.saveExampleBaselineScreenshot();
            expect(feedInputPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
