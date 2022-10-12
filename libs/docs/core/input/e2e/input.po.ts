import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class InputPo extends CoreBaseComponentPo {
    readonly url = '/input';

    defaultInput = '#input-1';
    requiredInput = '#input-2';
    passwordInput = '#input-3';
    compactInput = '#input-4';

    inlineHelpRightInput = '#input-41';
    inlineHelpLeftInput = '#input-42';

    validInput = '#input-52';
    validInputLabel = '[for="input-52"]';
    invalidInput = '#input-53';
    invalidInputLabel = '[for="input-53"]';
    warningInput = '#input-54';
    warningInputLabel = '[for="input-54"]';
    informationInput = '#input-55';
    informationInputLabel = '[for="input-55"]';
    disabledInput = '#input-56';
    readonlyInput = '#input-57';

    reactiveDefaultInput = '#form-input-1';
    reactiveDisabledInput = '#form-input-2';
    reactivePrimaryInput = '#form-input-3';
    reactivePrimaryInput2 = '[formcontrolname="primaryInput"]';
    reactiveSecondaryInput = '#form-input-4';

    formMessagePopover = 'fd-form-message';
    inlineHelpPopover = '.fd-popover__popper li';
    addBtn = '[type="button"][label="Add"]';

    requiredInputLabel = '.fd-form-label--required';
    inlineHelpLabels = '.fd-form-label__help';

    allInputFields = '.fd-doc-component input:not([disabled], [readonly])';
    questionMark = '.sap-icon--question-mark';
    popoverHelp = 'fd-popover-body .fd-popover__popper ';

    inputStateExample = 'fd-input-state-example ';
    input = 'input:not([disabled], [readonly])';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'input'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'input'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
