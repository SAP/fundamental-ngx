import { ListPo } from '../pages/list.po';
import {
    checkAttributeValueTrue,
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue
} from '../../helper/assertion-helper';
import {
    compactClass,
    ariaMultiSelectable,
    borderStyleAttr,
    compactAttr,
    compactValue,
    itemUnreadStatus,
    lazyLoadAttr,
    listTypeAttr,
    loadMoreClass,
    multiSelect,
    navIndicator,
    navUrl,
    noBorderAttr,
    noDataText,
    scrollLoadAttr,
    selectionAttr,
    separatorAttr,
    singleSelect
} from '../fixtures/appData/list-contents';
import {
    acceptAlert,
    browserIsIE,
    browserIsSafari,
    browserIsSafariorFF,
    click,
    getAlertText,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength, getElementClass,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForInvisibilityOf
} from '../../driver/wdio';

describe('List test suite:', function() {
    const listPage = new ListPo();
    const {
        noBorderListItems, noBorderCompactList, noBorderList, footerListItems, footerCompactList, footer, groupHeader,
        groupHeaderListItems, groupCompactList, interactiveListItems, counterListItems, counterCompactList,
        counterTitleItems, counterCounterItem, deletionListItems, deletionBtn, deletionIcon, multiList, multiListItems,
        multiToolbar, multiCheckbox, singleList, singleListItems, singleToolbar, singleRadioBtn, navList, navListItems,
        navListLink, vScrollList, vScrollListItems, vScrollLoadIcon, loadList, loadListItems, loadShowMoreBtn,
        loadIcon, btnList, btnListItems, btnDeleteBtn, btnEditBtn, noDataListItems, noDataCompactList, noSepList,
        noSepListItems, unreadListAttr, unreadListItems, unreadListItemText
    } = listPage;

    beforeAll(() => {
        listPage.open();
    }, 1);

    describe('Borderless examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(noBorderListItems);
            checkElementText(noBorderListItems);
            expect(getAttributeByName(noBorderCompactList, compactAttr)).toBe(compactValue);
        });

        it('should check border', () => {
            checkAttributeValueTrue(noBorderList, noBorderAttr);
            getCSSPropertyByName(noBorderListItems, borderStyleAttr);
        });
    });

    describe('Footer examples:', function() {
        it('should do basic checks and check footer', () => {
            checkElArrIsClickable(footerListItems);
            checkElementText(footerListItems);
            checkElementText(footer);
            expect(getAttributeByName(footerCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Group header examples:', function() {
        it('should do basic checks and check header', () => {
            checkElArrIsClickable(groupHeaderListItems);
            checkElementText(groupHeaderListItems);
            checkElementText(groupHeader);
            expect(getAttributeByName(groupCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Interactive States examples:', function() {
        it('should do basic checks', () => {
            checkElementText(interactiveListItems);
            checkElArrIsClickable(interactiveListItems);
        });
    });

    describe('Item Counter examples:', function() {
        it('should do basic checks and check counter', () => {
            checkElArrIsClickable(counterListItems);
            checkElementText(counterTitleItems);
            checkElementText(counterCounterItem);
            expect(getAttributeByName(counterCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Deletion button examples:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(deletionListItems);
            checkElementText(deletionListItems);
            waitForElDisplayed(deletionIcon);
        });

        it('should check deletion', () => {
            click(deletionBtn);
            waitForInvisibilityOf(deletionListItems);
        });
    });

    describe('Multi Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(multiListItems);
            checkElArrIsClickable(multiListItems);
        });

        it('should check selection', () => {
            expect(getAttributeByName(multiList, selectionAttr)).toBe(multiSelect);
            expect(getText(multiToolbar)).toBe('0 : Items selected');
            click(multiCheckbox);
            expect(getText(multiToolbar)).toBe('1 : Items selected');
            click(multiCheckbox, 1);
            expect(getText(multiToolbar)).toBe('2 : Items selected');
        });
    });

    describe('Single Selection examples:', function() {
        it('should do basic checks', () => {
            checkElementText(singleListItems);
            checkElArrIsClickable(singleListItems);
        });

        it('should check selection', () => {
            const listItemId = getAttributeByName(singleListItems, 'id');

            expect(getAttributeByName(singleList, ariaMultiSelectable)).toBe('false');
            expect(getText(singleToolbar)).toContain(': selected');
            click(singleRadioBtn);
            expect(getText(singleToolbar)).toContain(listItemId + ' : selected');
        });
    });

    describe('Navigation Indication examples:', function() {
        it('should do basic checks', () => {
            const navListItemCount = getElementArrayLength(navListItems);

            checkElementText(navListItems);
            checkElArrIsClickable(navListItems);
            for (let i = 0; i < navListItemCount; i++) {
                expect(getElementClass(navListLink, i)).toContain(navIndicator);
            }
        });

        it('should check navigation', () => {
            click(navListLink);
            const newUrl = getCurrentUrl();
            expect(newUrl).toContain(navUrl);
            listPage.open();
        });
    });

    describe('Virtual Scroll examples:', function() {
        it('should do basic checks', () => {
            isElementClickable(vScrollListItems);
            checkElementText(vScrollListItems);
            checkAttributeValueTrue(vScrollList, scrollLoadAttr);
            checkAttributeValueTrue(vScrollList, lazyLoadAttr);
            refreshPage();
        });

        it('should check scroll', () => {
            // skip for FF due to issue https://github.com/SAP/fundamental-ngx/issues/4107
            if (browserIsSafariorFF()) {
                console.log('skip FF due to #4107, skip Safari');
                return;
            }
            scrollIntoView(vScrollListItems);
            const itemsStartCount = getElementArrayLength(vScrollListItems);
            click(vScrollListItems);
            sendKeys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);
            expect(waitForElDisplayed(vScrollLoadIcon)).toBe(true);
            waitForInvisibilityOf(vScrollLoadIcon);
            const itemsEndCount = getElementArrayLength(vScrollListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Load Data On Button Click examples:', function() {
        it('should do basic checks', () => {
            const itemCount = getElementArrayLength(loadListItems);

            checkElArrIsClickable(loadListItems);
            checkElementText(loadListItems);
            expect(getElementClass(loadListItems, itemCount - 1)).toContain(loadMoreClass)
        });

        it('should check loading on click', () => {
            const itemsStartCount = getElementArrayLength(loadListItems);
            click(loadShowMoreBtn);
            waitForInvisibilityOf(loadIcon);
            const itemsEndCount = getElementArrayLength(loadListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Buttons example:', function() {
        it('should do basic checks', () => {
            checkElArrIsClickable(btnListItems);
            checkElArrIsClickable(btnDeleteBtn);
            checkElArrIsClickable(btnEditBtn);
            checkElementText(btnListItems);
            expect(getAttributeByName(btnList, listTypeAttr)).toBe('detail');
            expect(getAttributeByName(btnList, selectionAttr)).toBe('delete');
        });

        it('should check delete action', () => {
            click(btnDeleteBtn);
            if (browserIsIE()) {
                acceptAlert();
                return;
            }
            expect(getAlertText()).toContain('Delete row');
            acceptAlert();
        });

        it('should check edit action', () => {
            click(btnEditBtn);
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
            checkElArrIsClickable(noDataListItems);
            expect(getElementClass(noDataCompactList)).toContain(compactClass)
            checkElementTextValue(noDataListItems, noDataText);
        });
    });

    describe('With Unread Data examples:', function() {
        it('should do basic checks and check unread data', () => {
            checkElArrIsClickable(unreadListItems);
            checkElementText(unreadListItems);
            expect(getAttributeByName(unreadListAttr, itemUnreadStatus, 1)).toBe('true');
        });
    });

    describe('check orientation', function() {
        it('should check RTL and LTR orientation', () => {
            listPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            refreshPage();
            waitForElDisplayed(listPage.title);
            listPage.saveExampleBaselineScreenshot();
            expect(listPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
