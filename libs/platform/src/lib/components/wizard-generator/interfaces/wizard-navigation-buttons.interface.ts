import { ButtonType } from '@fundamental-ngx/core/button';
import { ContentDensity } from '@fundamental-ngx/core/utils';

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
}

export interface WizardNavigationButton {
    label: string;
    contentDensity: ContentDensity;
    type: ButtonType;
}
