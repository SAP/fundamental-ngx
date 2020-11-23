import {webDriver } from '../driver/wdio';
describe('test.e2e-spec.js', function() {

    it('should true to be true', function() {
        webDriver.open('https://anton.local:4200/fundamental-ngx#');
        webDriver.goBack();
        expect(true).toBe(true);
    });
});
