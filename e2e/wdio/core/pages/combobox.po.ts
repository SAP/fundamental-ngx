import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class ComboboxPo extends CoreBaseComponentPo {
    url = '/combobox';
    root = '#page-content';

    standardButton = '#background-ex0 button';
    dropdownPopover = 'fd-popover-body';
    dropdownOption = 'li.fd-list__item';
    smallText = 'div~small';
    smallText_2 = 'fd-combobox~small';
    allInputFields = this.root + ' .fd-input.fd-input-group__input';
    activeInputButton = 'fd-popover-control .fd-input-group__button';
    mobileButton = '.cdk-drag-disabled button';
    mobileTitle = 'h1.fd-title--h5';
    reactiveFormButton = '#background-ex13 button';
    reactiveFormText = '#background-ex13 small';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'combobox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'combobox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
