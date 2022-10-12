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

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'textarea'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'textarea'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
