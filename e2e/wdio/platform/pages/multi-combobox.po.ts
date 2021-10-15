import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class MultiComboboxPo extends BaseComponentPo {
    private url = '/multi-combobox';

    mobileModeExamples = 'fdp-multi-combobox-mobile-example ';

    expandButton = '#page-content .fd-input-group .fd-button';
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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'multi-combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'multi-combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
