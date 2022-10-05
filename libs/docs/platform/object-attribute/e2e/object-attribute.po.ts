import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectAttributePo extends PlatformBaseComponentPo {
    url = '/object-attribute';
    root = '#page-content';

    standaloneTextObject = 'fdp-object-attribute-example .fd-object-attribute';
    linkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute';
    externalLinkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute--link';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
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
