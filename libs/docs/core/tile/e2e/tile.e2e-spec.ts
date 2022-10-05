import { TilePo } from './tile.po';
import {
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Tile component test', () => {
    const tilePage = new TilePo();
    const {
        tile,
        fdTile,
        launchExample,
        kpiExample,
        feedExample,
        actionExample,
        closeButton,
        moreButton,
        bagdeExample,
        badge,
        columnsTileContent,
        columnsTileFooter,
        columnsTileHeader,
        kpiNumericContent,
        launchTile
    } = tilePage;

    beforeAll(async () => {
        await tilePage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(tilePage.root);
        await waitForElDisplayed(tilePage.title);
    }, 1);

    it('should check that tile clickable', async () => {
        for (let i = 0; i < tile.length; i++) {
            await expect(await isElementClickable(tile, i)).toBe(true, `tile with index ${i} is not clickable`);
        }
    });

    it('should check size in default example', async () => {
        await expect(await getAttributeByName(launchTile, 'size', 1)).toBe('s');
        await expect(await getAttributeByName(launchTile, 'size', 3)).toBe('s');
    });

    it('should check launch example', async () => {
        await checkTileType(launchExample, 'launch');
    });

    it('should check kpi example', async () => {
        await checkTileType(kpiExample, 'kpi');
    });

    it('should check feed example', async () => {
        await checkTileType(feedExample, 'feed');
    });

    it('should check size of kpi example', async () => {
        await expect(await getAttributeByName(kpiNumericContent, 'size', 2)).toBe('m');
        await expect(await getAttributeByName(kpiNumericContent, 'size', 3)).toBe('m');
        await expect(await getAttributeByName(kpiNumericContent, 'size', 4)).toBe('s');
        await expect(await getAttributeByName(kpiNumericContent, 'size', 5)).toBe('s');
    });

    it('should check action example', async () => {
        await expect(await getElementClass(actionExample + tile)).toContain('action');
        await expect(await isElementClickable(closeButton)).toBe(true, 'close button is not clickable');
        await expect(await isElementClickable(moreButton)).toBe(true, 'more button is not clickable');
    });

    it('should check badge in badge example', async () => {
        await expect(await isElementDisplayed(bagdeExample + tile + badge)).toBe(true, 'badge lable is not displayed');
    });

    it('should check two columns in columns example', async () => {
        await expect(await getElementClass(columnsTileHeader)).toContain('2-col');
        await expect(await getElementClass(columnsTileContent)).toContain('2-col');
        await expect(await getElementClass(columnsTileFooter)).toContain('2-col');
    });

    xit('should check visual regression for all examples', async () => {
        await tilePage.saveExampleBaselineScreenshot();
        await expect(await tilePage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check RTL and LTR orientation', async () => {
        await tilePage.checkRtlSwitch();
    });

    async function checkTileType(section: string, type: string): Promise<void> {
        const length = await getElementArrayLength(section + fdTile);
        for (let i = 0; i < length; i++) {
            await expect(await getAttributeByName(section + fdTile, 'type', i)).toBe(type);
        }
    }
});
