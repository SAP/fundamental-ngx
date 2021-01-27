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
    // TODO: same Id create accessibility issue
    inlineHelpInput = '#input6';
    messagesComponentsInput = '#input9';
    submitBtn = 'button[type="submit"]';
    errorText = 'fd-form-message span';
    requiredInputLabel = 'fdp-platform-input-reactive-validation-example .fd-form-label--required';
    questionMarkSpan = 'span[role="alert"]';
    inputsLabels = '.fd-container label span.ng-star-inserted';
    inputsArray = 'input.fd-input';
    autocompleteInput = 'input#form-input-7';
    autocompleteInputLabel = 'fdp-platform-input-auto-complete-validation-example label';
    autocompleteOptions = '.fd-popover__popper li';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForPresent(this.defaultInput);
    }
}
