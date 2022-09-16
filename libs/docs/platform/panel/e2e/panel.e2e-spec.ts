import { PanelPo } from './panel.po';
import { action_panel_delete_button, action_panel_edit_button, expandable_panel_header } from './panel-page-content';
import {
    click,
    doesItExist,
    getCSSPropertyByName,
    getElementSize,
    getText,
    refreshPage,
    waitForClickable,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Verify Panel', () => {
    const panelPage = new PanelPo();
    const {
        expandablePanelBtn,
        expandablePanelTitle,
        expandablePanelContent,
        fixedPanelDescription,
        compactPanelBtn,
        fixedHeightPanelContentRegion,
        fixedHeightPanelContent,
        actionPanelBtn
    } = panelPage;

    beforeAll(() => {
        panelPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(panelPage.title);
    }, 1);

    it('should have fixed header', () => {
        waitForPresent(fixedPanelDescription);
        expect(waitForPresent(fixedPanelDescription)).toBe(true);
    });

    it('should be expandable', () => {
        const isVisibleContentBefore = waitForElDisplayed(expandablePanelContent);
        expect(isVisibleContentBefore).toBe(true);

        click(expandablePanelBtn);

        expect(doesItExist(expandablePanelContent)).toBe(false);
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
        expect(getText(actionPanelBtn, 0).trim()).toBe(action_panel_edit_button);
        expect(waitForClickable(actionPanelBtn, 0)).toBe(true);
        expect(getText(actionPanelBtn, 1).trim()).toBe(action_panel_delete_button);
        expect(waitForClickable(actionPanelBtn, 1)).toBe(true);
    });
    describe('orientation check', () => {
        it('should be able to switch to rtl', () => {
            panelPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            panelPage.saveExampleBaselineScreenshot();
            expect(panelPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
