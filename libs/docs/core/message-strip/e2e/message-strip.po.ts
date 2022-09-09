import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MessageStripPo extends CoreBaseComponentPo {
    private url = '/message-strip';

    defaultExample = 'fd-message-strip-example ';
    noIconExample = 'fd-message-strip-noicon-example ';
    widthExample = 'fd-message-strip-width-example ';
    playground = '.fd-playground ';

    messageStrip = '.fd-message-strip';
    dismissButton = '.fd-message-strip__close';
    dismissibleCheckbox = 'label[for="playgrounddismissible"]';
    noIconCheckbox = 'label[for="playgroundnoIcon"]';
    widthInput = '#playgroundwidth';
    messageInput = '#playgroundmessage';
    typeSelectionField = '#playgroundtype';
    messageStripPG = this.playground + this.messageStrip;
    stateOption = this.playground + 'option';
    resetButton = this.playground + '.fd-fieldset .fd-button';
    messageStripMessage = this.playground + '.fd-message-strip__text';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'message-strip'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'message-strip'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
