import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class DisplayListItemPo extends BaseComponentPo {
    private url = '/display-list-item';
    root = '#page-content';

    // partial navigation examples
    displayLinks = 'fdp-borderless-display-list-item-example a';
    cozyDisplayTitles = 'fdp-borderless-display-list-item-example fdp-list:first-of-type a span';
    comfyDisplayTitles = 'fdp-borderless-display-list-item-example fdp-list:nth-of-type(2) a span';
    sections = 'fdp-borderless-display-list-item-example ul';

    declarativeDisplayLinks = 'fdp-display-list-item-with-navigation-example a';
    declarativeDisplayTitles = 'fdp-display-list-item-with-navigation-example a span:first-of-type';
    declarativeSection = 'fdp-display-list-item-with-navigation-example ul';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.displayLinks);
    }
}
