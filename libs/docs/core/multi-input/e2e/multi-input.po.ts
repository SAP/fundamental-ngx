import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MultiInputPo extends CoreBaseComponentPo {
    private url = '/multi-input';

    activeDropdownButtons = 'button[title="value-help"]:not(:disabled)';
    activeInputs = '.fd-multi-input-field input:not(:disabled)';
    disableInputs = 'div.is-disabled';
    simpleMultiInputOptions = '.fd-popover-custom-list [fd-list-item] fd-checkbox';
    expandedDropdown = '.fd-list';
    multiInputOptions = 'fd-multi-input[inputid="multiInput"] .fd-token__text span';
    buttonShowAll = '.fd-multi-input-menu-overflow a.fd-link';
    hiddenAddonButtonInputOptions = 'fd-multi-input[inputid="noAddonMultiInput1"] .fd-token__text span';
    compactMultiInputOptions = '.fd-multi-input.is-compact .fd-token__text span';
    approveButton = '.fd-button--emphasized';
    multiSelectButton = '.custom-multi-input-select-all-bar-element button';
    mobileInputOptions = 'fd-multi-input-mobile-example .fd-token__text span';
    displayObjectOptions = 'fd-multi-input-displaywith-example .fd-token__text span';
    searchTermOptions = 'fd-multi-input-includes-example .fd-token__text span';
    customFilterOptions = 'fd-multi-input-filter-example .fd-token__text span';
    asyncExampleOptions = 'div#rtl-ex6 .fd-token__text span';
    tokenOptions = 'fd-multi-input-new-tokens-example .fd-token__text span';
    templateOptions = 'fd-multi-input-custom-item-example .fd-token__text span';
    simpleExampleTokens = 'fd-multi-input-example fd-tokenizer fd-token';
    simpleHiddenAddonExampleTokens = 'fd-multi-input-example fd-multi-input:nth-of-type(3) fd-tokenizer fd-token';
    compactExampleTokens = 'fd-multi-input-compact-example fd-tokenizer fd-token';
    popover = '.fd-popover__body';
    checkboxInput = this.popover + ' fd-checkbox';
    listItem = this.popover + ' .fd-list__item';
    dialogCheckbox = '.fd-dialog fd-checkbox';
    selectAllItemsBtn = '.fd-button[glyph="multiselect-all"]';
    dialogListItem = '.fd-dialog .fd-list__item';
    compactInput = '.fd-multi-input.is-compact .fd-input';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'multi-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'multi-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
