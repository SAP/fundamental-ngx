import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ObjectMarkerPo extends CoreBaseComponentPo {
    root = '#page-content';

    marker = 'span.fd-object-marker';
    iconOnlyMarkers = 'fd-object-marker-example span';
    objectMarkerClickableExample = 'fd-object-marker-clickable-example ';
    link = 'a';
    icon = 'fd-icon';

    private url = '/object-marker';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'object-marker'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'object-marker'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
