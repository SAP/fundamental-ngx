import { IconPo } from './icon.po';

describe('Icon test suite', () => {
    const iconPage = new IconPo();

    beforeAll(async () => {
        await iconPage.open();
    }, 1);

    it('should check orientation', async () => {
        await iconPage.checkRtlSwitch();
    });
});
