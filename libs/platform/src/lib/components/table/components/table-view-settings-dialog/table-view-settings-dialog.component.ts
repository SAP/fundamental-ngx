import {
    ChangeDetectionStrategy,
    Component, Input,
    OnDestroy,
    OnInit
} from '@angular/core';

import { TableComponent } from '../../table.component';

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
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewSettingsDialogComponent implements OnInit, OnDestroy {
    /** Reference to table component. */
    @Input()
    table: TableComponent;

    /** @hidden */
    constructor() { }

    /** @hidden */
    ngOnInit(): void {}

    /** @hidden */
    ngOnDestroy(): void {}
}
