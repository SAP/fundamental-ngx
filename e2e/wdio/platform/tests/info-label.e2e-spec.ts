import { InfoLabelPO } from '../pages/info-label.po';
import InfoLabelData, { semanticColorsArr } from '../fixtures/appData/info-label-page-contents';
import { webDriver } from '../../driver/wdio';

describe('Info Label component test suite', () => {
    const {
        defaultLabel,
        labelsWithTextArr,
        labelsWithTextAndIconArr,
        labelsIconArr,
        labelsWithNumberOrIconArr,
        accessibilityLabelsArr,
        accessibilityAttrArr,
        checkRtlSwitch
    } = new InfoLabelPO();
    const infoLabelPage = new InfoLabelPO();

    beforeEach(() => {
        infoLabelPage.open();
    });

    it('should check default label info', () => {
            expect(webDriver.getText(defaultLabel).toLowerCase()).toEqual(InfoLabelData.defaultLabelText.toLowerCase());
            expect(webDriver.getCSSPropertyByName(defaultLabel, InfoLabelData.cssAlignmentAttribute).value)
                .toEqual(InfoLabelData.labelContentAlignment);
    });

    it('should check info label with text', () => {
        const labelsArr = webDriver.elementArray(labelsWithTextArr);
        if (webDriver.isBrowser('Safari')) {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(webDriver.getText(labelsArr[i].selector)).toEqual(InfoLabelData.safariInfoLabelText);
                expect(webDriver.getCSSPropertyByName(labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(webDriver.getText(labelsArr[i].selector)).toEqual(InfoLabelData.infoLabelText);
                expect(webDriver.getCSSPropertyByName(labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        }
    });

    it('should check info label with text and icon', () => {
        const labelsWithIconsArr = webDriver.elementArray(labelsWithTextAndIconArr);
        const labelIconsArr = webDriver.elementArray(labelsIconArr);

        if (webDriver.isBrowser('Safari')) {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(webDriver.getText(labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.safariIconInfoLabelText);
                expect(webDriver.getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(webDriver.getAttributeByName(labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(webDriver.waitForDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(webDriver.getText(labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.infoLabelText);
                expect(webDriver.getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(webDriver.getAttributeByName(labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(webDriver.waitForDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', () => {
        if (webDriver.isBrowser('Safari')) {

            expect(webDriver.getText(labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.safariLargeNumberLabel);
            expect(webDriver.getText(labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(webDriver.getText(labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(webDriver.getAttributeByName(labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        } else {
            expect(webDriver.getText(labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.largeNumberLabel);
            expect(webDriver.getText(labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(webDriver.getText(labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(webDriver.getAttributeByName(labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        }
    });

    it('should check info label with aria label for accessibility', () => {
        const ariaAttrArr = webDriver.elementArray(accessibilityAttrArr);

        if (webDriver.isBrowser('Safari')) {
            expect(webDriver.getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(webDriver.getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(webDriver.getText(accessibilityLabelsArr, 0)).toEqual(InfoLabelData.safariAriaLabelExample);
            expect(webDriver.getText(accessibilityLabelsArr, 1)).toEqual(InfoLabelData.safariAriaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(webDriver.getCSSPropertyByName(accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        } else {
            expect(webDriver.getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(webDriver.getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(webDriver.getText(accessibilityLabelsArr, 0)).toEqual(InfoLabelData.ariaLabelExample);
            expect(webDriver.getText(accessibilityLabelsArr, 1)).toEqual(InfoLabelData.ariaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(webDriver.getCSSPropertyByName(accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        }
    });

    it('should check LTR and RTL orientation', () => {
        checkRtlSwitch();
    });
});
