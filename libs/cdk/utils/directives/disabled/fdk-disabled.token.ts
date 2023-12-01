import { InjectionToken } from '@angular/core';
import { DisabledBehavior } from './disabled-behavior.interface';

export const FDK_DISABLED_DIRECTIVE = new InjectionToken<DisabledBehavior>('Disabled directive token');
