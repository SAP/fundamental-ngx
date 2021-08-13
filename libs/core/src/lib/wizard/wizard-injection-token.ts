import { InjectionToken } from '@angular/core';

export interface WizardComponentInterface {
    displaySummaryStep: boolean;
}

export const WIZARD = new InjectionToken<WizardComponentInterface>('Wizard component dependency');
