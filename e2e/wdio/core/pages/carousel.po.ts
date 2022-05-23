import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class CarouselPo extends CoreBaseComponentPo {
    private url = '/carousel';
    root = '#page-content';

    sectionTitle = 'fd-docs-section-title h2';
    carouselProperties = 'div fd-carousel';
    displayedContent = 'fd-carousel [style*=visible]';
    displayedImg = this.displayedContent + ' img';
    navBtns = 'fd-carousel button';
    pageIndicators = 'fd-carousel .fd-carousel__page-indicator';
    displayedCards = this.displayedContent + ' .fd-card__title-area';
    multiDisplayedCards = 'fd-carousel-multiple-active-item-example ' + this.displayedContent;
    hideCardBtns = 'fd-segmented-button button';
    hiddenPageIndicator = 'fd-carousel-no-page-indicator-example fd-carousel ol';
    hiddenNavBtns = 'fd-carousel-hidden-navigation-example ' + this.navBtns;
    numberedPagination = 'fd-carousel .fd-carousel__text';
    errorMsg = '.fd-carousel__content .fd-message-page__title';
    busyIndicator = 'fd-carousel-loading-content-example .fd-busy-indicator';
    disableLoadingBtn = 'fd-carousel-loading-content-example .fd-button--standard';
    contentNavBtns = 'fd-carousel-content-navigation-example ' + this.navBtns;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'card'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'card'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
