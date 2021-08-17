import { PageFooterPo } from '../pages/page-footer.po';
import {
    getElementArrayLength,
    getText,
    isElementClickable,
    scrollIntoView,
} from '../../driver/wdio';

describe('PageFooter test suite:', function() {
    const pagefooterPage = new PageFooterPo();
    const {
        pagefooterclicablelink, pagefootertext  } = pagefooterPage;

    beforeAll(() => {
        pagefooterPage.open();
    }, 1);
    
        it('verify clickable links ', () => {
            const linksLength = getElementArrayLength(pagefooterclicablelink);
            for (let i = 0; i < linksLength; i++) {
                scrollIntoView(pagefooterclicablelink, i);
                expect(isElementClickable(pagefooterclicablelink, i)).toBe(true, 'link with index ${i} not clickable');
            }
        });

        it('should check pagefooter text', () => {
            expect(getText(pagefootertext,)).toEqual('1992-2021 @copyright all right reserved.', 'Text is not matching Index');
            expect(getText(pagefootertext, 1)).toEqual('1992-2021 @copyright all right reserved.', 'Text is not matching Index1');
            expect(getText(pagefootertext, 2)).toEqual('1992-2021 @copyright all right reserved.', 'Text is not matching Index2');
        });

    describe('Check visual regression basic', function() {

        it('should check examples visual regression', () => {
            pagefooterPage.saveExampleBaselineScreenshot();
            expect(pagefooterPage.compareWithBaseline()).toBeLessThan(5);
        });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            pagefooterPage.checkRtlSwitch();
            });
        });
    });
});
