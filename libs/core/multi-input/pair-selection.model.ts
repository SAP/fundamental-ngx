import { EventEmitter } from '@angular/core';

export class PairSelectionModel<KeyType, ValueType> {
    /** @ignore */
    _selected = new Map<KeyType, ValueType>();
    /** Event emitted when the selection has changed. */
    selectionChanged = new EventEmitter<[KeyType, ValueType][]>();

    /** Array of selected items */
    get selected(): ValueType[] {
        return [...this._selected.values()];
    }

    /** Whether the given key exists in the record */
    isSelected(key: KeyType): boolean {
        return this._selected.has(key);
    }

    /** Selects the given key-value pair */
    select(values: [KeyType, ValueType][]): void;
    /** Selects the given key-value pair */
    select(key: KeyType, value: ValueType): void;
    /** Selects the given key-value pair */
    select(keyOrValues: KeyType | Array<[KeyType, ValueType]>, value?: ValueType): void {
        if (value) {
            this._selected.set(keyOrValues as KeyType, value);
        } else {
            (keyOrValues as Array<[KeyType, ValueType]>).forEach(([key, v]) => this._selected.set(key, v));
        }
        this.selectionChanged.emit([...this._selected]);
    }

    /** Deselects the given key */
    deselect(key: KeyType): void {
        this._selected.delete(key);
        this.selectionChanged.emit([...this._selected]);
    }

    /** Clears the selection information */
    clear(): void {
        this._selected.clear();
        this.selectionChanged.emit([...this._selected]);
    }
}
