import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionListItemPo extends BaseComponentPo {
    url = '/action-list-item';

    actionBtns = 'fdp-action-list-item button';
    actionSections = 'fdp-platform-action-list-item-border-less-example ul';
    cozyItem = 'fdp-platform-action-list-item-border-less-example fdp-list#cozy-list .fd-list__item';
    compactItem = 'fdp-platform-action-list-item-border-less-example fdp-list#compact-list .fd-list__item';

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
