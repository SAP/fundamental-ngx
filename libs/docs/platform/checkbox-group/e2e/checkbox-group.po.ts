import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class CheckboxGroupPO extends PlatformBaseComponentPo {
    url = '/checkbox-group';

    stringValueCheckboxesArr = 'fdp-platform-checkbox-group-list input';
    stringValueCheckboxLabelArr = 'fdp-platform-checkbox-group-list fd-checkbox label';
    stringValueoutputLabelsArr = 'fdp-platform-checkbox-group-list > span';
    winterCheckbox = '.fd-checkbox__label[for=seasons0] span.fd-checkbox__checkmark';

    objectValueCheckboxesArr = 'fdp-platform-checkbox-group-list-object input';
    objectValueCheckboxLabelArr = 'fdp-platform-checkbox-group-list-object fd-checkbox label';
    objectValueoutputLabelsArr = 'fdp-platform-checkbox-group-list-object > span';

    projectedValueCheckboxesArr = 'fdp-platform-checkbox-group-content-checkbox input';
    projectedValueCheckboxLabelArr = 'fdp-platform-checkbox-group-content-checkbox fd-checkbox label';
    projectValueoutputLabelsArr = 'fdp-platform-checkbox-group-content-checkbox > span';

    formValidationCheckboxesArr = 'fdp-platform-checkbox-group-examples input';
    formValidationCheckboxLabelArr = 'fdp-platform-checkbox-group-examples fd-checkbox label';
    formvalidationValueoutputLabelsArr = 'fdp-platform-checkbox-group-examples > span';
    errorTooltip = '.fd-form-message span';

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
