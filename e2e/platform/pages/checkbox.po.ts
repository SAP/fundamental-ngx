import { BaseComponentPo } from './base-component.po';
import { $, $$ } from 'protractor';

export class CheckboxPO extends BaseComponentPo {
    url = '/checkbox';

    binaryTempCheckbox = $$('fdp-platform-binary-checkbox input');
    disabledBinaryCheckbox = $('fdp-platform-binary-checkbox input#disabled');

    checkboxWithoutForm = $$('fdp-platform-binary-checkbox-no-form input');
    disabledCheckboxWithoutForm = $('fdp-platform-binary-checkbox-no-form fdp-checkbox:nth-of-type(5) input');

    checkboxWithValue = $$('fdp-platform-multiselect-checkbox input');

    tristateCheckboxes = $$('fdp-platform-tristate-checkbox input');
    tristateCheckboxParis = $('.fd-checkbox__label[for=paris]');
    acceptAllCheckbox = $('fdp-platform-tristate-checkbox #acceptAll');
    termsAndConditionsCheckbox = $('fdp-platform-tristate-checkbox #termsAndConditions');
    marketingCheckbox = $('fdp-platform-tristate-checkbox #marketing');
    newsletterCheckbox = $('fdp-platform-tristate-checkbox #newsletter');

    errorCheckboxes = $$('fdp-platform-checkbox-error-handling input');
    presenceCheckbox = $('fdp-platform-checkbox-error-handling #presence');
    errorExampleTitle = $('fdp-platform-checkbox-error-handling h3');
    submitBtn = $('fdp-platform-checkbox-error-handling button');
    errorTooltip = $('span.fd-form-message span');

    accessibilityCheckboxes = $$('fdp-platform-checkbox-a11y input');
    disabledAccessibilityCheckbox = $('fdp-platform-checkbox-a11y #a11y3');
    disabledAccessibilityCheckboxLabel = $('fdp-platform-checkbox-a11y fd-checkbox label[for=a11y3]');

    exampleAreaContainersArr = $$('.fd-doc-component');
    rtlSwitcherArr = $$('rtl-switch .fd-switch__handle');

    async open(): Promise<void> {
        await super.open(this.url)
    }
}
