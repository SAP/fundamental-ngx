import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SearchInput, SuggestionItem } from '@fundamental-ngx/platform/search-field';
import { Table, TableService } from '@fundamental-ngx/platform/table-helpers';
import { takeUntil } from 'rxjs/operators';
import { TABLE_TOOLBAR, TableToolbarInterface } from './table-toolbar';
import { TableToolbarActionsComponent } from './table-toolbar-actions.component';
import { TableToolbarLeftActionsComponent } from './table-toolbar-left-actions.component';

export type EditMode = 'none' | 'inline';

let tableToolbarTitleUniqueId = 0;

/**
 * The component that represents a table toolbar.
 *
 * ```html
 * <fdp-table-toolbar
 *   title="Order Line Items"
 *   [hideItemCount]="false">
 * </fdp-table-toolbar>
 * ```
 * */

@Component({
    selector: 'fdp-table-toolbar',
    templateUrl: './table-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: TABLE_TOOLBAR, useExisting: TableToolbarComponent }]
})
export class TableToolbarComponent implements TableToolbarInterface, OnDestroy {
    /**
     * Whether the toolbar should hide elements in popover when they overflow.
     * */
    @Input()
    shouldOverflow = false;

    /** Table title. */
    @Input()
    title: string;

    /** Aria label for the search field. */
    @Input()
    searchFieldAriaLabel: Nullable<string>;

    /** Toggle to show table item count. */
    @Input()
    hideItemCount = false;

    /** Toggle to show search input. */
    @Input()
    hideSearchInput = false;

    /** Toggle to expand and collapse all feature */
    @Input()
    showExpandCollapseButtons = false;
    /** Suggestions for search field. */
    @Input()
    searchSuggestions: SuggestionItem[] = [];

    /** Table rows edit/add mode. */
    @Input()
    editMode: EditMode = 'none';

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ContentChild(TableToolbarLeftActionsComponent)
    _tableToolbarLeftActionsComponent: TableToolbarLeftActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    tableToolbarTitleId: string = 'fd-table-toolbar-title-' + tableToolbarTitleUniqueId++;

    /** @hidden */
    _showSaveButton = false;

    /** @hidden */
    _searchInputText = '';

    /** @hidden */
    readonly tableLoading$: Observable<boolean> = this._tableService.tableLoading$;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _table: Table,
        private readonly _tableService: TableService
    ) {
        this._listenToTableEvents();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    submitSearch(search: SearchInput): void {
        this._table.search(search);
    }

    /** @hidden */
    openSorting(): void {
        this._table.openTableSortSettings.emit();
    }

    /** @hidden */
    openFiltering(): void {
        this._table.openTableFilterSettings.emit();
    }

    /** @hidden */
    openGrouping(): void {
        this._table.openTableGroupSettings.emit();
    }

    /** @hidden */
    openColumns(): void {
        this._table.openTableColumnSettings.emit();
    }

    /** @hidden */
    _addRow(): void {
        this._table.addRow();
    }

    /** @hidden */
    _saveRows(): void {
        this._table.saveRows();
    }

    /** @hidden */
    _cancelEditing(): void {
        this._table.cancelEditing();
    }

    /** @hidden */
    private _listenToTableEvents(): void {
        this._table.emptyRowAdded.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._showSaveButton = true;
        });

        this._table.save.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._showSaveButton = false;
        });

        this._table.cancel.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._showSaveButton = false;
        });

        this._table.presetChanged.pipe(takeUntil(this._onDestroy$)).subscribe((state) => {
            this._searchInputText = state.searchInput?.text ?? '';
        });
    }

    /** @hidden */
    _expandAll(): void {
        this._table.expandAll();
    }

    /** @hidden */
    _collapseAll(): void {
        this._table.collapseAll();
    }
}
