import { FormattedTextPo } from '../pages/formatted-text.po';
import {
    browserIsFirefox,
    getAlertText,
    refreshPage,
    waitForElDisplayed
} from '../../driver/wdio';

describe('Formatted text component', function() {
    const formattedTextPage = new FormattedTextPo();
    const { inputHtmlText } = new FormattedTextPo();

    beforeAll(() => {
        formattedTextPage.open();
    }, 2);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(inputHtmlText);
    }, 2);

    it('check no alert is displayed on page', () => {
        try {
            getAlertText();
        } catch (e) {
            if (browserIsFirefox()) {
                // FF driver trows incorrect error for missing alert
                expect(e.message).toContain('unknown error');
                return;
            }
            expect(e.message).toContain('no such alert');
            return;
        }
        expect(true).toBe(false, 'Alert is present on the screen ');
    });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            formattedTextPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            formattedTextPage.saveExampleBaselineScreenshot();
            expect(formattedTextPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
