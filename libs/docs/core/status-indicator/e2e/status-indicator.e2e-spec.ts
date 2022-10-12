import { StatusIndicatorPo } from './status-indicator.po';
import { acceptAlert, browserIsSafari, click, getAlertText, scrollIntoView } from '../../../../../e2e';

describe('Status indicator component test', () => {
    const statusIndicatorPage = new StatusIndicatorPo();
    const { statusIcon } = statusIndicatorPage;

    beforeAll(async () => {
        await statusIndicatorPage.open();
    }, 1);

    it('verify alert text', async () => {
        // skip due to unknown error
        if (await browserIsSafari()) {
            return;
        }
        await scrollIntoView(statusIcon);
        await click(statusIcon);
        const alertTestText = 'clicked on object with 35% fillling';
        await expect(await getAlertText()).toBe(alertTestText);
        await acceptAlert();
    });

    it('should check RTL and LTR orientation', async () => {
        await statusIndicatorPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await statusIndicatorPage.saveExampleBaselineScreenshot();
            await expect(await statusIndicatorPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
