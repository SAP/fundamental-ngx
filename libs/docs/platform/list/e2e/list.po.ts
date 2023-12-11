import { PlatformBaseComponentPo, waitForElDisplayed } from '../../../../../e2e';

export class ListPo extends PlatformBaseComponentPo {
    private url = '/list';

    // borderless examples
    noBorderListItems = 'fdp-platform-list-border-less-example .fd-list__item';
    noBorderCompactList = 'fdp-platform-list-border-less-example #compact-list';
    // footer examples
    footerListItems = 'fdp-platform-list-with-footer-example fdp-standard-list-item .fd-list__item';
    footerCompactList = 'fdp-platform-list-with-footer-example fdp-list[fdCompact]';
    footer = 'fdp-platform-list-with-footer-example fdp-list-footer .fd-list__item';
    // group header examples
    groupHeaderListItems = 'fdp-platform-list-with-group-header-example fdp-list-item .fd-list__item';
    groupHeader = 'fdp-platform-list-with-group-header-example fdp-list-group-header .fd-list__item';
    groupCompactList = 'fdp-platform-list-with-group-header-example fdp-list[fdCompact]';
    // interactive examples
    interactiveListItems = 'fdp-platform-list-with-group-header fdp-standard-list-item .fd-list__item';
    // counter examples
    counterListItems = 'fdp-platform-list-with-item-counter-example .fd-list__item';
    counterCompactList = 'fdp-platform-list-with-item-counter-example fdp-list[fdCompact]';
    counterTitleItems = 'fdp-platform-list-with-item-counter-example .fd-list__item span:first-of-type';
    counterCounterItem = 'fdp-platform-list-with-item-counter-example .fd-list__item span:nth-of-type(2)';
    // deletion examples
    deletionListItems = 'fdp-platform-list-with-delete-button-example .fd-list__item';
    deletionBtn = 'fdp-platform-list-with-delete-button-example button';
    deletionIcon = 'fdp-platform-list-with-delete-button-example fd-icon';
    // multi selection examples
    multiList = 'fdp-platform-list-with-selection-example fdp-list';
    multiListItems = 'fdp-platform-list-with-selection-example .fd-list__item';
    multiToolbar = 'fdp-platform-list-with-selection-example fd-toolbar';
    multiCheckbox = 'fdp-platform-list-with-selection-example fd-checkbox';
    multiCheckBoxMark = 'fdp-platform-list-with-selection-example fdp-standard-list-item .fd-list__item';
    // single selection examples
    singleList = 'fdp-platform-list-with-single-selection-example fdp-list .fd-list';
    singleListItems = 'fdp-platform-list-with-single-selection-example .fd-list__item';
    singleToolbar = 'fdp-platform-list-with-single-selection-example fd-toolbar';
    singleRadioBtn = 'fdp-platform-list-with-single-selection-example fd-radio-button';
    singleRadioBtnInput = 'fdp-platform-list-with-single-selection-example input';
    // navigation indicator examples
    navList = 'fdp-platform-list-with-navigation-example fdp-list';
    navListItems = 'fdp-platform-list-with-navigation-example .fd-list__item';
    navListLink = 'fdp-platform-list-with-navigation-example a';
    // virtual scroll examples:
    vScrollListItems = 'fdp-platform-list-with-infinite-scroll-example fdp-standard-list-item .fd-list__item';
    vScrollLoadIcon = 'fd-busy-indicator .fd-busy-indicator';
    busyIndicator = '.fd-busy-indicator';
    // load on btn click examples
    loadList = 'fdp-platform-list-with-more-button-example fdp-list';
    loadListItems = 'fdp-platform-list-with-more-button-example .fd-list__item';
    loadShowMoreBtn = 'fdp-platform-list-with-more-button-example button';
    loadIcon = 'fd-busy-indicator .fd-busy-indicator';
    // button examples
    btnList = 'fdp-platform-list-with-buttons-example fdp-list';
    btnListItems = 'fdp-platform-list-with-buttons-example .fd-list__item';
    btnDeleteBtn = 'fdp-platform-list-with-buttons-example button[id^=delete]';
    btnEditBtn = 'fdp-platform-list-with-buttons-example button[id^=detail]';
    // no data examples
    noDataListItems = 'fdp-platform-list-with-nodata-example .fd-list__item';
    noDataCompactList = 'fdp-platform-list-with-nodata-example fdp-list:nth-of-type(2) .fd-list';
    // unread data examples
    unreadListItems = 'fdp-platform-list-with-unread-example .fd-list__item';
    unreadListItemText = 'fdp-platform-list-with-unread-example .fd-list__item span';
    cozyItem = 'fdp-platform-list-border-less-example fdp-list#cozy-list .fd-list__item';
    compactItem = 'fdp-platform-list-border-less-example fdp-list#compact-list .fd-list__item';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'list'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'list'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
