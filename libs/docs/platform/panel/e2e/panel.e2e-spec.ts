import { PanelPo } from './panel.po';
import { action_panel_delete_button, action_panel_edit_button, expandable_panel_header } from './panel-page-content';
import {
    click,
    doesItExist,
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

    beforeAll(async () => {
        await panelPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(panelPage.title);
    }, 1);

    it('should have fixed header', async () => {
        await waitForPresent(fixedPanelDescription);
        await expect(await waitForPresent(fixedPanelDescription)).toBe(true);
    });

    it('should be expandable', async () => {
        const isVisibleContentBefore = await waitForElDisplayed(expandablePanelContent);
        await expect(isVisibleContentBefore).toBe(true);

        await click(expandablePanelBtn);

        await expect(await doesItExist(expandablePanelContent)).toBe(false);
        await expect(await getText(expandablePanelTitle)).toBe(expandable_panel_header);
    });

    it('should compact be smaller than basic', async () => {
        const expandableBtnSize = await getElementSize(expandablePanelBtn);
        const compactBtnSize = await getElementSize(compactPanelBtn);

        await expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        await expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should action panel have clickable buttons example ', async () => {
        await expect((await getText(actionPanelBtn, 0)).trim()).toBe(action_panel_edit_button);
        await expect(await waitForClickable(actionPanelBtn, 0)).toBe(true);
        await expect((await getText(actionPanelBtn, 1)).trim()).toBe(action_panel_delete_button);
        await expect(await waitForClickable(actionPanelBtn, 1)).toBe(true);
    });
    describe('orientation check', () => {
        it('should be able to switch to rtl', async () => {
            await panelPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await panelPage.saveExampleBaselineScreenshot();
            await expect(await panelPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
