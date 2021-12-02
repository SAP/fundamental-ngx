import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionBarPo extends BaseComponentPo {
    url = '/action-bar';
    root = '#page-content';

    pageTitle = 'app-action-bar-header h1';
    actionBtnArr = 'fdp-button button';
    menuItems = 'div fdp-menu-item';
    backBtnArr = 'fdp-action-bar .fd-action-bar__back button';
    descriptions = 'fdp-action-bar p';
    titles = 'fdp-action-bar h2';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.pageTitle);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'action-bar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'action-bar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
