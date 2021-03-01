import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';
import { CoreBaseComponentPo } from './core-base-component.po';

export class ActionBarPo extends CoreBaseComponentPo {
    url = '/action-bar';
    root = '#page-content';

    backButton = ' .fd-action-bar__back button';
    title = ' h2';
    description = ' .fd-action-bar__description';
    cancelBtn = ' .fd-button--standard';
    saveBtn = ' .fd-button--emphasized';

    actionBarBackButton = 'fd-action-bar-back-example';
    actionBarBackButtonBackButton = this.actionBarBackButton + this.backButton;
    actionBarBackButtonCancelButton = this.actionBarBackButton + this.cancelBtn;
    actionBarBackButtonSaveButton = this.actionBarBackButton + this.saveBtn;

    actionBarLongPageTitle = 'fd-action-bar-long-string-title-truncation-example';
    actionBarLongPageTitleBackButton = this.actionBarLongPageTitle + this.backButton;
    actionBarLongPageTitleCancelButton = this.actionBarLongPageTitle + this.cancelBtn;
    actionBarLongPageTitleSaveButton = this.actionBarLongPageTitle + this.saveBtn;

    actionBarNoBackButton = 'fd-action-bar-no-back-example';
    actionBarNoBackButtonCancelButton = this.actionBarNoBackButton + this.cancelBtn;
    actionBarNoBackButtonSaveButton = this.actionBarNoBackButton + this.saveBtn;

    actionBarContextualMenu = 'fd-action-bar-contextual-menu-example';
    actionBarContextualMenuButton = this.actionBarContextualMenu + ' [type="button"]';
    actionBarContextualMenuOptionList = '.fd-menu__list';
    actionBarContextualMenuOptionListItem = this.actionBarContextualMenuOptionList + ' [role="menuitem"]';

    actionBarMobileView = 'fd-action-bar-mobile-example';
    actionBarMobileViewBackButton = this.actionBarMobileView + this.backButton;
    actionBarMobileViewMenuButton = this.actionBarMobileView + ' [type="button"][glyph="overflow"]';
    actionBarMobileViewOptionList = '.fd-menu__list';
    actionBarMobileViewOptionListItem = this.actionBarMobileViewOptionList + ' [role="menuitem"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.actionBarBackButtonBackButton);
    }
}
