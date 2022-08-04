import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class TextareaPo extends BaseComponentPo {
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
