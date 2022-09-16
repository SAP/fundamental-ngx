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

    beforeAll(() => {
        formattedTextPage.open();
    }, 2);

    afterEach(() => {
        refreshPage();
        waitForPresent(formattedTextPage.root);
        waitForElDisplayed(formattedTextPage.title);
    }, 2);

    it('check no alert is displayed on page', () => {
        try {
            getAlertText();
        } catch (e) {
            if (browserIsFirefox() || browserIsSafari()) {
                // Safari and FF driver trows incorrect error for missing alert
                expect(e.message).toContain('unknown error');
                return;
            }
            expect(e.message).toContain('no such alert');
            return;
        }
        expect(true).toBe(false, 'Alert is present on the screen ');
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', () => {
            formattedTextPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            formattedTextPage.saveExampleBaselineScreenshot();
            expect(formattedTextPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
