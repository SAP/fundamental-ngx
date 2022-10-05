import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FacetsPo extends CoreBaseComponentPo {
    url = '/facets';
    root = '#page-content';

    linkFacestExample = 'fd-form-link-facet-example ';
    raitingIndicatorExample = 'fd-rating-indicator-facet-example ';
    groupExample = 'fd-facet-group-example ';
    link = '.fd-link';
    raitingIndicator = '.fd-rating-indicator__label';
    chosenRaitingStars = '.fd-rating-indicator__dynamic-text';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'facest'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'facest'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
