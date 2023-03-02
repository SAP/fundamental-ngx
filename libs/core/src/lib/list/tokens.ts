import { InjectionToken } from '@angular/core';
import { ListComponentInterface } from './list-component.interface';

export const FD_LIST_MESSAGE_DIRECTIVE = new InjectionToken('FdListMessageDirective');
export const FD_LIST_LINK_DIRECTIVE = new InjectionToken('FdListLinkDirective');
export const FD_LIST_COMPONENT = new InjectionToken<ListComponentInterface>('ListComponent');

export const FD_LIST_UNREAD_INDICATOR = new InjectionToken('ListUnreadIndicator');
