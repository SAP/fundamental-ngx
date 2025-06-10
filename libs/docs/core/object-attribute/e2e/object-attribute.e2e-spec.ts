import { checkElementTextValue, getAttributeByName, isElementDisplayed } from '@fundamental-ngx/e2e';
import { labelAttribute, linkText, standaloneText } from './object-attribute-contents';
import { ObjectAttributePo } from './object-attribute.po';

describe('object attribute test suite', () => {
    const objectAttributePage = new ObjectAttributePo();
    const { standaloneTextObject, externalLinkObject, linkObject } = objectAttributePage;

    beforeAll(async () => {
        await objectAttributePage.open();
    }, 1);

    it('should check standalone text is displayed', async () => {
        await expect(await isElementDisplayed(standaloneTextObject)).toBe(true);
    });

    it('should check standalone text attribute', async () => {
        await expect(await getAttributeByName(standaloneTextObject, labelAttribute)).toBe(standaloneText);
    });

    it('should check link is displayed', async () => {
        await expect(await isElementDisplayed(linkObject)).toBe(true);
    });

    it('should check link is displayed', async () => {
        await expect(await isElementDisplayed(externalLinkObject)).toBe(true);
    });

    it('should check link text', async () => {
        await checkElementTextValue(externalLinkObject, linkText);
    });

    it('should check disabled link is displayed', async () => {
        await expect(await isElementDisplayed(linkObject, 2)).toBe(true);
    });

    it('should check orientation', async () => {
        await objectAttributePage.checkRtlSwitch();
    });
});
