import { TextPo } from '../pages/text.po';
import {
    checkElementScreenshot,
    click,
    getImageTagBrowserPlatform,
    getText,
    refreshPage,
    saveElementScreenshot, scrollIntoView
} from '../../driver/wdio';

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
            expect(getText(linksExpandable)).toContain('MORE');
            click(linksExpandable);
            expect(getText(linksExpandable)).toContain('LESS');

            expect(getText(linksExpandable, 1)).toContain('LESS');
            click(linksExpandable, 1);
            expect(getText(linksExpandable, 1)).toContain('MORE');

            expect(getText(linksExpandable, 2)).toContain('MORE LABEL');
            click(linksExpandable, 2);
            expect(getText(linksExpandable, 2)).toContain('LESS LABEL');
        });

        describe('Check orientation', function() {

            it('should check RTL and LTR orientation', () => {
                textPage.checkRtlSwitch();
            });
        });

        describe('Should check visual regression', function() {

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
                    textPage.getScreenshotFolder(), 10)).toBeLessThan(5, `element item hover state mismatch`);
            });

            it('verify paragraph example after you click "LESS" link', () => {
                const paragraphTag = 'paragraph-1-';
                scrollIntoView(textParagraph, 11);
                click(linksExpandable, 1);
                saveElementScreenshot(textParagraph, paragraphTag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), 11);
                expect(checkElementScreenshot(textParagraph, 'paragraph-1-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(), 11)).toBeLessThan(5, `element item hover state mismatch`);
            });

            it('verify paragraph example after click "MORE LABEL" link', () => {
                const paragraphTag = 'paragraph-2-';
                scrollIntoView(textParagraph, 12);
                click(linksExpandable, 2);
                saveElementScreenshot(textParagraph, paragraphTag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), 12);
                expect(checkElementScreenshot(textParagraph, 'paragraph-2-' + getImageTagBrowserPlatform(),
                    textPage.getScreenshotFolder(), 12)).toBeLessThan(5, `element item hover state mismatch`);
            });
        });
    });
});
