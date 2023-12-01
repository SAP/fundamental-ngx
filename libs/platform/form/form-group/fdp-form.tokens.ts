import { InjectionToken } from '@angular/core';
import { Column, ColumnLayout, FieldHintOptions } from '@fundamental-ngx/platform/shared';
import { defaultFormFieldHintOptions } from './config/default-form-field-hint-options';

export const FDP_FORM_FIELD_HINT_OPTIONS_DEFAULT = new InjectionToken<Omit<FieldHintOptions, 'content'>>(
    'Form field default hint options',
    {
        factory: () => defaultFormFieldHintOptions
    }
);

export interface HintLayoutConfig {
    hintOnInputBreakpoints: Array<keyof ColumnLayout>;
    hintPlaceMinSize: Column;
}

export const FDP_FORM_FIELD_HINT_LAYOUT_CONFIG = new InjectionToken<HintLayoutConfig>(
    'Configuration for setting default values for configuring how places for inline help are coming',
    {
        factory: () => ({
            hintOnInputBreakpoints: ['M', 'L', 'XL'],
            hintPlaceMinSize: 1
        })
    }
);
