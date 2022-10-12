// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'combobox'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'combobox'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
