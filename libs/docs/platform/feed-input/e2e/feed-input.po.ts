import { PlatformBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';
import { placeholders_array } from './feed-input-page-contents';

export class FeedInputPo extends PlatformBaseComponentPo {
    private url = '/feed-input';
    root = '#page-content';

    feedInput = 'fdp-feed-input';
    feedInputTextArea = 'textarea';
    feedInputButton = '.fd-feed-input button';
    feedInputAvatar = 'fd-avatar';
    feedInputNoAvatar = 'fdp-feed-input-no-avatar-example ' + this.feedInputAvatar;
    feedInputPlaceholder1 = `.fd-feed-input__textarea[placeholder="${placeholders_array[0]}"]`;
    feedInputPlaceholder2 = `.fd-feed-input__textarea[placeholder="${placeholders_array[2]}"]`;

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForElDisplayed(this.root);
        await waitForElDisplayed(this.feedInput);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'feed-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'feed-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
