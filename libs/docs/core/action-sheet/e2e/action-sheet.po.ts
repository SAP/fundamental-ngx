// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class ActionSheetPo extends CoreBaseComponentPo {
    url = '/action-sheet';
    root = '#page-content';

    actionSheetMenuButton = 'app-action-sheet fd-action-sheet-control button';
    actionSheetList = 'fd-action-sheet-body ul';
    actionSheetListItems = 'fd-action-sheet-body li';
    actionSheetListItemButtons = 'fd-action-sheet-body button';
    alertMessage = 'fd-message-toast';
    actionSheetBodyContainer = 'fd-action-sheet-body';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'action-sheet'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'action-sheet'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
