import { SearchInput } from '../interfaces/search-field.interface';

import { CollectionSort } from './collection-sort.interface';
import { CollectionFilter } from './collection-filter.interface';
import { CollectionGroup } from './collection-group.interface';
import { CollectionPage } from './collection-page.interface';

export interface CollectionState {
    sortBy: CollectionSort[];
    filterBy: CollectionFilter[];
    groupBy: CollectionGroup[];
    currentPage: CollectionPage;
    pageSize: number;
    searchInput: SearchInput;
}
