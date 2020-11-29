import { PanelPo } from '../pages/panel.po';
import panelPageContent from '../fixtures/appData/panel-page-content';
import { webDriver } from '../../driver/wdio';

describe('Verify Panel', () => {
    const panelPage = new PanelPo();

    beforeEach(() => {
        panelPage.open();
    });

    it('should have fixed header', () => {
        // Checks that fixed panel has no expand button
        expect(webDriver.waitForPresent(panelPage.fixedPanelDescription)).toBe(true);
    });

    it('should be expandable', () => {
        const isVisibleContentBefore = webDriver.waitForDisplayed(panelPage.expandablePanelContent);
        webDriver.click(panelPage.expandablePanelBtn);
        const isInvisibleVisibleContentAfter = webDriver.waitForNotDisplayed(panelPage.expandablePanelContent);

        expect(isVisibleContentBefore).toBe(true);
        expect(isInvisibleVisibleContentAfter).toBe(true);
        expect(webDriver.getText(panelPage.expandablePanelTitle)).toBe(panelPageContent.expandable_panel_header);
    });

    it('should compact be smaller than basic', () => {
        const expandableBtnSize = webDriver.getElementSize(panelPage.expandablePanelBtn) as WebdriverIO.SizeReturn;
        const compactBtnSize = webDriver.getElementSize(panelPage.compactPanelBtn) as WebdriverIO.SizeReturn;

        expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should scroll content if height is fixed', async () => {
        const contentRegionHeight = webDriver.getCSSPropertyByName(panelPage.fixedHeightPanelContentRegion, 'height').value;
        const contentActualHeight = webDriver.getCSSPropertyByName(panelPage.fixedHeightPanelContent, 'height').value;
        expect(parseInt(contentRegionHeight, 10)).toBeLessThan(parseInt(contentActualHeight, 10));
    });

    it('should action panel have clickable buttons example ', () => {
        expect(webDriver.getText(panelPage.actionPanelBtn, 0))
            .toBe(panelPageContent.action_panel_edit_button);
        expect(webDriver.waitForClickable(panelPage.actionPanelBtn, 0)).toBe(true);
        expect(webDriver.getText(panelPage.actionPanelBtn, 1))
            .toBe(panelPageContent.action_panel_delete_button);
        expect(webDriver.waitForClickable(panelPage.actionPanelBtn, 1)).toBe(true);
    });

    it('should be able to switch to rtl', () => {
        const areas = browser.$$(panelPage.exampleAreaContainersArr);
        const switchers = browser.$$(panelPage.rtlSwitcherArr);
        for (let i = 0; i < areas.length; i++) {
            switchers[i].click();
            expect(webDriver.getAttributeByName(panelPage.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
            expect(webDriver.getCSSPropertyByName(panelPage.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
            switchers[i].click();
            expect(webDriver.getAttributeByName(panelPage.exampleAreaContainersArr, 'dir', i)).toBe('ltr');
            expect(webDriver.getCSSPropertyByName(panelPage.exampleAreaContainersArr, 'direction', i).value).toBe('ltr');
        }
    });
});
