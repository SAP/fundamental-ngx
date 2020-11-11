import { TableState } from '../interfaces';

export const DEFAULT_TABLE_STATE: TableState = {
    sortBy: [],
    filterBy: [],
    groupBy: [],
    currentPage: {
        pageSize: null,
        startIndex: null
    },
    pageSize: null,
    columns: null,
    freezeToColumn: null
};

// SIZES
export const DEFAULT_COLUMN_WIDTH = 200;
export const SELECTION_COLUMN_WIDTH = new Map([
    ['single-cozy', 44], // 45
    ['single-compact', 32], // 45
    ['single-condensed', 24], // 45
    ['multiple-cozy', 45], // 45
    ['multiple-compact', 33], // 32
    ['multiple-condensed', 25] // 32
]);

export const ROW_HEIGHT = new Map([
    ['cozy', 44],
    ['compact', 32],
    ['condensed', 24]
]);
