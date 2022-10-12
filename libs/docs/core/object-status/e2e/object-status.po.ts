import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectStatusPo extends CoreBaseComponentPo {
    private url = '/object-status';
    root = '#page-content';
    pageHeader = 'app-object-status-header h1';

    icons = '.fd-object-status__icon';
    text = '.fd-object-status__text';
    status = '.fd-object-status';

    iconExamples = 'fd-object-status-default-example ';
    textExamples = 'fd-object-status-text-example ';
    textAndIconExamples = 'fd-object-status-numeric-icon-example ';
    colorsExamples = 'fd-object-status-generic-text-example ';
    clickableExamples = 'fd-object-status-clickable-and-icon-example ';
    invertedExamples = 'fd-object-status-inverted-example ';
    invertedColorExamples = 'fd-object-status-inverted-generic-text-example ';
    largeExamples = 'fd-object-status-object-status-large-example ';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-status'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-status'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
