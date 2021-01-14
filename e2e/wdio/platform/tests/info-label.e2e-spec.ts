import { InfoLabelPO } from '../pages/info-label.po';
import InfoLabelData, { semanticColorsArr } from '../fixtures/appData/info-label-page-contents';
import {
    browserIsSafari,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getText,
    waitForElDisplayed
} from '../../driver/wdio';

describe('Info Label component test suite', () => {
    const {
        defaultLabel,
        labelsWithTextArr,
        labelsWithTextAndIconArr,
        labelsIconArr,
        labelsWithNumberOrIconArr,
        accessibilityLabelsArr,
        accessibilityAttrArr,
    } = new InfoLabelPO();
    const infoLabelPage = new InfoLabelPO();

    beforeEach(() => {
        infoLabelPage.open();
    }, 1);

    it('should check default label info', () => {
        expect(getText(defaultLabel).toLowerCase()).toEqual(InfoLabelData.defaultLabelText.toLowerCase());
        expect(getCSSPropertyByName(defaultLabel, InfoLabelData.cssAlignmentAttribute).value)
            .toEqual(InfoLabelData.labelContentAlignment);
    });

    it('should check info label with text', () => {
        const labelsArr = elementArray(labelsWithTextArr);
        if (browserIsSafari()) {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector)).toEqual(InfoLabelData.safariInfoLabelText);
                expect(getCSSPropertyByName(labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector)).toEqual(InfoLabelData.infoLabelText);
                expect(getCSSPropertyByName(labelsWithTextArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
            }
        }
    });

    it('should check info label with text and icon', () => {
        const labelsWithIconsArr = elementArray(labelsWithTextAndIconArr);
        const labelIconsArr = elementArray(labelsIconArr);

        if (browserIsSafari()) {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.safariIconInfoLabelText);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(getAttributeByName(labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i)).toEqual(InfoLabelData.infoLabelText);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[i].value);
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, InfoLabelData.cssAlignmentAttribute, i).value)
                    .toEqual(InfoLabelData.labelContentAlignment);
                expect(getAttributeByName(labelsWithTextAndIconArr, InfoLabelData.labelIconAttribute, i))
                    .toBe(InfoLabelData.labelIconAttributeValue);

            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', () => {
        if (browserIsSafari()) {

            expect(getText(labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.safariLargeNumberLabel);
            expect(getText(labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(getText(labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(getAttributeByName(labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        } else {
            expect(getText(labelsWithNumberOrIconArr, 1)).toEqual(InfoLabelData.largeNumberLabel);
            expect(getText(labelsWithNumberOrIconArr, 0)).toEqual(InfoLabelData.numberLabel);
            expect(getText(labelsWithNumberOrIconArr, 2)).toEqual(InfoLabelData.decimalLabel);
            expect(getAttributeByName(labelsWithNumberOrIconArr, InfoLabelData.labelIconAttribute, 3))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        }
    });

    it('should check info label with aria label for accessibility', () => {
        const ariaAttrArr = elementArray(accessibilityAttrArr);

        if (browserIsSafari()) {
            expect(getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0)).toEqual(InfoLabelData.safariAriaLabelExample);
            expect(getText(accessibilityLabelsArr, 1)).toEqual(InfoLabelData.safariAriaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(getCSSPropertyByName(accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        } else {
            expect(getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelAttribute, 0))
                .not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, InfoLabelData.ariaLabelledByAttribute, 1))
                .not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0)).toEqual(InfoLabelData.ariaLabelExample);
            expect(getText(accessibilityLabelsArr, 1)).toEqual(InfoLabelData.ariaSuccessLabel);

            for (let i = 0; i < ariaAttrArr.length; i++) {
                expect(getCSSPropertyByName(accessibilityAttrArr, InfoLabelData.backgroundColor, i).value)
                    .toContain(semanticColorsArr[1].value);
            }
        }
    });

    it('should check LTR and RTL orientation', () => {
        infoLabelPage.checkRtlSwitch();
    });
});
