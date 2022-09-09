import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TablePo extends PlatformBaseComponentPo {
    readonly url = '/table';

    tableDefaultExample = 'fdp-platform-table-default-example ';
    tableCustomWidthExample = 'fdp-platform-table-custom-width-example ';
    tableActivableExample = 'fdp-platform-table-activable-example ';
    tableCustomColumnExample = 'fdp-platform-table-custom-column-example ';
    tableSingleRowSelectionExample = 'fdp-platform-table-single-row-selection-example ';
    tableMultipleRowSelectionExample = 'fdp-platform-table-multiple-row-selection-example ';
    tableSortableExample = 'fdp-platform-table-sortable-example ';
    tableFilterableExample = 'fdp-platform-table-filterable-example ';
    tableGroupableExample = 'fdp-platform-table-groupable-example ';
    tableFreezableExample = 'fdp-platform-table-freezable-example ';
    tableLoadingExample = 'fdp-platform-table-loading-example ';
    tablePageScrollingExample = 'fdp-platform-table-page-scrolling-example ';
    tableInitialStateExample = 'fdp-platform-table-initial-state-example ';
    tableP13ColumnsExample = 'fdp-platform-table-p13-columns-example ';
    tableP13SortExample = 'fdp-platform-table-p13-sort-example ';
    tableP13FilterExample = 'fdp-platform-table-p13-filter-example ';
    tableP13GroupExample = 'fdp-platform-table-p13-group-example ';
    tableNavigatableRowIndicatorExample = 'fdp-platform-table-navigatable-row-indicator-example ';
    tableNoItemsTemplateExample = 'fdp-platform-table-no-items-template-example ';
    tableSemanticExample = 'fdp-platform-table-semantic-example ';
    tableRowClassExample = 'fdp-platform-table-row-class-example ';
    tableTreeExample = 'fdp-platform-table-tree-example ';
    tableWrapExample = 'fdp-platform-table-wrap-example ';
    tableNoOuterBordersExample = 'fdp-platform-table-no-outer-borders-example ';

    button = 'button';
    buttonSearch = '.fdp-search-field__submit';
    buttonFilter = 'button[title="Filter"]';
    tableRow = 'tbody .fd-table__row.ng-star-inserted ';
    tableRowInitialState = 'tbody .fd-table__row.ng-star-inserted:not([aria-rowindex="0"], [aria-rowindex="3"])';
    input = 'input';
    tableCell = 'td';
    tableCellInitialState = '.fd-table__cell--expand';
    tableCellText = '.fd-table__text';
    buttonSortedBy = '.fd-list__item.ng-star-inserted';
    barButton = 'fd-button-bar ' + this.button;
    tableCellDescription = '[headers*="description"]';
    tableCellPrice = '[headers*="price"]';
    tableCellName = '[headers*="name"]';
    buttonSortedOrder = 'li.fd-list__item:not(.fd-list__group-header)';
    checkbox = '.fd-checkbox__label';
    busyIndicator = 'fd-busy-indicator .fd-busy-indicator';
    filterItem = '.fd-list__item--link';
    filterByColorItem = '.fd-list__item';
    tableCellStatusColor = '[headers*="statusColor"]';
    tableCellStatus = ' [headers*="__status"]:not([headers*="__statusColor"])';
    dialogCompactInput = 'fd-dialog-body .fd-input';
    dialogItem = '.fd-list__item.ng-star-inserted';
    dialogItemText = '.fd-select-item--active  .fd-list__title';
    dialogMoveToBottom = '[title="Move to Bottom"]';
    footerButtonOk = 'fd-dialog-footer-button button';
    columnHeader = '[role="columnheader"] div';
    popoverDropdownButton = 'fd-dialog-body fd-popover-control button';
    buttonAdd = '[title="Add new"]';
    buttonRemove = '[title="Remove"]';
    dialogInput = 'fdp-table-filter-rule input';
    expandedButton = '.fd-panel__expand button';
    expandedOption = 'fd-popover-control .fd-select__control';
    inputFields = '.fdp-search-field__input';
    playgroundExample = 'playground ';
    playgroundContentDensityDropdown = 'playground #playgroundcontentDensity';
    playgroundSelectionModeDropdown = 'playground #playgroundselectionMode';
    optionCompact = this.playgroundContentDensityDropdown + ' option[value="compact"]';
    optionCozy = this.playgroundContentDensityDropdown + ' option[value="cozy"]';
    optionCondensed = this.playgroundContentDensityDropdown + ' option[value="condensed"]';
    fdpTable = 'fdp-table';
    optionSingle = this.playgroundSelectionModeDropdown + ' option[value="single"]';
    optionMultiple = this.playgroundSelectionModeDropdown + ' option[value="multiple"]';
    tableCellFixed = '.fd-table__cell';
    playgroundSchemaInput = '.form-control.fd-input';
    toolbarText = '.fd-label.fd-toolbar__overflow-label';
    dropdownList = '.fd-select-options';
    dropdownOption = 'li[fd-option].fd-list__item ';
    dialogButton = 'fd-dialog-body .sort-row__actions .fd-button';
    dialogFilters = 'fd-dialog-body .fd-list__item:not(.fd-list__group-header)';
    filterInput = 'fdp-filter-custom input';
    filterButtonOk = 'fd-dialog-footer button';
    filterResetButton = 'fdp-table-reset-button button';
    allInputFields = 'fd-toolbar .fdp-search-field__input-group';
    sortableIcon = 'fdp-platform-table-sortable-example th';
    sortableOption = 'fd-popover-body .fd-list__item';
    sortablePopover = 'fd-popover-body';
    buttonActionOne = '[label="Action One"] button';
    buttonActionTwo = '[label="Action Two"] button';
    ellipsisButton = '.fd-ellipsis';
    synchronizeButton = '.fdp-search-field__loading';
    arrowButton = '.fd-table__cell--expand';

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
