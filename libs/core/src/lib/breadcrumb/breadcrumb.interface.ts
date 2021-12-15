import { InjectionToken } from '@angular/core';

export interface BreadcrumbInterface {
    arrowNavigation: boolean;
}

export const BREADCRUMB_COMPONENT = new InjectionToken<string[]>('BreadcrumbComponent');
