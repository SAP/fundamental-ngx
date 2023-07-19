import { InjectionToken } from '@angular/core';
import { WizardStepIndicator } from './models/wizard-step';

export const ACTIVE_STEP_STATUS = 'active';
export const CURRENT_STEP_STATUS = 'current';
export const UPCOMING_STEP_STATUS = 'upcoming';
export const COMPLETED_STEP_STATUS = 'completed';
export const FD_WIZARD_STEP_INDICATOR = new InjectionToken<WizardStepIndicator>('FdWizardStepindicator');
