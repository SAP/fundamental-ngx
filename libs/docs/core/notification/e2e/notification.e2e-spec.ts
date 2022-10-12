import { NotificationPo } from './notification.po';
import {
    click,
    doesItExist,
    getElementClass,
    getText,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Notification component test', () => {
    const notificationPage = new NotificationPo();
    const {
        defaultExample,
        openTemplateExample,
        asContentExample,
        groupExample,
        button,
        closeButton,
        rejectButton,
        approveButton,
        tabsItem,
        notificationBody,
        notificationIndicator,
        messageStrip,
        result,
        avatar,
        notificationContainer,
        cdkOverlay,
        notification,
        tabPanel,
        notificationHeader,
        overflowButton,
        messageToast,
        forwardButton
    } = notificationPage;

    beforeEach(async () => {
        await notificationPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(notificationPage.root);
        await waitForElDisplayed(notificationPage.title);
    }, 2);

    it('should check notification with avatar, success indicator and unread title', async () => {
        await expect(await isElementDisplayed(defaultExample + avatar)).toBe(true, `avatar does not exist`);
        await expect(await isElementDisplayed(defaultExample + notificationIndicator + '--success')).toBe(
            true,
            `no success indicator`
        );
    });

    it('should check Notification with error indicator and no avatar', async () => {
        await expect(await isElementDisplayed(defaultExample + notificationIndicator + '--error')).toBe(
            true,
            `no error indicator`
        );
    });

    it('should check notification with message strip, unread title and custom width', async () => {
        await expect(await isElementDisplayed(defaultExample + messageStrip)).toBe(
            true,
            `message strip is not displayed`
        );
        await click(defaultExample + messageStrip + button);
        await expect(await isElementDisplayed(defaultExample + messageStrip)).toBe(
            false,
            `message strip is not hidden`
        );
    });

    it('should check notification in Component as content example', async () => {
        await click(asContentExample + button);
        await expect(await isElementDisplayed(notificationContainer)).toBe(true, `notification is not opened`);
        await expect(await getElementClass(notificationContainer + messageStrip)).toContain('success');
        await click(notificationContainer + button);
        await expect(await getText(asContentExample + result)).toContain('Open Button Clicked');
        await click(asContentExample + button);
        await click(notificationContainer + closeButton);
        await expect(await getText(asContentExample + result)).toContain('Close Button Click');
    });

    it('should check template as content example', async () => {
        await click(openTemplateExample + button);
        await expect(await isElementDisplayed(notificationContainer)).toBe(true, `notification is not opened`);
        await waitForNotDisplayed(notificationContainer, 0, 10000);
        await expect(await getText(openTemplateExample + result)).toContain('dismissed');
        await click(openTemplateExample + button);
        await click(notificationContainer + button);
        await expect(await getText(openTemplateExample + result)).toContain('Open Button Clicked');
        await click(openTemplateExample + button);
        await click(notificationContainer + closeButton);
        await expect(await getText(openTemplateExample + result)).toContain('Close Button Click');
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6533
    xit('should check group example', async () => {
        await click(groupExample + button);
        await expect(await isElementDisplayed(cdkOverlay + notification)).toBe(true, `notifications is not opened`);
        for (let i = 0; i < 3; i++) {
            await click(cdkOverlay + tabsItem, i);
            await expect(await isElementDisplayed(cdkOverlay + tabPanel, i)).toBe(true);
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6533
    xit('should check collapsibing in group example', async () => {
        await click(groupExample + button);
        for (let i = 0; i < 3; i++) {
            await scrollIntoView(cdkOverlay + tabsItem, i);
            await click(cdkOverlay + tabsItem, i);
            if (i === 3) {
                await scrollIntoView(cdkOverlay + notificationHeader + button);
                await click(cdkOverlay + notificationHeader + button);
                await click(cdkOverlay + notificationHeader + button, 3);
            }
            if (i !== 3) {
                await click(cdkOverlay + notificationHeader + button);
            }
            await expect(await doesItExist(cdkOverlay + notificationBody)).toBe(false);
        }
    });

    it('should check approve actions with notification', async () => {
        for (let i = 0; i < 2; i++) {
            await checkActions('Approve', approveButton, i);
        }
    });

    it('should check reject actions with notification', async () => {
        for (let i = 0; i < 2; i++) {
            await checkActions('Reject', rejectButton, i);
        }
    });

    it('should check forward actions with notification', async () => {
        for (let i = 0; i < 2; i++) {
            await checkActions('Forward', forwardButton, i);
        }
    });

    it('should check RTL and LTR orientation', async () => {
        await notificationPage.checkRtlSwitch();
    });

    async function checkActions(action: string, buttonChoice: string, index: number): Promise<void> {
        await scrollIntoView(defaultExample + overflowButton, index);
        await click(defaultExample + overflowButton, index);
        await click(buttonChoice);
        await expect(await waitForPresent(messageToast)).toBe(true);
        await expect(await getText(messageToast)).toBe(`${action} action performed`);
    }
});
