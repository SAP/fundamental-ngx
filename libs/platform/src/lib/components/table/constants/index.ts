import { ContentDensity } from '../enums';
import { TableState } from '../interfaces';
import { TableCellNavigationId } from '../table.service';

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
export const DEFAULT_COLUMN_WIDTH = 200;

export const SELECTION_COLUMN_WIDTH = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 24]
]);

export const ROW_HEIGHT = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 24]
]);

export const FIRST_CELL_NAVIGATION_ID: TableCellNavigationId = '0,0';
