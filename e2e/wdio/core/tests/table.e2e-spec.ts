import { TablePo } from '../pages/table.po';
import {
    acceptAlert,
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndMoveElement,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getImageTagBrowserPlatform,
    getText,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    getCurrentUrl,
    browserIsSafari,
    browserIsSafariorFF,
    waitForPresent
} from '../../driver/wdio';
import {
    alertText,
    componentExampleArr,
    dateTestText,
    tableCellArr,
    tableCellArr2,
    testText
} from '../fixtures/appData/table-content';
import { checkElArrIsClickable } from '../../helper/assertion-helper';

describe('Table test suite', () => {
    const tablePage = new TablePo();
    const {
        link,
        tableToolbarExample,
        button,
        busyIndicator,
        dialogContent,
        inputField,
        table,
        tableRow,
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
        tableInner,
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

    beforeAll(() => {
        tablePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(tablePage.root);
        waitForElDisplayed(tablePage.title);
    }, 1);

    it('should check clickability links for all examples', () => {
        // skipped due to cannot reproduce failure, needs further investigation
        if (getCurrentUrl().includes('localhost')) {
            return;
        }
        for (let i = 0; i < 11; i++) {
            checkIsLinkClickable(componentExampleArr[i]);
        }
    });

    describe('Check Table with Toolbar example', () => {
        it('should check ability to clear search field', () => {
            scrollIntoView(tableToolbarExample);
            setValue(tableToolbarExample + inputField, testText);

            click(tableToolbarExample + button);
            expect(getText(tableToolbarExample + inputField)).toBe('');
        });

        it('should check display busy indicator', () => {
            scrollIntoView(tableToolbarExample);
            click(tableToolbarExample + button, 1);
            expect(isElementDisplayed(busyIndicator)).toBe(true, 'busy indicator not displayed');
        });

        it('should check adding a new item', () => {
            scrollIntoView(tableToolbarExample);
            click(tableToolbarExample + button, 2);
            for (let i = 0; i < 3; i++) {
                setValue(dialogContent + inputField, testText, i);
            }
            click(dialogContent + button, 1);
            const newCountRow = getElementArrayLength(tableToolbarExample + tableRow);
            expect(newCountRow).toEqual(6);
            const tableCellLength = getElementArrayLength(tableToolbarExample + tableCell);
            const startCycle = 18;
            for (let i = startCycle; i < tableCellLength; i++) {
                expect(getText(tableToolbarExample + tableCell, i)).toBe(testText);
            }
        });

        it('should check searching table item', () => {
            scrollIntoView(tableToolbarExample);
            setValue(tableToolbarExample + inputField, 'Kale');
            const rowLength = getElementArrayLength(tableToolbarExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tableToolbarExample + tableRow + tableCell);
            for (let i = 0; i < cellLength; i++) {
                expect(getText(tableToolbarExample + tableRow + tableCell, i)).toBe(tableCellArr[i]);
            }
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7096
        xit('should check that we can not do anything while table is loading', () => {
            scrollIntoView(tableToolbarExample);
            click(tableToolbarExample + button, 1);
            expect(isElementDisplayed(busyIndicator)).toBe(true, 'busy indicator not displayed');
            expect(getElementClass(tableToolbarExample + inputField)).toContain('disabled');
            expect(getElementClass(tableToolbarExample + button, 2)).toContain('disabled');
            expect(getElementClass(tableToolbarExample + button)).toContain('disabled');
        });
    });

    describe('Check Customizable Columns example', () => {
        it('should check that table sort work correctly', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            click(dialogContent + button, 1);
            click(dialogContent + button, 2);
            saveElementScreenshot(
                tableCustomColumnsExample + table,
                'table-sort-down-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    tableCustomColumnsExample + table,
                    'table-sort-down-example-' + getImageTagBrowserPlatform(),
                    tablePage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);

            click(tableCustomColumnsExample + button);
            click(dialogContent + button);
            click(dialogContent + button, 2);
            saveElementScreenshot(
                tableCustomColumnsExample + table,
                'table-sort-up-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    tableCustomColumnsExample + table,
                    'table-sort-up-example-' + getImageTagBrowserPlatform(),
                    tablePage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });

        it('should check search work correctly', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            setValue(dialogContent + inputGroup, dateTestText);
            expect(getText(dialogValue)).toBe(dateTestText);
        });

        it('should check clickability cancel button', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            waitForElDisplayed(dialogContent);
            expect(isElementClickable(dialogContent + button, 3)).toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Column Sorting and Filtering example', () => {
        it('should check filter work correctly', () => {
            scrollIntoView(tableInner);
            click(tableInner);
            setValue(columnSortingInput, 'Apple');
            const rowLength = getElementArrayLength(tableColumnSortingExample + tableRow);
            expect(rowLength).toEqual(1);
            const cellLength = getElementArrayLength(tableColumnSortingExample + tableRow + tableCell);
            for (let i = 0; i < cellLength - 1; i++) {
                expect(getText(tableColumnSortingExample + tableRow + tableCell, i)).toBe(tableCellArr2[i]);
            }
        });

        it('should check sort ascending and descending work correctly', () => {
            scrollIntoView(tableInner);
            click(tableInner);
            click(sortDescending);
            saveElementScreenshot(
                tableColumnSortingExample + table,
                'table-descending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    tableColumnSortingExample + table,
                    'table-descending-example-' + getImageTagBrowserPlatform(),
                    tablePage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);

            click(tableInner);
            click(sortAscending);
            saveElementScreenshot(
                tableColumnSortingExample + table,
                'table-ascending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder()
            );
            expect(
                checkElementScreenshot(
                    tableColumnSortingExample + table,
                    'table-ascending-example-' + getImageTagBrowserPlatform(),
                    tablePage.getScreenshotFolder()
                )
            ).toBeLessThan(5, `element item state mismatch`);
        });
    });

    describe('Check Interactive Rows and Cells example', () => {
        it('should check clickable links', () => {
            scrollIntoView(tableActivableExample);
            checkElArrIsClickable(tableActivableExample + link);
        });

        it('should check table has activable and hoverable states', () => {
            scrollIntoView(tableActivableExample);
            expect(getElementClass(tableActivableExample + tableRow)).toContain(
                'fd-table__row--activable fd-table__row--hoverable'
            );
        });
    });

    describe('Check Focusable example', () => {
        it('should check table has focusable states', () => {
            scrollIntoView(tableFocusableExample);
            expect(getElementClass(tableFocusableExample + tableRow)).toContain('fd-table__row--focusable');
        });
    });

    describe('Check Table with Checkboxes example', () => {
        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableCheckboxesExample);
            const checkboxLength = getElementArrayLength(tableCheckboxesExample + markAllCheckboxes);
            for (let i = 0; i < checkboxLength; i++) {
                scrollIntoView(tableCheckboxesExample + markAllCheckboxes, i);
                browserIsSafariorFF()
                    ? click(tableCheckboxesExample + markAllCheckboxesFF, i)
                    : click(tableCheckboxesExample + markAllCheckboxes, i);
            }

            const checkboxLength_2 = getElementArrayLength(tableCheckboxesExample + tableRow);
            for (let i = 0; i < checkboxLength_2; i++) {
                expect(getAttributeByName(tableCheckboxesExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `row ${i} not selected`
                );
            }
        });

        it('should check clickable links', () => {
            scrollIntoView(tableCheckboxesExample);
            checkElArrIsClickable(tableCheckboxesExample + link);
        });
    });

    describe('Check Table With Semantic Row Highlighting example', () => {
        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableSemanticExample);
            browserIsSafariorFF()
                ? click(tableSemanticExample + markAllCheckboxesFF)
                : click(tableSemanticExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tableSemanticExample + tableRow);
            for (let i = 0; i < checkboxLength; i++) {
                expect(getAttributeByName(tableSemanticExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `element with index ${i} not selected`
                );
            }
        });

        it('should check clickable links', () => {
            scrollIntoView(tableSemanticExample);
            checkElArrIsClickable(tableSemanticExample + link);
        });
    });

    describe('Check Table with Angular CDK example', () => {
        xit('should check drag and drop table row', () => {
            // test runner drag and drop not working correctly
            scrollIntoView(tableCDKExample + tableRow, 3);
            const originalTableCell = getText(tableCDKExample + tableCellWOHeader);
            clickAndMoveElement(tableCDKExample + tableRow, 0, 50);
            expect(getText(tableCDKExample + tableCellWOHeader)).not.toBe(originalTableCell);
        });

        it('should check clickable links', () => {
            scrollIntoView(tableCDKExample);
            checkElArrIsClickable(tableCDKExample + link);
        });
    });

    describe('Check Pop In Mode on Responsive Table example', () => {
        it('should check that table rows are clickable', () => {
            scrollIntoView(tablePopinExample);
            const tableRowLength = getElementArrayLength(tablePopinExample + clickableTableRow);
            for (let i = 0; i < tableRowLength; i++) {
                expect(isElementClickable(tablePopinExample + clickableTableRow, i)).toBe(
                    true,
                    `element with index ${i} not clickable`
                );
            }
        });

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tablePopinExample);
            browserIsSafariorFF()
                ? click(tablePopinExample + markAllCheckboxesFF)
                : click(tablePopinExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tablePopinExample + tableRow);
            const startCycle = 20;
            for (let i = startCycle; i < checkboxLength; i++) {
                expect(getAttributeByName(tablePopinExample + tableRow, 'aria-selected', i)).toBe(
                    'true',
                    `element with index ${i} not selected`
                );
            }
        });
    });

    describe('Check Table with navigatable rows example', () => {
        it('should check alert message', () => {
            if (browserIsSafari()) {
                return;
            }

            scrollIntoView(tableNavigatableRowExample);
            const rowLength = getElementArrayLength(tableNavigatableRowExample + clickableTableRow);
            for (let i = 0; i < rowLength - 1; i++) {
                if (i === 1) {
                    continue;
                }
                scrollIntoView(tableNavigatableRowExample + clickableTableRow, i);
                browserIsFirefox()
                    ? click(tableNavigatableRowExample + clickableTableRowFF, i)
                    : click(tableNavigatableRowExample + clickableTableRow, i);
                expect(getAlertText()).toBe(alertText);
                acceptAlert();
            }
        });

        it('should check navigation buttons', () => {
            scrollIntoView(tableNavigatableRowExample + button);
            expect(isElementClickable(tableNavigatableRowExample + button)).toBe(true, `button not clickable`);
            expect(isEnabled(tableNavigatableRowExample + button, 1)).toBe(false, `button clickable`);
            expect(isElementClickable(tableNavigatableRowExample + button, 2)).toBe(true, `button not clickable`);
        });
    });

    describe('Check Table With Pagination example', () => {
        it('should check how many table rows display on table', () => {
            scrollIntoView(tablePaginationExample);
            const fiveTableRows = getElementArrayLength(tablePaginationExample + tableRow);
            expect(fiveTableRows).toEqual(5);

            click(tablePaginationExample + button);
            click(menuItem);
            const threeTableRows = getElementArrayLength(tablePaginationExample + tableRow);
            expect(threeTableRows).toEqual(3);

            click(tablePaginationExample + button);
            click(menuItem, 2);
            const tenTableRows = getElementArrayLength(tablePaginationExample + tableRow);
            expect(tenTableRows).toEqual(10);
        });

        it('should check selected pages by clicking pages links', () => {
            scrollIntoView(tablePaginationExample);
            click(paginationLink);
            expect(getText(tablePaginationExample + activePaginationLink)).toBe('1');
            click(paginationLink, 1);
            expect(getText(tablePaginationExample + activePaginationLink)).toBe('2');
        });

        it('should check selected pages by clicking next and previous link', () => {
            scrollIntoView(tablePaginationExample);
            click(linkNext);
            expect(getText(tablePaginationExample + activePaginationLink)).toBe('4');
            click(linkPrevious);
            expect(getText(tablePaginationExample + activePaginationLink)).toBe('3');
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/7148
        xit('should check that current page not changing after changing items per page', () => {
            scrollIntoView(tablePaginationExample);
            click(tablePaginationExample + button);
            const defaultSelectedPage = getText(selectedPage);
            click(menuItem);
            expect(getText(selectedPage)).toBe(defaultSelectedPage);
        });
    });

    it('should check RTL/LTR orientations', () => {
        tablePage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check example blocks visual regression', () => {
            tablePage.saveExampleBaselineScreenshot();
            expect(tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkIsLinkClickable(selector: string): void {
        const linkLength = getElementArrayLength(selector + link);
        for (let i = 0; i < linkLength; i++) {
            expect(isElementClickable(selector + link, i)).toBe(
                true,
                `link with index ${i} in ${selector} example not clickable`
            );
        }
    }
});
