import {
    CollectionFilter,
    SortDirection,
    TableColumn,
    TableDialogCommonData
} from '@fundamental-ngx/platform/table-helpers';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';

export interface SettingsSortDialogColumn {
    label: string;
    key: string;
}

export interface SettingsSortDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string | null;
    columns: SettingsSortDialogColumn[];
    allowDisablingSorting: boolean;
}

export interface SettingsSortDialogResultData {
    field: string | null;
    direction: SortDirection;
}

export const NOT_SORTED_OPTION_VALUE = null;
export const INITIAL_DIRECTION = SortDirection.ASC;

export interface SettingsGroupDialogColumn {
    label: string;
    key: string;
}

export interface SettingsGroupDialogData extends TableDialogCommonData {
    direction: SortDirection;
    field: string | null;
    columns: SettingsGroupDialogColumn[];
}

export interface SettingsGroupDialogResultData {
    field: string | null;
    direction: SortDirection;
}

export const NOT_GROUPED_OPTION_VALUE = null;

export interface FiltersDialogData extends TableDialogCommonData {
    filterBy: CollectionFilter[];
    columns: TableColumn[];
    viewSettingsFilters: TableViewSettingsFilterComponent[];
}

export interface FiltersDialogResultData {
    filterBy: CollectionFilter[];
}

export enum ACTIVE_STEP {
    SELECT_FILTER = 'SELECT_FILTER',
    FILTER = 'FILTER'
}

export enum ActiveTab {
    SORT = 'sort',
    FILTER = 'filter',
    GROUP = 'group'
}
