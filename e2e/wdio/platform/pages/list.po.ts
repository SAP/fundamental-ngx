import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class ListPo extends BaseComponentPo {
    private url = '/list';
    root = '#page-content';

    // borderless examples
    noBorderListItems = 'fdp-platform-list-border-less-example li';
    noBorderCompactList = 'fdp-platform-list-border-less-example fdp-list:nth-of-type(2)';
    noBorderList = 'fdp-platform-list-border-less-example fdp-list';
    // footer examples
    footerListItems = 'fdp-platform-list-with-footer-example fdp-standard-list-item li';
    footerCompactList = 'fdp-platform-list-with-footer-example fdp-list:nth-of-type(2)';
    footer = 'fdp-platform-list-with-footer-example fdp-list-footer li';
    // group header examples
    groupHeaderListItems = 'fdp-platform-list-with-group-header-example fdp-list-item li';
    groupHeader = 'fdp-platform-list-with-group-header-example fdp-list-group-header li';
    groupCompactList = 'fdp-platform-list-with-group-header-example fdp-list:nth-of-type(2)';
    // interactive examples
    interactiveListItems = 'fdp-platform-list-with-group-header fdp-standard-list-item li';
    // counter examples
    counterListItems = 'fdp-platform-list-with-item-counter-example li';
    counterCompactList = 'fdp-platform-list-with-item-counter-example fdp-list:nth-of-type(2)';
    counterTitleItems = 'fdp-platform-list-with-item-counter-example li span:first-of-type';
    counterCounterItem = 'fdp-platform-list-with-item-counter-example li span:nth-of-type(2)';
    // deletion examples
    deletionListItems = 'fdp-platform-list-with-delete-button-example li';
    deletionBtn = 'fdp-platform-list-with-delete-button-example button';
    deletionIcon = 'fdp-platform-list-with-delete-button-example fd-icon';
    // multi selection examples
    multiList = 'fdp-platform-list-with-selection-example fdp-list';
    multiListItems = 'fdp-platform-list-with-selection-example li';
    multiToolbar = 'fdp-platform-list-with-selection-example fd-toolbar';
    multiCheckbox = 'fdp-platform-list-with-selection-example fd-checkbox';
    // single selection examples
    singleList = 'fdp-platform-list-with-single-selection-example fdp-list';
    singleListItems = 'fdp-platform-list-with-single-selection-example li';
    singleToolbar = 'fdp-platform-list-with-single-selection-example fd-toolbar';
    singleRadioBtn = 'fdp-platform-list-with-single-selection-example fd-radio-button';
    // navigation indicator examples
    navList = 'fdp-platform-list-with-navigation-example fdp-list';
    navListItems = 'fdp-platform-list-with-navigation-example li';
    navListLink = 'fdp-platform-list-with-navigation-example a';
    // virtual scroll examples:
    vScrollList = 'fdp-platform-list-with-infinite-scroll-example fdp-list';
    vScrollListItems = 'fdp-platform-list-with-infinite-scroll-example fdp-standard-list-item li';
    vScrollLoadIcon = 'fd-busy-indicator .fd-busy-indicator--circle-0';
    // load on btn click examples
    loadList = 'fdp-platform-list-with-more-button-example fdp-list';
    loadListItems = 'fdp-platform-list-with-more-button-example li';
    loadShowMoreBtn = 'fdp-platform-list-with-more-button-example button';
    loadIcon = 'fd-busy-indicator .fd-busy-indicator';
    // button examples
    btnList = 'fdp-platform-list-with-buttons-example fdp-list';
    btnListItems = 'fdp-platform-list-with-buttons-example li';
    btnDeleteBtn = 'fdp-platform-list-with-buttons-example button[id^=delete]';
    btnEditBtn = 'fdp-platform-list-with-buttons-example button[id^=detail]';
    // no data examples
    noDataListItems = 'fdp-platform-list-with-nodata-example li';
    noDataCompactList = 'fdp-platform-list-with-nodata-example fdp-list:nth-of-type(2) ul';
    // no separator examples
    noSepList = 'fdp-platform-list-with-no-seperator-example fdp-list';
    noSepListItems = 'fdp-platform-list-with-no-seperator-example li';
    // unread data examples
    unreadListAttr = 'fdp-platform-list-with-unread-example fdp-standard-list-item';
    unreadListItems = 'fdp-platform-list-with-unread-example li';
    unreadListItemText = 'fdp-platform-list-with-unread-example li span';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.noBorderList);
    }
}
