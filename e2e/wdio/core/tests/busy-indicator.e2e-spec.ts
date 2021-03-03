import { BusyIndicatorPo } from '../pages/busy-indicator.po';
import {
    addValue,
    click,
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
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
import { checkElementActiveState, checkElementFocusState, checkElementHoverState } from '../../helper/assertion-helper';

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
            checkElementHoverState(enableDisableButton, disableButtonExample + disableButtonHover + '-', 'disable-button');
        });

        it('Check disable button active state', () => {
            scrollIntoView(enableDisableButton);
            checkElementActiveState(enableDisableButton, disableButtonExample + disableButtonActive + '-', 'disable-button');
        });

        it('Check disable button focus state', () => {
            scrollIntoView(enableDisableButton);
            checkElementFocusState(enableDisableButton, disableButtonExample + disableButtonFocus + '-', 'disable-button');
        });

        it('Check save button hover state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkElementHoverState(saveButton, saveButtonExample + saveButtonHover + '-', 'save-button');
        });

        it('Check save button active state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkElementActiveState(saveButton, saveButtonExample + saveButtonActive + '-', 'save-button');
        });

        it('Check save button focus state', () => {
            scrollIntoView(saveButton);
            click(enableDisableButton);
            checkElementFocusState(saveButton, saveButtonExample + saveButtonFocus + '-', 'save-button');
        });

        it('Check enable loading button hover state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkElementHoverState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonHover + '-', 'save-button');
        });

        it('Check enable loading button active state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkElementActiveState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonActive + '-', 'save-button');
        });

        it('Check enable loading button focus state', () => {
            scrollIntoView(enableDisableButton);
            click(enableDisableButton);
            checkElementFocusState(enableDisableButton, enableLoadingButtonExample + enableLoadingButtonFocus + '-', 'save-button');
        });

        it('Check indicator for block focus state', () => {
            scrollIntoView(enableDisableButton);
            checkElementFocusState(indicatorBlockWrapper, indicatorBlockExample + indicatorBlockFocus + '-', 'indicator-block');
        });
    });
});
