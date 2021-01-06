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
    getCSSPropertyByName,
    getElementArrayLength,
    isElementClickable,
    mouseHoverElement,
    refreshPage,
    scrollIntoView
} from '../../driver/wdio';

xdescribe('Link component test suite', function() {
    const linkPage = new LinkPo();

    beforeAll(() => {
        linkPage.open();
    });

    afterEach(() => {
        refreshPage();
    });

    it('should check icon link', () => {
        const iconLinkAltText = getAttributeByName(linkPage.iconLink, 'aria-label');
        mouseHoverElement(linkPage.iconLink);
        //  const iconLinkHoverState = getCSSPropertyByName(linkPage.iconLink, 'text-decoration');

        checkLinkData(linkPage.iconLink);
        //  checkLinkHover(iconLinkHoverState);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.iconLink)).toBe(true);
    });

    it('should check standard links', () => {
        //  const linksArray = elementArray(linkPage.standardLinks);
        mouseHoverElement(linkPage.standardLinks);
        //  const standardLinkHoverState = getCSSPropertyByName(linkPage.standardLinks, 'text-decoration');
        //  expect(standardLinkHoverState.value).toContain('underline');

        const arrL = getElementArrayLength(linkPage.standardLinks);
        for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement
            if (i !== 8) {
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
        //   const emphasizedLinkHoverState = getCSSPropertyByName(linkPage.emphasizedLink, 'text-decoration');

        expect(getAttributeByName(linkPage.emphasizedLink, 'class')).toContain('emphasized');
        checkLinkData(linkPage.emphasizedLink);
        //  checkLinkHover(emphasizedLinkHoverState);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.emphasizedLink)).toBe(true);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = getAttributeByName(linkPage.disabledLink, 'aria-label');

        expect(getAttributeByName(linkPage.disabledLink, 'class')).toContain('disabled');
        //  checkLinkData(linkPage.disabledLink);
        expect(disabledLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = getAttributeByName(linkPage.emphasizedDisabledLink, 'aria-label');

        expect(getAttributeByName(linkPage.emphasizedDisabledLink, 'class'))
            .toContain('disabled', 'emphasized');
        //   checkLinkData(linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = getAttributeByName(linkPage.invertedLink, 'aria-label');
        scrollIntoView(linkPage.invertedLink);
        mouseHoverElement(linkPage.invertedLink);
        //   const invertedLinkHoverState = getCSSPropertyByName(linkPage.invertedLink, 'text-decoration');

        expect(getAttributeByName(linkPage.invertedLink, 'class')).toContain('inverted');
        checkLinkData(linkPage.invertedLink);
        //    checkLinkHover(invertedLinkHoverState);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        expect(isElementClickable(linkPage.invertedLink)).toBe(true);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = getAttributeByName(linkPage.truncatedLink, 'aria-label');
        scrollIntoView(linkPage.truncatedLink);
        mouseHoverElement(linkPage.truncatedLink);
        //   const truncatedLinkHoverState = getCSSPropertyByName(linkPage.truncatedLink, 'text-decoration');

        expect(getAttributeByName(linkPage.truncatedLink, 'class')).toContain('truncate');
        checkLinkData(linkPage.truncatedLink);
        //   checkLinkHover(truncatedLinkHoverState);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
        expect(isElementClickable(linkPage.truncatedLink)).toBe(true);
    });

    it('should check LTR is default orientation', () => {
        const arrL = getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            expect(getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ');
        }
    });

    it('should have RTL orientation', () => {
        const arrL = getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            scrollIntoView(linkPage.exampleAreaContainersArr, i);
            expect(getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            click(linkPage.rtlSwitcherArr, i);
            expect(getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });

    it('should check link navigation to new page', () => {
        checkLinkTargetDestination(linkPage.iconLink, googleLink);
    });

});

function checkLinkData(element, index: number = 0): void {
    expect(getAttributeByName(element, 'type', index)).toBe('text');
    expect(getAttributeByName(element, 'aria-label', index)).not.toBe(null);
    expect(getAttributeByName(element, 'title', index)).not.toBe(null);
    expect(getAttributeByName(element, 'href', index)).not.toBe(null);
}

// TODO: fails in IE, Safari
// function checkLinkHover(element): void {
//     expect(element.value).toContain(linkFocusState);
// }

function checkLinkTargetDestination(element, site: string): void {
    click(element);
    expect(browser).toHaveUrlContaining(site);
}
