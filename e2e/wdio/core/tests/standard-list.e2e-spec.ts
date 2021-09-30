import { StandardListPo } from '../pages/standard-list.po';
import {
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndDragElement,
    doesItExist,
    executeScriptBeforeTagAttr,
    getElementArrayLength,
    getElementLocation,
    getImageTagBrowserPlatform,
    getText,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotDisplayed,
    getElementClass
} from '../../driver/wdio';

describe('Standard List test suite', function() {
    const standardListPage = new StandardListPo();
    const {
        listItems,
        actionList,
        button,
        busyIndicator,
        filterAndSortList,
        searchBar,
        cozyMultiSelectList,
        compactMultiSelectList,
        cozySingleSelectList,
        compactSingleSelectList,
        selectedItems,
        keyboardSupportList,
        dragAndDropList,
        infiniteList,
    } = standardListPage;

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    describe('action list examples', function() {
        it('should check show more button functionality', () => {
            const startItemsCount = getElementArrayLength(actionList + listItems);

            click(actionList + button);
            waitForNotDisplayed(actionList + busyIndicator);

            expect(getElementArrayLength(actionList + listItems)).not.toEqual(startItemsCount);
        });
    });

    describe('filter and sort list examples', function() {
        afterEach(() => {
            refreshPage();
            waitForElDisplayed(standardListPage.title);
        }, 1);

        it('should check ability to search', () => {
            scrollIntoView(filterAndSortList);
            click(filterAndSortList + searchBar);
            sendKeys('apple');
            const resultCount = getElementArrayLength(filterAndSortList + listItems);
            for (let i = 0; i < resultCount; i++) {
                expect(getText(filterAndSortList + listItems, i).toLowerCase()).toContain('apple');
            }
        });

        it('should check the ability to clear search', () => {
            const startItemCount = getElementArrayLength(filterAndSortList + listItems);

            scrollIntoView(filterAndSortList);
            click(filterAndSortList + searchBar);
            sendKeys('apple');

            expect(getElementArrayLength(filterAndSortList + listItems)).not.toEqual(startItemCount);

            click(filterAndSortList + button);

            expect(getElementArrayLength(filterAndSortList + listItems)).toEqual(startItemCount);
        });

        it('should check the ability to sort', () => {
            const itemCount = getElementArrayLength(filterAndSortList + listItems);
            const originalFirstItem = getText(filterAndSortList + listItems);
            const originalLastItem = getText(filterAndSortList + listItems, itemCount - 1);

            click(filterAndSortList + button, 2);

            expect(getText(filterAndSortList + listItems)).toBe(originalLastItem);
            expect(getText(filterAndSortList + listItems, itemCount - 1)).toBe(originalFirstItem);

            click(filterAndSortList + button, 1);

            expect(getText(filterAndSortList + listItems)).toBe(originalFirstItem);
            expect(getText(filterAndSortList + listItems, itemCount - 1)).toBe(originalLastItem);
        });

        it('should check the ability to delete an item', () => {
            const startItemCount = getElementArrayLength(filterAndSortList + listItems);

            click(filterAndSortList + button, 4);

            expect(getElementArrayLength(filterAndSortList + listItems)).toEqual(startItemCount - 1);
        });
    });

    describe('selection list example', function() {
        beforeEach(() => {
            refreshPage();
            waitForElDisplayed(standardListPage.title);
        }, 1);


        it('check cozy multi-selection functionality', () => {
            const itemCount = getElementArrayLength(cozyMultiSelectList + listItems);

            checkSelections(cozyMultiSelectList, itemCount, 'cozy multiSelect');

            expect(getElementArrayLength(cozyMultiSelectList + selectedItems)).toEqual(itemCount);
        });

        it('check compact multi-selection functionality', () => {
            const itemCount = getElementArrayLength(compactMultiSelectList + listItems);

            checkSelections(compactMultiSelectList, itemCount, 'compact multiSelect');

            expect(getElementArrayLength(compactMultiSelectList + selectedItems)).toEqual(itemCount);
        });

        it('check cozy single-selection functionality', () => {
            const itemCount = getElementArrayLength(cozySingleSelectList + listItems);

            checkSelections(cozySingleSelectList, itemCount, 'cozy singleSelect');

            expect(getElementArrayLength(cozySingleSelectList + selectedItems)).toEqual(1);
        });

        it('check compact single-selection functionality', () => {
            const itemCount = getElementArrayLength(compactSingleSelectList + listItems);

            checkSelections(compactSingleSelectList, itemCount, 'compact singleSelect');

            expect(getElementArrayLength(compactSingleSelectList + selectedItems)).toEqual(1);
        });
    });

    describe('keyboard support example', function() {
        it('should check keyboard navigation', () => {
            const itemCount = getElementArrayLength(keyboardSupportList + listItems);
            click(keyboardSupportList + button);

            expect(executeScriptBeforeTagAttr(keyboardSupportList + listItems, pickBorderStyleAttribute(), 0))
                .toContain('dotted');

            for (let i = 1; i < itemCount; i++) {
                sendKeys('ArrowDown');
                expect(executeScriptBeforeTagAttr(keyboardSupportList + listItems, pickBorderStyleAttribute(), i))
                    .toContain('dotted');
            }
        });
    });

    describe('drag and drop examples', function() {
        it('check drag and drop ability', () => {
            scrollIntoView(dragAndDropList + listItems);
            const originalFirstItemText = getText(dragAndDropList + listItems);
            const startLocationX = Math.floor(getElementLocation(dragAndDropList + listItems, 0, 'x'));
            const startLocationY = Math.floor(getElementLocation(dragAndDropList + listItems, 0, 'y'));

            if (!browserIsFirefox()) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }

            clickAndDragElement(startLocationX + 5, startLocationY + 5, startLocationX + 5, startLocationY + 100);

            expect(getText(dragAndDropList + listItems)).not.toEqual(originalFirstItemText);
        });
    });

    describe('Infinite scroll examples', function() {

        it('should check scroll loads more items', () => {
            const initiallyLoadedItemCount = getElementArrayLength(infiniteList + listItems);

            scrollIntoView(infiniteList + listItems);
            click(infiniteList + listItems);
            do {
                sendKeys(['ArrowDown']);
            }
            while (doesItExist(busyIndicator) === false);
            waitForNotDisplayed(busyIndicator);

            expect(getElementArrayLength(infiniteList + listItems)).toBeGreaterThan(initiallyLoadedItemCount);
        });
    });

    xdescribe('example block visual regression', function() {
        it('should check examples visual regression', () => {
            refreshPage();
            waitForElDisplayed(standardListPage.title);
            standardListPage.saveExampleBaselineScreenshot();
            expect(standardListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    describe('orientation check', function() {
        it('should check orientations', () => {
            standardListPage.checkRtlSwitch();
        });
    });

    function checkSelections(exampleSelector: string, count: number, listExample: string): void {
        for (let i = 0; i < count; i++) {
            const tag = `${listExample}-listItem-${i}-selected-state-${getImageTagBrowserPlatform()}-`;

            click(exampleSelector + listItems, i);
            expect(getElementClass(exampleSelector + listItems, i))
                .toContain('is-selected');
        }
    }

    function pickBorderStyleAttribute(): string {
        return (browserIsFirefox() ? 'border-bottom-style' : 'border');
    }
});
