import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SegmentedButtonPo extends CoreBaseComponentPo {
    url = '/segmented-button';

    defaultExample = 'fd-segmented-button-default-example ';
    toggleExample = 'fd-segmented-button-toggle-example ';
    complexExample = 'fd-segmented-button-complex-example ';
    formExample = 'fd-segmented-button-form-example ';

    firstDefaulSegment = this.defaultExample + '.fd-segmented-button:nth-child(2) ';
    secondDefaulSegment = this.defaultExample + '.fd-segmented-button:nth-child(4) ';
    firstFormSegment = this.formExample + 'form div:nth-child(1) fd-segmented-button ';
    firstFormButtonsSection = 'div:nth-child(1) ';
    secondFormButtonsSection = 'div:nth-child(2) ';
    button = '.fd-button';

    toggled = 'fd-button--toggled';
    chosenValue = 'small';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'segmented-button'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'segmented-button'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
