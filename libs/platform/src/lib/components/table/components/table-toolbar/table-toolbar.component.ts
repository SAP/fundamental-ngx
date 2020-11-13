import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core';
import { SearchInput, SuggestionItem } from '../../../search-field/search-field.component';
import { TableToolbarActionsComponent } from '../table-toolbar-actions/table-toolbar-actions.component';
import { SortingComponent } from '../dialogs/sorting/sorting.component';
import { GroupingComponent } from '../dialogs/grouping/grouping.component';
import { TableService } from '../../table.service';

const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: false,
    minWidth: '30%',
    minHeight: '50%',
};

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableToolbarComponent implements AfterViewInit {
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
    @Output()
    searchSubmit: EventEmitter<SearchInput> = new EventEmitter();

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    private _subscription = new Subscription();

    /** @hidden */
    constructor(private readonly _cd: ChangeDetectorRef,
                private readonly _dialogService: DialogService,
                private readonly _tableService: TableService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    submitSearch(search: SearchInput): void {
        this.searchSubmit.emit(search);
    }

    /** @hidden */
    openSorting(): void {
        const state = this._tableService.tableState$.getValue();
        const columns = state.columns;

        const dialogRef = this._dialogService.open(SortingComponent, {
            ...dialogConfig,
            data: {
                columns: columns.filter(c => c.sortable),
                sortDirection: state && state.sortBy && state.sortBy[0] && state.sortBy[0].direction,
                sortField: state && state.sortBy && state.sortBy[0] && state.sortBy[0].field
            }
        });

        this._subscription.add(
            dialogRef.afterClosed.pipe(filter(e => !!e)).subscribe(({action, value}) => {
                if (!action && !value) {
                    return;
                }

                this._tableService.sort(value.field, value.direction);
            })
        );
    }

    /** @hidden */
    openFiltering(): void {

    }

    /** @hidden */
    openGrouping(): void {
        const state = this._tableService.tableState$.getValue();
        const columns = state.columns;

        const dialogRef = this._dialogService.open(GroupingComponent, {
            ...dialogConfig,
            data: {
                columns: columns.filter(c => c.groupable),
                groupOrder: state && state.groupBy && state.groupBy[0] && state.groupBy[0].direction,
                groupField: state && state.groupBy && state.groupBy[0] && state.groupBy[0].field
            }
        });

        this._subscription.add(
            dialogRef.afterClosed.pipe(filter(e => !!e)).subscribe(({action, value}) => {
                if (!action && !value) {
                    return;
                }

                this._tableService.group(value.field, value.direction);
            })
        );
    }

    /** @hidden */
    openColumns(): void {

    }
}
