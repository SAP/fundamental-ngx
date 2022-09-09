import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FormMessagePo extends CoreBaseComponentPo {
    url = '/form-message';
    root = '#page-content';

    messageWithInput = '.is-information.fd-input';
    messageWithInputGroup = '.fd-input.fd-input-group__input';
    buttons = 'button.fd-button.fd-input-group__button';
    messageInformation = '.fd-form-message--information';
    messageWithTextArea = 'textarea[id="textarea-message"]';
    inputFields = '.fd-popover__control.ng-star-inserted';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'form-message'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'form-message'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
