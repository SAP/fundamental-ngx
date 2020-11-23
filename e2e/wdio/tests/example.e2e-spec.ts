

describe('test.e2e-spec.js', function() {
    it('should true to be true',  () => {
        browser.url('https://anton.local:4200/fundamental-ngx#');
        expect(true).toBe(true);
    });
});
