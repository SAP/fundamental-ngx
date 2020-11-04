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
    ['single-cozy', 45],
    ['single-compact', 45],
    ['single-condensed', 45],
    ['multiple-cozy', 45],
    ['multiple-compact', 32],
    ['multiple-condensed', 32]
]);
