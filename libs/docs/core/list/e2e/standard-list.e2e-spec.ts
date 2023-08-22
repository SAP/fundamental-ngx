import { StandardListPo } from './standard-list.po';
import {
    browserIsFirefox,
    click,
    clickAndDragElement,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getElementLocation,
    getText,
    refreshPage,
    scrollIntoView,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForNotDisplayed
} from '../../../../../e2e';

describe('Standard List test suite', () => {
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
        dragAndDropList,
        infiniteList,
        deleteButton,
        listItemText
    } = standardListPage;

    beforeAll(async () => {
        await standardListPage.open();
    }, 1);

    describe('action list examples', () => {
        it('should check show more button functionality', async () => {
            const startItemsCount = await getElementArrayLength(actionList + listItems);

            await click(actionList + listItems, startItemsCount - 1);
            await waitForNotDisplayed(actionList + busyIndicator);

            await expect(await getElementArrayLength(actionList + listItems)).not.toEqual(startItemsCount);
        });
    });

    describe('filter and sort list examples', () => {
        afterEach(async () => {
            await refreshPage();
            await waitForElDisplayed(standardListPage.title);
        }, 1);

        it('should check ability to search', async () => {
            await scrollIntoView(filterAndSortList);
            await click(filterAndSortList + searchBar);
            await setValue(filterAndSortList + searchBar, 'apple');
            const resultCount = await getElementArrayLength(filterAndSortList + listItems);
            for (let i = 0; i < resultCount; i++) {
                await expect((await getText(filterAndSortList + listItems, i)).toLowerCase()).toContain('apple');
            }
        });

        it('should check the ability to clear search', async () => {
            const startItemCount = await getElementArrayLength(filterAndSortList + listItems);

            await scrollIntoView(filterAndSortList);
            await click(filterAndSortList + searchBar);
            await setValue(filterAndSortList + searchBar, 'apple');

            await expect(await getElementArrayLength(filterAndSortList + listItems)).not.toEqual(startItemCount);

            await click(filterAndSortList + button);

            await expect(await getElementArrayLength(filterAndSortList + listItems)).toEqual(startItemCount);
        });

        it('should check the ability to sort', async () => {
            const itemCount = await getElementArrayLength(filterAndSortList + listItems);
            const originalFirstItem = await getText(filterAndSortList + listItems);
            const originalLastItem = await getText(filterAndSortList + listItems, itemCount - 1);

            await click(filterAndSortList + button, 2);

            await expect(await getText(filterAndSortList + listItems)).toBe(originalLastItem);
            await expect(await getText(filterAndSortList + listItems, itemCount - 1)).toBe(originalFirstItem);

            await click(filterAndSortList + button, 1);

            await expect(await getText(filterAndSortList + listItems)).toBe(originalFirstItem);
            await expect(await getText(filterAndSortList + listItems, itemCount - 1)).toBe(originalLastItem);
        });

        it('should check the ability to delete an item', async () => {
            const startItemCount = await getElementArrayLength(filterAndSortList + listItems);

            await click(filterAndSortList + button, 4);

            await expect(await getElementArrayLength(filterAndSortList + listItems)).toEqual(startItemCount - 1);
        });

        it('should check deleting all items', async () => {
            const startItemCount = await getElementArrayLength(filterAndSortList + listItems);
            for (let i = 0; i < startItemCount; i++) {
                await click(filterAndSortList + deleteButton);
            }
            await expect(await getElementArrayLength(filterAndSortList + listItems)).toEqual(1);
            await expect((await getText(filterAndSortList + listItemText)).trim()).toBe('No results found!');
        });
    });

    describe('selection list example', () => {
        beforeEach(async () => {
            await refreshPage();
            await waitForElDisplayed(standardListPage.title);
        }, 1);

        it('check cozy multi-selection functionality', async () => {
            const itemCount = await getElementArrayLength(cozyMultiSelectList + listItems);

            await checkSelections(cozyMultiSelectList, itemCount);

            await expect(await getElementArrayLength(cozyMultiSelectList + selectedItems)).toEqual(itemCount);
        });

        it('check compact multi-selection functionality', async () => {
            const itemCount = await getElementArrayLength(compactMultiSelectList + listItems);

            await checkSelections(compactMultiSelectList, itemCount);

            await expect(await getElementArrayLength(compactMultiSelectList + selectedItems)).toEqual(itemCount);
        });

        it('check cozy single-selection functionality', async () => {
            const itemCount = await getElementArrayLength(cozySingleSelectList + listItems);

            await checkSelections(cozySingleSelectList, itemCount);

            await expect(await getElementArrayLength(cozySingleSelectList + selectedItems)).toEqual(1);
        });

        it('check compact single-selection functionality', async () => {
            const itemCount = await getElementArrayLength(compactSingleSelectList + listItems);

            await checkSelections(compactSingleSelectList, itemCount);

            await expect(await getElementArrayLength(compactSingleSelectList + selectedItems)).toEqual(1);
        });
    });

    describe('drag and drop examples', () => {
        it('check drag and drop ability', async () => {
            await scrollIntoView(dragAndDropList + listItems);
            const originalFirstItemText = await getText(dragAndDropList + listItems);
            const startLocationX = Math.floor(await getElementLocation(dragAndDropList + listItems, 0, 'x'));
            const startLocationY = Math.floor(await getElementLocation(dragAndDropList + listItems, 0, 'y'));

            if (!(await browserIsFirefox())) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }

            await clickAndDragElement(startLocationX + 5, startLocationY + 5, startLocationX + 5, startLocationY + 100);

            await expect(await getText(dragAndDropList + listItems)).not.toEqual(originalFirstItemText);
        });
    });

    describe('Infinite scroll examples', () => {
        it('should check scroll loads more items', async () => {
            const initiallyLoadedItemCount = await getElementArrayLength(infiniteList + listItems);

            await scrollIntoView(infiniteList + listItems);
            await click(infiniteList + listItems);
            do {
                await sendKeys(['ArrowDown']);
            } while ((await doesItExist(busyIndicator)) === false);
            await waitForNotDisplayed(busyIndicator);

            await expect(await getElementArrayLength(infiniteList + listItems)).toBeGreaterThan(
                initiallyLoadedItemCount
            );
        });
    });

    xdescribe('example block visual regression', () => {
        it('should check examples visual regression', async () => {
            await refreshPage();
            await waitForElDisplayed(standardListPage.title);
            await standardListPage.saveExampleBaselineScreenshot();
            await expect(await standardListPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    describe('orientation check', () => {
        it('should check orientations', async () => {
            await standardListPage.checkRtlSwitch();
        });
    });

    async function checkSelections(exampleSelector: string, count: number): Promise<void> {
        for (let i = 0; i < count; i++) {
            await click(exampleSelector + listItems, i);
            await expect(await getElementClass(exampleSelector + listItems, i)).toContain('is-selected');
        }
    }

    async function pickBorderStyleAttribute(): Promise<string> {
        return (await browserIsFirefox()) ? 'border-bottom-style' : 'border';
    }
});
