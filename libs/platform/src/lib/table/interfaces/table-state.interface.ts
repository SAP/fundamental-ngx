import { CollectionState } from './collection-state.interface';

export interface TableState extends CollectionState {
    columns: string[];
    freezeToColumn: string;
}
