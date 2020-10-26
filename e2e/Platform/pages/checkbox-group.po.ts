import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';

export class CheckboxGroupPO extends BaseComponentPo {
    url = '/checkbox-group';

    stringValueCheckboxesArr = $$('fdp-platform-checkbox-group-list input');
    stringValueCheckboxLabelArr = $$('fdp-platform-checkbox-group-list fd-checkbox label');
    stringValuecheckboxGroupLabelsArr = $$('fdp-platform-checkbox-group-list label span');
    stringValuecheckboxGroupsArr = $$('fdp-platform-checkbox-group-list fd-form-group');
    stringValueoutputLabelsArr = $$('fdp-platform-checkbox-group-list > span');
    winterCheckbox = $('fdp-checkbox[ng-reflect-checkbox-value=Winter] label');

    objectValueCheckboxesArr = $$('fdp-platform-checkbox-group-list-object input');
    objectValueCheckboxLabelArr = $$('fdp-platform-checkbox-group-list-object fd-checkbox label');
    objectValuecheckboxGroupLabelsArr = $$('fdp-platform-checkbox-group-list-object label span');
    objectValuecheckboxGroupsArr = $$('fdp-platform-checkbox-group-list-object fd-form-group');

    projectedValueCheckboxesArr = $$('fdp-platform-checkbox-group-content-checkbox input');
    projectedValueCheckboxLabelArr = $$('fdp-platform-checkbox-group-content-checkbox fd-checkbox label');
    projectedValuecheckboxGroupLabelsArr = $$('fdp-platform-checkbox-group-content-checkbox label span');
    projectedValuecheckboxGroupsArr = $$('fdp-platform-checkbox-group-content-checkbox fd-form-group');

    formValidationCheckboxesArr = $$('fdp-platform-checkbox-group-examples input');
    formValidationCheckboxLabelArr = $$('fdp-platform-checkbox-group-examples fd-checkbox label');
    formValidationcheckboxGroupLabelsArr = $$('fdp-platform-checkbox-group-examples label span');
    formValidationcheckboxGroupsArr = $$('fdp-platform-checkbox-group-examples fd-form-group');
    errorTooltip = $('span.fd-form-message span');
    sectiontitle = $('fdp-platform-checkbox-group-examples h3');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');

    async open(): Promise<void> {
        await super.open(this.url)
    }
}
