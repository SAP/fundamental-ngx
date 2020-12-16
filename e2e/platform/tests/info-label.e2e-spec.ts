import { InfoLabelPO } from '../pages/info-label.po';
import InfoLabelData, { semanticColorsArr } from '../fixtures/appData/info-label-page-contents';
import { browser } from 'protractor';
import { getText, getValueOfAttribute, waitForVisible } from '../../helper/helper';
import { config } from '../../../protractor-ci.conf';

describe('Info Label component test suite', () => {
    const infoLabelPage = new InfoLabelPO();

    beforeAll(async () => {
        await infoLabelPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    it('should check default label info', async () => {
        if (config.browserName === 'safari') {
            await expect(await getText(infoLabelPage.defaultLabel)).toEqual(InfoLabelData.safariDefaultLabelText);
        } else {
            await expect(await getText(infoLabelPage.defaultLabel)).toEqual(InfoLabelData.defaultLabelText);
        }
        await expect(await infoLabelPage.defaultLabel.getCssValue(InfoLabelData.cssAlignmentAttribute))
            .toEqual(InfoLabelData.labelContentAlignment);
    });

    it('should check info label with text', async () => {
        const labelsArr = await infoLabelPage.labelsWithTextArr;

        // if (config.browserName === 'safari') {
        //     await labelsArr.forEach(async element => {
        //         await expect(await getText(element)).toEqual(InfoLabelData.safariInfoLabelText);
        //     });
        // } else {
            await labelsArr.forEach(async element => {
                await expect(await getText(element)).toEqual(InfoLabelData.infoLabelText);
            });
       // }

        await labelsArr.forEach(async (element, index) => {
            await expect(await element.getCssValue(InfoLabelData.backgroundColor)).toContain(semanticColorsArr[index].value);
        });

        await labelsArr.forEach(async element => {
            await expect(await element.getCssValue(InfoLabelData.cssAlignmentAttribute)).toEqual(InfoLabelData.labelContentAlignment);
        });
    });

    it('should check info label with text and icon', async () => {
        const labelsWithIconsArr = await infoLabelPage.labelsWithTextAndIconArr;
        const labelIconsArr = await infoLabelPage.labelsIconArr;

        await labelsWithIconsArr.forEach(async element => {
            await expect(await getText(element)).toEqual(InfoLabelData.infoLabelText);
        });

        await labelsWithIconsArr.forEach(async (element, index) => {
            await expect(await element.getCssValue(InfoLabelData.backgroundColor)).toContain(semanticColorsArr[index].value);
        });

        await labelsWithIconsArr.forEach(async element => {
            await expect(await element.getCssValue(InfoLabelData.cssAlignmentAttribute)).toEqual(InfoLabelData.labelContentAlignment);
        });

        await labelsWithIconsArr.forEach(async element => {
            await expect(await getValueOfAttribute(element, InfoLabelData.labelIconAttribute))
                .toEqual(InfoLabelData.labelIconAttributeValue);
        });

        await labelIconsArr.forEach(async element => {
            await expect(waitForVisible(element)).toBe(true);
        });
    });

    it('should check info label with a number or an icon', async () => {
        const labelsWithNumbersArr = await infoLabelPage.labelsWithNumberOrIconArr;

        if (config.browserName === 'safari') {
            await expect(await getText(labelsWithNumbersArr[1])).toEqual(InfoLabelData.safariLargeNumberLabel);
        } else {
            await expect(await getText(labelsWithNumbersArr[1])).toEqual(InfoLabelData.largeNumberLabel);
        }

        await expect(await getText(labelsWithNumbersArr[0])).toEqual(InfoLabelData.numberLabel);
        await expect(await getText(labelsWithNumbersArr[2])).toEqual(InfoLabelData.decimalLabel);
        await expect(await getValueOfAttribute(labelsWithNumbersArr[3], InfoLabelData.labelIconAttribute))
            .toEqual(InfoLabelData.labelIconAttributeValue);
    });

    it('should check info label with aria label for accessibility', async () => {
        const ariaLabelsArr = await infoLabelPage.accessibilityLabelsArr;
        const ariaAttrArr = await infoLabelPage.accessibilityAttrArr;

        await expect(await getValueOfAttribute(ariaLabelsArr[0], InfoLabelData.ariaLabelAttribute)).not.toBe(null);
        await expect(await getValueOfAttribute(ariaLabelsArr[1], InfoLabelData.ariaLabelledByAttribute)).not.toBe(null);
        await expect(await getText(ariaLabelsArr[0])).toEqual(InfoLabelData.ariaLabelExample);
        await expect(await getText(ariaLabelsArr[1])).toEqual(InfoLabelData.ariaSuccessLabel);

        await ariaAttrArr.forEach(async element => {
           await expect(await element.getCssValue(InfoLabelData.backgroundColor)).toContain(semanticColorsArr[1].value)
        });
    });

    it('should check LTR orientation', async () => {
        const areaContainersArray = await infoLabelPage.exampleAreaContainersArr;

        areaContainersArray.forEach(element => {
            expect(element.getCssValue('direction')).toBe('ltr', 'css prop direction ');
        });
    });

    it('should check RTL orientation', async () => {
        await infoLabelPage.exampleAreaContainersArr.each(async (area, index) => {
            expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
            expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
            await infoLabelPage.rtlSwitcherArr.get(index).click();
            expect(await area.getCssValue('direction')).toBe('rtl');
            expect(await area.getAttribute('dir')).toBe('rtl');
        });
    });
});
