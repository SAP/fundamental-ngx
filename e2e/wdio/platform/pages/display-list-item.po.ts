import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class DisplayListItemPo extends BaseComponentPo {
    private url = '/display-list-item';
    root = '#page-content';

    // partial navigation examples
    displayLinks = 'fdp-borderless-display-list-item-example a';
    cozyDisplayTitles = 'fdp-borderless-display-list-item-example fdp-list:first-of-type span:first-of-type';
    cozyDisplaySecText = 'fdp-borderless-display-list-item-example fdp-list:first-of-type span:nth-of-type(2)';
    sections = 'fdp-borderless-display-list-item-example ul';

    declarativeDisplayLinks = 'fdp-display-list-item-with-navigation-example a';
    declarativeDisplayTitles = 'fdp-display-list-item-with-navigation-example fdp-list:first-of-type span:first-of-type';
    declarativeSection = 'fdp-display-list-item-with-navigation-example ul';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
