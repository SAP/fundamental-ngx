import { FormattedTextPo } from './formatted-text.po';
import {
    browserIsFirefox,
    browserIsSafari,
    getAlertText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Formatted text component', () => {
    const formattedTextPage = new FormattedTextPo();

    beforeAll(async () => {
        await formattedTextPage.open();
    }, 2);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(formattedTextPage.root);
        await waitForElDisplayed(formattedTextPage.title);
    }, 2);

    it('check no alert is displayed on page', async () => {
        try {
            await getAlertText();
        } catch (e) {
            if ((await browserIsFirefox()) || (await browserIsSafari())) {
                // Safari and FF driver trows incorrect error for missing alert
                await expect(e.message).toContain('unknown error');
                return;
            }
            await expect(e.message).toContain('no such alert');
            return;
        }
        await expect(true).toBe(false, 'Alert is present on the screen ');
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', async () => {
            await formattedTextPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await formattedTextPage.saveExampleBaselineScreenshot();
            await expect(await formattedTextPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
