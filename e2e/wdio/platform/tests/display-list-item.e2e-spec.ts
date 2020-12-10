import { DisplayListItemPo } from '../pages/display-list-item.po';
import { webDriver } from '../../driver/wdio';
import { checkElArrIsClickable, checkElementTextValue } from '../../helper/assertion-helper';
import DisplayListData from '../fixtures/appData/display-list-item-contents';

describe('Display List Item test suite:', function() {
    const displayListPg = new DisplayListItemPo();

    beforeAll(() => {
        displayListPg.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    describe('Display List Item - cozy and comfy examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayListPg.displayLinks);
            checkElementTextValue(displayListPg.cozyDisplayTitles, DisplayListData.titlesArr);
            checkElementTextValue(displayListPg.cozyDisplaySecText, DisplayListData.secondaryTextArr);
            expect(webDriver.getAttributeByName(displayListPg.sections, DisplayListData.compactAttr, 0)).toBe('false');
            expect(webDriver.getAttributeByName(displayListPg.sections, DisplayListData.compactAttr, 1)).toBe('true');
            expect(webDriver.getAttributeByName(displayListPg.sections, DisplayListData.borderAttr)).toBe('true');
        });

        it('should check navigation', () => {
            webDriver.click(displayListPg.displayLinks, 0);
            const newUrl = webDriver.getCurrentUrl();
            expect(newUrl).toContain('platform/home');
            displayListPg.open();
        });
    });

    describe('Display List Item - declarative examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayListPg.declarativeDisplayLinks);
            checkElementTextValue(displayListPg.declarativeDisplayTitles, DisplayListData.navTitlesArr);
            expect(webDriver.getAttributeByName(displayListPg.declarativeSection, DisplayListData.borderAttr)).toBe('false');
            expect(webDriver.getAttributeByName(displayListPg.declarativeSection, DisplayListData.compactAttr)).toBe('false');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            displayListPg.checkRtlSwitch(displayListPg.rtlSwitcherArr, displayListPg.exampleAreaContainersArr);
        });
    });
});
