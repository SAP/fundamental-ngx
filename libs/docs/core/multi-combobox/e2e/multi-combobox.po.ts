import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MultiComboboxPo extends CoreBaseComponentPo {
    private url = '/multi-combobox';

    mobileModeExamples = 'fd-multi-combobox-mobile-example ';

    expandButton = 'fd-multi-combobox .fd-input-group .fd-button';
    mobileExpandButton = this.mobileModeExamples + '.fd-input-group .fd-button';
    token = '.fd-token__text';
    tokenCloseButton = '.fd-token .fd-token__close';
    tokenInputField = '.fd-multi-combobox-tokenizer-custom';
    inputField = this.tokenInputField + ' .fd-input';
    list = '.fd-popover__body .fd-list';
    listItemCheckbox = this.list + ' fd-checkbox';
    listItem = this.list + ' li.fd-list__item[role="listitem"]';
    selectedListItem = this.list + ' .fd-list__item.is-selected .fd-list__title';

    dialog = '[role="dialog"]';
    dialogButton = this.dialog + ' .fd-button';
    dialogListItem = this.dialog + ' .fd-list__item[role="listitem"]';
    selectedDialogItem = this.dialog + ' .fd-list__item.is-selected .fd-list__title';
    dialogInput = this.dialog + ' #mobile-input';
    showSelectedItemsBtn = this.dialog + ' .fd-margin-begin--tiny';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'multi-combobox'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'multi-combobox'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
