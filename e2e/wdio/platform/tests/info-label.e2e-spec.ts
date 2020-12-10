import { InfoLabelPO } from '../pages/info-label.po';
import InfoLabelData, { semanticColorsArr } from '../fixtures/appData/info-label-page-contents';
import { webDriver } from '../../driver/wdio';

describe('Info Label component test suite', () => {
    const infoLabelPage = new InfoLabelPO();

    beforeEach(() => {
        infoLabelPage.open();
    });

    it('should check default label info', () => {
        if (browser.capabilities.browserName === 'Safari') {
            expect(webDriver.getText(infoLabelPage.defaultLabel)).toEqual(InfoLabelData.safariDefaultLabelText);
            expect(webDriver.getCSSPropertyByName(infoLabelPage.defaultLabel, InfoLabelData.cssAlignmentAttribute).value)
                .toEqual(InfoLabelData.labelContentAlignment);
        } else {
            expect(webDriver.getText(infoLabelPage.defaultLabel)).toEqual(InfoLabelData.defaultLabelText);
            expect(webDriver.getCSSPropertyByName(infoLabelPage.defaultLabel, InfoLabelData.cssAlignmentAttribute).value)
                .toEqual(InfoLabelData.labelContentAlignment);
        }
    });

    it('should check info label with text', () => {
        const labelsArr = webDriver.elementArray(infoLabelPage.labelsWithTextArr);
        if (browser.capabilities.browserName === 'Safari') {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(webDriver.getText(labelsArr[i].selector)).toEqual(InfoLabelData.safariInfoLabelText);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(webDriver.getText(labelsArr[i].selector)).toEqual(InfoLabelData.infoLabelText);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        }
    });

    it('should check info label with text and icon', () => {
        const labelsWithIconsArr = webDriver.elementArray(infoLabelPage.labelsWithTextAndIconArr);
        const labelIconsArr = webDriver.elementArray(infoLabelPage.labelsIconArr);

        if (browser.capabilities.browserName === 'Safari') {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(webDriver.getText(infoLabelPage.labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.safariIconInfoLabelText);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(webDriver.getAttributeByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(webDriver.waitForDisplayed(infoLabelPage.labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(webDriver.getText(infoLabelPage.labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.infoLabelText);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(webDriver.getCSSPropertyByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(webDriver.getAttributeByName(infoLabelPage.labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(webDriver.waitForDisplayed(infoLabelPage.labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', () => {
        if (browser.capabilities.browserName === 'Safari') {

            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.safariLargeNumberLabel);
            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(webDriver.getAttributeByName(infoLabelPage.labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        } else {
            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.largeNumberLabel);
            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(webDriver.getText(infoLabelPage.labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(webDriver.getAttributeByName(infoLabelPage.labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        }
    });

    it('should check info label with aria label for accessibility', () => {
        const ariaAttrArr = webDriver.elementArray(infoLabelPage.accessibilityAttrArr);

        if (browser.capabilities.browserName === 'Safari') {
            expect(webDriver.getAttributeByName(infoLabelPage.accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(webDriver.getAttributeByName(infoLabelPage.accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(webDriver.getText(infoLabelPage.accessibilityLabelsArr, 0)).toEqual(InfoLabelData.safariAriaLabelExample);
            expect(webDriver.getText(infoLabelPage.accessibilityLabelsArr, 1)).toEqual(InfoLabelData.safariAriaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(webDriver.getCSSPropertyByName(infoLabelPage.accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        } else {
            expect(webDriver.getAttributeByName(infoLabelPage.accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(webDriver.getAttributeByName(infoLabelPage.accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(webDriver.getText(infoLabelPage.accessibilityLabelsArr, 0)).toEqual(InfoLabelData.ariaLabelExample);
            expect(webDriver.getText(infoLabelPage.accessibilityLabelsArr, 1)).toEqual(InfoLabelData.ariaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(webDriver.getCSSPropertyByName(infoLabelPage.accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        }
    });

    it('should check LTR and RTL orientation', () => {
        infoLabelPage.checkRtlSwitch();
    });
});
