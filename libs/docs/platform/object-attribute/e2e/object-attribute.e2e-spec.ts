import { ObjectAttributePo } from './object-attribute.po';
import {
    checkElementTextValue,
    getAttributeByName,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';
import { labelAttribute, linkText, standaloneText } from './object-attribute-contents';

describe('object attribute test suite', () => {
    const objectAttributePage = new ObjectAttributePo();
    const { standaloneTextObject, externalLinkObject, linkObject } = objectAttributePage;

    beforeAll(() => {
        objectAttributePage.open();
    }, 1);

    it('should check standalone text is displayed', () => {
        expect(isElementDisplayed(standaloneTextObject)).toBe(true);
    });

    it('should check standalone text attribute', () => {
        expect(getAttributeByName(standaloneTextObject, labelAttribute)).toBe(standaloneText);
    });

    it('should check link is displayed', () => {
        expect(isElementDisplayed(linkObject)).toBe(true);
    });

    // TODO: write appropriate e2e
    xit('should check link attribute', () => {});

    it('should check link is displayed', () => {
        expect(isElementDisplayed(externalLinkObject)).toBe(true);
    });

    it('should check link text', () => {
        checkElementTextValue(externalLinkObject, linkText);
    });

    it('should check disabled link is displayed', () => {
        expect(isElementDisplayed(linkObject, 2)).toBe(true);
    });

    // TODO: write appropriate e2e
    xit('check disabled link', () => {});

    it('should check orientation', () => {
        objectAttributePage.checkRtlSwitch();
    });

    xit('check visual regression', () => {
        refreshPage();
        waitForElDisplayed(standaloneTextObject);
        objectAttributePage.saveExampleBaselineScreenshot();
        expect(objectAttributePage.compareWithBaseline()).toBeLessThan(5);
    });
});
