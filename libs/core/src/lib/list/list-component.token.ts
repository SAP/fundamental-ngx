import { InjectionToken } from '@angular/core';
import { ListComponentInterface } from './list-component.interface';

export const FD_LIST_COMPONENT = new InjectionToken<ListComponentInterface>('ListComponent');

export const FD_LIST_UNREAD_INDICATOR = new InjectionToken('ListUnreadIndicator');
