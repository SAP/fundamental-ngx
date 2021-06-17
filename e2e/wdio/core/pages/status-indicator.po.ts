import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class StatusIndicatorPo extends CoreBaseComponentPo {
    url = '/status-indicator';
    root = '#page-content';

    statusIcon = 'path#status_icon_290-shape-border';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'status-indicator'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'status-indicator'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
