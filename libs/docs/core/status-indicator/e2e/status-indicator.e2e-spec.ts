import { StatusIndicatorPo } from './status-indicator.po';
import { acceptAlert, browserIsSafari, click, getAlertText, scrollIntoView } from '../../../../../e2e';

describe('Status indicator component test', () => {
    const statusIndicatorPage = new StatusIndicatorPo();
    const { statusIcon } = statusIndicatorPage;

    beforeAll(() => {
        statusIndicatorPage.open();
    }, 1);

    it('verify alert text', () => {
        // skip due to unknown error
        if (browserIsSafari()) {
            return;
        }
        scrollIntoView(statusIcon);
        click(statusIcon);
        const alertTestText = 'clicked on object with 35% fillling';
        expect(getAlertText()).toBe(alertTestText);
        acceptAlert();
    });

    it('should check RTL and LTR orientation', () => {
        statusIndicatorPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            statusIndicatorPage.saveExampleBaselineScreenshot();
            expect(statusIndicatorPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
