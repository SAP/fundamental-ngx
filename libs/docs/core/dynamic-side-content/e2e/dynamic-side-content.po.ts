import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class DynamicSideContentPo extends CoreBaseComponentPo {
    root = '#page-content';
    pageHeader = 'app-dynamic-side-content-header h1';
    private url = '/dynamic-side-content';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'dynamic-side-content'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'dynamic-side-content'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
