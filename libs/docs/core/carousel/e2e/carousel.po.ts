import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class CarouselPo extends CoreBaseComponentPo {
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
    hiddenPageIndicator = 'fd-carousel-no-page-indicator-example fd-carousel ol li';
    hiddenNavBtns = 'fd-carousel-hidden-navigation-example ' + this.navBtns;
    numberedPagination = 'fd-carousel .fd-carousel__text';
    errorMsg = '.fd-carousel__content .fd-message-page__title';
    busyIndicator = 'fd-carousel-loading-content-example .fd-busy-indicator';
    disableLoadingBtn = 'fd-carousel-loading-content-example .fd-button--standard';
    contentNavBtns = 'fd-carousel-content-navigation-example ' + this.navBtns;

    private url = '/carousel';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'card'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'card'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
