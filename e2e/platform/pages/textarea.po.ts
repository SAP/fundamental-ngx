import { BaseComponentPo } from './base-component.po';
import { $, $$, by, element } from 'protractor';
import { waitForVisible } from '../helper/helper';

export class TextareaPo extends BaseComponentPo {
    url = '/textarea';
    root = $('#page-content');
    allTextAreas = $$('textarea');

    basicTextArea = $('#basicTextarea');
    basicTextAreaLabel = $('[for="basicTextarea"] > span');
    basicTextAreaPopoverIcon = $('[for="basicTextarea"] fd-popover-control span');
    basicTextAreaPopoverBody = $('[for="basicTextarea"] fd-popover-body');

    readOnlyTextArea = $('#readonlyDescription');
    readOnlyTextAreaLabel = $('[for="readonlyDescription"] > span');
    readOnlyTextAreaPopoverBody = $('[for="readonlyDescription"] fd-popover-body');

    disabledTextArea = $('#disabledDescription');
    disabledTextAreaLabel = $('[for="disabledDescription"] > span');
    disabledTextAreaPopoverBody = $('[for="disabledDescription"] fd-popover-body');

    growingDisabledTextarea = $('#growingDisabledTextarea');
    growingMaxLinesTextarea = $('#growingMaxLinesTextarea');
    growingHeightTextarea = $('#growingHeightTextarea');
    withGrowingAndNoLimitsTextarea = $('#growingOptionsDisabledTextarea');
    withCharactersMaxNumberTextarea = $('#noCounterMessageInteraction');

    compactTextArea = $('#compactTextarea');
    compactTextAreaLabel = $('[for="compactTextarea"] > span');
    compactTextAreaPopoverBody = $('[for="compactTextarea"] fd-popover-body');

    detailedTextAreaLabel = $('[for="detailedDescription"]');
    detailedTextArea = $('#detailedDescription');
    detailedTextAreaErrorMessage = $('[type="error"]');
    detailedTextAreaCharacterCounter = element(by.xpath('//div[label[@for="detailedDescription"]]//div[@role="alert"]//span'));

// //div[label[@for="detailedDescription"]]//fd-form-message/span
    noPlatformsFormTextAreaLabel = $('[for="textarea-1"]');

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForVisible(await this.root);
    }
}
