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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'segmented-button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'segmented-button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
