import { InjectionToken } from '@angular/core';
import { DisabledBehavior } from './disabled-behavior.interface';

export const FN_DISABLED_DIRECTIVE = new InjectionToken<DisabledBehavior>('Disabled directive token');
