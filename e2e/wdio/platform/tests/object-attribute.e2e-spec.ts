import { ObjectAttributePo } from '../pages/object-attribute.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import { getAttributeByName, isElementDisplayed, refreshPage, waitForElDisplayed } from '../../driver/wdio';
import {
    disabledAttribute,
    labelAttribute,
    linkAttribute,
    linkText,
    standaloneText
} from '../fixtures/appData/object-attribute-contents';

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

    it('should check link attribute', () => {
        checkAttributeValueTrue(linkObject, linkAttribute);
    });

    it('should check link is displayed', () => {
        expect(isElementDisplayed(externalLinkObject)).toBe(true);
    });

    it('should check link text', () => {
        checkElementTextValue(externalLinkObject, linkText);
    });

    it('should check disabled link is displayed', () => {
        expect(isElementDisplayed(linkObject, 2)).toBe(true);
    });

    it('check disabled link', () => {
        expect(getAttributeByName(linkObject, disabledAttribute, 2)).toBe('true');
    });

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
