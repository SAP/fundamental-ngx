import { browser } from 'protractor';
import { PanelPo } from '../pages/panel.po';
import panelPageContent from '../fixtures/appData/panel-page-content';
import { isClickable } from '../helper/helper';

describe('Verify Panel', function() {
    const panelPage = new PanelPo();
    beforeAll(async () => {
        await panelPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    it('should have fixed header', async () => {
        // Checks that fixed panel has no expand button
        expect(await panelPage.fixedPanelBtn.isPresent()).toBe(false);
    });

    it('should be expandable', async () => {
       const isVisibleContentBefore =  await panelPage.expandablePanelContent.isDisplayed();
       await panelPage.expandablePanelBtn.click();
       const isVisibleContentAfter = await panelPage.expandablePanelContent.isPresent();

       expect(isVisibleContentBefore).toBe(true);
       expect(isVisibleContentAfter).toBe(false);
       expect(await panelPage.expandablePanelTitle.getText()).toBe(panelPageContent.expandable_panel_header);
    });

    it('should compact be smaller than basic', async () => {
        const expandableBtnSize = await panelPage.expandablePanelBtn.getSize();
        const compactBtnSize = await panelPage.compactPanelBtn.getSize();

        expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    // Example is missing
    xit('should have info bar with extra information', async () => {

    });

    // TODO:  Postponed.
    describe('and arrow icon', function() {
        it('should have pointed right', async () => {

        });

        it('should rotate 90 degrees when expanded', async () => {

        });
    });

    it('should scroll content if height is fixed', async () => {
        const contentRegionHeight = await panelPage.fixedHeightPanelContentRegion.getCssValue('height');
        const contentActualHeight = await panelPage.fixedHeightPanelContent.getCssValue('height');

        expect(parseInt(contentRegionHeight, 10)).toBeLessThan(parseInt(contentActualHeight, 10));
    });

    // Fixed after https://github.com/SAP/fundamental-ngx/issues/3679 release.
    xit('should action panel have clickable buttons example ', async () => {
        expect(await panelPage.actionPanelEditBtn.getCssValue('innerText')).toBe(panelPageContent.action_panel_edit_button);
        expect(await isClickable(await panelPage.actionPanelEditBtn)).toBe(true);
        expect(await panelPage.actionPanelDeleteBtn.getCssValue('innerText')).toBe(panelPageContent.action_panel_delete_button);
        expect(await isClickable(await panelPage.actionPanelDeleteBtn)).toBe(true);
    });

    // No example.
    xit('should have adjusted height when set to auto', async () => {

    });

    describe('has rtl and ltr options', function() {
        it('should be able to switch to rtl', async () => {
            await panelPage.exampleAreaContainersArr.each(async (area, index) => {
                expect(await area.getCssValue('direction')).toBe('ltr', 'css prop direction ' + index);
                expect(await area.getAttribute('dir')).toBe('', 'dir attr ' + index);
                await panelPage.rtlSwitcherArr.get(index).click();
                expect(await area.getCssValue('direction')).toBe('rtl');
                expect(await area.getAttribute('dir')).toBe('rtl');
            })

        });
    });

});
