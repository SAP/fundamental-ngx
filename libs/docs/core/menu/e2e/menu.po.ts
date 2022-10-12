import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class MenuPo extends CoreBaseComponentPo {
    url = '/menu';

    menuButtonsArr = '.docs-tile__content .fd-button.fd-button--standard';
    icons = '.fd-menu__item fd-icon';
    submenuActivePath = 'fd-menu-with-submenu-example > div span';
    btnMenuWithIcons = 'button[label = "Menu with icons"]';
    btnWithSubmenu = 'fd-menu-with-submenu-example button';
    btnMobileMenu = 'fd-menu-mobile-example button';
    menuItems = '.fd-menu__item';
    menuItemsArr = '.fd-menu__item a';
    submenuItems = 'div.fd-menu__link span';
    dialogMobileMenu = 'div[role="dialog"]';
    closeDialogMobileMenu = 'fd-bar-element button';
    dialogMenuItemsArr = 'fd-dialog-body li span';
    dialogMenuAddonArr = 'div .fd-menu__addon-after';
    dialogBtnBack = '#menu-mobile-navigate-back';
    dialogMenuTitle = 'h1.fd-title';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'menu'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'menu'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
