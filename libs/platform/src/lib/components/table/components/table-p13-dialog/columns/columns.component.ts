import { ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { DialogRef } from '@fundamental-ngx/core';

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
export class P13ColumnsDialogComponent implements Resettable, OnDestroy {
    /** @hidden */
    private _isResetAvailableSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    /** Indicates when reset command is available */
    readonly isResetAvailable$: Observable<boolean> = this._isResetAvailableSubject$.asObservable();

    /** Initial collection to work with */
    readonly initialVisibleColumnKeys: string[];

    /** Table columns available for grouping */
    readonly availableColumns: TableColumn[] = [];

    /** Group rules to render */
    _selectableColumns: SelectableColumn[] = [];

    /** Group rules to render */
    _filteredColumns: SelectableColumn[] = [];

    /** Active item that can be moved in the list */
    _activeColumn: SelectableColumn;

    _searchQuerySubject: BehaviorSubject<string> = new BehaviorSubject('');

    _showAllItemsSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);

    /** @hidden */
    get _isShownAllItems(): boolean {
        return this._showAllItemsSubject.getValue();
    }

    private subscriptions = new Subscription();

    constructor(private dialogRef: DialogRef) {
        const { availableColumns, visibleColumns: visibleColumnKeys }: ColumnsDialogData = this.dialogRef.data;

        this.initialVisibleColumnKeys = [...visibleColumnKeys];

        this.availableColumns = availableColumns?.map(({ label, key }) => ({ label: label, key: key })) || [];

        this._initiateColumns();
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
        if (column === this._activeColumn) {
            return;
        }
        this._activeColumn = column;
        // TODO: update Movement Buttons states
    }

    /** @hidden */
    _moveActiveToTop(): void {
        //
    }

    /** @hidden */
    _moveActiveUp(): void {
        //
    }

    /** @hidden */
    _moveActiveDown(): void {
        //
    }

    /** @hidden */
    _moveActiveToBottom(): void {
        //
    }

    /** @hidden */
    private _initiateColumns(): void {
        const selectedColumnKeys = this.initialVisibleColumnKeys;

        this._selectableColumns = this.availableColumns.map(
            (column): SelectableColumn => ({
                column: column,
                selected: selectedColumnKeys.includes(column.key)
            })
        );
    }

    /** @hidden */
    private _getVisibleColumnsFromSelectedColumns(columns = this._selectableColumns): VisibleColumnType[] {
        return columns.filter(({ selected }) => selected).map(({ column }): VisibleColumnType => column.key);
    }
}
