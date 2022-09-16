import { InjectionToken } from '@angular/core';
import { TabListComponentInterface } from './tab-list-component.interface';

export const LIST_COMPONENT = new InjectionToken<TabListComponentInterface>('ListComponent');
