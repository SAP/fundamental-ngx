import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class CheckboxPO extends PlatformBaseComponentPo {
    url = '/checkbox';

    binaryTempCheckbox = 'fdp-platform-binary-checkbox input';
    binaryTempCheckboxLable = 'fdp-platform-binary-checkbox label.fd-checkbox__label';
    disabledBinaryCheckbox = 'fdp-platform-binary-checkbox input#disabled';
    checkboxWithoutForm = 'fdp-platform-binary-checkbox-no-form input';
    disabledCheckboxWithoutForm = 'fdp-platform-binary-checkbox-no-form fdp-checkbox:nth-of-type(5) input';
    checkboxWithValue = 'fdp-platform-multiselect-checkbox input';
    tristateCheckboxes = 'fdp-platform-tristate-checkbox input';
    tristateCheckboxParis = '.fd-checkbox__label[for=paris]';
    acceptAllCheckbox = 'fdp-platform-tristate-checkbox #acceptAll';
    termsAndConditionsCheckbox = 'fdp-platform-tristate-checkbox #termsAndConditions';
    marketingCheckbox = 'fdp-platform-tristate-checkbox #marketing';
    newsletterCheckbox = 'fdp-platform-tristate-checkbox #newsletter';
    errorCheckboxes = 'fdp-platform-checkbox-error-handling .fd-checkbox__label';
    presenceCheckbox = 'fdp-platform-checkbox-error-handling #presence';
    errorExampleTitle = 'fdp-platform-checkbox-error-handling h3';
    submitBtn = 'fdp-platform-checkbox-error-handling button';
    errorTooltip = '[type="error"] span';
    accessibilityCheckboxes = 'fdp-platform-checkbox-a11y input';
    disabledAccessibilityCheckbox = 'fdp-platform-checkbox-a11y #a11y3';
    disabledAccessibilityCheckboxLabel = 'fdp-platform-checkbox-a11y fd-checkbox label[for=a11y3]';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'checkbox'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'checkbox'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
