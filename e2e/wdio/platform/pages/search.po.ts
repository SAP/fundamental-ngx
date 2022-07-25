import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class SearchPo extends BaseComponentPo {
    url = '/search-field';
    root = '#page-content';

    searchFields = '[type="search"]';
    searchIcons = '[title="Search"]';
    clearSearchIcon = '.fdp-search-field__clear';
    searchCategoryBtn = '.fdp-search-field__category-button';
    autosuggestionItems = 'ul.fd-menu__list';
    cozySearchResult = 'fdp-platform-search-field-basic-example .result-block:nth-child(3) span';
    compactSearchResult = 'fdp-platform-search-field-basic-example .result-block:nth-child(6) span';
    cozyWithCategoriesSearch = 'fdp-platform-search-field-categories-example .result-block:nth-child(3) span';
    compactWithCategoriesSearch = 'fdp-platform-search-field-categories-example .result-block:nth-child(3) span';
    cozyWithDataSourceSearch = 'fdp-platform-search-field-data-source-example .result-block:nth-child(3) span';
    mobileExampleSearch = 'fdp-platform-search-field-mobile-example .result-field span';
    okButton = '.fd-dialog__decisive-button';
    categoryOption = '.fd-menu__link';
    synchronizeButton = '.fdp-search-field__loading';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'search'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'search'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
