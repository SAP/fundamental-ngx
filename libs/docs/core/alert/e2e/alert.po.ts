// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class AlertPo extends CoreBaseComponentPo {
    url = '/alert';
    root = '#page-content';

    button = ' button';
    alerts = 'fd-alert-example .fd-alert';
    playgroundAlert = '.fd-playground .fd-alert ';
    select = '#playgroundtype';
    option = 'option';
    closeAlertButton = 'fd-alert-example .fd-alert' + this.button;
    openOverlayButton = 'fd-alert-component-as-content-example' + this.button;
    popupAlert = 'fd-alert-container fd-alert';
    openCustomAlertButton = 'fd-alert-width-example' + this.button;
    playgroundAlertText = '.fd-playground .fd-alert__text ';
    messageField = '#playgroundmessage';
    alertWidthField = '#playgroundwidth';
    checkbox = '.fd-checkbox__label';
    openAlertButton = 'playground .fd-button--standard';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'alert'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'alert'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
