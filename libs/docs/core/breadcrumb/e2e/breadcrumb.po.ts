import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class BreadcrumbPo extends CoreBaseComponentPo {
    private url = '/breadcrumb';
    root = '#page-content';
    links = '.fd-breadcrumb__link';
    disabledLinks = '.fd-breadcrumb__item span';

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'breadcrumb'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'breadcrumb'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
