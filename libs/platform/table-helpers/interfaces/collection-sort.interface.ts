import { SortDirection } from '../enums';

export interface CollectionSort {
    field: string | null;
    direction: SortDirection;
}
