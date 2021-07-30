import { PanelPo } from '../pages/panel.po';
import {
    action_panel_delete_button,
    action_panel_edit_button,
    expandable_panel_header
} from '../fixtures/appData/panel-page-content';
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
    const {
        expandablePanelRoot, expandablePanelBtn, expandablePanelTitle, expandablePanelContent, fixedPanelSection,
        fixedPanelDescription, compactPanelRoot, compactPanelBtn, fixedHeightPanelRoot, fixedHeightPanelContentRegion,
        fixedHeightPanelContent, actionPanelRoot, actionPanelBtn
    } = panelPage;

    beforeEach(() => {
        panelPage.open();
    }, 1);
    // skipped for prod
    xit('should have fixed header', () => {
        waitForPresent(fixedPanelDescription);
        // Checks that fixed panel has no expand button
        expect(waitForPresent(fixedPanelDescription)).toBe(true);
    });

    xit('should be expandable', () => {
        const isVisibleContentBefore = waitForElDisplayed(expandablePanelContent);
        click(expandablePanelBtn);
        pause(3000);
        const isInvisibleVisibleContentAfter = waitForNotDisplayed(expandablePanelContent);

        expect(isVisibleContentBefore).toBe(true);
        expect(isInvisibleVisibleContentAfter).toBe(true);
        expect(getText(expandablePanelTitle)).toBe(expandable_panel_header);
    });

    it('should compact be smaller than basic', () => {
        const expandableBtnSize = getElementSize(expandablePanelBtn);
        const compactBtnSize = getElementSize(compactPanelBtn);

        expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should scroll content if height is fixed', async () => {
        const contentRegionHeight = getCSSPropertyByName(fixedHeightPanelContentRegion, 'height').value;
        const contentActualHeight = getCSSPropertyByName(fixedHeightPanelContent, 'height').value;
        expect(parseInt(contentRegionHeight, 10)).toBeLessThan(parseInt(contentActualHeight, 10));
    });

    it('should action panel have clickable buttons example ', () => {
        expect(getText(actionPanelBtn, 0).trim())
            .toBe(action_panel_edit_button);
        expect(waitForClickable(actionPanelBtn, 0)).toBe(true);
        expect(getText(actionPanelBtn, 1).trim())
            .toBe(action_panel_delete_button);
        expect(waitForClickable(actionPanelBtn, 1)).toBe(true);
    });
    describe('orientation check', function() {
        it('should be able to switch to rtl', () => {
            panelPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            panelPage.saveExampleBaselineScreenshot();
            expect(panelPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
