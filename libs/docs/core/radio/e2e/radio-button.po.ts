import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class RadioButtonPo extends CoreBaseComponentPo {
    url = '/radio';
    root = '#page-content';

    disableRadioButton = 'fd-radio-button.ng-untouched:not(.ng-valid) input';
    activeRadioButton = 'fd-radio-button.ng-valid .fd-radio__label';
    activeInput = 'fd-radio-button.ng-valid input';
    disableDefaultRadioButton = '#radio-17';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'radio-button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'radio-button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
