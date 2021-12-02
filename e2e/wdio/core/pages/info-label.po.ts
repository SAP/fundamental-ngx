import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForPresent, waitForElDisplayed } from '../../driver/wdio';

export class InfoLabelPo extends CoreBaseComponentPo {
    url = '/info-label';
    readonly root = '#page-content';

    defaultLabel = 'fd-info-label-default-example fd-info-label';
    infoLabel = 'fd-info-label';
    textExample = 'fdp-platform-info-label-text-example ';
    iconTextExample = 'fdp-platform-info-label-text-icon-example ';
    icon = '.fd-info-label__icon';
    labelText = '.fd-info-label__text';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.defaultLabel);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'info-label'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'info-label'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
