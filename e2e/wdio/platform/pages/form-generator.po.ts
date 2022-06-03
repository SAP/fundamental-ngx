import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed, waitForPresent } from '../../driver/wdio';

export class FormGeneratorPo extends BaseComponentPo {
    private url = '/form-generator';

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
    mainSpecialitySelect = ' .fd-select__control[aria-labelledby="Main Speciality"]';
    errorMessage = '.fd-form-message--error span';
    formValue = 'p.ng-star-inserted';
    sliderPoint = '.fd-slider__handle';
    validationInput = '.fd-input[aria-labelledby*="validation"]';
    busyIndicator = 'fd-busy-indicator .fd-busy-indicator';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
