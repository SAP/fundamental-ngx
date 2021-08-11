import { TextPo } from '../pages/text.po';
import {
    checkElementScreenshot,
    click,
    getImageTagBrowserPlatform,
    getText,
    refreshPage,
    saveElementScreenshot, scrollIntoView
} from '../../driver/wdio';

import { testTextMore, testTextLess, testTextMoreLabel, testTextLessLabel } from '../fixtures/appData/text-contents';

describe('Text component test', function() {
    const textPage = new TextPo();
    const { linksExpandable, textParagraph } = textPage;

    beforeAll(() => {
        textPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    describe('Check links More/Less', function() {
        it('should be clickable and display MORE/LESS text', () => {
            expect(getText(linksExpandable)).toContain(testTextMore);
            click(linksExpandable);
            expect(getText(linksExpandable)).toContain(testTextLess);

            expect(getText(linksExpandable, 1)).toContain(testTextLess);
            click(linksExpandable, 1);
            expect(getText(linksExpandable, 1)).toContain(testTextMore);

            expect(getText(linksExpandable, 2)).toContain(testTextMoreLabel);
            click(linksExpandable, 2);
            expect(getText(linksExpandable, 2)).toContain(testTextLessLabel);
        });

        describe('Check orientation', function() {

            it('should check RTL and LTR orientation', () => {
                textPage.checkRtlSwitch();
            });
        });

        xdescribe('Should check visual regression', function() {

            it('should check visual regression for all examples', () => {
                textPage.saveExampleBaselineScreenshot();
                expect(textPage.compareWithBaseline()).toBeLessThan(5);
            });

            it('verify paragraph example after click "MORE" link', () => {
                const paragraphTag = 'paragraph-0-';
                scrollIntoView(textParagraph, 10);
                click(linksExpandable);
                saveElementScreenshot(textParagraph, paragraphTag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), 10);
                expect(checkElementScreenshot(textParagraph, 'paragraph-0-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(), 10)).toBeLessThan(5, `element item state mismatch`);
            });

            it('verify paragraph example after you click "LESS" link', () => {
                const paragraphTag = 'paragraph-1-';
                scrollIntoView(textParagraph, 11);
                click(linksExpandable, 1);
                saveElementScreenshot(textParagraph, paragraphTag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), 11);
                expect(checkElementScreenshot(textParagraph, 'paragraph-1-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(), 11)).toBeLessThan(5, `element item state mismatch`);
            });

            it('verify paragraph example after click "MORE LABEL" link', () => {
                const paragraphTag = 'paragraph-2-';
                scrollIntoView(textParagraph, 12);
                click(linksExpandable, 2);
                saveElementScreenshot(textParagraph, paragraphTag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), 12);
                expect(checkElementScreenshot(textParagraph, 'paragraph-2-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(), 12)).toBeLessThan(5, `element item state mismatch`);
            });
        });
    });
});
