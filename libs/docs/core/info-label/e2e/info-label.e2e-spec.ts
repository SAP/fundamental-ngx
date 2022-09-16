import { getElementArrayLength, getElementClass, isElementDisplayed } from '../../../../../e2e';
import { InfoLabelPo } from './info-label.po';
import { colorsArr } from './info-label-contents';

describe('Info Label component test suite', () => {
    const infoLabelPage = new InfoLabelPo();
    const { infoLabel, textExample, iconTextExample, icon, labelText } = infoLabelPage;

    beforeAll(() => {
        infoLabelPage.open();
    }, 2);

    it('should check that all info labels are displayed', () => {
        const labelsLength = getElementArrayLength(infoLabel);
        for (let i = 0; i < labelsLength; i++) {
            expect(isElementDisplayed(infoLabel, i)).toBe(true);
        }
    });

    it('should check that labels have different colors', () => {
        const labelsLength = getElementArrayLength(textExample + infoLabel);
        for (let i = 0; i < labelsLength; i++) {
            expect(getElementClass(infoLabel, i)).toContain(colorsArr[i]);
        }
    });

    it('should check that all labels have icons in icon-text example', () => {
        const iconsLength = getElementArrayLength(iconTextExample + icon);
        const labelsLength = getElementArrayLength(iconTextExample + infoLabel);

        expect(iconsLength).toBe(labelsLength);
    });

    it('should check that all labels have text in icon-text example', () => {
        const labelTextLength = getElementArrayLength(iconTextExample + labelText);
        const labelsLength = getElementArrayLength(iconTextExample + infoLabel);

        expect(labelTextLength).toBe(labelsLength);
    });

    it('should check that all icons are displayed in icon-text example', () => {
        const iconsLength = getElementArrayLength(iconTextExample + icon);
        for (let i = 0; i < iconsLength; i++) {
            expect(isElementDisplayed(icon, i)).toBe(true);
        }
    });

    it('should check LTR and RTL orientation', () => {
        infoLabelPage.checkRtlSwitch();
    });

    xit('should check examples basic visual regression', () => {
        infoLabelPage.saveExampleBaselineScreenshot();
        expect(infoLabelPage.compareWithBaseline()).toBeLessThan(5);
    });
});
