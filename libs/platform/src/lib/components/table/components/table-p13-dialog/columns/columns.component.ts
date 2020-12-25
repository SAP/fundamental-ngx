import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core';

import { Resettable, RESETTABLE_TOKEN } from '../../reset-button/reset-button.component';
import { map } from 'rxjs/operators';

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

    /** filtered columns to render in the list */
    _filteredColumns: SelectableColumn[] = [];

    /** Search Query subject */
    _searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject('');
    /** Show All flag subject */
    _showAllItemsSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    /** Selected columns count */
    _selectedColumnsCount = 0;

    /** Flag to track disabled state for move-down move-up buttons */
    _isMoveDownDisabled = false;
    _isMoveUpDisabled = false;

    /** @hidden */
    get _isShownAllItems(): boolean {
        return this._showAllItemsSubject.getValue();
    }

    /** @hidden */
    get _selectAllDisabled(): boolean {
        return !this._isShownAllItems || this._filteredColumns.length === 0;
    }

    private subscriptions = new Subscription();

    constructor(private dialogRef: DialogRef) {
        const { availableColumns, visibleColumns: visibleColumnKeys }: ColumnsDialogData = this.dialogRef.data;

        this.initialVisibleColumnKeys = [...visibleColumnKeys];

        this.availableColumns = availableColumns?.map(({ label, key }) => ({ label: label, key: key })) || [];
    }

    ngOnInit(): void {
        this._initiateColumns();

        this._constructFilteredColumnsList();

        this._countSelectedColumns();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
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
    _onToggleColumn(): void {
        this._countSelectedColumns();
    }

    /** @hidden */
    _onModelChange(): void {
        this._isResetAvailableSubject$.next(true);
    }

    /** @hidden */
    _searchInputChange(searchQuery = ''): void {
        this._searchQuerySubject.next(searchQuery);
    }

    /** @hidden */
    _toggleShowAll(): void {
        const showAllItems = this._showAllItemsSubject.getValue();
        this._showAllItemsSubject.next(!showAllItems);
    }

    /** @hidden */
    _setActiveColumn(column: SelectableColumn): void {
        this._filteredColumns.map((_column) => {
            _column.active = _column === column;
        });

        this._calculateMoveButtonDisabledStates();
    }

    /** @hidden */
    _moveActiveToTop(): void {
        this._moveColumnInFilteredListFromToIndex(this._getActiveColumnIndex(), 0);
    }

    /** @hidden */
    _moveActiveToBottom(): void {
        this._moveColumnInFilteredListFromToIndex(this._getActiveColumnIndex(), this._filteredColumns.length - 0);
    }

    /** @hidden */
    _moveActiveUp(): void {
        const activeColumnIndex = this._getActiveColumnIndex();
        this._moveColumnInFilteredListFromToIndex(activeColumnIndex, activeColumnIndex + 1);
    }

    /** @hidden */
    _moveActiveDown(): void {
        const activeColumnIndex = this._getActiveColumnIndex();
        this._moveColumnInFilteredListFromToIndex(activeColumnIndex, activeColumnIndex - 1);
    }

    _toggleSelectAll(selectAll: boolean): void {
        this._selectableColumns.forEach((column) => (column.selected = selectAll));
    }

    /** @hidden */
    private _initiateColumns(): void {
        const selectedColumnKeys = this.initialVisibleColumnKeys;

        this._selectableColumns = this.availableColumns
            .slice()
            .sort((a, b) => selectedColumnKeys.indexOf(a.key) - selectedColumnKeys.indexOf(b.key))
            .map(
                (column, index: number): SelectableColumn => ({
                    column: column,
                    selected: selectedColumnKeys.includes(column.key),
                    active: index === 0
                })
            );
    }

    /** @hidden */
    private _getVisibleColumnsFromSelectedColumns(columns = this._selectableColumns): VisibleColumnType[] {
        return columns.filter(({ selected }) => selected).map(({ column }): VisibleColumnType => column.key);
    }

    /** @hidden */
    private _getActiveColumnIndex(): number {
        return this._filteredColumns.findIndex(({ active }) => active);
    }

    /** @hidden */
    private _moveColumnInFilteredListFromToIndex(from: number, to: number): void {
        const listLength = this._filteredColumns.length;
        from = Math.min(Math.max(from, 0), listLength);
        to = Math.min(Math.max(to, 0), listLength);

        if (from === to) {
            return;
        }

        const column = this._filteredColumns.splice(from, 1)[0];

        this._filteredColumns.splice(to, 0, column);

        this._calculateMoveButtonDisabledStates();

        /**
         * need to reflect analogical movement in the original list
         * with respect to the original list order
         */
        const dir = to - from > 0 ? 1 : -1;
        this._moveColumnInSelectableList(column, this._filteredColumns[to + -1 * dir], dir);
    }

    /**
     * Move column in selectable list.
     * Movement based on target column.
     * @param column Column to be moved.
     * @param targetColumn Target column.
     * @param direction +1 - column should be located after targetColumn. -1 - column should be located before targetColumn.
     */
    private _moveColumnInSelectableList(
        column: SelectableColumn,
        targetColumn: SelectableColumn,
        direction: 1 | -1
    ): void {
        const list = this._selectableColumns;
        const listLength = list.length;
        let from = list.indexOf(column);
        let to = list.indexOf(targetColumn) + direction;

        from = Math.min(Math.max(from, 0), listLength);
        to = Math.min(Math.max(to, 0), listLength);

        if (from === to) {
            return;
        }

        const movedElement = list.splice(from, 1)[0];

        this._filteredColumns.splice(to, 0, movedElement);
    }

    private _constructFilteredColumnsList(): void {
        this.subscriptions.add(
            combineLatest([this._showAllItemsSubject, this._searchQuerySubject]).subscribe(([showAll, searchQuery]) => {
                this._filteredColumns = this._selectableColumns
                    .filter((item) => item.column.label.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
                    .filter((item) => showAll || item.selected);

                this._calculateMoveButtonDisabledStates();
            })
        );
    }

    /** @hidden */
    private _countSelectedColumns(): void {
        this._selectedColumnsCount = this._selectableColumns.filter(({ selected }) => selected).length;
    }

    /** @hidden */
    private _calculateMoveButtonDisabledStates(): void {
        const activeIndex = this._getActiveColumnIndex();
        this._isMoveUpDisabled = activeIndex < 1;
        this._isMoveUpDisabled = activeIndex >= this._filteredColumns.length - 1;
    }
}
