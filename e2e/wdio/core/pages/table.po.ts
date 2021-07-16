import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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

    link = ' a';
    busyIndicator = '.fd-busy-indicator';
    inputField = ' input';
    button = ' button';
    table = ' table';
    dialogContent = '.fd-dialog__content';
    tableRow = ' .fd-table__body .fd-table__row';
    tableCell = ' .fd-table__cell';
    markAllCheckboxes = ' .fd-table__header fd-checkbox';
    clickableTableRow = ' .fd-table__row--activable';
    menuItem = '.fd-menu__item';
    paginationLink = '.fd-pagination__link.ng-star-inserted';
    tableResult = '.fd-pagination__total';
    linkPrevious = '.fd-pagination__link--previous';
    linkNext = '.fd-pagination__link--next';
    inputGroup = ' .fd-input-group__input';
    dialogValue = '.fd-list__item.ng-star-inserted .fd-list__title';
    tableInner = '.fd-table__inner';
    columnSortingInput = '.fd-popover__popper input';
    listItem = '.fd-list__item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'table'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'table'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
