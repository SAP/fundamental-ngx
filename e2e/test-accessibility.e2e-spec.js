describe('Test run accessibility', function() {
    it('should audit button page', async ()=> {
        await browser.get('https://sap.github.io/fundamental-ngx/#/core/button');
        runAxeTest('Test accessibility', '#page-content');
        expect(false).toBe(false);
    });
});
