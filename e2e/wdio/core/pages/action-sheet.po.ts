import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ActionSheetPo extends CoreBaseComponentPo {
    url = '/action-sheet';
    root = '#page-content'

    actionSheetMenuButton = 'fd-action-sheet-control button';
    actionSheetList = 'fd-action-sheet-body ul';
    actionSheetListItems = 'fd-action-sheet-body li'
    actionSheetListItemButtons = 'fd-action-sheet-body button'
    alertMessage = 'fd-message-toast'

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
