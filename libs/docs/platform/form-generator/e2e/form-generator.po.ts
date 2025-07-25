import { PlatformBaseComponentPo, waitForElDisplayed } from '@fundamental-ngx/e2e';

export class FormGeneratorPo extends PlatformBaseComponentPo {
    defaultExample = 'fdp-platform-form-generator-example ';
    observableExample = 'fdp-platform-form-generator-observable-example ';
    customExample = 'fdp-platform-form-generator-custom-component-example ';
    programmaticExample = 'fdp-platform-form-generator-programatic-submit ';
    errorExample = 'fdp-platform-form-generator-custom-error-example ';
    fieldLayoutExample = 'fdp-platform-form-generator-field-layout-example ';

    nameInput = '.fd-input[aria-labelledby*="name"]';
    passwordInput = '.fd-input[aria-labelledby*="password"]';
    ageInput = '.fd-input[aria-labelledby*="age"]';
    dateInput = '.fd-input[aria-label*="Date"]';
    radioButton = '.fd-radio[aria-labelledby*="radio"]';
    radioButtonLabel = '.fd-radio__label';
    checkbox = '.fd-checkbox[aria-labelledby*="citizen"]';
    submitButton = '.fd-button[type="submit"]';
    calendarInputGroup = '.fd-input-group';
    select = ' .fd-select__control';
    mainSpecialitySelect = ' .fd-select__control[aria-label="Main Speciality"]';
    errorMessage = '.fd-form-message--error span';
    formValue = 'p.ng-star-inserted';
    sliderPoint = '.fd-slider__handle';
    validationInput = '.fd-input[aria-labelledby*="validation"]';
    busyIndicator = 'fd-busy-indicator .fd-busy-indicator';

    private url = '/form-generator';

    async open(): Promise<void> {
        await super.open(this.url);
        await this.waitForRoot();
        await waitForElDisplayed(this.title);
    }
}
