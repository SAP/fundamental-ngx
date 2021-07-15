import { TablePo } from '../pages/table.po';
import {
    acceptAlert,
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
    tableCellArr
} from '../fixtures/appData/table-content';

describe('Table test suite', function() {
    const tablePage = new TablePo();
    const {
        tableExample, link, tableToolbarExample, button, busyIndicator, dialogContent, inputField, table,
        tableRow, tableCell, markAllCheckboxes, tableCheckboxesExample, tableSemanticExample, tablePopinExample,
        clickableTableRow, tableNavigatableRowExample, tablePaginationExample, menuItem, paginationLink, tableResult,
        linkPrevious, linkNext, tableCustomColumnsExample, inputGroup, dialogValue
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

        it('should check display busy indicator', () => {
            scrollIntoView(tableToolbarExample);
            click(tableToolbarExample + button, 1);
            expect(isElementDisplayed(busyIndicator)).toBe(true, 'busy indicator not displayed');
        });

        it('should check adding a new item', () => {
            scrollIntoView(tableToolbarExample);
            click(tableToolbarExample + button, 2);
            for (let i = 0; i < 3; i++) {
                setValue(dialogContent + inputField, 'test', i);
            }
            click(dialogContent + button, 1);
            saveElementScreenshot(tableToolbarExample + table, 'table-toolbar-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableToolbarExample + table, 'table-toolbar-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
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

        it('should check that table customization work correctly', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            click(dialogContent + button, 1);
            click(dialogContent + button, 2);
            saveElementScreenshot(tableCustomColumnsExample + table, 'table-custom-columns-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder());
            expect(checkElementScreenshot(tableCustomColumnsExample + table, 'table-custom-columns-example-' + getImageTagBrowserPlatform(),
                tablePage.getScreenshotFolder())).toBeLessThan(5, `element item state mismatch`);
        });

        it('should check search work correctly', () => {
            scrollIntoView(tableCustomColumnsExample);
            click(tableCustomColumnsExample + button);
            setValue(dialogContent + inputGroup, 'date');
            expect(getText(dialogValue)).toBe(dateTestText);
        });
    });

    describe('Check Table with Checkboxes example', function() {

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableCheckboxesExample);
            const checkboxLength = getElementArrayLength(tableCheckboxesExample + markAllCheckboxes);
            for (let i = 0; i < checkboxLength; i++) {
                scrollIntoView(tableCheckboxesExample + markAllCheckboxes, i);
                click(tableCheckboxesExample + markAllCheckboxes, i);
            }

            const checkboxLength_2 = getElementArrayLength(tableCheckboxesExample + tableRow);
            for (let i = 0; i < checkboxLength_2; i++) {
                expect(getAttributeByName(tableCheckboxesExample + tableRow, 'aria-selected', i)).toBe('true');
            }
        });
    });

    describe('Check Table With Semantic Row Highlighting example', function() {

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tableSemanticExample);
            click(tableSemanticExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tableSemanticExample + tableRow);
            for (let i = 0; i < checkboxLength; i++) {
                expect(getAttributeByName(tableSemanticExample + tableRow, 'aria-selected', i)).toBe('true');
            }
        });
    });

    describe('Check Pop In Mode on Responsive Table example', function() {

        it('should check that table rows are clickable', () => {
            scrollIntoView(tablePopinExample);
            const tableRowLength = getElementArrayLength(tablePopinExample + clickableTableRow);
            for (let i = 0; i < tableRowLength; i++) {
                expect(isElementClickable(tablePopinExample + clickableTableRow, i)).toBe(true, `element with index ${i} not clickable`);
            }
        });

        it('should check that checkbox work correctly', () => {
            scrollIntoView(tablePopinExample);
            click(tablePopinExample + markAllCheckboxes);
            const checkboxLength = getElementArrayLength(tablePopinExample + tableRow);
            for (let i = 20; i < checkboxLength; i++) {
                expect(getAttributeByName(tablePopinExample + tableRow, 'aria-selected', i)).toBe('true');
            }
        });
    });

    describe('Check Table with Non-navigatable Row example', function() {

        it('should check alert message', () => {
            scrollIntoView(tableNavigatableRowExample);
            const rowLength = getElementArrayLength(tableNavigatableRowExample + clickableTableRow);
            for (let i = 0; i < rowLength; i++) {
                scrollIntoView(tableNavigatableRowExample + clickableTableRow, i);
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
                expect(getText(tableResult)).toBe(paginationTestArr[i]);
            }
        });

        it('should check selected pages by clicking next and previous link', () => {
            scrollIntoView(tablePaginationExample);
            click(linkNext);
            expect(getText(tableResult)).toBe(paginationTestArr[3]);

            click(linkPrevious);
            expect(getText(tableResult)).toBe(paginationTestArr[2]);
        });
    });


    it('should check RTL/LTR orientations', () => {
        tablePage.checkRtlSwitch();
    });

    describe('visual regression', function() {

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
