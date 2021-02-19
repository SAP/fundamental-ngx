import { ObjectAttributePo } from '../pages/object-attribute.po';
import { checkAttributeValueTrue, checkElementTextValue } from '../../helper/assertion-helper';
import { getAttributeByName } from '../../driver/wdio';
import { disabledAttribute, labelAttribute, linkAttribute, linkText, standaloneText } from '../fixtures/appData/object-attribute-contents';

describe('object attribute test suite', function() {
    const objectAttributePage = new ObjectAttributePo();
    const {
        textExample,
        linkExample,
        objectAttribute,
        objectLinkAttribute
    } = objectAttributePage;

    beforeAll(() => {
        objectAttributePage.open();
    }, 1);

    it('should check standalone text attribute', () => {
        expect(getAttributeByName(textExample + objectAttribute, labelAttribute)).toBe(standaloneText);
    });

    it('should check link attribute', () => {
        checkAttributeValueTrue(linkExample + objectAttribute, linkAttribute);
    });

    it('should check link text', () => {
        checkElementTextValue(linkExample + objectLinkAttribute, linkText);
    });

    it('check disabled link', () => {
        expect(getAttributeByName(linkExample + objectAttribute, disabledAttribute, 2)).toBe('true');
    });

    it('should check orientation', () => {
        objectAttributePage.checkRtlSwitch();
    });

    it('check visual regression', () => {
        objectAttributePage.saveExampleBaselineScreenshot('object-attribute');
        expect(objectAttributePage.compareWithBaseline('object-attribute')).toBeLessThan(1);
    });
});
