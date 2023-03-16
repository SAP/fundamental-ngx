import { DynamicFormFieldItem, DynamicFormItemGuiOptions, InputType } from '@fundamental-ngx/platform/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { FilterableColumnDataType, FilterType } from '@fundamental-ngx/platform/table';
import { Observable } from 'rxjs';

export type SmartFilterBarDynamicFormFieldItem = DynamicFormFieldItem<{
    guiOptions: SmartFilterBarDynamicFormFieldGuiOptions;
}>;

export interface SmartFilterBarDynamicFormFieldGuiOptions extends DynamicFormItemGuiOptions {
    additionalData: {
        type: string;
        dataType: FilterableColumnDataType;
        filterType: FilterType;
        controlType: InputType;
        choices?: () => Observable<SelectItem[]> | SelectItem[];
        /** Additional config properties. */
        [key: string]: any;
    };
}
