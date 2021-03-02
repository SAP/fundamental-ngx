import { DynamicSideContentPo } from '../pages/dynamic-side-content.po';
import { refreshPage, waitForPresent } from '../../driver/wdio';

describe('dynamic side content test suite', function() {
    const dynamicSideContentPage = new DynamicSideContentPo();

    beforeAll(() => {
        dynamicSideContentPage.open();
    }, 1);

    afterEach(() => {
       refreshPage();
       waitForPresent(dynamicSideContentPage.pageHeader);
    }, 1);

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            dynamicSideContentPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            dynamicSideContentPage.saveExampleBaselineScreenshot('dynamic-side-content');
            expect(dynamicSideContentPage.compareWithBaseline('dynamic-side-content')).toBeLessThan(1);
        });
    });
});
