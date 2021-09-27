import { BaseComponent } from './cy-core-base-component.po';

export class ActionSheetPo extends BaseComponent {
    pageUrl = '/action-sheet';

    actionSheetMenuButton = 'fd-action-sheet-control button';
    actionSheetList = 'fd-action-sheet-body ul';
    actionSheetListItems = 'fd-action-sheet-body li';
    actionSheetListItemButtons = 'fd-action-sheet-body button';
    alertMessage = 'fd-message-toast';

    navigateTo(): void {
        super.navigateTo(this.pageUrl);
    }
}
