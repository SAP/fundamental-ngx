import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MessageToastPo extends CoreBaseComponentPo {
    private url = '/message-toast';

    exampleBlock = 'fd-message-toast-example ';
    openMessageButton = this.exampleBlock + '.fd-button';
    hideAllButton = '.fd-button--emphasized';
    messageContainer = '.fd-message-toast-container ';
    messageToast = '.fd-message-toast';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'message-toast'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'message-toast'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
