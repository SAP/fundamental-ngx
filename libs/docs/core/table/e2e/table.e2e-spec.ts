import { TablePo } from './table.po';
import {
    acceptAlert,
    browserIsFirefox,
    browserIsSafari,
    browserIsSafariorFF,
    click,
    clickAndMoveElement,
    getAlertText,
    getAttributeByName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    getText,
    getTextArr,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent,
    checkElArrIsClickable
} from '../../../../../e2e';
import { alertText, componentExampleArr, dateTestText, tableCellArr, tableCellArr2, testText } from './table-content';

describe('Table test suite', () => {
    const tablePage = new TablePo();
    const {
        link,
        tableToolbarExample,
        button,
        busyIndicator,
        dialogContent,
        inputField,
        tableRow,
        tableSortableExample,
        tableCell,
        markAllCheckboxes,
        tableCheckboxesExample,
        tableSemanticExample,
        tablePopinExample,
        clickableTableRow,
        tableNavigatableRowExample,
        tablePaginationExample,
        menuItem,
        paginationLink,
        activePaginationLink,
        linkPrevious,
        linkNext,
        tableCustomColumnsExample,
        inputGroup,
        dialogValue,
        columnSortingInput,
        tableColumnSortingExample,
        sortAscending,
        sortDescending,
        markAllCheckboxesFF,
        clickableTableRowFF,
        selectedPage,
        tableCDKExample,
        tableCellWOHeader,
        tableActivableExample,
        tableFocusableExample
    } = tablePage;

    beforeAll(async () => {
        await tablePage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(tablePage.root);
        await waitForElDisplayed(tablePage.title);
    }, 1);

    it('should check clickability links for all examples', async () => {
        // skipped due to cannot reproduce failure, needs further investigation
        if ((await getCurrentUrl()).includes('localhost')) {
            return;
        }
        for (let i = 0; i < 11; i++) {
            await checkIsLinkClickable(componentExampleArr[i]);
        }
    });

    describe('Check Table with Toolbar example', () => {
        it('should check ability to clear search field', async () => {
            await scrollIntoView(tableToolbarExample);
            await setValue(tableToolbarExample + inputField, testText);

            await click(tableToolbarExample + button);
            await expect(await getText(tableToolbarExample + inputField)).toBe('');
        });

        it('should check display busy indicator', async () => {
            await scrollIntoView(tableToolbarExample);
            await click(tableToolbarExample + button, 1);
            await expect(await isElementDisplayed(busyIndicator)).toBe(true, 'busy indicator not displayed');
        });

        it('should check adding a new item', async () => {
            await scrollIntoView(tableToolbarExample);
            await click(tableToolbarExample + button, 2);
            for (let i = 0; i < 3; i++) {
                await setValue(dialogContent + inputField, testText, i);
            }
            await click(dialogContent + button, 1);
            const newCountRow = await getElementArrayLength(tableToolbarExample + tableRow);
            await expect(newCountRow).toEqual(6);
            const tableCellLength = await getElementArrayLength(tableToolbarExample + tableCell);
            const startCycle = 18;
            for (let i = startCycle; i < tableCellLength; i++) {
                await expect(await getText(tableToolbarExample + tableCell, i)).toBe(testText);
            }
        });

        it('should check searching table item', async () => {
            await scrollIntoView(tableToolbarExample);
            await setValue(tableToolbarExample + inputField, 'Kale');
            const rowLength = await getElementArrayLength(tableToolbarExample + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(tableToolbarExample + tableRow + tableCell);
            for (let i = 0; i < cellLength; i++) {
                await expect(await getText(tableToolbarExample + tableRow + tableCell, i)).toBe(tableCellArr[i]);
            }
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7096
        xit('should check that we can not do anything while table is loading', async () => {
            await scrollIntoView(tableToolbarExample);
            await click(tableToolbarExample + button, 1);
            await expect(await isElementDisplayed(busyIndicator)).toBe(true, 'busy indicator not displayed');
            await expect(await getElementClass(tableToolbarExample + inputField)).toContain('disabled');
            await expect(await getElementClass(tableToolbarExample + button, 2)).toContain('disabled');
            await expect(await getElementClass(tableToolbarExample + button)).toContain('disabled');
        });
    });

    describe('Check Customizable Columns example', () => {
        it('should check that table sort work correctly', async () => {
            await scrollIntoView(tableCustomColumnsExample);
            await click(tableCustomColumnsExample + button);
            await click(dialogContent + button, 1);
            await click(dialogContent + button, 2);
            const rowsDesc: string[] = await getTextArr(tableCustomColumnsExample + ' thead .fd-table__cell');
            await expect(await checkSortDirection(rowsDesc, 'desc')).toBe(true);

            await click(tableCustomColumnsExample + button);
            await click(dialogContent + button);
            await click(dialogContent + button, 2);
            const rowsAsc: string[] = await getTextArr(tableCustomColumnsExample + ' thead .fd-table__cell');
            await expect(await checkSortDirection(rowsAsc, 'asc')).toBe(true);
        });

        it('should check search work correctly', async () => {
            await scrollIntoView(tableCustomColumnsExample);
            await click(tableCustomColumnsExample + button);
            await setValue(dialogContent + inputGroup, dateTestText);
            await expect(await getText(dialogValue)).toBe(dateTestText);
        });

        it('should check clickability cancel button', async () => {
            await scrollIntoView(tableCustomColumnsExample);
            await click(tableCustomColumnsExample + button);
            await waitForElDisplayed(dialogContent);
            await expect(await isElementClickable(dialogContent + button, 3)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Column Sorting and Filtering example', () => {
        const tableSelector = tableColumnSortingExample + ' ' + tableSortableExample;
        it('should check filter work correctly', async () => {
            await setValue(columnSortingInput, 'Apple');
            const rowLength = await getElementArrayLength(tableSelector + tableRow);
            await expect(rowLength).toEqual(1);
            const cellLength = await getElementArrayLength(tableSelector + tableRow + tableCell);
            for (let i = 0; i < cellLength - 1; i++) {
                await expect(await getText(tableSelector + tableRow + tableCell, i)).toBe(tableCellArr2[i]);
            }
        });

        it('should check sort ascending and descending work correctly', async () => {
            await scrollIntoView(tableColumnSortingExample);
            await click(sortDescending);
            const rowsDesc: string[] = await getTextArr(tableSelector + ' tbody .fd-table__cell:first-child');
            await expect(await checkSortDirection(rowsDesc, 'desc')).toBe(true);

            await click(sortAscending);
            const rowsAsc: string[] = await getTextArr(tableSelector + ' tbody .fd-table__cell:first-child');
            await expect(await checkSortDirection(rowsAsc, 'asc')).toBe(true);
        });
    });

    describe('Check Interactive Rows and Cells example', () => {
        it('should check clickable links', async () => {
            await scrollIntoView(tableActivableExample);
            await checkElArrIsClickable(tableActivableExample + link);
        });

        it('should check table has activable and hoverable states', async () => {
            await scrollIntoView(tableActivableExample);
            await expect(await getElementClass(tableActivableExample + tableRow)).toContain(
                'fd-table__row--activable fd-table__row--hoverable'
            );
        });
    });

    describe('Check Focusable example', () => {
        it('should check table has focusable states', async () => {
            await scrollIntoView(tableFocusableExample);
            await expect(await getElementClass(tableFocusableExample + tableRow)).toContain('fd-table__row--focusable');
        });
    });

    describe('Check Table with Checkboxes example', () => {
        it('should check that checkbox work correctly', async () => {
            await scrollIntoView(tableCheckboxesExample);
            const checkboxLength = await getElementArrayLength(tableCheckboxesExample + markAllCheckboxes);
            for (let i = 0; i < checkboxLength; i++) {
                await scrollIntoView(tableCheckboxesExample + markAllCheckboxes, i);
                (await browserIsSafariorFF())
                    ? await click(tableCheckboxesExample + markAllCheckboxesFF, i)
                    : await click(tableCheckboxesExample + markAllCheckboxes, i);
            }

            const checkboxLength_2 = await getElementArrayLength(tableCheckboxesExample + tableRow);
            for (let i = 0; i < checkboxLength_2; i++) {
                await expect(await getAttributeByName(tableCheckboxesExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `row ${i} not selected`
                );
            }
        });

        it('should check clickable links', async () => {
            await scrollIntoView(tableCheckboxesExample);
            await checkElArrIsClickable(tableCheckboxesExample + link);
        });
    });

    describe('Check Table With Semantic Row Highlighting example', () => {
        it('should check that checkbox work correctly', async () => {
            await scrollIntoView(tableSemanticExample);
            (await browserIsSafariorFF())
                ? await click(tableSemanticExample + markAllCheckboxesFF)
                : await click(tableSemanticExample + markAllCheckboxes);
            const checkboxLength = await getElementArrayLength(tableSemanticExample + tableRow);
            for (let i = 0; i < checkboxLength; i++) {
                await expect(await getAttributeByName(tableSemanticExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `element with index ${i} not selected`
                );
            }
        });

        it('should check clickable links', async () => {
            await scrollIntoView(tableSemanticExample);
            await checkElArrIsClickable(tableSemanticExample + link);
        });
    });

    describe('Check Table with Angular CDK example', () => {
        xit('should check drag and drop table row', async () => {
            // test runner drag and drop not working correctly
            await scrollIntoView(tableCDKExample + tableRow, 3);
            const originalTableCell = await getText(tableCDKExample + tableCellWOHeader);
            await clickAndMoveElement(tableCDKExample + tableRow, 0, 50);
            await expect(await getText(tableCDKExample + tableCellWOHeader)).not.toBe(originalTableCell);
        });

        it('should check clickable links', async () => {
            await scrollIntoView(tableCDKExample);
            await checkElArrIsClickable(tableCDKExample + link);
        });
    });

    describe('Check Pop In Mode on Responsive Table example', () => {
        it('should check that table rows are clickable', async () => {
            await scrollIntoView(tablePopinExample);
            const tableRowLength = await getElementArrayLength(tablePopinExample + clickableTableRow);
            for (let i = 0; i < tableRowLength; i++) {
                await expect(await isElementClickable(tablePopinExample + clickableTableRow, i)).toBe(
                    true,
                    `element with index ${i} not clickable`
                );
            }
        });

        it('should check that checkbox work correctly', async () => {
            await scrollIntoView(tablePopinExample);
            (await browserIsSafariorFF())
                ? await click(tablePopinExample + markAllCheckboxesFF)
                : await click(tablePopinExample + markAllCheckboxes);
            const checkboxLength = await getElementArrayLength(tablePopinExample + tableRow);
            const startCycle = 20;
            for (let i = startCycle; i < checkboxLength; i++) {
                await expect(await getAttributeByName(tablePopinExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `element with index ${i} not selected`
                );
            }
        });
    });

    describe('Check Table with navigatable rows example', () => {
        it('should check alert message', async () => {
            if (await browserIsSafari()) {
                return;
            }

            await scrollIntoView(tableNavigatableRowExample);
            const rowLength = await getElementArrayLength(tableNavigatableRowExample + clickableTableRow);
            for (let i = 0; i < rowLength - 1; i++) {
                if (i === 1) {
                    continue;
                }
                await scrollIntoView(tableNavigatableRowExample + clickableTableRow, i);
                (await browserIsFirefox())
                    ? await click(tableNavigatableRowExample + clickableTableRowFF, i)
                    : await click(tableNavigatableRowExample + clickableTableRow, i);
                await expect(await getAlertText()).toBe(alertText);
                await acceptAlert();
            }
        });

        it('should check navigation buttons', async () => {
            await scrollIntoView(tableNavigatableRowExample + button);
            await expect(await isElementClickable(tableNavigatableRowExample + button)).toBe(
                true,
                `button not clickable`
            );
            await expect(await isEnabled(tableNavigatableRowExample + button, 1)).toBe(false, `button clickable`);
            await expect(await isElementClickable(tableNavigatableRowExample + button, 2)).toBe(
                true,
                `button not clickable`
            );
        });
    });

    describe('Check Table With Pagination example', () => {
        it('should check how many table rows display on table', async () => {
            await scrollIntoView(tablePaginationExample);
            const fiveTableRows = await getElementArrayLength(tablePaginationExample + tableRow);
            await expect(fiveTableRows).toEqual(5);

            await click(tablePaginationExample + button);
            await click(menuItem);
            const threeTableRows = await getElementArrayLength(tablePaginationExample + tableRow);
            await expect(threeTableRows).toEqual(3);

            await click(tablePaginationExample + button);
            await click(menuItem, 2);
            const tenTableRows = await getElementArrayLength(tablePaginationExample + tableRow);
            await expect(tenTableRows).toEqual(10);
        });

        it('should check selected pages by clicking pages links', async () => {
            await scrollIntoView(tablePaginationExample);
            await click(paginationLink);
            await expect(await getText(tablePaginationExample + activePaginationLink)).toBe('1');
            await click(paginationLink, 1);
            await expect(await getText(tablePaginationExample + activePaginationLink)).toBe('2');
        });

        it('should check selected pages by clicking next and previous link', async () => {
            await scrollIntoView(tablePaginationExample);
            await click(linkNext);
            await expect(await getText(tablePaginationExample + activePaginationLink)).toBe('4');
            await click(linkPrevious);
            await expect(await getText(tablePaginationExample + activePaginationLink)).toBe('3');
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7148
        xit('should check that current page not changing after changing items per page', async () => {
            await scrollIntoView(tablePaginationExample);
            await click(tablePaginationExample + button);
            const defaultSelectedPage = await getText(selectedPage);
            await click(menuItem);
            await expect(await getText(selectedPage)).toBe(defaultSelectedPage);
        });
    });

    it('should check RTL/LTR orientations', async () => {
        await tablePage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check example blocks visual regression', async () => {
            await tablePage.saveExampleBaselineScreenshot();
            await expect(await tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkIsLinkClickable(selector: string): Promise<void> {
        const linkLength = await getElementArrayLength(selector + link);
        for (let i = 0; i < linkLength; i++) {
            await expect(await isElementClickable(selector + link, i)).toBe(
                true,
                `link with index ${i} in ${selector} example not clickable`
            );
        }
    }

    async function checkSortDirection(entries: string[], dir: 'asc' | 'desc'): Promise<boolean> {
        return entries.every((right, index) => {
            if (index === 0) {
                return true;
            }
            const left = entries[index - 1];
            const compared = right.localeCompare(left);
            return dir === 'asc' ? compared >= 0 : compared <= 0;
        });
    }
});
