import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MultiComboboxPo extends PlatformBaseComponentPo {
    private url = '/multi-combobox';

    mobileModeExamples = 'fdp-multi-combobox-mobile-example ';

    expandButton = '#page-content .fd-input-group .fd-button';
    mobileExpandButton = this.mobileModeExamples + '.fd-input-group .fd-button';
    token = '.fd-token__text';
    tokenCloseButton = '.fd-token .fd-token__close';
    tokenInputField = '.fdp-multi-combobox-tokenizer-custom';
    inputField = this.tokenInputField + ' .fd-input';
    list = '.fd-popover__popper .fd-list';
    listItemCheckbox = this.list + ' fd-checkbox';
    listItem = this.list + ' .fd-list__item[role="option"]';
    selectedListItem = this.list + ' .fd-list__item.is-selected';

    dialog = '[role="dialog"]';
    dialogButton = this.dialog + ' .fd-button';
    dialogListItem = this.dialog + ' .fd-list__item[role="option"]';
    selectedDialogItem = this.dialog + ' .fd-list__item.is-selected';
    dialogInput = this.dialog + ' #mobile';
    showSelectedItemsBtn = this.dialog + ' .fd-margin-begin--tiny';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'multi-combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'multi-combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
