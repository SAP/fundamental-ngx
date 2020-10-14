describe('Test Sauclab', function() {

    it('should work',  async function() {
        await browser.waitForAngularEnabled(false);
        await browser.sleep(10000);
        await browser.get('/');
        expect(true).toBe(true);
    });
    xit('should fail', function() {
        expect(false).toBe(true);
    });

    afterEach( async ()=> {

        //browser.executeScript("sauce:job-result=" + (this.children[0].result.status ? "pass" : "failed"))
    });
});
