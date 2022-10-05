import { PanelPo } from './panel.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Panel test suite', () => {
    const panelPage = new PanelPo();
    const { toggleButton, panelExpandableButton, panelParagraphs, expandableButton, compactPanelButton, panelTitle } =
        panelPage;

    beforeAll(async () => {
        await panelPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(panelPage.root);
        await waitForElDisplayed(panelPage.title);
    }, 1);

    it('should check orientation', async () => {
        await panelPage.checkRtlSwitch();
    });

    it('should check Expandable Panel example', async () => {
        await scrollIntoView(toggleButton);
        await click(toggleButton);
        await expect(await getAttributeByName(expandableButton, 'aria-expanded')).toBe('false');

        await click(panelExpandableButton);
        await expect(await isElementDisplayed(panelParagraphs)).toBe(true, `paragraph not displayed`);
    });

    it('should check Fixed Panel example', async () => {
        await scrollIntoView(panelParagraphs, 1);
        await expect(await isElementDisplayed(panelParagraphs, 1)).toBe(true, `paragraph not displayed`);
    });

    it('should check Compact Panel example', async () => {
        await scrollIntoView(compactPanelButton);
        await click(compactPanelButton);
        await expect(await isElementDisplayed(panelParagraphs, 2)).toBe(true, `paragraph not displayed`);
    });

    it('should check Fixed Height Content Panel', async () => {
        await scrollIntoView(panelParagraphs, 2);
        await expect(await isElementDisplayed(panelParagraphs, 2)).toBe(true, `paragraph not displayed`);
    });

    it('should check compact button be smaller than basic button', async () => {
        const expandableBtnSize = await getElementSize(panelExpandableButton);
        const compactBtnSize = await getElementSize(compactPanelButton);

        await expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        await expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should check component have titles', async () => {
        const titleLength = await getElementArrayLength(panelTitle);
        const testTitleText = 'Panel Header';
        for (let i = 0; i < titleLength; i++) {
            await scrollIntoView(panelTitle, i);
            await expect(await getText(panelTitle, i)).toBe(testTitleText);
        }
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await panelPage.saveExampleBaselineScreenshot();
            await expect(await panelPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
