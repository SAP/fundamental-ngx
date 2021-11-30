import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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
        waitForElDisplayed(this.root);
        waitForPresent(this.marker);
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
