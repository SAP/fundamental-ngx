import { ListPo } from './list.po';
import {
    acceptAlert,
    browserIsIE,
    browserIsSafari,
    checkElArrIsClickable,
    checkElementText,
    checkElementTextValue,
    click,
    getAlertText,
    getAttributeByName,
    getCSSPropertyByName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    getElementSize,
    getText,
    isElementClickable,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForNotPresent,
    waitForPresent
} from '../../../../../e2e';
import {
    borderStyleAttr,
    compactClass,
    listTypeAttr,
    loadMoreClass,
    multiSelect,
    navIndicator,
    navUrl,
    noDataText,
    selectionAttr
} from './list-contents';

declare const $$: any;

describe('List test suite:', () => {
    const listPage = new ListPo();
    const {
        noBorderListItems,
        noBorderCompactList,
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
        singleListItems,
        singleRadioBtn,
        navListItems,
        navListLink,
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
        unreadListItems,
        multiCheckBoxMark,
        singleRadioBtnInput,
        cozyItem,
        compactItem
    } = listPage;

    beforeAll(async () => {
        await listPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(listPage.root);
        await waitForElDisplayed(listPage.title);
    }, 1);

    describe('Borderless examples:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(noBorderListItems);
            await checkElementText(noBorderListItems);
            await expect(await $$(`${noBorderCompactList} > .${compactClass}`)).toBeTruthy();
        });

        it('should check border border-style property', async () => {
            await getCSSPropertyByName(noBorderListItems, borderStyleAttr);
        });
    });

    describe('Footer examples:', () => {
        it('should do basic checks and check footer', async () => {
            await checkElArrIsClickable(footerListItems);
            await checkElementText(footerListItems);
            await checkElementText(footer);
            await expect(await $$(`${footerCompactList} > .${compactClass}`)).toBeTruthy();
        });
    });

    describe('Group header examples:', () => {
        it('should do basic checks and check header', async () => {
            await checkElArrIsClickable(groupHeaderListItems);
            await checkElementText(groupHeaderListItems);
            await checkElementText(groupHeader);
            await expect(await $$(`${groupCompactList} > .${compactClass}`)).toBeTruthy();
        });
    });

    describe('Interactive States examples:', () => {
        it('should do basic checks', async () => {
            await checkElementText(interactiveListItems);
            await checkElArrIsClickable(interactiveListItems);
        });
    });

    describe('Item Counter examples:', () => {
        it('should do basic checks and check counter', async () => {
            await checkElArrIsClickable(counterListItems);
            await checkElementText(counterTitleItems);
            await checkElementText(counterCounterItem);
            await expect(await $$(`${counterCompactList} > .${compactClass}`)).toBeTruthy();
        });
    });

    describe('Deletion button examples:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(deletionListItems);
            await checkElementText(deletionListItems);
            await waitForElDisplayed(deletionIcon);
        });

        it('should check deletion', async () => {
            await click(deletionBtn);
            await waitForInvisibilityOf(deletionListItems);
        });
    });

    describe('Multi Selection examples:', () => {
        it('should do basic checks', async () => {
            await checkElementText(multiListItems);
            await checkElArrIsClickable(multiListItems);
        });

        it('should check selection', async () => {
            await expect(await getAttributeByName(multiList, selectionAttr)).toBe(multiSelect);
            await expect(await getText(multiToolbar)).toBe('0 : Items selected');
            await click(multiCheckbox);
            await expect(await getText(multiToolbar)).toBe('1 : Items selected');
            await expect(await getAttributeByName(multiCheckBoxMark, 'aria-selected')).toBe('true');

            await click(multiCheckbox, 1);
            await expect(await getText(multiToolbar)).toBe('2 : Items selected');
            await expect(await getAttributeByName(multiCheckBoxMark, 'aria-selected', 1)).toBe('true');

            await click(multiCheckbox, 2);
            await expect(await getText(multiToolbar)).toBe('3 : Items selected');
            await expect(await getAttributeByName(multiCheckBoxMark, 'aria-selected', 2)).toBe('true');

            await click(multiCheckbox, 3);
            await expect(await getText(multiToolbar)).toBe('4 : Items selected');
            await expect(await getAttributeByName(multiCheckBoxMark, 'aria-selected', 3)).toBe('true');
        });
    });

    describe('Single Selection examples:', () => {
        it('should do basic checks', async () => {
            await checkElementText(singleListItems);
            await checkElArrIsClickable(singleListItems);
        });
        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7245
        xit('should check selection', async () => {
            const radioBtnLength = await getElementArrayLength(singleRadioBtn);
            for (let i = 0; i < radioBtnLength; i++) {
                await click(singleRadioBtnInput, i);
                await expect(await getAttributeByName(singleRadioBtn, 'aria-selected')).toBe('true');
            }
        });
    });

    describe('Navigation Indication examples:', () => {
        it('should do basic checks', async () => {
            const navListItemCount = await getElementArrayLength(navListItems);

            await checkElementText(navListItems);
            await checkElArrIsClickable(navListItems);
            for (let i = 0; i < navListItemCount; i++) {
                await expect(await getElementClass(navListLink, i)).toContain(navIndicator);
            }
        });

        it('should check navigation', async () => {
            await click(navListLink);
            const newUrl = await getCurrentUrl();
            await expect(newUrl).toContain(navUrl);
            await listPage.open();
        });
    });

    describe('Virtual Scroll examples:', () => {
        it('should do basic checks', async () => {
            await isElementClickable(vScrollListItems);
            await checkElementText(vScrollListItems);
        });

        it('should check scroll', async () => {
            if (await browserIsSafari()) {
                console.log('skip Safari');
                return;
            }
            await scrollIntoView(vScrollListItems);
            const itemsStartCount = await getElementArrayLength(vScrollListItems);
            await click(vScrollListItems);
            await sendKeys(['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown']);
            // pause to give the browser time to process actions and generate loading icons
            await pause(650);
            await waitForNotPresent(vScrollLoadIcon);
            const itemsEndCount = await getElementArrayLength(vScrollListItems);
            await expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Load Data On Button Click examples:', () => {
        it('should do basic checks', async () => {
            const itemCount = await getElementArrayLength(loadListItems);

            await checkElArrIsClickable(loadListItems);
            await checkElementText(loadListItems);
            await expect(await getElementClass(loadListItems, itemCount - 1)).toContain(loadMoreClass);
        });

        it('should check loading on click', async () => {
            const itemsStartCount = await getElementArrayLength(loadListItems);
            await click(loadShowMoreBtn);
            await waitForInvisibilityOf(loadIcon);
            const itemsEndCount = await getElementArrayLength(loadListItems);
            await expect(itemsStartCount).not.toEqual(itemsEndCount);
        });
    });

    describe('Buttons example:', () => {
        it('should do basic checks', async () => {
            await checkElArrIsClickable(btnListItems);
            await checkElArrIsClickable(btnDeleteBtn);
            await checkElArrIsClickable(btnEditBtn);
            await checkElementText(btnListItems);
            await expect(await getAttributeByName(btnList, listTypeAttr)).toBe('detail');
            await expect(await getAttributeByName(btnList, selectionAttr)).toBe('delete');
        });

        it('should check delete action', async () => {
            await click(btnDeleteBtn);
            if (await browserIsIE()) {
                await acceptAlert();
                return;
            }
            await expect(await getAlertText()).toContain('Delete row');
            await acceptAlert();
        });

        it('should check edit action', async () => {
            await click(btnEditBtn);
            if (await browserIsIE()) {
                await acceptAlert();
                return;
            }
            await expect(await getAlertText()).toContain('Edit row');
            await acceptAlert();
        });
    });

    describe('With No Data examples:', () => {
        it('should do basic checks and check no data text', async () => {
            await checkElArrIsClickable(noDataListItems);
            await expect(await getElementClass(noDataCompactList)).toContain(compactClass);
            await checkElementTextValue(noDataListItems, noDataText);
        });
    });

    describe('With Unread Data examples:', () => {
        it('should do basic checks and check unread data', async () => {
            await checkElArrIsClickable(unreadListItems);
            await checkElementText(unreadListItems);
        });
    });

    it('should check the sizes compact and cozy', async () => {
        const cozySize = await getElementSize(cozyItem);
        const compactSize = await getElementSize(compactItem);

        await expect(cozySize.height).toBeGreaterThan(compactSize.height);
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', async () => {
            await listPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await refreshPage();
            await waitForElDisplayed(listPage.title);
            await listPage.saveExampleBaselineScreenshot();
            await expect(await listPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
