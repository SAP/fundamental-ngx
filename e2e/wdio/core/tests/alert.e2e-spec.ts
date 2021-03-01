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
    checkElementScreenshot, scrollIntoView, isElementDisplayed, pause
} from '../../driver/wdio';

describe('alert test suite', function() {
    const alertPage = new AlertPo();
    const {
        alerts,
        closeAlertButton,
        openOverlayButton,
        popupAlert,
        button,
        openCustomAlertButton
    } = alertPage;

    beforeAll(() => {
        alertPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(alerts);
    }, 1);

    describe('main checks', function() {
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
        })
    });

    describe('visual regression', function() {
        it('should check example blocks visual regression', () => {
            alertPage.saveExampleBaselineScreenshot('alert');
            expect(alertPage.compareWithBaseline('alert')).toBeLessThan(4);
        });

        it('should check custom alerts visual regression', () => {
            const customAlertCount = getElementArrayLength(openCustomAlertButton);

            for (let i = 0; customAlertCount > i; i++) {
                click(openCustomAlertButton, i);
                scrollIntoView(popupAlert);
                saveElementScreenshot(popupAlert, `alert-customPopup-example-${i}-core-${getImageTagBrowserPlatform()}`);
                expect(checkElementScreenshot(popupAlert, `alert-customPopup-example-${i}-core-${getImageTagBrowserPlatform()}`))
                    .toBeLessThan(1);
                if (doesItExist(popupAlert + button) === false) {
                    waitForInvisibilityOf(popupAlert);
                    continue;
                }
                click(popupAlert + button);
            }
        });
    });

    function checkPopupAlert(selector: string, count: number): void {
        for (let i = 0; count > i; i++) {
            click(selector, i);
            expect(waitForElDisplayed(popupAlert)).toBe(true);

            if (doesItExist(popupAlert + button) === false) {
                waitForInvisibilityOf(popupAlert);
                continue;
            }
            click(popupAlert + button);
            // the pause gives the alert time to close before checking if it still exists
            pause(250);
            expect(doesItExist(popupAlert)).toBe(false);
        }
    }
});
