import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class UploadCollectionPo extends BaseComponentPo {
    private url = '/upload-collection';

    defaultExample = 'fdp-upload-collection-example';
    disableExample = 'fdp-upload-collection-disabled-example';
    readonlyExample = 'fdp-upload-collection-readonly-example';
    turnOffExample = 'fdp-upload-collection-turn-off-example';

    tableItems = ' .fd-dnd-item';
    buttons = ' .fd-button--ghost.fd-button--menu';
    menuItem = '.fd-menu__item';
    tablePages = ' .fd-pagination__link.ng-star-inserted';
    tableResult = ' .fdp-upload-collection__pagination--total';
    linkNext = ' .fd-pagination__link--next';
    linkPrevious = ' .fd-pagination__link--previous';
    inputFields = ' .fd-input--compact';
    columnHeaders = ' [role="columnheader"]';
    tableContent = ' fd-icon~span';
    transparentButton = ' .fd-button--transparent';
    dialogInputField = 'fd-dialog-body .fd-input';
    dialogCreateButton = 'button.fd-dialog__decisive-button';
    tableItemCount = ' span~span';
    menuButton = '.fd-menu__item';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
