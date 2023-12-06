import { InjectionToken } from '@angular/core';

export interface WizardComponentInterface {
    displaySummaryStep: boolean;
    ariaLabel: string;
}

export const WIZARD = new InjectionToken<WizardComponentInterface>('Wizard component dependency');
