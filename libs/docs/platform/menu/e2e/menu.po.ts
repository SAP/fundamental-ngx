import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class MenuPo extends PlatformBaseComponentPo {
    url = '/menu';
    root = '#page-content';
    menuBtnArr = '.fd-button';
    menuBtn = 'fdp-platform-menu-basic-example button';
    menuBtnTextArr = '.fd-button span';
    menuAvatarBtn = 'fdp-platform-menu-basic-example fd-avatar';
    menuHorizontalAvatarBtn = 'fdp-platform-menu-x-position-example fd-avatar';
    menuItemArr = '#fdp-menu-basic-menu fdp-menu-item';
    menuItemTextArr = '#fdp-menu-basic-menu fdp-menu-item span';
    iconMenuIconArr = 'component-example .fd-doc-component fd-icon';
    menuItemOverlay = '.cdk-overlay-container';

    cascadingMenuBtn = 'fdp-platform-menu-cascade-example button';
    cascadingMenuItemsArr = '#fdp-menu-cascade-menu fdp-menu-item';
    cascadingVegMenuItemsArr = '#fdp-menu-vegetable-menu fdp-menu-item';
    cascadingLettuceItemsArr = '#fdp-menu-lettuce-menu fdp-menu-item';

    menuWithIconsBtn = 'fdp-platform-menu-with-icons-example button';
    menuWithIconsItem = '#fdp-menu-menu-icons fdp-menu-item';
    menuWithIconsItemText = this.menuWithIconsItem + ' span';
    menuWithIconsIcon = this.menuWithIconsItem + ' fd-icon';
    menuWithIconsAddon = '#fdp-menu-menu-icons fd-menu-addon';
    selectedItemLabel = 'fdp-platform-menu-with-icons-example > div > div';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'menu'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'menu'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
