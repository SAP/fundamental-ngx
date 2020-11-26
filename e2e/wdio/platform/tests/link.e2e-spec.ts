import { LinkPo } from '../pages/link.po';
import {
    defaultLink_alt_text,
    googleLink,
    linkFocusState,
    standardLinksAltTextArray,
    truncatedLink_alt_text
} from '../fixtures/appData/link-page-contents';
import { webDriver } from '../../driver/wdio';


describe('Link component test suite', function() {
    const linkPage = new LinkPo();

    beforeAll(() => {
         linkPage.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('should check icon link',  () => {
         const iconLinkAltText = webDriver.getAttributeByName(linkPage.iconLink, 'aria-label');
         const iconLinkHoverState = webDriver.mouseHoverElement(linkPage.iconLink).then( () => {
             return webDriver.getCSSPropertyByName(linkPage.iconLink, 'text-decoration');
         });

        checkIfDisabled(linkPage.iconLink, 'ng-reflect-disabled', 'false');
        checkLinkData(linkPage.iconLink);
        checkLinkHover(iconLinkHoverState);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check standard links', () => {
        const linksArray = webDriver.elementArray(linkPage.standardLinks);
        webDriver.mouseHoverElement(linkPage.standardLinks);
        const standardLinkHoverState = webDriver.getCSSPropertyByName(linkPage.standardLinks, 'text-decoration');

        expect(webDriver.getAttributeByName(linkPage.standardImgLink, 'img')).not.toBe(null);
        expect(standardLinkHoverState).toContain('underline solid');

        const arrL = webDriver.getElementArrayLength(linkPage.standardLinks);
            for (let i = 0; arrL > i; i++) {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement
                if (i !== 8) {
                    expect(webDriver.getAttributeByName(linksArray, 'aria-label', 0)).toBe(standardLinksAltTextArray[i]);
                    checkIfDisabled(linksArray[i], 'ng-reflect-disabled', 'false');
                    checkLinkData(linksArray[i]);
            }
        }
    });

    it('should check emphasized link', () => {
        const emphasizedLinkAltText = webDriver.getAttributeByName(linkPage.emphasizedLink, 'aria-label');
        const emphasizedLinkHoverState = webDriver.mouseHoverElement(linkPage.emphasizedLink).then( () => {
            return webDriver.getCSSPropertyByName(linkPage.emphasizedLink, 'text-decoration');
        });

        checkIfDisabled(linkPage.emphasizedLink, 'ng-reflect-disabled', 'false');
        expect(webDriver.getAttributeByName(linkPage.emphasizedLink, 'class')).toContain('emphasized');
        checkLinkData(linkPage.emphasizedLink);
        checkLinkHover(emphasizedLinkHoverState);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check disabled link', () => {
        const disabledLinkAltText = webDriver.getAttributeByName(linkPage.disabledLink, 'aria-label');

        checkIfDisabled(linkPage.disabledLink, 'ng-reflect-disabled', 'true');
        expect(webDriver.getAttributeByName(linkPage.disabledLink, 'class')).toContain('disabled');
        checkLinkData(linkPage.disabledLink);
        expect(disabledLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check disabled emphasized link', () => {
        const disabledEmphasizedLinkAltText = webDriver.getAttributeByName(linkPage.emphasizedDisabledLink, 'aria-label');

        checkIfDisabled(linkPage.emphasizedDisabledLink, 'ng-reflect-disabled', 'true');
        expect(webDriver.getAttributeByName(linkPage.emphasizedDisabledLink, 'class'))
            .toContain('disabled', 'emphasized');
        checkLinkData(linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check inverted link', () => {
        const invertedLinkAltText = webDriver.getAttributeByName(linkPage.invertedLink, 'aria-label');
        const invertedLinkHoverState = webDriver.mouseHoverElement(linkPage.invertedLink).then( () => {
            return webDriver.getCSSPropertyByName(linkPage.invertedLink, 'text-decoration');
        });

        checkIfDisabled(linkPage.invertedLink, 'ng-reflect-disabled', 'false');
        expect(webDriver.getAttributeByName(linkPage.invertedLink, 'class')).toContain('inverted');
        checkLinkData(linkPage.invertedLink);
        checkLinkHover(invertedLinkHoverState);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check truncated link', () => {
        const truncatedLinkAltText = webDriver.getAttributeByName(linkPage.truncatedLink, 'aria-label');
        const truncatedLinkHoverState = webDriver.mouseHoverElement(linkPage.truncatedLink).then( () => {
            return webDriver.getCSSPropertyByName(linkPage.truncatedLink, 'text-decoration');
        });

        checkIfDisabled(linkPage.truncatedLink, 'ng-reflect-disabled', 'false');
        expect(webDriver.getAttributeByName(linkPage.truncatedLink, 'class')).toContain('truncate');
        checkLinkData(linkPage.truncatedLink);
        checkLinkHover(truncatedLinkHoverState);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
    });

    it('should check LTR is default orientation', () => {
        const areaContainersArray = webDriver.elementArray(linkPage.exampleAreaContainersArr);

        const arrL = webDriver.getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            expect(webDriver.getCSSPropertyByName(areaContainersArray[i], 'direction', 0).value).toBe('ltr', 'css prop direction ');
        }

        // areaContainersArray.forEach(element => {
        //     expect(element.getCSSProperty('direction')).toBe('ltr', 'css prop direction ');
        // });
    });

    it('should have RTL orientation', () => {
        const arrL = webDriver.getElementArrayLength(linkPage.exampleAreaContainersArr);
        for (let i = 0; arrL > i; i++) {
            webDriver.scrollIntoView(linkPage.exampleAreaContainersArr, 5000, i);
            expect(webDriver.getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr', 'css prop direction ' + i);
            const dirValueBefore = webDriver.getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i);
            expect([null, '']).toContain(dirValueBefore);
            webDriver.click(linkPage.rtlSwitcherArr, 5000, i);
            expect(webDriver.getCSSPropertyByName(linkPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            expect(webDriver.getAttributeByName(linkPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
        }
    });

    // it('should check link navigation to new page', () => {
    //     checkLinkTargetDestination(linkPage.iconLink, googleLink);
    // });

});

function checkLinkData(element): void {
    expect(webDriver.getAttributeByName(element, 'type')).toBe('text');
    expect(webDriver.getAttributeByName(element, 'aria-label')).not.toBe(null);
    expect(webDriver.getAttributeByName(element, 'title')).not.toBe(null);
    expect(webDriver.getAttributeByName(element, 'href')).not.toBe(null);
}

function checkLinkHover(variable): void {
    expect(variable).toContain(linkFocusState)
}

function checkIfDisabled(element, attribute: string, value: string): void {
    expect(webDriver.getAttributeByName(element, attribute)).toBe(value);
}

// function mouseHover(element, waitTime = this.defaultWaitTime): any {
//     element.waitForExist({ timeout: waitTime });
//     element.moveTo();

// }

// function checkLinkTargetDestination(element, site: string): void {
// //    await browser.waitForAngularEnabled(angular);
//     element.click();
//     webDriver.waitForUrl(site);
// }
// angular: boolean = false
