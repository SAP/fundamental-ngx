import { FormattedTextPo } from '../pages/formatted-text.po';
import { isElementClickable, refreshPage } from '../../driver/wdio';
import { checkLinkTargetDestination } from '../../helper/common-helper';
import formattedTextData from '../fixtures/appData/formatted-text-content';

describe('Formatted text component', function() {
    const formattedTextPage = new FormattedTextPo();

    beforeAll(() => {
        formattedTextPage.open();
    });

    afterEach(() => {
        refreshPage();

    });

    xit('should display HTML texlt', () => {

    });

    xit('should have not interactive text', () => {
        expect(isElementClickable(formattedTextPage.outputTitle)).toBe(false);
    });

    fit('should have interactive links and open URL', () => {
        checkLinkTargetDestination(formattedTextPage.paragraphWithLink, formattedTextData.link_dist_url)
    });

    it('Verify RTL and LTR orientation', () => {
        formattedTextPage.checkRtlSwitch();
    });

});
