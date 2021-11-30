import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class MultiInputPo extends CoreBaseComponentPo {
    private url = '/multi-input';
    root = '#page-content';

    activeDropdownButtons = 'button[title="value-help"]:not(:disabled)';
    activeInputs = '.fd-multi-input-field input:not(:disabled)';
    disableInputs = 'div.is-disabled';
    options = 'fd-checkbox.ng-untouched';
    expandedDropdown = '.fd-list';
    multiInputOptions = 'fd-multi-input[inputid="multiInput"] .fd-token__text span';
    buttonShowAll = 'a.fd-link';
    hiddenAddonButtonInputOptions = 'fd-multi-input[inputid="noAddonMultiInput1"] .fd-token__text span';
    compactMultiInputOptions = '.fd-token--compact .fd-token__text span';
    approveButton = '.fd-button--emphasized';
    multiSelectButton = '.custom-multi-input-select-all-bar-element button';
    mobileInputOptions = 'fd-multi-input-mobile-example .fd-token__text span';
    displayObjectOptions = 'div#background-ex3 .fd-token__text span';
    searchTermOptions = 'div#background-ex4 .fd-token__text span';
    customFilterOptions = 'div#background-ex5 .fd-token__text span';
    asyncExampleOptions = 'div#rtl-ex6 .fd-token__text span';
    tokenOptions = 'div#background-ex8 .fd-token__text span';
    templateOptions = 'div#background-ex9 .fd-token__text span';
    simpleExampleTokens = 'fd-multi-input-example fd-tokenizer fd-token';
    compactExampleTokens = 'fd-multi-input-compact-example fd-tokenizer fd-token';
    popover = '.fd-popover__popper';
    checkboxInput = this.popover + ' fd-checkbox';
    listItem = this.popover + ' .fd-list__item';
    dialogCheckbox = '.fd-dialog fd-checkbox';
    selectAllItemsBtn = '.fd-button[glyph="multiselect-all"]';
    dialogListItem = '.fd-dialog .fd-list__item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'multi-input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'multi-input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
