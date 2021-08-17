import { BaseComponentPo } from './base-component.po';
import { waitForPresent } from '../../driver/wdio';

export class PageFooterPo extends BaseComponentPo {
    private url = '/page-footer';
    pagefooterclicablelink = '.fd-page-footer__container fdp-link';
    pagefootertext = '.fd-page-footer__text .fd-form-label';
    
    open(): void {
        super.open(this.url);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'PageFooter'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'PageFooter'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
