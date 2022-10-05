import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SearchFieldPo extends PlatformBaseComponentPo {
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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'search'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'search'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
