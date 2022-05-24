import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ComboboxPo extends CoreBaseComponentPo {
    url = '/combobox';

    standardButton = 'fd-combobox-example button';
    dropdownPopover = 'fd-popover-body';
    dropdownOption = 'li.fd-list__item:not(.fd-list__group-header)';
    smallText = 'div~small';
    smallText_2 = 'fd-combobox~small';
    allInputFields = this.root + ' .fd-input.fd-input-group__input';
    activeInputButton = 'fd-popover-control .fd-input-group__button';
    mobileButton = '.cdk-drag-disabled button';
    mobileTitle = 'h1.fd-title--h5';
    reactiveFormButton = 'fd-combobox-forms-example button';
    reactiveFormText = 'fd-combobox-forms-example small';
    compactInput = '.fd-input--compact';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
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
