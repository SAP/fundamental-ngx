import { GridListPo } from '../pages/grid-list.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click, dragAndDrop, elementArray,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength, getImageTagBrowserPlatform, getText, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForClickable, waitForElDisplayed
} from '../../driver/wdio';

import {
    buttonTag,
    checkboxTag,
    itemTag,
    linkTag,
    radioButtonTag,
    toolbarTag
} from '../fixtures/testData/grid-list-tags';

import {
    text, productTitle, textLocked, warningColor, successColor, neutralColor, errorColor, color, backGroundColor,
    fontWeight, bold, classAttribute, isSelected, button, item, link, toolbar, radioButton, checkbox
} from '../fixtures/appData/grid-list-content';

describe('Grid-list test suite', function() {
    const gridListPage = new GridListPo();
    const {
        layoutPattern, singleSelectItems, multiSelectModeCheckboxes,
        moreButton, moreButtonItems, footer, gridListItemsByMode, deleteModeTitle, deleteItemButton, unreadStateItem,
        errorStateItem, lockedStateItemButton, lockedStateItemText, gridListsArray, gridListsTitle,
        multiSelectModeSelectedItems, errorStatusIndicator, warningStatusIndicator, neutralStatusIndicator,
        singleSelectItemsSelected, successStatusIndicator, dragAndDropItems, gridListButtons,
        gridListItem, gridListLink, gridListToolbar, gridListRadioButton, gridListCheckbox
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
        expect(getCSSPropertyByName(unreadStateItem, fontWeight).value).toBe(bold);
        expect(warningColor).toContain(getCSSPropertyByName(errorStateItem, color).value);
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

    it('Verify corresponding indicator color should be displayed for all statuses', () => {
        expect(successColor).toContain(getCSSPropertyByName(successStatusIndicator, backGroundColor).value);
        expect(warningColor).toContain(getCSSPropertyByName(warningStatusIndicator, backGroundColor).value);
        expect(errorColor).toContain(getCSSPropertyByName(errorStatusIndicator, backGroundColor).value);
        expect(neutralColor).toContain(getCSSPropertyByName(neutralStatusIndicator, backGroundColor).value);
    });

    it('Verify selecting item in Single select mode component', () => {
        const itemsLength = getElementArrayLength(singleSelectItems);
        for (let i = 0; i < itemsLength; i++) {
            scrollIntoView(singleSelectItems, i);
            click(singleSelectItems, i);
            expect(getAttributeByName(singleSelectItems, classAttribute, i)).toContain(isSelected);
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

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            gridListPage.saveExampleBaselineScreenshot();
            expect(gridListPage.compareWithBaseline()).toBeLessThan(5);
        });

        it('verify buttons states', () => {
            const buttonsLength = getElementArrayLength(gridListButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(gridListButtons, i);
                checkElementHoverActiveStates(gridListButtons, buttonTag + i + '-', button, i);
            }
        });

        it('verify item states', () => {
            const itemLength = getElementArrayLength(gridListItem);
            for (let i = 0; i < itemLength; i++) {
                scrollIntoView(gridListItem, i);
                checkElementStates(gridListItem, itemTag + i + '-', item, i);
            }
        });

        it('verify link states', () => {
            const linkLength = getElementArrayLength(gridListLink);
            for (let i = 0; i < linkLength; i++) {
                scrollIntoView(gridListLink, i);
                checkElementStates(gridListLink, linkTag + i + '-', link, i);
            }
        });

        it('verify toolbar states', () => {
            scrollIntoView(gridListToolbar);
            checkElementStates(gridListToolbar, toolbarTag, toolbar);
        });

        it('verify radio button states', () => {
            const radioButtonLength = getElementArrayLength(gridListRadioButton);
            for (let i = 0; i < radioButtonLength; i++) {
                scrollIntoView(gridListRadioButton, i);
                checkElementStates(gridListRadioButton, radioButtonTag + i + '-', radioButton, i);
            }
        });

        it('verify checkbox states', () => {
            const checkboxLength = getElementArrayLength(gridListCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                scrollIntoView(gridListCheckbox, i);
                checkElementStates(gridListCheckbox, checkboxTag + i + '-', checkbox, i);
            }
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item ${index} active state mismatch`);
    }

    function checkElementHoverActiveStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }

    function checkElementStates(selector: string, tag: string, elementName: string, index: number = 0): void {
        checkElementHoverState(selector, tag + 'hover-state-', elementName, index);
        checkElementFocusState(selector, tag + 'focus-state-', elementName, index);
        checkElementActiveState(selector, tag + 'active-state-', elementName, index);
    }
});
