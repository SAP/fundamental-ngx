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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-status'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-status'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
