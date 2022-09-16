import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class FormContainerPo extends PlatformBaseComponentPo {
    private url = '/form-container';

    textArea = '.fd-textarea';
    checkboxLabel = 'fd-checkbox label';
    formGroup = 'fdp-form-group';
    popover = '.cdk-overlay-container .cdk-overlay-pane';
    helpIcon = '.sap-icon--hint';
    fdSwitch = 'fd-switch label';
    dropdownOption = '.cdk-overlay-container li[fd-option]';
    dropdownOptionAlt = 'ul .fd-list__item span';
    comboboxListItem = '.cdk-overlay-container li';

    recommendedExamples = 'fdp-platform-form-container-recommended-example ';
    recommendedExampleTextArea = this.recommendedExamples + this.textArea;
    recommendedExampleCheckboxLabel = this.recommendedExamples + this.checkboxLabel;
    recommendedExampleFormGroup = this.recommendedExamples + this.formGroup;
    recommendedExampleHelpIcon = this.recommendedExamples + this.helpIcon;

    possibleExamples = 'fdp-platform-form-container-possible-example ';
    possibleExampleTextArea = this.possibleExamples + this.textArea;
    possibleExampleCheckboxLabel = this.possibleExamples + this.checkboxLabel;
    possibleExampleFormGroup = this.possibleExamples + this.formGroup;
    possibleExampleHelpIcon = this.possibleExamples + this.helpIcon;

    notRecommendedExample = 'fdp-platform-form-container-not-recommended-example ';
    notRecommendedExampleTextArea = this.notRecommendedExample + this.textArea;
    notRecommendedExampleCheckboxLabel = this.notRecommendedExample + this.checkboxLabel;
    notRecommendedExampleFormGroup = this.notRecommendedExample + this.formGroup;
    notRecommendedExampleHelpIcon = this.notRecommendedExample + this.helpIcon;

    complexExample = 'fdp-platform-form-container-complex-example ';
    complexExampleTextArea = this.complexExample + this.textArea;
    complexExampleCheckboxLabel = this.complexExample + this.checkboxLabel;
    complexExampleFormGroup = this.complexExample + this.formGroup;
    complexExampleHelpIcon = this.complexExample + this.helpIcon;
    complexExampleInputGroup = this.complexExample + 'fdp-input-group input';
    complexExampleSubmitBtn = this.complexExample + 'fdp-input-group button';
    complexExampleRadioBtn = this.complexExample + 'fd-radio-button input';
    complexExampleRadioBtnLabel = this.complexExample + 'fd-radio-button label';
    complexExampleStepInput = this.complexExample + 'fdp-number-step-input .fd-input';
    complexExampleStepInputBtn = this.complexExample + '.fd-step-input button';
    complexExampleSwitch = this.complexExample + this.fdSwitch;

    columnExample = 'fdp-platform-form-basic-example ';
    columnExampleTextArea = this.columnExample + this.textArea;

    formExample = 'fdp-platform-form-group-example ';
    formExampleTextArea = this.formExample + this.textArea;
    formExampleSwitch = this.formExample + this.fdSwitch;
    formExampleHelpIcon = this.formExample + this.helpIcon;

    changeExample = 'fdp-platform-form-column-change-example ';
    changeExampleTextArea = this.changeExample + this.textArea;
    changeExampleTextAreaLabel = this.changeExample + ' .fd-form-label span';
    changeExampleCheckboxLabel = this.changeExample + this.checkboxLabel;
    changeExampleHelpIcon = this.changeExample + this.helpIcon;

    isInlineExample = 'fdp-platform-form-isinline-change-example ';
    isInlineExampleTextArea = this.isInlineExample + this.textArea;
    isInlineExampleCheckboxLabel = this.isInlineExample + this.checkboxLabel;
    isInlineExampleHelpIcon = this.isInlineExample + this.helpIcon;
    isInlineExampleRadioBtn = this.isInlineExample + 'fd-radio-button input';
    isInlineExampleRadioBtnLabel = this.isInlineExample + 'fd-radio-button label';
    isInlineExampleDropdownMenu = this.isInlineExample + '.fd-select__control';
    isInlineExampleCombobox = this.isInlineExample + 'fdp-combobox input';
    isInlineExampleComboboxBtn = this.isInlineExample + 'fdp-combobox button';

    open(): void {
        super.open(this.url);
        waitForPresent(this.root);
        waitForElDisplayed(this.title);
    }
}
