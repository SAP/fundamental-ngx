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
    autocompleteOptions = '.fd-popover__body li';
    errorMessage = '.fd-form-message--error span';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
