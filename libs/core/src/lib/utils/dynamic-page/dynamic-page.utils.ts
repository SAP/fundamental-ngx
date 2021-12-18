import { InjectionToken } from '@angular/core';

export const DYNAMIC_PAGE_HEADER_COMPONENT = new InjectionToken<string>('DynamicPageHeaderComponent');

export interface DynamicPageHeaderInterface {
    focusLayoutAction(): void;
}
