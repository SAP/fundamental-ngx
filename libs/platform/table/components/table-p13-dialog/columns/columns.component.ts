import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    signal
} from '@angular/core';
import { TableDialogCommonData } from '@fundamental-ngx/platform/table-helpers';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DialogRef } from '@fundamental-ngx/core/dialog';
import { SearchInput } from '@fundamental-ngx/platform/search-field';

import { CdkScrollable } from '@angular/cdk/overlay';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import {
    BarElementDirective,
    BarLeftDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { ListComponent, ListItemComponent, ListTitleDirective } from '@fundamental-ngx/core/list';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { SearchFieldComponent } from '@fundamental-ngx/platform/search-field';
import { RESETTABLE_TOKEN, ResetButtonComponent, Resettable } from '../../reset-button/reset-button.component';

export interface DialogTableColumn {
    label: string;
    key: string;
}

export type VisibleColumnType = string; // ColumnKey

export interface ColumnsDialogData extends TableDialogCommonData {
    availableColumns: DialogTableColumn[];
    visibleColumns: VisibleColumnType[];
}

export interface ColumnsDialogResultData {
    visibleColumns: VisibleColumnType[];
    columnOrder?: VisibleColumnType[];
}

class SelectableColumn {
    constructor(
        /** Selected */
        public selected: boolean,
        /** Active */
        public active: boolean,
        /** Table Column it belongs to */
        public column: DialogTableColumn
    ) {}
}

const INITIAL_SEARCH_TEXT = '';
const INITIAL_SHOW_ALL_ITEMS = true;

@Component({
    templateUrl: './columns.component.html',
    styleUrl: './columns.component.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: RESETTABLE_TOKEN, useExisting: P13ColumnsDialogComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        TemplateDirective,
        BarLeftDirective,
        BarElementDirective,
        TitleComponent,
        BarRightDirective,
        ResetButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        DialogBodyComponent,
        ToolbarComponent,
        SearchFieldComponent,
        ToolbarSpacerDirective,
        ButtonComponent,
        ToolbarItemDirective,
        ListComponent,
        ListItemComponent,
        CheckboxComponent,
        FormsModule,
        ListTitleDirective,
        DialogFooterComponent,
        ButtonBarComponent,
        AsyncPipe,
        FdTranslatePipe,
        InitialFocusDirective
    ]
})
export class P13ColumnsDialogComponent implements Resettable, OnInit, OnDestroy {
    /** Indicates when reset command is available */
    readonly isResetAvailable$ = signal(false);

    /** Table columns available for grouping */
    readonly availableColumns: DialogTableColumn[] = [];

    /** All available columns for interacting */
    _selectableColumns: SelectableColumn[] = [];

    /** filtered columns that are rendered in the list */
    _filteredColumns: SelectableColumn[] = [];

    /** Search Query subject */
    _searchQuerySubject = new BehaviorSubject<string>(INITIAL_SEARCH_TEXT);
    /** Show All flag subject */
    _showAllItemsSubject = new BehaviorSubject<boolean>(INITIAL_SHOW_ALL_ITEMS);

    /** Selected columns count */
    _selectedColumnsCount = 0;

    /** Flag to track disabled state for move-down move-up buttons */
    _moveUpDisabled = true;
    /** Flag to track disabled state for move-down move-up buttons */
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
    constructor(
        public dialogRef: DialogRef<ColumnsDialogData>,
        private cdr: ChangeDetectorRef
    ) {
        const { availableColumns, visibleColumns } = this.dialogRef.data;

        this.availableColumns = availableColumns?.map(({ label, key }) => ({ label, key })) || [];

        this._initiateColumns(visibleColumns);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenToFilterOptions();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Reset to the initial state */
    reset(): void {
        this._initiateColumns(this.availableColumns.map((c) => c.key));
        this.isResetAvailable$.set(false);
    }

    /** Close dialog */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /** Confirm changes and close dialog */
    confirm(): void {
        const visibleColumns = this._getVisibleColumnsFromSelectedColumns(this._selectableColumns);
        const columnOrder = this._getColumnOrder(this._selectableColumns);
        const result: ColumnsDialogResultData = { visibleColumns, columnOrder };
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
        this._recalculateResetAvailability();
    }

    /** @hidden */
    _recalculateResetAvailability(): void {
        let resettable = false;
        if (this._selectedColumnsCount !== this.availableColumns.length) {
            // Initially all columns are selected. If not, reset should be active
            resettable = true;
        } else {
            // if all are selected, check for columns order to match the initial one
            for (let index = 0; index < this.availableColumns.length; index++) {
                if (this._selectableColumns[index].column.key !== this.availableColumns[index].key) {
                    resettable = true;
                    break;
                }
            }
        }
        this.isResetAvailable$.set(resettable);
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
    _setActiveColumn(column: SelectableColumn | null): void {
        this._selectableColumns.map((_column) => {
            _column.active = _column === column;
        });

        this._calculateMovementButtonsState();
    }

    /** @hidden */
    _moveActiveToTop(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this._moveColumnInFilteredListByIndex(this._getActiveColumnIndexInFilteredList(), 0);
    }

    /** @hidden */
    _moveActiveToBottom(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this._moveColumnInFilteredListByIndex(
            this._getActiveColumnIndexInFilteredList(),
            this._filteredColumns.length - 1
        );
    }

    /** @hidden */
    _moveActiveUp(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex - 1);

        // keep the focus back to the move up button as it gets lost on click
        setTimeout(() => {
            const moveUpBtn = event.target as HTMLElement;
            moveUpBtn.focus();
        }, 0);
    }

    /** @hidden */
    _moveActiveDown(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const activeColumnIndex = this._getActiveColumnIndexInFilteredList();
        this._moveColumnInFilteredListByIndex(activeColumnIndex, activeColumnIndex + 1);
    }

    /** @hidden */
    _isReorderColumnButtonShowable(item: SelectableColumn): boolean {
        return item.active && item.selected;
    }

    /** @hidden */
    _filterByColumnKy(index: number, item: SelectableColumn): string {
        return item?.column.key;
    }

    /**
     * @hidden
     * @param visibleColumnKeys keys of columns that should be displayed as selected.
     * Also, their order matters: it will be used
     */
    private _initiateColumns(visibleColumnKeys: string[]): void {
        const visibleColumnIndexMap = new Map(visibleColumnKeys.map((key, index) => [key, index]));
        this._selectableColumns = this.availableColumns.slice().map(
            (column, index: number): SelectableColumn => ({
                column,
                selected: visibleColumnKeys.includes(column.key),
                active: index === 0
            })
        );

        // keep count of selected
        this._countSelectedColumns();

        this._recalculateResetAvailability();

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
                    this._filteredColumns = this._selectableColumns.filter((item) => {
                        const matchesSearchQuery = item.column.label
                            .toLocaleLowerCase()
                            .includes(searchQuery.toLocaleLowerCase());
                        const matchesShowAll = showAll || item.selected;
                        return matchesSearchQuery && matchesShowAll;
                    });
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
    private _getColumnOrder(columns: SelectableColumn[]): VisibleColumnType[] {
        return columns.map((column) => column.column.key);
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
        this._recalculateResetAvailability();
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

        return { movedItem, replacedItem };
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
