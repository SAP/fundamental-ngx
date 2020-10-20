import { browser } from 'protractor';
import { PanelPo } from '../pages/panel.po';

fdescribe('Verify Panel', function() {
    const panelPage = new PanelPo();
    beforeAll(async () => {
        await panelPage.open();
    });

    afterEach(async () => {
        await browser.refresh();
    });

    it('should have fixed header', async () => {

    });

    it('should be expandable', async () => {
       const isVisibleContentBefore =  await panelPage.expandablePanelContent.isDisplayed();
       await panelPage.expandablePanelBtn.click();
       const isVisibleContentAfter =  await panelPage.expandablePanelContent.isPresent();

       expect(isVisibleContentBefore).toBe(true);
       expect(isVisibleContentAfter).toBe(false);
    });

    it('should have info bar with extra information', async () => {

    });

    describe('and arrow icon', function() {
        it('should have pointed right', async () => {

        });

        it('should rotate 90 degrees when expanded', async () => {

        });
    });

    it('should scroll content if height is fixed', async () => {

    });

    it('should have adjusted height when set to auto', async () => {

    });

    describe('has rtl and ltr options', function() {
        it('should ltr be default', async () => {

        });

        it('should be able to switch to rtl', async () => {

        });
    });

});
