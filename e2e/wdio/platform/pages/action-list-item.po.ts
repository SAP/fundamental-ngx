import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionListItemPo extends BaseComponentPo {
    url = '/action-list-item';
    root = '#page-content';

    actionBtns = 'fdp-platform-action-list-item-example button';
    actionLists = 'fdp-platform-action-list-item-border-less-example fdp-list';
    actionSections = 'fdp-platform-action-list-item-border-less-example ul';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.actionBtns);
    }
}
