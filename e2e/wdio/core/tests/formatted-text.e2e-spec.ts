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

    beforeAll(() => {
        formattedTextPage.open();
    }, 2);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(inputHtmlText);
    }, 2);

    it('check expected HTML input text is well converted', () => {
        expect(getText(inputHtmlText).trim()).toContain(formattedTextData.html_input_text);
        expect(getText(secondInputHtmlText).trim()).toContain(formattedTextData.html_input_second);
        expect(getAttributeByName(convertedLinks, 'href')).toBe(formattedTextData.loripsum_link_href);
        expect(getAttributeByName(convertedLinks, 'target')).toBe(formattedTextData.target_blank);
        expect(getAttributeByName(convertedLinks, 'target', 1)).toBe(formattedTextData.target_blank);
        expect(getAttributeByName(redListItem, 'style', 1)).toBe(formattedTextData.custom_style_1);
        expect(getAttributeByName(convertedLinks, 'href', 3)).toContain(formattedTextData.sap_link_href);
        expect(getAttributeByName(convertedLinks, 'target', 3)).toBe(formattedTextData.target_self);
        expect(getAttributeByName(convertedLinks, 'href', 2)).toContain(formattedTextData.anchor_href);

        if (browserIsFirefox()) {
            expect(getAttributeByName(convertedLinks, 'href', 1)).toBe(formattedTextData.google_link_href);
            expect(getAttributeByName(convertedLinks, 'style', 1)).toBe(formattedTextData.custom_style_2_FF);
            return;
        }
        expect(getAttributeByName(convertedLinks, 'href', 1)).toBe(getBaseURL() + formattedTextData.google_link_href);
        expect(getAttributeByName(convertedLinks, 'style', 1)).toBe(formattedTextData.custom_style_2);
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
