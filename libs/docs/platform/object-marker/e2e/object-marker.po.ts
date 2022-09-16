import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectMarkerPo extends PlatformBaseComponentPo {
    private url = '/object-marker';
    root = '#page-content';

    marker = 'component-example .fd-object-marker';
    iconOnlyMarkers = 'fdp-object-marker-example span';
    clickableMarkers = 'fdp-object-marker [ng-reflect-clickable="true"]';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-marker'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-marker'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
