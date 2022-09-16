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

    beforeAll(() => {
        textPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(textPage.root);
        waitForElDisplayed(textPage.title);
    }, 2);

    describe('Check links More/Less', () => {
        it('should be clickable and display MORE/LESS text', () => {
            expect(getText(linksExpandable).toUpperCase()).toContain(testTextMore);
            click(linksExpandable);
            expect(getText(linksExpandable).toUpperCase()).toContain(testTextLess);

            expect(getText(linksExpandable, 1).toUpperCase()).toContain(testTextLess);
            click(linksExpandable, 1);
            expect(getText(linksExpandable, 1).toUpperCase()).toContain(testTextMore);

            expect(getText(linksExpandable, 2).toUpperCase()).toContain(testTextMoreLabel);
            click(linksExpandable, 2);
            expect(getText(linksExpandable, 2).toUpperCase()).toContain(testTextLessLabel);
        });
    });

    describe('Check Text Expandable example', () => {
        it('should check by clicking button "more" displayed more text', () => {
            scrollIntoView(linksExpandable);
            click(linksExpandable, 1);
            const linksLength = getElementArrayLength(linksExpandable);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(linksExpandable, i);
                const beforeSize = getElementSize(textExpandableExample + textParagraph, i);
                click(linksExpandable, i);
                const afterSize = getElementSize(textExpandableExample + textParagraph, i);
                expect(afterSize.height).toBeGreaterThan(beforeSize.height);
            }
        });
    });

    describe('Check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            textPage.checkRtlSwitch();
        });
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            textPage.saveExampleBaselineScreenshot();
            expect(textPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('verify paragraph example after click "MORE" link', () => {
            const paragraphTag = 'paragraph-0-';
            scrollIntoView(textParagraph, 10);
            click(linksExpandable);
            saveElementScreenshot(
                textParagraph,
                paragraphTag + getImageTagBrowserPlatform(),
                textPage.getScreenshotFolder(),
                10
            );
            expect(
                checkElementScreenshot(
                    textParagraph,
                    'paragraph-0-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(),
                    10
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify paragraph example after you click "LESS" link', () => {
            const paragraphTag = 'paragraph-1-';
            scrollIntoView(textParagraph, 11);
            click(linksExpandable, 1);
            saveElementScreenshot(
                textParagraph,
                paragraphTag + getImageTagBrowserPlatform(),
                textPage.getScreenshotFolder(),
                11
            );
            expect(
                checkElementScreenshot(
                    textParagraph,
                    'paragraph-1-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(),
                    11
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('verify paragraph example after click "MORE LABEL" link', () => {
            const paragraphTag = 'paragraph-2-';
            scrollIntoView(textParagraph, 12);
            click(linksExpandable, 2);
            saveElementScreenshot(
                textParagraph,
                paragraphTag + getImageTagBrowserPlatform(),
                textPage.getScreenshotFolder(),
                12
            );
            expect(
                checkElementScreenshot(
                    textParagraph,
                    'paragraph-2-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(),
                    12
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });
    });
});
