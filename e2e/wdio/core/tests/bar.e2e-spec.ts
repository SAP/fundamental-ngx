import { BarPo } from '../pages/bar.po';
import {
    addIsActiveClass,
    checkElementScreenshot, click,
    getElementArrayLength, isElementClickable,
    isElementDisplayed, mouseHoverElement,
    refreshPage, saveElementScreenshot,
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
import { leftArrowButton, saveCancelButton } from '../fixtures/appData/bar-contents';

describe('Bar test suite:', function() {
    const barPage: BarPo = new BarPo();
    const {
        arrowButtons, leftSections, saveCancelButtons, pictures,
        subMiddleSection, rightSections, middleSections,
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

    xdescribe('Check visual regression', function() {

        // skipped due to issue with example selector for this component
        xit('should check examples visual regression', () => {
            barPage.saveExampleBaselineScreenshot();
            expect(barPage.compareWithBaseline()).toBeLessThan(1);
        });

        xit('Check arrow button focus state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementFocusState(arrowButtons, leftArrowButtonExample + leftArrowButtonFocus + '-' + i, leftArrowButton, i);
            }
        });

        xit('Check Save and Cancel buttons focus state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementFocusState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonFocus + '-' + i, saveCancelButton, i);
            }
        });

        xit('Check arrow button active state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementActiveState(arrowButtons, leftArrowButtonExample + leftArrowButtonActive + '-' + i, leftArrowButton, i);
            }
        });

        xit('Check Save and Cancel buttons active state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementActiveState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonActive + '-' + i, saveCancelButton, i);
            }
        });

        xit('Check arrow button hover state', () => {
            const buttonsLength = getElementArrayLength(arrowButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(arrowButtons, i);
                checkElementHoverState(arrowButtons, leftArrowButtonExample + leftArrowButtonHover + '-' + i, leftArrowButton, i);
            }
        });

        xit('Check Save and Cancel buttons hover state', () => {
            const saveCancelButtonsLength = getElementArrayLength(saveCancelButtons);
            for (let i = 0; i < saveCancelButtonsLength; i++) {
                scrollIntoView(saveCancelButtons, i);
                checkElementHoverState(saveCancelButtons, saveCancelButtonExample + saveCancelButtonHover + '-' + i, saveCancelButton, i);
            }
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} button hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} button focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, barPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${elementName} button item ${index} active state mismatch`);
    }
});

