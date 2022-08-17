import { ButtonType } from '@fundamental-ngx/core/button';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

export interface WizardNavigationButtons {
    /**
     * @description Text for 'Go Next' button.
     */
    goNext?: WizardNavigationButton;
    /**
     * @description Text for 'Go Back' button.
     */
    goBack?: WizardNavigationButton;
    /**
     * @description Text for 'Finish' button.
     */
    finish?: WizardNavigationButton;
    /**
     * @description Text for 'Cancel' button.
     */
    cancel?: WizardNavigationButton;
    /**
     * @description Text for 'Review' button.
     */
    review?: WizardNavigationButton;
}

export interface WizardNavigationButton {
    label: string;
    contentDensity: ContentDensityMode;
    type: ButtonType;
}
