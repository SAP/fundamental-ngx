import { StatusIndicatorPo } from '../pages/status-indicator.po';
import {
    acceptAlert,
    click, getAlertText,

    refreshPage, scrollIntoView
} from '../../driver/wdio';

describe('Text component test', function() {
    const statusIndicatorPage = new StatusIndicatorPo();
    const { statusIcon } = statusIndicatorPage;

    beforeAll(() => {
        statusIndicatorPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 2);

    fit('verify alert text', () => {
        scrollIntoView(statusIcon);
        click(statusIcon);
        const alertTestText = 'clicked on object with 35% fillling';
        expect(getAlertText).toBe(alertTestText);
        acceptAlert();
    });


    it('should check RTL and LTR orientation', () => {
        statusIndicatorPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', function() {

        it('should check visual regression for all examples', () => {
            statusIndicatorPage.saveExampleBaselineScreenshot();
            expect(statusIndicatorPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
