import { BarPo } from './bar.po';
import {
    checkElementScreenshot,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Bar test suite:', () => {
    const barPage: BarPo = new BarPo();
    const { arrowButtons, leftSections, saveCancelButtons, pictures, subMiddleSection, rightSections, middleSections } =
        barPage;

    beforeAll(() => {
        barPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(barPage.root);
        waitForElDisplayed(barPage.title);
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

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            const exampleCount = getElementArrayLength(barPage.exampleAreaContainersArr);
            for (let i = 0; i < exampleCount; i++) {
                // not working for floating footer example (index 5)
                if (i !== 5) {
                    scrollIntoView(barPage.exampleAreaContainersArr, i);
                    saveElementScreenshot(
                        barPage.exampleAreaContainersArr,
                        `bar-example-${i}-core-${getImageTagBrowserPlatform()}`,
                        barPage.getScreenshotFolder(),
                        i
                    );
                    expect(
                        checkElementScreenshot(
                            barPage.exampleAreaContainersArr,
                            `bar-example-${i}-core-${getImageTagBrowserPlatform()}`,
                            barPage.getScreenshotFolder(),
                            i
                        )
                    ).toBeLessThan(5);
                }
            }
        });
    });
});
