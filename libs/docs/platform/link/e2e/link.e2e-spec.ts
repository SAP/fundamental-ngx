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

    beforeAll(async () => {
        await linkPage.open();
    }, 1);

    it('should check icon link', async () => {
        const iconLinkAltText = await getElementAriaLabel(iconLink);

        await mouseHoverElement(iconLink);
        await checkLinkData(iconLink);
        await expect(iconLinkAltText).toBe(iconLinkAriaLabel);
        await expect(await getElementTitle(iconLink)).toBe(defaultLink_alt_text);
        await expect(await isElementClickable(iconLink)).toBe(true);
    });

    it('should check standard links', async () => {
        await scrollIntoView(standardLinks);

        const arrL = await getElementArrayLength(standardLinks);
        for (let i = 0; arrL > i; i++) {
            await scrollIntoView(standardLinks, i);
            await expect(await getElementTitle(standardLinks, i)).toBe(standardLinksAltTextArray[i]);
            await checkLinkData(standardLinks, i);
            await expect(await isElementClickable(standardLinks, i)).toBe(true);
        }
    });

    it('should check emphasized link', async () => {
        const emphasizedLinkAltText = await getElementTitle(emphasizedLink);

        await scrollIntoView(emphasizedLink);
        await mouseHoverElement(emphasizedLink);

        await expect(await getElementClass(emphasizedLink)).toContain('emphasized');
        await checkLinkData(emphasizedLink);
        await expect(emphasizedLinkAltText).toBe(defaultLink_alt_text);
        await expect(await isElementClickable(emphasizedLink)).toBe(true);
    });

    it('should check disabled link', async () => {
        const disabledLinkAltText = await getElementTitle(disabledLink);

        await expect(await getElementClass(disabledLink)).toContain('disabled');
        await checkDisabledLinkData(disabledLink);
        await expect(disabledLinkAltText).toEqual(defaultLink_alt_text);
        await expect(await isElementClickable(disabledLink)).toBe(false);
    });

    it('should check disabled emphasized link', async () => {
        const disabledEmphasizedLinkAltText = await getElementTitle(emphasizedDisabledLink);

        await expect(await getElementClass(emphasizedDisabledLink)).toContain('disabled');
        await expect(await getElementClass(emphasizedDisabledLink)).toContain('emphasized');
        await checkDisabledLinkData(emphasizedDisabledLink);
        await expect(disabledEmphasizedLinkAltText).toEqual(defaultLink_alt_text);
        await expect(await isElementClickable(emphasizedDisabledLink)).toBe(false);
    });

    it('should check inverted link', async () => {
        const invertedLinkAltText = await getElementTitle(invertedLink);

        await scrollIntoView(invertedLink);
        await mouseHoverElement(invertedLink);
        await expect(await getElementClass(invertedLink)).toContain('inverted');
        await checkLinkData(invertedLink);
        await expect(invertedLinkAltText).toBe(defaultLink_alt_text);
        await expect(await isElementClickable(invertedLink)).toBe(true);
    });

    it('should check truncated link', async () => {
        if (await browserIsSafari()) {
            // mouse hover doesn't work
            return;
        }
        const truncatedLinkAltText = await getElementTitle(truncatedLink);

        await scrollIntoView(truncatedLink);
        await mouseHoverElement(truncatedLink);
        await expect(await getElementClass(truncatedLink)).toContain('truncate');
        await checkLinkData(truncatedLink);
        await expect(truncatedLinkAltText).toBe(truncatedLink_alt_text);
        await expect(await isElementClickable(truncatedLink)).toBe(true);
        await linkPage.open();
        await waitForElDisplayed(iconLink);
    });

    it('should check link navigation to new page', async () => {
        if (await browserIsSafari()) {
            // unstable on Safari
            return;
        }
        await linkPage.open();
        await waitForElDisplayed(iconLink);
        await checkLinkTarget(iconLink, googleLink, 'body');
        await linkPage.open();
    }, 2);

    it('should check orientation', async () => {
        await linkPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await linkPage.saveExampleBaselineScreenshot();
            await expect(await linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

async function checkLinkData(element, index: number = 0): Promise<void> {
    await expect(await getAttributeByName(element, 'type', index)).toBe('text');
    await expect([null, '']).not.toContain(await getElementTitle(element, index));
    await expect([null, '']).not.toContain(await getAttributeByName(element, 'href', index));
}

async function checkLinkTarget(element, site: string, newPageElement): Promise<void> {
    await click(element);
    await waitForElDisplayed(newPageElement);
    const newUrl = await getCurrentUrl();
    await expect(newUrl).toContain(site);
}

async function checkDisabledLinkData(element, index: number = 0): Promise<void> {
    await expect([null, '']).not.toContain(await getElementTitle(element, index));
    await expect([null, '']).not.toContain(await getElementTitle(element, index));
    await expect(await getAttributeByName(element, 'type', index)).toBe('text');
}
