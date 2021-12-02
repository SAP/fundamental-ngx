import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

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

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'standard-list'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'standard-list'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
