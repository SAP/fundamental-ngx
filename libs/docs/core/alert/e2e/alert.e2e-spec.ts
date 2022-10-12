import { AlertPo } from './alert.po';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    checkElementScreenshot,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getImageTagBrowserPlatform,
    getText,
    isElementDisplayed,
    pause,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForNotDisplayed,
    waitForPresent
} from '../../../../../e2e';

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

    beforeAll(async () => {
        await alertPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage(true);
        await waitForPresent(alertPage.root);
        await waitForElDisplayed(alertPage.title);
    }, 1);

    describe('main checks', () => {
        it('should check ability to dismiss alert', async () => {
            const dismissableAlertCount = await getElementArrayLength(closeAlertButton);

            for (let i = 0; dismissableAlertCount > i; i++) {
                await click(closeAlertButton, i);
                await expect(await isElementDisplayed(closeAlertButton, i)).toBe(false);
            }
        });

        it('should check popup alerts appear and disappear', async () => {
            const openOverlayButtonCount = 3;
            await checkPopupAlert(openOverlayButton, openOverlayButtonCount);
        });

        it('should check custom popup alerts appear and disappear', async () => {
            const customAlertCount = await getElementArrayLength(openCustomAlertButton);
            await checkPopupAlert(openCustomAlertButton, customAlertCount);
        });

        it('should check RTL/LTR orientations', async () => {
            await alertPage.checkRtlSwitch();
        });
    });

    describe('Alert with customizable width example', () => {
        it('check alert with width 250px', async () => {
            await click(openCustomAlertButton);
            await expect(await getAttributeByName(popupAlert, 'style')).toContain('width: 250px');
        });

        it('check alert with width 550px', async () => {
            await click(openCustomAlertButton, 1);
            await expect(await getAttributeByName(popupAlert, 'style')).toContain('width: 550px');
        });

        it('check alert with width 70 vw', async () => {
            await click(openCustomAlertButton, 2);
            await expect(await getAttributeByName(popupAlert, 'style')).toContain('width: 70vw');
        });

        it('check alert with width 100px', async () => {
            await click(openCustomAlertButton, 3);
            await expect(await getAttributeByName(popupAlert, 'style')).toContain('width: 100vw');
        });
    });

    describe('Playground example', () => {
        it('should check changing alert text', async () => {
            const newValue = '123';
            await setValue(messageField, newValue);
            await expect(await getText(playgroundAlertText)).toBe(newValue);
            await expect(await getText(playgroundAlertText, 1)).toBe(newValue);
        });

        it('should check that we can keep alert without test', async () => {
            const defaulTextLength = (await getText(playgroundAlert)).length;
            await click(messageField);
            for (let i = 0; i < defaulTextLength; i++) {
                await sendKeys('Backspace');
            }
            await expect(await getText(playgroundAlertText, 0)).toBe('');
            await expect(await getText(playgroundAlertText, 1)).toBe('');
        });

        it('should check changing width of the alert', async () => {
            await setValue(alertWidthField, '90%');
            await expect(await getAttributeByName(playgroundAlert, 'style')).toContain('width: 90%');
            await expect(await getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 90%');
        });

        it('should check that we can put different width meter(px, vw, etc.)', async () => {
            await setValue(alertWidthField, '100px');
            await expect(await getAttributeByName(playgroundAlert, 'style')).toContain('width: 100px');
            await expect(await getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 100px');
        });

        it('should check that width will not change if miss width meter(%, px, vw_)', async () => {
            await setValue(alertWidthField, '90');
            await expect(await getAttributeByName(playgroundAlert, 'style')).toContain('width: 100%');
            await expect(await getAttributeByName(playgroundAlert, 'style', 1)).toContain('width: 100%');
        });

        it('should check changing type of warning', async () => {
            await click(playgroundAlert + button);
            await click(select);
            await click(option, 1);
            await expect(await getElementClass(playgroundAlert)).toContain('warning');
        });

        it('should turn on/turn off dissmising alerts', async () => {
            await click(checkbox);
            await expect(await doesItExist(playgroundAlert + button)).toBe(false);
            await click(checkbox);
            await expect(await doesItExist(playgroundAlert + button)).toBe(true);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7189
        xit('should check close - open alert', async () => {
            await scrollIntoView(playgroundAlert);
            await click(playgroundAlert + button);
            await expect(await getElementArrayLength(playgroundAlert)).toBe(1);
            await click(openAlertButton);
            await expect(await getElementArrayLength(playgroundAlert)).toBe(2);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/6405
        xit('should check that after removing one alert and changing alert mode will not be added one more alert', async () => {
            await scrollIntoView(playgroundAlert);
            await click(playgroundAlert + button);
            await click(select);
            await click(option);
            await expect(await getElementArrayLength(playgroundAlert)).toBe(1, 'new alert appeared, but should not');
        });
    });

    it('should check RTL/LTR orientations', async () => {
        await alertPage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check example blocks visual regression', async () => {
            await alertPage.saveExampleBaselineScreenshot();
            await expect(await alertPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('should check custom alerts visual regression', async () => {
            const customAlertCount = await getElementArrayLength(openCustomAlertButton);

            for (let i = 0; customAlertCount > i; i++) {
                await click(openCustomAlertButton, i);
                await waitForPresent(popupAlert);
                await saveElementScreenshot(
                    popupAlert,
                    `alert-customPopup-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                    await alertPage.getScreenshotFolder()
                );
                await expect(
                    await checkElementScreenshot(
                        popupAlert,
                        `alert-customPopup-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                        await alertPage.getScreenshotFolder()
                    )
                ).toBeLessThan(5);
                await waitForInvisibilityOf(popupAlert);
            }
        }, 1);
    });

    async function checkPopupAlert(selector: string, count: number): Promise<void> {
        for (let i = 0; count > i; i++) {
            await click(selector, i);
            await expect(await waitForElDisplayed(popupAlert)).toBe(true);

            if ((await doesItExist(popupAlert + button)) === false) {
                await waitForNotDisplayed(popupAlert, 0, 12000);
                continue;
            }
            await click(popupAlert + button);
            // the pause gives the alert time to close before checking if it still exists
            await pause(750);
            await expect(await doesItExist(popupAlert)).toBe(false);
        }
    }
});
