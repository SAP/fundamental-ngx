import { LinkPo } from '../pages/link.po';
import {
    defaultLink_alt_text,
    googleLink,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from '../fixtures/appData/link-page-contents';
import {
    click,
    getAttributeByName,
    getCurrentUrl, getElementAriaLabel,
    getElementArrayLength, getElementClass, getElementTitle,
    isElementClickable,
    mouseHoverElement,
    scrollIntoView,
    waitForElDisplayed
} from '../../driver/wdio';

describe('Link component test suite', function() {
    const linkPage = new LinkPo();
    const {
        iconLink, standardLinks, emphasizedLink, disabledLink, emphasizedDisabledLink, invertedLink, truncatedLink
    } = linkPage;

    beforeAll(() => {
        linkPage.open();
    }, 1);

    it('should check icon link', () => {
        const iconLinkAltText = getElementAriaLabel(iconLink);

        mouseHoverElement(iconLink);
        checkLinkData(iconLink);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        mouseHoverElement(standardLinks);

        const arrL = getElementArrayLength(standardLinks);
        for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement index 9
            if (i !== 9) {
                expect(getElementAriaLabel(standardLinks, i)).toBe(standardLinksAltTextArray[i]);
                checkLinkData(standardLinks, i);
                expect(isElementClickable(standardLinks, i)).toBe(true);
            }
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = getElementAriaLabel((emphasizedLink));

        scrollIntoView(emphasizedLink);
        mouseHoverElement(emphasizedLink);

        expect(getElementClass(emphasizedLink)).toContain('emphasized');
        checkLinkData(emphasizedLink);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = getElementAriaLabel(disabledLink);

        expect(getElementClass(disabledLink)).toContain('disabled');
        checkDisabledLinkData(disabledLink);
        expect(disabledLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = getElementAriaLabel(emphasizedDisabledLink);

        expect(getElementClass(emphasizedDisabledLink)).toContain('disabled');
        expect(getElementClass(emphasizedDisabledLink)).toContain( 'emphasized');
        checkDisabledLinkData(emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = getElementAriaLabel(invertedLink);

        scrollIntoView(invertedLink);
        mouseHoverElement(invertedLink);
        expect(getElementClass(invertedLink)).toContain('inverted');
        checkLinkData(invertedLink);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = getElementAriaLabel(truncatedLink);

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
        waitForElDisplayed(iconLink);
        checkLinkTarget(iconLink, googleLink, 'input[type="text"]');
        linkPage.open();
        waitForElDisplayed(iconLink);
    }, 2);

    it('should check orientation', () => {
        linkPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        xit('should check examples visual regression', () => {
            linkPage.saveExampleBaselineScreenshot();
            expect(linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

function checkLinkData(element, index: number = 0): void {
    expect(getAttributeByName(element, 'type', index)).toBe('text');
    expect([null, '']).not.toContain(getElementAriaLabel(element, index));
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
    expect([null, '']).not.toContain(getElementAriaLabel(element, index));
    expect([null, '']).not.toContain(getElementTitle(element, index));
    expect(getAttributeByName(element, 'type', index)).toBe('text');
}
