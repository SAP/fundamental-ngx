import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ShellbarPo extends CoreBaseComponentPo {
    private url = '/shellbar';

    // example blocks
    basicExample = 'fd-shellbar-basic-example ';
    collapsableExample = 'fd-shellbar-collapsible-example ';
    sideNavExample = 'fd-shellbar-side-nav-example ';

    // element selectors
    popover = 'fd-popover-body ';
    shellbar = '.fd-shellbar';
    shellbarTitle = 'fd-shellbar-title';
    shellbarLogo = 'fd-shellbar-logo';
    shellbarLogoLink = this.shellbarLogo + ' a';
    shellbarAvatar = 'fd-avatar';
    popoverMenuItem = this.popover + '.fd-menu__link';
    button = 'button';
    searchbarButton = 'fd-combobox ' + this.button;
    searchField = 'fd-combobox input';
    searchMenuItem = this.popover + '.fd-list__item';
    actionButton = 'fd-shellbar-action ' + this.button;
    myAppsButton = 'fd-product-switch ' + this.button;
    myApps = 'fd-product-switch-body li';
    sizeButtons = 'fd-segmented-button ' + this.button;
    collapsableShellbar = this.collapsableExample + this.shellbar;
    collapsableShellbarTitle = this.collapsableExample + 'fd-product-menu button';
    sideNavItems = this.sideNavExample + 'fd-side-nav li';
    sideNavIcons = this.sideNavItems + ' .fd-nested-list__icon';
    sideNavText = this.sideNavItems + ' .fd-nested-list__title';
    sideNavControlBtn = this.sideNavExample + ' button[fd-shellbar-side-nav]';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'shellbar'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'shellbar'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
