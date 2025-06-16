import {
    acceptAlert,
    click,
    doesItExist,
    elementArray,
    getElementArrayLength,
    getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { isSelected, text, textLocked } from './grid-list-content';
import { GridListPo } from './grid-list.po';

describe('Grid-list test suite', () => {
    const gridListPage = new GridListPo();
    const {
        singleSelectItems,
        multiSelectModeCheckboxes,
        moreButton,
        moreButtonItems,
        footer,
        gridListItemsByMode,
        deleteItemButton,
        lockedStateItemButton,
        lockedStateItemText,
        multiSelectModeSelectedItems,
        singleSelectItemsSelected,
        gridListToolbar,
        deleteSegmentedButton,
        multiSelectSegmentedButton
    } = gridListPage;

    beforeAll(async () => {
        await gridListPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await gridListPage.waitForRoot();
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

    it('Verify grid list contains product counter', async () => {
        await click(deleteSegmentedButton);

        const titleSelector = await $('fd-grid-list-title-bar[title="Products"]');
        const countSelector = 'fd-grid-list-title-bar[title="Products"] span';

        let productCount = await $(countSelector).getText();
        productCount = productCount.replace(/[()]/g, '');

        expect(productCount).toEqual('6');
        await titleSelector.waitForDisplayed({ timeout: 5000 });

        const titleText = await titleSelector.getText();
        await expect(titleText).withContext('Products title should be displayed correctly').toContain('Products');

        const itemsArray = await elementArray(await gridListItemsByMode('delete'));
        const itemsArrayLength = itemsArray.length;
        await expect(productCount)
            .withContext('Initial product count should match the number of items')
            .toEqual(itemsArrayLength.toString());

        for (let i = 0; i < itemsArrayLength; i++) {
            await scrollIntoView(deleteItemButton);
            await click(deleteItemButton);
            await acceptAlert();

            const updatedItemsArray = await elementArray(await gridListItemsByMode('delete'));
            await expect(updatedItemsArray.length.toString())
                .withContext(`Product count after deletion should match remaining items (${updatedItemsArray.length})`)
                .toEqual(updatedItemsArray.length.toString());
        }
    });

    it(`Verify states: Text should be in bold if item is on unread state, Error message should be displayed in footer if item is on 'error' state
    Locker button should be displayed in footer if item is on 'locked' state, Draft button should be displayed in footer if item is on 'draft' state`, async () => {
        await waitForClickable(lockedStateItemButton);
        await expect((await getText(lockedStateItemText)).trim()).toBe(textLocked);
    });

    it('Verify selecting multiple items in "Multi select mode" component -> Multiple items can be selected. Checkbox should be checked when item is selected', async () => {
        await click(multiSelectSegmentedButton);
        const arrayLength = await getElementArrayLength(await gridListItemsByMode('multiSelect'));
        let selectedArrayLength = await getElementArrayLength(multiSelectModeSelectedItems);
        await expect(selectedArrayLength).toEqual(1);
        for (let i = 0; i < arrayLength; i++) {
            await scrollIntoView(multiSelectModeCheckboxes, i);
            await click(multiSelectModeCheckboxes, i);
            try {
                // alerts block any interactions with the page
                await browser.dismissAlert();
            } catch {}
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
});
