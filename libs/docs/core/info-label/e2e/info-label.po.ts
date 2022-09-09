import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
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
