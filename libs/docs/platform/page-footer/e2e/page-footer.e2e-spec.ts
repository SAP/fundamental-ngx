import { PageFooterPo } from './page-footer.po';
import { checkElementTextValue, getElementArrayLength, isElementClickable, scrollIntoView } from '../../../../../e2e';
import { footerTextArr } from './page-footer-contents';

describe('Page Footer test suite:', () => {
    const pageFooterPage = new PageFooterPo();
    const { pageFooterClickableLink, pageFooterText } = pageFooterPage;

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

    xdescribe('Check visual regression basic', () => {
        it('should check examples visual regression', () => {
            pageFooterPage.saveExampleBaselineScreenshot();
            expect(pageFooterPage.compareWithBaseline()).toBeLessThan(5);
        });

        describe('Check orientation', () => {
            it('Verify RTL and LTR orientation', () => {
                pageFooterPage.checkRtlSwitch();
            });
        });
    });
});
