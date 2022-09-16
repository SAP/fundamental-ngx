// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ActionSheetPo extends CoreBaseComponentPo {
    url = '/action-sheet';
    root = '#page-content';

    actionSheetMenuButton = 'app-action-sheet fd-action-sheet-control button';
    actionSheetList = 'fd-action-sheet-body ul';
    actionSheetListItems = 'fd-action-sheet-body li';
    actionSheetListItemButtons = 'fd-action-sheet-body button';
    alertMessage = 'fd-message-toast';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'action-sheet'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'action-sheet'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
