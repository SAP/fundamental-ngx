import { BaseComponentPo } from './base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class WizardGeneratorPO extends BaseComponentPo {
    private url = '/wizard-generator';

    defaultExample = 'fdp-wizard-generator-default-example ';
    dialogExample = 'fdp-wizard-generator-dialog-example ';
    customizableGeneratorExample = 'fdp-wizard-generator-customizable-embeded-example ';
    branchingExample = 'fdp-wizard-generator-condition-example ';
    responsiveExample = 'fdp-wizard-generator-responsive-paddings-example ';
    visibleSummaryExample = 'fdp-wizard-generator-visible-summary-example ';
    visibleSummaryBranchingExample = 'fdp-wizard-generator-visible-summary-branching-example ';
    responsiveDialogExample = 'fdp-wizard-generator-responsive-dialog-example ';
    summaryObjectsExample = 'fdp-wizard-generator-summary-objects-example ';
    externalNavigationExample = 'fdp-wizard-generator-external-navigation-example ';
    onChangeExample = 'fdp-wizard-generator-onchange-example ';
    customizableDialogExample = 'fdp-wizard-generator-customizable-example ';

    step = '.fd-wizard__step';
    stepContainer = 'fdp-wizard-generator-step';
    select = '.fd-select';
    selectControl = '.fd-select__control';
    button = '.fd-button';
    listItem = '.fd-list__item';
    nextStepBtn = '.fd-wizard__next-step .fd-button';
    nextStepBtn2 = '.fd-button[aria-label*="emphasized"]';
    listItemText = this.listItem + ' span';
    errorMessage = '.fd-form-message--error span';
    input = '.fd-input';
    formLabel = '.fd-col-lg--5 .fd-form-label';
    editButton = '.fd-link';
    checkboxLabel = '.fd-checkbox__label';
    checkbox = '.fd-checkbox';
    dialog = '.fd-dialog ';
    dialogBarButton = this.dialog + '.fd-bar__element ' + this.button;

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.title);
    }
}
