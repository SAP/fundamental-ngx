import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DisplayListItemPo extends BaseComponentPo {
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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.displayLinks);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'display-list-item'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'display-list-item'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
