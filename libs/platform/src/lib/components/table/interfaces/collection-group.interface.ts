import { SortDirection } from '../enums';

export interface CollectionGroup {
    field: string;
    direction: SortDirection;
    showAsColumn: boolean;
}
