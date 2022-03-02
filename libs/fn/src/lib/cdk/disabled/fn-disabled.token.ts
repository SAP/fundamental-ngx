import { InjectionToken } from '@angular/core';
import { DisabledBehavior } from './disabled-behavior.interface';

export const FN_DISABLED = new InjectionToken<DisabledBehavior>('Disabled Behavior token');

export const fnDisabled = new InjectionToken<DisabledBehavior>('Disabled directive token');
