import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TablePo extends CoreBaseComponentPo {
    url = '/table';

    tableExample = 'fd-table-example';
    tableToolbarExample = 'fd-table-toolbar-example';
    tableCheckboxesExample = 'fd-table-checkboxes-example';
    tableSemanticExample = 'fd-table-semantic-example';
    tableCustomColumnsExample = 'fd-table-custom-columns-example';
    tableColumnSortingExample = 'fd-table-column-sorting-example';
    tablePopinExample = 'fd-table-popin-example';
    tableNavigatableRowExample = 'fd-table-navigatable-row-example';
    tablePaginationExample = 'fd-table-pagination-example';
    tableActivableExample = 'fd-table-activable-example';
    tableFocusableExample = 'fd-table-focusable-example';
    tableCDKExample = 'fd-table-cdk-example';

    link = ' a:not(.fd-button)';
    busyIndicator = '.fd-busy-indicator';
    inputField = ' input';
    button = ' button';
    table = ' table';
    dialogContent = '.fd-dialog__content';
    tableRow = ' .fd-table__body .fd-table__row';
    tableCell = ' .fd-table__cell';
    markAllCheckboxes = ' .fd-table__header fd-checkbox';
    markAllCheckboxesFF = ' .fd-table__header .fd-table__cell--checkbox';
    clickableTableRow = ' .fd-table__row--activable';
    clickableTableRowFF = ' .fd-table__row--activable .fd-table__cell:nth-of-type(2)';
    menuItem = '.fd-list__item';
    paginationLink = ' .fd-pagination__link';
    activePaginationLink = ' .fd-pagination__link.is-active';
    tableResult = '.fd-pagination__total';
    linkPrevious = '[glyph="navigation-left-arrow"]';
    linkNext = '[glyph="navigation-right-arrow"]';
    inputGroup = ' .fd-input-group__input';
    dialogValue = '.fd-list__item.ng-star-inserted .fd-list__title';
    tableInner = '.fd-table__inner';
    sortAscending = 'button[title="Sort ascending"]';
    sortDescending = 'button[title="Sort descending"]';
    columnSortingInput = 'fd-table-column-sorting-example fd-toolbar fd-input-group[title="Search"] input';
    listItem = '.fd-menu__item';
    selectedPage = this.paginationLink + '.is-selected';
    tableCellWOHeader = ' .fd-table__cell:not(.cdk-header-cell)';
    tableSortableExample = '.fd-table-sortable-example ';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'table'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'table'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
