import { DisplayListItemPo } from '../pages/display-list-item.po';
import { click, getAttributeByName, getCurrentUrl, refreshPage, waitForPresent } from '../../driver/wdio';
import { checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import DisplayListData from '../fixtures/appData/display-list-item-contents';

describe('Display List Item test suite:', function() {
    const displayListPg = new DisplayListItemPo();

    beforeAll(() => {
        displayListPg.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(displayListPg.displayLinks);
    }, 1);

    describe('Display List Item - cozy and comfy examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayListPg.displayLinks);
            checkElementText(displayListPg.cozyDisplayTitles);
            checkElementText(displayListPg.comfyDisplayTitles);
            expect(getAttributeByName(displayListPg.sections, DisplayListData.compactAttr, 0)).toBe('false');
            expect(getAttributeByName(displayListPg.sections, DisplayListData.compactAttr, 1)).toBe('true');
            expect(getAttributeByName(displayListPg.sections, DisplayListData.borderAttr)).toBe('true');
        });

        it('should check navigation', () => {
            click(displayListPg.displayLinks, 0);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(DisplayListData.navUrl);
            displayListPg.open();
        });
    });

    describe('Display List Item - declarative examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayListPg.declarativeDisplayLinks);
            checkElementTextValue(displayListPg.declarativeDisplayTitles, DisplayListData.navTitlesArr);
            expect(getAttributeByName(displayListPg.declarativeSection, DisplayListData.borderAttr)).toBe('false');
            expect(getAttributeByName(displayListPg.declarativeSection, DisplayListData.compactAttr)).toBe('false');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            displayListPg.checkRtlSwitch();
        });
    });
});
