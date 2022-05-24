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
    waitForNotDisplayed,
    scrollIntoView,
    getAttributeByName,
    setValue,
    getText,
    sendKeys,
    getElementClass
} from '../../driver/wdio';

describe('Alert test suite', () => {
    const alertPage = new AlertPo();
    const {
        closeAlertButton,
        openOverlayButton,
        popupAlert,
        button,
        openCustomAlertButton,
        playgroundAlert,
        select,
        option,
        playgroundAlertText,
        alertWidthField,
        messageField,
        checkbox,
        openAlertButton
    } = alertPage;

    beforeAll(() => {
        alertPage.open();
    }, 1);

    afterEach(() => {
        refreshPage(true);
        waitForPresent(alertPage.root);
        waitForElDisplayed(alertPage.title);
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

    describe('Alert with customizable width example', () => {
        it('check alert with width 250px', () => {
            click(openCustomAlertButton);
            expect(getAttributeByName(popupAlert, 'style')).toContain('width: 250px');
        });

        it('check alert with width 550px', () => {
            click(openCustomAlertButton, 1);
            expect(getAttributeByName(popupAlert, 'style')).toContain('width: 550px');
        });

        it('check alert with width 70 vw', () => {
            click(openCustomAlertButton, 2);
            expect(getAttributeByName(popupAlert, 'style')).toContain('width: 70vw');
        });

        it('check alert with width 100px', () => {
            click(openCustomAlertButton, 3);
            expect(getAttributeByName(popupAlert, 'style')).toContain('width: 100vw');
        });
    });

    describe('Playground example', () => {
        it('should check changing alert text', () => {
            const newValue = '123';
            setValue(messageField, newValue);
            expect(getText(playgroundAlertText)).toBe(newValue);
            expect(getText(playgroundAlertText, 1)).toBe(newValue);
        });

        it('should check that we can keep alert without test', () => {
            const defaulTextLength = getText(playgroundAlert).length;
            click(messageField);
            for (let i = 0; i < defaulTextLength; i++) {
                sendKeys('Backspace');
            }
            expect(getText(playgroundAlertText, 0)).toBe('');
            expect(getText(playgroundAlertText, 1)).toBe('');
        });

        it('should check changing width of the alert', () => {
            setValue(alertWidthField, '90%');
            expect(getAttributeByName(playgroundAlert, 'style')).toContain('width: 90%');
            expect(getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 90%');
        });

        it('should check that we can put different width meter(px, vw, etc.)', () => {
            setValue(alertWidthField, '100px');
            expect(getAttributeByName(playgroundAlert, 'style')).toContain('width: 100px');
            expect(getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 100px');
        });

        it('should check that width will not change if miss width meter(%, px, vw_)', () => {
            setValue(alertWidthField, '90');
            expect(getAttributeByName(playgroundAlert, 'style')).toContain('width: 100%');
            expect(getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 100%');
        });

        it('should check changing type of warning', () => {
            click(playgroundAlert + button);
            click(select);
            click(option, 1);
            expect(getElementClass(playgroundAlert)).toContain('warning');
        });

        it('should turn on/turn off dissmising alerts', () => {
            click(checkbox);
            expect(doesItExist(playgroundAlert + button)).toBe(false);
            click(checkbox);
            expect(doesItExist(playgroundAlert + button)).toBe(true);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7189
        xit('should check close - open alert', () => {
            scrollIntoView(playgroundAlert);
            click(playgroundAlert + button);
            expect(getElementArrayLength(playgroundAlert)).toBe(1);
            click(openAlertButton);
            expect(getElementArrayLength(playgroundAlert)).toBe(2);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/6405
        xit('should check that after removing one alert and changing alert mode will not be added one more alert', () => {
            scrollIntoView(playgroundAlert);
            click(playgroundAlert + button);
            click(select);
            click(option);
            expect(getElementArrayLength(playgroundAlert)).toBe(1, 'new alert appeared, but should not');
        });
    });

    it('should check RTL/LTR orientations', () => {
        alertPage.checkRtlSwitch();
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
