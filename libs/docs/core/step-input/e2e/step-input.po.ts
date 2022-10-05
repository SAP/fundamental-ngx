import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class StepInputPo extends CoreBaseComponentPo {
    private url = '/step-input';

    defaultExample = 'fd-step-input-default-example ';
    configExample = 'fd-step-input-configuration-example ';
    localExample = 'fd-step-input-locale-example ';
    stateExample = 'fd-step-input-state-example ';
    labelExample = 'fd-step-input-label-example ';
    currencyExample = 'fd-step-input-currency-example ';
    formExample = 'fd-step-input-form-example ';

    step = '.fd-step-input ';
    input = '.fd-input';
    button = '.fd-button';
    minusButton = this.button + ':nth-child(1)';
    plusButton = this.button + ':nth-child(3)';
    text = 'small';

    textForDisabledExample = this.formExample + 'div > div:nth-child(1) > table > tr:nth-child(1) > td:nth-child(2)';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'step-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'step-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
