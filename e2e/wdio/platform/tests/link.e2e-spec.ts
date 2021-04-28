import { LinkPo } from '../pages/link.po';
import {
    defaultLink_alt_text,
    googleLink,
    linkFocusState,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from '../fixtures/appData/link-page-contents';
import {
    browserIsIEorSafari,
    click,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength,
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
        const iconLinkAltText = getAttributeByName(iconLink, 'aria-label');

        mouseHoverElement(iconLink);
        checkLinkData(iconLink);
        checkLinkHover(iconLink);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        mouseHoverElement(standardLinks);

        const arrL = getElementArrayLength(standardLinks);
        for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement index 9
            if (i !== 9) {
                expect(getAttributeByName(standardLinks, 'aria-label', i)).toBe(standardLinksAltTextArray[i]);
                checkLinkData(standardLinks, i);
                expect(isElementClickable(standardLinks, i)).toBe(true);
            }
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = getAttributeByName(emphasizedLink, 'aria-label');

        scrollIntoView(emphasizedLink);
        mouseHoverElement(emphasizedLink);

        expect(getAttributeByName(emphasizedLink, 'class')).toContain('emphasized');
        checkLinkData(emphasizedLink);
        checkLinkHover(emphasizedLink);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = getAttributeByName(disabledLink, 'aria-label');

        expect(getAttributeByName(disabledLink, 'class')).toContain('disabled');
        checkDisabledLinkData(disabledLink);
        expect(disabledLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = getAttributeByName(emphasizedDisabledLink, 'aria-label');

        expect(getAttributeByName(emphasizedDisabledLink, 'class'))
            .toContain('disabled', 'emphasized');
        checkDisabledLinkData(emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = getAttributeByName(invertedLink, 'aria-label');

        scrollIntoView(invertedLink);
        mouseHoverElement(invertedLink);
        expect(getAttributeByName(invertedLink, 'class')).toContain('inverted');
        checkLinkData(invertedLink);
        checkLinkHover(invertedLink);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = getAttributeByName(truncatedLink, 'aria-label');

        scrollIntoView(truncatedLink);
        mouseHoverElement(truncatedLink);
        expect(getAttributeByName(truncatedLink, 'class')).toContain('truncate');
        checkLinkData(truncatedLink);
        checkLinkHover(truncatedLink);
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
            expect(linkPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});

function checkLinkData(element, index: number = 0): void {
    expect(getAttributeByName(element, 'type', index)).toBe('text');
    expect([null, '']).not.toContain(getAttributeByName(element, 'aria-label', index));
    expect([null, '']).not.toContain(getAttributeByName(element, 'title', index));
    expect([null, '']).not.toContain(getAttributeByName(element, 'href', index));
}

function checkLinkHover(element): void {
    // TODO fix for IE & Safari
    if (browserIsIEorSafari()) {
        console.log('skip hover check for IE, Safari');
        return;
    }
    expect(getCSSPropertyByName(element, 'text-decoration').value).toContain(linkFocusState);
}

function checkLinkTarget(element, site: string, newPageElement): void {
    click(element);
    waitForElDisplayed(newPageElement);
    const newUrl = getCurrentUrl();
    expect(newUrl).toContain(site);
}

function checkDisabledLinkData(element, index: number = 0): void {
    expect([null, '']).not.toContain(getAttributeByName(element, 'aria-label', index));
    expect([null, '']).not.toContain(getAttributeByName(element, 'title', index));
    expect(getAttributeByName(element, 'type', index)).toBe('text');
}
