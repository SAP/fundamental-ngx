import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class PaginationPo extends CoreBaseComponentPo {
    private url = '/pagination';

    standardButton = 'fd-pagination-example .fd-button--standard';
    basicPaginationPages = 'fd-pagination-example .fd-pagination__link.ng-star-inserted';
    basicPaginationDiv = '.fd-button--standard~div.ng-star-inserted';
    linkNext = '[glyph="navigation-right-arrow"]';
    linkPrevious = '[glyph="navigation-left-arrow"]';
    itemPaginationPages = '#background-ex1 .fd-pagination__link.ng-star-inserted';
    totalPagination = '.fd-pagination__total';
    dropdownButton = '.fd-select__button';
    dropDownOption = 'fd-option.fd-list__item';
    toggledButton = 'fd-segmented-button button';
    selectPaginationPages = '#background-ex2 .fd-pagination__link.ng-star-inserted';
    playgroundInputFields = '.form-control';
    playground = '.fd-playground__content ';
    playgroundPages = '.fd-playground__content .fd-pagination__link.ng-star-inserted';
    playgroundLabel = '.fd-playground__schema .fd-form-label';
    playgroundExamples = '.fd-playground__content .fd-pagination';
    page = '.fd-pagination-direction-override-display .fd-pagination__link';

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'pagination'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'pagination'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.standardButton);
    }
}
