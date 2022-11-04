import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { SearchInput, SuggestionItem } from '../../interfaces/search-field.interface';
import { Table } from '../../table';
import { TableToolbarActionsComponent } from './table-toolbar-actions.component';
import { TableToolbarWithTemplate, TABLE_TOOLBAR } from './table-toolbar';
import { TableService } from '../../table.service';

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
    providers: [{ provide: TABLE_TOOLBAR, useExisting: TableToolbarComponent }]
})
export class TableToolbarComponent implements TableToolbarWithTemplate, AfterViewInit, OnDestroy {
    /** Table title. */
    @Input()
    title: string;

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
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    tableToolbarTitleId: string = 'fd-table-toolbar-title-' + tableToolbarTitleUniqueId++;

    /** @hidden */
    _showSaveButton = false;

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
    ngAfterViewInit(): void {
        this._cd.detectChanges();
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
