import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ObjectAttributePo extends CoreBaseComponentPo {
    url = '/object-attribute';
    root = '#page-content';

    standaloneTextObject = 'fd-object-attribute-example .fd-object-attribute';
    linkObject = 'fd-object-attribute-link-example .fd-object-attribute';
    externalLinkObject = 'fd-object-attribute-link-example .fd-object-attribute--link';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-attribute'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-attribute'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
