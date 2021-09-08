import { ContentDensityEnum as ContentDensity } from '@fundamental-ngx/core/utils';
import { TableState } from '../interfaces';

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

export const SELECTION_COLUMN_WIDTH = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 24]
]);

export const TABLE_COLUMN_MIN_WIDTH = 50;

export const ROW_HEIGHT = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 24]
]);
