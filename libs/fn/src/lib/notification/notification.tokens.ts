import { InjectionToken } from '@angular/core';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

export const FN_NOTIFICATION_ACTION_BUTTONS = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for notification action buttons'
);

export const FN_NOTIFICATION_DISMISS_BUTTON = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for notification dismiss button'
);

export const FN_NOTIFICATION_SEMANTIC_ICON = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for notification semantic icon'
);

export const FN_NOTIFICATION_SEMANTIC_TITLE = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for notification semantic title'
);

export const FN_NOTIFICATION_TEXT = new InjectionToken<TemplateRefProviderToken<void>>('Token for notification text');

export const FN_NOTIFICATION_TITLTE = new InjectionToken<TemplateRefProviderToken<void>>(
    'Token for notification title'
);
