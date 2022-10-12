import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ActionBarPo extends PlatformBaseComponentPo {
    url = '/action-bar';
    root = '#page-content';

    pageTitle = 'app-action-bar-header h1';
    actionBtnArr = 'fdp-button button';
    menuItems = 'div fdp-menu-item';
    backBtnArr = 'fdp-action-bar .fd-action-bar__back button';
    descriptions = 'fdp-action-bar p';
    titles = 'fdp-action-bar h2';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'action-bar'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'action-bar'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
