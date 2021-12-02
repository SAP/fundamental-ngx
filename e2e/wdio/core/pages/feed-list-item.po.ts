import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FeedListItemPo extends CoreBaseComponentPo {
    private url = '/feed-list-item';

    simpleExample = 'fd-fli-simple-example ';
    avatarExample = 'fd-fli-avatar-example ';
    actionExample = 'fd-fli-action-example ';
    footerExample = 'fd-fli-footer-example ';
    mobileExample = 'fd-fli-mobile-example ';

    paragraphs = '.fd-feed-list__text';
    linkMore = '.fd-feed-list__link--more';
    links = '.fd-link:not(.fd-feed-list__link--more)';
    actionSettingsButton = 'button[glyph="action-settings"]';
    menuButton = '[glyph="menu"]';
    menuOption = '.fd-menu__link';
    overflowButton = '.fd-button--standard.fd-button--compact';
    overflowOption = '.fd-button--transparent.fd-button--text-alignment-left';
    mobileMenu = 'fd-action-sheet-body';
    optionCancel = '.fd-button--negative';
    avatar = 'fd-avatar';

    getScreenshotFolder(): Record<string, any> {
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
