import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ActionListItemPo extends PlatformBaseComponentPo {
    url = '/action-list-item';

    actionBtns = 'fdp-action-list-item button';
    actionSections = 'fdp-platform-action-list-item-border-less-example ul';
    cozyItem = 'fdp-platform-action-list-item-border-less-example fdp-list#cozy-list .fd-list__item';
    compactItem = 'fdp-platform-action-list-item-border-less-example fdp-list#compact-list .fd-list__item';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'action-list-item'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'action-list-item'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
