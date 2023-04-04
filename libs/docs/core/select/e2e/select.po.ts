import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class SelectPo extends CoreBaseComponentPo {
    url = '/select';

    selectModesExample = 'fd-select-mode-example';
    displayedText = ' .fd-select__text-content';
    buttons = ' button';
    option = ' [role="option"]';
    overlayContainer = '.cdk-overlay-container';
    selectSemanticStatesExample = 'fd-select-semantic-state-example';
    customControlExample = 'fd-select-custom-trigger';
    extendedOptionsExample = 'fd-select-nested-options';
    mobileModeExample = 'fd-select-mobile-example';
    maxHeightExample = 'fd-select-max-height-example';
    addRemoveOptionExample = 'fd-select-adding-example';
    programmaticControlExample = 'fd-select-programmatic-example';
    selectControl = ' .fd-select__control';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'select'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'select'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
