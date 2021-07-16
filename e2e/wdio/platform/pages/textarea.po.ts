import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class TextareaPo extends BaseComponentPo {
    url = '/textarea';
    root = '#page-content';

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
    detailedTextAreaCharacterCounter = `//div[label[@id='fdp-form-label-detailedDescription']]//div[@role="alert"]//span`;
    noPlatformsFormTextAreaLabel = '[for="textarea-1"]';

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
    }

    getScreenshotFolder(): object {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'textarea'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'textarea'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
