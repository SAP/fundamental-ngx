import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ButtonPo extends PlatformBaseComponentPo {
    private url = '/button';
    typeButtons = 'fdp-button-types-example button';
    sizeButtons = 'fdp-button-sizes-example button';
    iconButtons = 'fdp-button-icons-example button';
    stateButton = 'fdp-button-state-example button';
    disableStateButtons = 'fdp-button-state-example button.is-disabled';
    truncatedButton = 'fdp-button-truncate-example button';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'button'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'button'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
