import {
    acceptAlert,
    click,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getElementPlaceholder,
    getText,
    PlatformBaseComponentPo,
    scrollIntoView,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { alertTestText1, alertTestText2, testText, testTextName, testTextSearch } from './table-contents';

export class TablePo extends PlatformBaseComponentPo {
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
    columnHeader = '[role="columnheader"] fdp-table-header-cell-content > div';
    popoverDropdownButton = 'fd-dialog-body fd-popover-control .fd-button';
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
    tableCellClass = '.fd-table__cell';
    playgroundSchemaInput = '.form-control.fd-input';
    toolbarText = '.fd-toolbar__title';
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

    constructor(public readonly url: string) {
        super();
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'table'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'table'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async checkAlertMessages(selector: string): Promise<void> {
        await scrollIntoView(selector + this.button);
        await click(selector + this.buttonActionOne);
        await expect(await getAlertText()).toBe(alertTestText1);
        await acceptAlert();

        await click(selector + this.buttonActionTwo);
        await expect(await getAlertText()).toBe(alertTestText2);
        await acceptAlert();
    }

    async findElementInTable(selector: string, arr: string[], count: number = 0): Promise<void> {
        await scrollIntoView(selector + this.input);
        await setValue(selector + this.input, testText);
        await click(selector + this.buttonSearch);
        const rowLength = await getElementArrayLength(selector + this.tableRow);
        await expect(rowLength).toEqual(1);
        const cellLength = await getElementArrayLength(selector + this.tableRow + this.tableCellText);
        for (let i = 0; i < cellLength - count; i++) {
            await expect((await getText(selector + this.tableRow + this.tableCellText, i)).trim()).toBe(arr[i]);
        }
    }

    async chooseSortOptionBy(selector: string, transparentButton: string, index: number): Promise<void> {
        await click(selector + transparentButton);
        await click(this.buttonSortedBy, index);
        await click(this.barButton);
    }

    async checkAllCheckbox(selector, skipFirst = false): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + 'fd-checkbox');
        const checkboxLength = await getElementArrayLength(selector + this.tableRow);
        for (let i = 0; i < checkboxLength; i++) {
            await expect(await getAttributeByName(selector + this.tableRow, 'aria-selected', i)).toBe(
                skipFirst && i === 0 ? 'false' : 'true'
            );
        }
    }

    async chooseFilter(indexFilter: number, indexBy): Promise<void> {
        await scrollIntoView(this.tableFilterableExample);
        await click(this.tableFilterableExample + this.ellipsisButton);
        await click(this.filterItem, indexFilter);
        await click(this.filterByColorItem, indexBy);
        await click(this.barButton);
    }

    async checkPlaceholder(selector: string, index: number = 0): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + this.button, index);
        await expect(await getElementPlaceholder(this.dialogCompactInput)).toBe(testTextSearch);
    }

    async checkSearchingInDialog(): Promise<void> {
        await setValue(this.dialogCompactInput, testTextName);
        const itemLength = await getElementArrayLength(this.dialogItemText);
        await expect(itemLength).toEqual(1);
        await expect((await getText(this.dialogItemText)).trim()).toBe(testTextName);
    }

    async checkSortingColumns(selector: string, transparentButton: string, index: number = 0): Promise<void> {
        await scrollIntoView(selector);
        await click(selector + transparentButton, index);
        await click(this.dialogMoveToBottom);
        await click(this.dialogItem);
        await click(this.footerButtonOk);
        await expect((await getText(selector + this.columnHeader, 3)).trim()).toBe(testTextName);
    }
}
