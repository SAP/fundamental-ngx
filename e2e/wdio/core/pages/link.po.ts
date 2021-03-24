import { BaseComponentPo } from '../../platform/pages/base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class LinkPo extends CoreBaseComponentPo {
    private url = '/link';
    root = '#page-content';
    links = 'fd-link-example a';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
    };

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'link'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'link'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
