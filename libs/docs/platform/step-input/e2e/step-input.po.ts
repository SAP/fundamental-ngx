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

    fillInput(input: string, value: string): void {
        clearValue(input);
        setValue(input, value);
        sendKeys(['Enter']);
    }

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
