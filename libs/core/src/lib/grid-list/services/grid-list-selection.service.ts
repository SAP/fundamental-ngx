import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum GridListSelectionActions {
    ADD = 'add',
    REMOVE = 'remove'
}

export interface GridListSelectionEvent<T> {
    selection: T[]; // currently selected items
    added: T[]; // items added
    removed: T[]; // items removed
    index: number[]; // indexes location of additions or removals
}

@Injectable()
export class GridListSelectionService<T> {
    /** @hidden */
    selectedItemsObs: Observable<GridListSelectionEvent<T>>;

    /** @hidden */
    private readonly _selectedItems: GridListSelectionEvent<T> = {
        added: [],
        index: [],
        removed: [],
        selection: []
    };

    /** @hidden */
    private readonly _selectedItemsObs = new BehaviorSubject<GridListSelectionEvent<T>>(this._selectedItems);

    constructor() {
        this.selectedItemsObs = this._selectedItemsObs.asObservable();
    }

    /** @hidden */
    clearSelection(): void {
        this._selectedItems.added = [];
        this._selectedItems.index = [];
        this._selectedItems.removed = this._selectedItems.selection;
        this._selectedItems.selection = [];

        this._selectedItemsObs.next(this._selectedItems);
    }

    /** @hidden */
    setSelectedItem(item: T, componentIndex: number, action?: GridListSelectionActions): void {
        if (!action) {
            this._selectedItems.added = [item];
            const selectedItem = this._selectedItems.selection[0];
            if (selectedItem) {
                this._selectedItems.removed = [selectedItem];
            }

            this._selectedItems.selection = [item];
            this._selectedItems.index = [componentIndex];

            this._selectedItemsObs.next(this._selectedItems);

            return;
        }

        if (action === GridListSelectionActions.ADD) {
            this._selectedItems.added = [item];
            this._selectedItems.index = [componentIndex];
            this._selectedItems.removed = [];

            this._selectedItems.selection.push(item);
        }

        if (action === GridListSelectionActions.REMOVE) {
            this._selectedItems.added = [];
            this._selectedItems.index = [componentIndex];
            this._selectedItems.removed = [item];

            this._selectedItems.selection = this._selectedItems.selection.filter(
                (selectedItem) => selectedItem !== item
            );
        }

        this._selectedItemsObs.next(this._selectedItems);
    }
}
