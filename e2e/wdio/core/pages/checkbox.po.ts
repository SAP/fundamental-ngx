import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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
    link = this.checkbox + ' a';
    tristateOutput = this.tristateCheckbox + 'div';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
