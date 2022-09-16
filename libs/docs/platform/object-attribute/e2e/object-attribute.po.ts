import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ObjectAttributePo extends PlatformBaseComponentPo {
    url = '/object-attribute';
    root = '#page-content';

    standaloneTextObject = 'fdp-object-attribute-example .fd-object-attribute';
    linkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute';
    externalLinkObject = 'fdp-platform-object-attribute-link-example .fd-object-attribute--link';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'object-attribute'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'object-attribute'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
