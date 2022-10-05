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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'form-message'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'form-message'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
