import {
    browserIsSafari,
    click,
    doesItExist,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { runCommonTests } from './table-common-tests';
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
import { TablePo } from './table.po';

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
        allInputFields,
        toolbarButton,
        slimArrowRight,
        dialogDecisiveButton,
        messageBoxHeader
    } = tablePage;

    beforeAll(async () => {
        await tablePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await tablePage.waitForRoot();
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
            await tablePage.checkSortingColumns(tableP13ColumnsExample, toolbarButton);
        });
    });

    describe('Check Sorting by multiple columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13SortExample, tableCellArr4);
        });

        it('should check sorting ascending and descending by name', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + toolbarButton);
            await click(popoverDropdownButton);
            await click(buttonSortedBy);
            await click(footerButtonOk);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).withContext(testText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).withContext(nameEndTestText);

            await click(tableP13SortExample + columnHeader);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellName)).trim()).withContext(nameEndTestText);
            await expect((await getText(tableP13SortExample + tableCellName, 15)).trim()).withContext(testText);
        });

        it('should check sorting ascending and descending by price', async () => {
            await scrollIntoView(tableP13SortExample);
            await click(tableP13SortExample + toolbarButton);
            await click(buttonAdd);
            await click(buttonRemove);
            await click(popoverDropdownButton);
            await click(buttonSortedBy, 1);
            await click(footerButtonOk);

            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).withContext(priceStartTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).withContext(
                priceEndTestText
            );

            await click(tableP13SortExample + columnHeader, 2);
            await click(filterByColorItem, 1);
            await expect((await getText(tableP13SortExample + tableCellPrice)).trim()).withContext(priceEndTestText);
            await expect((await getText(tableP13SortExample + tableCellPrice, 15)).trim()).withContext(
                priceStartTestText
            );
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13SortExample, 3);
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13SortExample, toolbarButton, 1);
        });
    });

    describe('Check Filtering by multiple columns', () => {
        it('should check table item single selection', async () => {
            await tablePage.findElementInTable(tableP13FilterExample, tableCellArr5);
        });

        it('should check filtering with include and exclude', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + toolbarButton);
            await setValue(dialogInput, astroTestText);
            await click(expandedButton, 1);
            await click(popoverDropdownButton, 2);
            await click(filterByColorItem, 1);
            await setValue(dialogInput, testText7, 1);
            await click(footerButtonOk);

            const rowLength = await getElementArrayLength(tableP13FilterExample + tableRow);
            await expect(rowLength).toEqual(1);
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText)).trim()).withContext(
                testText4
            );
            await expect((await getText(tableP13FilterExample + tableRow + tableCellText, 1)).trim()).withContext(
                testText5
            );
        });

        it('should check searching and placeholder in dialog', async () => {
            await tablePage.checkPlaceholder(tableP13FilterExample, 3);
            await tablePage.checkSearchingInDialog();
        });

        it('should check sorting of columns', async () => {
            await tablePage.checkSortingColumns(tableP13FilterExample, toolbarButton, 1);
        });
        it('should throw warning when the user attempts to include/exclude the same rule', async () => {
            await scrollIntoView(tableP13FilterExample);
            await click(tableP13FilterExample + toolbarButton);
            await setValue(dialogInput, 'x');
            await click(slimArrowRight);
            await setValue(dialogInput, 'x', 1);
            await click(dialogDecisiveButton);
            await expect(await doesItExist(messageBoxHeader)).withContext(true);
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
            await tablePage.checkSortingColumns(tableP13GroupExample, toolbarButton, 1);
        });
    });

    runCommonTests(allInputFields, tablePage);
});
