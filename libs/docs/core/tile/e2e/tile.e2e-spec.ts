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

    beforeAll(() => {
        tilePage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(tilePage.root);
        waitForElDisplayed(tilePage.title);
    }, 1);

    it('should check that tile clickable', () => {
        for (let i = 0; i < tile.length; i++) {
            expect(isElementClickable(tile, i)).toBe(true, `tile with index ${i} is not clickable`);
        }
    });

    it('should check size in default example', () => {
        expect(getAttributeByName(launchTile, 'size', 1)).toBe('s');
        expect(getAttributeByName(launchTile, 'size', 3)).toBe('s');
    });

    it('should check launch example', () => {
        checkTileType(launchExample, 'launch');
    });

    it('should check kpi example', () => {
        checkTileType(kpiExample, 'kpi');
    });

    it('should check feed example', () => {
        checkTileType(feedExample, 'feed');
    });

    it('should check size of kpi example', () => {
        expect(getAttributeByName(kpiNumericContent, 'size', 2)).toBe('m');
        expect(getAttributeByName(kpiNumericContent, 'size', 3)).toBe('m');
        expect(getAttributeByName(kpiNumericContent, 'size', 4)).toBe('s');
        expect(getAttributeByName(kpiNumericContent, 'size', 5)).toBe('s');
    });

    it('should check action example', () => {
        expect(getElementClass(actionExample + tile)).toContain('action');
        expect(isElementClickable(closeButton)).toBe(true, 'close button is not clickable');
        expect(isElementClickable(moreButton)).toBe(true, 'more button is not clickable');
    });

    it('should check badge in badge example', () => {
        expect(isElementDisplayed(bagdeExample + tile + badge)).toBe(true, 'badge lable is not displayed');
    });

    it('should check two columns in columns example', () => {
        expect(getElementClass(columnsTileHeader)).toContain('2-col');
        expect(getElementClass(columnsTileContent)).toContain('2-col');
        expect(getElementClass(columnsTileFooter)).toContain('2-col');
    });

    xit('should check visual regression for all examples', () => {
        tilePage.saveExampleBaselineScreenshot();
        expect(tilePage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check RTL and LTR orientation', () => {
        tilePage.checkRtlSwitch();
    });

    function checkTileType(section: string, type: string): void {
        const length = getElementArrayLength(section + fdTile);
        for (let i = 0; i < length; i++) {
            expect(getAttributeByName(section + fdTile, 'type', i)).toBe(type);
        }
    }
});
