import { webDriver } from '../../driver/wdio';
import { ObjectListItemPo } from '../pages/object-list-item.po';
import { checkElArrIsClickable, checkElementDisplayed, checkElementText } from '../../helper/assertion-helper';
import ObjListData from '../fixtures/appData/object-list-item-contents';

describe('Object list item suite:', function() {
    const objListPg = new ObjectListItemPo();

    beforeAll(() => {
        objListPg.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

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
           expect(webDriver.getAttributeByName(objListPg.objListAttr, ObjListData.noBorderAttr)).toBe('true');
           checkElementDisplayed(objListPg.obJListIntro);
           checkElementDisplayed(objListPg.objListAttributes);
           checkElementDisplayed(objListPg.objListStatuses);
           if (webDriver.browserIsFirefox()) {
               expect(webDriver.getCSSPropertyByName(objListPg.objListItem, ObjListData.altNoBorderStyle).value).toBe('none');
           } else {
               expect(webDriver.getCSSPropertyByName(objListPg.objListItem, ObjListData.noBorderStyle).value).toBe('none');
           }
        });
    });

    describe('Object List Item With Row Selection examples:', function() {
        it('should check content', () => {
            checkElementDisplayed(objListPg.obJListSelIntro);
            checkElementDisplayed(objListPg.objSelToolbar);
            webDriver.elementDisplayed(objListPg.objListSelAttributes, 2);
            webDriver.elementDisplayed(objListPg.objListSelStatuses, 2);
        });
        it('should check selection', () => {
            expect(webDriver.getText(objListPg.objSelToolbar)).toBe('0 : Items selected');
            webDriver.click(objListPg.objListSelItem, 0);
            expect(webDriver.getText(objListPg.objSelToolbar)).toBe('1 : Items selected');
        });
    });

    describe('Object List Item With Navigation examples:', function() {
        it('should check content', () => {
            const linkCount = webDriver.getElementArrayLength(objListPg.objNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(webDriver.getAttributeByName(objListPg.objNavLink, 'href')).not.toBe(null, '');
            }
            webDriver.elementDisplayed(objListPg.objNavAttributes, 2);
            webDriver.elementDisplayed(objListPg.objNavStatuses, 2);
        });

        it('should check navigation', () => {
            webDriver.click(objListPg.objNavList);
            const currentUrl = webDriver.getCurrentUrl();
            expect(currentUrl).toContain('platform/home');
            objListPg.open();
        });
    });

    describe('Object List Item With Row Selection And Navigation examples:', function() {
        it('should check content', () => {
            const linkCount = webDriver.getElementArrayLength(objListPg.objRowNavLink);
            for (let i = 0; linkCount > i; i++) {
                expect(webDriver.getAttributeByName(objListPg.objRowNavLink, 'href')).not.toBe(null, '');
            }
            webDriver.elementDisplayed(objListPg.objRowNavAttributes, 2);
            webDriver.elementDisplayed(objListPg.objRowNavStatuses, 3);
        });

        it('should check selection', () => {
            expect(webDriver.getText(objListPg.objRowNavToolbar)).toContain(': is selected');
            webDriver.click(objListPg.objRowNavList, 0);
            expect(webDriver.getText(objListPg.objRowNavToolbar)).toContain('fdp-list-item');
        });
    });

    describe('Object List Item In Declarative examples:', function() {
        it('should check content', () => {
            webDriver.elementDisplayed(objListPg.objDecAttributes, 0);
            webDriver.elementDisplayed(objListPg.objDecStatuses, 0);
            checkElementDisplayed(objListPg.objDecIntro);
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            const areas = webDriver.elementArray(objListPg.exampleAreaContainersArr);
            const switchers = webDriver.elementArray(objListPg.rtlSwitcherArr);
            for (let i = 0; i < areas.length; i++) {
                switchers[i].click();
                expect(webDriver.getAttributeByName(objListPg.exampleAreaContainersArr, 'dir', i)).toBe('rtl');
                expect(webDriver.getCSSPropertyByName(objListPg.exampleAreaContainersArr, 'direction', i).value).toBe('rtl');
                switchers[i].click();
                expect(webDriver.getAttributeByName(objListPg.exampleAreaContainersArr, 'dir', i)).toBe('ltr');
                expect(webDriver.getCSSPropertyByName(objListPg.exampleAreaContainersArr, 'direction', i).value).toBe('ltr');
            }
        });
    });
});
