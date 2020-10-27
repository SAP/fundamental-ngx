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

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core';
import { TableToolbarActionsComponent } from '../table-toolbar-actions/table-toolbar-actions.component';
import { SortingComponent } from '../dialogs/sorting/sorting.component';
import { TableService } from '../../table.service';

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
    hideItemCount: boolean;

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

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
    openSorting(): void {
        const columns = this._tableService.columns;
        const state = this._tableService.tableState;

        const dialogRef = this._dialogService.open(SortingComponent, {
            responsivePadding: true,
            verticalPadding: false,
            minWidth: '30%',
            minHeight: '50%',
            backdropClass: 'sorting-dialog',
            data: {
                columns: columns.filter(c => c.sortable),
                sortDirection: state && state.sortBy && state.sortBy[0] && state.sortBy[0].direction,
                sortField: state && state.sortBy && state.sortBy[0] && state.sortBy[0].field
            }
        } as DialogConfig);

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
    openFilter(): void {

    }

    /** @hidden */
    openGrouping(): void {

    }

    /** @hidden */
    openColumns(): void {

    }
}
