import { LinkPo } from './link.po';
import {
    defaultLink_alt_text,
    googleLink,
    iconLinkAriaLabel,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from './link-page-contents';
import {
    browserIsSafari,
    click,
    getAttributeByName,
    getCurrentUrl,
    getElementAriaLabel,
    getElementArrayLength,
    getElementClass,
    getElementTitle,
    isElementClickable,
    mouseHoverElement,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';

describe('Link component test suite', () => {
    const linkPage = new LinkPo();
    const {
        iconLink,
        standardLinks,
        emphasizedLink,
        disabledLink,
        emphasizedDisabledLink,
        invertedLink,
        truncatedLink
    } = linkPage;

    beforeAll(() => {
        linkPage.open();
    }, 1);

    it('should check icon link', () => {
        const iconLinkAltText = getElementAriaLabel(iconLink);

        mouseHoverElement(iconLink);
        checkLinkData(iconLink);
        expect(iconLinkAltText).toBe(iconLinkAriaLabel);
        expect(getElementTitle(iconLink)).toBe(defaultLink_alt_text);
        expect(isElementClickable(iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        scrollIntoView(standardLinks);

        const arrL = getElementArrayLength(standardLinks);
        for (let i = 0; arrL > i; i++) {
            scrollIntoView(standardLinks, i);
            expect(getElementTitle(standardLinks, i)).toBe(standardLinksAltTextArray[i]);
            checkLinkData(standardLinks, i);
            expect(isElementClickable(standardLinks, i)).toBe(true);
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = getElementTitle(emphasizedLink);

        scrollIntoView(emphasizedLink);
        mouseHoverElement(emphasizedLink);

        expect(getElementClass(emphasizedLink)).toContain('emphasized');
        checkLinkData(emphasizedLink);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = getElementTitle(disabledLink);

        expect(getElementClass(disabledLink)).toContain('disabled');
        checkDisabledLinkData(disabledLink);
        expect(disabledLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = getElementTitle(emphasizedDisabledLink);

        expect(getElementClass(emphasizedDisabledLink)).toContain('disabled');
        expect(getElementClass(emphasizedDisabledLink)).toContain('emphasized');
        checkDisabledLinkData(emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = getElementTitle(invertedLink);

        scrollIntoView(invertedLink);
        mouseHoverElement(invertedLink);
        expect(getElementClass(invertedLink)).toContain('inverted');
        checkLinkData(invertedLink);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        if (browserIsSafari()) {
            // mouse hover doesn't work
            return;
        }
        const truncatedLinkAltText = getElementTitle(truncatedLink);

        scrollIntoView(truncatedLink);
        mouseHoverElement(truncatedLink);
        expect(getElementClass(truncatedLink)).toContain('truncate');
        checkLinkData(truncatedLink);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
        expect(isElementClickable(truncatedLink)).toBe(true);
        linkPage.open();
        waitForElDisplayed(iconLink);
    });

    it('should check link navigation to new page', () => {
        if (browserIsSafari()) {
            // unstable on Safari
            return;
        }
        waitForElDisplayed(iconLink);
        checkLinkTarget(iconLink, googleLink, 'input[type="text"]');
        linkPage.open();
    }, 2);

    it('should check orientation', () => {
        linkPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            linkPage.saveExampleBaselineScreenshot();
            expect(linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkLinkData(element, index: number = 0): void {
    expect(getAttributeByName(element, 'type', index)).toBe('text');
    expect([null, '']).not.toContain(getElementTitle(element, index));
    expect([null, '']).not.toContain(getAttributeByName(element, 'href', index));
}

function checkLinkTarget(element, site: string, newPageElement): void {
    click(element);
    waitForElDisplayed(newPageElement);
    const newUrl = getCurrentUrl();
    expect(newUrl).toContain(site);
}

function checkDisabledLinkData(element, index: number = 0): void {
    expect([null, '']).not.toContain(getElementTitle(element, index));
    expect([null, '']).not.toContain(getElementTitle(element, index));
    expect(getAttributeByName(element, 'type', index)).toBe('text');
}
