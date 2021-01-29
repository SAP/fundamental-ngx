import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ListPo extends BaseComponentPo {
    private url = '/list';
    root = '#page-content';

    // borderless examples
    noBorderListItems = 'fdp-borderless-list-example li';
    noBorderCompactList = 'fdp-borderless-list-example fdp-list:nth-of-type(2)';
    noBorderList = 'fdp-borderless-list-example fdp-list';
    // footer examples
    footerListItems = 'fdp-list-with-footer-example fdp-standard-list-item li';
    footerCompactList = 'fdp-list-with-footer-example fdp-list:nth-of-type(2)';
    footer = 'fdp-list-with-footer-example fdp-list-footer li';
    // group header examples
    groupHeaderListItems = 'fdp-list-with-group-header-example fdp-list-item li';
    groupHeader = 'fdp-list-with-group-header-example fdp-list-group-header li';
    groupCompactList = 'fdp-list-with-group-header-example fdp-list:nth-of-type(2)';
    // interactive examples
    interactiveListItems = 'fdp-list-group-header fdp-standard-list-item li';
    // counter examples
    counterListItems = 'fdp-list-with-item-counter-example li';
    counterCompactList = 'fdp-list-with-item-counter-example fdp-list:nth-of-type(2)';
    counterTitleItems = 'fdp-list-with-item-counter-example li span:first-of-type';
    counterCounterItem = 'fdp-list-with-item-counter-example li span:nth-of-type(2)';
    // deletion examples
    deletionListItems = 'fdp-list-with-delete-button-example li';
    deletionBtn = 'fdp-list-with-delete-button-example button';
    deletionIcon = 'fdp-list-with-delete-button-example fd-icon';
    // multi selection examples
    multiList = 'fdp-list-with-selection-example fdp-list';
    multiListItems = 'fdp-list-with-selection-example li';
    multiToolbar = 'fdp-list-with-selection-example fd-toolbar';
    multiCheckbox = 'fdp-list-with-selection-example fd-checkbox';
    // single selection examples
    singleList = 'fdp-list-with-single-selection-example fdp-list';
    singleListItems = 'fdp-list-with-single-selection-example li';
    singleToolbar = 'fdp-list-with-single-selection-example fd-toolbar';
    singleRadioBtn = 'fdp-list-with-single-selection-example fd-radio-button';
    // navigation indicator examples
    navList = 'fdp-list-with-navigation-example fdp-list';
    navListItems = 'fdp-list-with-navigation-example li';
    navListLink = 'fdp-list-with-navigation-example a';
    // virtual scroll examples:
    vScrollList = 'fdp-list-with-infinite-scroll-example fdp-list';
    vScrollListItems = 'fdp-list-with-infinite-scroll-example fdp-standard-list-item li';
    vScrollLoadIcon = 'fd-busy-indicator .fd-busy-indicator--circle-0';
    // load on btn click examples
    loadList = 'fdp-list-with-more-button-example fdp-list';
    loadListItems = 'fdp-list-with-more-button-example li';
    loadShowMoreBtn = 'fdp-list-with-more-button-example button';
    loadIcon = 'fd-busy-indicator .fd-busy-indicator';
    // button examples
    btnList = 'fdp-list-with-buttons-example fdp-list';
    btnListItems = 'fdp-list-with-buttons-example li';
    btnDeleteBtn = 'fdp-list-with-buttons-example button[id^=delete]';
    btnEditBtn = 'fdp-list-with-buttons-example button[id^=detail]';
    // no data examples
    noDataListItems = 'fdp-list-with-nodata-example li';
    noDataCompactList = 'fdp-list-with-nodata-example fdp-list:nth-of-type(2) ul';
    // no separator examples
    noSepList = 'fdp-list-with-no-seperator-example fdp-list';
    noSepListItems = 'fdp-list-with-no-seperator-example li';
    // unread data examples
    unreadListAttr = 'fdp-list-with-unread-example fdp-standard-list-item';
    unreadListItems = 'fdp-list-with-unread-example li';
    unreadListItemText = 'fdp-list-with-unread-example li span';

    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.noBorderList);
    }
}
