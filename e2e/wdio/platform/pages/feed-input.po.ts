import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class FeedInputPo extends BaseComponentPo {
    private url = '/feed-input';
    root = '#page-content';

    feedInput = 'fdp-feed-input';
    feedInputTextArea = 'textarea';
    feedInputButton = '.fd-feed-input button';
    feedInputAvatar = 'fd-avatar';
    feedInputNoAvatar = 'fdp-feed-input-no-avatar-example ' + this.feedInputAvatar;

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.feedInput);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'feed-input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'feed-input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
