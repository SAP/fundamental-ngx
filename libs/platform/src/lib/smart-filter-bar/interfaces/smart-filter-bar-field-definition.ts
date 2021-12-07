import { FilterType, FilterableColumnDataType, CollectionFilterGroupStrategy } from '@fundamental-ngx/platform/table';

export interface SmartFilterBarFieldDefinition {
    key: string;
    name: string;
    label: string;
    filterType: FilterType;
    dataType: FilterableColumnDataType;
    filterable: boolean;
    required: boolean;
    customFilterType?: string;
    defaultSelected: boolean;
    hasOptions: boolean;
    conditionStrategy: CollectionFilterGroupStrategy;
}
