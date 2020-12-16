import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';

export class InfoLabelPO extends BaseComponentPo {
    url = '/info-label';

    defaultLabel = $('fdp-platform-info-label-example span');
    labelsWithTextArr = $$('fdp-platform-info-label-text-example fd-info-label');
    labelsWithTextAndIconArr = $$('fdp-platform-info-label-text-icon-example fd-info-label');
    labelsIconArr = $$('fdp-platform-info-label-text-icon-example span i');
    labelsWithNumberOrIconArr = $$('fdp-platform-info-label-numeric-icon-example fd-info-label');
    accessibilityLabelsArr = $$('fdp-platform-info-label-aria-label-example span');
    accessibilityAttrArr = $$('fdp-platform-info-label-aria-label-example fd-info-label');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');


    async open(): Promise<void> {
        await super.open(this.url)
    }
}
