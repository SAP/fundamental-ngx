import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
} from '@angular/core';

import { Table } from '../../table';

import { TableP13SortComponent } from './table-p13-sort.component';
import { TableP13GroupComponent } from './table-p13-group.component';
import { TableP13FilterComponent } from './table-p13-filter.component';
import { TableP13ColumnsComponent } from './table-p13-columns.component';

/**
 * View settings dialog component.
 *
 * Used to link view settings filters options to the grid table.
 *
 * ```html
 * <fdp-table #myTable></fdp-table>
 * ...
 * <fdp-table-p13-dialog [table]="myTable">
 *   <!-- Sort Panel -->
 *   <fdp-table-p13n-sort></fdp-table-p13n-sort>
 *   
 *   <!-- Filter Panel -->
 *   <fdp-table-p13n-filter></fdp-table-p13n-filter>
 *   
 *   <!-- Group Panel -->
 *   <fdp-table-p13n-group></fdp-table-p13n-group>
 * 
 *   <!-- Columns Panel -->
 *   <fdp-table-p13n-columns></fdp-table-p13n-columns>
 * </fdp-table-p13-dialog>
 * ```
 * */
@Component({
    selector: 'fdp-table-p3-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableP13DialogComponent implements AfterViewInit {
    /** Reference to table component. */
    @Input()
    table: Table;

    /** @hidden */
    @ContentChild(TableP13SortComponent)
    sort: TableP13SortComponent;

    /** @hidden */
    @ContentChild(TableP13FilterComponent)
    filter: TableP13FilterComponent;

    /** @hidden */
    @ContentChild(TableP13GroupComponent)
    group: TableP13GroupComponent;

    /** @hidden */
    @ContentChild(TableP13ColumnsComponent)
    columns: TableP13ColumnsComponent;

    /** @hidden */
    ngAfterViewInit(): void {
        this._registerSettings();
    }

    /** @hidden */
    _registerSettings(): void {
        if (!this.table) {
            return;
        }

        /* this.table.setP13DialogSettings({ 
            sort: this.sort,  
            filter: this.filter,  
            group: this.group,  
            columns: this.columns,  
        }); */
    }
}
