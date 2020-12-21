import { LinkPo } from '../pages/link.po';
import {
    defaultLink_alt_text,
    googleLink,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from '../fixtures/appData/link-page-contents';
import { webDriver } from '../../driver/wdio';

xdescribe('Link component test suite', function() {
    const linkPage = new LinkPo();

    beforeAll(() => {
        linkPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should check icon link', () => {
        const iconLinkAltText = webDriver.getAttributeByName(linkPage.iconLink, 'aria-label');
        webDriver.mouseHoverElement(linkPage.iconLink);
        //  const iconLinkHoverState = webDriver.getCSSPropertyByName(linkPage.iconLink, 'text-decoration');

        checkLinkData(linkPage.iconLink);
        //  checkLinkHover(iconLinkHoverState);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        //  const linksArray = webDriver.elementArray(linkPage.standardLinks);
        webDriver.mouseHoverElement(linkPage.standardLinks);
        //  const standardLinkHoverState = webDriver.getCSSPropertyByName(linkPage.standardLinks, 'text-decoration');
        //  expect(standardLinkHoverState.value).toContain('underline');

        const arrL = webDriver.getElementArrayLength(linkPage.standardLinks);
        for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement
            if (i !== 8) {
                expect(webDriver.getAttributeByName(linkPage.standardLinks, 'aria-label', i)).toBe(standardLinksAltTextArray[i]);
                checkLinkData(linkPage.standardLinks, i);
                expect(webDriver.isElementClickable(linkPage.standardLinks, i)).toBe(true);
            }
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = webDriver.getAttributeByName(linkPage.emphasizedLink, 'aria-label');
        webDriver.scrollIntoView(linkPage.emphasizedLink);
        webDriver.mouseHoverElement(linkPage.emphasizedLink);
        //   const emphasizedLinkHoverState = webDriver.getCSSPropertyByName(linkPage.emphasizedLink, 'text-decoration');

        expect(webDriver.getAttributeByName(linkPage.emphasizedLink, 'class')).toContain('emphasized');
        checkLinkData(linkPage.emphasizedLink);
        //  checkLinkHover(emphasizedLinkHoverState);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = webDriver.getAttributeByName(linkPage.disabledLink, 'aria-label');

        expect(webDriver.getAttributeByName(linkPage.disabledLink, 'class')).toContain('disabled');
        //  checkLinkData(linkPage.disabledLink);
        expect(disabledLinkAltText).toBe(defaultLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = webDriver.getAttributeByName(linkPage.emphasizedDisabledLink, 'aria-label');

        expect(webDriver.getAttributeByName(linkPage.emphasizedDisabledLink, 'class'))
            .toContain('disabled', 'emphasized');
        //   checkLinkData(linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = webDriver.getAttributeByName(linkPage.invertedLink, 'aria-label');
        webDriver.scrollIntoView(linkPage.invertedLink);
        webDriver.mouseHoverElement(linkPage.invertedLink);
        //   const invertedLinkHoverState = webDriver.getCSSPropertyByName(linkPage.invertedLink, 'text-decoration');

        expect(webDriver.getAttributeByName(linkPage.invertedLink, 'class')).toContain('inverted');
        checkLinkData(linkPage.invertedLink);
        //    checkLinkHover(invertedLinkHoverState);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = webDriver.getAttributeByName(linkPage.truncatedLink, 'aria-label');
        webDriver.scrollIntoView(linkPage.truncatedLink);
        webDriver.mouseHoverElement(linkPage.truncatedLink);
        //   const truncatedLinkHoverState = webDriver.getCSSPropertyByName(linkPage.truncatedLink, 'text-decoration');

        expect(webDriver.getAttributeByName(linkPage.truncatedLink, 'class')).toContain('truncate');
        checkLinkData(linkPage.truncatedLink);
        //   checkLinkHover(truncatedLinkHoverState);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
        expect(webDriver.isElementClickable(linkPage.truncatedLink)).toBe(true);
    });

    it('should check LTR is default orientation', () => {
        const arrL = webDriver.getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            expect(webDriver.getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ');
        }
    });

    it('should have RTL orientation', () => {
        const arrL = webDriver.getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            webDriver.scrollIntoView(linkPage.exampleAreaContainersArr, i);
            expect(webDriver.getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = webDriver.getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            webDriver.click(linkPage.rtlSwitcherArr, i);
            expect(webDriver.getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(webDriver.getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });

    it('should check link navigation to new page', () => {
        checkLinkTargetDestination(linkPage.iconLink, googleLink);
    });

});

function checkLinkData(element, index: number = 0): void {
    expect(webDriver.getAttributeByName(element, 'type', index)).toBe('text');
    expect(webDriver.getAttributeByName(element, 'aria-label', index)).not.toBe(null);
    expect(webDriver.getAttributeByName(element, 'title', index)).not.toBe(null);
    expect(webDriver.getAttributeByName(element, 'href', index)).not.toBe(null);
}

// TODO: fails in IE, Safari
// function checkLinkHover(element): void {
//     expect(element.value).toContain(linkFocusState);
// }

function checkLinkTargetDestination(element, site: string): void {
    webDriver.click(element);
    expect(browser).toHaveUrlContaining(site);
}
