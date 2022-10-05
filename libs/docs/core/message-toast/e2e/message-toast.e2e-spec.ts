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

    beforeAll(async () => {
        await messageToastPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage(true);
        await waitForPresent(messageToastPage.root);
        await waitForElDisplayed(messageToastPage.title);
    }, 2);

    it('should check opening first messageToast', async () => {
        await click(openMessageButton);
        await expect(await isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        await waitForNotDisplayed(messageToast, 0, 7500);
        await expect(await doesItExist(messageToast)).toBe(false, 'messageToast still displayed');
    });

    it('should check that message toast not disappears if hover on it', async () => {
        await click(openMessageButton);
        await mouseHoverElement(messageToast);
        await waitForElDisplayed(messageToast, 0, 10000);
    });

    it('should check opening second messageToast', async () => {
        await scrollIntoView(openMessageButton, 1);
        await click(openMessageButton, 1);
        await expect(await isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        await waitForNotDisplayed(messageToast, 0, 4000);
    });

    it('should check opening third messageToast', async () => {
        await click(openMessageButton, 2);
        await expect(await isElementDisplayed(messageToast)).toBe(true, 'messageToast is not displayed');
        await waitForNotDisplayed(messageToast, 0, 5100);
    });

    it('should check that possible to open few messageToasts in one time', async () => {
        await click(openMessageButton);
        await click(openMessageButton, 1);
        await expect(await getElementArrayLength(messageToast)).toBe(2, 'one of messageToasts did not open');
    });

    it('should check working of Hide All button', async () => {
        for (let i = 2; i > 0; i--) {
            await click(openMessageButton, i);
        }
        await expect(await getElementArrayLength(messageToast)).toBe(2, 'not all messageToasts displayed');
        await scrollIntoView(hideAllButton);
        await click(hideAllButton);
        await expect(await getElementArrayLength(messageToast)).toBe(0, 'elements is not hidden');
        await expect(await doesItExist(messageToast)).toBe(false, 'messageToast still displayed');
    });

    it('should check orientation', async () => {
        await messageToastPage.checkRtlSwitch();
    });

    xit('should check visual regression for all examples', async () => {
        await messageToastPage.saveExampleBaselineScreenshot();
        await expect(await messageToastPage.compareWithBaseline()).toBeLessThan(5);
    });
});
