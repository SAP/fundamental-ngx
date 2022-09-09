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

    beforeAll(() => {
        notificationPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(notificationPage.root);
        waitForElDisplayed(notificationPage.title);
    }, 2);

    it('should check notification with avatar, success indicator and unread title', () => {
        expect(isElementDisplayed(defaultExample + avatar)).toBe(true, `avatar does not exist`);
        expect(isElementDisplayed(defaultExample + notificationIndicator + '--success')).toBe(
            true,
            `no success indicator`
        );
    });

    it('should check Notification with error indicator and no avatar', () => {
        expect(isElementDisplayed(defaultExample + notificationIndicator + '--error')).toBe(true, `no error indicator`);
    });

    it('should check notification with message strip, unread title and custom width', () => {
        expect(isElementDisplayed(defaultExample + messageStrip)).toBe(true, `message strip is not displayed`);
        click(defaultExample + messageStrip + button);
        expect(isElementDisplayed(defaultExample + messageStrip)).toBe(false, `message strip is not hidden`);
    });

    it('should check notification in Component as content example', () => {
        click(asContentExample + button);
        expect(isElementDisplayed(notificationContainer)).toBe(true, `notification is not opened`);
        expect(getElementClass(notificationContainer + messageStrip)).toContain('success');
        click(notificationContainer + button);
        expect(getText(asContentExample + result)).toContain('Open Button Clicked');
        click(asContentExample + button);
        click(notificationContainer + closeButton);
        expect(getText(asContentExample + result)).toContain('Close Button Click');
    });

    it('should check template as content example', () => {
        click(openTemplateExample + button);
        expect(isElementDisplayed(notificationContainer)).toBe(true, `notification is not opened`);
        waitForNotDisplayed(notificationContainer, 0, 10000);
        expect(getText(openTemplateExample + result)).toContain('dismissed');
        click(openTemplateExample + button);
        click(notificationContainer + button);
        expect(getText(openTemplateExample + result)).toContain('Open Button Clicked');
        click(openTemplateExample + button);
        click(notificationContainer + closeButton);
        expect(getText(openTemplateExample + result)).toContain('Close Button Click');
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6533
    xit('should check group example', () => {
        click(groupExample + button);
        expect(isElementDisplayed(cdkOverlay + notification)).toBe(true, `notifications is not opened`);
        for (let i = 0; i < 3; i++) {
            click(cdkOverlay + tabsItem, i);
            expect(isElementDisplayed(cdkOverlay + tabPanel, i)).toBe(true);
        }
    });

    // skipped due to https://github.com/SAP/fundamental-ngx/issues/6533
    xit('should check collapsibing in group example', () => {
        click(groupExample + button);
        for (let i = 0; i < 3; i++) {
            scrollIntoView(cdkOverlay + tabsItem, i);
            click(cdkOverlay + tabsItem, i);
            if (i === 3) {
                scrollIntoView(cdkOverlay + notificationHeader + button);
                click(cdkOverlay + notificationHeader + button);
                click(cdkOverlay + notificationHeader + button, 3);
            }
            if (i !== 3) {
                click(cdkOverlay + notificationHeader + button);
            }
            expect(doesItExist(cdkOverlay + notificationBody)).toBe(false);
        }
    });

    it('should check approve actions with notification', () => {
        for (let i = 0; i < 2; i++) {
            checkActions('Approve', approveButton, i);
        }
    });

    it('should check reject actions with notification', () => {
        for (let i = 0; i < 2; i++) {
            checkActions('Reject', rejectButton, i);
        }
    });

    it('should check forward actions with notification', () => {
        for (let i = 0; i < 2; i++) {
            checkActions('Forward', forwardButton, i);
        }
    });

    it('should check RTL and LTR orientation', () => {
        notificationPage.checkRtlSwitch();
    });

    function checkActions(action: string, buttonChoice: string, index: number): void {
        scrollIntoView(defaultExample + overflowButton, index);
        click(defaultExample + overflowButton, index);
        click(buttonChoice);
        expect(waitForPresent(messageToast)).toBe(true);
        expect(getText(messageToast)).toBe(`${action} action performed`);
        pause(1200);
    }
});
