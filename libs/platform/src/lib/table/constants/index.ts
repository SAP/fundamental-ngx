import { ContentDensityEnum as ContentDensity } from '@fundamental-ngx/core/utils';
import { SearchInput } from '@fundamental-ngx/platform/search-field';

import { CollectionPage, TableState } from '../interfaces';

export const DEFAULT_TABLE_PAGE: Readonly<CollectionPage> = {
    pageSize: null,
    currentPage: 1
};

export const DEFAULT_TABLE_SEARCH_INPUT: Readonly<SearchInput> = {
    text: '',
    category: ''
};

export const DEFAULT_TABLE_STATE: Readonly<TableState> = {
    sortBy: [],
    filterBy: [],
    groupBy: [],
    page: DEFAULT_TABLE_PAGE,
    columns: [],
    freezeToColumn: null,
    searchInput: DEFAULT_TABLE_SEARCH_INPUT
};

export const SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH = 6;

export const SELECTION_COLUMN_WIDTH: ReadonlyMap<ContentDensity, number> = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 32]
]);

export const TABLE_COLUMN_MIN_WIDTH = 50;

export const ROW_HEIGHT: ReadonlyMap<ContentDensity, number> = new Map<ContentDensity, number>([
    [ContentDensity.COZY, 44],
    [ContentDensity.COMPACT, 32],
    [ContentDensity.CONDENSED, 24]
]);
