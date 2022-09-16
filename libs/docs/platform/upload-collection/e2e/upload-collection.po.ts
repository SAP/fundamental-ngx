import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class UploadCollectionPo extends PlatformBaseComponentPo {
    private url = '/upload-collection';

    defaultExample = 'fdp-upload-collection-example';
    disableExample = 'fdp-upload-collection-disabled-example';
    readonlyExample = 'fdp-upload-collection-readonly-example';
    turnOffExample = 'fdp-upload-collection-turn-off-example';

    tableItems = ' .fd-table__row--hoverable';
    buttons = ' .fd-button--ghost.fd-button--menu';
    menuItem = '.fd-menu__item';
    tablePages = ' .fd-pagination__link';
    tableResult = ' .fdp-upload-collection__pagination--total';
    linkNext = ' [glyph="navigation-right-arrow"]';
    linkPrevious = ' [glyph="navigation-left-arrow"]';
    inputFields = ' .fdp-upload-collection__toolbar .fd-input';
    columnHeaders = ' [role="columnheader"]';
    tableContent = ' .fdp-upload-collection__cursor';
    transparentButton = ' .fd-button--transparent';
    dialogInputField = 'fd-dialog-body .fd-input';
    dialogCreateButton = 'button.fd-dialog__decisive-button';
    tableItemCount = ' fd-breadcrumb:first-child fd-breadcrumb-item';
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
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
