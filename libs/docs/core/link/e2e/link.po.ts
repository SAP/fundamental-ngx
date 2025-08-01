import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class LinkPo extends CoreBaseComponentPo {
    root = '#page-content';
    links = 'fd-link-example a';
    rightArrowIcon = 'fd-icon[class*="arrow-right"]';
    leftArrowIcon = 'fd-icon[class*="arrow-left"]';

    private url = '/link';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'link'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'link'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
