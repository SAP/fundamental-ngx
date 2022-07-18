import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class ValueHelpDialogPo extends BaseComponentPo {
    private url = '/value-help-dialog';
    root = '#page-content';
    pageHeader = 'app-vhd-header h1';

    // Example block selectors
    inputToken = 'fd-token .fd-token';
    menuCheckboxes = 'fd-popover-body fd-checkbox';
    menuDialogBtn = 'app-platform-vhd fd-popover button';
    menuItemNames = 'fd-popover-body .fd-list__title';
    miniOpenDialogBtn = 'button[class*="fd-button--compact"]';
    openDialogBtn = 'button[class="fd-button fd-button--standard"]';
    basicSearchInput = '.fdp-search-field__input';

    // Dialog form selectors
    advSearchLabels = 'fd-layout-grid .fd-form-label';
    advSearchOptions = 'form .fdp-value-help-dialog__advanced-filters';
    advSearchToggle = '.fd-toolbar button:first-of-type';
    dialogContainer = 'div[role="dialog"]';
    dialogHeader = 'fd-dialog-header .fd-title';
    footerBtns = 'footer button';
    formTabs = 'nav a[role="tab"]';
    goBtn = 'button[type="submit"]';
    inputFields = 'form input';
    productAddressColumn = 'table td:nth-of-type(7)';
    productCityColumn = 'table td:nth-of-type(5)';
    productCodeColumn = 'table td:nth-of-type(4)';
    productNameColumn = 'table td:nth-of-type(3)';
    productNicknameColumn = 'table td:nth-of-type(8)';
    productZipcodeColumn = 'table td:nth-of-type(6)';
    tableCheckboxes = 'table fd-checkbox';
    tableCheckboxesFF = 'table .fd-checkbox__label';
    tableColumn = 'table thead th.fd-table__cell.ng-star-inserted';
    tableRows = 'tbody tr';
    selectedItemID = 'tr[aria-selected="true"] td:nth-of-type(2)';
    selectedItemName = 'tr[aria-selected="true"] td:nth-of-type(3)';
    selectedTokens = '.fd-tokenizer fd-token';
    showAllBtn = '.fdp-value-help-dialog__toggle-filters button';
    toolbarButtons = '.fd-toolbar button';

    // define conditions form selectors
    addBtn = 'button[label="Add"]';
    conditionsInputField = '.fd-popover__control.ng-star-inserted input';
    conditionSelectors = 'fd-popover .fd-select__text-content';
    dropdownOptions = 'ul li[fd-option]';
    xBtn = 'button[glyph="decline"]';
    conditionsButton = 'fd-popover .fd-select__control .fd-button';
    cancelButton = '.fd-dialog__decisive-button';
    dialog = '.fd-dialog ';
    dialogButton = this.dialog + '.fd-button';
    dialogInput = '.fd-dialog .fd-input';
    input = '.fd-input';
    dropDownItem = '.fd-list__title';
    openMobileExampleBtn = 'fdp-platform-vhd-mobile-example button';
    token = '.fd-token';
    tokenizerClearButton = '.fdp-value-help-dialog__tokens-clear';

    formInputField = (id: string): string => this.inputFields + `[id="${id}"]`;

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.pageHeader);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
