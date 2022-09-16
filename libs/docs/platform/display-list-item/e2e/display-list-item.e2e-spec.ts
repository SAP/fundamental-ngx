import { DisplayListItemPo } from './display-list-item.po';
import {
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue,
    click,
    getCurrentUrl,
    getElementClass,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { navTitlesArr, navUrl } from './display-list-item-contents';

describe('Display List Item test suite:', () => {
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
        waitForPresent(displayListPage.root);
        waitForElDisplayed(displayListPage.title);
    }, 1);

    describe('Display List Item - cozy and comfy examples:', () => {
        it('should do basic checks', () => {
            checkElArrIsClickable(displayLinks);
            checkElementText(cozyDisplayTitles);
            checkElementText(comfyDisplayTitles);
            expect(getElementClass(sections, 0)).not.toContain('compact');
            expect(getElementClass(sections, 1)).toContain('compact');
            expect(getElementClass(sections, 0)).toContain('no-border');
        });

        it('should check navigation', () => {
            click(displayLinks, 0);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(navUrl);
            displayListPage.open();
        });
    });

    describe('Display List Item - declarative examples:', () => {
        it('should do basic checks', () => {
            checkElArrIsClickable(declarativeDisplayLinks);
            checkElementTextValue(declarativeDisplayTitles, navTitlesArr);
            expect(getElementClass(declarativeSection)).not.toContain('no-border');
            expect(getElementClass(declarativeSection)).not.toContain('compact');
        });
    });

    describe('Orientation check:', () => {
        it('should check RTL and LTR orientation', () => {
            displayListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            displayListPage.saveExampleBaselineScreenshot();
            expect(displayListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
