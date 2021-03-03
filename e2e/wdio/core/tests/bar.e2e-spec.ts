import { BarPo } from '../pages/bar.po';
import {
    getElementArrayLength, isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    leftArrowButtonActive,
    leftArrowButtonExample, leftArrowButtonFocus,
    leftArrowButtonHover, saveCancelButtonActive,
    saveCancelButtonExample, saveCancelButtonFocus,
    saveCancelButtonHover
} from '../fixtures/testData/bar.tags';
import { checkElementActiveState, checkElementFocusState, checkElementHoverState } from '../../helper/assertion-helper';
import { leftArrowButton, saveCancelButton } from '../fixtures/appData/bar-contents';

describe('Bar test suite:', function() {
    const barPage: BarPo = new BarPo();
    const {
        arrowButtons, leftSections, saveCancelButtons, pictures,
        subMiddleSection, rightSections, middleSections, componentExample
    } = barPage;

    beforeAll(() => {
        barPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(arrowButtons);
    }, 1);

    it('Verify arrow buttons are clickable', () => {
        const buttonsLength = getElementArrayLength(arrowButtons);
        for (let i = 0; i < buttonsLength; i++) {
            scrollIntoView(arrowButtons, i);
            expect(isElementClickable(arrowButtons, i)).toBe(true);
        }
    });


    it('Verify bar contains 3 header sections', () => {
        const leftBarSectionLength = getElementArrayLength(leftSections);
        const checkRightSections = getElementArrayLength(rightSections);
        const middleBarSectionLength = getElementArrayLength(middleSections);

        for (let i = 0; i < leftBarSectionLength; i++) {
            expect(isElementDisplayed(leftSections, i)).toBe(true);
        }

        for (let i = 0; i < middleBarSectionLength; i++) {
            expect(isElementDisplayed(middleSections, i)).toBe(true);
        }

        for (let i = 0; i < checkRightSections; i++) {
            expect(isElementDisplayed(rightSections, i)).toBe(true);
        }
    });

    it('Verify images is displayed for right sections', () => {
        const picturesLength = getElementArrayLength(pictures);
        for (let i = 0; i < picturesLength; i++) {
            expect(isElementDisplayed(pictures, i)).toBe(true);
        }
    });

    it('Verify bar contain sub middle section', () => {
        expect(isElementDisplayed(subMiddleSection)).toBe(true);
    });

    it('Verify save and cancel buttons are clickable', () => {
        const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
        for (let i = 0; i < saveCancelButtonsLength; i++) {
            scrollIntoView(saveCancelButtons, i);
            expect(isElementClickable(saveCancelButtons, i)).toBe(true);
        }
    });

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            barPage.saveExampleBaselineScreenshot('bar', componentExample);
            expect(barPage.compareWithBaseline('bar', componentExample)).toBeLessThan(1);
        });

        it('Check arrow button focus state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementFocusState(arrowButtons, leftArrowButtonExample + leftArrowButtonFocus + '-' + i, leftArrowButton, i);
            }
        });

        it('Check Save and Cancel buttons focus state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementFocusState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonFocus + '-' + i, saveCancelButton, i);
            }
        });

        it('Check arrow button active state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementActiveState(arrowButtons, leftArrowButtonExample + leftArrowButtonActive + '-' + i, leftArrowButton, i);
            }
        });

        it('Check Save and Cancel buttons active state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementActiveState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonActive + '-' + i, saveCancelButton, i);
            }
        });

        it('Check arrow button hover state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementHoverState(arrowButtons, leftArrowButtonExample + leftArrowButtonHover + '-' + i, leftArrowButton, i);
            }
        });

        it('Check Save and Cancel buttons hover state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementHoverState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonHover + '-' + i, saveCancelButton, i);
            }
        });
    });
});

