import {
    acceptAlert,
    browserIsIE,
    browserIsSafari,
    checkElArrIsClickable,
    checkElementText,
    click,
    getAlertText,
    getAttributeByName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementClickable,
    pause,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForInvisibilityOf,
    waitForNotPresent
} from '../../../../../e2e';
import { loadMoreClass, multiSelect, navIndicator, navUrl, selectionAttr } from './list-contents';
import { ListPo } from './list.po';

describe('List test suite:', () => {
    const listPage = new ListPo();
    const {
        deletionListItems,
        deletionBtn,
        multiList,
        multiToolbar,
        multiCheckbox,
        navListItems,
        navListLink,
        vScrollListItems,
        vScrollLoadIcon,
        loadListItems,
        loadShowMoreBtn,
        loadIcon,
        btnDeleteBtn,
        btnEditBtn,
        multiCheckBoxMark
    } = listPage;

    beforeAll(async () => {
        await listPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await listPage.waitForRoot();
        await waitForElDisplayed(listPage.title);
    }, 1);

    describe('Deletion button examples:', () => {
        it('should check deletion', async () => {
            await click(deletionBtn);
            await waitForInvisibilityOf(deletionListItems);
        });
    });

    describe('Multi Selection examples:', () => {
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
});
