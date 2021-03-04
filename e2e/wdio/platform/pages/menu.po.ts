import { BaseComponentPo } from './base-component.po';
import { waitForPresent, waitForElDisplayed } from '../../driver/wdio';

export class MenuPo extends BaseComponentPo {
    url = '/menu';
    root = '#page-content';
    menuBtnArr = 'fdp-button button';
    firstMenuBtn = 'fdp-platform-menu-basic-example button[ng-reflect-label="Button"]';
    secondMenuBtn = 'fdp-platform-menu-basic-example button[ng-reflect-label="Menu Button"]';
    menuBtnTextArr = 'fdp-button button span';
    menuAvatarBtn = 'fdp-platform-menu-basic-example fd-avatar';
    menuHorizontalAvatarBtn = 'fdp-platform-menu-x-position-example fd-avatar';
    menuItemArr = '#fdp-menu-basic-menu fdp-menu-item';
    menuItemTextArr = '#fdp-menu-basic-menu fdp-menu-item span';
    iconMenuIconArr = 'fdp-button button fd-icon';
    menuItemOverlay = '.cdk-overlay-container';

    cascadingMenuBtn = 'fdp-platform-menu-cascade-example button';
    cascadingMenuItemsArr = '#fdp-menu-cascade-menu fdp-menu-item';
    cascadingVegMenuItemsArr = '#fdp-menu-vegetable-menu fdp-menu-item';
    cascadingLettuceItemsArr = '#fdp-menu-lettuce-menu fdp-menu-item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.menuBtnArr);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'menu'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'menu'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
