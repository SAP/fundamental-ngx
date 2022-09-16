import {
    checkElArrIsClickable,
    checkElementDisplayed,
    checkElementText,
    click,
    elementDisplayed,
    getAttributeByName,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { ObjectListItemPo } from './object-list-item.po';
import { navUrl } from './object-list-item-contents';

describe('Object list item suite:', () => {
    const objListPage = new ObjectListItemPo();
    const {
        allObjsList,
        allObjAvatars,
        allObjNumbers,
        allObjIcons,
        allObjTitles,
        allObjAttrStatusRows,
        obJListIntro,
        objListAttributes,
        objListStatuses,
        objListSelItem,
        obJListSelIntro,
        objListSelAttributes,
        objListSelStatuses,
        objSelToolbar,
        objNavLink,
        objNavList,
        objNavAttributes,
        objNavStatuses,
        objRowNavLink,
        objRowNavList,
        objRowNavAttributes,
        objRowNavStatuses,
        objRowNavToolbar,
        objDecIntro,
        objDecAttributes,
        objDecStatuses
    } = objListPage;

    beforeAll(() => {
        objListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(objListPage.root);
        waitForElDisplayed(objListPage.title);
    }, 1);

    describe('Basic checks:', () => {
        it('should check basic interactions and content', () => {
            checkElArrIsClickable(allObjsList);
            checkElementDisplayed(allObjAvatars);
            checkElementDisplayed(allObjNumbers);
            checkElementText(allObjNumbers);
            checkElementDisplayed(allObjIcons);
            checkElementDisplayed(allObjTitles);
            checkElementText(allObjTitles);
            checkElementDisplayed(allObjAttrStatusRows);
        });
    });

    describe('Object List Item examples:', () => {
        it('should check content displayed', () => {
            checkElementDisplayed(obJListIntro);
            checkElementDisplayed(objListAttributes);
            checkElementDisplayed(objListStatuses);
        });
    });

    describe('Object List Item With Row Selection examples:', () => {
        it('should check content', () => {
            checkElementDisplayed(obJListSelIntro);
            checkElementDisplayed(objSelToolbar);
            elementDisplayed(objListSelAttributes, 2);
            elementDisplayed(objListSelStatuses, 2);
        });

        it('should check selection', () => {
            expect(getText(objSelToolbar)).toBe('0 : Items selected');
            click(objListSelItem, 0);
            expect(getText(objSelToolbar)).toBe('1 : Items selected');
        });
    });

    describe('Object List Item With Navigation examples:', () => {
        it('should check content', () => {
            const linkCount = getElementArrayLength(objNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(objNavLink, 'href')).not.toBe(null, '');
            }
            elementDisplayed(objNavAttributes, 2);
            elementDisplayed(objNavStatuses, 2);
        });

        it('should check navigation', () => {
            click(objNavList);
            const currentUrl = getCurrentUrl();
            expect(currentUrl).toContain(navUrl);
            objListPage.open();
        });
    });

    describe('Object List Item With Row Selection And Navigation examples:', () => {
        // missed attribute "href"
        // https://github.com/SAP/fundamental-ngx/issues/7343
        xit('should check content', () => {
            const linkCount = getElementArrayLength(objRowNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(objRowNavLink, 'href')).not.toBe(null, '');
            }
            elementDisplayed(objRowNavAttributes, 2);
            elementDisplayed(objRowNavStatuses, 3);
        });

        it('should check selection', () => {
            expect(getText(objRowNavToolbar)).toContain(': is selected');
            click(objRowNavList, 0);
            expect(getText(objRowNavToolbar)).toContain('fdp-list-item');
        });
    });

    describe('Object List Item In Declarative examples:', () => {
        it('should check content', () => {
            elementDisplayed(objDecAttributes, 0);
            elementDisplayed(objDecStatuses, 0);
            checkElementDisplayed(objDecIntro);
        });
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            objListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            objListPage.saveExampleBaselineScreenshot();
            expect(objListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
