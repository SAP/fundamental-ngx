import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class PageFooterPo extends BaseComponentPo {
    private url = '/page-footer';
    pageFooterClickableLink = '.fd-page-footer__container fdp-link';
    pageFooterText = '.fd-page-footer__text .fd-form-label';

    open(): void {
        super.open(this.url);
        waitForPresent(this.title);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'page-footer'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'page-footer'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
