import { PageFooterPo } from '../pages/page-footer.po';
import {
    getElementArrayLength,
    isElementClickable,
    scrollIntoView,
} from '../../driver/wdio';
import {
    footerTextArr
} from '../fixtures/appData/page-footer-contents';
import { checkElementTextValue } from '../../helper/assertion-helper';

describe('Page Footer test suite:', function() {
    const pageFooterPage = new PageFooterPo();
    const {
        pageFooterClickableLink, pageFooterText  } = pageFooterPage;

    beforeAll(() => {
        pageFooterPage.open();
    }, 1);
    
        it('verify links are clickable', () => {
            const linksLength = getElementArrayLength(pageFooterClickableLink);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(pageFooterClickableLink, i);
                expect(isElementClickable(pageFooterClickableLink, i)).toBe(true, `link with index ${i} not clickable`);
            }
        });

        it('should check page footer text', () => {
                checkElementTextValue(pageFooterText, footerTextArr);
        });

    xdescribe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            pageFooterPage.saveExampleBaselineScreenshot();
            expect(pageFooterPage.compareWithBaseline()).toBeLessThan(5);
        });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            pageFooterPage.checkRtlSwitch();
            });
        });
    });
});
