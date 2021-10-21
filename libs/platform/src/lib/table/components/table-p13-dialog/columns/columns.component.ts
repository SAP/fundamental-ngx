import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DialogRef } from '@fundamental-ngx/core/dialog';
import { SearchInput } from '@fundamental-ngx/platform/search-field';

import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';

export interface TableColumn {
    label: string;
    key: string;
}

type VisibleColumnType = string; // ColumnKey

export interface ColumnsDialogData {
    availableColumns: TableColumn[];
    visibleColumns: VisibleColumnType[];
}

export interface ColumnsDialogResultData {
    visibleColumns: VisibleColumnType[];
}

class SelectableColumn {
    constructor(
        /** Selected */
        public selected: boolean,
        /** Active */
        public active: boolean,
        /** Table Column it belongs to */
        public column: TableColumn
    ) {}
}

const INITIAL_SEARCH_TEXT = '';
const INITIAL_SHOW_ALL_ITEMS = true;

@Component({
    templateUrl: './columns.component.html',
    styleUrls: ['./columns.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13ColumnsDialogComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class P13ColumnsDialogComponent implements Resettable, OnInit, OnDestroy {
    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** Initial collection to work with */
    readonly initialVisibleColumnKeys: string[];

    /** Table columns available for grouping */
    readonly availableColumns: TableColumn[] = [];

    /** All available columns for interacting */
    _selectableColumns: SelectableColumn[] = [];

    /** filtered columns that are rendered in the list */
    _filteredColumns: SelectableColumn[] = [];

    /** Search Query subject */
    _searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject(INITIAL_SEARCH_TEXT);
    /** Show All flag subject */
    _showAllItemsSubject: BehaviorSubject<boolean> = new BehaviorSubject(INITIAL_SHOW_ALL_ITEMS);

    /** Selected columns count */
    _selectedColumnsCount = 0;

    /** Flag to track disabled state for move-down move-up buttons */
    _moveUpDisabled = true;
    _moveDownDisabled = true;

    /** @hidden */
    get _isShownAllItems(): boolean {
        return this._showAllItemsSubject.getValue();
    }

    /** @hidden */
    get _selectAllDisabled(): boolean {
        return !this._isShownAllItems || this._filteredColumns.length === 0;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private dialogRef: DialogRef, private cdr: ChangeDetectorRef) {
        const { availableColumns, visibleColumns: visibleColumnKeys }: ColumnsDialogData = this.dialogRef.data;

        this.initialVisibleColumnKeys = [...visibleColumnKeys];

        this.availableColumns = availableColumns?.map(({ label, key }) => ({ label: label, key: key })) || [];
    }

    /** @hidden */
    ngOnInit(): void {
        this._initiateColumns();

        this._listenToFilterOptions();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Reset to the initial state */
    reset(): void {
        this._initiateColumns();
        this._isResetAvailableSubject$.next(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const visibleColumns = this._getVisibleColumnsFromSelectedColumns(this._selectableColumns);
        const result: ColumnsDialogResultData = { visibleColumns: visibleColumns };
        this.dialogRef.close(result);
    }

    /** @hidden */
    _toggleSelectAll(selectAll: boolean): void {
        this._selectableColumns.forEach((column) => (column.selected = selectAll));
        this._onToggleColumn();
    }

    /** @hidden */
    _onToggleColumn(): void {
        this._countSelectedColumns();
        this._onModelChange();
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _searchInputChange({ text }: SearchInput): void {
        this._searchQuerySubject.next(text || '');
    }

    /** @hidden */
    _toggleShowAll(): void {
        const showAllItems = this._showAllItemsSubject.getValue();
        this._showAllItemsSubject.next(!showAllItems);
    }

    /** @hidden */
    _setActiveColumn(column: SelectableColumn): void {
        this._selectableColumns.map((_column) => {
            _column.active = _column === column;
        });

        this._calculateMovementButtonsState();
    }

    /** @hidden */
    _moveActiveToTop(): void {
        this._moveColumnInFilteredListByIndex(this._getActiveColumnIndexInFilteredList(), 0);
    }

    /** @hidden */
    _moveActiveToBottom(): void {
        this._moveColumnInFilteredListByIndex(
            this._getActiveColumnIndexInFilteredList(),
            this._filteredColumns.length - 1
        );
    }

    /** @hidden */
    _moveActiveUp(): void {
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex - 1);
    }

    /** @hidden */
    _moveActiveDown(): void {
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex + 1);
    }

    /** @hidden */
    _filterByColumnKy(index: number, item: SelectableColumn): string {
        return item?.column.key;
    }

    /** @hidden */
    private _initiateColumns(): void {
        const visibleColumnKeys = this.initialVisibleColumnKeys;

        this._selectableColumns = this.availableColumns.slice().map(
            (column, index: number): SelectableColumn => ({
                column: column,
                selected: visibleColumnKeys.includes(column.key),
                active: index === 0
            })
        );

        // keep count of selected
        this._countSelectedColumns();

        // reset filter settings settings
        this._searchQuerySubject.next(INITIAL_SEARCH_TEXT);
        this._showAllItemsSubject.next(INITIAL_SHOW_ALL_ITEMS);
    }

    /** @hidden */
    private _listenToFilterOptions(): void {
        this._subscriptions.add(
            combineLatest([this._showAllItemsSubject, this._searchQuerySubject])
                .pipe(debounceTime(20))
                .subscribe(([showAll, searchQuery]) => {
                    this._filteredColumns = this._selectableColumns
                        .filter((item) =>
                            item.column.label.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
                        )
                        .filter((item) => showAll || item.selected);

                    this._onChangeFilteredColumnsList();

                    this.cdr.markForCheck();
                })
        );
    }

    /** @hidden */
    private _onChangeFilteredColumnsList(): void {
        this._calculateMovementButtonsState();
    }

    /** @hidden */
    private _getVisibleColumnsFromSelectedColumns(columns = this._selectableColumns): VisibleColumnType[] {
        return columns.filter(({ selected }) => selected).map(({ column }): VisibleColumnType => column.key);
    }

    /** @hidden */
    private _getActiveColumnIndexInFilteredList(): number {
        return this._filteredColumns.findIndex(({ active }) => active);
    }

    /** @hidden */
    private _moveColumnInFilteredListByIndex(from: number, to: number): void {
        const { movedItem, replacedItem } = this._moveElementInTheListByIndex(this._filteredColumns, from, to);
        /**
         * need to reflect analogical movement in the original list
         * with respect to the original list order
         */
        this._moveColumnInSelectableList(movedItem, replacedItem);

        this._calculateMovementButtonsState();

        this._onModelChange();
    }

    /**
     * @hidden
     * Move column in selectable list.
     */
    private _moveColumnInSelectableList(itemToMove: SelectableColumn, targetItem: SelectableColumn): void {
        const list = this._selectableColumns;
        this._moveElementInTheListByIndex(list, list.indexOf(itemToMove), list.indexOf(targetItem));
    }

    /**
     * @hidden
     * Move element in the list
     * @return moved item and replaced item.
     */
    private _moveElementInTheListByIndex<T>(
        list: T[],
        fromIndex: number,
        toIndex: number
    ): { movedItem: T; replacedItem: T } {
        const listLength = list.length;

        fromIndex = Math.min(Math.max(fromIndex, 0), listLength - 1);
        toIndex = Math.min(Math.max(toIndex, 0), listLength - 1);

        const replacedItem = list[toIndex];
        const movedItem = list.splice(fromIndex, 1)[0];

        list.splice(toIndex, 0, movedItem);

        return { movedItem: movedItem, replacedItem: replacedItem };
    }

    /** @hidden */
    private _countSelectedColumns(): void {
        this._selectedColumnsCount = this._selectableColumns.filter(({ selected }) => selected).length;
    }

    /** @hidden */
    private _calculateMovementButtonsState(): void {
        const activeIndex = this._getActiveColumnIndexInFilteredList();
        this._moveUpDisabled = activeIndex < 1;
        this._moveDownDisabled = activeIndex < 0 || activeIndex >= this._filteredColumns.length - 1;
    }
}
