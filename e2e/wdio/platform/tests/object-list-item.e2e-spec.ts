import {
    browserIsFirefox,
    click,
    elementDisplayed,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength,
    getText,
    refreshPage, waitForPresent
} from '../../driver/wdio';
import { ObjectListItemPo } from '../pages/object-list-item.po';
import { checkElArrIsClickable, checkElementDisplayed, checkElementText } from '../../helper/assertion-helper';
import ObjListData from '../fixtures/appData/object-list-item-contents';

describe('Object list item suite:', function() {
    const objListPg = new ObjectListItemPo();

    beforeAll(() => {
        objListPg.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(objListPg.allObjsList);
    }, 1);

    describe('Basic checks:', function() {
        it('should check basic interactions and content', () => {
            checkElArrIsClickable(objListPg.allObjsList);
            checkElementDisplayed(objListPg.allObjAvatars);
            checkElementDisplayed(objListPg.allObjNumbers);
            checkElementText(objListPg.allObjNumbers);
            checkElementDisplayed(objListPg.allObjIcons);
            checkElementDisplayed(objListPg.allObjTitles);
            checkElementText(objListPg.allObjTitles);
            checkElementDisplayed(objListPg.allObjAttrStatusRows);
        });
    });

    describe('Object List Item examples:', function() {
        it('should check styles and content', () => {
           expect(getAttributeByName(objListPg.objListAttr, ObjListData.noBorderAttr)).toBe('true');
           checkElementDisplayed(objListPg.obJListIntro);
           checkElementDisplayed(objListPg.objListAttributes);
           checkElementDisplayed(objListPg.objListStatuses);
           if (browserIsFirefox()) {
               expect(getCSSPropertyByName(objListPg.objListItem, ObjListData.altNoBorderStyle).value).toBe('none');
           } else {
               expect(getCSSPropertyByName(objListPg.objListItem, ObjListData.noBorderStyle).value).toBe('none');
           }
        });
    });

    describe('Object List Item With Row Selection examples:', function() {
        it('should check content', () => {
            checkElementDisplayed(objListPg.obJListSelIntro);
            checkElementDisplayed(objListPg.objSelToolbar);
            elementDisplayed(objListPg.objListSelAttributes, 2);
            elementDisplayed(objListPg.objListSelStatuses, 2);
        });

        it('should check selection', () => {
            expect(getText(objListPg.objSelToolbar)).toBe('0 : Items selected');
            click(objListPg.objListSelItem, 0);
            expect(getText(objListPg.objSelToolbar)).toBe('1 : Items selected');
        });
    });

    describe('Object List Item With Navigation examples:', function() {
        it('should check content', () => {
            const linkCount = getElementArrayLength(objListPg.objNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(objListPg.objNavLink, 'href')).not.toBe(null, '');
            }
            elementDisplayed(objListPg.objNavAttributes, 2);
            elementDisplayed(objListPg.objNavStatuses, 2);
        });

        it('should check navigation', () => {
            click(objListPg.objNavList);
            const currentUrl = getCurrentUrl();
            expect(currentUrl).toContain(ObjListData.navUrl);
            objListPg.open();
        });
    });

    describe('Object List Item With Row Selection And Navigation examples:', function() {
        it('should check content', () => {
            const linkCount = getElementArrayLength(objListPg.objRowNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(getAttributeByName(objListPg.objRowNavLink, 'href')).not.toBe(null, '');
            }
            elementDisplayed(objListPg.objRowNavAttributes, 2);
            elementDisplayed(objListPg.objRowNavStatuses, 3);
        });

        it('should check selection', () => {
            expect(getText(objListPg.objRowNavToolbar)).toContain(': is selected');
            click(objListPg.objRowNavList, 0);
            expect(getText(objListPg.objRowNavToolbar)).toContain('fdp-list-item');
        });
    });

    describe('Object List Item In Declarative examples:', function() {
        it('should check content', () => {
            elementDisplayed(objListPg.objDecAttributes, 0);
            elementDisplayed(objListPg.objDecStatuses, 0);
            checkElementDisplayed(objListPg.objDecIntro);
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            objListPg.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objListPg.saveExampleBaselineScreenshot('object-list-item');
            expect(objListPg.compareWithBaseline('object-list-item')).toBeLessThan(1);
        });
    });
});
