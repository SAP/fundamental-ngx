import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FacetsPo extends CoreBaseComponentPo {
    url = '/facets';
    root = '#page-content';

    linkFacestExample = 'fd-form-link-facet-example ';
    raitingIndicatorExample = 'fd-rating-indicator-facet-example ';
    groupExample = 'fd-facet-group-example ';
    link = '.fd-link';
    raitingIndicator = '.fd-rating-indicator__input';
    chosenRaitingStars = '.fd-rating-indicator__dynamic-text';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.title);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'facest'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'facest'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
