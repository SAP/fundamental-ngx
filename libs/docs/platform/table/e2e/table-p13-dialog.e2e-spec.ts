import { runCommonTests } from './table-common-tests';
import { TablePo } from './table.po';
import {
    browserIsSafari,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    astroTestText,
    nameEndTestText,
    priceEndTestText,
    priceStartTestText,
    tableCellArr4,
    tableCellArr5,
    testText,
    testText4,
    testText5,
    testText7
} from './table-contents';

describe('Table component test suite', () => {
    const tablePage = new TablePo('/table/p13-dialog-table');
    const {
        tableRow,
        tableCellText,
        buttonSortedBy,
        tableCellPrice,
        tableCellName,
        filterByColorItem,
        tableP13ColumnsExample,
        footerButtonOk,
        columnHeader,
        tableP13SortExample,
        tableP13FilterExample,
        tableP13GroupExample,
        popoverDropdownButton,
        buttonAdd,
        buttonRemove,
        dialogInput,
        expandedButton,
        dropdownList,
        dropdownOption,
        dialogButton,
        allInputFields,
        ellipsisButton,
        expandedOption,
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

    describe('Check Table columns visibility and order', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13ColumnsExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13ColumnsExample, 2);
            await tablePage.checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13ColumnsExample, ellipsisButton);
        });
    });

    describe('Check Sorting by multiple columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13SortExample, tableCellArr4);
        });

        it('should check sorting ascending and descending by name', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + ellipsisButton);
            await click(popoverDropdownButton);
            await click(buttonSortedBy);
            await click(footerButtonOk);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).toBe(testText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).toBe(nameEndTestText);

            await click(tableP13SortExample + columnHeader);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).toBe(nameEndTestText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).toBe(testText);
        });

        it('should check sorting ascending and descending by price', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + ellipsisButton);
            await click(buttonAdd);
            await click(buttonRemove);
            await click(popoverDropdownButton);
            await click(buttonSortedBy, 1);
            await click(footerButtonOk);

            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).toBe(priceStartTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).toBe(priceEndTestText);

            await click(tableP13SortExample + columnHeader, 2);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).toBe(priceEndTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).toBe(priceStartTestText);
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13SortExample, 3);
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13SortExample, ellipsisButton, 1);
        });
    });

    describe('Check Filtering by multiple columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13FilterExample, tableCellArr5);
        });

        it('should check filtering with include and exclude', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + ellipsisButton);
            await setValue(dialogInput, astroTestText);
            await click(expandedButton, 1);
            await click(popoverDropdownButton, 2);
            await click(filterByColorItem, 1);
            await setValue(dialogInput, testText7, 1);
            await click(footerButtonOk);

            const rowLength = await getElementArrayLength(tableP13FilterExample + tableRow);
            await expect(rowLength).toEqual(1);
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText)).trim()).toBe(testText4);
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText, 1)).trim()).toBe(testText5);
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13FilterExample, 3);
            await tablePage.checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13FilterExample, ellipsisButton, 1);
        });
        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7005
        xit('should check Exclude section in dialog always open', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + buttonFilter);
            await expect(await getAttributeByName(expandedOption, 'aria-expanded')).toBe('false');
        });
    });

    describe('Check Grouping by multiple columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13GroupExample, tableCellArr4);
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13GroupExample, 3);
            await tablePage.checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13GroupExample, ellipsisButton, 1);
        });
    });

    runCommonTests(allInputFields, tablePage);
});
