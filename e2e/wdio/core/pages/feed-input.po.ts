import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class FeedInputPo extends CoreBaseComponentPo {
    private url = '/feed-input';
    root = '#page-content';
    feedInput = 'fd-feed-input div';
    feedInputTextArea = 'textarea.fd-feed-input__textarea';
    feedInputButton = '.fd-feed-input button';
    feedInputAvatar = 'fd-avatar.fd-feed-input__thumb';
    feedInputNoAvatar = 'fd-feed-input-no-avatar-example fd-avatar';
    disableInputTextArea = 'textarea[aria-disabled="true"]';
    disableInputButton = '.fd-feed-input.is-disabled button';
    activeInputTextAreas = "//textarea[not(contains(@aria-disabled, 'true'))]";

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
