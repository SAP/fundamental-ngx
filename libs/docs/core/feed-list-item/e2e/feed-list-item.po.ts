import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FeedListItemPo extends CoreBaseComponentPo {
    private url = '/feed-list-item';

    readonly simpleExample = 'fd-fli-simple-example ';
    readonly avatarExample = 'fd-fli-avatar-example ';
    readonly actionExample = 'fd-fli-action-example ';
    readonly footerExample = 'fd-fli-footer-example ';
    readonly mobileExample = 'fd-fli-mobile-example ';

    readonly paragraphs = '.fd-feed-list__text';
    readonly linkMore = '.fd-feed-list__link--more';
    readonly links = '.fd-link:not(.fd-feed-list__link--more)';
    readonly actionSettingsButton = 'button[glyph="action-settings"]';
    readonly actionMenuButton = 'fd-fli-action-example button[glyph="overflow"]';
    readonly actionMenuButtonOption = '.fd-action-sheet__item .fd-button';
    readonly overflowButton = 'fd-fli-mobile-example button[glyph="overflow"]';
    readonly overflowOption = '.fd-action-sheet__item .fd-button';
    readonly mobileMenu = 'fd-action-sheet-body';
    readonly optionCancel = '.fd-button--negative';
    readonly avatar = 'fd-avatar';
    readonly icon = ' fd-icon';

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'feed-list-item'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'feed-list-item'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
