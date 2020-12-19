import { ListPo } from '../pages/list.po';
import { checkAttributeValueTrue, checkElArrIsClickable, checkElementText, checkElementTextValue } from '../../helper/assertion-helper';
import ListData from '../fixtures/appData/list-contents';
import { webDriver } from '../../driver/wdio';

describe('List test suite:', function() {
    const listPg = new ListPo();

    beforeAll(() => {
        listPg.open();
    });

    describe('Borderless examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.noBorderListItems);
            checkElementText(listPg.noBorderListItems);
            expect(webDriver.getAttributeByName(listPg.noBorderCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });

        it('should check border', () => {
            checkAttributeValueTrue(listPg.noBorderList, ListData.noBorderAttr);
            webDriver.getCSSPropertyByName(listPg.noBorderListItems, ListData.borderStyleAttr);
        });
    });

    describe('Footer examples:', function() {
        it('should do basic checks and check footer', () => {
            checkElArrIsClickable(listPg.footerListItems);
            checkElementText(listPg.footerListItems);
            checkElementText(listPg.footer);
            expect(webDriver.getAttributeByName(listPg.footerCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });
    });

    describe('Group header examples:', function() {
        it('should do basic checks and check header', () => {
            checkElArrIsClickable(listPg.groupHeaderListItems);
            checkElementText(listPg.groupHeaderListItems);
            checkElementText(listPg.groupHeader);
            expect(webDriver.getAttributeByName(listPg.groupCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
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
            expect(webDriver.getAttributeByName(listPg.counterCompactList, ListData.compactAttr)).toBe(ListData.compactValue);
        });
    });

    describe('Deletion button examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.deletionListItems);
            checkElementText(listPg.deletionListItems);
            webDriver.waitForElDisplayed(listPg.deletionIcon);
        });

        it('should check deletion', () => {
            webDriver.click(listPg.deletionBtn, 0);
            webDriver.waitForInvisibilityOf(listPg.deletionListItems, 0);
        });
    });

    describe('Multi Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.multiListItems);
            checkElArrIsClickable(listPg.multiListItems);
        });

        it('should check selection', () => {
            expect(webDriver.getAttributeByName(listPg.multiList, ListData.selectionAttr)).toBe(ListData.multiSelect);
            expect(webDriver.getText(listPg.multiToolbar)).toBe('0 : Items selected');
            webDriver.click(listPg.multiCheckbox, 0);
            expect(webDriver.getText(listPg.multiToolbar)).toBe('1 : Items selected');
            webDriver.click(listPg.multiCheckbox, 1);
            expect(webDriver.getText(listPg.multiToolbar)).toBe('2 : Items selected');
        });
    });

    describe('Single Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.singleListItems);
            checkElArrIsClickable(listPg.singleListItems);
        });

        it('should check selection', () => {
            const listItemId = webDriver.getAttributeByName(listPg.singleListItems, 'id');

            expect(webDriver.getAttributeByName(listPg.singleList, ListData.altSelectionAttr)).toBe(ListData.singleSelect);
            expect(webDriver.getText(listPg.singleToolbar)).toContain(': selected');
            webDriver.click(listPg.singleRadioBtn, 0);
            expect(webDriver.getText(listPg.singleToolbar)).toContain(listItemId + ' : selected');
        });
    });

    describe('Navigation Indication examples:', function() {
        it('should do basic checks', () => {
            checkElementText(listPg.navListItems);
            checkElArrIsClickable(listPg.navListItems);
            checkAttributeValueTrue(listPg.navList, ListData.navIndicator);
        });

        it('should check navigation', () => {
            webDriver.click(listPg.navListLink, 0);
            const newUrl = webDriver.getCurrentUrl();
            expect(newUrl).toContain(ListData.navUrl);
            listPg.open();
        });
    });

    describe('Virtual Scroll examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.vScrollListItems);
            checkElementText(listPg.vScrollListItems);
            checkAttributeValueTrue(listPg.vScrollList, ListData.scrollLoadAttr);
            checkAttributeValueTrue(listPg.vScrollList, ListData.lazyLoadAttr);
            webDriver.refreshPage();
        });

        it('should check scroll', () => {
            if (webDriver.browserIsFirefox()) {
                // skip for FF due to issue https://github.com/SAP/fundamental-ngx/issues/4107
                console.log('skip FF due to issue #4107');
            } else {
                webDriver.scrollIntoView(listPg.vScrollListItems, 0);
                const itemsStartCount = webDriver.getElementArrayLength(listPg.vScrollListItems);
                webDriver.click(listPg.vScrollListItems, 0);
                webDriver.sendKeys('ArrowDown');
                webDriver.sendKeys('ArrowDown');
                webDriver.sendKeys('ArrowDown');
                webDriver.sendKeys('ArrowDown');
                webDriver.sendKeys('ArrowDown');
                expect(webDriver.waitForElDisplayed(listPg.vScrollLoadIcon)).toBe(true);
                webDriver.waitForInvisibilityOf(listPg.vScrollLoadIcon);
                const itemsEndCount = webDriver.getElementArrayLength(listPg.vScrollListItems);
                expect(itemsStartCount).not.toEqual(itemsEndCount);
            }
        });
    });

    describe('Load Data On Button Click examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.loadListItems);
            checkElementText(listPg.loadListItems);
            checkAttributeValueTrue(listPg.loadList, ListData.loadMoreAttr);
        });

        it('should check loading on click', () => {
            const itemsStartCount = webDriver.getElementArrayLength(listPg.loadListItems);
            webDriver.click(listPg.loadShowMoreBtn);
            webDriver.waitForInvisibilityOf(listPg.loadIcon);
            const itemsEndCount = webDriver.getElementArrayLength(listPg.loadListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Buttons example:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(listPg.btnListItems);
            checkElArrIsClickable(listPg.btnDeleteBtn);
            checkElArrIsClickable(listPg.btnEditBtn);
            checkElementText(listPg.btnListItems);
            expect(webDriver.getAttributeByName(listPg.btnList, ListData.listTypeAttr)).toBe('detail');
            expect(webDriver.getAttributeByName(listPg.btnList, ListData.selectionAttr)).toBe('delete');
        });

        it('should check delete action', () => {
            webDriver.click(listPg.btnDeleteBtn, 0);
            if (webDriver.browserIsIE()) {
                webDriver.acceptAlert();
            } else {
                expect(webDriver.getAlertText()).toContain('Delete row');
                webDriver.acceptAlert();
            }
        });

        it('should check edit action', () => {
            webDriver.click(listPg.btnEditBtn, 0);
            if (browser.capabilities.browserName === 'internet explorer') {
                webDriver.acceptAlert();
            } else {
                expect(webDriver.getAlertText()).toContain('Edit row');
                webDriver.acceptAlert();
            }
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
            if (webDriver.browserIsSafari()) {
                expect(webDriver.getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 0).value).toBe('normal');
                expect(webDriver.getAttributeByName(listPg.unreadListAttr, ListData.itemUnreadStatus, 1)).toBe('true');
                expect(webDriver.getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 1).value).toBe('bold');
            } else {
                expect(webDriver.getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 0).value).toBe(400);
                expect(webDriver.getAttributeByName(listPg.unreadListAttr, ListData.itemUnreadStatus, 1)).toBe('true');
                expect(webDriver.getCSSPropertyByName(listPg.unreadListItemText, ListData.fontWeightAttr, 1).value).toBe(700);
            }
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            listPg.checkRtlSwitch(listPg.rtlSwitcherArr, listPg.exampleAreaContainersArr);
        });
    });
});
