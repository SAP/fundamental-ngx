import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class PageFooterPo extends PlatformBaseComponentPo {
    pageFooterClickableLink = '.fd-page-footer__container fdp-link';
    pageFooterText = '.fd-page-footer__text .fd-form-label';

    private url = '/page-footer';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'page-footer'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'page-footer'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
