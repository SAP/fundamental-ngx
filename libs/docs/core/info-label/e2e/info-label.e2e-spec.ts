import { getElementArrayLength, getElementClass, isElementDisplayed } from '../../../../../e2e';
import { InfoLabelPo } from './info-label.po';
import { colorsArr } from './info-label-contents';

describe('Info Label component test suite', () => {
    const infoLabelPage = new InfoLabelPo();
    const { infoLabel, textExample, iconTextExample, icon, labelText } = infoLabelPage;

    beforeAll(async () => {
        await infoLabelPage.open();
    }, 2);

    it('should check that all info labels are displayed', async () => {
        const labelsLength = await getElementArrayLength(infoLabel);
        for (let i = 0; i < labelsLength; i++) {
            await expect(await isElementDisplayed(infoLabel, i)).toBe(true);
        }
    });

    it('should check that labels have different colors', async () => {
        const labelsLength = await getElementArrayLength(textExample + infoLabel);
        for (let i = 0; i < labelsLength; i++) {
            await expect(await getElementClass(infoLabel, i)).toContain(colorsArr[i]);
        }
    });

    it('should check that all labels have icons in icon-text example', async () => {
        const iconsLength = await getElementArrayLength(iconTextExample + icon);
        const labelsLength = await getElementArrayLength(iconTextExample + infoLabel);

        await expect(iconsLength).toBe(labelsLength);
    });

    it('should check that all labels have text in icon-text example', async () => {
        const labelTextLength = await getElementArrayLength(iconTextExample + labelText);
        const labelsLength = await getElementArrayLength(iconTextExample + infoLabel);

        await expect(labelTextLength).toBe(labelsLength);
    });

    it('should check that all icons are displayed in icon-text example', async () => {
        const iconsLength = await getElementArrayLength(iconTextExample + icon);
        for (let i = 0; i < iconsLength; i++) {
            await expect(await isElementDisplayed(icon, i)).toBe(true);
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
