import { SelectPo } from './select.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    disableSelectModeValueTestText,
    inputStateArr,
    maxHeightTestText,
    mobileExampleTestText,
    selectWithTwoColumnsTestText,
    testTextValue,
    testTextValue6,
    testTextValue7,
    titleTestText
} from './select-contents';

describe('Select test suite', () => {
    const selectPage = new SelectPo();
    const {
        selectModeExample,
        displayText,
        select,
        buttons,
        options,
        selectedValue_1,
        selectWithTwoColumnsExample,
        selectedValue_2,
        selectSemanticStateExample,
        selectSemanticStateOption,
        customControlContentExample,
        selectMobileExample,
        mobileCloseButton,
        mobileTitle,
        selectMaxHeightExample,
        selectNoneExample,
        selectNowrapExample,
        selectInReactiveForms,
        inputControl
    } = selectPage;

    beforeAll(() => {
        selectPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(selectPage.root);
        waitForElDisplayed(selectPage.title);
    }, 2);

    describe('Check Select Modes example', () => {
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

        it('verify select in read only mode', () => {
            expect(getAttributeByName(selectModeExample + displayText, 'aria-readonly', 3)).toBe('true');
        });

        it('should check compact select be smaller than basic select', () => {
            const basicInput = getElementSize(selectModeExample + displayText);
            const compactInput = getElementSize(selectModeExample + displayText, 1);

            expect(basicInput.height).toBeGreaterThan(compactInput.height);
        });
    });

    describe('Check Select with Two Columns example', () => {
        it('should be able to select the option', () => {
            checkOptions(selectWithTwoColumnsExample, 22);
            expect(getText(selectedValue_2)).toBe(selectWithTwoColumnsTestText);
        });
    });

    describe('Check Select Semantic States example', () => {
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

        it('should check input states', () => {
            scrollIntoView(selectSemanticStateExample);
            const inputLength = getElementArrayLength(selectSemanticStateExample + inputControl);
            for (let i = 0; i < inputLength; i++) {
                expect(getElementClass(selectSemanticStateExample + inputControl, i)).toContain(inputStateArr[i]);
            }
        });
    });

    describe('Check Custom Control Content With AutoResize example', () => {
        it('should be able to select the option', () => {
            checkOptions(customControlContentExample, 48);
        });

        it('should check changing width of select after selection', () => {
            const defaultSelectWidth = getElementSize(customControlContentExample + select, 0, 'width');

            checkOptions(customControlContentExample, 48);
            const newSelectWidth = getElementSize(customControlContentExample + select, 0, 'width');
            expect(newSelectWidth).toBeGreaterThan(defaultSelectWidth);
        });
    });

    describe('Check Select In Mobile Mode example', () => {
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

    describe('Check Select Max Height example', () => {
        it('should be able to select the option', () => {
            checkOptions(selectMaxHeightExample, 64);
            expect(getText(selectedValue_1, 4)).toBe(maxHeightTestText);
        });
    });

    describe('Check No Value Select example', () => {
        it('should be able to select the option', () => {
            checkOptions(selectNoneExample, 90);
            expect(getText(selectedValue_1, 5)).toBe(maxHeightTestText);
        });
    });

    describe('Check Do not Wrap the Options example', () => {
        it('should be able to select the option', () => {
            checkOptions(selectNowrapExample, 95);
            expect(getText(selectedValue_1, 6)).toBe(maxHeightTestText);
        });
    });

    describe('Check Select In A Reactive Form example', () => {
        it('should be able to select the option', () => {
            checkOptions(selectInReactiveForms, 98);
            expect(getText(selectedValue_2, 2)).toBe(testTextValue6);
            expect(getText(selectedValue_2, 3)).toBe(testTextValue7);
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR', () => {
            selectPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            selectPage.saveExampleBaselineScreenshot();
            expect(selectPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkOptions(selector: string, id: number): void {
        const textBefore = getText(selector + displayText);
        click(selector + buttons);
        click(options(id));
        const textAfter = getText(selector + displayText);
        expect(textBefore).not.toEqual(textAfter);
    }
});
