import { SplitterPo } from './spltiller.po';
import {
    browserIsFirefox,
    browserIsSafari,
    click,
    clickAndMoveElement,
    getElementArrayLength,
    getElementSize,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Standard List test suite', () => {
    const splitterPage = new SplitterPo();
    const { basicExample, splitterSection, requiredWidthExample, sliderApiExample, button, resizer, paginationItem } =
        splitterPage;

    beforeAll(async () => {
        await splitterPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(splitterPage.root);
        await waitForElDisplayed(splitterPage.title);
    }, 1);

    describe('Basic example', () => {
        it('should check horizontal resizing', async () => {
            await checkHorizontalResize(basicExample);
        });

        it('should check resizing vertical nested sections', async () => {
            // FF and Safari skipped due to dragAndDrop does not work there
            if ((await browserIsFirefox()) || (await browserIsSafari())) {
                return;
            }
            await scrollIntoView(basicExample + splitterSection);
            const firstNestedSectionHeight = await (await getElementSize(basicExample + splitterSection, 5)).height;
            await clickAndMoveElement(basicExample + resizer, 0, -50, 3);

            await expect(await (await getElementSize(basicExample + splitterSection, 5)).height).not.toEqual(
                firstNestedSectionHeight,
                'height of section is not changed after resizing'
            );
        });
    });

    describe('Required parent width example', () => {
        it('should check resizing', async () => {
            await checkHorizontalResize(requiredWidthExample);
        });
    });

    describe('Slider API example', () => {
        it('should check horizontal resizing', async () => {
            await checkHorizontalResize(sliderApiExample);
        });

        it('should check hiding sections by buttons', async () => {
            await click(sliderApiExample + button);
            await expect(await getElementArrayLength(sliderApiExample + splitterSection)).toBe(
                2,
                'section is not hidden'
            );

            await click(paginationItem, 1);
            await expect(await getElementArrayLength(sliderApiExample + splitterSection)).toBe(
                1,
                'section is not hidden'
            );

            await click(paginationItem, 0);
            await expect(await getElementArrayLength(sliderApiExample + splitterSection)).toBe(
                2,
                'section is not displayed back'
            );

            await click(sliderApiExample + button, 1);
            await expect(await getElementArrayLength(sliderApiExample + splitterSection)).toBe(
                3,
                'section is not displayed back'
            );
        });
    });

    async function checkHorizontalResize(section: string): Promise<void> {
        // FF and Safari skipped due to dragAndDrop does not work there
        if ((await browserIsFirefox()) || (await browserIsSafari())) {
            return;
        }
        await scrollIntoView(section + splitterSection);
        const startingFirstColumnWidth = await (await getElementSize(section + splitterSection, 0)).width;
        const startingSecondColumnWidth = await (await getElementSize(section + splitterSection, 1)).width;
        const startingThirdColumnWidth = await (await getElementSize(section + splitterSection, 2)).width;

        await clickAndMoveElement(section + resizer, -200, 0);
        await clickAndMoveElement(section + resizer, 200, 0, 1);

        await expect(await (await getElementSize(section + splitterSection, 0)).width).not.toEqual(
            startingFirstColumnWidth
        );
        await expect(await (await getElementSize(section + splitterSection, 1)).width).not.toEqual(
            startingSecondColumnWidth
        );
        await expect(await (await getElementSize(section + splitterSection, 2)).width).not.toEqual(
            startingThirdColumnWidth
        );
    }
});
