import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectMarkerPo extends PlatformBaseComponentPo {
    private url = '/object-marker';
    root = '#page-content';

    marker = 'component-example .fd-object-marker';
    iconOnlyMarkers = 'fdp-object-marker-example span';
    clickableMarkers = 'fdp-object-marker [ng-reflect-clickable="true"]';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-marker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-marker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
