import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class RatingIndicatorPo extends CoreBaseComponentPo {
    url = '/rating-indicator';
    root = '#page-content';

    starsRatingExamples = '[name="rating-0"]';
    starsRatingDisabledMode = '[name="rating-6"]';
    starsRatingDynamicChanges = '[name="rating-13"]';
    containerDynamicChanges = '.is-display-mode';
    inputsBasicExample = 'fd-rating-indicator-example input.ng-pristine';
    touchedInputsBasicExample = 'fd-rating-indicator-example input.ng-dirty';
    inputsDynamicChanges = 'fd-ri-dynamic-example input.ng-pristine';
    touchedInputsDynamicChanges = 'fd-ri-dynamic-example input.ng-dirty';
    sizeRatingIndicator = '[area-label="Total raiting"]';
    starsRatingDisplayMode = 'fd-ri-display-mode-example .fd-rating-indicator__label';
    textDisplayMode = 'fd-ri-display-mode-example .fd-rating-indicator__dynamic-text';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'rating-indicator'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'rating-indicator'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
