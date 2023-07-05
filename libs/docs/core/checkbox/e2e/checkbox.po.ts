// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class CheckboxPo extends CoreBaseComponentPo {
    private url = '/checkbox';

    standardCheckbox = 'fd-checkbox-default-example ';
    tristateCheckbox = 'fd-checkbox-tristate-example ';
    customValueCheckbox = 'fd-checkbox-custom-values-example ';
    reactiveFormCheckbox = 'fd-checkbox-reactive-forms-example ';
    customLabelCheckbox = 'fd-checkbox-custom-label-example ';
    styledCheckbox = 'fd-checkbox-states-example ';

    checkbox = 'fd-checkbox';
    checkboxInput = this.checkbox + ' input';
    checkboxLabel = this.checkbox + ' label';
    checkboxCheckmark = this.checkboxLabel + ' span.fd-checkbox__checkmark';
    link = this.checkbox + ' a';
    tristateOutput = this.tristateCheckbox + 'div';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'checkbox'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'checkbox'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
