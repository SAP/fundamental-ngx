import { InjectionToken } from '@angular/core';
import { FieldHintOptions } from '@fundamental-ngx/platform/shared';

export const FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT = new InjectionToken<Omit<FieldHintOptions, 'text'>>(
    'Form field default hint options',
    {
        factory: () => ({
            placement: 'right',
            position: 'after',
            trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
            glyph: 'message-information',
            target: 'auto'
        })
    }
);
