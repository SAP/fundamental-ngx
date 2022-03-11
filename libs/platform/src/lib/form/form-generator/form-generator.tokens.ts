import { InjectionToken } from '@angular/core';
import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS = new InjectionToken<Omit<FieldHintOptions, 'text'>>(
    'Default options for form-generator hint',
    {
        factory: () => ({
            placement: 'left',
            position: 'after',
            trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
            glyph: 'message-information',
            target: 'auto'
        })
    }
);
