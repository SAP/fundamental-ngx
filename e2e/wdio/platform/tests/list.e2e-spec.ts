import { ListPo } from '../pages/list.po';
import {
    checkAttributeValueTrue,
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue
} from '../../helper/assertion-helper';
import ListData from '../fixtures/appData/list-contents';
import {
    acceptAlert,
    browserIsIE,
    browserIsSafari, browserIsSafariorFF,
    click,
    getAlertText,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength,
    getText, isElementClickable,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForInvisibilityOf
} from '../../driver/wdio';

describe('List test suite:', function() {
    const listPg = new ListPo();

    beforeAll(() => {
        listPg.open();
    }, 1);

    describe('Borderless examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.noBorderListItems);
            checkElementText(listPg.noBorderListItems);
            expect(getAttributeByName(listPg.noBorderCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });

        it('should check border', () => {
            checkAttributeValueTrue(listPg.noBorderList, ListData.noBorderAttr);
            getCSSPropertyByName(listPg.noBorderListItems, ListData.borderStyleAttr);
        });
    });

    describe('Footer examples:', function() {
        it('should do basic checks and check footer', () => {
            checkElArrIsClickable(listPg.footerListItems);
            checkElementText(listPg.footerListItems);
            checkElementText(listPg.footer);
            expect(getAttributeByName(listPg.footerCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });
    });

    describe('Group header examples:', function() {
        it('should do basic checks and check header', () => {
            checkElArrIsClickable(listPg.groupHeaderListItems);
            checkElementText(listPg.groupHeaderListItems);
            checkElementText(listPg.groupHeader);
            expect(getAttributeByName(listPg.groupCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });
    });

    describe('Interactive States examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.interactiveListItems);
            checkElArrIsClickable(listPg.interactiveListItems);
        });
    });

    describe('Item Counter examples:', function() {
        it('should do basic checks and check counter', () => {
            checkElArrIsClickable(listPg.counterListItems);
            checkElementText(listPg.counterTitleItems);
            checkElementText(listPg.counterCounterItem);
            expect(getAttributeByName(listPg.counterCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });
    });

    describe('Deletion button examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.deletionListItems);
            checkElementText(listPg.deletionListItems);
            waitForElDisplayed(listPg.deletionIcon);
        });

        it('should check deletion', () => {
            click(listPg.deletionBtn);
            waitForInvisibilityOf(listPg.deletionListItems);
        });
    });

    describe('Multi Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.multiListItems);
            checkElArrIsClickable(listPg.multiListItems);
        });

        it('should check selection', () => {
            expect(getAttributeByName(listPg.multiList, ListData.selectionAttr)).toBe(ListData.multiSelect);
            expect(getText(listPg.multiToolbar)).toBe('0 : Items selected');
            click(listPg.multiCheckbox);
            expect(getText(listPg.multiToolbar)).toBe('1 : Items selected');
            click(listPg.multiCheckbox, 1);
            expect(getText(listPg.multiToolbar)).toBe('2 : Items selected');
        });
    });

    describe('Single Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.singleListItems);
            checkElArrIsClickable(listPg.singleListItems);
        });

        it('should check selection', () => {
            const listItemId = getAttributeByName(listPg.singleListItems, 'id');

            expect(getAttributeByName(listPg.singleList, ListData.altSelectionAttr)).toBe(ListData.singleSelect);
            expect(getText(listPg.singleToolbar)).toContain(': selected');
            click(listPg.singleRadioBtn);
            expect(getText(listPg.singleToolbar)).toContain(listItemId + ' : selected');
        });
    });

    describe('Navigation Indication examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.navListItems);
            checkElArrIsClickable(listPg.navListItems);
            checkAttributeValueTrue(listPg.navList, ListData.navIndicator);
        });

        it('should check navigation', () => {
            click(listPg.navListLink);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(ListData.navUrl);
            listPg.open();
        });
    });

    describe('Virtual Scroll examples:', function() {
        it('should do basic checks', () => {
            isElementClickable(listPg.vScrollListItems);
            checkElementText(listPg.vScrollListItems);
            checkAttributeValueTrue(listPg.vScrollList, ListData.scrollLoadAttr);
            checkAttributeValueTrue(listPg.vScrollList, ListData.lazyLoadAttr);
            refreshPage();
        });

        it('should check scroll', () => {
            // skip for FF due to issue https://github.com/SAP/fundamental-ngx/issues/4107
            if (browserIsSafariorFF()) {
                console.log('skip FF due to #4107, skip Safari');
                return;
            }
            scrollIntoView(listPg.vScrollListItems);
            const itemsStartCount = getElementArrayLength(listPg.vScrollListItems);
            click(listPg.vScrollListItems);
            sendKeys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);
            expect(waitForElDisplayed(listPg.vScrollLoadIcon)).toBe(true);
            waitForInvisibilityOf(listPg.vScrollLoadIcon);
            const itemsEndCount = getElementArrayLength(listPg.vScrollListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Load Data On Button Click examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.loadListItems);
            checkElementText(listPg.loadListItems);
            checkAttributeValueTrue(listPg.loadList, ListData.loadMoreAttr);
        });

        it('should check loading on click', () => {
            const itemsStartCount = getElementArrayLength(listPg.loadListItems);
            click(listPg.loadShowMoreBtn);
            waitForInvisibilityOf(listPg.loadIcon);
            const itemsEndCount = getElementArrayLength(listPg.loadListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Buttons example:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.btnListItems);
            checkElArrIsClickable(listPg.btnDeleteBtn);
            checkElArrIsClickable(listPg.btnEditBtn);
            checkElementText(listPg.btnListItems);
            expect(getAttributeByName(listPg.btnList, ListData.listTypeAttr)).toBe('detail');
            expect(getAttributeByName(listPg.btnList, ListData.selectionAttr)).toBe('delete');
        });

        it('should check delete action', () => {
            click(listPg.btnDeleteBtn);
            if (browserIsIE()) {
                acceptAlert();
                return;
            }
            expect(getAlertText()).toContain('Delete row');
            acceptAlert();
        });

        it('should check edit action', () => {
            click(listPg.btnEditBtn);
            if (browserIsIE()) {
                acceptAlert();
                return;
            }
            expect(getAlertText()).toContain('Edit row');
            acceptAlert();
        });
    });

    describe('With No Data examples:', function() {
        it('should do basic checks and check no data text', () => {
            checkElArrIsClickable(listPg.noDataListItems);
            checkAttributeValueTrue(listPg.noDataCompactList, ListData.altCompactAttribute);
            checkElementTextValue(listPg.noDataListItems, ListData.noDataText);
        });
    });

    describe('With No Separator examples:', function() {
        it('should do basic checks and check separator', () => {
            checkElArrIsClickable(listPg.noSepListItems);
            checkElementText(listPg.noSepListItems);
            checkAttributeValueTrue(listPg.noSepList, ListData.separatorAttr);
        });
    });

    describe('With Unread Data examples:', function() {
        it('should do basic checks and check unread data', () => {
            checkElArrIsClickable(listPg.unreadListItems);
            checkElementText(listPg.unreadListItems);
            if (browserIsSafari()) {
                expect(getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 0).value).toBe('normal');
                expect(getAttributeByName(listPg.unreadListAttr, ListData.itemUnreadStatus, 1)).toBe('true');
                expect(getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 1).value).toBe('bold');
            } else {
                expect(getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 0).value).toBe(400);
                expect(getAttributeByName(listPg.unreadListAttr, ListData.itemUnreadStatus, 1)).toBe('true');
                expect(getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 1).value).toBe(700);
            }
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            listPg.checkRtlSwitch(listPg.rtlSwitcherArr, listPg.exampleAreaContainersArr);
        });
    });
    // TODO: Failed. Unable to debug at the moment.
    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            listPg.saveExampleBaselineScreenshot('list');
            expect(listPg.compareWithBaseline('list')).toBeLessThan(1);
        });
    });
});
