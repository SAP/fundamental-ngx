import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class FixedCardLayoutPo extends CoreBaseComponentPo {
    private url = '/fixed-card-layout';
    root = '#page-content';

    hideCardBtnArr = 'fd-fixed-card-layout-examples button';
    cardDivArr = 'div.cdk-drag.fd-fixed-card-group--card.ng-star-inserted';
    cardHeaderArr = 'fd-card fd-card-header';
    cardContentArr = 'fd-card fd-card-content';
    cardColumnArr = 'div.cdk-drop-list';
    disableDragBtn = 'fd-fixed-card-layout-disabled-drag button';
    placeholderCard = 'div.fd-fixed-card-group--card-placeholder';
    navigationMenuBtn = 'button[aria-label*="Switch Navigation"]';
    pageSidebar = 'sections-toolbar .sidebar';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }
}
