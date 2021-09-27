import { TemplateRef } from '@angular/core';

import { WizardGeneratorItem } from './wizard-generator-item.interface';
import { WizardNavigationButtons } from './wizard-navigation-buttons.interface';
import { WizardTitle } from './wizard-title.interface';

export interface WizardDialogData {
    /**
     * @description Whether or not apply responsive paddings styling.
     */
     responsivePaddings: boolean;

    /**
     * @description Button labels to be used in Wizard navigation.
     */
    navigationButtonLabels?: WizardNavigationButtons;

    /**
     * @description Array of Wizard Steps.
     */
    items: WizardGeneratorItem[];

    /**
     * @description Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    appendToWizard: boolean;

    /**
     * @description Custom height to use for the wizard's content pane. By default, this value is calc(100vh - 144px), where 144px
     * is the combined height of the shellbar, wizard header and wizard footer.
     */
    contentHeight?: string;

    /**
     * @description Boolean flag indicating whether or not to display Summary step in Wizard progress bar.
     */
    displaySummaryStep: boolean;

    /**
     * @description Wizards dialog title configuration.
     */
    title: WizardTitle;

    /**
     * @description Text that will be displayed if user clicks on Cancel button.
     */
    confirmationDialogText?: string;

    /**
     * @description Text that will be displayed if user clicks on Close button in confirmation dialog.
     */
    confirmationDialogCloseText?: string;

    /**
     * @description Text that will be displayed if user clicks on Cancel button in confirmation dialog.
     */
    confirmationDialogCancelText?: string;

    /**
     * User-defined template for "Go Next" button.
     */
    goNextButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Go Back" button.
     */
    goBackButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Finish" button.
     */
    finishButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Cancel" button.
     */
    cancelButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * User-defined template for cancel confirmation dialog.
     */
    confirmationDialogTemplate?: TemplateRef<HTMLElement>;

    /** User-defined template for Summary step. */
    summaryStepTemplate?: TemplateRef<HTMLElement>;

    /** User-defined template for "Review" button. */
    reviewButtonTemplate?: TemplateRef<HTMLElement>;

    /** If navigation buttons should be visible. */
    navigationButtons?: boolean;

    /** Whether or not all form items should have identical layout provided for form group. */
    unifiedLayout?: boolean;
}
