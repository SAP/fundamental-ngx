import { InjectionToken } from '@angular/core';
import { HintOptions } from './interfaces/hint-options';

export const FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS = new InjectionToken<Omit<HintOptions, 'text'>>(
    'Default options for form-generator hint',
    {
        factory: () => ({
            placement: 'left',
            position: 'after',
            trigger: ['mouseenter', 'mouseleave', 'focusin', 'focusout'],
            glyph: 'message-information'
        })
    }
);
