import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class MultiComboboxPo extends CoreBaseComponentPo {
    mobileModeExamples = 'fd-multi-combobox-mobile-example ';

    expandButton = 'fd-multi-combobox .fd-input-group .fd-button';
    mobileExpandButton = this.mobileModeExamples + '.fd-input-group .fd-button';
    token = '.fd-token__text';
    tokenCloseButton = '.fd-token .fd-token__close';
    tokenInputField = '.fd-multi-combobox-tokenizer-custom';
    inputField = this.tokenInputField + ' .fd-input';
    list = '.fd-popover__body .fd-list';
    listItemCheckbox = `${this.list} .fd-list__item .fd-list__form-item fd-checkbox`;
    listItem = this.list + ' li.fd-list__item[role="option"]';
    selectedListItem = `${this.list} .fd-list__item.is-selected .fd-list__title`;

    dialog = '.fd-dialog';
    dialogButton = this.dialog + ' .fd-button';
    dialogListItem = this.dialog + ' .fd-list__item[role="option"]';
    selectedDialogItem = this.dialog + ' .fd-list__item.is-selected .fd-list__title';
    dialogInput = this.dialog + ' #mobile-input';
    showSelectedItemsBtn = this.dialog + ' .fd-margin-begin--tiny';

    private url = '/multi-combobox';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
