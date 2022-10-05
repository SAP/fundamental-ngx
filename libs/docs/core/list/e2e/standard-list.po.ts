import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class StandardListPo extends CoreBaseComponentPo {
    url = '/list';

    // example selectors
    simpleList = 'fd-list-example ';
    navigationList = 'fd-list-navigation-example ';
    navigationIndicatorList = 'fd-list-nav-indicator-example ';
    actionList = 'fd-list-action-example ';
    filterAndSortList = 'fd-list-data-example ';
    secondaryItemList = 'fd-list-secondary-example ';
    iconList = 'fd-list-icon-example ';
    borderlessList = 'fd-list-borderless-example ';
    interactiveList = 'fd-list-interactive-example ';
    complexList = 'fd-list-complex-example ';
    selectionList = 'fd-list-selection-example ';
    cozyMultiSelectList = this.selectionList + 'ul:first-of-type ';
    compactMultiSelectList = this.selectionList + 'ul:nth-of-type(2) ';
    cozySingleSelectList = this.selectionList + 'ul:nth-of-type(3) ';
    compactSingleSelectList = this.selectionList + 'ul:nth-of-type(4) ';
    keyboardSupportList = 'fd-list-keyboard-example ';
    dragAndDropList = 'fd-list-dnd-example ';
    infiniteList = 'fd-list-infinite-scroll-example ';

    // common selectors
    listItems = '.fd-list__item';
    button = 'button';
    busyIndicator = '.fd-busy-indicator';
    searchBar = 'fd-input-group input';
    selectedItems = 'li[class~="is-selected"]';
    checkbox = 'fd-checkbox';
    radioBtn = 'fd-radio-button';
    checkboxFocusElement = this.checkbox + ' input';
    radioBtnFocusElement = this.radioBtn + ' input';
    deleteButton = 'button[glyph="delete"]';
    listItemText = '.fd-list__title';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'standard-list'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'standard-list'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
