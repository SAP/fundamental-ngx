import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class BreadcrumbPo extends CoreBaseComponentPo {
    private url = '/breadcrumb';
    root = '#page-content';
    links = '.fd-breadcrumb__link';
    disabledLinks = '.fd-breadcrumb__item span';

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'breadcrumb'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'breadcrumb'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.links);
    }
}
