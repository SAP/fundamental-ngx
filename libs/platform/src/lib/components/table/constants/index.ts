import { ContentDensity } from '@fundamental-ngx/core/utils';
import { TableState } from '@fundamental-ngx/platform/table';

export const DEFAULT_TABLE_STATE: TableState = {
    sortBy: [],
    filterBy: [],
    groupBy: [],
    page: {
        pageSize: null,
        currentPage: 1
    },
    columns: [],
    freezeToColumn: null,
    searchInput: {
        text: '',
        category: ''
    }
};

// SIZES

export const SELECTION_COLUMN_WIDTH = new Map<ContentDensity, number>([
    ['cozy', 44],
    ['compact', 32],
    ['condensed', 24]
]);

export const TABLE_COLUMN_MIN_WIDTH = 50;

export const ROW_HEIGHT = new Map<ContentDensity, number>([
    ['cozy', 44],
    ['compact', 32],
    ['condensed', 24]
]);
