import { IconPo } from './icon.po';

describe('Icon test suite', () => {
    const iconPage = new IconPo();

    beforeAll(() => {
        iconPage.open();
    }, 1);

    xit('should check visual regression for all examples', () => {
        iconPage.saveExampleBaselineScreenshot();
        expect(iconPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', () => {
        iconPage.checkRtlSwitch();
    });
});
