import { wait } from '@nrwl/nx-cloud/lib/utilities/waiter';
import { runCommonTests } from './table-common-tests';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    descriptionEndTestText,
    descriptionStartTestText,
    massaTestText,
    nameEndTestText,
    nameStartTestText,
    nuncTestText,
    pharetraTestText,
    priceEndTestText,
    priceStartTestText,
    tableCellArr,
    groupTableCellArr
} from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/settings-dialog-table');
    const {
        tableRow,
        tableSortableExample,
        buttonSortedBy,
        barButton,
        tableCellDescription,
        tableCellPrice,
        tableCellName,
        buttonSortedOrder,
        tableGroupableExample,
        tableFilterableExample,
        tableCellStatusColor,
        tableCellStatus,
        dialogFilters,
        filterInput,
        filterButtonOk,
        filterResetButton,
        allInputFields,
        sortableIcon,
        sortableOption,
        sortablePopover,
        ellipsisButton,
        buttonFilter
    } = tablePage;

    beforeAll(async () => {
        await tablePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(tablePage.root);
        await waitForElDisplayed(tablePage.title);
    }, 1);

    if (browserIsSafari()) {
        // skip due to unknown error where browser closes halfway through the test
        return;
    }

    describe('Check Column Sorting', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableSortableExample, tableCellArr);
        });

        it('should check ascending sorting by name, description and price', async () => {
            await scrollIntoView(tableSortableExample);
            await tablePage.chooseSortOptionBy(tableSortableExample, ellipsisButton, 2);
            await expect((await getText(tableSortableExample + tableCellDescription)).trim()).toBe(
                descriptionStartTestText
            );
            await expect((await getText(tableSortableExample + tableCellDescription, 15)).trim()).toBe(
                descriptionEndTestText
            );

            await tablePage.chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            await expect((await getText(tableSortableExample + tableCellPrice)).trim()).toBe(priceStartTestText);
            await expect((await getText(tableSortableExample + tableCellPrice, 15)).trim()).toBe(priceEndTestText);

            await tablePage.chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            await expect((await getText(tableSortableExample + tableCellName)).trim()).toBe(nameStartTestText);
            await expect((await getText(tableSortableExample + tableCellName, 15)).trim()).toBe(nameEndTestText);
        });

        it('should check descending sorting by name, description and price', async () => {
            await scrollIntoView(tableSortableExample);
            await click(tableSortableExample + ellipsisButton);
            await click(buttonSortedOrder, 1);
            await click(buttonSortedBy, 2);
            await click(barButton);
            await expect((await getText(tableSortableExample + tableCellDescription)).trim()).toBe(
                descriptionEndTestText
            );
            await expect((await getText(tableSortableExample + tableCellDescription, 15)).trim()).toBe(
                descriptionStartTestText
            );

            await tablePage.chooseSortOptionBy(tableSortableExample, ellipsisButton, 3);
            await expect((await getText(tableSortableExample + tableCellPrice)).trim()).toBe(priceEndTestText);
            await expect((await getText(tableSortableExample + tableCellPrice, 15)).trim()).toBe(priceStartTestText);

            await tablePage.chooseSortOptionBy(tableSortableExample, ellipsisButton, 1);
            await expect((await getText(tableSortableExample + tableCellName)).trim()).toBe(nameEndTestText);
            await expect((await getText(tableSortableExample + tableCellName, 15)).trim()).toBe(nameStartTestText);
        });

        it('should check after selecting sorting option popover closed', async () => {
            await scrollIntoView(tableSortableExample);
            await click(sortableIcon);
            await click(sortableOption);
            await expect(await doesItExist(sortablePopover)).toBe(false, 'sortable popover still displayed');
        });
    });

    describe('Check Column Filtering', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableFilterableExample, tableCellArr, 1);
        });

        it('should check filtering by status color', async () => {
            await tablePage.chooseFilter(2, 1);
            const rowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                await expect((await getText(tableCellStatusColor, i)).trim()).toBe('positive');
            }

            await tablePage.chooseFilter(2, 2);
            const tableRowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                await expect((await getText(tableCellStatusColor, i)).trim()).toBe('negative');
            }

            await tablePage.chooseFilter(2, 3);
            await expect(await doesItExist(tableFilterableExample + tableRow)).toBe(false, '');
        });

        it('should check filtering by status', async () => {
            await tablePage.chooseFilter(1, 0);
            const rowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < rowLength; i++) {
                await expect((await getText(tableFilterableExample + tableCellStatus, i)).trim()).toBe('Out of stock');
            }
            await refreshPage();
            await tablePage.chooseFilter(1, 1);
            const tableRowLength = await getElementArrayLength(tableFilterableExample + tableRow);
            for (let i = 0; i < tableRowLength; i++) {
                await expect((await getText(tableFilterableExample + tableCellStatus, i)).trim()).toBe(tableCellArr[3]);
            }
        });

        it('should check on filter by price reset button is clickable', async () => {
            await scrollIntoView(tableFilterableExample);
            await click(tableFilterableExample + buttonFilter);
            await click(dialogFilters);
            await setValue(filterInput, '10');
            await setValue(filterInput, '40', 1);
            await click(filterButtonOk);
            await wait(500);
            await click(tableFilterableExample + buttonFilter);
            await click(dialogFilters);
            await expect(await isElementClickable(filterResetButton)).toBe(true, 'reset button not clickable');
        });
    });

    describe('Check Column Grouping', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableGroupableExample, groupTableCellArr);
        });

        it('should verify checkboxes', async () => {
            await tablePage.checkAllCheckbox(tableGroupableExample);
        });

        it('should check ascending sorting by name and status', async () => {
            await scrollIntoView(tableGroupableExample);
            await tablePage.chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(tableCellArr[1]);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                pharetraTestText
            );

            await tablePage.chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(nuncTestText);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(massaTestText);
        });

        it('should check descending sorting by name and status', async () => {
            await scrollIntoView(tableGroupableExample);
            await click(tableGroupableExample + ellipsisButton);
            await click(buttonSortedOrder, 1);
            await click(buttonSortedBy, 1);
            await click(barButton);
            await wait(500);
            await tablePage.chooseSortOptionBy(tableGroupableExample, ellipsisButton, 0);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(pharetraTestText);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                tableCellArr[1]
            );

            await tablePage.chooseSortOptionBy(tableGroupableExample, ellipsisButton, 1);
            await expect((await getText(tableGroupableExample + tableCellDescription)).trim()).toBe(tableCellArr[1]);
            await expect((await getText(tableGroupableExample + tableCellDescription, 15)).trim()).toBe(
                'integer ac leo pellentesque'
            );
        });
    });

    runCommonTests(allInputFields, tablePage);
});
