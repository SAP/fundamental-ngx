import { LinkPo } from '../pages/link.po';
import {
    addIsActiveClass,
    checkElementScreenshot, click, focusElement,
    getElementArrayLength, getImageTagBrowserPlatform,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot
} from '../../driver/wdio';

describe('Link test suite', function() {
    const linkPage = new LinkPo();
    const { links } = linkPage;

    beforeAll(() => {
        linkPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('check links', function() {
        it('should check links clickable', () => {
            const linkCount = getElementArrayLength(links);
            const disabledLinkIndex = 2;

            for (let i = 0; i < linkCount; i++) {
                if (i === disabledLinkIndex) {
                    expect(isElementClickable(links, i)).toBe(false);
                    continue;
                }
                expect(isElementClickable(links, i)).toBe(true);
            }
        });

        it('should check orientation', () => {
           linkPage.checkRtlSwitch();
        });
    });

    describe('visual regression', function() {
        it('should check examples visual regression', () => {
            linkPage.saveExampleBaselineScreenshot();
            expect(linkPage.compareWithBaseline()).toBeLessThan(2);
        });

        it('check link hover state', () => {
            const linkCount = getElementArrayLength(links);

            for (let i = 0; i < linkCount; i++) {
                checkLinkHoverState(links, `link-${i}-hover-state-core-` + getImageTagBrowserPlatform(), `link-${i}`, i);
            }
        });

        it('should check link focus state', () => {
            const linkCount = getElementArrayLength(links);

            for (let i = 0; i < linkCount; i++) {
                checkLinkFocusState(links, `link-${i}-focus-state-core-` + getImageTagBrowserPlatform(), `link-${i}`, i);
            }
        });

        it('should check link active state', () => {
            const linkCount = getElementArrayLength(links);

            for (let i = 0; i < linkCount; i++) {
                checkLinkActiveState(links, `link-${i}-active-state-core-` + getImageTagBrowserPlatform(), `link-${i}`, i);
            }
        });
    });

    function checkLinkHoverState(selector: string, tag: string, linkName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${linkName} hover state mismatch`);
    }

    function checkLinkFocusState(selector: string, tag: string, linkName: string, index: number = 0): void {
        focusElement(selector, index);
        saveElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${linkName} focus state mismatch`);
    }

    function checkLinkActiveState(selector: string, tag: string, linkName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag, linkPage.getScreenshotFolder(), index))
            .toBeLessThan(2, `${linkName} active state mismatch`);
    }
});
