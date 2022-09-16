import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectIdentifierPo extends CoreBaseComponentPo {
    private url = '/object-identifier';

    identifier = '.fd-object-identifier';
    clickableLinks = '.fd-link';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-identifier'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-identifier'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
