import { StandardListPo } from '../pages/standard-list.po';
import {
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndDragElement,
    doesItExist,
    executeScriptBeforeTagAttr,
    focusElement,
    getElementArrayLength,
    getElementLocation,
    getImageTagBrowserPlatform,
    getText,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotDisplayed,
    applyState, getElementClass
} from '../../driver/wdio';
import { checkElementActiveState, checkElementFocusState, checkElementHoverState } from '../../helper/assertion-helper';

describe('Standard List test suite', function() {
    const standardListPage = new StandardListPo();
    const {
        listItems,
        simpleList,
        navigationList,
        navigationIndicatorList,
        actionList,
        button,
        busyIndicator,
        filterAndSortList,
        searchBar,
        secondaryItemList,
        iconList,
        borderlessList,
        interactiveList,
        complexList,
        selectionList,
        cozyMultiSelectList,
        compactMultiSelectList,
        cozySingleSelectList,
        compactSingleSelectList,
        selectedItems,
        checkbox,
        radioBtn,
        keyboardSupportList,
        dragAndDropList,
        infiniteList,
        checkboxFocusElement,
        radioBtnFocusElement
    } = standardListPage;
    const statesToCheckArr = ['hover', 'focus', 'active'];

    beforeAll(() => {
        standardListPage.open();
    }, 1);

    xdescribe('simple list examples', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(simpleList + listItems, element, 'simple list item'));
        });
    });

    xdescribe('navigation list examples', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(navigationList + listItems, element, 'navigation list item'));
        });
    });

    xdescribe('navigation indicator list examples', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(navigationIndicatorList + listItems, element, 'navigation indicator list item'));
        });
    });

    describe('action list examples', function() {
        xit('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(actionList + listItems, element, 'action list item'));
        });

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

        xit('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(filterAndSortList + listItems, element, 'filter and sort list item'));
        });

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

    xdescribe('secondary item on list example ', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(secondaryItemList + listItems, element, 'secondary item list item'));
        });
    });

    xdescribe('list with icons example', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(iconList + listItems, element, 'list with icons list item'));
        });
    });

    xdescribe('borderless list example', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(borderlessList + listItems, element, 'borderless list item'));
        });
    });

    xdescribe('interactive list example', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(interactiveList + listItems, element, 'interactive list item'));
        });
    });

    xdescribe('complex list example', function() {
        it('check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(complexList + listItems, element, 'complex list item'));
        });
    });

    describe('selection list example', function() {
        beforeEach(() => {
            refreshPage();
            waitForElDisplayed(standardListPage.title);
        }, 1);

        xit('check list item states', () => {
            checkElementStates(selectionList + listItems, 'hover', 'selection list item');
            checkElementStates(selectionList + listItems, 'focus', 'selection list item');
        });

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

        xit('check checkbox and radio button hover states', () => {
            const checkboxCount = getElementArrayLength(selectionList + checkbox);
            const radioBtnCount = getElementArrayLength(selectionList + radioBtn);

            for (let i = 0; i < checkboxCount; i++) {
                const tag = `Selection-listItem-checkbox-${i}-hover-state-${getImageTagBrowserPlatform()}-`;

                scrollIntoView(selectionList + checkbox, i);
                mouseHoverElement(selectionList + checkbox, i);
                saveElementScreenshot(selectionList + checkbox, tag, standardListPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(selectionList + checkbox, tag, standardListPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `Selection list item checkbox ${i} hover state screenshot doesn't match baseline`);
            }

            for (let i = 0; i < radioBtnCount; i++) {
                const tag = `Selection-listItem-radioBtn-${i}-hover-state-${getImageTagBrowserPlatform()}-`;

                scrollIntoView(selectionList + radioBtn, i);
                mouseHoverElement(selectionList + radioBtn, i);
                saveElementScreenshot(selectionList + radioBtn, tag, standardListPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(selectionList + radioBtn, tag, standardListPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `Selection list item radioBtn ${i} hover state screenshot doesn't match baseline`);
            }
        });

        xit('check checkbox and radio button focus states', () => {
            const checkboxCount = getElementArrayLength(selectionList + checkbox);
            const radioBtnCount = getElementArrayLength(selectionList + radioBtn);

            for (let i = 0; i < checkboxCount; i++) {
                const tag = `Selection-listItem-checkbox-${i}-focus-state-${getImageTagBrowserPlatform()}-`;

                scrollIntoView(selectionList + checkbox, i);
                focusElement(selectionList + checkboxFocusElement, i);
                saveElementScreenshot(selectionList + checkbox, tag, standardListPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(selectionList + checkbox, tag, standardListPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `Selection list item checkbox ${i} focus state screenshot doesn't match baseline`);
            }

            for (let i = 0; i < radioBtnCount; i++) {
                const tag = `Selection-listItem-radioBtn-${i}-focus-state-${getImageTagBrowserPlatform()}-`;

                scrollIntoView(selectionList + radioBtn, i);
                focusElement(selectionList + radioBtnFocusElement, i);
                saveElementScreenshot(selectionList + radioBtn, tag, standardListPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(selectionList + radioBtn, tag, standardListPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `Selection list item radioBtn ${i} focus state screenshot doesn't match baseline`);
            }
        });
    });

    describe('keyboard support example', function() {
        xit('should check list item states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(keyboardSupportList + listItems, element, 'keyboard support list item'));
        });

        xit('should check button states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(keyboardSupportList + button, element, 'keyboard support list button'));
        });

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
        xit('should check element states', () => {
            statesToCheckArr.forEach(element =>
                checkElementStates(dragAndDropList + listItems, element, 'drag and drop list item'));
        });

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
        xit('should check element states', () => {
            scrollIntoView(infiniteList + listItems);

            checkElementHoverState(infiniteList + listItems,
                `Infinite-list-item-0-hover-state-${getImageTagBrowserPlatform()}-`, 'infinite list item', standardListPage);
            checkElementFocusState(infiniteList + listItems,
                `Infinite-list-item-0-focus-state-${getImageTagBrowserPlatform()}-`, 'infinite list item', standardListPage);
            checkElementActiveState(infiniteList + listItems,
                `Infinite-list-item-0-active-state-${getImageTagBrowserPlatform()}-`, 'infinite list item', standardListPage);
        });

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

    describe('example block visual regression', function() {
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

    function checkElementStates(selector: string, stateCheck: 'hover' | 'active' | 'focus', exampleTagName: string): void {
        const itemsCount = getElementArrayLength(selector);

        for (let i = 0; i < itemsCount; i++) {
            const tag = `${exampleTagName}-${i}-${stateCheck}-state-${getImageTagBrowserPlatform()}-`;

            scrollIntoView(selector, i);
            applyState(stateCheck, selector, i);
            saveElementScreenshot(selector, tag, standardListPage.getScreenshotFolder(), i);
            expect(checkElementScreenshot(selector, tag, standardListPage.getScreenshotFolder(), i))
                .toBeLessThan(5, `${exampleTagName}-${i} ${stateCheck} state screenshot doesn't match baseline`);
        }
    }

    function checkSelections(exampleSelector: string, count: number, listExample: string): void {
        for (let i = 0; i < count; i++) {
            const tag = `${listExample}-listItem-${i}-selected-state-${getImageTagBrowserPlatform()}-`;

            click(exampleSelector + listItems, i);
            expect(getElementClass(exampleSelector + listItems, i))
                .toContain('is-selected');
            saveElementScreenshot(exampleSelector + listItems, tag, standardListPage.getScreenshotFolder(), i);
            expect(checkElementScreenshot(exampleSelector + listItems, tag, standardListPage.getScreenshotFolder(), i))
                .toBeLessThan(5, `${listExample} - list item ${i} selected state screenshot doesn't match baseline`);
        }
    }

    function pickBorderStyleAttribute(): string {
        return (browserIsFirefox() ? 'border-bottom-style' : 'border');
    }
});
