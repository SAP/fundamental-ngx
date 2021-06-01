import { IconPo } from '../pages/icon.po';

describe('Avatar test suite', function() {
    const iconPage = new IconPo();

    beforeAll(() => {
        iconPage.open();
    }, 1);

    it('should check visual regression for all examples', () => {
        iconPage.saveExampleBaselineScreenshot();
        expect(iconPage.compareWithBaseline()).toBeLessThan(3);
    });

    it('should check orientation', () => {
        iconPage.checkRtlSwitch();
    });
});
