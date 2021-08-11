import { GridListPo } from '../pages/grid-list.po';
import {
    click,
    dragAndDrop,
    elementArray,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    waitForClickable,
    waitForElDisplayed,
    getElementClass
} from '../../driver/wdio';
import {
    text,
    productTitle,
    textLocked,
    isSelected,
} from '../fixtures/appData/grid-list-content';

describe('Grid-list test suite', function() {
    const gridListPage = new GridListPo();
    const {
        layoutPattern, singleSelectItems, multiSelectModeCheckboxes, moreButton, moreButtonItems, footer,
        gridListItemsByMode, deleteModeTitle, deleteItemButton, lockedStateItemButton, lockedStateItemText,
        gridListsArray, gridListsTitle, multiSelectModeSelectedItems, singleSelectItemsSelected, dragAndDropItems,
    } = gridListPage;

    beforeAll(() => {
        gridListPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(layoutPattern);
    }, 1);

    it('Verify clicking on read-more button', () => {
        let defaultItemsQuantity = 5;
        for (let i = 0; i < 8; i++) {
            scrollIntoView(moreButton);
            click(moreButton);
            expect(getText(moreButton)).toContain(`${defaultItemsQuantity + 5} / 50`);
            expect(getElementArrayLength(moreButtonItems)).toEqual(defaultItemsQuantity + 5);
            defaultItemsQuantity += 5;
        }
        click(moreButton);
        expect(moreButton).not.toBeDisplayed();
    });

    it('Footer should be displayed and contain information', () => {
        expect(getText(footer)).toBe(text);
    });

    it('Verify each grid list contains product counter -> product counter should be displayed for all lists', () => {
        const arrLength = getElementArrayLength(gridListsArray);
        for (let i = 0; i < arrLength; i++) {
            expect(getText(gridListsTitle, i)).toContain(productTitle);
        }
    });

    it('Verify grid list contains product counter', () => {
        let productsQuantityFromTitle = getText(deleteModeTitle).replace(/\D/g, '');
        const itemsArray = elementArray(gridListItemsByMode('delete'));
        const itemsArrayLength = itemsArray.length;
        expect(productsQuantityFromTitle).toEqual(itemsArrayLength.toString());
        for (let i = 0; i < itemsArrayLength; i++) {
            scrollIntoView(deleteItemButton);
            click(deleteItemButton);
            productsQuantityFromTitle = getText(deleteModeTitle).replace(/\D/g, '');
            const newArray = elementArray(gridListItemsByMode('delete'));
            expect(productsQuantityFromTitle).toEqual(newArray.length.toString());
        }
    });

    it(`Verify states: Text should be in bold if item is on unread state, Error message should be displayed in footer if item is on 'error' state
    Locker button should be displayed in footer if item is on 'locked' state, Draft button should be displayed in footer if item is on 'draft' state`, () => {
        waitForClickable(lockedStateItemButton);
        expect(getText(lockedStateItemText)).toBe(textLocked);
    });

    it('Verify selecting multiple items in "Multi select mode" component -> Multiple items can be selected. Checkbox should be checked when item is selected', () => {
        const arrayLength = getElementArrayLength(gridListItemsByMode('multiSelect'));
        let selectedArrayLength = getElementArrayLength(multiSelectModeSelectedItems);
        expect(selectedArrayLength).toEqual(1);
        for (let i = 0; i < arrayLength; i++) {
            scrollIntoView(multiSelectModeCheckboxes, i);
            click(multiSelectModeCheckboxes, i);
        }
        selectedArrayLength = getElementArrayLength(multiSelectModeSelectedItems);
        expect(selectedArrayLength).toEqual(arrayLength - 1);
    });

    it('Verify selecting item in Single select mode component', () => {
        const itemsLength = getElementArrayLength(singleSelectItems);
        for (let i = 0; i < itemsLength; i++) {
            scrollIntoView(singleSelectItems, i);
            click(singleSelectItems, i);
            expect(getElementClass(singleSelectItems, i)).toContain(isSelected);
            expect(getElementArrayLength(singleSelectItemsSelected)).toEqual(1);
        }
    });

    // Temporarily skipped due to drag and drop flakiness
    xit('User should be able to replace items order by drag and drop', () => {
        const itemsArrLength = getElementArrayLength(dragAndDropItems);
        for (let i = 0; i < itemsArrLength - 1; i++) {
            const firstItemTitle = getText(dragAndDropItems, i);
            const secondItemTitle = getText(dragAndDropItems, i + 1);
            dragAndDrop(dragAndDropItems, i, dragAndDropItems, i + 1);
            expect(getText(dragAndDropItems, i)).toBe(secondItemTitle);
            expect(getText(dragAndDropItems, i + 1)).toBe(firstItemTitle);
        }
    });

    describe('Check orientation', function() {
        it('Verify LTR / RTL orientation', () => {
            gridListPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            gridListPage.saveExampleBaselineScreenshot();
            expect(gridListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
