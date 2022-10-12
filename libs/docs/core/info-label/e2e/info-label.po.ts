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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'info-label'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'info-label'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
