import { CoreBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TextareaPo extends CoreBaseComponentPo {
    private url = '/textarea';

    defaultExample = 'fd-textarea-example ';
    inlineHelpExample = 'fd-textarea-inline-help-example ';
    stateExample = 'fd-textarea-state-example ';
    formExample = 'fd-textarea-form-group-example ';

    textarea = '.fd-textarea';
    label = '.fd-form-label';
    compactTextarea = '.fd-textarea--compact';
    basicTextArea = '.fd-textarea:not(.fd-textarea--compact)';

    helpIcon = '.sap-icon--question-mark';
    helpContent = '.fd-inline-help__content';
    formMessage = '.fd-popover__popper fd-form-message';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'textarea'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'textarea'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
