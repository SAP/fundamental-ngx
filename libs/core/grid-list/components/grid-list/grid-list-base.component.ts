import { Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { GridListSelectionActions, GridListSelectionEvent } from '../../models/grid-list-selection.models';

@Directive()
export abstract class GridList<T> {
    /** an observable of selection state event */
    abstract _selectedItems$: Observable<GridListSelectionEvent<T>>;
    /** method to be used by list items to register the selection */
    abstract setSelectedItem(
        item: T,
        componentIndex: number,
        action?: GridListSelectionActions | null,
        event?: MouseEvent
    ): void;
}
