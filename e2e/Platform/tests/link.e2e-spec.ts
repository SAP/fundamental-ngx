import { LinkPo } from '../pages/link.po';
import { checkIfDisabled, checkLinkData, getValueOfAttribute, hoverMouse } from '../helper/helper';
import {
    defaultLink_alt_text,
    truncatedLink_alt_text,
    standardLinksAltTextArray
} from '../fixtures/appData/link-page-contents';

describe('Link component test suite', () => {
    const linkPage = new LinkPo();

    beforeAll(async () => {
        await linkPage.open();
    });

     it('should check icon link', async () => {
         const iconLinkAltText = await getValueOfAttribute(linkPage.iconLink, 'aria-label');
         const iconLinkHoverState = await hoverMouse(linkPage.iconLink).then( () => {
             return linkPage.iconLink.getCssValue('text-decoration')
         });

        await checkIfDisabled(linkPage.iconLink, 'false');
        await expect(checkLinkData(linkPage.iconLink));
        await linkPage.checkLinkHover(iconLinkHoverState);
        expect(iconLinkAltText).toBe(defaultLink_alt_text);

    });

    it('should check standard links', async () => {
        const linksArray = await linkPage.standardLinks;
        const standardLinkHoverState = await hoverMouse(linksArray[0]).then( () => {
            return linksArray[0].getCssValue('text-decoration')
        });

        expect(await getValueOfAttribute(linkPage.standardImgLink, 'img')).toBeDefined();
        expect(await standardLinkHoverState).toContain('underline solid');

        linksArray.forEach(async (element, index) => {
            if (index !== 8) {  // after fix: https://github.com/SAP/fundamental-ngx/issues/3633 need to remove if statement
                await expect(await element.getAttribute('aria-label')).toBe(standardLinksAltTextArray[index])
                await checkIfDisabled(element, 'false');
                await checkLinkData(element);
            }
        });

    });

    it('should check emphasized link', async () => {
        const emphasizedLinkAltText = await getValueOfAttribute(linkPage.emphasizedLink, 'aria-label');
        const emphasizedLinkHoverState = await hoverMouse(linkPage.emphasizedLink).then( () => {
            return linkPage.emphasizedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.emphasizedLink, 'false');
        expect(await getValueOfAttribute(linkPage.emphasizedLink, 'class')).toContain('emphasized');
        await checkLinkData(linkPage.emphasizedLink);
        await linkPage.checkLinkHover(emphasizedLinkHoverState);
        expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);

    });

    it('should check disabled link', async () => {
        const disabledLinkAltText = await getValueOfAttribute(linkPage.disabledLink, 'aria-label');

        await checkIfDisabled(linkPage.disabledLink, 'true');
        expect(await getValueOfAttribute(linkPage.disabledLink, 'class')).toContain('disabled');
        await checkLinkData(linkPage.disabledLink);
        expect(disabledLinkAltText).toBe(defaultLink_alt_text);

    });

    it('should check disabled emphasized link', async () => {
        const disabledEmphasizedLinkAltText = await getValueOfAttribute(linkPage.emphasizedDisabledLink, 'aria-label');

        await checkIfDisabled(linkPage.emphasizedDisabledLink, 'true');
        expect(await getValueOfAttribute(linkPage.emphasizedDisabledLink, 'class')).toContain('disabled', 'emphasized');
        await checkLinkData(linkPage.emphasizedDisabledLink);
        expect(disabledEmphasizedLinkAltText).toBe(defaultLink_alt_text);

    });

    it('should check inverted link', async () => {
        const invertedLinkAltText = await getValueOfAttribute(linkPage.invertedLink, 'aria-label');
        const invertedLinkHoverState = await hoverMouse(linkPage.invertedLink).then( () => {
            return linkPage.invertedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.invertedLink, 'false');
        expect(await getValueOfAttribute(linkPage.invertedLink, 'class')).toContain('inverted');
        await checkLinkData(linkPage.invertedLink);
        await linkPage.checkLinkHover(invertedLinkHoverState);
        expect(invertedLinkAltText).toBe(defaultLink_alt_text);

    });

    it('should check truncated link', async () => {
        const truncatedLinkAltText = await getValueOfAttribute(linkPage.truncatedLink, 'aria-label');
        const truncatedLinkHoverState = await hoverMouse(linkPage.truncatedLink).then( () => {
            return linkPage.truncatedLink.getCssValue('text-decoration')
        });

        await checkIfDisabled(linkPage.truncatedLink, 'false');
        expect(await getValueOfAttribute(linkPage.truncatedLink, 'class')).toContain('truncate');
        await checkLinkData(linkPage.truncatedLink);
        await linkPage.checkLinkHover(truncatedLinkHoverState);
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
        await linkPage.checkLinkNavigation(linkPage.iconLink, 'www.google.com');

    });

});
