import { InfoLabelPO } from './info-label.po';
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
} from './info-label-page-contents';
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
} from '../../../../../e2e';

// TODO: https://github.com/SAP/fundamental-ngx/issues/8798
xdescribe('Info Label component test suite', () => {
    const {
        defaultLabel,
        labelsWithTextArr,
        labelsWithTextAndIconArr,
        labelsIconArr,
        labelsWithNumberOrIconArr,
        accessibilityLabelsArr
    } = new InfoLabelPO();
    const infoLabelPage = new InfoLabelPO();

    beforeAll(async () => {
        await infoLabelPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(infoLabelPage.root);
        await waitForPresent(infoLabelPage.title);
    }, 1);

    it('should check default label info', async () => {
        await expect((await getText(defaultLabel)).toLowerCase()).toEqual(defaultLabelText.toLowerCase());
        await expect((await getCSSPropertyByName(defaultLabel, cssAlignmentAttribute)).value).toEqual(
            labelContentAlignmentCenter
        );
    });

    it('should check info label with text', async () => {
        const labelsArr = await elementArray(labelsWithTextArr);
        if (await browserIsSafari()) {
            for (let i = 0; i < labelsArr.length; i++) {
                await expect((await getText(await labelsArr[i].selector)).toLowerCase()).toEqual(
                    safariInfoLabelText.toLowerCase()
                );
                await expect((await getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i)).value).toEqual(
                    labelContentAlignmentCenter
                );
            }
        } else {
            for (let i = 0; i < labelsArr.length; i++) {
                await expect((await getText(await labelsArr[i].selector)).toLowerCase()).toEqual(
                    infoLabelText.toLowerCase()
                );
                await expect((await getCSSPropertyByName(labelsWithTextArr, cssAlignmentAttribute, i)).value).toEqual(
                    labelContentAlignmentCenter
                );
            }
        }
    });

    it('should check info label with text and icon', async () => {
        const labelsWithIconsArr = await elementArray(labelsWithTextAndIconArr);
        const labelIconsArr = await elementArray(labelsIconArr);

        if (await browserIsSafari()) {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                await expect((await getText(labelsWithTextAndIconArr, i)).toLowerCase()).toEqual(
                    safariIconInfoLabelText.toLowerCase()
                );
                await expect(
                    (
                        await getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i)
                    ).value
                ).toEqual(labelContentAlignmentStart);
                await expect(await getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i)).toBe(
                    labelIconAttributeValue,
                    `failed with index ${i}`
                );
            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                await expect(await waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        } else {
            for (let i = 0; i < labelsWithIconsArr.length; i++) {
                await expect((await getText(labelsWithTextAndIconArr, i)).toLowerCase()).toEqual(
                    infoLabelText.toLowerCase()
                );
                await expect(
                    (
                        await getCSSPropertyByName(labelsWithTextAndIconArr, cssAlignmentAttribute, i)
                    ).value
                ).toEqual(labelContentAlignmentStart);
                await expect(await getAttributeByName(labelsWithTextAndIconArr, labelIconAttribute, i)).toBe(
                    labelIconAttributeValue
                );
            }
            for (let i = 0; i < labelIconsArr.length; i++) {
                await expect(await waitForElDisplayed(labelsWithTextAndIconArr, i)).toBe(true);
            }
        }
    });

    it('should check info label with a number or an icon', async () => {
        if (await browserIsSafari()) {
            await expect((await getText(labelsWithNumberOrIconArr, 1)).toLowerCase()).toEqual(
                safariLargeNumberLabel.toLowerCase()
            );
            await expect((await getText(labelsWithNumberOrIconArr, 0)).toLowerCase()).toEqual(
                numberLabel.toLowerCase()
            );
            await expect((await getText(labelsWithNumberOrIconArr, 2)).toLowerCase()).toEqual(
                decimalLabel.toLowerCase()
            );
            await expect(await getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3)).toEqual(
                labelIconAttributeValue
            );
        } else {
            await expect((await getText(labelsWithNumberOrIconArr, 1)).toLowerCase()).toEqual(
                largeNumberLabel.toLowerCase()
            );
            await expect((await getText(labelsWithNumberOrIconArr, 0)).toLowerCase()).toEqual(
                numberLabel.toLowerCase()
            );
            await expect((await getText(labelsWithNumberOrIconArr, 2)).toLowerCase()).toEqual(
                decimalLabel.toLowerCase()
            );
            await expect(await getAttributeByName(labelsWithNumberOrIconArr, labelIconAttribute, 3)).toEqual(
                labelIconAttributeValue
            );
        }
    });

    it('should check info label with aria label for accessibility', async () => {
        if (await browserIsSafari()) {
            await expect(await getElementAriaLabel(accessibilityLabelsArr)).not.toBe('');
            await expect(await getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1)).not.toBe('');

            await expect((await getText(accessibilityLabelsArr, 0)).toLowerCase()).toEqual(
                safariAriaLabelExample.toLowerCase()
            );
            await expect((await getText(accessibilityLabelsArr, 1)).toLowerCase()).toEqual(
                safariAriaSuccessLabel.toLowerCase()
            );
        } else {
            await expect(await getElementAriaLabel(accessibilityLabelsArr)).not.toBe('');
            await expect(await getAttributeByName(accessibilityLabelsArr, ariaLabelledByAttribute, 1)).not.toBe('');

            await expect((await getText(accessibilityLabelsArr, 0)).toLowerCase()).toEqual(
                ariaLabelExample.toLowerCase()
            );
            await expect((await getText(accessibilityLabelsArr, 1)).toLowerCase()).toEqual(
                ariaSuccessLabel.toLowerCase()
            );
        }
    });

    it('should check LTR and RTL orientation', async () => {
        await infoLabelPage.checkRtlSwitch();
    });

    xit('should check examples basic visual regression', async () => {
        await infoLabelPage.saveExampleBaselineScreenshot();
        await expect(await infoLabelPage.compareWithBaseline()).toBeLessThan(5);
    });
});
