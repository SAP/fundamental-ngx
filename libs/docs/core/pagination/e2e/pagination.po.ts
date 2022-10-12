import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class PaginationPo extends CoreBaseComponentPo {
    private url = '/pagination';

    basicPaginationExample = 'fd-pagination-example ';
    showingItemsPaginationExample = 'fd-pagination-showing-example ';
    perPagePaginationExample = 'fd-pagination-per-page-example ';
    mobilePaginationExample = 'fd-pagination-mobile-example ';
    playgroundExample = '.fd-playground ';

    standardButton = '.fd-button--standard';
    pages = '.fd-pagination__link';
    linkNext = '[glyph="navigation-right-arrow"]';
    linkPrevious = '[glyph="navigation-left-arrow"]';
    basicPaginationText = '.fd-button--standard~div.ng-star-inserted';
    showingItemsPaginationText = '.fd-pagination__total';
    input = 'input';
    dropdownButton = '.fd-select__button';
    dropdownPopover = '.fd-popover-custom-select-body';
    dropdownPopoverOption = '.fd-list__item';
    selectControl = '.fd-select__control';
    segmentButton = 'fd-segmented-button button';
    mobileButton = '.fd-pagination__button--mobile';
    playgroundInputFields = '.form-control';
    playground = '.fd-playground__content ';
    playgroundPages = '.fd-playground__content .fd-pagination__link';
    playgroundLabel = '.fd-playground__schema .fd-form-label';

    itemsPerPageProperty = '[arialabel="Pagination with itemsPerPage property"] ';
    itemsPerPageTemplate = '[arialabel="Pagination with itemsPerPageOptions property"] ';
    itemsPerPageList = '[arialabel="Pagination with custom items"] ';

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'pagination'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'pagination'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }
}
