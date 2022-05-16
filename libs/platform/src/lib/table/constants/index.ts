import { ContentDensity, ContentDensityEnum } from '@fundamental-ngx/core/utils';
import { SearchInput } from '@fundamental-ngx/platform/search-field';

import { CollectionPage, TableState } from '../interfaces';

export const DEFAULT_TABLE_PAGE: Readonly<CollectionPage> = {
    pageSize: 0,
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
    columnKeys: [],
    freezeToColumn: null,
    searchInput: DEFAULT_TABLE_SEARCH_INPUT
};

export const DEFAULT_HIGHLIGHTING_KEY = 'semantic';

export const EDITABLE_ROW_SEMANTIC_STATE = 'information';

export const SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH = 6;

export const SELECTION_COLUMN_WIDTH: ReadonlyMap<ContentDensity, number> = new Map<ContentDensity, number>([
    [ContentDensityEnum.COZY, 44],
    [ContentDensityEnum.COMPACT, 32],
    [ContentDensityEnum.CONDENSED, 32]
]);

export const TABLE_COLUMN_MIN_WIDTH = 50;

export const ROW_HEIGHT: ReadonlyMap<ContentDensity, number> = new Map<ContentDensity, number>([
    [ContentDensityEnum.COZY, 44],
    [ContentDensityEnum.COMPACT, 32],
    [ContentDensityEnum.CONDENSED, 24]
]);
