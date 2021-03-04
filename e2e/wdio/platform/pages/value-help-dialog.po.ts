import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class ValueHelpDialogPo extends BaseComponentPo {
    private url = '/value-help-dialog';
    root = '#page-content';
    pageHeader = 'app-vhd-header h1';

    // Example block selectors
    disableCheckboxes = 'fdp-platform-vhd-filters-example input[type="checkbox"]';
    inputToken = 'fd-token .fd-token';
    menuCheckboxes = 'fd-popover-body fd-checkbox';
    menuDialogBtn = 'fd-popover button';
    menuItemNames = 'fd-popover-body .fd-list__title';
    miniOpenDialogBtn = 'button[class*="fd-button--compact"]';
    mobileExampleDialog = 'fdp-value-help-dialog[dialogtitle="Mobile value help dialog"]';
    openDialogBtn = 'button[class="fd-button fd-button--standard"]';

    // Dialog form selectors
    advSearchLabels = 'fd-form-group .fd-form-label';
    advSearchOptions = '.fd-container.fdp-value-help-dialog__advanced-filters';
    advSearchToggle = '.fd-toolbar button:first-of-type';
    currentDisplayedPage = '.fd-pagination-direction-override-display a[aria-selected="true"]';
    dialogContainer = 'div[role="dialog"]';
    dialogHeader = 'fd-dialog-header .fd-title';
    footerBtns = 'footer button';
    formTabs = 'nav a[role="tab"]';
    goBtn = 'button[type="submit"]';
    inputFields = 'form input';
    nextPageBtn = 'a.fd-pagination__link--next';
    previousPageBtn = 'a.fd-pagination__link--previous';
    productAddressColumn = 'table td:nth-of-type(7)';
    productCityColumn = 'table td:nth-of-type(5)';
    productCodeColumn = 'table td:nth-of-type(4)';
    productNameColumn = 'table td:nth-of-type(3)';
    productNicknameColumn = 'table td:nth-of-type(8)';
    productZipcodeColumn = 'table td:nth-of-type(6)';
    tableCheckboxes = 'table fd-checkbox';
    tableCheckboxesFF = 'table input[type="checkbox"]';
    tableColumn = 'table thead th.fd-table__cell.ng-star-inserted';
    tableRows = 'table tr';
    selectedItemID = 'tr[aria-selected="true"] td:nth-of-type(2)';
    selectedItemName = 'tr[aria-selected="true"] td:nth-of-type(3)';
    selectedTokens = '.fd-toolbar fd-token';

    // define conditions form selectors
    addBtn = 'button[glyph="add"]';
    conditionsInputField = '.fd-popover__control.ng-star-inserted input';
    conditionSelectors = 'fd-popover .fd-select__text-content';
    dropdownOptions = 'ul fd-option';
    sectionLabels = 'fd-panel .fd-panel__title';
    xBtn = 'button[glyph="decline"]';

    formInputField = (id: string) => {
        return this.inputFields + `[id="${id}"]`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.pageHeader);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
