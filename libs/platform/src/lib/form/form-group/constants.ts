import { InjectionToken } from '@angular/core';
import { ColumnLayout } from '@fundamental-ngx/platform/shared';

export const FORM_GROUP_CHILD_FIELD_TOKEN = new InjectionToken<string>('FORM_GROUP_CHILD_FIELD_TOKEN');

export const DefaultHorizontalLabelLayout: ColumnLayout = {
    XL: 4,
    L: 4,
    M: 4,
    S: 12
};

export const DefaultVerticalLabelLayout: ColumnLayout = {
    S: 12
};

export const DefaultHorizontalFieldLayout: ColumnLayout = {
    XL: 8,
    L: 8,
    M: 8,
    S: 12
};

export const DefaultVerticalFieldLayout: ColumnLayout = {
    S: 12
};

export const DefaultGapLayout: ColumnLayout = {
    S: 0
};
