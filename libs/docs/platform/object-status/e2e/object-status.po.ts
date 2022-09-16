import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectStatusPo extends PlatformBaseComponentPo {
    private url = '/object-status';
    root = '#page-content';
    pageHeader = 'fd-platform-object-status-header h1';

    defaultExamples = 'fdp-platform-object-status-example ';
    textOnlyExamples = 'fdp-object-status-text-example ';
    textAndIconExamples = 'fdp-object-status-numeric-icon-example ';
    indicationColorExamples = 'fdp-object-status-generic-text-example ';
    clickableExamples = 'fdp-platform-object-status-clickable-and-icon-example ';
    invertedExamples = 'fdp-object-status-inverted-example ';
    invertedIndicationColorExamples = 'fdp-object-status-inverted-generic-text-example ';
    largeExamples = 'fdp-platform-object-status-large-example ';

    icons = '.fd-object-status__icon';
    text = '.fd-object-status__text';
    status = 'fdp-object-status';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'platform-object-status'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'platform-object-status'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
