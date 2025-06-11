import { refreshPage, waitForElDisplayed } from '@fundamental-ngx/e2e';
import { DynamicSideContentPo } from './dynamic-side-content.po';

describe('dynamic side content test suite', () => {
    const dynamicSideContentPage = new DynamicSideContentPo();

    beforeAll(async () => {
        await dynamicSideContentPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await dynamicSideContentPage.waitForRoot();
        await waitForElDisplayed(dynamicSideContentPage.title);
    }, 1);

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await dynamicSideContentPage.checkRtlSwitch();
        });
    });
});
