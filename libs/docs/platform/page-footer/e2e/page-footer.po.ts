import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class PageFooterPo extends PlatformBaseComponentPo {
    private url = '/page-footer';
    pageFooterClickableLink = '.fd-page-footer__container fdp-link';
    pageFooterText = '.fd-page-footer__text .fd-form-label';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'page-footer'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'page-footer'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
