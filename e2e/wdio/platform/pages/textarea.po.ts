import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class TextareaPo extends BaseComponentPo {
    url = '/textarea';
    root = '#page-content';

    basicTextArea = '#basicTextarea';
    basicTextAreaLabel = '[for="basicTextarea"] > span';
    basicTextAreaPopoverIcon = '[for="basicTextarea"] fd-popover-control span';
    basicTextAreaPopoverBody = 'fd-popover-body';

    readOnlyTextAreaLabel = '[for="readonlyDescription"] > span';

    disabledTextArea = '#disabledDescription';
    disabledTextAreaLabel = '[for="disabledDescription"] > span';

    growingDisabledTextarea = '#growingDisabledTextarea';
    growingMaxLinesTextarea = '#growingMaxLinesTextarea';
    growingHeightTextarea = '#growingHeightTextarea';
    withGrowingAndNoLimitsTextarea = '#growingOptionsDisabledTextarea';
    withCharactersMaxNumberTextarea = '#noCounterMessageInteraction';

    compactTextArea = '#compactTextarea';
    compactTextAreaLabel = '[for="compactTextarea"] > span';

    detailedTextAreaLabel = '[for="detailedDescription"] > span';
    detailedTextArea = '#detailedDescription';
    detailedTextAreaErrorMessage = '[type="error"]';
    detailedTextAreaCharacterCounter = '//div[label[@for="detailedDescription"]]//div[@role="alert"]//span';

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
