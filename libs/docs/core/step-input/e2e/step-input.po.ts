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

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'step-input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'step-input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
