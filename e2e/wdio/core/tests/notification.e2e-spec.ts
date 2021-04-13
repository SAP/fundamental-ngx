import { NotificationPo } from '../pages/notification.po';
import {
    checkElementScreenshot,
    click,
    getElementArrayLength, getText, isElementClickable, isElementDisplayed,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForElDisplayed
} from '../../driver/wdio';

import {
    titleText, descriptionText, metaDataText, metaDataText2, notificationText, templateAsContentApproveText,
    templateAsContentRejectText, templateAsContentCloseText, componentAsContentCancelText, componentAsContentCloseText,
    notificationGroupText, thisNotificationGroupText, notificationGroupApproveText, componentAsContentApproveText,
    notificationGroupCancelText, notificationCloseText, objectApproveText, objectCancelText, objectCloseText
} from '../fixtures/appData/notification-contents';

describe('Notification test suite', function() {
    const notificationPage = new NotificationPo();
    const {
        notificationButton, buttonMoreInfo, notificationBlock, buttonClose, buttonApprove, buttonCancel, notificationTitle,
        notificationDescription, notificationMetadata, notificationAvatar, notificationIndicator, notificationSpan,
        indicatorSuccess, indicatorWarning
    } = notificationPage;

    beforeAll(() => {
        notificationPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(notificationButton);
    }, 1);

    describe('Check orientation', function() {
        it('Verify LTR / RTL orientation', () => {
            notificationPage.checkRtlSwitch();
        });
    });

    describe('Check Notification example', function() {

        it('verify notification creation and all elements are displayed', () => {
            scrollIntoView(notificationButton);
            click(notificationButton);
            const blockLength = getElementArrayLength(notificationBlock);
            for (let i = 0; i < blockLength; i++) {
                scrollIntoView(notificationBlock, i);
                expect(isElementDisplayed(notificationBlock, i)).toBe(true, `block with index ${i} not displayed`);
                expect(isElementDisplayed(notificationAvatar, i)).toBe(true, `avatar with index ${i} not displayed`);
                expect(isElementDisplayed(notificationIndicator, i)).toBe(true, `indicator with index ${i} not displayed`);
                expect(isElementClickable(buttonMoreInfo, i)).toBe(true, `button more with index ${i} not clickable`);
                expect(getText(notificationTitle, i)).toBe(titleText);
                expect(getText(notificationDescription, i)).toBe(descriptionText);
                expect(getText(notificationMetadata, i)).toBe(metaDataText);
            }
        });

        it('verify close button', () => {
            const defaultBlockLength = 6;
            scrollIntoView(notificationButton);
            click(notificationButton);
            const blockLength = getElementArrayLength(notificationBlock);
            expect(blockLength).toEqual(defaultBlockLength);
            for (let i = 0; i < blockLength; i++) {
                scrollIntoView(buttonClose);
                click(buttonClose);
                const newBlockLength = getElementArrayLength(notificationBlock);
                expect(newBlockLength).toEqual(defaultBlockLength - i - 1);
            }
        });

        it('verify approve button', () => {
            const defaultBlockLength = 6;
            scrollIntoView(notificationButton);
            click(notificationButton);
            const blockLength = getElementArrayLength(notificationBlock);
            expect(blockLength).toEqual(defaultBlockLength);
            for (let i = 0; i < blockLength; i++) {
                scrollIntoView(buttonApprove);
                click(buttonApprove);
                const newBlockLength = getElementArrayLength(notificationBlock);
                expect(newBlockLength).toEqual(defaultBlockLength - i - 1);
            }
        });

        it('verify cancel button', () => {
            const defaultBlockLength = 6;
            scrollIntoView(notificationButton);
            click(notificationButton);
            const blockLength = getElementArrayLength(notificationBlock);
            expect(blockLength).toEqual(defaultBlockLength);
            for (let i = 0; i < blockLength; i++) {
                scrollIntoView(buttonCancel);
                click(buttonCancel);
                const newBlockLength = getElementArrayLength(notificationBlock);
                expect(newBlockLength).toEqual(defaultBlockLength - i - 1);
            }
        });
    });

    describe('Check Template as Content example', function() {

        it('verify notification creation and all elements are displayed', () => {
            scrollIntoView(notificationButton, 1);
            click(notificationButton, 1);
            scrollIntoView(notificationBlock);
            expect(isElementDisplayed(notificationBlock)).toBe(true, `block with index not displayed`);
            expect(isElementDisplayed(notificationAvatar)).toBe(true, `avatar with index not displayed`);
            expect(isElementClickable(buttonMoreInfo)).toBe(true, `button more with index not clickable`);
            expect(getText(notificationTitle)).toBe(notificationText);
            expect(getText(notificationDescription)).toBe(descriptionText);
            expect(getText(notificationMetadata)).toBe(metaDataText2);
        });

        it('verify approve button', () => {
            scrollIntoView(notificationButton, 1);
            click(notificationButton, 1);
            click(buttonApprove);
            expect(getText(notificationSpan)).toBe(templateAsContentApproveText);
        });

        it('verify reject button', () => {
            scrollIntoView(notificationButton, 1);
            click(notificationButton, 1);
            click(buttonCancel);
            expect(getText(notificationSpan)).toBe(templateAsContentRejectText);
        });

        it('verify close button', () => {
            scrollIntoView(notificationButton, 1);
            click(notificationButton, 1);
            click(buttonClose);
            expect(getText(notificationSpan)).toBe(templateAsContentCloseText);
        });
    });

    describe('Check Component as Content example', function() {

        it('verify notification creation and all elements are displayed', () => {
            scrollIntoView(notificationButton, 2);
            click(notificationButton, 2);
            scrollIntoView(notificationBlock);
            expect(isElementDisplayed(notificationBlock)).toBe(true, `block with index not displayed`);
            expect(isElementDisplayed(indicatorSuccess)).toBe(true, `indicator with index not displayed`);
            expect(isElementDisplayed(notificationAvatar)).toBe(true, `avatar with index not displayed`);
            expect(isElementClickable(buttonMoreInfo)).toBe(true, `button more with index not clickable`);
            expect(getText(notificationTitle)).toBe(titleText);
            expect(getText(notificationDescription)).toBe(descriptionText);
            expect(getText(notificationMetadata)).toBe(metaDataText);
        });

        it('verify approve button', () => {
            scrollIntoView(notificationButton, 2);
            click(notificationButton, 2);
            click(buttonApprove);
            expect(getText(notificationSpan, 1)).toBe(componentAsContentApproveText);
        });

        it('verify cancel button', () => {
            scrollIntoView(notificationButton, 2);
            click(notificationButton, 2);
            click(buttonCancel);
            expect(getText(notificationSpan, 1)).toBe(componentAsContentCancelText);
        });

        it('verify close button', () => {
            scrollIntoView(notificationButton, 2);
            click(notificationButton, 2);
            click(buttonClose);
            expect(getText(notificationSpan, 1)).toBe(componentAsContentCloseText);
        });
    });

    describe('Check Notification Groups example', function() {

        it('verify notification creation and all elements are displayed', () => {
            scrollIntoView(notificationButton, 3);
            click(notificationButton, 3);
            scrollIntoView(notificationBlock);
            expect(isElementDisplayed(notificationBlock)).toBe(true, `block with index not displayed`);
            expect(isElementDisplayed(indicatorWarning)).toBe(true, `indicator with index not displayed`);
            expect(isElementDisplayed(notificationAvatar)).toBe(true, `avatar with index not displayed`);
            expect(isElementClickable(buttonMoreInfo)).toBe(true, `button more with index not clickable`);
            expect(getText(notificationTitle)).toBe(notificationGroupText);
            expect(getText(notificationDescription)).toBe(thisNotificationGroupText);
            expect(getText(notificationMetadata)).toBe(notificationGroupText);
        });

        it('verify approve button', () => {
            scrollIntoView(notificationButton, 3);
            click(notificationButton, 3);
            click(buttonApprove);
            expect(getText(notificationSpan, 2)).toBe(notificationGroupApproveText);
        });

        it('verify cancel button', () => {
            scrollIntoView(notificationButton, 3);
            click(notificationButton, 3);
            click(buttonCancel);
            expect(getText(notificationSpan, 2)).toBe(notificationGroupCancelText);
        });

        it('verify close button', () => {
            scrollIntoView(notificationButton, 3);
            click(notificationButton, 3);
            click(buttonClose);
            expect(getText(notificationSpan, 2)).toBe(notificationCloseText);
        });
    });

    describe('Check Notifications From Object example', function() {

        it('verify notification creation and all elements are displayed', () => {
            scrollIntoView(notificationButton, 4);
            click(notificationButton, 4);
            scrollIntoView(notificationBlock);
            expect(isElementDisplayed(notificationBlock)).toBe(true, `block with index not displayed`);
            expect(isElementDisplayed(indicatorSuccess)).toBe(true, `indicator with index not displayed`);
            expect(isElementDisplayed(notificationAvatar)).toBe(true, `avatar with index not displayed`);
            expect(isElementClickable(buttonMoreInfo)).toBe(true, `button more with index not clickable`);
            expect(getText(notificationTitle)).toBe(titleText);
            expect(getText(notificationDescription)).toBe(descriptionText);
            expect(getText(notificationMetadata)).toBe(metaDataText);
        });

        it('verify approve button', () => {
            scrollIntoView(notificationButton, 4);
            click(notificationButton, 4);
            click(buttonApprove);
            expect(getText(notificationSpan, 3)).toBe(objectApproveText);
        });

        it('verify cancel button', () => {
            scrollIntoView(notificationButton, 4);
            click(notificationButton, 4);
            click(buttonCancel);
            expect(getText(notificationSpan, 3)).toBe(objectCancelText);
        });

        it('verify close button', () => {
            scrollIntoView(notificationButton, 4);
            click(notificationButton, 4);
            click(buttonClose);
            expect(getText(notificationSpan, 3)).toBe(objectCloseText);
        });
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            scrollIntoView(notificationButton);
            click(notificationButton);
            notificationPage.saveExampleBaselineScreenshot();
            expect(notificationPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check notification examples', () => {
            const notificationBlockTag = 'notification-block-';
            const notificationButtonLength = getElementArrayLength(notificationButton);
            for (let i = 1; i < notificationButtonLength; i++) {
                scrollIntoView(notificationButton, i);
                click(notificationButton, i);
            }
            const notificationBlockLength = getElementArrayLength(notificationBlock);
            for (let i = 0; i < notificationBlockLength; i++) {
                saveElementScreenshot(notificationBlock, notificationBlockTag + i, notificationPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(notificationBlock, notificationBlockTag + i, notificationPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `${notificationBlock} button item ${i} active state mismatch`);
            }
        });
    });
});
