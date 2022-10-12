import { TextPo } from './text.po';
import {
    checkElementScreenshot,
    click,
    getElementArrayLength,
    getElementSize,
    getImageTagBrowserPlatform,
    getText,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { testTextLess, testTextLessLabel, testTextMore, testTextMoreLabel } from './text-contents';

describe('Text component test', () => {
    const textPage = new TextPo();
    const { linksExpandable, textParagraph, textExpandableExample } = textPage;

    beforeAll(async () => {
        await textPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(textPage.root);
        await waitForElDisplayed(textPage.title);
    }, 2);

    describe('Check links More/Less', () => {
        it('should be clickable and display MORE/LESS text', async () => {
            await expect((await getText(linksExpandable)).toUpperCase()).toContain(testTextMore);
            await click(linksExpandable);
            await expect((await getText(linksExpandable)).toUpperCase()).toContain(testTextLess);

            await expect((await getText(linksExpandable, 1)).toUpperCase()).toContain(testTextLess);
            await click(linksExpandable, 1);
            await expect((await getText(linksExpandable, 1)).toUpperCase()).toContain(testTextMore);

            await expect((await getText(linksExpandable, 2)).toUpperCase()).toContain(testTextMoreLabel);
            await click(linksExpandable, 2);
            await expect((await getText(linksExpandable, 2)).toUpperCase()).toContain(testTextLessLabel);
        });
    });

    describe('Check Text Expandable example', () => {
        it('should check by clicking button "more" displayed more text', async () => {
            await scrollIntoView(linksExpandable);
            await click(linksExpandable, 1);
            const linksLength = await getElementArrayLength(linksExpandable);
            for (let i = 0; i < linksLength; i++) {
                await scrollIntoView(linksExpandable, i);
                const beforeSize = await getElementSize(textExpandableExample + textParagraph, i);
                await click(linksExpandable, i);
                const afterSize = await getElementSize(textExpandableExample + textParagraph, i);
                await expect(afterSize.height).toBeGreaterThan(beforeSize.height);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await textPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await textPage.saveExampleBaselineScreenshot();
            await expect(await textPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('verify paragraph example after click "MORE" link', async () => {
            const paragraphTag = 'paragraph-0-';
            await scrollIntoView(textParagraph, 10);
            await click(linksExpandable);
            await saveElementScreenshot(
                textParagraph,
                paragraphTag + (await getImageTagBrowserPlatform()),
                await textPage.getScreenshotFolder(),
                10
            );
            await expect(
                await checkElementScreenshot(
                    textParagraph,
                    'paragraph-0-' + (await getImageTagBrowserPlatform()),
                    await textPage.getScreenshotFolder(),
                    10
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify paragraph example after you click "LESS" link', async () => {
            const paragraphTag = 'paragraph-1-';
            await scrollIntoView(textParagraph, 11);
            await click(linksExpandable, 1);
            await saveElementScreenshot(
                textParagraph,
                paragraphTag + (await getImageTagBrowserPlatform()),
                await textPage.getScreenshotFolder(),
                11
            );
            await expect(
                await checkElementScreenshot(
                    textParagraph,
                    'paragraph-1-' + (await getImageTagBrowserPlatform()),
                    await textPage.getScreenshotFolder(),
                    11
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify paragraph example after click "MORE LABEL" link', async () => {
            const paragraphTag = 'paragraph-2-';
            await scrollIntoView(textParagraph, 12);
            await click(linksExpandable, 2);
            await saveElementScreenshot(
                textParagraph,
                paragraphTag + (await getImageTagBrowserPlatform()),
                await textPage.getScreenshotFolder(),
                12
            );
            await expect(
                await checkElementScreenshot(
                    textParagraph,
                    'paragraph-2-' + (await getImageTagBrowserPlatform()),
                    await textPage.getScreenshotFolder(),
                    12
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });
    });
});
