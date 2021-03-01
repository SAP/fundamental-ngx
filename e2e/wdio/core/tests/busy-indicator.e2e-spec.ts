import { BusyIndicatorPo } from '../pages/busy-indicator.po';
import {
    addIsActiveClass,
    addValue, checkElementScreenshot,
    click,
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    disableButtonActive,
    disableButtonExample,
    disableButtonFocus,
    disableButtonHover, enableLoadingButtonActive,
    enableLoadingButtonExample, enableLoadingButtonFocus, enableLoadingButtonHover,
    saveButtonActive,
    saveButtonExample,
    saveButtonFocus,
    saveButtonHover,
    indicatorBlockExample,
    indicatorBlockFocus
} from '../fixtures/testData/busy-indicator.tags';

describe('Busy Indicator test suite:', function() {
    const busyIndicatorPage: BusyIndicatorPo = new BusyIndicatorPo();
    const {
        formName, formSurname, formPassword, saveButton, enableDisableButton,
        saveIndicator, formIndicator, smallIndicator, middleIndicator, largeIndicator, componentExample, indicatorBlockWrapper
    } = busyIndicatorPage;
    const text = 'test';

    beforeAll(() => {
        busyIndicatorPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(smallIndicator);
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

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            busyIndicatorPage.saveExampleBaselineScreenshot('busy-indicator', componentExample);
            expect(busyIndicatorPage.compareWithBaseline('busy-indicator', componentExample)).toBeLessThan(1);
        });

        it('Check disable button hover state', () => {
            scrollIntoView(enableDisableButton);
            checkButtonHoverState(enableDisableButton, disableButtonExample + disableButtonHover + '-', 'disable-button');
        });

        it('Check disable button active state', () => {
            scrollIntoView(enableDisableButton);
            checkButtonActiveState(enableDisableButton, disableButtonExample + disableButtonActive + '-', 'disable-button');
        });

        it('Check disable button focus state', () => {
            scrollIntoView(enableDisableButton);
            checkButtonFocusState(enableDisableButton, disableButtonExample + disableButtonFocus + '-', 'disable-button');
        });

        it('Check save button hover state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkButtonHoverState(saveButton, saveButtonExample + saveButtonHover + '-', 'save-button');
        });

        it('Check save button active state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkButtonActiveState(saveButton, saveButtonExample + saveButtonActive + '-', 'save-button');
        });

        it('Check save button focus state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkButtonFocusState(saveButton, saveButtonExample + saveButtonFocus + '-', 'save-button');
        });

        it('Check enable loading button hover state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkButtonHoverState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonHover + '-', 'save-button');
        });

        it('Check enable loading button active state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkButtonActiveState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonActive + '-', 'save-button');
        });

        it('Check enable loading button focus state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkButtonFocusState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonFocus + '-', 'save-button');
        });

        it('Check indicator for block focus state', () => {
            scrollIntoView(enableDisableButton);
            checkButtonFocusState(indicatorBlockWrapper, indicatorBlockExample + indicatorBlockFocus + '-', 'indicator-block');
        });
    });
});

function checkButtonHoverState(selector: string, tag: string, btnName: string, index: number = 0): void {
    mouseHoverElement(selector, index);
    saveElementScreenshot(selector, tag);
    expect(checkElementScreenshot(selector, tag, {}, index))
        .toBeLessThan(2, `${btnName} button hover state mismatch`);
}

function checkButtonFocusState(selector: string, tag: string, btnName: string, index: number = 0): void {
    click(selector, index);
    saveElementScreenshot(selector, tag, {}, index);
    expect(checkElementScreenshot(selector, tag))
        .toBeLessThan(2, `${btnName} button focus state mismatch`);
}

function checkButtonActiveState(selector: string, tag: string, btnName: string, index: number = 0): void {
    addIsActiveClass(selector, index);
    saveElementScreenshot(selector, tag, {}, index);
    expect(checkElementScreenshot(selector, tag))
        .toBeLessThan(2, `${btnName} button item ${index} active state mismatch`);
}
