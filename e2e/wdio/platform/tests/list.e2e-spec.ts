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
    listTitleArr
} from '../fixtures/appData/list-contents';
import {
    acceptAlert,
    browserIsIE,
    click,
    getAlertText,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForInvisibilityOf,
    pause,
    waitForNotPresent,
    browserIsSafari,
    isElementDisplayed,
    getTextArr,
    getElementSize,
    waitForPresent
} from '../../driver/wdio';

describe('List test suite:', () => {
    const listPage = new ListPo();
    const {
        noBorderListItems,
        noBorderCompactList,
        noBorderList,
        footerListItems,
        footerCompactList,
        footer,
        groupHeader,
        groupHeaderListItems,
        groupCompactList,
        interactiveListItems,
        counterListItems,
        counterCompactList,
        counterTitleItems,
        counterCounterItem,
        deletionListItems,
        deletionBtn,
        deletionIcon,
        multiList,
        multiListItems,
        multiToolbar,
        multiCheckbox,
        singleList,
        singleListItems,
        singleToolbar,
        singleRadioBtn,
        navListItems,
        navListLink,
        vScrollList,
        vScrollListItems,
        vScrollLoadIcon,
        loadListItems,
        loadShowMoreBtn,
        loadIcon,
        btnList,
        btnListItems,
        btnDeleteBtn,
        btnEditBtn,
        noDataListItems,
        noDataCompactList,
        unreadListAttr,
        unreadListItems,
        multiCheckBoxMark,
        singleRadioBtnInput,
        busyIndicator,
        noSepList,
        noSepListItems,
        cozyItem,
        compactItem
    } = listPage;

    beforeAll(() => {
        listPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(noBorderListItems);
    }, 1);

    describe('Borderless examples:', () => {
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

    describe('Footer examples:', () => {
        it('should do basic checks and check footer', () => {
            checkElArrIsClickable(footerListItems);
            checkElementText(footerListItems);
            checkElementText(footer);
            expect(getAttributeByName(footerCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Group header examples:', () => {
        it('should do basic checks and check header', () => {
            checkElArrIsClickable(groupHeaderListItems);
            checkElementText(groupHeaderListItems);
            checkElementText(groupHeader);
            expect(getAttributeByName(groupCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Interactive States examples:', () => {
        it('should do basic checks', () => {
            checkElementText(interactiveListItems);
            checkElArrIsClickable(interactiveListItems);
        });
    });

    describe('Item Counter examples:', () => {
        it('should do basic checks and check counter', () => {
            checkElArrIsClickable(counterListItems);
            checkElementText(counterTitleItems);
            checkElementText(counterCounterItem);
            expect(getAttributeByName(counterCompactList, compactAttr)).toBe(compactValue);
        });
    });

    describe('Deletion button examples:', () => {
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

    describe('Multi Selection examples:', () => {
        it('should do basic checks', () => {
            checkElementText(multiListItems);
            checkElArrIsClickable(multiListItems);
        });

        it('should check selection', () => {
            expect(getAttributeByName(multiList, selectionAttr)).toBe(multiSelect);
            expect(getText(multiToolbar)).toBe('0 : Items selected');
            click(multiCheckbox);
            expect(getText(multiToolbar)).toBe('1 : Items selected');
            expect(getAttributeByName(multiCheckBoxMark, 'aria-selected')).toBe('true');

            click(multiCheckbox, 1);
            expect(getText(multiToolbar)).toBe('2 : Items selected');
            expect(getAttributeByName(multiCheckBoxMark, 'aria-selected', 1)).toBe('true');

            click(multiCheckbox, 2);
            expect(getText(multiToolbar)).toBe('3 : Items selected');
            expect(getAttributeByName(multiCheckBoxMark, 'aria-selected', 2)).toBe('true');

            click(multiCheckbox, 3);
            expect(getText(multiToolbar)).toBe('4 : Items selected');
            expect(getAttributeByName(multiCheckBoxMark, 'aria-selected', 3)).toBe('true');
        });
    });

    describe('Single Selection examples:', () => {
        it('should do basic checks', () => {
            checkElementText(singleListItems);
            checkElArrIsClickable(singleListItems);
        });
        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7245
        xit('should check selection', () => {
            const radioBtnLength = getElementArrayLength(singleRadioBtn);
            for (let i = 0; i < radioBtnLength; i++) {
                click(singleRadioBtnInput, i);
                expect(getAttributeByName(singleRadioBtn, 'aria-selected')).toBe('true');
            }
        });
    });

    describe('Navigation Indication examples:', () => {
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

    describe('Virtual Scroll examples:', () => {
        it('should do basic checks', () => {
            isElementClickable(vScrollListItems);
            checkElementText(vScrollListItems);
            checkAttributeValueTrue(vScrollList, scrollLoadAttr);
            checkAttributeValueTrue(vScrollList, lazyLoadAttr);
            refreshPage();
            waitForElDisplayed(listPage.title);
        });

        it('should check scroll', () => {
            if (browserIsSafari()) {
                console.log('skip Safari');
                return;
            }
            scrollIntoView(vScrollListItems);
            const itemsStartCount = getElementArrayLength(vScrollListItems);
            click(vScrollListItems);
            sendKeys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);
            // pause to give the browser time to process actions and generate loading icons
            pause(650);
            expect(isElementDisplayed(busyIndicator)).toBe(true);
            waitForNotPresent(vScrollLoadIcon);
            const itemsEndCount = getElementArrayLength(vScrollListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Load Data On Button Click examples:', () => {
        it('should do basic checks', () => {
            const itemCount = getElementArrayLength(loadListItems);

            checkElArrIsClickable(loadListItems);
            checkElementText(loadListItems);
            expect(getElementClass(loadListItems, itemCount - 1)).toContain(loadMoreClass);
        });

        it('should check loading on click', () => {
            const itemsStartCount = getElementArrayLength(loadListItems);
            click(loadShowMoreBtn);
            waitForInvisibilityOf(loadIcon);
            const itemsEndCount = getElementArrayLength(loadListItems);
            expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Buttons example:', () => {
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

    describe('With No Data examples:', () => {
        it('should do basic checks and check no data text', () => {
            checkElArrIsClickable(noDataListItems);
            expect(getElementClass(noDataCompactList)).toContain(compactClass);
            checkElementTextValue(noDataListItems, noDataText);
        });
    });

    describe('With No Separator examples:', () => {
        it('should do basic checks and check no data text', () => {
            checkElArrIsClickable(noSepListItems);
            checkElementTextValue(noSepListItems, listTitleArr);
            expect(getElementClass(noSepList)).toContain('no-border');
        });
    });

    describe('With Unread Data examples:', () => {
        it('should do basic checks and check unread data', () => {
            checkElArrIsClickable(unreadListItems);
            checkElementText(unreadListItems);
            expect(getAttributeByName(unreadListAttr, itemUnreadStatus, 1)).toBe('true');
        });
    });

    it('should check the sizes compact and cozy', () => {
        const cozySize = getElementSize(cozyItem);
        const compactSize = getElementSize(compactItem);

        expect(cozySize.height).toBeGreaterThan(compactSize.height);
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            listPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            refreshPage();
            waitForElDisplayed(listPage.title);
            listPage.saveExampleBaselineScreenshot();
            expect(listPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
