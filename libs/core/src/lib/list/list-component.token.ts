import { InjectionToken } from '@angular/core';
import { ListComponentInterface } from './list-component.interface';

export const LIST_COMPONENT = new InjectionToken<ListComponentInterface>('ListComponent');
