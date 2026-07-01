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
    columns: SettingsSortDialogColumn[];
    allowDisablingSorting: boolean;
    /** Array of current sort criteria in priority order (only includes criteria with non-null fields) */
    sortBy?: Array<{ field: string; direction: SortDirection }>;
}

export interface SettingsSortDialogResultData {
    /** Array of sort criteria in priority order (first has highest priority) */
    sortBy: Array<{ field: string; direction: SortDirection }>;
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
    GROUP = 'group',
    COLUMNS = 'columns'
}

export interface SettingsColumnsDialogColumn {
    label: string;
    key: string;
    name: string;
    visible: boolean;
}

export interface SettingsColumnsDialogData extends TableDialogCommonData {
    columns: SettingsColumnsDialogColumn[];
}

export interface SettingsColumnsDialogResultData {
    visibleColumns: string[];
    columnOrder: string[];
    columns: SettingsColumnsDialogColumn[];
}
