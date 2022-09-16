import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InputPo extends PlatformBaseComponentPo {
    readonly url = '/input';
    readonly root = '#page-content';

    defaultInput = '#input1';
    textInput = '#input2';
    numberInput = '#input3';
    compactInput = '#input4';
    readonlyInput = '#input5';
    disabledInput = '#input6';
    passwordInput = '#input8';
    // TODO: same Id create accessibility issue
    inlineHelpInput = '#input7';
    messagesComponentsInput = '#input9';
    submitBtn = 'button[type="submit"]';
    errorTextAttr = 'fd-form-message span';
    requiredInputLabel = 'fdp-platform-input-reactive-validation-example .fd-form-label--required';
    questionMarkSpan = '.sap-icon--hint';
    inputsLabels = '.fd-container label .fd-form-label';
    inputsArray = 'input.fd-input';
    autocompleteInput = 'input#form-input-10';
    autocompleteInputLabel = 'fdp-platform-input-auto-complete-validation-example label';
    autocompleteOptions = '.fd-popover__popper li';
    errorMessage = '.fd-form-message--error span';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
