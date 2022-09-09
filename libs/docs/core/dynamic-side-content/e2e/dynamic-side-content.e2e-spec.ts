import { DynamicSideContentPo } from './dynamic-side-content.po';
import { refreshPage, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

describe('dynamic side content test suite', () => {
    const dynamicSideContentPage = new DynamicSideContentPo();

    beforeAll(() => {
        dynamicSideContentPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(dynamicSideContentPage.root);
        waitForElDisplayed(dynamicSideContentPage.title);
    }, 1);

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            dynamicSideContentPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            dynamicSideContentPage.saveExampleBaselineScreenshot();
            expect(dynamicSideContentPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
