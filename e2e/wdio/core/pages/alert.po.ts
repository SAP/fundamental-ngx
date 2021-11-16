import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'alert'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'alert'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
