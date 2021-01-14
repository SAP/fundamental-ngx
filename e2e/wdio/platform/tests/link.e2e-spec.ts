import { LinkPo } from '../pages/link.po';
import {
    defaultLink_alt_text,
    googleLink, linkFocusState,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from '../fixtures/appData/link-page-contents';
import {
    browserIsIEorSafari,
    click,
    getAttributeByName,
    getCSSPropertyByName, getCurrentUrl,
    getElementArrayLength,
    isElementClickable,
    mouseHoverElement,
    scrollIntoView, waitForPresent
} from '../../driver/wdio';

describe('Link component test suite', function() {
    const linkPage = new LinkPo();

    beforeAll(() => {
        linkPage.open();
    }, 1);

    it('should check icon link', () => {
        const iconLinkAltText = getAttributeByName(linkPage.iconLink, 'aria-label');

        mouseHoverElement(linkPage.iconLink);
        checkLinkData(linkPage.iconLink);
        checkLinkHover(linkPage.iconLink);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        mouseHoverElement(linkPage.standardLinks);

        const arrL = getElementArrayLength(linkPage.standardLinks);
        for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement index 9
            if (i !== 9) {
                expect(getAttributeByName(linkPage.standardLinks, 'aria-label', i)).toBe(standardLinksAltTextArray[i]);
                checkLinkData(linkPage.standardLinks, i);
                expect(isElementClickable(linkPage.standardLinks, i)).toBe(true);
            }
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = getAttributeByName(linkPage.emphasizedLink, 'aria-label');

        scrollIntoView(linkPage.emphasizedLink);
        mouseHoverElement(linkPage.emphasizedLink);

        expect(getAttributeByName(linkPage.emphasizedLink, 'class')).toContain('emphasized');
        checkLinkData(linkPage.emphasizedLink);
        checkLinkHover(linkPage.emphasizedLink);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = getAttributeByName(linkPage.disabledLink, 'aria-label');

        expect(getAttributeByName(linkPage.disabledLink, 'class')).toContain('disabled');
        checkDisabledLinkData(linkPage.disabledLink);
        expect(disabledLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(linkPage.disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = getAttributeByName(linkPage.emphasizedDisabledLink, 'aria-label');

        expect(getAttributeByName(linkPage.emphasizedDisabledLink, 'class'))
            .toContain('disabled', 'emphasized');
        checkDisabledLinkData(linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toEqual(defaultLink_alt_text);
        expect(isElementClickable(linkPage.emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = getAttributeByName(linkPage.invertedLink, 'aria-label');

        scrollIntoView(linkPage.invertedLink);
        mouseHoverElement(linkPage.invertedLink);
        expect(getAttributeByName(linkPage.invertedLink, 'class')).toContain('inverted');
        checkLinkData(linkPage.invertedLink);
        checkLinkHover(linkPage.invertedLink);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = getAttributeByName(linkPage.truncatedLink, 'aria-label');

        scrollIntoView(linkPage.truncatedLink);
        mouseHoverElement(linkPage.truncatedLink);
        expect(getAttributeByName(linkPage.truncatedLink, 'class')).toContain('truncate');
        checkLinkData(linkPage.truncatedLink);
        checkLinkHover(linkPage.truncatedLink);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
        expect(isElementClickable(linkPage.truncatedLink)).toBe(true);
    });

    it('should check link navigation to new page', () => {
        checkLinkTarget(linkPage.iconLink, googleLink, 'center img');
        linkPage.open();
    }, 2);

    it('should check orientation', () => {
        linkPage.checkRtlSwitch();
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
    waitForPresent(newPageElement);
    const newUrl = getCurrentUrl();
    expect(newUrl).toContain(site);
}

function checkDisabledLinkData(element, index: number = 0): void {
    expect([null, '']).not.toContain(getAttributeByName(element, 'aria-label', index));
    expect([null, '']).not.toContain(getAttributeByName(element, 'title', index));
    expect(getAttributeByName(element, 'type', index)).toBe('text');
}
