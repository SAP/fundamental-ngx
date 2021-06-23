import { IconPo } from '../pages/icon.po';

describe('Icon test suite', function() {
    const iconPage = new IconPo();

    beforeAll(() => {
        iconPage.open();
    }, 1);

    it('should check visual regression for all examples', () => {
        iconPage.saveExampleBaselineScreenshot();
        expect(iconPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', () => {
        iconPage.checkRtlSwitch();
    });
});
