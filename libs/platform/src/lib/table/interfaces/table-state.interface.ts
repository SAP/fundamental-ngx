import { CollectionState } from './collection-state.interface';

export interface TableState extends CollectionState {
    columns: string[];
    columnKeys: string[];
    freezeToColumn: string | null;
    freezeToEndColumn: string | null;
}
