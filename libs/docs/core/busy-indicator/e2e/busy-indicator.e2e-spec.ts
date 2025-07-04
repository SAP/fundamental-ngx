import {
    addValue,
    browserIsSafari,
    click,
    doesItExist,
    getElementArrayLength,
    getElementSize,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { sizeL, sizeM, sizeS } from './busy-indicator-contents';
import { BusyIndicatorPo } from './busy-indicator.po';

describe('Busy Indicator test suite:', () => {
    const busyIndicatorPage: BusyIndicatorPo = new BusyIndicatorPo();
    const {
        formName,
        formSurname,
        formPassword,
        saveButton,
        enableDisableButton,
        saveIndicator,
        formIndicator,
        smallIndicator,
        middleIndicator,
        largeIndicator,
        busyIndicator,
        busyIndicatorLabel,
        busyIndicatorLabelExample,
        messageToast,
        openBusyIndicatorButton,
        hideBusyIndicatorButton,
        hideAllButton
    } = busyIndicatorPage;
    const text = 'test';

    beforeAll(async () => {
        await busyIndicatorPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await busyIndicatorPage.waitForRoot();
        await waitForElDisplayed(busyIndicatorPage.title);
    }, 1);

    it('Verify all Indicators on the page', async () => {
        const smallIndicatorLength = await getElementArrayLength(smallIndicator);
        const middleIndicatorLength = await getElementArrayLength(middleIndicator);

        for (let i = 0; i < smallIndicatorLength; i++) {
            await expect(await isElementDisplayed(smallIndicator, i)).withContext(true);
        }
        for (let i = 0; i < middleIndicatorLength; i++) {
            await expect(await isElementDisplayed(middleIndicator, i)).withContext(true);
        }
        await expect(await isElementDisplayed(largeIndicator)).withContext(true);
    });

    it('Verify elements are interactable after clicking on disable button', async () => {
        await scrollIntoView(enableDisableButton);
        await expect(await isElementClickable(formName)).withContext(false);
        await expect(await isElementClickable(formSurname)).withContext(false);
        await expect(await isElementClickable(formPassword)).withContext(false);
        await click(enableDisableButton);
        await expect(await isElementClickable(formName)).withContext(true);
        await expect(await isElementClickable(formSurname)).withContext(true);
        await expect(await isElementClickable(formPassword)).withContext(true);
    });

    it('Verify busy indicator appears after clicking on enable loading button', async () => {
        await scrollIntoView(enableDisableButton);
        await click(enableDisableButton);
        await addValue(formName, text);
        await addValue(formSurname, text);
        await addValue(formPassword, text);
        await scrollIntoView(saveButton);
        await click(saveButton);
        await scrollIntoView(enableDisableButton);
        await click(enableDisableButton);
        await expect(await isElementClickable(formName)).withContext(false);
        await expect(await isElementClickable(formSurname)).withContext(false);
        await expect(await isElementClickable(formPassword)).withContext(false);
        await expect(await isElementDisplayed(saveIndicator)).withContext(true);
        await expect(await isElementDisplayed(formIndicator)).withContext(true);
    });

    it('Verify busy indicator size has s', async () => {
        // skipped in Safari due to getElementSize method works incorrect
        if (await browserIsSafari()) {
            return;
        }
        await expect(await getElementSize(busyIndicator, 1)).toEqual(sizeS);
    });

    it('Verify busy indicator size has m', async () => {
        if (await browserIsSafari()) {
            return;
        }
        await expect(await getElementSize(busyIndicator, 2)).toEqual(sizeM);
    });

    it('Verify busy indicator size has l', async () => {
        if (await browserIsSafari()) {
            return;
        }
        await expect(await getElementSize(busyIndicator, 3)).toEqual(sizeL);
    });

    it('Verify that label present in Busy Indicator Label example', async () => {
        await scrollIntoView(busyIndicatorLabelExample);
        await expect(await isElementDisplayed(busyIndicatorLabelExample + busyIndicatorLabel)).withContext(true);
    });

    it('should check opening busy indicator in message toast by clicking button', async () => {
        await click(openBusyIndicatorButton);
        await expect(await isElementDisplayed(messageToast + busyIndicator)).withContext(true);
        await click(hideBusyIndicatorButton);
    });

    it('should check that we can open few busy indicators in message toast', async () => {
        await click(openBusyIndicatorButton);
        await click(openBusyIndicatorButton);
        await click(openBusyIndicatorButton);
        await expect(await getElementArrayLength(messageToast + busyIndicator)).withContext(3);
        await click(hideBusyIndicatorButton);
    });

    it('should check closing all busy indicators in message toast by clicking Hide All button', async () => {
        await click(openBusyIndicatorButton);
        await click(openBusyIndicatorButton);
        await click(hideAllButton);
        await expect(await doesItExist(messageToast + busyIndicator)).withContext(false);
        await click(hideBusyIndicatorButton);
    });

    it('should check LTR and RTL', async () => {
        await busyIndicatorPage.checkRtlSwitch();
    });
});
