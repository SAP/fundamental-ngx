// eslint-disable-next-line @nx/enforce-module-boundaries
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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'alert'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'alert'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
