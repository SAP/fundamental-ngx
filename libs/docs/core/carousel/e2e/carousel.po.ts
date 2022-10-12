// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

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
    hiddenPageIndicator = 'fd-carousel-no-page-indicator-example fd-carousel ol li';
    hiddenNavBtns = 'fd-carousel-hidden-navigation-example ' + this.navBtns;
    numberedPagination = 'fd-carousel .fd-carousel__text';
    errorMsg = '.fd-carousel__content .fd-message-page__title';
    busyIndicator = 'fd-carousel-loading-content-example .fd-busy-indicator';
    disableLoadingBtn = 'fd-carousel-loading-content-example .fd-button--standard';
    contentNavBtns = 'fd-carousel-content-navigation-example ' + this.navBtns;

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
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
