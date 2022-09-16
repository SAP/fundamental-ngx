import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class StatusIndicatorPo extends CoreBaseComponentPo {
    url = '/status-indicator';
    root = '#page-content';

    statusIcon = 'path#status_icon_290-shape-border';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'status-indicator'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'status-indicator'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
