import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class RadioButtonPo extends CoreBaseComponentPo {
    url = '/radio';
    root = '#page-content';

    disableRadioButton = 'fd-radio-button.ng-untouched:not(.ng-valid)';
    activeRadioButton = 'fd-radio-button.ng-valid .fd-radio__label';
    activeInput = 'input[id^="rad"]:not([ng-reflect-is-disabled="true"])';
    disableDefaultRadioButton = '#radio-id-19';


    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'radio-button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'radio-button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
