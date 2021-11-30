import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class DynamicSideContentPo extends CoreBaseComponentPo {
    private url = '/dynamic-side-content';
    root = '#page-content';
    pageHeader = 'app-dynamic-side-content-header h1';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.pageHeader);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'dynamic-side-content'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'dynamic-side-content'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
