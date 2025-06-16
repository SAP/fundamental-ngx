import { CoreBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class TextareaPo extends CoreBaseComponentPo {
    defaultExample = 'fd-textarea-example ';
    inlineHelpExample = 'fd-textarea-inline-help-example ';
    stateExample = 'fd-textarea-state-example ';
    formExample = 'fd-textarea-form-group-example ';

    textarea = '.fd-textarea';
    label = '.fd-form-label';
    compactTextarea = '.fd-textarea.is-compact';
    basicTextArea = '.fd-textarea:not(.fd-textarea--compact)';

    helpIcon = '.sap-icon--question-mark';
    helpContent = '.fd-inline-help__content';
    formMessage = '.fd-popover__body fd-form-message';

    private url = '/textarea';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
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
