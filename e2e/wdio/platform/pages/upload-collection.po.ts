import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class UploadCollectionPo extends BaseComponentPo {
    private url = '/upload-collection';

    defaultExample = 'fdp-upload-collection-example';
    disableExample = 'fdp-upload-collection-disabled-example';
    readonlyExample = 'fdp-upload-collection-readonly-example';
    turnOffExample = 'fdp-upload-collection-turn-off-example';

    tableItems = ' .fd-table__row--hoverable';
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
    checkbox = ' [labelclass="fd-table__checkbox-label"]';
    busyIndicator = ' .fd-busy-indicator';
    tableItem = ' .fdp-upload-collection__vertical-align-center';
    fileNameLabel = this.tableItem + ' span';
    listItem = '.fd-list__item';
    listItemTitle = '.fd-list__title';
    moveButton = '.fd-button--emphasized';
    ghostButton = ' .fd-button--ghost';
    dialog = 'div.fd-dialog__content';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }
}
