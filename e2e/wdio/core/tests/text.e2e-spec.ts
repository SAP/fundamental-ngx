import { TextPo } from '../pages/text.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click,
    getElementArrayLength, getImageTagBrowserPlatform,
    getText, mouseHoverElement,
    refreshPage,
    saveElementScreenshot, scrollIntoView
} from '../../driver/wdio';
import { paragraphTag, linkMoreTag, linkLessTag } from '../fixtures/testData/text.tags';
import { link, paragraph } from '../fixtures/appData/text-contents';

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
                expect(textPage.compareWithBaseline()).toBeLessThan(1);
            });

            it('verify paragraph hover state when you click "MORE" link', () => {
                scrollIntoView(textParagraph, 10);
                click(linksExpandable);
                checkElementHoverState(textParagraph, paragraphTag + '0-hover-state-', paragraph, 10);
            });

            it('verify paragraph hover state when you click "LESS" link', () => {
                scrollIntoView(textParagraph, 11);
                click(linksExpandable, 1);
                checkElementHoverState(textParagraph, paragraphTag + '1-hover-state-', paragraph, 11);
            });

            it('verify paragraph hover state when you click "MORE LABEL" link', () => {
                scrollIntoView(textParagraph, 12);
                click(linksExpandable, 2);
                checkElementHoverState(textParagraph, paragraphTag + '2-hover-state-', paragraph, 12);
            });

            it('verify links More/Less states', () => {
                const linksLength = getElementArrayLength(linksExpandable);
                for (let i = 0; i < linksLength; i++) {
                    scrollIntoView(linksExpandable, i);
                    checkElementStates(linksExpandable, linkMoreTag + i + '-', link, i);
                }
                for (let i = 0; i < linksLength; i++) {
                    scrollIntoView(linksExpandable, i);
                    checkElementStates(linksExpandable, linkLessTag + i + '-', link, i);
                }
            });
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), textPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
    }
});
