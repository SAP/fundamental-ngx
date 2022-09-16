// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
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
