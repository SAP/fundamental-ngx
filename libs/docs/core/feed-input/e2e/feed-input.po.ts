import { CoreBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class FeedInputPo extends CoreBaseComponentPo {
    root = '#page-content';
    feedInput = 'fd-feed-input div';
    feedInputTextArea = 'textarea.fd-feed-input__textarea';
    feedInputButton = '.fd-feed-input button';
    feedInputAvatar = 'fd-avatar.fd-feed-input__thumb';
    feedInputNoAvatar = 'fd-feed-input-no-avatar-example fd-avatar';
    disableInputTextArea = 'textarea[aria-disabled="true"]';
    disableInputButton = '.fd-feed-input.is-disabled button';
    activeInputTextAreas = "//textarea[not(contains(@aria-disabled, 'true'))]";

    private url = '/feed-input';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'feed-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'feed-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
