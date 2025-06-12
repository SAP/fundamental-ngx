import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ObjectIdentifierPo extends CoreBaseComponentPo {
    identifier = '.fd-object-identifier';
    clickableLinks = '.fd-link';

    private url = '/object-identifier';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-identifier'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-identifier'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
