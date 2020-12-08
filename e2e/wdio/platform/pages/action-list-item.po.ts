import { BaseComponentPo } from './base-component.po';
import { webDriver } from '../../driver/wdio';

export class ActionListItemPo extends BaseComponentPo {
    private url = '/action-list-item';
    root = '#page-content';

    actionBtns = 'fdp-action-list-item button';
    actionLists = 'fdp-borderless-action-list-item-example fdp-list';
    actionSections = 'fdp-borderless-action-list-item-example ul';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
        webDriver.waitForDisplayed(this.root);
    }
}
