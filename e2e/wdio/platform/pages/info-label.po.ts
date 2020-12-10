import { BaseComponentPo } from './base-component.po';

export class InfoLabelPO extends BaseComponentPo {
    url = '/info-label';

    defaultLabel = 'fdp-platform-info-label-example span';
    labelsWithTextArr = 'fdp-platform-info-label-text-example fd-info-label';
    labelsWithTextAndIconArr = 'fdp-platform-info-label-text-icon-example fd-info-label';
    labelsIconArr = 'fdp-platform-info-label-text-icon-example span i';
    labelsWithNumberOrIconArr = 'fdp-platform-info-label-numeric-icon-example fd-info-label';
    accessibilityLabelsArr = 'fdp-platform-info-label-aria-label-example span';
    accessibilityAttrArr = 'fdp-platform-info-label-aria-label-example fd-info-label';

     open(): void {
         super.open(this.url)
    exampleAreaContainersArr = '.fd-doc-component';
    rtlSwitcherArr = 'rtl-switch .fd-switch__handle';

    open(): void {
        super.open(this.url);
    }
}
