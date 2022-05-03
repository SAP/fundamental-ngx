import { InjectionToken } from '@angular/core';

export const DYNAMIC_PAGE_HEADER_TOKEN = new InjectionToken('DynamicPageHeader');

export interface DynamicPageHeader {
    /**
     * Page Title
     */
    title: string;
}
