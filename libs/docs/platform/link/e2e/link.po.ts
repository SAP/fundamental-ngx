import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class LinkPo extends PlatformBaseComponentPo {
    readonly url = '/link';
    readonly root = '#page-content';
    readonly iconLink = 'fdp-platform-link-icon-example a';
    readonly standardLinks = 'fdp-platform-link-standard-example a';
    readonly emphasizedLink = 'fdp-platform-link-emphasized-example a';
    readonly disabledLink = 'fdp-platform-link-disabled-example a';
    readonly emphasizedDisabledLink = 'fdp-platform-link-disabled-emphasized-example a';
    readonly invertedLink = 'fdp-platform-link-inverted-example a';
    readonly truncatedLink = 'fdp-platform-link-truncated-example a';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'link'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'link'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
