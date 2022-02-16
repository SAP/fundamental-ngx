import { InjectionToken } from '@angular/core';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

export const FN_LIST_CHECKBOX = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for checkbox template provider'
);
export const FN_LIST_PREFIX = new InjectionToken<TemplateRefProviderToken<void>>('Token for prefix template provider');
export const FN_LIST_ICON = new InjectionToken<TemplateRefProviderToken<void>>('Token for icon template provider');
export const FN_LIST_TITLE = new InjectionToken<TemplateRefProviderToken<void>>('Token for title template provider');
export const FN_LIST_END = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for list item end template provider'
);
export const FN_LIST_ACTIONS = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for actions template provider'
);
