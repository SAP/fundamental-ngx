import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { TableComponent } from '../../table.component';
import { TableViewSettingsFilterComponent } from '../table-view-settings-filter/table-view-settings-filter.component';

/**
 * View settings dialog component.
 * ```html
 * <fdp-table #myTable></fdp-table>
 * ...
 * <fdp-table-view-settings-dialog [table]="myTable">
 *     <fdp-table-view-settings-filter
 *         [column]="'name'"
 *         [label]="'Name'"
 *         [type]="'custom'">
 *            <label>Enter name:</label><fdp-input type="text" name="name"></fdp-input>
 *     </fdp-table-view-settings-filter>
 *     <fdp-table-view-settings-filter
 *         [column]="'price'"
 *         [label]="'Price'"
 *         [type]="'custom'">
 *             <label>Minimum Price:</label><fdp-input type="number" name="minimumPrice"></fdp-input>
 *             <label>Maximum Price:</label><fdp-input type="number" name="maximumPrice"></fdp-input>
 *     </fdp-table-view-settings-filter>
 *     <fdp-table-view-settings-filter
 *         [column]="'status'"
 *         [label]="'Status'"
 *         [type]="'single-select'"
 *         [values]="[{key: 'OUT_OF_STOCK', label: {'out of stock'}}, { key: 'AVAILABLE', label: 'available'}]">
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
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    @ContentChildren(forwardRef(() => TableViewSettingsFilterComponent))
    filters: QueryList<TableViewSettingsFilterComponent>;

    ngAfterViewInit(): void {
        if (!this.table) {
            return;
        }

        this.filters.changes.subscribe(() => {
            this.table._setViewSettingsFilters(this.filters.toArray());
        });

        this.table._setViewSettingsFilters(this.filters.toArray());
    }
}
