import { InjectionToken } from '@angular/core';
import { DisabledBehavior } from './disabled-behavior.interface';
import { DisabledViewModifier } from './disabled-view-modifier.interface';

export const FN_DISABLED = new InjectionToken<DisabledBehavior>('Disabled Behavior token');

export const FN_DISABLED_DIRECTIVE = new InjectionToken<DisabledBehavior>('Disabled directive token');

export const FN_DISABLED_VIEW_MODIFIER = new InjectionToken<DisabledViewModifier[]>('Collection of view modifiers');
