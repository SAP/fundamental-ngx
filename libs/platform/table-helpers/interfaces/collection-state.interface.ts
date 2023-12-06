import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { CollectionFilter } from './collection-filter.interface';
import { CollectionGroup } from './collection-group.interface';
import { CollectionPage } from './collection-page.interface';
import { CollectionSort } from './collection-sort.interface';

export interface CollectionState {
    sortBy: CollectionSort[];
    filterBy: CollectionFilter[];
    groupBy: CollectionGroup[];
    page: CollectionPage;
    searchInput: SearchInput;
}
