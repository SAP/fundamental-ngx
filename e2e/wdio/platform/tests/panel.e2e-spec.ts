import { PanelPo } from '../pages/panel.po';
import panelPageContent from '../fixtures/appData/panel-page-content';
import {
    click,
    getCSSPropertyByName,
    getElementSize,
    getText,
    pause,
    waitForClickable,
    waitForElDisplayed,
    waitForNotDisplayed,
    waitForPresent
} from '../../driver/wdio';

describe('Verify Panel', () => {
    const panelPage = new PanelPo();

    beforeEach(() => {
        panelPage.open();
    }, 1);

    it('should have fixed header', () => {
        waitForPresent(panelPage.fixedPanelDescription);
        // Checks that fixed panel has no expand button
        expect(waitForPresent(panelPage.fixedPanelDescription)).toBe(true);
    });

    xit('should be expandable', () => {
        const isVisibleContentBefore = waitForElDisplayed(panelPage.expandablePanelContent);
        click(panelPage.expandablePanelBtn);
        pause(3000);
        const isInvisibleVisibleContentAfter = waitForNotDisplayed(panelPage.expandablePanelContent);

        expect(isVisibleContentBefore).toBe(true);
        expect(isInvisibleVisibleContentAfter).toBe(true);
        expect(getText(panelPage.expandablePanelTitle)).toBe(panelPageContent.expandable_panel_header);
    });

    it('should compact be smaller than basic', () => {
        const expandableBtnSize = getElementSize(panelPage.expandablePanelBtn);
        const compactBtnSize = getElementSize(panelPage.compactPanelBtn);

        expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should scroll content if height is fixed', async () => {
        const contentRegionHeight = getCSSPropertyByName(panelPage.fixedHeightPanelContentRegion, 'height').value;
        const contentActualHeight = getCSSPropertyByName(panelPage.fixedHeightPanelContent, 'height').value;
        expect(parseInt(contentRegionHeight, 10)).toBeLessThan(parseInt(contentActualHeight, 10));
    });

    it('should action panel have clickable buttons example ', () => {
        expect(getText(panelPage.actionPanelBtn, 0).trim())
            .toBe(panelPageContent.action_panel_edit_button);
        expect(waitForClickable(panelPage.actionPanelBtn, 0)).toBe(true);
        expect(getText(panelPage.actionPanelBtn, 1).trim())
            .toBe(panelPageContent.action_panel_delete_button);
        expect(waitForClickable(panelPage.actionPanelBtn, 1)).toBe(true);
    });

    it('should be able to switch to rtl', () => {
        panelPage.checkRtlSwitch();
    });
});
