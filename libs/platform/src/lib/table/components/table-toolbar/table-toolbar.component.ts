import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';
import { SearchInput, SuggestionItem } from '../../interfaces/search-field.interface';
import { Table } from '../../table';
import { TableToolbarActionsComponent } from './table-toolbar-actions.component';
import { TableToolbarWithTemplate, TABLE_TOOLBAR } from './table-toolbar';
import { TableService } from '../../table.service';
import { Observable } from 'rxjs';

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
export class TableToolbarComponent implements TableToolbarWithTemplate, AfterViewInit {
    /** Table title. */
    @Input()
    title: string;

    /** Toggle to show table item count. */
    @Input()
    hideItemCount = false;

    /** Toggle to show search input. */
    @Input()
    hideSearchInput = false;

    /** Suggestions for search field. */
    @Input()
    searchSuggestions: SuggestionItem[] = [];

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    tableToolbarTitleId: string = 'fd-table-tolbar-title-' + tableToolbarTitleUniqueId++;

    /** @hidden */
    readonly tableLoading$: Observable<boolean> = this.tableService.tableLoading$;

    /** @hidden */
    constructor(private readonly _cd: ChangeDetectorRef, private readonly _table: Table, private tableService: TableService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
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
    _getCozyCompactSize(size: ContentDensity): ContentDensity {
        return size !== 'cozy' ? 'compact' : 'cozy';
    }
}
