// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ActionBarPo extends CoreBaseComponentPo {
    url = '/action-bar';
    root = '#page-content';

    button = ' .fd-button';
    backButton = ' .fd-action-bar__back button';
    title = ' h2';
    description = ' .fd-action-bar__description';

    actionBarBackButton = 'fd-action-bar-back-example';
    actionBarBackButtonBackButton = this.actionBarBackButton + this.backButton;

    actionBarLongPageTitle = 'fd-action-bar-long-string-title-truncation-example';

    actionBarNoBackButton = 'fd-action-bar-no-back-example';

    actionBarContextualMenu = 'fd-action-bar-contextual-menu-example';
    actionBarContextualMenuButton = this.actionBarContextualMenu + ' [type="button"]';
    actionBarContextualMenuOptionList = '.fd-menu__list';
    actionBarContextualMenuOptionListItem = this.actionBarContextualMenuOptionList + ' [role="menuitem"]';

    actionBarMobileView = 'fd-action-bar-mobile-example';
    actionBarMobileViewMenuButton = this.actionBarMobileView + ' [type="button"][glyph="overflow"]';
    actionBarMobileViewOptionList = '.fd-menu__list';
    actionBarMobileViewOptionListItem = this.actionBarMobileViewOptionList + ' [role="menuitem"]';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'action-bar'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'action-bar'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
