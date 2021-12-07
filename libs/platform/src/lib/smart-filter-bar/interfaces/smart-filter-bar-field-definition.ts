import { FilterType, FilterableColumnDataType } from '@fundamental-ngx/platform/table';

export interface SmartFilterBarFieldDefinition {
    key: string;
    label: string;
    filterType: FilterType;
    dataType: FilterableColumnDataType;
    filterable: boolean;
    mandatoryFilter: boolean;
    customFilterType: string;
}
