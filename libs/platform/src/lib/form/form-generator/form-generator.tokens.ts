import { InjectionToken } from '@angular/core';
import { FieldHintOptions } from '@fundamental-ngx/platform/shared';
import { defaultFormGeneratorHintOptions } from './config/default-form-generator-hint-options';

export const FDP_FORM_GENERATOR_DEFAULT_HINT_OPTIONS = new InjectionToken<Omit<FieldHintOptions, 'content'>>(
    'Default options for form-generator hint',
    {
        factory: () => defaultFormGeneratorHintOptions
    }
);
