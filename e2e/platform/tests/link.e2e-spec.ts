import { LinkPo } from '../pages/link.po';
import { checkLinkTargetDestination, getValueOfAttribute, hoverMouse } from '../helper/helper';
import {
    defaultLink_alt_text,
    truncatedLink_alt_text,
    standardLinksAltTextArray,
    googleLink,
    linkFocusState
} from '../fixtures/appData/link-page-contents';
import { checkIfDisabled } from '../helper/assertion-helper';
import { ElementFinder } from 'protractor';

describe('Link component test suite', function() {
    const linkPage = new LinkPo();

    beforeAll(async () => {
        await linkPage.open();
    });

    it('should check icon link', async () => {
         const iconLinkAltText = await getValueOfAttribute(await linkPage.iconLink, 'aria-label');
         const iconLinkHoverState = await hoverMouse(await linkPage.iconLink).then( () => {
             return linkPage.iconLink.getCssValue('text-decoration');
         });

        await checkIfDisabled(await linkPage.iconLink, 'ng-reflect-disabled', 'false');
        await checkLinkData(await linkPage.iconLink);
        await checkLinkHover(iconLinkHoverState);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check standard links', async () => {
        const linksArray = await linkPage.standardLinks;
        const standardLinkHoverState = await hoverMouse(linksArray[0]).then( () => {
            return linksArray[0].getCssValue('text-decoration')
        });

        expect(await getValueOfAttribute(await linkPage.standardImgLink, 'img')).toBeDefined();
        expect(await standardLinkHoverState).toContain('underline solid');

        linksArray.forEach(async (element, index) => {
            // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement
            if (index !== 8) {
                await expect(await element.getAttribute('aria-label')).toBe(standardLinksAltTextArray[index]);
                await checkIfDisabled(element, 'ng-reflect-disabled', 'false');
                await checkLinkData(await element);
            }
        });
    });

    it('should check emphasized link', async () => {
        const emphasizedLinkAltText = await getValueOfAttribute(await linkPage.emphasizedLink, 'aria-label');
        const emphasizedLinkHoverState = await hoverMouse(await linkPage.emphasizedLink).then( () => {
            return linkPage.emphasizedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.emphasizedLink, 'ng-reflect-disabled', 'false');
        expect(await getValueOfAttribute(await linkPage.emphasizedLink, 'class')).toContain('emphasized');
        await checkLinkData(await linkPage.emphasizedLink);
        await checkLinkHover(emphasizedLinkHoverState);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check disabled link', async () => {
        const disabledLinkAltText = await getValueOfAttribute(await linkPage.disabledLink, 'aria-label');

        await checkIfDisabled(linkPage.disabledLink, 'ng-reflect-disabled', 'true');
        expect(await getValueOfAttribute(await linkPage.disabledLink, 'class')).toContain('disabled');
        await checkLinkData(await linkPage.disabledLink);
        expect(disabledLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check disabled emphasized link', async () => {
        const disabledEmphasizedLinkAltText = await getValueOfAttribute(await linkPage.emphasizedDisabledLink, 'aria-label');

        await checkIfDisabled(linkPage.emphasizedDisabledLink, 'ng-reflect-disabled', 'true');
        expect(await getValueOfAttribute(await linkPage.emphasizedDisabledLink, 'class')).toContain('disabled', 'emphasized');
        await checkLinkData(await linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check inverted link', async () => {
        const invertedLinkAltText = await getValueOfAttribute(await linkPage.invertedLink, 'aria-label');
        const invertedLinkHoverState = await hoverMouse(await linkPage.invertedLink).then( () => {
            return linkPage.invertedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.invertedLink, 'ng-reflect-disabled', 'false');
        expect(await getValueOfAttribute(await linkPage.invertedLink, 'class')).toContain('inverted');
        await checkLinkData(await linkPage.invertedLink);
        await checkLinkHover(invertedLinkHoverState);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);
    });

    it('should check truncated link', async () => {
        const truncatedLinkAltText = await getValueOfAttribute(await linkPage.truncatedLink, 'aria-label');
        const truncatedLinkHoverState = await hoverMouse(await linkPage.truncatedLink).then( () => {
            return linkPage.truncatedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.truncatedLink, 'ng-reflect-disabled', 'false');
        expect(await getValueOfAttribute(await linkPage.truncatedLink, 'class')).toContain('truncate');
        await checkLinkData(await linkPage.truncatedLink);
        await checkLinkHover(truncatedLinkHoverState);
        expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
    });

    it('should check LTR is default orientation', async () => {
        const areaContainersArray = await linkPage.exampleAreaContainersArr;

        areaContainersArray.forEach(element => {
            expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
        });
    });

    it('should check RTL orientation', async () => {
        await linkPage.exampleAreaContainersArr.each(async (area, index) => {
            expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
            expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
            await linkPage.rtlSwitcherArr.get(index).click();
            expect(await area.getCssValue('direction')).toBe('rtl');
            expect(await area.getAttribute('dir')).toBe('rtl');
        });
    });

    it('should check link navigation to new page', async () => {
        await checkLinkTargetDestination(linkPage.iconLink, googleLink, false);
    });

});

async function checkLinkData(element: ElementFinder): Promise<void> {
    expect(await getValueOfAttribute(element, 'type')).toEqual('text');
    expect(await getValueOfAttribute(element, 'aria-label')).not.toEqual(null);
    expect(await getValueOfAttribute(element, 'title')).not.toEqual(null);
    expect(await getValueOfAttribute(element, 'href')).toBeDefined();
}

async function checkLinkHover(variable): Promise<void> {
    expect(variable).toContain(linkFocusState)
}
