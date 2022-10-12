import { IconPo } from './icon.po';

describe('Icon test suite', () => {
    const iconPage = new IconPo();

    beforeAll(async () => {
        await iconPage.open();
    }, 1);

    xit('should check visual regression for all examples', async () => {
        await iconPage.saveExampleBaselineScreenshot();
        await expect(await iconPage.compareWithBaseline()).toBeLessThan(5);
    });

    it('should check orientation', async () => {
        await iconPage.checkRtlSwitch();
    });
});
