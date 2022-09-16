import { BusyIndicatorPo } from './busy-indicator.po';
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
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { sizeL, sizeM, sizeS } from './busy-indicator-contents';

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

    beforeAll(() => {
        busyIndicatorPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(busyIndicatorPage.root);
        waitForElDisplayed(busyIndicatorPage.title);
    }, 1);

    it('Verify all Indicators on the page', () => {
        const smallIndicatorLength = getElementArrayLength(smallIndicator);
        const middleIndicatorLength = getElementArrayLength(middleIndicator);

        for (let i = 0; i < smallIndicatorLength; i++) {
            expect(isElementDisplayed(smallIndicator, i)).toBe(true);
        }
        for (let i = 0; i < middleIndicatorLength; i++) {
            expect(isElementDisplayed(middleIndicator, i)).toBe(true);
        }
        expect(isElementDisplayed(largeIndicator)).toBe(true);
    });

    it('Verify elements are interactable after clicking on disable button', () => {
        scrollIntoView(enableDisableButton);
        expect(isElementClickable(formName)).toBe(false);
        expect(isElementClickable(formSurname)).toBe(false);
        expect(isElementClickable(formPassword)).toBe(false);
        click(enableDisableButton);
        expect(isElementClickable(formName)).toBe(true);
        expect(isElementClickable(formSurname)).toBe(true);
        expect(isElementClickable(formPassword)).toBe(true);
    });

    it('Verify busy indicator appears after clicking on enable loading button', () => {
        scrollIntoView(enableDisableButton);
        click(enableDisableButton);
        addValue(formName, text);
        addValue(formSurname, text);
        addValue(formPassword, text);
        scrollIntoView(saveButton);
        click(saveButton);
        scrollIntoView(enableDisableButton);
        click(enableDisableButton);
        expect(isElementClickable(formName)).toBe(false);
        expect(isElementClickable(formSurname)).toBe(false);
        expect(isElementClickable(formPassword)).toBe(false);
        expect(isElementDisplayed(saveIndicator)).toBe(true);
        expect(isElementDisplayed(formIndicator)).toBe(true);
    });

    it('Verify busy indicator size has s', () => {
        // skipped in Safari due to getElementSize method works incorrect
        if (browserIsSafari()) {
            return;
        }
        expect(getElementSize(busyIndicator, 1)).toEqual(sizeS);
    });

    it('Verify busy indicator size has m', () => {
        if (browserIsSafari()) {
            return;
        }
        expect(getElementSize(busyIndicator, 2)).toEqual(sizeM);
    });

    it('Verify busy indicator size has l', () => {
        if (browserIsSafari()) {
            return;
        }
        expect(getElementSize(busyIndicator, 3)).toEqual(sizeL);
    });

    it('Verify that label present in Busy Indicator Label example', () => {
        scrollIntoView(busyIndicatorLabelExample);
        expect(isElementDisplayed(busyIndicatorLabelExample + busyIndicatorLabel)).toBe(true);
    });

    it('should check opening busy indicator in message toast by clicking button', () => {
        click(openBusyIndicatorButton);
        expect(isElementDisplayed(messageToast + busyIndicator)).toBe(true);
        click(hideBusyIndicatorButton);
    });

    it('should check that we can open few busy indicators in message toast', () => {
        click(openBusyIndicatorButton);
        click(openBusyIndicatorButton);
        click(openBusyIndicatorButton);
        expect(getElementArrayLength(messageToast + busyIndicator)).toBe(3);
        click(hideBusyIndicatorButton);
    });

    it('should check closing all busy indicators in message toast by clicking Hide All button', () => {
        click(openBusyIndicatorButton);
        click(openBusyIndicatorButton);
        click(hideAllButton);
        expect(doesItExist(messageToast + busyIndicator)).toBe(false);
        click(hideBusyIndicatorButton);
    });

    it('should check LTR and RTL', () => {
        busyIndicatorPage.checkRtlSwitch();
    });
});
