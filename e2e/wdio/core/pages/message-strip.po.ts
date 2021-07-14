import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class MessageStripPo extends CoreBaseComponentPo {
    private url = '/message-strip';
    
    defaultExample = 'fd-message-strip-example ';
    noIconExample = 'fd-message-strip-noicon-example ';
    widthExample = 'fd-message-strip-width-example ';
    playground = '.fd-playground ';

    messageStrip = '.fd-message-strip';
    dismissButton = '.fd-message-strip__close';

    dissmissibleCheckbox = 'label[for="playgrounddismissible"]'
    noIconCheckbox = 'label[for="playgroundnoIcon"]'
    widthInput = '#playgroundwidth'
    messageInput = '#playgroundmessage';

    select = '#playgroundtype';

    messageStripPG = this.playground + this.messageStrip;
    stateOption = this.playground + 'option';
    resetButton = this.playground + '.schema--inner-group:nth-child(3) .fd-button';
    messageStripMessage = this.playground + '.fd-message-strip__text';


    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'message-strip'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'message-strip'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
