import { DisplayListItemPo } from '../pages/display-list-item.po';
import { click, getAttributeByName, getCurrentUrl, refreshPage, waitForPresent } from '../../driver/wdio';
import { checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import DisplayListData from '../fixtures/appData/display-list-item-contents';

describe('Display List Item test suite:', function() {
    const displayListPg = new DisplayListItemPo();
    const {
        displayLinks,
        cozyDisplayTitles,
        comfyDisplayTitles,
        sections,
        declarativeDisplayLinks,
        declarativeDisplayTitles,
        declarativeSection
    } = displayListPg;

    beforeAll(() => {
        displayListPg.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(displayLinks);
    }, 1);

    describe('Display List Item - cozy and comfy examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayLinks);
            checkElementText(cozyDisplayTitles);
            checkElementText(comfyDisplayTitles);
            expect(getAttributeByName(sections, DisplayListData.compactAttr, 0)).toBe('false');
            expect(getAttributeByName(sections, DisplayListData.compactAttr, 1)).toBe('true');
            expect(getAttributeByName(sections, DisplayListData.borderAttr)).toBe('true');
        });

        it('should check navigation', () => {
            click(displayLinks, 0);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(DisplayListData.navUrl);
            displayListPg.open();
        });
    });

    describe('Display List Item - declarative examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(declarativeDisplayLinks);
            checkElementTextValue(declarativeDisplayTitles, DisplayListData.navTitlesArr);
            expect(getAttributeByName(declarativeSection, DisplayListData.borderAttr)).toBe('false');
            expect(getAttributeByName(declarativeSection, DisplayListData.compactAttr)).toBe('false');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            displayListPg.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            displayListPg.saveExampleBaselineScreenshot('display-list-item');
            expect(displayListPg.compareWithBaseline('display-list-item')).toBeLessThan(1);
        });
    });

});
