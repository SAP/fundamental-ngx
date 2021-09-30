import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class MessageToastPo extends CoreBaseComponentPo {
    private url = '/message-toast';

    exampleBlock = 'fd-message-toast-example ';
    openMessageButton = this.exampleBlock + '.fd-button';
    hideAllButton = '.fd-button--emphasized';
    messageContainer = '.fd-message-toast-container ';
    messageToast = '.fd-message-toast';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'message-toast'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'message-toast'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
