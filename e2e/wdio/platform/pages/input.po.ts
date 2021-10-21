import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class InputPo extends BaseComponentPo {
    readonly url = '/input';
    readonly root = '#page-content';

    defaultInput = '#input1';
    textInput = '#input2';
    numberInput = '#input3';
    compactInput = '#input4';
    readonlyInput = '#input5';
    disabledInput = '#input6';
    disabledInputAttribute = 'fdp-input[name="input6"]';
    passwordInput = '#input8';
    // TODO: same Id create accessibility issue
    inlineHelpInput = '#input7';
    messagesComponentsInput = '#input9';
    submitBtn = 'button[type="submit"]';
    errorTextAttr = 'fd-form-message span';
    requiredInputLabel = 'fdp-platform-input-reactive-validation-example .fd-form-label--required';
    questionMarkSpan = '.sap-icon--question-mark';
    inputsLabels = '.fd-container label span.ng-star-inserted';
    inputsArray = 'input.fd-input';
    autocompleteInput = 'input#form-input-10';
    autocompleteInputLabel = 'fdp-platform-input-auto-complete-validation-example label';
    autocompleteOptions = '.fd-popover__popper li';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.defaultInput);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'input'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'input'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
