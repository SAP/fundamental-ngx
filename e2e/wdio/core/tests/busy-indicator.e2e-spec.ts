import { BusyIndicatorPo } from '../pages/busy-indicator.po';
import {
    addValue,
    click,
    getElementArrayLength, isElementClickable, isElementDisplayed, refreshPage, scrollIntoView, waitForPresent
} from '../../driver/wdio';

describe('Busy Indicator test suite:', function() {
    const busyIndicatorPage: BusyIndicatorPo = new BusyIndicatorPo();
    const {disableButton, formName, formSurname, formPassword, saveButton, enableLoadButton,
        saveIndicator, formIndicator, smallIndicator, middleIndicator, largeIndicator, componentExample} = busyIndicatorPage;
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
        scrollIntoView(disableButton);
        expect(isElementClickable(formName)).toBe(false);
        expect(isElementClickable(formSurname)).toBe(false);
        expect(isElementClickable(formPassword)).toBe(false);
        click(disableButton);
        expect(isElementClickable(formName)).toBe(true);
        expect(isElementClickable(formSurname)).toBe(true);
        expect(isElementClickable(formPassword)).toBe(true);

    });

    it('Verify busy indicator appears after clicking on enable loading button', () => {
        scrollIntoView(disableButton);
        click(disableButton);
        addValue(formName, text);
        addValue(formSurname, text);
        addValue(formPassword, text);
        scrollIntoView(saveButton);
        click(saveButton);
        scrollIntoView(enableLoadButton);
        click(enableLoadButton);

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
    });
});
