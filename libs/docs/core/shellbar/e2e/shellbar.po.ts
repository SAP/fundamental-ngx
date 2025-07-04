import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class ShellbarPo extends CoreBaseComponentPo {
    // example blocks
    basicExample = 'fd-shellbar-basic-example ';
    collapsableExample = 'fd-shellbar-collapsible-example ';
    sideNavExample = 'fd-shellbar-side-nav-example ';

    // element selectors
    suggestionsDropdown = '.fdp-search-field__suggestion-dropdown';
    popover = 'fd-popover-body ';
    shellbar = '.fd-shellbar';
    shellbarTitle = 'fd-shellbar-title';
    shellbarLogo = 'fd-shellbar-logo';
    shellbarLogoLink = this.shellbarLogo + ' a';
    shellbarAvatar = 'fd-avatar';
    popoverMenuItem = this.popover + '.fd-menu__link';
    button = 'button';
    searchbarButton = 'fdp-search-field ' + this.button;
    searchField = 'fdp-search-field input';
    searchMenuItem = this.suggestionsDropdown + ' .fd-menu__item';
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

    private url = '/shellbar';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'shellbar'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'shellbar'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
