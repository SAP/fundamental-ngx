import { BarPo } from '../pages/bar.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click,
    getElementArrayLength, isElementClickable,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
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

    it('Check arrow button focus state', () => {
        const buttonsLength = getElementArrayLength(arrowButtons);
        for (let i = 0; i < buttonsLength; i++) {
            scrollIntoView(arrowButtons, i);
            checkButtonFocusState(arrowButtons, leftArrowButtonExample + leftArrowButtonFocus + '-' + i, 'left-arrow-button', i);
        }
    });

    it('Check Save and Cancel buttons focus state', () => {
        const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
        for (let i = 0; i < saveCancelButtonsLength; i++) {
            scrollIntoView(saveCancelButtons, i);
            checkButtonFocusState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonFocus + '-' + i, 'save-cancel-button', i);
        }
    });


    it('Check arrow button active state', () => {
        const buttonsLength = getElementArrayLength(arrowButtons);
        for (let i = 0; i < buttonsLength; i++) {
            scrollIntoView(arrowButtons, i);
            checkButtonActiveState(arrowButtons, leftArrowButtonExample + leftArrowButtonActive + '-' + i, 'left-arrow-button', i);
        }
    });

    it('Check Save and Cancel buttons active state', () => {
        const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
        for (let i = 0; i < saveCancelButtonsLength; i++) {
            scrollIntoView(saveCancelButtons, i);
            checkButtonActiveState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonActive + '-' + i, 'save-cancel-button', i);
        }
    });

    it('Check arrow button hover state', () => {
        const buttonsLength = getElementArrayLength(arrowButtons);
        for (let i = 0; i < buttonsLength; i++) {
            scrollIntoView(arrowButtons, i);
            checkButtonHoverState(arrowButtons, leftArrowButtonExample + leftArrowButtonHover + '-' + i, 'left-arrow-button', i);
        }
    });

    it('Check Save and Cancel buttons hover state', () => {
        const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
        for (let i = 0; i < saveCancelButtonsLength; i++) {
            scrollIntoView(saveCancelButtons, i);
            checkButtonHoverState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonHover + '-' + i, 'save-cancel-button', i);
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
