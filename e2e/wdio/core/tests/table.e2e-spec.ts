import { TablePo } from '../pages/table.po';
import {
    acceptAlert,
    browserIsFirefox,
    checkElementScreenshot,
    click,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getImageTagBrowserPlatform,
    getText,
    isElementClickable,
    isElementDisplayed,
    isEnabled,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    setValue,
    waitForElDisplayed
} from '../../driver/wdio';
import {
    alertText,
    componentExampleArr,
    dateTestText,
    paginationTestArr,
    tableCellArr, tableCellArr2, testText
} from '../fixtures/appData/table-content';

describe('Table test suite', function() {
    const tablePage = new TablePo();
    const {
        tableExample, link, tableToolbarExample, button, busyIndicator, dialogContent, inputField, table,
        tableRow, tableCell, markAllCheckboxes, tableCheckboxesExample, tableSemanticExample, tablePopinExample,
        clickableTableRow, tableNavigatableRowExample, tablePaginationExample, menuItem, paginationLink, tableResult,
        linkPrevious, linkNext, tableCustomColumnsExample, inputGroup, dialogValue, tableInner, columnSortingInput,
        tableColumnSortingExample, listItem, markAllCheckboxesFF, clickableTableRowFF
    } = tablePage;

    beforeAll(() => {
        tablePage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForElDisplayed(tableExample);
    }, 1);

    it('should check clickability links for all examples', () => {
        for (let i = 0; i < 11; i++) {
            checkIsLinkClickable(componentExampleArr[i]);
        }
    });

    describe('Check Table with Toolbar example', function() {

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
    });

    describe('Check Customizable Columns example', function() {

        it('should check that table sort work correctly', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            click(dialogContent + button, 1);
            click(dialogContent + button, 2);
            saveElementScreenshot(tableCustomColumnsExample + table, 'table-sort-down-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableCustomColumnsExample + table, 'table-sort-down-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);

            click(tableCustomColumnsExample + button);
            click(dialogContent + button);
            click(dialogContent + button, 2);
            saveElementScreenshot(tableCustomColumnsExample + table, 'table-sort-up-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableCustomColumnsExample + table, 'table-sort-up-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
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
            expect(isElementClickable(dialogContent + button, 3))
                .toBe(true, 'cancel button not clickable');
        });
    });

    describe('Check Column Sorting and Filtering example', function() {

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
            click(listItem, 1);
            saveElementScreenshot(tableColumnSortingExample + table, 'table-descending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableColumnSortingExample + table, 'table-descending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);

            click(tableInner);
            click(listItem);
            saveElementScreenshot(tableColumnSortingExample + table, 'table-ascending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableColumnSortingExample + table, 'table-ascending-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
        });
    });

    describe('Check Table with Checkboxes example', function() {

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableCheckboxesExample);
            const checkboxLength = getElementArrayLength(tableCheckboxesExample + markAllCheckboxes);
            for (let i = 0; i < checkboxLength; i++) {
                scrollIntoView(tableCheckboxesExample + markAllCheckboxes, i);
                browserIsFirefox() ? click(tableCheckboxesExample + markAllCheckboxesFF, i) :
                    click(tableCheckboxesExample + markAllCheckboxes, i);
            }

            const checkboxLength_2 = getElementArrayLength(tableCheckboxesExample + tableRow);
            for (let i = 0; i < checkboxLength_2; i++) {
                expect(getAttributeByName(tableCheckboxesExample + tableRow, 'aria-selected', i))
                    .toBe('true', `row ${i} not selected`);
            }
        });
    });

    describe('Check Table With Semantic Row Highlighting example', function() {

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableSemanticExample);
            browserIsFirefox() ? click(tableSemanticExample + markAllCheckboxesFF) :
                click(tableSemanticExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tableSemanticExample + tableRow);
            for (let i = 0; i < checkboxLength; i++) {
                expect(getAttributeByName(tableSemanticExample + tableRow, 'aria-selected', i))
                    .toBe('true', `element with index ${i} not selected`);
            }
        });
    });

    describe('Check Pop In Mode on Responsive Table example', function() {

        it('should check that table rows are clickable', () => {
            scrollIntoView(tablePopinExample);
            const tableRowLength = getElementArrayLength(tablePopinExample + clickableTableRow);
            for (let i = 0; i < tableRowLength; i++) {
                expect(isElementClickable(tablePopinExample + clickableTableRow, i))
                    .toBe(true, `element with index ${i} not clickable`);
            }
        });

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tablePopinExample);
            browserIsFirefox() ? click(tablePopinExample + markAllCheckboxesFF) :
                click(tablePopinExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tablePopinExample + tableRow);
            const startCycle = 20;
            for (let i = startCycle; i < checkboxLength; i++) {
                expect(getAttributeByName(tablePopinExample + tableRow, 'aria-selected', i))
                    .toBe('true', `element with index ${i} not selected`);
            }
        });
    });

    describe('Check Table with Non-navigatable Row example', function() {

        it('should check alert message', () => {
            scrollIntoView(tableNavigatableRowExample);
            const rowLength = getElementArrayLength(tableNavigatableRowExample + clickableTableRow);
            for (let i = 0; i < rowLength - 1; i++) {
                if (i === 1) {
                    continue;
                }
                scrollIntoView(tableNavigatableRowExample + clickableTableRow, i);
                browserIsFirefox() ? click(tableNavigatableRowExample + clickableTableRowFF, i) :
                    click(tableNavigatableRowExample + clickableTableRow, i);
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

    describe('Check  Table With Pagination example', function() {

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

        it('should check selected pages by clicking each option', () => {
            scrollIntoView(tablePaginationExample);
            const linkLength = getElementArrayLength(paginationLink);
            for (let i = 0; i < linkLength; i++) {
                click(paginationLink, i);
                expect(getText(tableResult).trim()).toBe(paginationTestArr[i]);
            }
        });

        it('should check selected pages by clicking next and previous link', () => {
            scrollIntoView(tablePaginationExample);
            click(linkNext);
            expect(getText(tableResult).trim()).toBe(paginationTestArr[3]);

            click(linkPrevious);
            expect(getText(tableResult).trim()).toBe(paginationTestArr[2]);
        });
    });


    it('should check RTL/LTR orientations', () => {
        tablePage.checkRtlSwitch();
    });

    xdescribe('visual regression', function() {

        it('should check example blocks visual regression', () => {
            tablePage.saveExampleBaselineScreenshot();
            expect(tablePage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkIsLinkClickable(selector: string): void {
        const linkLength = getElementArrayLength(selector + link);
        for (let i = 0; i < linkLength; i++) {
            expect(isElementClickable(selector + link, i)).toBe(true, `link with index ${i} not clickable`);
        }
    }
});
