import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class RadioButtonPo extends CoreBaseComponentPo {
    url = '/radio';
    root = '#page-content';

    disableRadioButton = 'fd-radio-button.ng-untouched:not(.ng-valid) input';
    activeRadioButton = 'fd-radio-button.ng-valid .fd-radio__label';
    activeInput = 'fd-radio-button.ng-valid input';
    disableDefaultRadioButton = '#radio-17';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'radio-button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'radio-button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
