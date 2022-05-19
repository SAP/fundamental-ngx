import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class IllustratedMessagePo extends CoreBaseComponentPo {
    url = '/illustrated-message';
    root = '#page-content';

    sceneAndSpotButtons = 'fd-illustrated-message-actions button';
    buttonDialog = 'fd-illustrated-message-dialog-example .fd-button';
    dialogPopup = '[role="dialog"]';
    closePopupSignButton = '.fd-dialog__header .fd-button';
    closePopupButton = '.fd-dialog__footer [label="Close"]>button';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'illustrated-message'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'illustrated-message'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
