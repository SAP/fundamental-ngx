import { AlertPo } from '../pages/alert.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    refreshPage,
    saveElementScreenshot,
    waitForElDisplayed,
    waitForInvisibilityOf,
    checkElementScreenshot,
    isElementDisplayed,
    pause,
    waitForPresent,
    waitForNotDisplayed
} from '../../driver/wdio';

describe('Alert test suite', () => {
    const alertPage = new AlertPo();
    const { alerts, closeAlertButton, openOverlayButton, popupAlert, button, openCustomAlertButton } = alertPage;

    beforeAll(() => {
        alertPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(alerts);
    }, 1);

    describe('main checks', () => {
        it('should check ability to dismiss alert', () => {
            const dismissableAlertCount = getElementArrayLength(closeAlertButton);

            for (let i = 0; dismissableAlertCount > i; i++) {
                click(closeAlertButton, i);
                expect(isElementDisplayed(closeAlertButton, i)).toBe(false);
            }
        });

        it('should check popup alerts appear and disappear', () => {
            const openOverlayButtonCount = 3;
            checkPopupAlert(openOverlayButton, openOverlayButtonCount);
        });

        it('should check custom popup alerts appear and disappear', () => {
            const customAlertCount = getElementArrayLength(openCustomAlertButton);
            checkPopupAlert(openCustomAlertButton, customAlertCount);
        });

        it('should check RTL/LTR orientations', () => {
            alertPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        it('should check example blocks visual regression', () => {
            alertPage.saveExampleBaselineScreenshot();
            expect(alertPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check custom alerts visual regression', () => {
            const customAlertCount = getElementArrayLength(openCustomAlertButton);

            for (let i = 0; customAlertCount > i; i++) {
                click(openCustomAlertButton, i);
                waitForPresent(popupAlert);
                saveElementScreenshot(
                    popupAlert,
                    `alert-customPopup-example-${i}-core-${getImageTagBrowserPlatform()}`,
                    alertPage.getScreenshotFolder()
                );
                expect(
                    checkElementScreenshot(
                        popupAlert,
                        `alert-customPopup-example-${i}-core-${getImageTagBrowserPlatform()}`,
                        alertPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5);
                waitForInvisibilityOf(popupAlert);
            }
        }, 1);
    });

    function checkPopupAlert(selector: string, count: number): void {
        for (let i = 0; count > i; i++) {
            click(selector, i);
            expect(waitForElDisplayed(popupAlert)).toBe(true);

            if (doesItExist(popupAlert + button) === false) {
                waitForNotDisplayed(popupAlert, 0, 12000);
                continue;
            }
            click(popupAlert + button);
            // the pause gives the alert time to close before checking if it still exists
            pause(750);
            expect(doesItExist(popupAlert)).toBe(false);
        }
    }
});
