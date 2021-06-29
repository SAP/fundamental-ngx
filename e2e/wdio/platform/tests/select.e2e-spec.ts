import { SelectPo } from '../pages/select.po';
import {
    click, getAttributeByName, getElementArrayLength,
    getText, isElementClickable,
    refreshPage, scrollIntoView
} from '../../driver/wdio';
import {
    disableSelectModeValueTestText, maxHeightTestText, mobileExampleTestText,
    selectWithTwoColumnsTestText,
    testTextValue, testTextValue6, testTextValue7, titleTestText
} from '../fixtures/appData/select-contents';

describe('Select test suite', function() {
    const selectPage = new SelectPo();
    const {
        selectModeExample, displayText, buttons, options, selectedValue_1, selectWithTwoColumnsExample,
        selectedValue_2, selectSemanticStateExample, selectSemanticStateOption, customControlContentExample,
        selectMobileExample, mobileCloseButton, mobileTitle, selectMaxHeightExample, selectNoneExample,
        selectNowrapExample, selectInReactiveForms
    } = selectPage;

    beforeAll(() => {
        selectPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    describe('Check Select Modes example', function() {

        it('should be able to select the option for default select', () => {
            checkOptions(selectModeExample, 2);
            expect(getText(selectedValue_1)).toBe(testTextValue);
        });

        it('should be able to select the option for compact select', () => {
            const textBefore = getText(selectModeExample + displayText, 1);
            click(selectModeExample + buttons, 1);
            click(options(7));
            const textAfter = getText(selectModeExample + displayText, 1);
            expect(textBefore).not.toEqual(textAfter);
            expect(getText(selectedValue_1, 1)).toBe(testTextValue);
        });

        it('verify select in disabled mode', () => {
            expect(getAttributeByName(selectModeExample + displayText, 'aria-disabled', 2)).toBe('true');
            expect(getText(selectedValue_1, 2)).toBe(disableSelectModeValueTestText);
        });
    });

    describe('Check Select with Two Columns example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectWithTwoColumnsExample, 22);
            expect(getText(selectedValue_2)).toBe(selectWithTwoColumnsTestText);
        });
    });

    describe('Check Select Semantic States example', function() {

        it('should be able to select the option', () => {
            const selectLength = getElementArrayLength(selectSemanticStateExample + buttons);
            for (let i = 0; i < selectLength; i++) {
                const textBefore = getText(selectSemanticStateExample + displayText, i);
                click(selectSemanticStateExample + buttons, i);
                click(selectSemanticStateOption, 7);
                const textAfter = getText(selectSemanticStateExample + displayText, i);
                expect(textBefore).not.toEqual(textAfter);
            }
        });
    });

    describe('Check Custom Control Content With AutoResize example', function() {

        it('should be able to select the option', () => {
            checkOptions(customControlContentExample, 48);
        });
    });

    describe('Check Select In Mobile Mode example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectMobileExample, 59);
            expect(getText(selectedValue_2, 1)).toBe(mobileExampleTestText);
        });

        it('verify title and close button is clickable', () => {
            scrollIntoView(selectMobileExample + buttons);
            click(selectMobileExample + buttons);

            expect(getText(mobileTitle)).toBe(titleTestText);
            expect(isElementClickable(mobileCloseButton)).toBe(true, 'close button not clickable');
        });
    });

    describe('Check Select Max Height example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectMaxHeightExample, 64);
            expect(getText(selectedValue_1, 4)).toBe(maxHeightTestText);
        });
    });

    describe('Check No Value Select example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectNoneExample, 90);
            expect(getText(selectedValue_1, 5)).toBe(maxHeightTestText);
        });
    });

    describe('Check Do not Wrap the Options example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectNowrapExample, 95);
            expect(getText(selectedValue_1, 6)).toBe(maxHeightTestText);
        });
    });

    describe('Check Select In A Reactive Form example', function() {

        it('should be able to select the option', () => {
            checkOptions(selectInReactiveForms, 98);
            expect(getText(selectedValue_2, 2)).toBe(testTextValue6);
            expect(getText(selectedValue_2, 3)).toBe(testTextValue7);
        });
    });

    describe('Check orientation', function() {

        it('should check RTL and LTR', () => {
            selectPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            selectPage.saveExampleBaselineScreenshot();
            expect(selectPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkOptions(selector: string, id: number, index: number = 0): void {
        const textBefore = getText(selector + displayText);
        click(selector + buttons);
        click(options(id));
        const textAfter = getText(selector + displayText);
        expect(textBefore).not.toEqual(textAfter);
    }
});

