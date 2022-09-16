import { MessagePagePo } from './message-page.po';
import {
    checkElArrIsClickable,
    click,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { subtitleTextArr, titleTextArr } from './message-page-content';

describe('Message Page test suite', () => {
    const messagePage = new MessagePagePo();
    const { examples, icons, content, contentTitle, contentSubTitle, contentButton, contentLink } = messagePage;

    beforeAll(() => {
        messagePage.open();
    }, 1);

    it('should check icons are present', () => {
        const exampleCount = getElementArrayLength(examples);
        const noIconExample = 6;

        for (let i = 0; i < exampleCount; i++) {
            if (i === noIconExample) {
                continue;
            }
            scrollIntoView(icons, i);

            expect(isElementDisplayed(icons, i)).toBe(true, `icon for example ${i} is not displayed`);
        }
    });

    it('should check content is displayed', () => {
        const exampleCount = getElementArrayLength(examples);

        for (let i = 0; i < exampleCount; i++) {
            expect(isElementDisplayed(content, i)).toBe(true, `content for example ${i} not displayed`);
        }
    });

    it('should check content title text', () => {
        const titleCount = getElementArrayLength(contentTitle);

        for (let i = 0; i < titleCount; i++) {
            expect(getText(contentTitle, i)).toEqual(titleTextArr[i]);
        }
    });

    it('should check content subtitle text', () => {
        const subtitleCount = getElementArrayLength(contentSubTitle);

        for (let i = 0; i < subtitleCount; i++) {
            expect(getText(contentSubTitle, i)).toEqual(subtitleTextArr[i]);
        }
    });

    it('should check content buttons are clickable', () => {
        checkElArrIsClickable(contentButton);
    });

    it('should check home page link', () => {
        click(contentLink);
        waitForElDisplayed(messagePage.root);

        expect(getCurrentUrl()).toContain('/home');
    });

    it('should check RTL mode', () => {
        messagePage.checkRtlSwitch();
    });
});
