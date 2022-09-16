import { MessageToastPo } from './message-toast.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Textarea component test', () => {
    const messageToastPage = new MessageToastPo();
    const { openMessageButton, hideAllButton, messageToast } = messageToastPage;

    beforeAll(() => {
        messageToastPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage(true);
        waitForPresent(messageToastPage.root);
        waitForElDisplayed(messageToastPage.title);
    }, 2);

    it('should check opening first messageToast', () => {
        click(openMessageButton);
        expect(isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        waitForNotDisplayed(messageToast, 0, 7500);
        expect(doesItExist(messageToast)).toBe(false, 'messageToast still displayed');
    });

    it('should check that message toast not disappears if hover on it', () => {
        click(openMessageButton);
        mouseHoverElement(messageToast);
        waitForElDisplayed(messageToast, 0, 10000);
    });

    it('should check opening second messageToast', () => {
        scrollIntoView(openMessageButton, 1);
        click(openMessageButton, 1);
        expect(isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        waitForNotDisplayed(messageToast, 0, 4000);
    });

    it('should check opening third messageToast', () => {
        click(openMessageButton, 2);
        expect(isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        waitForNotDisplayed(messageToast, 0, 5100);
    });

    it('should check that possible to open few messageToasts in one time', () => {
        click(openMessageButton);
        click(openMessageButton, 1);
        expect(getElementArrayLength(messageToast)).toBe(2, 'one of messageToasts did not open');
    });

    it('should check working of Hide All button', () => {
        for (let i = 2; i > 0; i--) {
            click(openMessageButton, i);
        }
        expect(getElementArrayLength(messageToast)).toBe(2, 'not all messageToasts displayed');
        scrollIntoView(hideAllButton);
        click(hideAllButton);
        expect(getElementArrayLength(messageToast)).toBe(0, 'elements is not hidden');
        expect(doesItExist(messageToast)).toBe(false, 'messageToast still displayed');
    });

    it('should check orientation', () => {
        messageToastPage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', () => {
        messageToastPage.saveExampleBaselineScreenshot();
        expect(messageToastPage.compareWithBaseline()).toBeLessThan(5);
    });
});
