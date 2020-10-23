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
