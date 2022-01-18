import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionListItemPo extends BaseComponentPo {
    url = '/action-list-item';

    actionBtns = 'fdp-action-list-item button';
    actionLists = 'fdp-platform-action-list-item-border-less-example fdp-list';
    actionSections = 'fdp-platform-action-list-item-border-less-example ul';
    cozyItem = '#fdp-list-item-8';
    compactItem = '#fdp-list-item-12';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'action-list-item'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'action-list-item'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
