import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class LinkPo extends CoreBaseComponentPo {
    private url = '/link';
    root = '#page-content';
    links = 'fd-link-example a';
    rightArrowIcon = 'fd-icon[class*="arrow-right"]';
    leftArrowIcon = 'fd-icon[class*="arrow-left"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'link'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'link'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
