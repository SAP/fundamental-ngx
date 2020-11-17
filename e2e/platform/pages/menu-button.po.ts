import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';
import { waitForVisible } from '../../helper/helper';

export class MenuButtonPo extends BaseComponentPo {
    private url = '/menu-button';
    root = $('#page-content');

    btnArrowIconsArr = $$('fdp-menu-button fd-icon[glyph=slim-arrow-down]');
    btnWorldIconArr = $$('fdp-menu-button fd-icon[ng-reflect-glyph=world]');
    cozyBtnAttrArr = $$('fdp-platform-menu-button-cozy-example fdp-menu-button');
    cozyBtnArr = $$('fdp-platform-menu-button-cozy-example button');
    cozySelectedItemLabel = $('fdp-platform-menu-button-cozy-example div');
    menuItemArr = $$('#fdp-menu-basic-menu fdp-menu-item');
    menuItemOverlay = $('.cdk-overlay-container');
    compactBtnAttrArr = $$('fdp-platform-menu-button-compact-example fdp-menu-button');
    compactBtnArr = $$('fdp-platform-menu-button-compact-example button');
    sectionTitle = $('fd-docs-section-title h2');
    menuTypeBtnAttrArr = $$('fdp-platform-menu-button-example fdp-menu-button');
    menuTypeBtnArr = $$('fdp-platform-menu-button-example button');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }
}
