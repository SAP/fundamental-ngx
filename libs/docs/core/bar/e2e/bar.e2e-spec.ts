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

    beforeAll(async () => {
        await barPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(barPage.root);
        await waitForElDisplayed(barPage.title);
    }, 1);

    it('Verify arrow buttons are clickable', async () => {
        const buttonsLength = await getElementArrayLength(arrowButtons);
        for (let i = 0; i < buttonsLength; i++) {
            await scrollIntoView(arrowButtons, i);
            await expect(await isElementClickable(arrowButtons, i)).toBe(true);
        }
    });

    it('Verify bar contains 3 header sections', async () => {
        const leftBarSectionLength = await getElementArrayLength(leftSections);
        const checkRightSections = await getElementArrayLength(rightSections);
        const middleBarSectionLength = await getElementArrayLength(middleSections);

        for (let i = 0; i < leftBarSectionLength; i++) {
            await expect(await isElementDisplayed(leftSections, i)).toBe(true);
        }

        for (let i = 0; i < middleBarSectionLength; i++) {
            await expect(await isElementDisplayed(middleSections, i)).toBe(true);
        }

        for (let i = 0; i < checkRightSections; i++) {
            await expect(await isElementDisplayed(rightSections, i)).toBe(true);
        }
    });

    it('Verify images is displayed for right sections', async () => {
        const picturesLength = await getElementArrayLength(pictures);
        for (let i = 0; i < picturesLength; i++) {
            await expect(await isElementDisplayed(pictures, i)).toBe(true);
        }
    });

    it('Verify bar contain sub middle section', async () => {
        await expect(await isElementDisplayed(subMiddleSection)).toBe(true);
    });

    it('Verify save and cancel buttons are clickable', async () => {
        const saveCancelButtonsLength = await getElementArrayLength(saveCancelButtons);
        for (let i = 0; i < saveCancelButtonsLength; i++) {
            await scrollIntoView(saveCancelButtons, i);
            await expect(await isElementClickable(saveCancelButtons, i)).toBe(true);
        }
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            const exampleCount = await getElementArrayLength(barPage.exampleAreaContainersArr);
            for (let i = 0; i < exampleCount; i++) {
                // not working for floating footer example (index 5)
                if (i !== 5) {
                    await scrollIntoView(barPage.exampleAreaContainersArr, i);
                    await saveElementScreenshot(
                        barPage.exampleAreaContainersArr,
                        `bar-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                        await barPage.getScreenshotFolder(),
                        i
                    );
                    await expect(
                        await checkElementScreenshot(
                            barPage.exampleAreaContainersArr,
                            `bar-example-${i}-core-${await getImageTagBrowserPlatform()}`,
                            await barPage.getScreenshotFolder(),
                            i
                        )
                    ).toBeLessThan(5);
                }
            }
        });
    });
});
