import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FeedListItemPo extends CoreBaseComponentPo {
    private url = '/feed-list-item';
    root = '#page-content';
    paragraphs = '.fd-feed-list__text';
    linkMore = '.fd-link.fd-feed-list__link--more';
    checkbox = 'input[id="toggle-text-righ1"]';
    links = "a.fd-link[href*='example']";
    actionSettingsButton = 'button[glyph="action-settings"]';
    menuButton = 'button[glyph="menu"]';
    menuOption = '.fd-menu__link';
    overflowButton = '.fd-button--standard.fd-button--compact';
    overflowOption = '.fd-button--transparent.fd-button--text-alignment-left';
    optionCancel = '.fd-button--negative';

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'feed-list-item'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'feed-list-item'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.paragraphs);
    }
}
