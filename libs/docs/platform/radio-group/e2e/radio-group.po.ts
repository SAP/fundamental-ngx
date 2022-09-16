import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class RadioButtonGroupPage extends PlatformBaseComponentPo {
    url = '/radio-group';
    root = '#page-content';
    containersArr = 'component-example .fd-container';
    selectedValueLabel = '//p[contains(text(), "Selected")]';
    preferredBrandLabel = '//p[contains(text(), "Preferred Brand:")]';
    radioButtonForm = '.fd-form-group fdp-input-message-group';
    radioButtons = 'fd-form-group .fd-form-item label.fd-radio__label';
    formGroup = 'fd-form-group[role=radiogroup]';
    errorMessage = '.is-error';

    radioButtonInputByIndex = (index: number = 0): string => `[id="fd-popover-${index}"] input`;

    radioButtonLabelByIndex = (index: number = 0): string => `[id="fd-popover-${index}"] label`;

    actionButtonByIndex = (index: number = 8): string => `#fdp-id-${index}`;

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }

    getScreenshotFolder(): Record<string, any> {
        return super.getScreenshotFolder(this.url);
    }

    saveExampleBaselineScreenshot(specName: string = 'checkbox'): void {
        super.saveExampleBaselineScreenshot(specName, this.getScreenshotFolder());
    }

    compareWithBaseline(specName: string = 'checkbox'): any {
        return super.compareWithBaseline(specName, this.getScreenshotFolder());
    }
}
