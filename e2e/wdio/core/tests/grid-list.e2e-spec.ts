import { GridListPo } from '../pages/grid-list.po';
import {
    addIsActiveClass,
    checkElementScreenshot,
    click, dragAndDrop, elementArray,
    getCSSPropertyByName,
    getElementArrayLength, getImageTagBrowserPlatform, getText, mouseHoverElement,
    refreshPage, saveElementScreenshot,
    scrollIntoView, waitForClickable, waitForElDisplayed, getElementClass
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
    fontWeight, bold, isSelected, button, item, link, toolbar, radioButton, checkbox
} from '../fixtures/appData/grid-list-content';

describe('Grid-list test suite', function() {
    const gridListPage = new GridListPo();
    const {
        layoutPattern, singleSelectItems, multiSelectModeCheckboxes,
        moreButton, moreButtonItems, footer, gridListItemsByMode, deleteModeTitle, deleteItemButton, unreadStateItem,
        errorStateItem, lockedStateItemButton, lockedStateItemText, gridListsArray, gridListsTitle,
        multiSelectModeSelectedItems, errorStatusIndicator, warningStatusIndicator, neutralStatusIndicator,
        singleSelectItemsSelected, successStatusIndicator, dragAndDropItems, gridListButtons,
        gridListItem, gridListLink, gridListToolbar, gridListRadioButton, gridListCheckbox, gridListItemUnread,
        gridListItemError, gridListItemStatus, gridListLinkStatus, gridListItemLocked, gridListItemDraft
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

    describe('Check visual regression', function() {

        it('should check examples visual regression', () => {
            gridListPage.saveExampleBaselineScreenshot();
            expect(gridListPage.compareWithBaseline()).toBeLessThan(5);
        });

        xit('verify buttons states', () => {
            const buttonsLength = getElementArrayLength(gridListButtons);
            for (let i = 0; i < buttonsLength; i++) {
                scrollIntoView(gridListButtons, i);
                checkElementHoverActiveStates(gridListButtons, buttonTag + i + '-', button, i);
            }
        });

        xit('verify toolbar states', () => {
            scrollIntoView(gridListToolbar);
            checkElementStates(gridListToolbar, toolbarTag, toolbar);
        });

        xit('verify radio button states', () => {
            const radioButtonLength = getElementArrayLength(gridListRadioButton);
            for (let i = 0; i < radioButtonLength; i++) {
                scrollIntoView(gridListRadioButton, i);
                checkElementStates(gridListRadioButton, radioButtonTag + i + '-', radioButton, i);
            }
        });

        xit('verify checkbox states', () => {
            const checkboxLength = getElementArrayLength(gridListCheckbox);
            for (let i = 0; i < checkboxLength; i++) {
                scrollIntoView(gridListCheckbox, i);
                checkElementStates(gridListCheckbox, checkboxTag + i + '-', checkbox, i);
            }
        });

        xdescribe('Check none mode example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem);
                checkElementStates(gridListItem, itemTag + '4-', item);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink);
                checkElementStates(gridListLink, linkTag + '4-', link);
            });
        });

        xdescribe('Check single select left mode example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 13);
                checkElementStates(gridListItem, itemTag + '5-', item, 13);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 6);
                checkElementStates(gridListLink, linkTag + '5-', link, 6);
            });
        });

        xdescribe('Check single select right mode example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 20);
                checkElementStates(gridListItem, itemTag + '6-', item, 20);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 13);
                checkElementStates(gridListLink, linkTag + '6-', link, 13);
            });
        });

        xdescribe('Check multi select mode example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 27);
                checkElementStates(gridListItem, itemTag + '7-', item, 27);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 20);
                checkElementStates(gridListLink, linkTag + '7-', link, 20);
            });
        });

        xdescribe('Check delete mode example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 34);
                checkElementStates(gridListItem, itemTag + '8-', item, 34);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 27);
                checkElementStates(gridListLink, linkTag + '8-', link, 27);
            });
        });

        xdescribe('Check group company A example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 41);
                checkElementStates(gridListItem, itemTag + '9-', item, 41);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 34);
                checkElementStates(gridListLink, linkTag + '9-', link, 34);
            });
        });

        xdescribe('Check group company B example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 45);
                checkElementStates(gridListItem, itemTag + '10-', item, 45);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 38);
                checkElementStates(gridListLink, linkTag + '10-', link, 38);
            });
        });

        xdescribe('Check states State: Unread example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItemUnread);
                checkElementStates(gridListItemUnread, itemTag + '11-', item);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 41);
                checkElementStates(gridListLink, linkTag + '11-', link, 41);
            });
        });

        xdescribe('Check states State: Error example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItemError);
                checkElementStates(gridListItemError, itemTag + '12-', item);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 42);
                checkElementStates(gridListLink, linkTag + '12-', link, 42);
            });
        });

        xdescribe('Check status examples', function() {
            it('verify item states', () => {
                const itemStatusLength = getElementArrayLength(gridListItemStatus);
                for (let i = 0; i < itemStatusLength; i++) {
                    scrollIntoView(gridListItemStatus, i);
                    checkElementStates(gridListItemStatus, itemTag + i + '-', item, i);
                }
            });

            it('verify link states', () => {
                const linkStatusLength = getElementArrayLength(gridListLinkStatus);
                for (let i = 0; i < linkStatusLength; i++) {
                    scrollIntoView(gridListLinkStatus, i);
                    checkElementStates(gridListLinkStatus, linkTag + i + '-', link, i);
                }
            });
        });

        xdescribe('Check more button example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 48);
                checkElementStates(gridListItem, itemTag + '13-', item, 48);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 52);
                checkElementStates(gridListLink, linkTag + '13-', link, 52);
            });
        });

        xdescribe('Check footer example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 53);
                checkElementStates(gridListItem, itemTag + '14-', item, 53);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 57);
                checkElementStates(gridListLink, linkTag + '14-', link, 57);
            });
        });

        xdescribe('Check drag and drop example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 58);
                checkElementStates(gridListItem, itemTag + '15-', item, 58);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 62);
                checkElementStates(gridListLink, linkTag + '15-', link, 62);
            });
        });

        xdescribe('Check layout example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItem, 66);
                checkElementStates(gridListItem, itemTag + '16-', item, 66);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 70);
                checkElementStates(gridListLink, linkTag + '16-', link, 70);
            });
        });

        xdescribe('Check single select mode example', function() {
            it('verify item with button states', () => {
                scrollIntoView(gridListItem, 6);
                checkElementStates(gridListItem, itemTag + '17-', item, 6);
            });

            it('verify item without button states', () => {
                scrollIntoView(gridListItem, 10);
                checkElementStates(gridListItem, itemTag + '18-', item, 10);
            });
        });

        xdescribe('Check states State: Locked example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItemLocked);
                checkElementStates(gridListItemLocked, itemTag + '19-', item);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 44);
                checkElementStates(gridListLink, linkTag + '17-', link, 44);
            });
        });

        xdescribe('Check states State: Draft example', function() {
            it('verify item states', () => {
                scrollIntoView(gridListItemDraft);
                checkElementStates(gridListItemDraft, itemTag + '20-', item);
            });

            it('verify link states', () => {
                scrollIntoView(gridListLink, 46);
                checkElementStates(gridListLink, linkTag + '18-', link, 46);
            });
        });
    });

    function checkElementHoverState(selector: string, tag: string, elementName: string, index: number = 0): void {
        mouseHoverElement(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with index ${index} hover state mismatch`);
    }

    function checkElementFocusState(selector: string, tag: string, elementName: string, index: number = 0): void {
        click(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with index ${index} focus state mismatch`);
    }

    function checkElementActiveState(selector: string, tag: string, elementName: string, index: number = 0): void {
        addIsActiveClass(selector, index);
        saveElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index);
        expect(checkElementScreenshot(selector, tag + getImageTagBrowserPlatform(), gridListPage.getScreenshotFolder(), index))
            .toBeLessThan(5, `${elementName} element item with index ${index} active state mismatch`);
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
