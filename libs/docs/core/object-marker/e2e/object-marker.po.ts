import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectMarkerPo extends CoreBaseComponentPo {
    private url = '/object-marker';
    root = '#page-content';

    marker = 'span.fd-object-marker';
    iconOnlyMarkers = 'fd-object-marker-example span';
    objectMarkerClickableExample = 'fd-object-marker-clickable-example ';
    link = 'a';
    icon = 'i';

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
