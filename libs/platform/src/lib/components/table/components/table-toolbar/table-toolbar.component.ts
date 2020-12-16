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

import { SearchInput, SuggestionItem } from '../../interfaces/search-field.interface';
import { ContentDensity as CompactCozyContentDensity } from '../../../form/form-control';

import { ContentDensity } from '../../enums';
import { TableComponent } from '../../table.component';
import { TableToolbarActionsComponent } from '../table-toolbar-actions/table-toolbar-actions.component';
import { TableToolbarWithTemplate, TABLE_TOOLBAR } from './table-toolbar';

/**
 * The component that represents a table toolbar.
 * ```html
 * <fdp-table-toolbar
 *  title="Order Line Items"
 *  [hideItemCount]="false">
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
    constructor(private readonly _cd: ChangeDetectorRef, private readonly _table: TableComponent) {}

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
        this._table.openSortingDialog();
    }

    /** @hidden */
    openFiltering(): void {
        this._table.openFilteringDialog();
    }

    /** @hidden */
    openGrouping(): void {
        this._table.openGroupingDialog();
    }

    /** @hidden */
    openColumns(): void {
        // TODO
    }

    /** @hidden */
    _getCozyCompactSize(size: ContentDensity): CompactCozyContentDensity {
        return size !== 'cozy' ? 'compact' : 'cozy';
    }
}
