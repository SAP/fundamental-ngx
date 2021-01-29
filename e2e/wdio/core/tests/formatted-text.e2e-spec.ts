import { FormattedTextPo } from '../pages/formatted-text.po';
import {
    browserIsFirefox,
    getAlertText,
    getAttributeByName,
    getBaseURL,
    getText,
    refreshPage,
    waitForElDisplayed
} from '../../driver/wdio';
import formattedTextData from '../fixtures/appData/formatted-text-content';

describe('Formatted text component', function() {
    const formattedTextPage = new FormattedTextPo();
    const { redListItem, convertedLinks, inputHtmlText, secondInputHtmlText } = new FormattedTextPo();
    const {
        html_input_text,
        html_input_second,
        loripsum_link_href,
        target_blank,
        custom_style_1,
        custom_style_2,
        sap_link_href,
        target_self,
        anchor_href,
        google_link_href,
        custom_style_2_FF
    } = formattedTextData;

    beforeAll(() => {
        formattedTextPage.open();
    }, 2);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(inputHtmlText);
    }, 2);

    it('check expected HTML input text is well converted', () => {
        expect(getText(inputHtmlText).trim()).toContain(html_input_text);
        expect(getText(secondInputHtmlText).trim()).toContain(html_input_second);
        expect(getAttributeByName(convertedLinks, 'href')).toBe(loripsum_link_href);
        expect(getAttributeByName(convertedLinks, 'target')).toBe(target_blank);
        expect(getAttributeByName(convertedLinks, 'target', 1)).toBe(target_blank);
        expect(getAttributeByName(redListItem, 'style', 1)).toBe(custom_style_1);
        expect(getAttributeByName(convertedLinks, 'href', 3)).toContain(sap_link_href);
        expect(getAttributeByName(convertedLinks, 'target', 3)).toBe(target_self);
        expect(getAttributeByName(convertedLinks, 'href', 2)).toContain(anchor_href);

        if (browserIsFirefox()) {
            expect(getAttributeByName(convertedLinks, 'href', 1)).toBe(google_link_href);
            expect(getAttributeByName(convertedLinks, 'style', 1)).toBe(custom_style_2_FF);
            return;
        }
        expect(getAttributeByName(convertedLinks, 'href', 1)).toBe(getBaseURL() + google_link_href);
        expect(getAttributeByName(convertedLinks, 'style', 1)).toBe(custom_style_2);
    });

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

    it('Verify RTL and LTR orientation', () => {
        formattedTextPage.checkRtlSwitch();
    });
});
