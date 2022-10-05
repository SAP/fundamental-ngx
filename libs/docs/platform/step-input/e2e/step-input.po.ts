import {
    clearValue,
    PlatformBaseComponentPo,
    sendKeys,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

export class StepInputPo extends PlatformBaseComponentPo {
    private url = '/step-input';
    root = '#page-content';

    stepInputRoot = '.fd-step-input';
    activeButtonIncrement =
        '//button[@title="Increment" and @aria-disabled="false" and not(ancestor::div[contains(@class, "is-readonly")])]';
    activeButtonDecrement =
        '//button[@title="Decrement" and @aria-disabled="false" and not(ancestor::div[contains(@class, "is-readonly")])]';
    allInput =
        '//input[contains(@class, "fd-step-input__input")and not (ancestor::div[contains(@class, "is-readonly")])]';
    allButtonIncrement = '//button[@title="Increment" and not(ancestor::div[contains(@class, "is-readonly")])]';
    allButtonDecrement = '//button[@title="Decrement" and not(ancestor::div[contains(@class, "is-readonly")])]';
    activeInput =
        // eslint-disable-next-line max-len
        '//input[contains(@class, "fd-step-input__input") and not(ancestor::div[contains(@class, "is-disabled")]) and not (ancestor::div[contains(@class, "is-readonly")])]';
    reactiveFormInput = 'input#reactive-form-qty';
    formInput = 'input[name=qty]';
    errorMessage = '.is-error';
    minMaxButtonDecrement = '.fd-step-input__button[title="Decrement"][aria-controls="minMaxLimits"]';
    minMaxButtonIncrement = '.fd-step-input__button[title="Increment"][aria-controls="minMaxLimits"]';
    inputWithoutForm =
        '//input[contains(@class, "fd-step-input__input") and not (ancestor::div[contains(@class, "is-disabled")]) and not (@name="qty")]';
    quantityText = '.fd-page__content + pre';
    formStatusText = '.fd-page__content + pre ~ pre';

    async fillInput(input: string, value: string): Promise<void> {
        await clearValue(input);
        await setValue(input, value);
        await sendKeys(['Enter']);
    }

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'step-input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'step-input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
