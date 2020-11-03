import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';

export class InfoLabelPO extends BaseComponentPo {
    url = '/info-label';

    defaultLabel = $('fdp-platform-info-label-example span');
    labelsWithTextArr = $$('fdp-platform-info-label-text-example span');
    labelsWithTextAndIconArr = $$('fdp-platform-info-label-text-icon-example span');
    labelsIconArr = $$('fdp-platform-info-label-text-icon-example span i');
    labelsWithNumberOrIconArr = $$('fdp-platform-info-label-numeric-icon-example span');
    accessibilityLabelsArr = $$('fdp-platform-info-label-aria-label-example span');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');


    async open(): Promise<void> {
        await super.open(this.url)
    }
}
