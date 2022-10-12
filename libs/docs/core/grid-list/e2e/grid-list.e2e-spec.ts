import { GridListPo } from './grid-list.po';
import {
    acceptAlert,
    click,
    doesItExist,
    dragAndDrop,
    elementArray,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { isSelected, productTitle, text, textLocked } from './grid-list-content';

describe('Grid-list test suite', () => {
    const gridListPage = new GridListPo();
    const {
        singleSelectItems,
        multiSelectModeCheckboxes,
        moreButton,
        moreButtonItems,
        footer,
        gridListItemsByMode,
        deleteModeTitle,
        deleteItemButton,
        lockedStateItemButton,
        lockedStateItemText,
        gridListsArray,
        gridListsTitle,
        multiSelectModeSelectedItems,
        singleSelectItemsSelected,
        dragAndDropItems,
        gridListToolbar
    } = gridListPage;

    beforeAll(async () => {
        await gridListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(gridListPage.root);
        await waitForElDisplayed(gridListPage.title);
    }, 1);

    it('Verify clicking on read-more button', async () => {
        let defaultItemsQuantity = 5;
        for (let i = 0; i < 8; i++) {
            await scrollIntoView(moreButton);
            await click(moreButton);
            await expect(await getText(moreButton)).toContain(`${defaultItemsQuantity + 5} / 50`);
            await expect(await getElementArrayLength(moreButtonItems)).toEqual(defaultItemsQuantity + 5);
            defaultItemsQuantity += 5;
        }
        await click(moreButton);
        const isDisplayed = await $(moreButton).isDisplayed();
        await expect(isDisplayed).toBeFalsy();
    });

    it('Footer should be displayed and contain information', async () => {
        await expect(await getText(footer)).toBe(text);
    });

    it('Verify each grid list contains product counter -> product counter should be displayed for all lists', async () => {
        const arrLength = await getElementArrayLength(gridListsArray);
        for (let i = 0; i < arrLength; i++) {
            await expect(await getText(gridListsTitle, i)).toContain(productTitle);
        }
    });

    it('Verify grid list contains product counter', async () => {
        let productsQuantityFromTitle = (await getText(deleteModeTitle)).replace(/\D/g, '');
        const itemsArray = await elementArray(await gridListItemsByMode('delete'));
        const itemsArrayLength = itemsArray.length;
        await expect(productsQuantityFromTitle).toEqual(itemsArrayLength.toString());
        for (let i = 0; i < itemsArrayLength; i++) {
            await scrollIntoView(deleteItemButton);
            await click(deleteItemButton);
            await acceptAlert();
            productsQuantityFromTitle = (await getText(deleteModeTitle)).replace(/\D/g, '');
            const newArray = await elementArray(await gridListItemsByMode('delete'));
            await expect(productsQuantityFromTitle).toEqual(newArray.length.toString());
        }
    });

    it(`Verify states: Text should be in bold if item is on unread state, Error message should be displayed in footer if item is on 'error' state
    Locker button should be displayed in footer if item is on 'locked' state, Draft button should be displayed in footer if item is on 'draft' state`, async () => {
        await waitForClickable(lockedStateItemButton);
        await expect((await getText(lockedStateItemText)).trim()).toBe(textLocked);
    });

    // eslint-disable-next-line max-len
    it('Verify selecting multiple items in "Multi select mode" component -> Multiple items can be selected. Checkbox should be checked when item is selected', async () => {
        const arrayLength = await getElementArrayLength(await gridListItemsByMode('multiSelect'));
        let selectedArrayLength = await getElementArrayLength(multiSelectModeSelectedItems);
        await expect(selectedArrayLength).toEqual(1);
        for (let i = 0; i < arrayLength; i++) {
            await scrollIntoView(multiSelectModeCheckboxes, i);
            await click(multiSelectModeCheckboxes, i);
        }
        selectedArrayLength = await getElementArrayLength(multiSelectModeSelectedItems);
        await expect(selectedArrayLength).toEqual(arrayLength - 1);
    });

    it('Verify selecting item in Single select mode component', async () => {
        const itemsLength = await getElementArrayLength(singleSelectItems);
        for (let i = 0; i < itemsLength; i++) {
            await scrollIntoView(singleSelectItems, i);
            await click(singleSelectItems, i);
            await expect(await getElementClass(singleSelectItems, i)).toContain(isSelected);
            await expect(await getElementArrayLength(singleSelectItemsSelected)).toEqual(1);
        }
    });

    // Temporarily skipped due to drag and drop flakiness
    xit('User should be able to replace items order by drag and drop', async () => {
        const itemsArrLength = await getElementArrayLength(dragAndDropItems);
        for (let i = 0; i < itemsArrLength - 1; i++) {
            const firstItemTitle = await getText(dragAndDropItems, i);
            const secondItemTitle = await getText(dragAndDropItems, i + 1);
            await dragAndDrop(dragAndDropItems, i, dragAndDropItems, i + 1);
            await expect(await getText(dragAndDropItems, i)).toBe(secondItemTitle);
            await expect(await getText(dragAndDropItems, i + 1)).toBe(firstItemTitle);
        }
    });

    it('should check closing grid list toolbar', async () => {
        await scrollIntoView(gridListToolbar);
        await click(gridListToolbar);
        await expect(await doesItExist(gridListToolbar)).toBe(false);
    });

    describe('Check orientation', () => {
        it('Verify LTR / RTL orientation', async () => {
            await gridListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await gridListPage.saveExampleBaselineScreenshot();
            await expect(await gridListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
