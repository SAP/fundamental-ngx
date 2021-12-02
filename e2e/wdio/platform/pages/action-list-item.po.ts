import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionListItemPo extends BaseComponentPo {
    url = '/action-list-item';
    root = '#page-content';

    actionBtns = 'fdp-platform-action-list-item-example button';
    actionLists = 'fdp-platform-action-list-item-border-less-example fdp-list';
    actionSections = 'fdp-platform-action-list-item-border-less-example ul';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.actionBtns);
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
