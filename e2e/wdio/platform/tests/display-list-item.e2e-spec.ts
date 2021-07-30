import { DisplayListItemPo } from '../pages/display-list-item.po';
import { click, getAttributeByName, getCurrentUrl, refreshPage, waitForPresent } from '../../driver/wdio';
import { checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import {navTitlesArr, compactAttr, borderAttr, navUrl} from '../fixtures/appData/display-list-item-contents';

describe('Display List Item test suite:', function() {
    const displayListPage = new DisplayListItemPo();
    const {
        displayLinks,
        cozyDisplayTitles,
        comfyDisplayTitles,
        sections,
        declarativeDisplayLinks,
        declarativeDisplayTitles,
        declarativeSection
    } = displayListPage;

    beforeAll(() => {
        displayListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(displayLinks);
    }, 1);

    describe('Display List Item - cozy and comfy examples:', function() {
        xit('should do basic checks', () => {
            checkElArrIsClickable(displayLinks);
            checkElementText(cozyDisplayTitles);
            checkElementText(comfyDisplayTitles);
            expect(getAttributeByName(sections, compactAttr, 0)).toBe('false');
            expect(getAttributeByName(sections, compactAttr, 1)).toBe('true');
            expect(getAttributeByName(sections, borderAttr)).toBe('true');
        });

        it('should check navigation', () => {
            click(displayLinks, 0);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(navUrl);
            displayListPage.open();
        });
    });

    describe('Display List Item - declarative examples:', function() {
        xit('should do basic checks', () => {
            checkElArrIsClickable(declarativeDisplayLinks);
            checkElementTextValue(declarativeDisplayTitles, navTitlesArr);
            expect(getAttributeByName(declarativeSection, borderAttr)).toBe('false');
            expect(getAttributeByName(declarativeSection, compactAttr)).toBe('false');
        });
    });

    describe('Orientation check:', function() {
        it('should check RTL and LTR orientation', () => {
            displayListPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            displayListPage.saveExampleBaselineScreenshot();
            expect(displayListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
