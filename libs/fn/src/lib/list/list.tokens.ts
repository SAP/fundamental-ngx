import { InjectionToken } from '@angular/core';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

export const FN_LIST_CHECKBOX = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for checkbox template provider'
);
export const FN_LIST_PREFIX = new InjectionToken<TemplateRefProviderToken<void>>('Token for prefix template provider');
export const FN_LIST_ICON = new InjectionToken<TemplateRefProviderToken<void>>('Token for icon template provider');
export const FN_LIST_TITLE = new InjectionToken<TemplateRefProviderToken<void>>('Token for title template provider');
export const FN_LIST_BYLINE = new InjectionToken<TemplateRefProviderToken<void>>('Token for byline template provider');
export const FN_LIST_POSTFIX = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for list item postfix template provider'
);
export const FN_LIST_ACTIONS = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for actions template provider'
);
