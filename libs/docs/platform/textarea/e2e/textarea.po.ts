import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class TextareaPo extends PlatformBaseComponentPo {
    url = '/textarea';

    textareaBasicExample = 'fdp-platform-textarea-basic-example ';
    textareaAutogrowExample = 'fdp-platform-textarea-autogrow-example ';
    textareaCounterExample = 'fdp-platform-textarea-counter-example ';
    textareaCounterTemplateExample = 'fdp-platform-textarea-counter-template-example ';

    basicTextArea = '#basicTextarea';
    basicTextAreaLabel = '#fdp-form-label-basicTextarea';
    basicTextAreaPopoverIcon = '#fdp-form-label-basicTextarea fd-popover-control span';
    basicTextAreaPopoverBody = 'fd-popover-body';

    readOnlyTextAreaLabel = '#fdp-form-label-readonlyDescription > span';

    disabledTextArea = '#disabledDescription';
    disabledTextAreaLabel = '#fdp-form-label-disabledDescription > span';

    growingDisabledTextarea = '#growingDisabledTextarea';
    growingMaxLinesTextarea = '#growingMaxLinesTextarea';
    growingHeightTextarea = '#growingHeightTextarea';
    withGrowingAndNoLimitsTextarea = '#growingOptionsDisabledTextarea';
    withCharactersMaxNumberTextarea = '#noCounterMessageInteraction';

    compactTextArea = '#compactTextarea';
    compactTextAreaLabel = '#fdp-form-label-compactTextarea > span';

    detailedTextAreaLabel = '#fdp-form-label-detailedDescription > span';
    detailedTextArea = '#detailedDescription';
    detailedTextAreaErrorMessage = '[type="error"]';
    detailedTextAreaCharacterCounter = `fdp-platform-textarea-counter-example fd-popover span`;
    noPlatformsFormTextAreaLabel = '[for="textarea-1"]';
    textarea = 'textarea:not(#readonlyDescription, #disabledDescription)';
    message = '.fd-form-message';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'textarea'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'textarea'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
