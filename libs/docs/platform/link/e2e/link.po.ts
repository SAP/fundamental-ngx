import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class LinkPo extends PlatformBaseComponentPo {
    readonly url = '/link';
    readonly root = '#page-content';
    readonly iconLink = 'fdp-platform-link-icon-example a';
    readonly standardLinks = 'fdp-platform-link-standard-example a';
    readonly emphasizedLink = 'fdp-platform-link-emphasized-example a';
    readonly disabledLink = 'fdp-platform-link-disabled-example a';
    readonly emphasizedDisabledLink = 'fdp-platform-link-disabled-emphasized-example a';
    readonly invertedLink = 'fdp-platform-link-inverted-example a';
    readonly truncatedLink = 'fdp-platform-link-truncated-example a';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'link'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'link'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
