import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';
import { waitForVisible } from '../helper/helper';

export class SplitMenuButtonPo extends BaseComponentPo {
    private url = '/split-menu-button';
    root = $('#page-content');

    arrowBtnArr = $$('component-example button:nth-of-type(2)');
    mainBtnArr = $$('component-example button:first-of-type');
    menuOverlay = $('.cdk-overlay-container');
    menuItemArr = $$('.fd-menu__list fdp-menu-item');
    behaviorsExSelectionBtnArr = $$('fdp-platform-split-button-behaviors-example button:first-of-type');
    behaviorsExArrowBtnArr = $$('fdp-platform-split-button-behaviors-example button:nth-of-type(2)');
    typesExSelectionBtnArr = $$('fdp-platform-split-button-types-example button:first-of-type');
    typesExArrowBtnArr = $$('fdp-platform-split-button-types-example button:nth-of-type(2)');
    typesOutput = $('fdp-platform-split-button-types-example p');
    iconExSelectionBtnArr = $$('fdp-platform-split-button-icons-example button:first-of-type');
    iconExArrowBtnArr = $$('fdp-platform-split-button-icons-example button:nth-of-type(2)');
    iconBtnAttrArr = $$('fdp-platform-split-button-icons-example fdp-split-menu-button');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }
}
