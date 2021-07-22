import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ObjectIdentifierPo extends CoreBaseComponentPo {
    private url = '/object-identifier';
    root = '#page-content';

    identifier = '.fd-object-identifier';
    clickableLinks = 'fd-link fd-object-identifier__link';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.identifier);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-identifier'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-identifier'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
