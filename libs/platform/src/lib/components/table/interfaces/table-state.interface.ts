import { QueryList } from '@angular/core';

import { TableColumnComponent } from '../components/table-column/table-column.component';
import { CollectionState } from './collection-state.interface';

export interface TableState extends CollectionState {
    columns: QueryList<TableColumnComponent>; // string[];
    freezeToColumn: string;
}
