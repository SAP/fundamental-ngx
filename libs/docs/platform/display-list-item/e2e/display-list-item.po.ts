import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class DisplayListItemPo extends PlatformBaseComponentPo {
    private url = '/display-list-item';
    root = '#page-content';

    // partial navigation examples
    displayLinks = 'fdp-platform-display-list-item-border-less-example a';
    cozyDisplayTitles = 'fdp-platform-display-list-item-border-less-example fdp-list:first-of-type a span';
    comfyDisplayTitles = 'fdp-platform-display-list-item-border-less-example fdp-list:nth-of-type(2) a span';
    sections = 'fdp-platform-display-list-item-border-less-example ul';

    declarativeDisplayLinks = 'fdp-platform-display-list-item-with-navigation-example a';
    declarativeDisplayTitles = 'fdp-platform-display-list-item-with-navigation-example a span:first-of-type';
    declarativeSection = 'fdp-platform-display-list-item-with-navigation-example ul';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'display-list-item'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'display-list-item'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
