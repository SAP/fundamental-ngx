import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class IllustratedMessagePo extends CoreBaseComponentPo {
    url = '/illustrated-message';
    root = '#page-content';

    sceneAndSpotButtons = 'fd-illustrated-message-actions button';
    buttonDialog = 'fd-illustrated-message-dialog-example .fd-button';
    dialogPopup = '[role="dialog"]';
    closePopupSignButton = '.fd-dialog__header .fd-button';
    closePopupButton = '.fd-dialog__footer [label="Close"]>button';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'illustrated-message'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'illustrated-message'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
