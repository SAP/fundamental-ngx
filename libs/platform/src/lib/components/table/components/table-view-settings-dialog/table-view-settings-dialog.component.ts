import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
} from '@angular/core';
import { startWith } from 'rxjs/operators';

import { TableComponent } from '../../table.component';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter/table-view-settings-filter.component';

/**
 * View settings dialog component.
 *
 * Used to link view settings filters options to the grid table.
 *
 * ```html
 * <fdp-table #myTable></fdp-table>
 * ...
 * <fdp-table-view-settings-dialog [table]="myTable">
 *     <fdp-table-view-settings-filter
 *         column="status"
 *         label="Status"
 *         type="single-select"
 *         values="[{value: 'filterValue', label: 'Filter label'}]">
 *     </fdp-table-view-settings-filter>
 * </fdp-table-view-settings-dialog>
 * ```
 * */
@Component({
    selector: 'fdp-table-view-settings-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewSettingsDialogComponent implements AfterViewInit {
    /** Reference to table component. */
    @Input()
    table: TableComponent;

    /** @hidden */
    @ContentChildren(forwardRef(() => TableViewSettingsFilterComponent))
    filters: QueryList<TableViewSettingsFilterComponent>;

    /** @hidden */
    ngAfterViewInit(): void {
        this._addFiltersToTable();
    }

    /** @hidden */
    _addFiltersToTable(): void {
        if (!this.table) {
            return;
        }

        this.filters.changes.pipe(startWith(null)).subscribe(() => {
            this.table._setViewSettingsFilters(this.filters.toArray());
        });
    }
}
