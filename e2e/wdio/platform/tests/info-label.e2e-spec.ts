import { InfoLabelPO } from '../pages/info-label.po';
import {
    ariaLabelExample,
    ariaLabelledByAttribute,
    ariaSuccessLabel,
    cssAlignmentAttribute,
    decimalLabel,
    defaultLabelText,
    infoLabelText,
    labelContentAlignmentCenter,
    labelContentAlignmentStart,
    labelIconAttribute,
    labelIconAttributeValue,
    largeNumberLabel,
    numberLabel,
    safariAriaLabelExample,
    safariAriaSuccessLabel,
    safariIconInfoLabelText,
    safariInfoLabelText,
    safariLargeNumberLabel
} from '../fixtures/appData/info-label-page-contents';
import {
    browserIsSafari,
    elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementAriaLabel,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Info Label component test suite', () => {
    const {
        defaultLabel,
        labelsWithTextArr,
        labelsWithTextAndIconArr,
        labelsIconArr,
        labelsWithNumberOrIconArr,
        accessibilityLabelsArr
    } = new InfoLabelPO();
    const infoLabelPage = new InfoLabelPO();

    beforeAll(() => {
        infoLabelPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(infoLabelPage.root);
        waitForPresent(infoLabelPage.title);
    }, 1);

    it('should check default label info', () => {
        expect(getText(defaultLabel).toLowerCase()).toEqual(defaultLabelText.toLowerCase());
        expect(getCSSPropertyByName(defaultLabel, cssAlignmentAttribute).value).toEqual(labelContentAlignmentCenter);
    });

    it('should check info label with text', () => {
        const labelsArr = elementArray(labelsWithTextArr);
        if (browserIsSafari()) {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector).toLowerCase()).toEqual(safariInfoLabelText.toLowerCase());
                expect(getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i).value).toEqual(
                    labelContentAlignmentCenter
                );
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                expect(getText(labelsArr[i].selector).toLowerCase()).toEqual(infoLabelText.toLowerCase());
                expect(getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i).value).toEqual(
                    labelContentAlignmentCenter
                );
            }
        }
    });

    it('should check info label with text and icon', () => {
        const labelsWithIconsArr = elementArray(labelsWithTextAndIconArr);
        const labelIconsArr = elementArray(labelsIconArr);

        if (browserIsSafari()) {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i).toLowerCase()).toEqual(
                    safariIconInfoLabelText.toLowerCase()
                );
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i).value).toEqual(
                    labelContentAlignmentStart
                );
                expect(getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i)).toBe(
                    labelIconAttributeValue,
                    `failed with index ${i}`
                );
            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                expect(getText(labelsWithTextAndIconArr, i).toLowerCase()).toEqual(infoLabelText.toLowerCase());
                expect(getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i).value).toEqual(
                    labelContentAlignmentStart
                );
                expect(getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i)).toBe(
                    labelIconAttributeValue
                );
            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                expect(waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', () => {
        if (browserIsSafari()) {
            expect(getText(labelsWithNumberOrIconArr, 1).toLowerCase()).toEqual(safariLargeNumberLabel.toLowerCase());
            expect(getText(labelsWithNumberOrIconArr, 0).toLowerCase()).toEqual(numberLabel.toLowerCase());
            expect(getText(labelsWithNumberOrIconArr, 2).toLowerCase()).toEqual(decimalLabel.toLowerCase());
            expect(getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3)).toEqual(
                labelIconAttributeValue
            );
        } else {
            expect(getText(labelsWithNumberOrIconArr, 1).toLowerCase()).toEqual(largeNumberLabel.toLowerCase());
            expect(getText(labelsWithNumberOrIconArr, 0).toLowerCase()).toEqual(numberLabel.toLowerCase());
            expect(getText(labelsWithNumberOrIconArr, 2).toLowerCase()).toEqual(decimalLabel.toLowerCase());
            expect(getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3)).toEqual(
                labelIconAttributeValue
            );
        }
    });

    it('should check info label with aria label for accessibility', () => {
        if (browserIsSafari()) {
            expect(getElementAriaLabel(accessibilityLabelsArr)).not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1)).not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0).toLowerCase()).toEqual(safariAriaLabelExample.toLowerCase());
            expect(getText(accessibilityLabelsArr, 1).toLowerCase()).toEqual(safariAriaSuccessLabel.toLowerCase());
        } else {
            expect(getElementAriaLabel(accessibilityLabelsArr)).not.toBe(null);
            expect(getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1)).not.toBe(null);

            expect(getText(accessibilityLabelsArr, 0).toLowerCase()).toEqual(ariaLabelExample.toLowerCase());
            expect(getText(accessibilityLabelsArr, 1).toLowerCase()).toEqual(ariaSuccessLabel.toLowerCase());
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
