import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class CheckboxGroupPO extends PlatformBaseComponentPo {
    url = '/checkbox-group';

    stringValueCheckboxesArr = 'fdp-platform-checkbox-group-list input';
    stringValueCheckboxLabelArr = 'fdp-platform-checkbox-group-list fd-checkbox label';
    stringValuecheckboxGroupLabelsArr = 'fdp-platform-checkbox-group-list .fd-form-label';
    stringValuecheckboxGroupsArr = 'fdp-platform-checkbox-group-list fd-form-group';
    stringValueoutputLabelsArr = 'fdp-platform-checkbox-group-list > span';
    winterCheckbox = '.fd-checkbox__label[for=seasons0]';

    objectValueCheckboxesArr = 'fdp-platform-checkbox-group-list-object input';
    objectValueCheckboxLabelArr = 'fdp-platform-checkbox-group-list-object fd-checkbox label';
    objectValuecheckboxGroupLabelsArr = 'fdp-platform-checkbox-group-list-object .fd-form-label';
    objectValuecheckboxGroupsArr = 'fdp-platform-checkbox-group-list-object fd-form-group';
    objectValueoutputLabelsArr = 'fdp-platform-checkbox-group-list-object > span';

    projectedValueCheckboxesArr = 'fdp-platform-checkbox-group-content-checkbox input';
    projectedValueCheckboxLabelArr = 'fdp-platform-checkbox-group-content-checkbox fd-checkbox label';
    projectedValuecheckboxGroupLabelsArr = 'fdp-platform-checkbox-group-content-checkbox .fd-form-label';
    projectedValuecheckboxGroupsArr = 'fdp-platform-checkbox-group-content-checkbox fd-form-group';
    projectValueoutputLabelsArr = 'fdp-platform-checkbox-group-content-checkbox > span';

    formValidationCheckboxesArr = 'fdp-platform-checkbox-group-examples input';
    formValidationCheckboxLabelArr = 'fdp-platform-checkbox-group-examples fd-checkbox label';
    formValidationcheckboxGroupLabelsArr = 'fdp-platform-checkbox-group-examples .fd-form-label';
    formValidationcheckboxGroupsArr = 'fdp-platform-checkbox-group-examples fd-form-group';
    formvalidationValueoutputLabelsArr = 'fdp-platform-checkbox-group-examples > span';
    errorTooltip = '.fd-form-message span';
    sectiontitle = 'fdp-platform-checkbox-group-examples h3';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'checkbox-group'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'checkbox-group'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
